import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.POSTGRES_URL?.includes("sslmode=require")
      ? undefined
      : { rejectUnauthorized: false },
  });

  const client = await pool.connect();
  try {
    const db = await client.query("select current_database() as db, current_schema() as schema");
    const users = await client.query("select count(*)::int as users_count from users");
    return NextResponse.json({
      db: db.rows[0],
      users_count: users.rows[0].users_count,
    });
  } finally {
    client.release();
    await pool.end();
  }
}