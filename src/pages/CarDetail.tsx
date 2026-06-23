import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Fuel, Users, Gauge, Palette, Cog, ChevronRight, Share2 } from 'lucide-react';
import { formatPrice } from '../data/cars';
import { useCars } from '../hooks/useCars';

const categoryLabel: Record<string, string> = {
  'brand-new': 'Brand New',
  'reconditioned': 'Reconditioned',
  'used': 'Used',
};

export default function CarDetail() {
  const { id } = useParams();
  const { cars } = useCars();
  const car = cars.find(c => c.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!car) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-xl mb-4">Car not found</p>
          <Link to="/inventory" className="text-[#C8962A] underline">Back to Inventory</Link>
        </div>
      </main>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in the ${car.name} (${car.year}) listed on New Auto Galaxy. Could you share more details?`);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/inventory" className="hover:text-white transition-colors">Inventory</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">{car.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[16/10] bg-[#111] rounded-2xl overflow-hidden mb-3">
              {car.images[activeImg] ? (
                <img src={car.images[activeImg]} alt={car.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/logo.jpg" alt="" className="w-20 h-20 rounded-full opacity-20" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                  car.category === 'brand-new' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  car.category === 'reconditioned' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-orange-500/20 text-orange-400 border-orange-500/30'
                }`}>
                  {categoryLabel[car.category]}
                </span>
              </div>
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === i ? 'border-[#C8962A]' : 'border-white/10'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-white/40 text-xs tracking-widest uppercase mb-2">{car.brand} · {car.year}</div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">{car.name}</h1>
            <div className="text-[#C8962A] text-4xl font-bold mb-6">{formatPrice(car.price)}</div>

            <p className="text-white/50 leading-relaxed mb-8">{car.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: <Fuel size={15} />, label: 'Fuel', value: car.specs.fuelType },
                { icon: <Cog size={15} />, label: 'Transmission', value: car.specs.transmission },
                { icon: <Users size={15} />, label: 'Seats', value: `${car.specs.seats} seats` },
                { icon: <Palette size={15} />, label: 'Color', value: car.specs.color },
                ...(car.specs.mileage ? [{ icon: <Gauge size={15} />, label: 'Mileage', value: car.specs.mileage }] : []),
              ].map(({ icon, label, value }) => (
                <div key={label} className="p-4 bg-[#111] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-[#C8962A] text-xs mb-1">{icon}{label}</div>
                  <div className="text-white text-sm font-medium">{value}</div>
                </div>
              ))}
            </div>

            {/* Engine */}
            <div className="p-4 bg-[#111] border border-white/5 rounded-xl mb-6">
              <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Engine</div>
              <div className="text-white font-medium">{car.specs.engine}</div>
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="mb-8">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-3">Key Features</div>
                <div className="flex flex-wrap gap-2">
                  {car.features.map(f => (
                    <span key={f} className="text-xs border border-[#C8962A]/30 text-[#C8962A]/80 px-3 py-1.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/8801700000000?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] text-white text-center font-semibold py-4 rounded-full hover:bg-[#1ebe5a] transition-colors flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Enquire on WhatsApp
              </a>
              <Link to="/contact" className="flex-1 border border-[#C8962A]/40 text-[#C8962A] text-center font-medium py-4 rounded-full hover:bg-[#C8962A]/10 transition-colors">
                Book Test Drive
              </Link>
              <button className="p-4 border border-white/10 text-white/40 rounded-full hover:border-white/30 transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            <Link to="/inventory" className="mt-6 inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Inventory
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
