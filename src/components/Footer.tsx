import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#C8962A]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.jpg" alt="New Auto Galaxy" className="h-12 w-12 rounded-full border border-[#C8962A]/40 object-cover" />
              <div>
                <div className="text-[#C8962A] font-semibold text-sm tracking-widest uppercase">New Auto</div>
                <div className="text-white/50 text-xs tracking-[0.2em] uppercase">Galaxy</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your trusted destination for premium Brand New, Reconditioned &amp; Used vehicles in Bangladesh.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C8962A] hover:text-[#C8962A] transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C8962A] hover:text-[#C8962A] transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C8962A] hover:text-[#C8962A] transition-colors">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ['/', 'Home'],
                ['/inventory?category=brand-new', 'Brand New Cars'],
                ['/inventory?category=reconditioned', 'Reconditioned'],
                ['/inventory?category=used', 'Used Cars'],
                ['/sell', 'Sell Your Car'],
                ['/about', 'About Us'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 text-sm hover:text-[#C8962A] transition-colors">
                    — {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Phone size={15} className="text-[#C8962A] mt-0.5 shrink-0" />
                <span>+880 17 0000 0000</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Mail size={15} className="text-[#C8962A] mt-0.5 shrink-0" />
                <span>info@newauto.com.bd</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={15} className="text-[#C8962A] mt-0.5 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#1ebe5a] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              {[
                ['Saturday – Thursday', '9:00 AM – 8:00 PM'],
                ['Friday', '2:00 PM – 8:00 PM'],
              ].map(([day, hours]) => (
                <li key={day} className="flex flex-col">
                  <span className="text-white/70">{day}</span>
                  <span className="text-[#C8962A]">{hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 border border-[#C8962A]/20 rounded-lg">
              <p className="text-xs text-white/40">
                Walk-ins welcome. Appointments preferred for test drives.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 New Auto Galaxy. All rights reserved.</p>
          <p className="text-white/20 text-xs">Premium Cars · Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
