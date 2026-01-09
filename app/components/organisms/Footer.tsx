import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-gray-700 py-10 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
       
       {/* Footer logo */}
        <Link
          href="/#home"
          className="flex items-center gap-2 opacity-80"
        >
          <Image
            src="/brand/logo.png"
            alt="Green IT Repair logo"
            width={120}
            height={40}
            className="h-6 w-auto"
          />
          <span className="text-sm font-semibold text-white">
            Green IT <span className="text-green-400">Repair</span>
          </span>
        </Link>
       
        <p className="text-sm text-white/50 text-center">
          © 2025 Green IT Repair. All rights reserved.
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