"use client";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/sections/Hero/Hero";
import About from "@/app/components/sections/About/About";
import Tutorials from "@/app/components/sections/Tutorials/Tutorials";
import Forum from "@/app/components/sections/Forum/Forum";
import Footer from "@/app/components/layout/Footer";

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
