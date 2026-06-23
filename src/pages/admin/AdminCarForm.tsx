import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Upload, ArrowLeft } from 'lucide-react';
import { supabase, DbCar } from '../../lib/supabase';

const EMPTY: Omit<DbCar, 'id' | 'created_at'> = {
  name: '', brand: '', model: '', year: new Date().getFullYear(),
  price: 0, category: 'brand-new', images: [],
  specs: { engine: '', transmission: '', color: '', seats: '', fuelType: '', mileage: '' },
  features: [], description: '', is_featured: false,
};

export default function AdminCarForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm]           = useState(EMPTY);
  const [featureInput, setFI]     = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEdit) return;
    supabase.from('cars').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({ ...EMPTY, ...data });
    });
  }, [id, isEdit]);

  const set = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }));
  const setSpec = (key: string, val: string) => setForm(f => ({ ...f, specs: { ...f.specs, [key]: val } }));

  const uploadImages = async (files: FileList) => {
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext  = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('car-images').upload(path, file, { upsert: true });
      if (!error) {
        const { data } = supabase.storage.from('car-images').getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
    setUploading(false);
  };

  const removeImage = (url: string) => setForm(f => ({ ...f, images: f.images.filter(i => i !== url) }));

  const addFeature = () => {
    const val = featureInput.trim();
    if (!val) return;
    setForm(f => ({ ...f, features: [...f.features, val] }));
    setFI('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    if (isEdit) {
      const { error } = await supabase.from('cars').update(form).eq('id', id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('cars').insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    navigate('/admin/cars');
  };

  const inputCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8962A]/50 transition-colors";
  const labelCls = "text-white/40 text-xs uppercase tracking-wider mb-1.5 block";

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate('/admin/cars')} className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Cars
      </button>

      <h1 className="text-2xl font-semibold text-white mb-8">{isEdit ? 'Edit Car' : 'Add New Car'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ── IMAGES ── */}
        <section className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-4">Photos</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {form.images.map(url => (
              <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-[#1a1a1a]">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="aspect-square rounded-lg border-2 border-dashed border-white/10 hover:border-[#C8962A]/40 flex flex-col items-center justify-center gap-1 text-white/20 hover:text-[#C8962A] transition-all disabled:opacity-40"
            >
              <Upload size={18} />
              <span className="text-[10px]">{uploading ? 'Uploading…' : 'Add'}</span>
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && uploadImages(e.target.files)} />
        </section>

        {/* ── BASIC INFO ── */}
        <section className="bg-[#111] border border-white/5 rounded-xl p-6 space-y-4">
          <h2 className="text-white font-medium mb-2">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelCls}>Name</label><input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Brand</label><input required value={form.brand} onChange={e => set('brand', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Model</label><input required value={form.model} onChange={e => set('model', e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Year</label><input type="number" required value={form.year} onChange={e => set('year', +e.target.value)} className={inputCls} /></div>
            <div>
              <label className={labelCls}>Price (BDT)</label>
              <input type="number" required value={form.price} onChange={e => set('price', +e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                <option value="brand-new">Brand New</option>
                <option value="reconditioned">Reconditioned</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className={inputCls + ' resize-none'} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="w-4 h-4 accent-[#C8962A]" />
            <span className="text-white/60 text-sm">Show on homepage (featured)</span>
          </label>
        </section>

        {/* ── SPECS ── */}
        <section className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-4">Specs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(form.specs).map(key => (
              <div key={key}>
                <label className={labelCls}>{key.replace(/([A-Z])/g, ' $1')}</label>
                <input value={form.specs[key] ?? ''} onChange={e => setSpec(key, e.target.value)} className={inputCls} />
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white font-medium mb-4">Features</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={featureInput}
              onChange={e => setFI(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              placeholder="e.g. Leather Seats"
              className={inputCls + ' flex-1'}
            />
            <button type="button" onClick={addFeature} className="px-4 py-2.5 bg-[#C8962A]/20 text-[#C8962A] rounded-lg text-sm hover:bg-[#C8962A]/30 transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.features.map(f => (
              <span key={f} className="flex items-center gap-1.5 bg-white/5 text-white/60 text-xs px-3 py-1.5 rounded-full">
                {f}
                <button type="button" onClick={() => setForm(prev => ({ ...prev, features: prev.features.filter(x => x !== f) }))}>
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </section>

        {error && <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</div>}

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full py-3 rounded-lg text-sm font-medium text-black disabled:opacity-50 transition-all"
          style={{ background: 'linear-gradient(135deg, #C8962A, #E8B84B)' }}
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Car'}
        </button>
      </form>
    </div>
  );
}
