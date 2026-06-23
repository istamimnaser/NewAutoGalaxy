import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { CarCategory } from '../types';
import CarCard from '../components/CarCard';
import { useCars } from '../hooks/useCars';

const categories: { key: CarCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Cars' },
  { key: 'brand-new', label: 'Brand New' },
  { key: 'reconditioned', label: 'Reconditioned' },
  { key: 'used', label: 'Used' },
];

export default function Inventory() {
  const { cars, loading } = useCars();
  const brands = [...new Set(cars.map(c => c.brand))].sort();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);

  const activeCategory = (params.get('category') ?? 'all') as CarCategory | 'all';

  const setCategory = (cat: CarCategory | 'all') => {
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setParams(params);
  };

  const filtered = useMemo(() => {
    return cars.filter(car => {
      if (activeCategory !== 'all' && car.category !== activeCategory) return false;
      if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;
      if (car.price > maxPrice) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!car.name.toLowerCase().includes(q) && !car.brand.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, selectedBrand, maxPrice, search]);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-2">Browse</div>
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Our <span className="font-semibold">Inventory</span>
          </h1>
          <p className="text-white/40 mt-2">{filtered.length} vehicles available</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === key
                  ? 'bg-[#C8962A] text-black'
                  : 'border border-white/15 text-white/60 hover:border-[#C8962A]/40 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search + Filter row */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by name or brand…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/10 text-white placeholder-white/30 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#C8962A]/50 text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm transition-colors ${
              showFilters ? 'bg-[#C8962A]/10 border-[#C8962A]/40 text-[#C8962A]' : 'border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-[#111] border border-white/5 rounded-2xl">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#C8962A]/40"
              >
                <option value="all">All Brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                Max Price: ৳{(maxPrice / 100000).toFixed(0)} Lac
              </label>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={500000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C8962A]"
              />
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#C8962A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-xl mb-2">No cars found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </div>
    </main>
  );
}
