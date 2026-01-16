"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react"; 

export default function CreatorCTASection() {
  return (
    <section id="creator-cta" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-900/50 to-gray-800/50 rounded-2xl p-8 md:p-12 border border-green-800/30 shadow-xl shadow-black/30"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Leaf className="h-6 w-6 text-green-400" />
              <h3 className="text-3xl font-bold text-white">
                Are you a <span className="text-green-400">content creator</span>?
              </h3>
              <Leaf className="h-6 w-6 text-green-400" />
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
            Create repair videos on YouTube or TikTok? We’re opening Green IT Repair to
            selected creators soon. Request early access to get your tutorials featured.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 transition-colors duration-300"
              >
                Contact us for creator access
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Creator submissions are curated to keep quality high.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}