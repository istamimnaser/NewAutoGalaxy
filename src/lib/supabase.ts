import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL  as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Use placeholder values if env vars are missing/invalid so the public site
// never crashes — Supabase calls will fail silently on the admin side only.
const safeUrl = url?.startsWith('https://') ? url : 'https://placeholder.supabase.co';
const safeKey = key?.length > 10            ? key : 'eyJplaceholder';

export const supabase = createClient(safeUrl, safeKey);

// ── Types matching the Supabase tables ──────────────────────────────────────

export interface DbCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'brand-new' | 'reconditioned' | 'used';
  images: string[];        // array of public URLs
  specs: Record<string, string>;
  features: string[];
  description: string;
  is_featured: boolean;
  created_at: string;
}

export interface DbGallery {
  id: string;
  url: string;
  caption: string;
  created_at: string;
}
