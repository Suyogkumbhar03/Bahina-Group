# BAHINA Group — Landing Page

A bespoke, handcrafted editorial landing page for **BAHINA Group**, uniting three divisions on one website with cinematic full-screen parallax imagery, Fraunces editorial serif typography, GSAP pinned scroll scenes, and Lenis smooth scrolling.

---

## 1. Quick Start & Setup

Ensure Node.js (v18+) is installed.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

The application runs locally on `http://localhost:5173/`.

---

## 2. Architecture & File Structure

```
├── public/
│   ├── bg.jpg             # High-res cinematic background image (120% parallax layer)
│   └── favicon.svg        # Monogram SVG brand mark
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   └── AnimatedBackground.jsx   # Fixed 120vh parallax image layer, Ken Burns drift & color grading
│   │   ├── sections/
│   │   │   ├── Navbar.jsx               # Slim floating glass bar, hides on scroll down, reveals on scroll up
│   │   │   ├── HeroSection.jsx          # Full-screen editorial headline with Magic UI reveal & action CTAs
│   │   │   ├── AboutSection.jsx         # Word-by-word scroll reveal + Number Ticker stats
│   │   │   ├── DivisionsSection.jsx     # GSAP pinned showcase (01 Hospitality, 02 Foundation, 03 Labs)
│   │   │   ├── VisionMissionSection.jsx # Split vision quote & 5 staggered mission commitments
│   │   │   ├── FocusAreasSection.jsx    # Infinite marquee of 7 areas + Magic UI Bento Grid
│   │   │   ├── ValuesSection.jsx        # 6 moral anchor values with Smooth UI hover reveal
│   │   │   ├── ApproachSection.jsx      # 5 operational approach steps in a vertical list
│   │   │   ├── FinalCtaSection.jsx      # Magic UI BorderBeam container & interactive contact copy action
│   │   │   ├── FooterSection.jsx        # Group index, division links, and large faded BAHINA watermark
│   │   │   └── Preloader.jsx            # 1.1s branded logo entrance preloader
│   │   └── ui/
│   │       ├── button.jsx               # Shimmer, editorial & default button variants
│   │       ├── text-reveal.jsx          # Magic UI word-by-word scroll reveal
│   │       ├── number-ticker.jsx        # Magic UI animated number ticker
│   │       ├── marquee.jsx              # Magic UI continuous marquee
│   │       ├── bento-grid.jsx           # Magic UI asymmetric bento layout
│   │       ├── border-beam.jsx          # Magic UI border ray animation
│   │       ├── sheet.jsx                # Responsive mobile navigation drawer
│   │       ├── card.jsx                 # Flat 1px border architectural cards
│   │       └── badge.jsx                # Minimalist badge pill
│   ├── data/
│   │   └── content.js                   # SINGLE SOURCE OF TRUTH for all copy, numbers, links & BG_IMAGE
│   ├── lib/
│   │   └── utils.js                     # ClassName merger (clsx + tailwind-merge)
│   ├── App.jsx                          # Main view assembling all 10 sections with Lenis smooth scroll
│   ├── index.css                        # Design system tokens, film grain, Fraunces serif & Inter fonts
│   └── main.jsx                         # React 19 entry point
├── jsconfig.json                        # Path alias (@/*) configuration for pure JavaScript
├── tailwind.config.js                   # Division accent colors and animation keyframes
└── vite.config.js                       # Vite bundler configuration
```

---

## 3. Where to Edit Content, Colors, and Background Image

### 3.1 Content & Copy
All text is organized in `src/data/content.js`:
- Brand copy, headline, sublines, taglines
- Divisions info and bullet points
- Vision quote and 5 mission pillars
- 7 Core focus areas
- 6 Guiding values
- 5 Approach methodology steps
- Contact email and corporate website address

### 3.2 Scroll-Controlled Frame Sequence Background
The background is rendered via `<FrameSequenceBackground />` using a canvas-based frame sequence:
- **Desktop set**: `public/frames/desktop/` (150 WebP frames, 1280x720, total < 12 MB)
- **Mobile set**: `public/frames/mobile/` (75 WebP frames, 854x480, total < 4 MB)
- **Fallback posters**: `public/frames/poster.webp` (first frame) and `public/frames/poster-end.webp` (last frame)
- **Manifest**: `public/frames/manifest.json`

#### Long Cache Headers for `/frames`
Because the frame images are static and immutable WebP assets, configure your web server or CDN (Netlify, Vercel, Cloudflare, Nginx, or AWS CloudFront) to serve long-lived caching headers:

```http
# HTTP Header for all assets under /frames/
Cache-Control: public, max-age=31536000, immutable
```

#### How to Rebuild the Frames
The original source frames are safely preserved in `/raw-frames/` (which is git-ignored). To regenerate or retune the WebP frame sequence:

```bash
# Run the Sharp asset optimization script
node scripts/build-frames.mjs
```

This script:
1. Detects raw frames in `/raw-frames/` (or `public/frames/` if freshly extracted).
2. Generates the 150 desktop frames (every 2nd frame) at width 1280, quality 58 WebP.
3. Generates the 75 mobile frames (every 4th frame) at width 854, quality 60 WebP.
4. Generates `poster.webp` and `poster-end.webp` at 1600px width.
5. Produces `manifest.json` with dimensions, file counts, and byte sizes.
6. Enforces target limits: desktop set < 12MB, mobile set < 4MB.

### 3.3 Division Accent Colors
The 3 division colors are configured in `tailwind.config.js` and `src/data/content.js`:
- **BAHINA Hospitality Pvt Ltd**: Amber `#D9A441`
- **BAHINA Foundation**: Green `#3E9B63`
- **BAHINA Labs Pvt Ltd**: Cool Blue `#4C8DF6`

---

## 4. Placeholders to Replace

The following items are placeholders clearly marked with `// TODO`:

| Item | Location | Note |
|---|---|---|
| **Background Image** | `public/bg.jpg` | Replace with your chosen brand hero photograph |
| **Foundation Impact Stat** | `src/data/content.js` (`about.stats[1]`) | `120k+` — Replace with audited foundation metric |
| **R&D Initiatives Stat** | `src/data/content.js` (`about.stats[2]`) | `18+` — Replace with active program count |
| **Corporate HQ City** | `src/data/content.js` (`brand.location`) | Replace with official city address |
| **Division Explore Routes** | `src/data/content.js` (`divisions[].link`) | Currently `/hospitality`, `/foundation`, `/labs` |
