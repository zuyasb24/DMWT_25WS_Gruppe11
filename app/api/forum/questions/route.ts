import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await sql`
  SELECT 
    q.id, q.name, q.role, q.question, q.likes, q.created_at,
    COALESCE(r.replies_count, 0) AS replies_count
  FROM forum_questions q
  LEFT JOIN (
    SELECT question_id, COUNT(*)::int AS replies_count
    FROM forum_replies
    GROUP BY question_id
  ) r ON r.question_id = q.id
  ORDER BY q.created_at DESC;
`;
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch questions";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, role, question } = await req.json();

    if (!name || !question) {
      return NextResponse.json({ error: "name and question are required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO forum_questions (name, role, question)
      VALUES (${name}, ${role ?? null}, ${question})
      RETURNING id, name, role, question, likes, created_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to post question";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}