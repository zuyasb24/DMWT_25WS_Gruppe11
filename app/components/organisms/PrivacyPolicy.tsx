export default function PrivacyPolicy() {
  return (
    <section className="w-full px-6 py-16 flex justify-center">
      <div className="max-w-3xl w-full space-y-10">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Privacy <span className="text-green-400">Policy</span>
          </h1>
          <p className="mt-3 text-white/70">
            This page explains how we handle data in the context of this project.
          </p>
        </header>

        {/* Content box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Overview
            </h2>
            <p className="text-white/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Data We (May) Process
            </h2>
            <p className="text-white/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              Your Rights
            </h2>
            <p className="text-white/70 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </section>

          <section>
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
            </p>
          </section>

          <p className="text-sm text-white/50 pt-2">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}