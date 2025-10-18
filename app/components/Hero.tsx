export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Repair, Don't <span className="text-green-400">Replace</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
          Join the Green IT revolution. Learn to fix your devices, reduce e-waste, and save money with our DIY repair tutorials.
        </p>
        <button className="bg-green-400 hover:bg-green-500 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300">
          Start Learning Today
        </button>
      </div>
    </section>
  );
}
