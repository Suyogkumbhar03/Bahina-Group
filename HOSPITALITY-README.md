# BAHINA HOSPITALITY — Design Preview Documentation

This document describes the **BAHINA Hospitality** UI-only design preview built for director review and approval.

---

## 1. Quick Start & How to Run

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Open the site**:
   - BAHINA Group Landing Page: `http://localhost:5173/`
   - Direct link to Hospitality Preview: `http://localhost:5173/hospitality`
4. **Build for production**:
   ```bash
   npm run build
   ```
5. **Run bilingual copy and readability audits**:
   ```bash
   npm run check:copy
   ```

---

## 2. PREVIEW_MODE Configuration Flag

The preview state is controlled by the `PREVIEW_MODE` boolean exported in [`src/data/config.js`](file:///c:/Users/SUYOG/Desktop/Bahina%20Foundation/src/data/config.js) and re-exported in [`src/config.js`](file:///c:/Users/SUYOG/Desktop/Bahina%20Foundation/src/config.js):

```javascript
export const PREVIEW_MODE = true;
```

### When `PREVIEW_MODE = true`:
- A slim ribbon is displayed across the top of every hospitality screen:
  *"Design preview. Sample content only, not real farmhouses."* (and Marathi equivalent: *"डिझाइन पूर्वावलोकन. केवळ नमुना माहिती, खरी शेतघरे नाहीत."*).
- A distinct **"Sample"** chip is displayed on every farmhouse card and photo frame.
- Uses sample stays from [`src/bahina-hospitality/data/farmhouses.sample.js`](file:///c:/Users/SUYOG/Desktop/Bahina%20Foundation/src/bahina-hospitality/data/farmhouses.sample.js).
- Clear honest banners on booking forms and confirmation screens inform viewers that no real data is transmitted or stored.

### When `PREVIEW_MODE = false`:
- The top preview ribbon and "Sample" chips are completely hidden.
- The UI binds to live data from a future `farmhouses.js`.
- If the live list is empty, a clean **"Opening soon"** state is displayed with a notification request drawer.

---

## 3. Sample Data Structure

Sample data is located in:
[`src/bahina-hospitality/data/farmhouses.sample.js`](file:///c:/Users/SUYOG/Desktop/Bahina%20Foundation/src/bahina-hospitality/data/farmhouses.sample.js)

It contains four realistic yet clearly marked sample farmhouses across diverse stages:
1. **Sample Farmhouse 1 (not real)** — Status: `open`
   - Location: Wai, Satara
   - Max capacity: 12 guests, 3 bedrooms, 3 bathrooms
   - Price: ₹6,500 per night (with simulated unavailable dates)
   - Highlights: Private pool, rural meals, fruit orchard
2. **Sample Farmhouse 2 (not real)** — Status: `coming_soon`
   - Location: Roha, Raigad
   - Max capacity: 8 guests, 2 bedrooms
   - Highlights: Coconut grove, kitchen, pet-friendly
3. **Sample Farmhouse 3 (not real)** — Status: `coming_soon`
   - Location: Mulshi, Pune
   - Max capacity: 16 guests, 4 bedrooms
   - Highlights: Valley panoramas, outdoor campfire pit, indoor games
4. **Sample Farmhouse 4 (not real)** — Status: `under_construction`
   - Location: Velhe, Pune
   - Feature: 5-stage **Construction Timeline** (Stage 3: Walls & Structure highlighted)
   - Highlights: Eco-sensitive stone architecture, rainwater harvesting

---

## 4. UI Architecture & Theme Scoping

All hospitality styling is strictly isolated under the `.hospitality-theme` CSS class inside [`src/bahina-hospitality/theme/hospitality-theme.css`](file:///c:/Users/SUYOG/Desktop/Bahina%20Foundation/src/bahina-hospitality/theme/hospitality-theme.css). **Zero styles leak into the BAHINA Group landing page.**

### Theme Palette (WCAG AA Compliant):
- **Background**: Ivory (`#FFFEFB`)
- **Alternate Section**: Warm Sand (`#F6F0E4`)
- **Cards**: White with 1px Sand Border (`#E8DFCC`)
- **Primary Action**: Clay (`#B4532A`)
- **Headings & Accents**: Deep Forest Green (`#23402F`)
- **Soft Fills**: Sage (`#8FAE8B` / `#EBF2EA`)
- **Badges & Highlights**: Marigold (`#E8A317` / `#FDF3DC` fill only, dark text)
- **Body Text**: Dark Charcoal (`#2B2420`)

### Typography:
- **Headings**: *Noto Serif Devanagari* (weights 600, 700)
- **Body & UI**: *Mukta* (weights 400, 500, 600)
- **Marathi Rules**: Line height 1.75, no letter-spacing, no italics, no all-caps transforms.

---

## 5. What Is NOT Built Yet (Backend Requirements)

This is strictly a client-side UI preview. The following systems will be implemented when backend infrastructure is authorized:

1. **Authentication & User Profiles**:
   - Guest accounts, login/signup, profile management.
2. **Persistent Database & Storage**:
   - Real farmhouse CMS, inventory, and dynamic photo upload storage.
3. **Live Availability Calendar**:
   - Two-way iCal / API sync with property caretakers or PMS to prevent double bookings.
4. **Payment Gateway Integration**:
   - Razorpay / UPI / Netbanking integration for security deposits and token booking amounts.
5. **Transactional Messaging**:
   - SMS / WhatsApp / Email booking confirmations and caretaker notifications.
6. **Form Processing Endpoints**:
   - Backend APIs for handling `booking_request` and `notify_me` leads.
7. **Reviews & Guest Feedback**:
   - Real guest rating submission and verified stay review system.
