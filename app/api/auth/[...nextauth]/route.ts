// NextAuth route handler wrapper.
// Delegates GET and POST requests to the shared auth configuration in /app/lib/auth.
import { handlers } from "@/app/lib/auth";

export const runtime = "nodejs";

export const GET = handlers.GET;
export const POST = handlers.POST;