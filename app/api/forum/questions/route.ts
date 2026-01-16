// GET /api/forum/questions
// Returns all forum questions with their reply count.
// POST /api/forum/questions
// Creates a new forum question (authenticated users only).
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Disable static caching to always return the latest forum data
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
    //Require login
    const { auth } = await import("@/app/lib/auth"); // Import auth dynamically to avoid bundling issues in edge/runtime context
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, question } = await req.json();

    const name = String(session.user.name ?? session.user.email ?? "User");
    const safeRole = role ? String(role) : null;
    const safeQuestion = String(question ?? "").trim();

    if (!safeQuestion) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO forum_questions (name, role, question)
      VALUES (${name}, ${safeRole}, ${safeQuestion})
      RETURNING id, name, role, question, likes, created_at;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to post question";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}