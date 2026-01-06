"use client";

import Hero from "@/app/components/organisms/Hero";
import About from "@/app/components/organisms/About";
import Tutorials from "@/app/components/organisms/Tutorials";
import Forum from "@/app/components/organisms/Forum";
import Infographic from "@/app/components/organisms/Infographic";

export default function Home() {
  return (
<div className="min-h-screen bg-gray-900 text-white">

      <main>
        <Hero />
        <About />
        <Infographic />
        <Tutorials />
        <Forum />
      </main>
      
    </div>
  );
}
