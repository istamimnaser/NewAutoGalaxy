import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/sell', label: 'Sell Your Car' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-[#C8962A]/20 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="New Auto Galaxy" className="h-10 w-10 rounded-full object-cover border border-[#C8962A]/40" />
            <div className="hidden sm:block">
              <span className="block text-[#C8962A] font-semibold text-sm tracking-widest uppercase">New Auto</span>
              <span className="block text-white font-light text-xs tracking-[0.2em] uppercase">Galaxy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-[#C8962A]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+8801700000000"
              className="hidden md:flex items-center gap-2 text-[#C8962A] text-sm border border-[#C8962A]/40 px-4 py-2 rounded-full hover:bg-[#C8962A]/10 transition-colors"
            >
              <Phone size={14} />
              Call Us
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-white/80 hover:text-white p-2"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.97)' }}
      >
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex items-center justify-between mb-12">
            <img src="/logo.jpg" alt="New Auto Galaxy" className="h-12 w-12 rounded-full border border-[#C8962A]/40" />
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-3xl font-light tracking-wide transition-colors ${
                  location.pathname === to ? 'text-[#C8962A]' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <a href="tel:+8801700000000" className="flex items-center gap-3 text-[#C8962A]">
              <Phone size={16} />
              <span className="text-sm tracking-wide">+880 17 0000 0000</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
