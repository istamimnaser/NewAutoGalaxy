import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFading(true);
      setTimeout(() => setVisible(false), 700);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback — never block longer than 4s
    const fallback = setTimeout(handleLoad, 4000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
        className="flex flex-col items-center gap-4"
      >
        <img
          src="/logo.jpg"
          alt="New Auto Galaxy"
          className="w-20 h-20 rounded-full border-2 object-cover"
          style={{ borderColor: '#C8962A' }}
        />
        <div className="text-center">
          <div className="text-[#C8962A] font-semibold tracking-[0.3em] uppercase text-sm">New Auto</div>
          <div className="text-white/40 tracking-[0.4em] uppercase text-xs mt-0.5">Galaxy</div>
        </div>
      </div>

      {/* Animated gold bar */}
      <div className="mt-10 w-40 h-px bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #C8962A, #E8B84B)',
            animation: 'loading-bar 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
