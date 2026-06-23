export type CarCategory = 'brand-new' | 'reconditioned' | 'used';

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  images: string[];          // paths relative to /images/cars/<category>/
  specs: {
    engine: string;
    transmission: string;
    mileage?: string;
    color: string;
    seats: number;
    fuelType: string;
  };
  features: string[];
  description: string;
  isFeatured?: boolean;
  isSold?: boolean;
}

export interface Brand {
  name: string;
  logo: string;
}
