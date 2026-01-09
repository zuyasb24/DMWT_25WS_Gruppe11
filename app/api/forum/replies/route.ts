import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json({ error: "questionId is required" }, { status: 400 });
    }

    // if logged in, I can compute liked_by_me
    const { auth } = await import("@/app/lib/auth");
    const session = await auth();

    // id stored on session.user in auth callbacks
    const userIdRaw = (session?.user as { id?: unknown } | undefined)?.id;
    const userId = typeof userIdRaw === "string" || typeof userIdRaw === "number" ? Number(userIdRaw) : null;
    const safeUserId = Number.isFinite(userId as number) ? (userId as number) : null;

    const result = await sql`
      SELECT 
        r.id,
        r.question_id,
        r.name,
        r.role,
        r.reply,
        r.created_at,
        COALESCE(l.likes, 0) AS likes,
        CASE
          WHEN ${safeUserId}::int IS NULL THEN false
          ELSE EXISTS (
            SELECT 1
            FROM forum_reply_likes frl
            WHERE frl.reply_id = r.id
              AND frl.user_id = ${safeUserId}
          )
        END AS liked_by_me
      FROM forum_replies r
      LEFT JOIN (
        SELECT reply_id, COUNT(*)::int AS likes
        FROM forum_reply_likes
        GROUP BY reply_id
      ) l ON l.reply_id = r.id
      WHERE r.question_id = ${Number(questionId)}
      ORDER BY r.created_at ASC;
    `;

    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch replies";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Require login
    const { auth } = await import("@/app/lib/auth"); // adjust if your auth helper path differs
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { questionId, role, reply } = await req.json();

    const name = String(session.user.name ?? session.user.email ?? "User");
    const safeRole = role ? String(role) : null;
    const safeReply = String(reply ?? "").trim();
    const qid = Number(questionId);

    if (!Number.isFinite(qid) || !safeReply) {
      return NextResponse.json(
        { error: "questionId and reply are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO forum_replies (question_id, name, role, reply)
      VALUES (${qid}, ${name}, ${safeRole}, ${safeReply})
      RETURNING id, question_id, name, role, reply, likes, created_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to post reply";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}