import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

const { handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const result = await sql`
          SELECT id, email, username, password_hash
          FROM users
          WHERE email = ${email}
          LIMIT 1;
        `;

        const user = result.rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
});

export const { GET, POST } = handlers;