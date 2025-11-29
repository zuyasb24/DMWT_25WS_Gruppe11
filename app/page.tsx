"use client";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/sections/Hero/Hero";
import About from "@/app/components/sections/About/About";
import Tutorials from "@/app/components/sections/Tutorials/Tutorials";
import Testimonials from "@/app/components/sections/Testimonials/Testimonials";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Tutorials />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
