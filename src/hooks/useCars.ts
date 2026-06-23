import { useEffect, useState } from 'react';
import { supabase, DbCar } from '../lib/supabase';
import { Car } from '../types';
import { cars as staticCars } from '../data/cars';

// Convert Supabase snake_case row → app Car type
function toCar(row: DbCar): Car {
  return {
    id:          row.id,
    name:        row.name,
    brand:       row.brand,
    model:       row.model,
    year:        row.year,
    price:       row.price,
    category:    row.category,
    images:      row.images ?? [],
    specs:       row.specs as unknown as Car['specs'],
    features:    row.features ?? [],
    description: row.description,
    isFeatured:  row.is_featured,
  };
}

export function useCars() {
  const [cars, setCars]     = useState<Car[]>(staticCars); // show static data immediately
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setCars(data.map(toCar));
        }
        // If Supabase empty or error, keep showing static data
        setLoading(false);
      });
  }, []);

  return { cars, loading };
}

export function useGallery() {
  const [photos, setPhotos]   = useState<{ id: string; url: string; caption: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setPhotos(data);
        setLoading(false);
      });
  }, []);

  return { photos, loading };
}
