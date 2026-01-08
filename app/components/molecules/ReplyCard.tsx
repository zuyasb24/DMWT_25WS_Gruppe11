"use client";

import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";

type Reply = {
  id: number;
  question_id: number;
  name: string;
  role?: string | null;
  reply: string;
  likes: number;
  liked_by_me?: boolean;
  created_at?: string;
};

type ReplyCardProps = {
  reply: Reply;
  isAuthed: boolean;
};

export default function ReplyCard({ reply, isAuthed }: ReplyCardProps) {
  // Local UI state (so ReplyCard controls optimistic updates)
  const [likes, setLikes] = useState<number>(reply.likes ?? 0);
  const [liked, setLiked] = useState<boolean>(Boolean(reply.liked_by_me));
  const [loading, setLoading] = useState(false);

  // If parent refetches replies, keep local state in sync
  useEffect(() => {
    setLikes(reply.likes ?? 0);
    setLiked(Boolean(reply.liked_by_me));
  }, [reply.likes, reply.liked_by_me]);

  async function handleLike() {
    if (!isAuthed || liked || loading) return;

    // Optimistic UI update
    setLiked(true);
    setLikes((l) => l + 1);
    setLoading(true);

    try {
      const res = await fetch("/api/forum/replies/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyId: reply.id }),
      });

      if (!res.ok) throw new Error("Like failed");

      // Optional: sync likes from server (not strictly necessary)
      const data = (await res.json()) as { likes?: number };
      if (typeof data.likes === "number") setLikes(data.likes);
    } catch (e) {
      console.error(e);
      // rollback if server fails
      setLiked(false);
      setLikes((l) => Math.max(0, l - 1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-semibold">{reply.name}</p>
          <p className="text-gray-400 text-xs">{reply.role || "User"}</p>
        </div>

        <button
          type="button"
          onClick={handleLike}
          disabled={!isAuthed || liked}
          className={`flex items-center gap-1 transition-colors ${
            liked ? "text-green-400 cursor-not-allowed" : "text-gray-400 hover:text-green-400"
          }`}
          title={liked ? "You already liked this" : isAuthed ? "Like reply" : "Log in to like"}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">{likes}</span>
        </button>
      </div>

      <p className="text-gray-200 mt-2">{reply.reply}</p>
    </div>
  );
}