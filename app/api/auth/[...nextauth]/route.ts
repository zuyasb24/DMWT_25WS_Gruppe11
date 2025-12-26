import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const { handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const username = credentials?.username as string | undefined;

        if (!email || !username) return null;

        return {
          id: email,
          email,
          name: username,
        };
      },
    }),
  ],

   pages: {
    signIn: "/login",
  },
  
  session: { strategy: "jwt" as const },

});

export const { GET, POST } = handlers;