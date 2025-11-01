import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET: Fetch all testimonials
export async function GET() {
try {
  const result = await sql`SELECT * FROM testimonials ORDER BY id DESC;`;
  return NextResponse.json(result.rows);
} catch (error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Failed to fetch testimonials";
  return NextResponse.json(
    { error: errorMessage },
    { status: 500 }
  );
}
}

// POST: Submit a new testimonial
export async function POST(req: Request) {
try {
  const { name, role, testimonial, rating } = await req.json();

  if (!name || !role || !testimonial || !rating) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO testimonials (name, role, testimonial, rating)
    VALUES (${name}, ${role}, ${testimonial}, ${rating});
  `;

  return NextResponse.json({ ok: true });
} catch (error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Failed to submit testimonial";
  return NextResponse.json(
    { error: errorMessage },
    { status: 500 }
  );
}
}
