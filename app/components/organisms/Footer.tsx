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

        {/* Legal project notice (MANDATORY) */}
          <p className="mt-8 text-sm text-gray-400 text-center max-w-4xl mx-auto leading-relaxed">
            <strong>Studentisches Lehrprojekt:</strong> Diese Website ist eine
            Studierendenarbeit der Hochschule Reutlingen zu Lehr- und Lernzwecken.
            Alle Inhalte, Produkte und Dienstleistungen sind fiktiv und nicht geprüft.
            Bitte geben Sie keine sensiblen oder personenbezogene Daten in die Formulare
            der Website ein.{" "}
            <Link
              href="/impressum"
              className="text-green-400 hover:underline"
            >
              Mehr Informationen im Impressum →
            </Link>
          </p>

        {/* Bottom legal links row */}
        <div className="mt-12 flex justify-center gap-20">
          <Link
            href="/impressum"
            className="text-base font-semibold text-gray-300 hover:text-green-400 transition-colors"
          >
            Impressum
          </Link>

          <Link
            href="/contact"
            className="text-base font-semibold text-gray-300 hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}