"use client";

export default function LegalNotice() {
  return (
    <section className="w-full px-6 py-16 flex justify-center">
      <div className="max-w-3xl w-full space-y-10">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Legal <span className="text-green-400">Notice</span>
          </h1>
          <p className="mt-3 text-white/70">
            Transparency and responsibility are part of our Green IT mission.
          </p>
        </header>

        {/* Content box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">
          {/* Company */}
          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Company Information
            </h2>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">Green IT Repair</strong>
              <br />
              Alteburgstr. 150
              <br />
              72762 Reutlingen
              <br />
              Germany
            </p>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Contact
            </h2>
            <p className="text-white/80 leading-relaxed">
              Email:{" "}
              <a
                href="mailto:contact@greenit-repair.example"
                className="text-green-400 hover:underline"
              >
                contact@greenit-repair.example
              </a>
              <br />
              Website:{" "}
              <span className="text-white">
                https://greenit-rho.vercel.app
              </span>
            </p>
          </section>

          {/* Responsibility */}
          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Responsibility for Content
            </h2>
            <p className="text-white/70 leading-relaxed">
              The content of this website is provided for informational purposes
              only. Green IT Repair aims to promote sustainable device repair,
              reuse and responsible recycling practices.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}