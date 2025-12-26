export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <nav className="w-full max-w-6xl mx-auto px-4 md:px-10 py-4 
                      flex flex-wrap md:flex-nowrap justify-between items-center gap-4">

        {/* Logo */}
        <span className="text-white text-2xl font-bold whitespace-nowrap">
          Green IT Repair
        </span>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4 md:gap-8 ml-auto">
          <a href="#home" className="text-white hover:text-green-400 transition">Home</a>
          <a href="#about" className="text-white hover:text-green-400 transition">About</a>
          <a href="#tutorials" className="text-white hover:text-green-400 transition">Tutorials</a>
          <a href="#forum" className="text-white hover:text-green-400 transition">Forum</a>
        </div>

      </nav>
    </header>
  );
}