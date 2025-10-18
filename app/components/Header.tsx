export default function Header() {
    return (
      <header className="w-full bg-gray-900 border-b border-gray-800 fixed top-0 left-0 z-50">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-green-400 text-2xl font-bold">Green IT Repair</span>
          <div className="space-x-6">
            <a href="#about" className="text-gray-300 hover:text-green-400">About</a>
            <a href="#tutorials" className="text-gray-300 hover:text-green-400">Tutorials</a>
            <a href="#testimonials" className="text-gray-300 hover:text-green-400">Testimonials</a>
          </div>
        </nav>
      </header>
    );
  }
  