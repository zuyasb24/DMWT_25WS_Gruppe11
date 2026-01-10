"use client";

import { MessageCircle } from "lucide-react";
import ReplyCard from "./ReplyCard";
import ReplyForm from "./ReplyForm";

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

type QuestionCardProps = {
  q: Question;

  // open/close
  isOpen: boolean;
  onToggle: () => void;

  // replies
  replies: Reply[];

  // reply draft
  draftRole: string;
  draftReply: string;
  onChangeDraftRole: (value: string) => void;
  onChangeDraftReply: (value: string) => void;
  onSubmitReply: () => void;

  // likes
  isAuthed: boolean;
  displayName: string;
};

export default function QuestionCard({
  q,
  isOpen,
  onToggle,
  replies,
  draftRole,
  draftReply,
  onChangeDraftRole,
  onChangeDraftReply,
  onSubmitReply,
  isAuthed,
  displayName,
}: QuestionCardProps) {

  const isMine = q.name === displayName;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-400 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {q.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className={`font-semibold ${isMine ? "text-green-400" : "text-white"}`}>
                {q.name}
              </h4>
              <p className="text-gray-400 text-sm">{q.role || "User"}</p>
            </div>
          </div>

          <p className="text-gray-200 mt-3 leading-relaxed">{q.question}</p>

          {/* Replies toggle (next to icon) */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onToggle}
              className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`replies-${q.id}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{isOpen ? "Hide replies" : `${q.replies_count} replies`}</span>
            </button>
          </div>

          {isOpen && (
            <div id={`replies-${q.id}`} className="mt-6 border-t border-gray-700 pt-5">
              {/* Replies list */}
              <div className="space-y-4">
                {replies.length === 0 ? (
                  <p className="text-gray-400">No replies yet — be the first to help.</p>
                ) : (
                  replies.map((r) => (
                    <ReplyCard
                      key={r.id}
                      reply={r}
                      isAuthed={isAuthed}
                    />
                  ))
                )}
              </div>

              {/* Reply form */}
              <ReplyForm
                roleValue={draftRole}
                replyValue={draftReply}
                onChangeRole={onChangeDraftRole}
                onChangeReply={onChangeDraftReply}
                onSubmit={onSubmitReply}
                isAuthed={isAuthed}
                displayName={displayName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}