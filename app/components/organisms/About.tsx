"use client";

import { motion } from "framer-motion";
import { Recycle, Wrench, Users } from "lucide-react";

export default function About() {
  const stats = [
    {
      number: "50M+",
      label: "Tons of E-waste Annually",
      icon: Recycle,
    },
    {
      number: "80%",
      label: "Can Be Repaired",
      icon: Wrench,
    },
    {
      number: "100K+",
      label: "Successful Repairs",
      icon: Users,
    },
  ];
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="text-green-400">Green IT</span> Matters
            </h2>
            <p className="text-xl text-gray-300">
              Over 50 million tons of e-waste are produced each year.
              At the same time, most students can&apos;t afford to replace a device every time something breaks.
              We believe that learning a few simple repair skills can change both,
              helping you save money while reducing your environmental impact.
            </p>
          </div>
        </motion.div>

          {/* Stats with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center"
            >
              <stat.icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    );
  }
  