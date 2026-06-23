import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Images, PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ total: 0, brandNew: 0, recon: 0, used: 0, gallery: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ count: total }, { count: brandNew }, { count: recon }, { count: used }, { count: gallery }] =
        await Promise.all([
          supabase.from('cars').select('*', { count: 'exact', head: true }),
          supabase.from('cars').select('*', { count: 'exact', head: true }).eq('category', 'brand-new'),
          supabase.from('cars').select('*', { count: 'exact', head: true }).eq('category', 'reconditioned'),
          supabase.from('cars').select('*', { count: 'exact', head: true }).eq('category', 'used'),
          supabase.from('gallery').select('*', { count: 'exact', head: true }),
        ]);
      setCounts({ total: total ?? 0, brandNew: brandNew ?? 0, recon: recon ?? 0, used: used ?? 0, gallery: gallery ?? 0 });
    };
    load();
  }, []);

  const stats = [
    { label: 'Total Cars',     value: counts.total,    color: '#C8962A' },
    { label: 'Brand New',      value: counts.brandNew, color: '#34d399' },
    { label: 'Reconditioned',  value: counts.recon,    color: '#60a5fa' },
    { label: 'Used Cars',      value: counts.used,     color: '#f472b6' },
    { label: 'Gallery Photos', value: counts.gallery,  color: '#a78bfa' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-white/30 text-sm mt-1">Overview of your inventory and media.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-[#111] border border-white/5 rounded-xl p-5">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/cars/new"
          className="flex items-center gap-4 bg-[#111] border border-white/5 hover:border-[#C8962A]/30 rounded-xl p-6 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,150,42,0.15)' }}>
            <PlusCircle size={20} className="text-[#C8962A]" />
          </div>
          <div>
            <div className="text-white font-medium group-hover:text-[#C8962A] transition-colors">Add New Car</div>
            <div className="text-white/30 text-sm">List a new vehicle in inventory</div>
          </div>
        </Link>

        <Link
          to="/admin/gallery"
          className="flex items-center gap-4 bg-[#111] border border-white/5 hover:border-[#C8962A]/30 rounded-xl p-6 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,150,42,0.15)' }}>
            <Images size={20} className="text-[#C8962A]" />
          </div>
          <div>
            <div className="text-white font-medium group-hover:text-[#C8962A] transition-colors">Manage Gallery</div>
            <div className="text-white/30 text-sm">Upload or remove gallery photos</div>
          </div>
        </Link>

        <Link
          to="/admin/cars"
          className="flex items-center gap-4 bg-[#111] border border-white/5 hover:border-[#C8962A]/30 rounded-xl p-6 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,150,42,0.15)' }}>
            <Car size={20} className="text-[#C8962A]" />
          </div>
          <div>
            <div className="text-white font-medium group-hover:text-[#C8962A] transition-colors">View All Cars</div>
            <div className="text-white/30 text-sm">Edit or remove existing listings</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
