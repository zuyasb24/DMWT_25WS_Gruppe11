import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

// POST /api/auth/register
// Creates a new user account (email + username) and stores a hashed password in the DB.
// Returns { ok: true } on success or { error: string } with an appropriate status code.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email ?? "").toString().trim().toLowerCase();
    const username = (body.username ?? "").toString().trim();
    const password = (body.password ?? "").toString();

    if (!email || !username || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1;`;
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (email, username, password_hash)
      VALUES (${email}, ${username}, ${password_hash});
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Register failed." }, { status: 500 });
  }
}