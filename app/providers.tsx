// Centralized client-side providers (e.g. NextAuth SessionProvider).
// Wraps the application with required React context.
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}