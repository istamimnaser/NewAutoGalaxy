import { useEffect, useRef, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { supabase, DbGallery } from '../../lib/supabase';

export default function AdminGallery() {
  const [photos, setPhotos]     = useState<DbGallery[]>([]);
  const [loading, setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setPhotos(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext  = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('gallery-images').upload(path, file, { upsert: true });
      if (!upErr) {
        const { data } = supabase.storage.from('gallery-images').getPublicUrl(path);
        await supabase.from('gallery').insert({ url: data.publicUrl, caption: file.name.replace(/\.[^/.]+$/, '') });
      }
    }
    setUploading(false);
    load();
  };

  const handleDelete = async (photo: DbGallery) => {
    if (!confirm('Delete this photo?')) return;
    setDeleting(photo.id);
    const path = photo.url.split('/gallery-images/')[1] ?? '';
    if (path) await supabase.storage.from('gallery-images').remove([path]);
    await supabase.from('gallery').delete().eq('id', photo.id);
    setDeleting(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gallery</h1>
          <p className="text-white/30 text-sm mt-1">{photos.length} photos</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-black disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #C8962A, #E8B84B)' }}
        >
          <Upload size={16} /> {uploading ? 'Uploading…' : 'Upload Photos'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleUpload(e.target.files)} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C8962A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : photos.length === 0 ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full h-60 border-2 border-dashed border-white/10 hover:border-[#C8962A]/30 rounded-2xl flex flex-col items-center justify-center gap-3 text-white/20 hover:text-[#C8962A] transition-all"
        >
          <Upload size={32} />
          <span className="text-sm">Click to upload your first photos</span>
        </button>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a]">
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo)}
                  disabled={deleting === photo.id}
                  className="opacity-0 group-hover:opacity-100 w-10 h-10 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
          {/* Upload more tile */}
          <button
            onClick={() => fileRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-[#C8962A]/30 flex flex-col items-center justify-center gap-2 text-white/20 hover:text-[#C8962A] transition-all"
          >
            <Upload size={20} />
            <span className="text-xs">Add more</span>
          </button>
        </div>
      )}
    </div>
  );
}
