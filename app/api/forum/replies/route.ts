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

    const result = await sql`
      SELECT id, question_id, name, role, reply, likes, created_at
      FROM forum_replies
      WHERE question_id = ${Number(questionId)}
      ORDER BY created_at ASC;
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