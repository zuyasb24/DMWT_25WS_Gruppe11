import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-gray-700 py-10 text-gray-400">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top compact block */}
        <div className="flex flex-col items-center text-center gap-3">
          <Link href="/#home" className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="Green IT Repair logo"
              width={160}
              height={50}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-white">
              Green IT <span className="text-green-400">Repair</span>
            </span>
          </Link>

          <p className="text-l font-bold text-gray-300">
            Save the planet, one repair at a time.
          </p>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Green IT Repair. All rights reserved.
          </p>
        </div>

        {/* Bottom links row (space between) */}
        <div className="mt-12 flex justify-center gap-20">
          <Link
            href="/privacy-policy"
            className="text-base font-semibold text-gray-300 hover:text-green-400 transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/legal-notice"
            className="text-base font-semibold text-gray-300 hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}