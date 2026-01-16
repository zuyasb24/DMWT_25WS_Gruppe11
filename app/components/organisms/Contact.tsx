"use client";

export default function Contact() {
  return (
    <section className="w-full px-6 py-16 flex justify-center">
      <div className="max-w-3xl w-full space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Contact
          </h1>
          <p className="mt-3 text-white/70">
            This is a placeholder contact page for a student project.
          </p>
        </header>

        {/* Content box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Company Information
            </h2>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">Green IT Repair</strong>
              <br />
              Fake. 150
              <br />
              70000 Something
              <br />
              Mars
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
        </div>
      </div>
    </section>
  );
}