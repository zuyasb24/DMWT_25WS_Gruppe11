export default function Tutorials() {
    const tutorials = [
      { title: 'iPhone Screen Replacement', duration: '1 min', difficulty: 'Intermediate' },
      { title: 'Laptop Battery Replacement', duration: '2 min', difficulty: 'Beginner' },
      { title: 'Headphone Jack Repair', duration: '1 min', difficulty: 'Beginner' },
      { title: 'Tablet Charging Port Fix', duration: '3 min', difficulty: 'Intermediate' },
      { title: 'Keyboard Key Replacement', duration: '1 min', difficulty: 'Beginner' },
      { title: 'Smartphone Water Damage Recovery', duration: '2 min', difficulty: 'Advanced' },
    ];
    return (
      <section id="tutorials" className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            DIY <span className="text-green-400">Repair Tutorials</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Step-by-step guides to help you repair your devices like a pro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tut) => (
              <div key={tut.title} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-green-400 transition">
                <h3 className="text-xl font-bold text-white mb-2">{tut.title}</h3>
                <div className="text-gray-400 mb-2">{tut.duration} • {tut.difficulty}</div>
                <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition">
                  Watch Tutorial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  