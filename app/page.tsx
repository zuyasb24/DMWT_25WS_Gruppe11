import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Tutorials from "./components/Tutorials";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
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
