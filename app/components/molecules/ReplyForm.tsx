"use client";

type ReplyFormProps = {
  // state
  roleValue: string;
  replyValue: string;

  // handlers
  onChangeRole: (value: string) => void;
  onChangeReply: (value: string) => void;
  onSubmit: () => void;

  // UI state
  isAuthed: boolean;
  displayName: string;
};

export default function ReplyForm({
  roleValue,
  replyValue,
  onChangeRole,
  onChangeReply,
  onSubmit,
  isAuthed,
  displayName,
}: ReplyFormProps) {
  return (
    <div className="mt-6 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
      <p className="text-white font-semibold mb-2">Write a reply</p>

      {/* Only show who is replying if logged in */}
      {isAuthed && (
        <p className="text-sm text-gray-400 mb-3">
          Replying as: <span className="text-gray-200 font-medium">{displayName}</span>
        </p>
      )}

      {!isAuthed && (
        <div className="mb-3 p-3 bg-gray-900 text-white rounded-lg border border-gray-700">
          Please{" "}
          <a href="/login" className="text-green-400 hover:text-green-300 underline">
            log in
          </a>{" "}
          to reply.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          placeholder="Optional: Your Role"
          value={roleValue}
          onChange={(e) => onChangeRole(e.target.value)}
          disabled={!isAuthed}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>

      <textarea
        placeholder="Your reply..."
        value={replyValue}
        onChange={(e) => onChangeReply(e.target.value)}
        disabled={!isAuthed}
        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 h-28 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={!isAuthed}
        className="mt-3 bg-green-400 hover:bg-green-500 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        Post Reply
      </button>
    </div>
  );
}