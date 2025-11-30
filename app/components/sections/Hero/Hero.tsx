export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat px-6 md:pl-20 md:pr-10"
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Left-aligned content */}
      <div className="relative z-10 max-w-lg md:max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Save the planet,
          <br />
          one <span className="text-green-400">repair</span> at a time.
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md md:max-w-xl">
          Learn practical repair guides that extend your device’s life and reduce e-waste.
        </p>

        <a
          href="#tutorials"
          className="bg-green-400 hover:bg-green-500 text-black font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg transition-all duration-300 inline-block"
        >
          Start repairing
        </a>
      </div>
    </section>
  );
}
