"use client";

import Hero from "@/app/components/sections/Hero/Hero";
import About from "@/app/components/sections/About/About";
import Tutorials from "@/app/components/sections/Tutorials/Tutorials";
import Forum from "@/app/components/sections/Forum/Forum";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <main>
        <Hero />
        <About />
        <Tutorials />
        <Forum />
      </main>
      
    </div>
  );
}
