const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/photo-${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));

export default function Gallery() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Visual Journey</div>
          <h1 className="text-4xl md:text-5xl font-light text-white">Our <span className="font-semibold">Gallery</span></h1>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-sm">A glimpse into our showroom, our cars, and the experiences we create.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map(item => (
            <div
              key={item.id}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-[#111] border border-white/5 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const parent = (e.target as HTMLImageElement).parentElement!;
                    parent.innerHTML = `<div class="aspect-square flex items-center justify-center bg-[#1a1a1a]"><img src="/logo.jpg" class="w-12 h-12 rounded-full opacity-15" /></div>`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-white/30 text-sm">
          Add your photos to <code className="text-[#C8962A]/60 bg-[#111] px-2 py-0.5 rounded text-xs">public/images/gallery/</code>
        </div>
      </div>
    </main>
  );
}
