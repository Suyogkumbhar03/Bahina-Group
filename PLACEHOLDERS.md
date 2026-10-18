# BAHINA HOSPITALITY — Image Placeholders & Asset Specification

This document lists the exact image files, dimensions, aspect ratios, and directory structure required for **BAHINA Hospitality**.

## 1. Directory Structure

All image assets must be placed inside `public/hospitality/images/`:

```
public/
└── hospitality/
    └── images/
        ├── hero.jpg
        ├── band-path.jpg
        ├── band-fields.jpg
        ├── band-dusk.jpg
        ├── cta.jpg
        ├── sample-farmhouse-1/
        │   ├── 1.jpg
        │   ├── 2.jpg
        │   ├── 3.jpg
        │   ├── 4.jpg
        │   └── 5.jpg
        ├── sample-farmhouse-2/
        │   ├── 1.jpg
        │   ├── 2.jpg
        │   ├── 3.jpg
        │   ├── 4.jpg
        │   └── 5.jpg
        ├── sample-farmhouse-3/
        │   ├── 1.jpg
        │   ├── 2.jpg
        │   ├── 3.jpg
        │   ├── 4.jpg
        │   └── 5.jpg
        └── sample-farmhouse-4/
            ├── 1.jpg
            ├── 2.jpg
            ├── 3.jpg
            └── 4.jpg
```

---

## 2. General Section Backgrounds & Mood Slots

| File Path | Recommended Dimensions | Aspect Ratio | Subject Matter / Guidelines |
|---|---|---|---|
| `hero.jpg` | 2400 × 1350 px | 16:9 | Expansive landscape view of a peaceful Maharashtra countryside farmhouse, open sky, natural green foliage. Must have good composition on the left for text contrast. |
| `band-path.jpg` | 2400 × 900 px | 8:3 (Panoramic) | Winding red-earth or stone village path, morning mist or gentle sunlight through trees. Used behind "How Booking Works". |
| `band-fields.jpg` | 2400 × 900 px | 8:3 (Panoramic) | Organic fruit orchards, mango trees, sugarcane fields, or Western Ghats foothills. Used behind amenities & features. |
| `band-dusk.jpg` | 2400 × 900 px | 8:3 (Panoramic) | Soft evening dusk gradient over hills, warm lantern light, calm twilight. Used behind construction timeline. |
| `cta.jpg` | 2400 × 1000 px | 12:5 | Warm evening verandah with teakwood pillars, terracotta tiles, and welcoming warm ambient glow. |

---

## 3. Per-Farmhouse Photo Slots

Each farmhouse directory requires 4 to 5 high-resolution photographs:

| File Name | Aspect Ratio | Dimensions | Purpose |
|---|---|---|---|
| `1.jpg` | 16:10 or 4:3 | 1600 × 1000 px | **Primary Exterior / Arch Header**: Main hero photo of the estate, building facade, or pool view. |
| `2.jpg` | 4:3 or 4:5 | 1400 × 1050 px | **Verandah & Living**: Traditional open sit-out, wooden swing, or courtyard seating. |
| `3.jpg` | 4:3 or 16:10 | 1400 × 1050 px | **Pool & Gardens**: Private plunge pool, lawn, or surrounding fruit orchard. |
| `4.jpg` | 4:3 or 16:10 | 1400 × 1050 px | **Bedroom Interior**: High ceiling, clean linens, stone or wooden wall accents. |
| `5.jpg` | 4:3 or 16:10 | 1400 × 1050 px | **Dining & Evening**: Traditional kitchen / dining area, or twilight campfire setup. |

---

## 4. Automatic WebP Generation

Run the build script to automatically produce optimized WebP variants (`-640w.webp`, `-1024w.webp`, `-1600w.webp`, `-2400w.webp`):

```bash
npm run build:images
```

---

## 5. Dev Fallback Behavior When Images Are Missing

When an image file is not yet provided:
1. **Rich Graphic Fallback**: Instead of flat cartoon illustrations, the UI renders a rich, atmospheric gradient from Indigo Ink (`#1C2B4F`) to Mango (`#F4A62A`) with subtle film grain and an authentic inline SVG block-print motif.
2. **Dev Badge**: In `PREVIEW_MODE`, a discreet pill badge appears: `"Photo needed"`.
3. **Production Guard**: In production mode (`PREVIEW_MODE === false`), no dev label is ever visible to end users.
4. **Required Farmhouse Labels**:
   - `open`: labeled **"Sample"** while preview mode is active.
   - `coming_soon`: labeled **"Artist's impression"**.
   - `under_construction`: labeled **"Construction progress"**.
   - Landscape mood images are decorative only and are never captioned as a farmhouse or a specific location.
