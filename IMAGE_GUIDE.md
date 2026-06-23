# Image Management Guide — New Auto Galaxy

## Folder Structure

```
public/
├── logo.jpg                        ← Main logo (already added)
├── images/
│   ├── cars/
│   │   ├── brand-new/              ← Brand new car photos
│   │   │   ├── lc300.jpg
│   │   │   ├── alphard.jpg
│   │   │   └── rx500h.jpg
│   │   ├── reconditioned/          ← Reconditioned car photos
│   │   │   ├── camry.jpg
│   │   │   └── harrier.jpg
│   │   └── used/                   ← Used car photos
│   │       ├── axio.jpg
│   │       └── civic.jpg
│   ├── showroom/
│   │   ├── hero-bg.mp4             ← Hero VIDEO (auto-plays when present) ← add this
│   │   ├── hero-bg.webm            ← Hero video alternate format (optional)
│   │   ├── hero-bg.jpg             ← Hero fallback image (shown while video loads)
│   │   ├── showroom-bg.jpg         ← Experience section background
│   │   └── about-bg.jpg            ← About page hero background
│   ├── gallery/
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   └── ... (up to photo-12.jpg for the default gallery)
│   └── brands/                     ← Brand logos (SVG preferred)
│       ├── toyota.svg
│       ├── lexus.svg
│       └── ...
```

## Adding a New Car

1. Add the car's photo to the correct category folder (e.g. `public/images/cars/brand-new/mycar.jpg`)
2. Open `src/data/cars.ts`
3. Add a new entry to the `cars` array:

```ts
{
  id: 'unique-id-here',           // kebab-case, no spaces
  name: 'Full Display Name',
  brand: 'Toyota',
  model: 'Land Cruiser',
  year: 2024,
  price: 18500000,                // in BDT (Taka)
  category: 'brand-new',          // 'brand-new' | 'reconditioned' | 'used'
  images: ['/images/cars/brand-new/mycar.jpg'],  // can have multiple
  specs: {
    engine: '3.5L V6',
    transmission: 'Automatic',
    mileage: '0 km',              // omit for brand-new
    color: 'Pearl White',
    seats: 5,
    fuelType: 'Petrol',
  },
  features: ['Feature 1', 'Feature 2'],
  description: 'Short description shown on detail page.',
  isFeatured: true,               // shows on homepage
  isSold: false,                  // marks as SOLD with banner
},
```

## Image Tips

- **Size**: 1200×800px minimum for car photos. Hero backgrounds: 1920×1080px.
- **Format**: JPG for photos, SVG for logos.
- **Compression**: Compress to <300KB per car photo for fast loading.
- **Naming**: Use kebab-case matching the car ID (e.g. `lc300.jpg`).

## Price Formatting

Prices auto-format:
- ≥1 Crore → `৳1.8 Cr`
- ≥1 Lac → `৳65.0 Lac`
- Otherwise → `৳500,000`

## Admin Dashboard

Coming next. Will allow adding/editing cars from a browser UI without editing code.
