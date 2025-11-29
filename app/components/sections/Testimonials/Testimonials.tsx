"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role?: string | null;
  testimonial: string;
  rating: number;
  created_at?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = (await res.json()) as Testimonial[];
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
        setTestimonials([]);
      }
    }
    loadTestimonials();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !testimonial.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, testimonial, rating }),
      });

      if (res.ok) {
        setName("");
        setRole("");
        setTestimonial("");
        setRating(5);

        const updated = await fetch("/api/testimonials");
        const data = (await updated.json()) as Testimonial[];
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials([]);
        }
      } else {
        setError("Failed to submit testimonial");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setError("Error submitting testimonial");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          What <span className="text-green-400">People</span> Are Saying
        </h2>

        {/* Optional intro line */}
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Real stories from people learning how to repair their devices and save money.
        </p>

        {/* Testimonial Form */}
        <div className="max-w-2xl mx-auto mb-16 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">Tell Us What You Think</h3>

          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Your Role (e.g., Tech Enthusiast, Student, Teacher)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400"
              />
            </div>

            <div>
              <textarea
                placeholder="Share your thoughts..."
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-400 h-32 resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none transition-colors"
                >
                  <span className={star <= rating ? "text-yellow-400" : "text-gray-600"}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!testimonials || testimonials.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No testimonials yet. Be the first to share your experience!
            </div>
          ) : (
            testimonials.map((t: Testimonial) => (
              <div
                key={t.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 relative"
              >
                {/* Quote mark */}
                <div className="text-green-400 text-6xl font-serif absolute top-4 right-4 opacity-20">
                  &quot;
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.role || "User"}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < t.rating ? "text-yellow-400" : "text-gray-600"}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-gray-300 relative z-10 leading-relaxed">
                  &quot;{t.testimonial}&quot;
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
