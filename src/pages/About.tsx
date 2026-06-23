import { Link } from 'react-router-dom';
import { Award, Globe, HeartHandshake, TrendingUp } from 'lucide-react';

const milestones = [
  { year: '2016', event: 'Founded in Dhaka with a vision to bring premium cars to Bangladesh.' },
  { year: '2018', event: 'Launched our first Japan reconditioned import channel.' },
  { year: '2020', event: 'Expanded to brand new imports from Japan, UAE & UK.' },
  { year: '2023', event: 'Surpassed 400+ happy customers across Bangladesh.' },
  { year: '2026', event: 'Opened our premium showroom — the New Auto Galaxy experience.' },
];

const values = [
  { icon: <Award size={22} />, title: 'Excellence', desc: 'We never compromise on quality. Every car is inspected and verified before it reaches our showroom.' },
  { icon: <HeartHandshake size={22} />, title: 'Integrity', desc: 'Transparent pricing. No hidden fees. What you see is exactly what you get.' },
  { icon: <Globe size={22} />, title: 'Global Reach', desc: 'Direct sourcing networks in Japan, UK, UAE and Singapore.' },
  { icon: <TrendingUp size={22} />, title: 'Growth', desc: 'Continuously expanding our fleet and services to meet your evolving needs.' },
];

export default function About() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden mb-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/showroom/about-bg.jpg)' }} />
        <div className="absolute inset-0 bg-black/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-4">Our Story</div>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
            About <span className="font-semibold text-[#C8962A]">New Auto Galaxy</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
            A decade of passion, trust, and excellence in the Bangladesh automotive market.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-4xl font-light text-white mb-6">
              More Than a <span className="font-semibold text-[#C8962A]">Dealership</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              New Auto Galaxy was born from a simple belief: every Bangladeshi deserves access to quality, verified automobiles at fair prices — without the guesswork or hidden costs.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              We source directly from Japan, UK, and UAE, ensuring that every vehicle in our inventory meets the highest international standards before it ever reaches a customer's hands.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Whether you're looking for a brand new flagship or a budget-friendly used car, our expert team is here to guide you to the perfect choice — for life.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#C8962A] text-black font-semibold px-7 py-3.5 rounded-full hover:bg-[#E8B84B] transition-colors text-sm">
              Get in Touch
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['500+', 'Happy Customers'],
              ['8+', 'Years in Business'],
              ['20+', 'Premium Brands'],
              ['100%', 'Verified Cars'],
            ].map(([val, label]) => (
              <div key={label} className="p-8 bg-[#111] border border-white/5 rounded-2xl text-center">
                <div className="text-4xl font-bold text-[#C8962A] mb-2">{val}</div>
                <div className="text-white/40 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Our Journey</div>
            <h2 className="text-4xl font-light text-white">Key <span className="font-semibold">Milestones</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#C8962A]/20" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex gap-8 items-start pl-0">
                  <div className="relative flex-shrink-0 w-16 text-right">
                    <div className="text-[#C8962A] font-bold text-sm">{year}</div>
                    <div className="absolute right-[-25px] top-1.5 w-3 h-3 rounded-full bg-[#C8962A] border-2 border-black" />
                  </div>
                  <div className="flex-1 pb-8 pt-0.5">
                    <p className="text-white/60 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">What We Stand For</div>
            <h2 className="text-4xl font-light text-white">Our <span className="font-semibold">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="p-7 bg-[#111] border border-white/5 rounded-2xl hover:border-[#C8962A]/20 transition-colors">
                <div className="text-[#C8962A] mb-4">{icon}</div>
                <h4 className="text-white font-semibold mb-3">{title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
