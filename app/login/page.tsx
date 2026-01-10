"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // only used for register
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      // 1) If registering, create user in DB first
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            username: username.trim(),
            password,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data?.error ?? "Register failed");
          setLoading(false);
          return;
        }
      }

      // 2) Then sign in (login)
      const result = (await signIn("credentials", {
        redirect: false,
        email: cleanEmail,
        password,
        callbackUrl: "/",
      })) as { error?: string; url?: string } | null;

      if (result?.error) {
        setError("Login failed. Check email/password.");
        setLoading(false);
        return;
      }

     // Show success animation briefly, then navigate
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        router.push(result?.url ?? "/");
        router.refresh();
      }, 1800);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          {mode === "login" ? "Login" : "Create account"}
        </h1>
        <p className="text-gray-300 text-center mb-6">
          {mode === "login"
            ? "Log in to post questions and replies."
            : "Create an account to post questions and replies."}
        </p>
        
        {/* Animations area */}
        <div className="mb-4 flex justify-center min-h-[56px]">
          {loading && (
            <Image
              src="/animations/login-loading.gif"
              alt="Loading"
              width={48}
              height={48}
              unoptimized
            />
          )}
          {!loading && success && (
            <Image
              src="/animations/login-success.gif"
              alt="Login successful"
              width={56}
              height={56}
              unoptimized
            />
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode === "register" && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="cursor-pointer w-full text-gray-300 hover:text-white text-sm"
          >
            {mode === "login"
              ? "New here? Create an account"
              : "Already have an account? Login"}
          </button>
        </form>
      </div>
    </section>
  );
}