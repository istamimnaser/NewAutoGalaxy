import { useGallery } from '../hooks/useCars';

export default function Gallery() {
  const { photos, loading } = useGallery();

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Visual Journey</div>
          <h1 className="text-4xl md:text-5xl font-light text-white">Our <span className="font-semibold">Gallery</span></h1>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-sm">A glimpse into our showroom, our cars, and the experiences we create.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#C8962A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-24 text-white/20 text-sm">No photos yet. Upload them from the admin portal.</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map(item => (
              <div
                key={item.id}
                className="break-inside-avoid rounded-2xl overflow-hidden bg-[#111] border border-white/5 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
