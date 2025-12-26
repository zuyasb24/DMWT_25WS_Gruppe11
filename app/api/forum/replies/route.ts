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
      SELECT id, question_id, name, role, reply, created_at
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
    const { questionId, name, role, reply } = await req.json();

    if (!questionId || !name || !reply) {
      return NextResponse.json(
        { error: "questionId, name and reply are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO forum_replies (question_id, name, role, reply)
      VALUES (${Number(questionId)}, ${name}, ${role ?? null}, ${reply})
      RETURNING id, question_id, name, role, reply, created_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to post reply";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}