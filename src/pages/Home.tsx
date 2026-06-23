import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, Star, Shield, RefreshCw, Users, ChevronRight, Play } from 'lucide-react';
import { cars, brands } from '../data/cars';
import CarCard from '../components/CarCard';
import CountUp from '../components/CountUp';

const stats = [
  { end: 500, suffix: '+', label: 'Cars Sold' },
  { end: 8,   suffix: '+', label: 'Years Experience' },
  { end: 20,  suffix: '+', label: 'Premium Brands' },
  { end: 100, suffix: '%', label: 'Verified Cars' },
];

const categories = [
  {
    key: 'brand-new',
    title: 'Brand New',
    subtitle: 'Zero km · Factory Fresh',
    description: 'Direct imports from Japan, UK & UAE. Full manufacturer warranty.',
    icon: '✦',
    color: 'from-emerald-500/20 to-transparent',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    key: 'reconditioned',
    title: 'Reconditioned',
    subtitle: 'Japan Grade · Auction Sheet',
    description: 'Certified pre-owned from Japan with full auction documentation.',
    icon: '◈',
    color: 'from-blue-500/20 to-transparent',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  {
    key: 'used',
    title: 'Used Cars',
    subtitle: 'Inspected · Verified',
    description: 'Quality checked used vehicles with verified documents and service history.',
    icon: '◉',
    color: 'from-orange-500/20 to-transparent',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
  },
];

const values = [
  { icon: <Star size={22} />, title: 'Premium Quality', desc: 'Every vehicle passes our 150-point inspection before listing.' },
  { icon: <Shield size={22} />, title: 'Fully Verified', desc: 'Complete documentation, clean history, transparent pricing.' },
  { icon: <RefreshCw size={22} />, title: 'Easy Exchange', desc: 'Sell or exchange your current car with zero hassle.' },
  { icon: <Users size={22} />, title: 'Expert Guidance', desc: 'Our team helps you find the perfect car for your lifestyle.' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroCategory, setHeroCategory] = useState<string>('brand-new');
  const featured = cars.filter(c => c.isFeatured).slice(0, 4);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };
    const onMouseLeave = () => { el.style.transform = 'translate(0,0) scale(1.05)'; };
    const parent = el.parentElement!;
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);
    return () => { parent.removeEventListener('mousemove', onMouseMove); parent.removeEventListener('mouseleave', onMouseLeave); };
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        {/* Background — drop hero-bg.mp4 into public/images/showroom/ to activate video */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Video layer — plays when file exists, hidden otherwise */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: 'block' }}
          >
            <source src="/images/showroom/hero-bg.mp4" type="video/mp4" />
            <source src="/images/showroom/hero-bg.webm" type="video/webm" />
          </video>

          {/* Fallback image shown behind video (visible while video loads or if no video file) */}
          <div
            ref={heroRef}
            className="absolute inset-[-5%] bg-cover bg-center transition-transform duration-300 ease-out"
            style={{ backgroundImage: 'url(/images/showroom/hero-bg.jpg)', transform: 'scale(1.05)' }}
          />

          {/* Overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,150,42,0.06) 0%, transparent 60%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-8 h-px bg-[#C8962A]" />
              <span className="text-[#C8962A] text-xs tracking-[0.25em] uppercase font-medium">Dhaka, Bangladesh</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-6">
              <span className="text-white">Your Dream Car</span>
              <br />
              <span className="text-gold-gradient font-semibold" style={{ background: 'linear-gradient(135deg, #C8962A, #E8B84B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Awaits
              </span>
            </h1>
            <p className="text-white/60 text-lg font-light mb-10 max-w-lg leading-relaxed">
              Bangladesh's finest collection of Brand New, Reconditioned and Used premium vehicles — curated for the discerning driver.
            </p>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setHeroCategory(cat.key); navigate(`/inventory?category=${cat.key}`); }}
                  className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-200 ${
                    heroCategory === cat.key
                      ? 'bg-[#C8962A] border-[#C8962A] text-black'
                      : 'border-white/20 text-white/70 hover:border-[#C8962A]/60 hover:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <a href="#inventory" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-[#C8962A] transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-[#C8962A]/15 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ end, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-[#C8962A]">
                <CountUp end={end} suffix={suffix} duration={2400} />
              </div>
              <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Browse by Type</div>
          <h2 className="text-4xl md:text-5xl font-light text-white">Choose Your <span className="font-semibold">Category</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.key}
              to={`/inventory?category=${cat.key}`}
              className={`group relative p-8 rounded-2xl border bg-gradient-to-br ${cat.color} ${cat.border} overflow-hidden hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-[#111] opacity-80" />
              <div className="relative z-10">
                <div className={`text-3xl mb-4 ${cat.accent}`}>{cat.icon}</div>
                <h3 className="text-white text-2xl font-semibold mb-1">{cat.title}</h3>
                <div className={`text-xs tracking-wider uppercase mb-4 ${cat.accent}`}>{cat.subtitle}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{cat.description}</p>
                <span className={`inline-flex items-center gap-2 text-sm ${cat.accent} group-hover:gap-3 transition-all`}>
                  Browse {cat.title} <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED INVENTORY ── */}
      <section id="inventory" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Handpicked</div>
              <h2 className="text-4xl md:text-5xl font-light text-white">Featured <span className="font-semibold">Inventory</span></h2>
            </div>
            <Link to="/inventory" className="hidden md:flex items-center gap-2 text-[#C8962A] text-sm border border-[#C8962A]/30 px-5 py-2.5 rounded-full hover:bg-[#C8962A]/10 transition-colors">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(car => <CarCard key={car.id} car={car} />)}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/inventory" className="inline-flex items-center gap-2 text-[#C8962A] border border-[#C8962A]/30 px-6 py-3 rounded-full hover:bg-[#C8962A]/10 transition-colors">
              View All Cars <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS STRIP ── */}
      <section className="py-14 border-y border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-white/25 text-xs tracking-[0.3em] uppercase">Brands We Deal In</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {brands.map(({ name, logo }) => (
              <div
                key={name}
                className="group flex flex-col items-center gap-3 opacity-35 hover:opacity-100 transition-opacity duration-300"
                title={name}
              >
                <img
                  src={logo}
                  alt={name}
                  className="h-12 w-12 object-contain filter brightness-0 invert group-hover:drop-shadow-[0_0_8px_rgba(200,150,42,0.6)] transition-all duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-white/50 text-[10px] tracking-widest uppercase group-hover:text-[#C8962A] transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE BANNER ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/showroom/showroom-bg.jpg)' }} />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,150,42,0.1) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-4">Our Showroom</div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Experience Beyond<br /><span className="font-semibold text-[#C8962A]">Ordinary</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg mb-10">
            Step into our state-of-the-art showroom and experience the finest automobiles in a curated luxury setting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="bg-[#C8962A] text-black font-semibold px-8 py-4 rounded-full hover:bg-[#E8B84B] transition-colors">
              Book a Visit
            </Link>
            <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white border border-white/20 px-8 py-4 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={12} fill="currentColor" />
              </div>
              Watch Tour
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-4">Why Us</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Trusted by Thousands<br /><span className="font-semibold">Across Bangladesh</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              We are not just a car dealership — we are your long-term automotive partner. Every car we sell carries our reputation.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-[#C8962A] border border-[#C8962A]/30 px-6 py-3 rounded-full hover:bg-[#C8962A]/10 transition-colors text-sm">
              Our Story <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 bg-[#111] border border-white/5 rounded-2xl hover:border-[#C8962A]/20 transition-colors">
                <div className="text-[#C8962A] mb-4">{icon}</div>
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-[#0d0d0d] border-t border-[#C8962A]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            Ready to Find Your<br /><span className="font-semibold text-[#C8962A]">Perfect Car?</span>
          </h2>
          <p className="text-white/50 mb-10">Browse our full inventory or chat with our team to get personalized recommendations.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/inventory" className="bg-[#C8962A] text-black font-semibold px-8 py-4 rounded-full hover:bg-[#E8B84B] transition-colors w-full sm:w-auto text-center">
              Browse Inventory
            </Link>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-[#25D366]/40 text-[#25D366] px-8 py-4 rounded-full hover:bg-[#25D366]/10 transition-colors w-full sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
