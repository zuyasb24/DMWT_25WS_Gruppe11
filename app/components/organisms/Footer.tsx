import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-8 text-center text-gray-400">
      <div className="flex flex-col items-center gap-2">
        <p>
          &copy; {new Date().getFullYear()} Green IT Repair. All rights reserved.
        </p>

        <Link
          href="/legal-notice"
          className="text-sm text-gray-500 hover:text-white transition"
        >
          Legal Notice / Contact
        </Link>
      </div>
    </footer>
  );
}