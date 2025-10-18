export default function Testimonials() {
  const testimonials = [
    { name: 'Sarah Johnson', comment: 'Amazing tutorials! I fixed my laptop screen and saved $300.' },
    { name: 'Mike Chen', comment: 'As a college student, these guides have been a lifesaver.' },
    { name: 'Emily Rodriguez', comment: 'Great resource for learning basic repairs.' },
  ];
  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          What Our <span className="text-green-400">Community</span> Says
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-lg font-bold text-green-400 mb-2">{t.name}</div>
              <div className="text-gray-300">{t.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
