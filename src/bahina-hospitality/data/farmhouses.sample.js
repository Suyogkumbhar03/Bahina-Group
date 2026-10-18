/**
 * Sample Farmhouses Data for BAHINA Hospitality Design Preview
 * Re-themed around Radhanagari, Kolhapur, Maharashtra.
 * All entries are purely illustrative sample content to demonstrate the UI layout.
 * No real farmhouses, bookings, or guest accommodations are represented here.
 */

export const SHOW_SAMPLE_PRICES = false;
export const SHOW_SAMPLE_RATINGS = false;

export const HERO_ASSETS = {
  heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=85",
  heroAlt: "Peaceful Radhanagari countryside farmhouse villa surrounded by Western Ghats greenery",
  foregroundLeaves: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=70",
};

export const STORY_SCENES = [
  {
    id: "scene-1",
    step: "01",
    taglineKey: "hosp.story.scene1Tag",
    titleKey: "hosp.story.scene1Title",
    descKey: "hosp.story.scene1Desc",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
    badgeKey: "hosp.story.scene1Badge",
    location: "Kolhapur City Border",
  },
  {
    id: "scene-2",
    step: "02",
    taglineKey: "hosp.story.scene2Tag",
    titleKey: "hosp.story.scene2Title",
    descKey: "hosp.story.scene2Desc",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    badgeKey: "hosp.story.scene2Badge",
    location: "Bhogawati River Road",
  },
  {
    id: "scene-3",
    step: "03",
    taglineKey: "hosp.story.scene3Tag",
    titleKey: "hosp.story.scene3Title",
    descKey: "hosp.story.scene3Desc",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    badgeKey: "hosp.story.scene3Badge",
    location: "Radhanagari Forest Gates",
  },
  {
    id: "scene-4",
    step: "04",
    taglineKey: "hosp.story.scene4Tag",
    titleKey: "hosp.story.scene4Title",
    descKey: "hosp.story.scene4Desc",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80",
    badgeKey: "hosp.story.scene4Badge",
    location: "Private Pool & Lawn",
  },
  {
    id: "scene-5",
    step: "05",
    taglineKey: "hosp.story.scene5Tag",
    titleKey: "hosp.story.scene5Title",
    descKey: "hosp.story.scene5Desc",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    badgeKey: "hosp.story.scene5Badge",
    location: "Traditional Teak Verandah",
  },
];

export const DAY_TO_NIGHT_PHASES = [
  {
    id: "morning",
    time: "06:00 AM",
    titleKey: "hosp.dayNight.morningTitle",
    descKey: "hosp.dayNight.morningDesc",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    moodColor: "#203F30",
    accent: "#DFA82E",
  },
  {
    id: "afternoon",
    time: "01:00 PM",
    titleKey: "hosp.dayNight.afternoonTitle",
    descKey: "hosp.dayNight.afternoonDesc",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    moodColor: "#325C47",
    accent: "#536B4E",
  },
  {
    id: "sunset",
    time: "06:30 PM",
    titleKey: "hosp.dayNight.sunsetTitle",
    descKey: "hosp.dayNight.sunsetDesc",
    image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1600&q=80",
    moodColor: "#753920",
    accent: "#B9532C",
  },
  {
    id: "night",
    time: "09:00 PM",
    titleKey: "hosp.dayNight.nightTitle",
    descKey: "hosp.dayNight.nightDesc",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80",
    moodColor: "#152219",
    accent: "#DFA82E",
  },
];

export const DESTINATION_TILES = [
  {
    id: "radhanagari-wildlife",
    districtId: "kolhapur",
    titleKey: "hosp.dest.kolhapurTitle",
    subtitleKey: "hosp.dest.kolhapurSubtitle",
    stayCount: 3,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
  },
];

export const SAMPLE_FARMHOUSES = [
  {
    id: "fh-sample-1",
    slug: "sample-farmhouse-1",
    status: "open", // "open" | "coming_soon" | "under_construction"
    nameKey: "hosp.fh1.name",
    taglineKey: "hosp.fh1.tagline",
    leadDescKey: "hosp.fh1.leadDesc",
    fullDescKey: "hosp.fh1.fullDesc",
    villageKey: "hosp.fh1.village",
    talukaKey: "hosp.fh1.taluka",
    districtKey: "hosp.fh1.district",
    districtId: "kolhapur",
    location: "Radhanagari, Kolhapur, Maharashtra",
    maxGuests: 12,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: 6500,
    artVariation: "hills-sunrise",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        label: "Villa & Private Pool",
      },
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        label: "Traditional Verandah Seating",
      },
      {
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
        label: "Orchard Garden Pool",
      },
      {
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
        label: "Spacious Farm Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
        label: "Campfire Lawn at Dusk",
      },
    ],
    amenityIds: ["pool", "meals", "lawn", "wifi", "power_backup", "parking", "campfire"],
    highlightKeys: [
      "hosp.fh1.highlight1",
      "hosp.fh1.highlight2",
      "hosp.fh1.highlight3",
    ],
    houseRuleKeys: [
      "hosp.fh1.rule1",
      "hosp.fh1.rule2",
      "hosp.fh1.rule3",
      "hosp.fh1.rule4",
    ],
    checkInTime: "1:00 PM",
    checkOutTime: "11:00 AM",
    nearbyPlaces: [
      { nameKey: "hosp.fh1.near1Name", distKey: "hosp.fh1.near1Dist" },
      { nameKey: "hosp.fh1.near2Name", distKey: "hosp.fh1.near2Dist" },
      { nameKey: "hosp.fh1.near3Name", distKey: "hosp.fh1.near3Dist" },
    ],
    faqList: [
      { qKey: "hosp.fh1.faq1Q", aKey: "hosp.fh1.faq1A" },
      { qKey: "hosp.fh1.faq2Q", aKey: "hosp.fh1.faq2A" },
      { qKey: "hosp.fh1.faq3Q", aKey: "hosp.fh1.faq3A" },
    ],
    unavailableDates: [
      "2026-10-18",
      "2026-10-19",
      "2026-10-24",
      "2026-10-25",
      "2026-10-31",
      "2026-11-01",
    ],
  },
  {
    id: "fh-sample-2",
    slug: "sample-farmhouse-2",
    status: "coming_soon",
    nameKey: "hosp.fh2.name",
    taglineKey: "hosp.fh2.tagline",
    leadDescKey: "hosp.fh2.leadDesc",
    fullDescKey: "hosp.fh2.fullDesc",
    villageKey: "hosp.fh2.village",
    talukaKey: "hosp.fh2.taluka",
    districtKey: "hosp.fh2.district",
    districtId: "kolhapur",
    location: "Radhanagari, Kolhapur, Maharashtra",
    maxGuests: 8,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: null,
    artVariation: "orchard-verandah",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        label: "Forest Foothill Cottage",
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        label: "Rustic Courtyard",
      },
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        label: "Outdoor Dining Area",
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        label: "Cottage Bedroom",
      },
      {
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
        label: "Nature Walking Trails",
      },
    ],
    amenityIds: ["meals", "lawn", "kitchen", "parking", "pet_friendly"],
    highlightKeys: [
      "hosp.fh2.highlight1",
      "hosp.fh2.highlight2",
      "hosp.fh2.highlight3",
    ],
    houseRuleKeys: [
      "hosp.fh2.rule1",
      "hosp.fh2.rule2",
      "hosp.fh2.rule3",
    ],
    checkInTime: "1:00 PM",
    checkOutTime: "11:00 AM",
    nearbyPlaces: [
      { nameKey: "hosp.fh2.near1Name", distKey: "hosp.fh2.near1Dist" },
      { nameKey: "hosp.fh2.near2Name", distKey: "hosp.fh2.near2Dist" },
    ],
    faqList: [
      { qKey: "hosp.fh2.faq1Q", aKey: "hosp.fh2.faq1A" },
      { qKey: "hosp.fh2.faq2Q", aKey: "hosp.fh2.faq2A" },
    ],
    unavailableDates: [],
  },
  {
    id: "fh-sample-3",
    slug: "sample-farmhouse-3",
    status: "coming_soon",
    nameKey: "hosp.fh3.name",
    taglineKey: "hosp.fh3.tagline",
    leadDescKey: "hosp.fh3.leadDesc",
    fullDescKey: "hosp.fh3.fullDesc",
    villageKey: "hosp.fh3.village",
    talukaKey: "hosp.fh3.taluka",
    districtKey: "hosp.fh3.district",
    districtId: "kolhapur",
    location: "Radhanagari, Kolhapur, Maharashtra",
    maxGuests: 16,
    bedrooms: 4,
    bathrooms: 4,
    pricePerNight: null,
    artVariation: "valley-terrace",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
        label: "Panoramic Hillside Estate",
      },
      {
        url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=80",
        label: "Valley Sunset Deck",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        label: "Spacious Living Pavilion",
      },
      {
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
        label: "Master Valley Suite",
      },
      {
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
        label: "Evening Campfire Pit",
      },
    ],
    amenityIds: ["mountain_view", "meals", "lawn", "campfire", "games", "parking"],
    highlightKeys: [
      "hosp.fh3.highlight1",
      "hosp.fh3.highlight2",
      "hosp.fh3.highlight3",
    ],
    houseRuleKeys: [
      "hosp.fh3.rule1",
      "hosp.fh3.rule2",
      "hosp.fh3.rule3",
    ],
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    nearbyPlaces: [
      { nameKey: "hosp.fh3.near1Name", distKey: "hosp.fh3.near1Dist" },
      { nameKey: "hosp.fh3.near2Name", distKey: "hosp.fh3.near2Dist" },
    ],
    faqList: [
      { qKey: "hosp.fh3.faq1Q", aKey: "hosp.fh3.faq1A" },
      { qKey: "hosp.fh3.faq2Q", aKey: "hosp.fh3.faq2A" },
    ],
    unavailableDates: [],
  },
  {
    id: "fh-sample-4",
    slug: "sample-farmhouse-4",
    status: "under_construction",
    nameKey: "hosp.fh4.name",
    taglineKey: "hosp.fh4.tagline",
    leadDescKey: "hosp.fh4.leadDesc",
    fullDescKey: "hosp.fh4.fullDesc",
    villageKey: "hosp.fh4.village",
    talukaKey: "hosp.fh4.taluka",
    districtKey: "hosp.fh4.district",
    districtId: "kolhapur",
    location: "Radhanagari, Kolhapur, Maharashtra",
    maxGuests: 10,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: null,
    artVariation: "construction-site",
    constructionStep: 3, // 1: Land ready, 2: Foundation, 3: Walls & Structure, 4: Finishing, 5: Opening
    photos: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        label: "Planned Design (Artist Impression)",
      },
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        label: "Natural Basalt & Timber Masonry",
      },
      {
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
        label: "Hillside Location",
      },
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        label: "Surrounding Forest Reserve",
      },
    ],
    amenityIds: ["meals", "lawn", "kitchen", "parking"],
    highlightKeys: [
      "hosp.fh4.highlight1",
      "hosp.fh4.highlight2",
      "hosp.fh4.highlight3",
    ],
    houseRuleKeys: [
      "hosp.fh4.rule1",
      "hosp.fh4.rule2",
    ],
    checkInTime: "1:00 PM",
    checkOutTime: "11:00 AM",
    nearbyPlaces: [
      { nameKey: "hosp.fh4.near1Name", distKey: "hosp.fh4.near1Dist" },
      { nameKey: "hosp.fh4.near2Name", distKey: "hosp.fh4.near2Dist" },
    ],
    faqList: [
      { qKey: "hosp.fh4.faq1Q", aKey: "hosp.fh4.faq1A" },
      { qKey: "hosp.fh4.faq2Q", aKey: "hosp.fh4.faq2A" },
    ],
    unavailableDates: [],
  },
];

export function getFarmhouseBySlug(slug) {
  return SAMPLE_FARMHOUSES.find((fh) => fh.slug === slug) || null;
}

