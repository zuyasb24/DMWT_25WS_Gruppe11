import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const result =
          await sql`SELECT id, email, username, password_hash FROM users WHERE email = ${email} LIMIT 1;`;

        const user = result.rows[0];
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.username, // this becomes session.user.name
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },

  // use custom login page, not the default white page
  pages: {
    signIn: "/login",
  },
});

export const { GET, POST } = handlers;