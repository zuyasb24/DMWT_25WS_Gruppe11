import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-10 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
        <p className="text-sm text-white/50 text-center">
          © {new Date().getFullYear()} Green IT Repair. All rights reserved.
        </p>

        <div className="flex gap-6">
          <Link
            href="/legal-notice"
            className="text-base font-medium text-white/70 hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}