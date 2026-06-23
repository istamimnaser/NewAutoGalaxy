import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-react';
import { supabase, DbCar } from '../../lib/supabase';

const CATEGORY_LABELS: Record<string, string> = {
  'brand-new':     'Brand New',
  'reconditioned': 'Reconditioned',
  'used':          'Used',
};

export default function AdminCars() {
  const [cars, setCars]       = useState<DbCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    setCars(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (car: DbCar) => {
    if (!confirm(`Delete "${car.name}"? This cannot be undone.`)) return;
    setDeleting(car.id);
    // Delete images from storage
    const paths = car.images.map(url => {
      const parts = url.split('/car-images/');
      return parts[1] ?? '';
    }).filter(Boolean);
    if (paths.length) await supabase.storage.from('car-images').remove(paths);
    await supabase.from('cars').delete().eq('id', car.id);
    setDeleting(null);
    load();
  };

  const filtered = cars.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Cars</h1>
          <p className="text-white/30 text-sm mt-1">{cars.length} total listings</p>
        </div>
        <Link
          to="/admin/cars/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-black"
          style={{ background: 'linear-gradient(135deg, #C8962A, #E8B84B)' }}
        >
          <PlusCircle size={16} /> Add Car
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or brand…"
          className="w-full bg-[#111] border border-white/5 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8962A]/40 transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C8962A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/20">No cars found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(car => (
            <div key={car.id} className="flex items-center gap-4 bg-[#111] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
              {/* Thumbnail */}
              <div className="w-16 h-14 rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                {car.images[0] ? (
                  <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 text-xs">No img</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{car.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#C8962A]/30 text-[#C8962A]">
                    {CATEGORY_LABELS[car.category]}
                  </span>
                  <span className="text-white/30 text-xs">{car.year}</span>
                  <span className="text-white/30 text-xs">৳{car.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to={`/admin/cars/edit/${car.id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#C8962A]/20 hover:text-[#C8962A] text-white/40 transition-all"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(car)}
                  disabled={deleting === car.id}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 transition-all disabled:opacity-40"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
