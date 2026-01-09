"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function InteractiveRating({
  tutorialKey,
  initialAvg,
  initialCount,
}: {
  tutorialKey: string;
  initialAvg: number;
  initialCount: number;
}) {
  const { data: session } = useSession();
  const [avg, setAvg] = useState(initialAvg);
  const [count, setCount] = useState(initialCount);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setAvg(initialAvg);
  setCount(initialCount);
  }, [initialAvg, initialCount]);

  async function submitRating(value: number) {
    if (!session?.user) {
      alert("Please log in to rate tutorials.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tutorials/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorialKey, rating: value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to rate");

      setAvg(data.avg);
      setCount(data.count);
    } catch {
      alert("Could not submit rating. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const display = hover ?? Math.round(avg);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          const filled = value <= display;

          return (
            <button
              key={value}
              type="button"
              disabled={loading}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
              onClick={() => submitRating(value)}
              className="disabled:opacity-50"
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`h-4 w-4 ${
                  filled ? "text-yellow-400 fill-current" : "text-gray-600"
                }`}
              />
            </button>
          );
        })}
      </div>

      <span className="text-sm text-gray-400">
        {avg.toFixed(1)} ({count})
      </span>
    </div>
  );
}