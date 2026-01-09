"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <nav className="w-full max-w-6xl mx-auto px-4 md:px-10 py-4 
                      flex flex-wrap md:flex-nowrap justify-between items-center gap-4">

        {/* Logo */}
        <Link
          href="/#home"
          className="group flex items-center gap-3 whitespace-nowrap transition">
          <Image
            src="/brand/logo.png"
            alt="Green IT Repair logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="text-white text-2xl font-bold">
            Green IT{" "}
            <span className="text-green-400 group-hover:text-green-300 transition">
              Repair
            </span>
          </span>
        </Link>
        {/* Navigation + Auth */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Navigation Links */}
          <div className="flex gap-4 md:gap-8">
            <Link href="/#home" className="text-white hover:text-green-400 transition">Home</Link>
            <Link href="/#about" className="text-white hover:text-green-400 transition">About</Link>
            <Link href="/#tutorials" className="text-white hover:text-green-400 transition">Tutorials</Link>
            <Link href="/#forum" className="text-white hover:text-green-400 transition">Forum</Link>
          </div>

          {/* Login / Logout */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="text-gray-200 text-sm">
                  Hi, <span className="text-green-400 font-semibold">{session.user?.name}</span>
                </span>
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn(undefined, { callbackUrl: "/" })}
                className="cursor-pointer bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
        
      </nav>
    </header>
  );
}