# BAHINA Group — Bilingual Landing Page (English & मराठी)

A bespoke editorial landing page for **BAHINA Group**, uniting three divisions on one website with cinematic full-screen parallax imagery, Fraunces editorial serif & Devanagari typography, GSAP pinned scroll scenes, Lenis smooth scrolling, and complete bilingual support (English + Marathi).

---

## 1. Quick Start & Scripts

Ensure Node.js (v18+) is installed.

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Check copy parity and English readability
npm run check:copy

# 4. Build production bundle
npm run build

# 5. Preview production build
npm run preview
```

The application runs locally on `http://localhost:5173/`.

---

## 2. Bilingual Architecture (English & Marathi)

The website features a custom lightweight, zero-dependency React i18n architecture implemented in `src/lib/i18n.js` with exact 1-to-1 key parity between English and Marathi dictionaries.

### Language Selection Resolution Order
When a visitor arrives, the website resolves language in this exact sequence:
1. **URL parameter**: `?lang=mr` or `?lang=en`
2. **URL path**: `/mr` (e.g. `https://www.bahinaa.com/mr`)
3. **Saved choice**: `localStorage.getItem("bahina_lang")` (safely wrapped in `try/catch`)
4. **Browser language**: If `navigator.language` starts with `"mr"`
5. **Fallback default**: English (`"en"`)

### Language Switcher UI
A compact, keyboard-navigable language switch (`English` / `मराठी`) with 44px tap targets and `aria-label` is available:
- In the fixed floating navbar
- At the top of the mobile drawer menu
- In the website footer

On every switch, the website:
- Updates `<html lang="en">` or `<html lang="mr">`
- Dynamically loads Google Fonts for Devanagari with `font-display: swap`
- Updates `document.title` and `meta[name="description"]`
- Keeps exact visitor scroll position
- Smoothly fades text content for 200ms
- Announces the change to screen readers via an `aria-live` region
- Calls `ScrollTrigger.refresh()` after fonts and reflow settle

---

## 3. How to Edit Website Text & Review Copy

### 3.1 Dictionaries
All visible website copy is centralized in two parallel files with identical keys:
- **English**: `src/locales/en.js` (written to a simple 12-year-old reading level, max 15 words/sentence average)
- **Marathi**: `src/locales/mr.js` (written in natural, everyday Marathi)

### 3.2 Automated Copy Quality Checks
Run the copy audit at any time with:

```bash
npm run check:copy
```

This executes two automated quality gates:
1. `scripts/check-locales.mjs`: Fails with exit code 1 if any key is missing or mismatched between `en.js` and `mr.js`.
2. `scripts/readability.mjs`: Calculates the average sentence length of all English copy and fails if average words per sentence exceeds 16, or if any sentence exceeds 22 words.

### 3.3 Adding Real Reviewed Marathi Copy
1. Open `COPY.md` in the project root. It lists every key, the English copy, and the current Marathi translation side by side.
2. A native Marathi reviewer or director can review each row and update the Marathi text.
3. Apply any approved edits directly to `src/locales/mr.js`.
4. Run `npm run check:copy` to verify all keys remain intact.
5. Re-generate `COPY.md` anytime using:
   ```bash
   node scripts/generate-copy-md.mjs
   ```

---

## 4. How `/mr` Routing Works After Deployment

The landing page supports opening Marathi directly via `/mr` as well as query parameters like `?lang=mr`. Because Vite produces a Single Page Application (SPA), server rewrite rules are required so `/mr` serves `index.html`.

### Vercel Deployment (`vercel.json`)
Create or verify `vercel.json` in the root:
```json
{
  "rewrites": [
    { "source": "/mr", "destination": "/index.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify Deployment (`_redirects` or `netlify.toml`)
Add to `public/_redirects`:
```
/mr    /index.html   200
/*     /index.html   200
```

### Nginx Deployment
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Cloudflare Pages / Static Hosting
Cloudflare Pages automatically falls back to `index.html` for SPA routes when configured.

---

## 5. Marathi Devanagari Typography & Animation Rules

To ensure Devanagari characters render correctly:
- **Fonts**: Headings use `Fraunces, Noto Serif Devanagari, Georgia, serif`. Body text uses `Manrope, Noto Sans Devanagari, sans-serif`.
- **Ligatures & Tracking**: In Marathi mode (`html[lang="mr"]`), `letter-spacing: 0` is strictly enforced everywhere so joined characters are not severed.
- **No All-Caps**: `text-transform: none` is applied across all labels and buttons.
- **No Italic**: Italic and faux-italic styles are disabled in Marathi mode. Key emphasis words utilize amber accent color (`#D9A441`) and heavier font weights.
- **Line Height**: Line height is maintained at `>= 1.3` for headings and `>= 1.7` for body copy so upper and lower vowel marks (matras and ukar) are never clipped.
- **Animations**: Text splitters (`SplitText`) split exclusively by words, never individual letters. Letter-scrambling effects are automatically replaced with smooth fade-ups in Marathi.

---

## 6. Architecture & File Structure

```
├── public/
│   ├── favicon.svg              # Brand icon
│   └── frames/                  # Optimized WebP background sequence
├── scripts/
│   ├── check-locales.mjs        # Locale key parity test
│   ├── readability.mjs          # Sentence length and reading level test
│   ├── generate-copy-md.mjs     # Generates COPY.md review table
│   └── build-frames.mjs         # Sharp WebP frame optimization script
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   └── FrameSequenceBackground.jsx  # Parallax frame canvas
│   │   ├── sections/
│   │   │   ├── Navbar.jsx                   # Sticky bar with LanguageSwitcher
│   │   │   ├── HeroSection.jsx              # Hero with simple copy & WordRotate
│   │   │   ├── AboutSection.jsx             # TextReveal + NumberTicker facts
│   │   │   ├── DivisionsSection.jsx         # GSAP pinned showcase of 3 companies
│   │   │   ├── VisionMissionSection.jsx     # Vision quote & 5 pillars
│   │   │   ├── FocusAreasSection.jsx        # Marquee + 3D interactive bento grid
│   │   │   ├── ValuesSection.jsx            # 6 core values expanding panels
│   │   │   ├── ApproachSection.jsx          # 5 operational steps timeline
│   │   │   ├── FinalCtaSection.jsx          # Contact form with hidden language field
│   │   │   ├── FooterSection.jsx            # Footer with LanguageSwitcher & FlowingMenu
│   │   │   └── Preloader.jsx                # Branded preloader
│   │   └── ui/
│   │       ├── language-switcher.jsx        # English / मराठी switch component
│   │       ├── split-text.jsx               # Word-based text animation
│   │       ├── hyper-text.jsx               # Scramble / fade animation
│   │       └── ...                          # UI components
│   ├── locales/
│   │   ├── en.js                            # English copy (simple 12-year-old level)
│   │   ├── mr.js                            # Marathi copy (everyday natural language)
│   │   └── glossary.js                      # Core terminology dictionary
│   ├── lib/
│   │   ├── i18n.js                          # Lightweight LanguageProvider & useLanguage
│   │   └── utils.js                         # ClassName merger
│   ├── App.jsx                              # Root component with LanguageProvider
│   ├── index.css                            # Devanagari typography & styles
│   └── main.jsx                             # React entry point
├── COPY.md                                  # Complete copy audit spreadsheet
├── package.json                             # Scripts including check:copy
└── README.md
```
