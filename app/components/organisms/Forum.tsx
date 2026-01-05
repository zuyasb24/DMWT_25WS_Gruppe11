"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
type Question = {
  id: number;
  name: string;
  role?: string | null;
  question: string;
  likes: number;
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ask a Question form
  const [qName, setQName] = useState("");
  const [qRole, setQRole] = useState("");
  const [qText, setQText] = useState("");

  // Replies state (loaded per question)
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [repliesByQ, setRepliesByQ] = useState<Record<number, Reply[]>>({});
  const [replyDraftByQ, setReplyDraftByQ] = useState<Record<number, { name: string; role: string; reply: string }>>(
    {}
  );

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

    const name = qName.trim();
    const role = qRole.trim();
    const question = qText.trim();

    if (!name || !question) return;

    setLoading(true);
    try {
      const res = await fetch("/api/forum/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, question }),
      });

      if (!res.ok) {
        setError("Failed to post question");
        return;
      }

      setQName("");
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
        const res = await fetch(`/api/forum/replies?questionId=${questionId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch replies");
        const data = (await res.json()) as Reply[];
        setRepliesByQ((prev) => ({ ...prev, [questionId]: Array.isArray(data) ? data : [] }));
      } catch (e) {
        console.error(e);
        setRepliesByQ((prev) => ({ ...prev, [questionId]: [] }));
      }
    }

    // init reply draft if missing
    setReplyDraftByQ((prev) => ({
      ...prev,
      [questionId]: prev[questionId] ?? { name: "", role: "", reply: "" },
    }));
  }

  async function submitReply(questionId: number) {
    setError("");

    const draft = replyDraftByQ[questionId] ?? { name: "", role: "", reply: "" };
    const name = draft.name.trim();
    const role = draft.role.trim();
    const reply = draft.reply.trim();

    if (!name || !reply) {
      setError("Reply needs a name and text.");
      return;
    }

    try {
      const res = await fetch("/api/forum/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, name, role, reply }),
      });

      if (!res.ok) {
        setError("Failed to post reply");
        return;
      }

      // reload replies for that question
      const refreshed = await fetch(`/api/forum/replies?questionId=${questionId}`, { cache: "no-store" });
      const data = (await refreshed.json()) as Reply[];
      setRepliesByQ((prev) => ({ ...prev, [questionId]: Array.isArray(data) ? data : [] }));
      await loadQuestions();
      // clear reply box
      setReplyDraftByQ((prev) => ({
        ...prev,
        [questionId]: { name: "", role: "", reply: "" },
      }));
    } catch (e) {
      console.error(e);
      setError("Error posting reply");
    }
  }

  return (
    <section id="forum" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Community <span className="text-green-400">Forum</span>
        </h2>

        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-10">
          Ask questions, share answers, and get help from our repair community.
        </p>

        {/* Ask a Question */}
        <div className="max-w-7xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">Ask a Question</h3>

          {error && <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">{error}</div>}

          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={qName}
              onChange={(e) => setQName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              required
            />

            <input
              type="text"
              placeholder="Optional: Your Role (e.g., Student, Creator)"
              value={qRole}
              onChange={(e) => setQRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
            />

            <textarea
              placeholder="Describe your repair question..."
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400 h-32 resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              {loading ? "Posting..." : "Post Question"}
            </button>
          </form>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No questions yet. Be the first to ask!</div>
          ) : (
            questions.map((q) => {
              const isOpen = openQuestionId === q.id;
              const replies = repliesByQ[q.id] ?? [];
              const draft = replyDraftByQ[q.id] ?? { name: "", role: "", reply: "" };

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

                        <button
                          onClick={() => toggleOpen(q.id)}
                          className="text-green-400 hover:text-green-300 transition-colors text-sm"
                        >
                          {isOpen ? "Hide replies" : `Replies (${q.replies_count})`}
                        </button>
                      </div>

                      <p className="text-gray-200 mt-3 leading-relaxed">{q.question}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{q.likes}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{q.replies_count} replies</span>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="mt-6 border-t border-gray-700 pt-5">
                          {/* Replies list */}
                          <div className="space-y-4">
                            {replies.length === 0 ? (
                              <p className="text-gray-400">No replies yet — be the first to help.</p>
                            ) : (
                              replies.map((r) => (
                                <div key={r.id} className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-white font-semibold">{r.name}</p>
                                      <p className="text-gray-400 text-xs">{r.role || "User"}</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-200 mt-2">{r.reply}</p>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Reply form */}
                          <div className="mt-6 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
                            <p className="text-white font-semibold mb-3">Write a reply</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={draft.name}
                                onChange={(e) =>
                                  setReplyDraftByQ((prev) => ({
                                    ...prev,
                                    [q.id]: { ...draft, name: e.target.value },
                                  }))
                                }
                                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
                              />

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
                                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
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
                              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 h-28 resize-none"
                            />

                            <button
                              type="button"
                              onClick={() => submitReply(q.id)}
                              className="mt-3 bg-green-400 hover:bg-green-500 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-300"
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