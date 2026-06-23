import { Link } from 'react-router-dom';
import { Fuel, Users, Gauge } from 'lucide-react';
import type { Car } from '../types';
import { formatPrice } from '../data/cars';

const categoryLabel: Record<string, { label: string; color: string }> = {
  'brand-new': { label: 'Brand New', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  'reconditioned': { label: 'Reconditioned', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  'used': { label: 'Used', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
};

export default function CarCard({ car }: { car: Car }) {
  const cat = categoryLabel[car.category];

  return (
    <Link
      to={`/cars/${car.id}`}
      className="group block bg-[#111111] rounded-2xl overflow-hidden border border-white/5 card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[#1a1a1a] overflow-hidden">
        {car.images[0] ? (
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]"
          style={{ display: car.images[0] ? 'none' : 'flex' }}>
          <img src="/logo.jpg" alt="" className="w-16 h-16 rounded-full opacity-20" />
        </div>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cat.color}`}>
            {cat.label}
          </span>
        </div>
        {car.isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold tracking-widest text-lg border-2 border-white/40 px-6 py-2 rotate-[-12deg]">SOLD</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-white/40 text-xs font-medium tracking-widest uppercase mb-1">{car.brand} · {car.year}</div>
        <h3 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-[#C8962A] transition-colors">
          {car.name}
        </h3>

        <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
          <span className="flex items-center gap-1.5"><Fuel size={12} />{car.specs.fuelType}</span>
          <span className="flex items-center gap-1.5"><Users size={12} />{car.specs.seats} Seats</span>
          {car.specs.mileage && <span className="flex items-center gap-1.5"><Gauge size={12} />{car.specs.mileage}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <div className="text-[#C8962A] font-bold text-xl">{formatPrice(car.price)}</div>
          </div>
          <div className="text-[#C8962A]/60 text-xs border border-[#C8962A]/30 px-3 py-1.5 rounded-full group-hover:bg-[#C8962A]/10 transition-colors">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}
