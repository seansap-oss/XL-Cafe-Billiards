# XL Cafe & Billiards

A premier digital experience for an iconic multi-space venue — premium rock venue, luxury billiard lounge, and avant-garde cafe.

## Live Demo

🔗 [View on Vercel](https://xl-cafe-billiards.vercel.app)

## Features

### Cinematic Experience
- **Procedural WebGL Hero** — real-time canvas billiard lounge (particles, light rays, pool balls)
- **Hero Morph** — 16:9 → 4:3 → 9:16 aspect ratio transition with 3D perspective
- **Friend Group Scene** — SVG illustration of 4 friends around a phone
- **WebGL Zoom** — React Three Fiber camera dolly with shader phone screen
- **B.A.M. Promo** — fullscreen takeover with staggered entrance
- **Rock of Frame** — masonry gallery with 12 frames, category filters
- **Events Calendar** — upcoming shows, tournaments, specials
- **Ambient Audio** — procedural Web Audio API soundscapes per phase

### Mobile App (PWA)
- **Bottom Nav** — Home, Scan, Rewards, Profile
- **Barcode Scanner** — animated scan with points earned
- **Rewards Catalog** — redeem points for drinks, food, merch
- **Spinning Wheel** — weighted lottery (Free Drink, 10% Off, 50 Pts, etc.)
- **Profile** — spending stats, membership card, tier progress
- **PWA Ready** — manifest, service worker, offline support

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Three Fiber (WebGL)
- Web Audio API
- PWA (Service Worker + Manifest)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework: **Vite** (auto-detected)
4. Deploy

## Project Structure

```
src/
├── app/              # Mobile app (PWA)
│   ├── pages/        # Home, Scan, Rewards, Profile
│   └── components/   # SpinWheel
├── audio/            # Procedural audio engine
├── components/       # Cinematic experience components
├── hooks/            # Scroll, audio, responsive, reduced motion
├── state/            # Scroll-driven state machine
└── types/            # TypeScript types (experience, rewards)
```

## License

Private — XL Cafe & Billiards
