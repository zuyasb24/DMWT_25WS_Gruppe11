"use client";

import { ThumbsUp } from "lucide-react";

type Reply = {
  id: number;
  question_id: number;
  name: string;
  role?: string | null;
  reply: string;
  likes: number;
  created_at?: string;
};

type ReplyCardProps = {
  reply: Reply;
  isAuthed: boolean;
  onLike: () => void;
};

export default function ReplyCard({ reply, isAuthed, onLike }: ReplyCardProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold">{reply.name}</p>
          <p className="text-gray-400 text-xs">{reply.role || "User"}</p>
        </div>

        
        <button
          type="button"
          onClick={onLike}
          className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={isAuthed ? "Like reply" : "Log in to like"}
          disabled={!isAuthed}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">{reply.likes ?? 0}</span>
        </button>
      </div>

      <p className="text-gray-200 mt-2">{reply.reply}</p>
    </div>
  );
}