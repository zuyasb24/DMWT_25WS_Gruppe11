"use client";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Tutorials from "@/app/components/Tutorials";
import Testimonials from "@/app/components/Testimonials";
import Footer from "@/app/components/Footer";

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
