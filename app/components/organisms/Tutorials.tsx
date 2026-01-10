"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Search } from "lucide-react";
import InteractiveRating from "../atoms/InteractiveRating";
import DifficultyBadge, { type Difficulty } from "../molecules/DifficultyBadge";

type Category = "Smartphone" | "Laptop" | "Tablet" | "Audio";

type Tutorial = {
  key: string; // stable key for DB ratings
  title: string;
  intro: string;
  duration: string;
  difficulty: Difficulty;
  category: Category;
  youtubeUrl: string;
};

// tutorial list -> for now hardcoded, easy to maintain
const tutorials: Tutorial[] = [
  {
    key: "iphone-screen-replacement",
    title: "iPhone Screen Replacement",
    intro:
      "This tutorial covers the essential steps for screen replacement, including safety precautions and tool requirements.",
    duration: "6:30 min",
    difficulty: "Intermediate",
    category: "Smartphone",
    youtubeUrl: "https://www.youtube.com/watch?v=jtl4KKRIheo",
  },
  {
    key: "laptop-battery-replacement",
    title: "Laptop Battery Replacement",
    intro:
      "Battery replacement is straightforward with the right tools. Follow along to avoid common mistakes.",
    duration: "8 min",
    difficulty: "Beginner",
    category: "Laptop",
    youtubeUrl: "https://www.youtube.com/watch?v=TpFNDakvn1I",
  },
  {
    key: "headphone-jack-repair",
    title: "Headphone Jack Repair",
    intro:
      "Headphone jacks can be repaired easily. This guide shows you how to diagnose and fix the problem.",
    duration: "4 min",
    difficulty: "Beginner",
    category: "Audio",
    youtubeUrl: "https://www.youtube.com/watch?v=yWwEzOVLXM0",
  },
  {
    key: "tablet-charging-port-fix",
    title: "Tablet Charging Port Fix",
    intro:
      "Diagnose charging issues and replace a worn-out charging port step-by-step.",
    duration: "4 min",
    difficulty: "Intermediate",
    category: "Tablet",
    youtubeUrl: "https://www.youtube.com/watch?v=GxIpAEbU6Wo",
  },
  {
    key: "smartphone-water-damage-recovery",
    title: "Smartphone Water Damage Recovery",
    intro:
      "Emergency steps and recovery methods to save a water-damaged phone.",
    duration: "12 min",
    difficulty: "Advanced",
    category: "Smartphone",
    youtubeUrl: "https://www.youtube.com/watch?v=nkl0tEnRdYg",
  },
  {
    key: "keyboard-key-replacement",
    title: "Keyboard Key Replacement",
    intro:
      "Replace missing or broken keys on laptop or mechanical keyboards safely.",
    duration: "5:45 min",
    difficulty: "Beginner",
    category: "Laptop",
    youtubeUrl: "https://www.youtube.com/watch?v=7Lakc1_jkuQ",
  },
  // maybe add more (Tablet, Advanced, etc.), must ask martinez
];

type RatingMap = Record<string, { avg: number; count: number }>;

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const v = u.searchParams.get("v");
    if (v) return v;
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
  } catch {}
  return "";
}

export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceType, setDeviceType] = useState<"" | Category>("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");

  const [ratings, setRatings] = useState<RatingMap>({});

  // Fetch rating stats for all tutorial keys once
  useEffect(() => {
    const keys = tutorials.map((t) => t.key).join(",");
    fetch(`/api/tutorials/ratings?keys=${encodeURIComponent(keys)}`)
      .then((r) => r.json())
      .then((data) => setRatings(data))
      .catch(() => setRatings({}));
  }, []);

  const filteredTutorials = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return tutorials.filter((t) => {
      const matchesSearch =
        s === "" ||
        t.title.toLowerCase().includes(s) ||
        t.intro.toLowerCase().includes(s);

      const matchesDevice = deviceType === "" || t.category === deviceType;
      const matchesDifficulty = difficulty === "" || t.difficulty === difficulty;

      return matchesSearch && matchesDevice && matchesDifficulty;
    });
  }, [searchTerm, deviceType, difficulty]);

  function clearFilters() {
    setSearchTerm("");
    setDeviceType("");
    setDifficulty("");
  }

  return (
    <section
      id="tutorials" className="py-20">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DIY <span className="text-green-400">Repair Tutorials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Step-by-step video guides to help you repair your devices like a pro.
            From beginner-friendly fixes to advanced techniques.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 shadow-xl shadow-black/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              />
            </div>

            <select
              value={deviceType}
              onChange={(e) => setDeviceType((e.target.value as Category) || "")}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
            >
              <option value="">All Device Types</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Audio">Audio</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty((e.target.value as Difficulty) || "")
              }
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-400"
            >
              <option value="">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, index) => {
            const videoId = extractYouTubeId(tutorial.youtubeUrl);
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "";

            const stat = ratings[tutorial.key] || { avg: 0, count: 0 };

            return (
              <motion.div
                key={tutorial.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md shadow-xl shadow-black/30 hover:border-green-400/40 transition-all duration-300 group"
              >
          
                <a
                  href={tutorial.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block"
                  aria-label={`Watch ${tutorial.title} on YouTube`}
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-800" />
                  )}

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-16 w-16 text-green-400" />
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-green-400 px-2 py-1 rounded text-sm font-medium">
                      {tutorial.category}
                    </span>
                  </div>
                </a>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {tutorial.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {tutorial.intro}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{tutorial.duration}</span>
                      </div>

                      <InteractiveRating
                        tutorialKey={tutorial.key}
                        initialAvg={stat.avg}
                        initialCount={stat.count}
                      />
                    </div>

                    <DifficultyBadge difficulty={tutorial.difficulty} />
                  </div>

                  <a
                    href={tutorial.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Watch Tutorial
                  </a>
                </div>
              </motion.div>
            );
          })}

          {filteredTutorials.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">
              No tutorials match your filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}