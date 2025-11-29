export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <nav className="w-full max-w-6xl mx-auto px-10 py-4 flex justify-between items-center">

        {/* Logo */}
        <span className="text-white text-2xl font-bold">Green IT Repair</span>

        {/* Navigation Links */}
        <div className="space-x-8">
          <a href="#about" className="text-white hover:text-green-400 transition">
            About
          </a>
          <a href="#tutorials" className="text-white hover:text-green-400 transition">
            Tutorials
          </a>
          <a href="#testimonials" className="text-white hover:text-green-400 transition">
            Testimonials
          </a>
        </div>

      </nav>
    </header>
  );
}