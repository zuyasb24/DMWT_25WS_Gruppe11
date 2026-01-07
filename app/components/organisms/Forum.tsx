"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";

type Question = {
  id: number;
  name: string;
  role?: string | null;
  question: string;
  likes: number; // (kept in DB, but we don't display it anymore)
  replies_count: number;
  created_at?: string;
};

type Reply = {
  id: number;
  question_id: number;
  name: string;
  role?: string | null;
  reply: string;
  likes: number;
  created_at?: string;
};

export default function Forum() {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ask a Question form (NO name — we use session username)
  const [qRole, setQRole] = useState("");
  const [qText, setQText] = useState("");

  // Replies state (loaded per question)
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [repliesByQ, setRepliesByQ] = useState<Record<number, Reply[]>>({});
  const [replyDraftByQ, setReplyDraftByQ] = useState<
    Record<number, { role: string; reply: string }>
  >({});

  const displayName = isAuthed
    ? String(session?.user?.name ?? session?.user?.email ?? "User")
    : "";

  async function loadQuestions() {
    try {
      const res = await fetch("/api/forum/questions", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = (await res.json()) as Question[];
      setQuestions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setQuestions([]);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function handleSubmitQuestion(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isAuthed) {
      setError("Please log in to post a question.");
      return;
    }

    const role = qRole.trim();
    const question = qText.trim();
    if (!question) return;

    setLoading(true);
    try {
      const res = await fetch("/api/forum/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, question }),
      });

      if (!res.ok) {
        setError("Failed to post question");
        return;
      }

      setQRole("");
      setQText("");
      await loadQuestions();
    } catch (e) {
      console.error(e);
      setError("Error posting question");
    } finally {
      setLoading(false);
    }
  }

  async function toggleOpen(questionId: number) {
    // close if same
    if (openQuestionId === questionId) {
      setOpenQuestionId(null);
      return;
    }

    setOpenQuestionId(questionId);

    // load replies if not loaded yet
    if (!repliesByQ[questionId]) {
      try {
        const res = await fetch(`/api/forum/replies?questionId=${questionId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch replies");
        const data = (await res.json()) as Reply[];
        setRepliesByQ((prev) => ({
          ...prev,
          [questionId]: Array.isArray(data) ? data : [],
        }));
      } catch (e) {
        console.error(e);
        setRepliesByQ((prev) => ({ ...prev, [questionId]: [] }));
      }
    }

    // init reply draft if missing
    setReplyDraftByQ((prev) => ({
      ...prev,
      [questionId]: prev[questionId] ?? { role: "", reply: "" },
    }));
  }

  async function submitReply(questionId: number) {
    setError("");

    if (!isAuthed) {
      setError("Please log in to reply.");
      return;
    }

    const draft = replyDraftByQ[questionId] ?? { role: "", reply: "" };
    const role = draft.role.trim();
    const reply = draft.reply.trim();

    if (!reply) {
      setError("Reply needs text.");
      return;
    }

    try {
      const res = await fetch("/api/forum/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, role, reply }),
      });

      if (!res.ok) {
        setError("Failed to post reply");
        return;
      }

      // reload replies for that question
      const refreshed = await fetch(
        `/api/forum/replies?questionId=${questionId}`,
        { cache: "no-store" }
      );
      const data = (await refreshed.json()) as Reply[];
      setRepliesByQ((prev) => ({
        ...prev,
        [questionId]: Array.isArray(data) ? data : [],
      }));

      await loadQuestions();

      // clear reply box
      setReplyDraftByQ((prev) => ({
        ...prev,
        [questionId]: { role: "", reply: "" },
      }));
    } catch (e) {
      console.error(e);
      setError("Error posting reply");
    }
  }

  // Like a reply (ONLY replies have likes now)
  async function likeReply(questionId: number, replyId: number) {
    setError("");

    if (!isAuthed) {
      setError("Please log in to like replies.");
      return;
    }

    // Optimistic UI update (instant feedback)
    setRepliesByQ((prev) => {
      const current = prev[questionId] ?? [];
      return {
        ...prev,
        [questionId]: current.map((r) =>
          r.id === replyId ? { ...r, likes: (r.likes ?? 0) + 1 } : r
        ),
      };
    });

    try {
      const res = await fetch("/api/forum/replies/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyId }),
      });

      if (!res.ok) {
        // rollback by refetching replies (safe)
        const refreshed = await fetch(
          `/api/forum/replies?questionId=${questionId}`,
          { cache: "no-store" }
        );
        const data = (await refreshed.json()) as Reply[];
        setRepliesByQ((prev) => ({
          ...prev,
          [questionId]: Array.isArray(data) ? data : [],
        }));
        setError("Failed to like reply");
        return;
      }

      const data = (await res.json()) as { likes: number };

      // Sync with server count
      setRepliesByQ((prev) => {
        const current = prev[questionId] ?? [];
        return {
          ...prev,
          [questionId]: current.map((r) =>
            r.id === replyId ? { ...r, likes: data.likes } : r
          ),
        };
      });
    } catch (e) {
      console.error(e);
      setError("Error liking reply");
    }
  }

  return (
    <section id="forum" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Community <span className="text-green-400">Forum</span>
        </h2>

        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-10">
          Ask questions, share answers, and get help from our repair community.
        </p>

        {/* Ask a Question */}
        <div className="max-w-7xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-2">Ask a Question</h3>

          {/* Only show who is posting if logged in */}
          {isAuthed && (
            <p className="text-sm text-gray-400 mb-4">
              Posting as:{" "}
              <span className="text-gray-200 font-medium">{displayName}</span>
            </p>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
              {error}
            </div>
          )}

          {!isAuthed && (
            <div className="mb-4 p-3 bg-gray-900 text-white rounded-lg border border-gray-700">
              Please{" "}
              <a
                href="/login"
                className="text-green-400 hover:text-green-300 underline"
              >
                log in
              </a>{" "}
              to post a question.
            </div>
          )}

          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <input
              type="text"
              placeholder="Optional: Your Role (e.g., Student, Creator)"
              value={qRole}
              onChange={(e) => setQRole(e.target.value)}
              disabled={!isAuthed || loading}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
            />

            <textarea
              placeholder="Describe your repair question..."
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              disabled={!isAuthed || loading}
              className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400 h-32 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
              required
            />

            <button
              type="submit"
              disabled={loading || !isAuthed}
              className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Post Question
            </button>
          </form>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No questions yet. Be the first to ask!
            </div>
          ) : (
            questions.map((q) => {
              const isOpen = openQuestionId === q.id;
              const replies = repliesByQ[q.id] ?? [];
              const draft = replyDraftByQ[q.id] ?? { role: "", reply: "" };

              return (
                <div
                  key={q.id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-400 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {q.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-white font-semibold">{q.name}</h4>
                          <p className="text-gray-400 text-sm">{q.role || "User"}</p>
                        </div>
                      </div>

                      <p className="text-gray-200 mt-3 leading-relaxed">
                        {q.question}
                      </p>

                      {/* Actions row (we removed likes for QUESTIONS, only keep replies toggle here) */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
                        <button
                          type="button"
                          onClick={() => toggleOpen(q.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
                          aria-expanded={isOpen}
                          aria-controls={`replies-${q.id}`}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>
                            {isOpen ? "Hide replies" : `${q.replies_count} replies`}
                          </span>
                        </button>
                      </div>

                      {isOpen && (
                        <div
                          id={`replies-${q.id}`}
                          className="mt-6 border-t border-gray-700 pt-5"
                        >
                          {/* Replies list */}
                          <div className="space-y-4">
                            {replies.length === 0 ? (
                              <p className="text-gray-400">
                                No replies yet — be the first to help.
                              </p>
                            ) : (
                              replies.map((r) => (
                                <div
                                  key={r.id}
                                  className="bg-gray-900/40 border border-gray-700 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <p className="text-white font-semibold">
                                        {r.name}
                                      </p>
                                      <p className="text-gray-400 text-xs">
                                        {r.role || "User"}
                                      </p>
                                    </div>

                                    {/* Likes are here (on replies) */}
                                    <button
                                      type="button"
                                      onClick={() => likeReply(q.id, r.id)}
                                      className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title={isAuthed ? "Like reply" : "Log in to like"}
                                      disabled={!isAuthed}
                                    >
                                      <ThumbsUp className="h-4 w-4" />
                                      <span className="text-sm">{r.likes ?? 0}</span>
                                    </button>
                                  </div>

                                  <p className="text-gray-200 mt-2">{r.reply}</p>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Reply form */}
                          <div className="mt-6 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">
                              Write a reply
                            </p>

                            {/* Only show who is replying if logged in */}
                            {isAuthed && (
                              <p className="text-sm text-gray-400 mb-3">
                                Replying as:{" "}
                                <span className="text-gray-200 font-medium">
                                  {displayName}
                                </span>
                              </p>
                            )}

                            {!isAuthed && (
                              <div className="mb-3 p-3 bg-gray-900 text-white rounded-lg border border-gray-700">
                                Please{" "}
                                <a
                                  href="/login"
                                  className="text-green-400 hover:text-green-300 underline"
                                >
                                  log in
                                </a>{" "}
                                to reply.
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <input
                                type="text"
                                placeholder="Optional: Your Role"
                                value={draft.role}
                                onChange={(e) =>
                                  setReplyDraftByQ((prev) => ({
                                    ...prev,
                                    [q.id]: { ...draft, role: e.target.value },
                                  }))
                                }
                                disabled={!isAuthed}
                                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
                              />
                            </div>

                            <textarea
                              placeholder="Your reply..."
                              value={draft.reply}
                              onChange={(e) =>
                                setReplyDraftByQ((prev) => ({
                                  ...prev,
                                  [q.id]: { ...draft, reply: e.target.value },
                                }))
                              }
                              disabled={!isAuthed}
                              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 h-28 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                            />

                            <button
                              type="button"
                              onClick={() => submitReply(q.id)}
                              disabled={!isAuthed}
                              className="mt-3 bg-green-400 hover:bg-green-500 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}