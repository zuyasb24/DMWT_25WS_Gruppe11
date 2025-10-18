export default function About() {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why <span className="text-green-400">Green IT</span> Matters
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Every year, millions of devices are discarded when they could be repaired. We're changing that by empowering people to fix their own devices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">50M+</div>
              <div className="text-gray-300">Tons of E-waste Annually</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">80%</div>
              <div className="text-gray-300">Can Be Repaired</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">100K+</div>
              <div className="text-gray-300">Community Members</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  