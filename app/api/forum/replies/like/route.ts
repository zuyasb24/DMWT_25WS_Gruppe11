// POST /api/forum/replies/like
// Adds a like to a reply for the current user.
// Ensures a user can like a reply only once and returns the updated like count.
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Disable caching to always return the current like count
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Require login
    const { auth } = await import("@/app/lib/auth");
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { replyId?: unknown };
    const replyId = Number(body.replyId);

    if (!Number.isFinite(replyId)) {
      return NextResponse.json({ error: "replyId is required." }, { status: 400 });
    }

    // need the logged-in user's id to prevent multiple likes
    const userId = Number((session.user as { id?: unknown }).id);

    if (!Number.isFinite(userId)) {
      return NextResponse.json(
        { error: "User id missing in session." },
        { status: 500 }
      );
    }

    // Insert like ONCE per user per reply (PRIMARY KEY and ON conflict prevents duplicates)
    await sql`
      INSERT INTO forum_reply_likes (reply_id, user_id)
      VALUES (${replyId}, ${userId})
      ON CONFLICT (reply_id, user_id) DO NOTHING;
    `;

    // Return the real like count (source of truth)
    const countRes = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count
      FROM forum_reply_likes
      WHERE reply_id = ${replyId};
    `;

    return NextResponse.json({ likes: countRes.rows[0]?.count ?? 0 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to like reply";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}