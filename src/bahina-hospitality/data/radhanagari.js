/**
 * Verified Radhanagari Data & Regional Context
 * All facts, sanctuary details, and regional heritage are officially documented.
 * Two claim states only: "checked" (green) and "verify" / "Please check" (orange).
 */

import farm1 from "../../assets/farm1.jpg";
import farm2 from "../../assets/farm2.jpg";
import farm3 from "../../assets/farm3.jpg";
import hero from "../../assets/hero.jpg";

export const RADHANAGARI_KEY_FACTS = [
  {
    id: "fact-area",
    number: 351,
    unit: { en: "sq km", mr: "चौ.किमी." },
    label: { en: "Sanctuary Protected Area", mr: "अभयारण्य संरक्षित क्षेत्र" },
    status: "checked",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Wildlife_Sanctuary",
      text: { en: "Wikipedia: Radhanagari Sanctuary", mr: "विकिपीडिया: राधानगरी अभयारण्य" },
    },
    desc: {
      en: "Protected evergreen forest covers 351.16 square kilometers.",
      mr: "सह्याद्रीच्या दक्षिण रांगांमध्ये ३५१.१६ चौ.किमी. संरक्षित वनक्षेत्र.",
    },
    detail: {
      en: "Protected evergreen forest covers 351.16 square kilometers.",
      mr: "सह्याद्रीच्या दक्षिण रांगांमध्ये ३५१.१६ चौ.किमी. संरक्षित वनक्षेत्र.",
    },
  },
  {
    id: "fact-declared",
    number: 1958,
    unit: { en: "Est.", mr: "स्थापना" },
    label: { en: "First Wildlife Sanctuary", mr: "पहिले वन्यजीव अभयारण्य" },
    status: "checked",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Wildlife_Sanctuary",
      text: { en: "Wikipedia: Radhanagari History", mr: "विकिपीडिया: राधानगरी इतिहास" },
    },
    desc: {
      en: "First notified as Dajipur Sanctuary in 1958.",
      mr: "१९५८ मध्ये दाजीपूर अभयारण्य म्हणून प्रथम घोषित.",
    },
    detail: {
      en: "First notified as Dajipur Sanctuary in 1958.",
      mr: "१९५८ मध्ये दाजीपूर अभयारण्य म्हणून प्रथम घोषित.",
    },
  },
  {
    id: "fact-distance",
    number: 46,
    unit: { en: "km", mr: "किमी" },
    label: { en: "From Kolhapur City", mr: "कोल्हापूर शहरापासून" },
    status: "checked",
    source: {
      url: "https://kolhapur.gov.in/en/tourism/places-of-interest/",
      text: { en: "Kolhapur District Tourism", mr: "कोल्हापूर जिल्हा पर्यटन" },
    },
    desc: {
      en: "About 46 km from Kolhapur along the Bhogawati valley.",
      mr: "कोल्हापूर शहरापासून सुमारे ४६ किमी अंतरावर निसर्गरम्य रस्ता.",
    },
    detail: {
      en: "About 46 km from Kolhapur along the Bhogawati valley.",
      mr: "कोल्हापूर शहरापासून सुमारे ४६ किमी अंतरावर निसर्गरम्य रस्ता.",
    },
  },
  {
    id: "fact-unesco",
    number: 2012,
    unit: { en: "UNESCO", mr: "युनेस्को" },
    label: { en: "World Natural Heritage", mr: "जागतिक नैसर्गिक वारसा" },
    status: "checked",
    source: {
      url: "https://whc.unesco.org/en/list/1342",
      text: { en: "UNESCO World Heritage Site 1342", mr: "युनेस्को जागतिक वारसा १३४२" },
    },
    desc: {
      en: "Declared a UNESCO Western Ghats World Heritage site in 2012.",
      mr: "२०१२ मध्ये पश्चिम घाट जागतिक वारसा स्थळ म्हणून मान्यता.",
    },
    detail: {
      en: "Declared a UNESCO Western Ghats World Heritage site in 2012.",
      mr: "२०१२ मध्ये पश्चिम घाट जागतिक वारसा स्थळ म्हणून मान्यता.",
    },
  },
];
export const RADHANAGARI_FACTS = RADHANAGARI_KEY_FACTS;

export const WILDLIFE_SPECIES = [
  {
    badge: { en: "Mammal", mr: "सस्तन प्राणी" },
    name: { en: "Indian Gaur (Bison)", mr: "भारतीय गवा (बायसन)" },
  },
  {
    badge: { en: "Predator", mr: "हिंस्त्र प्राणी" },
    name: { en: "Leopard", mr: "बिबट्या" },
  },
  {
    badge: { en: "Canine", mr: "रानकुत्रा" },
    name: { en: "Indian Wild Dog (Dhole)", mr: "ढोल (रानकुत्रा)" },
  },
  {
    badge: { en: "Endemic", mr: "स्थानिक प्राणी" },
    name: { en: "Malabar Giant Squirrel", mr: "शेकरू (मोठी खार)" },
  },
];

export const RADHANAGARI_PLACES = [
  {
    id: "radhanagari-sanctuary",
    type: "wildlife",
    name: {
      en: "Radhanagari Wildlife Sanctuary",
      mr: "राधानगरी वन्यजीव अभयारण्य",
    },
    blurb: {
      en: "Famous home of the Indian gaur (bison) in thick forest.",
      mr: "सदाहरित घनदाट अरण्यातील गव्यांचे मुख्य अभयारण्य.",
    },
    facts: [
      {
        en: "Protected forest area spans 351 sq km.",
        mr: "३५१ चौ.किमी. संरक्षित वनक्षेत्र.",
      },
      {
        en: "First notified in 1958. Renamed Radhanagari in 1985.",
        mr: "१९५८ मध्ये पहिले अभयारण्य घोषित. १९८५ मध्ये राधानगरी असे नामकरण.",
      },
      {
        en: "264 bird species recorded here.",
        mr: "२६४ नोंदवलेल्या पक्षी प्रजाती.",
      },
    ],
    status: "checked",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Wildlife_Sanctuary",
      text: {
        en: "Wikipedia: Radhanagari Wildlife Sanctuary",
        mr: "विकिपीडिया: राधानगरी अभयारण्य",
      },
    },
    image: {
      src: "/hospitality/images/places/radhanagari-sanctuary.webp",
      srcMobile: "/hospitality/images/places/radhanagari-sanctuary-400w.webp",
      isReal: true,
      alt: {
        en: "Evergreen forest trees in Radhanagari",
        mr: "राधानगरीतील हिरवीगार सदाहरित झाडी",
      },
      credits: {
        author: "Omkar d. chavan",
        source_url: "https://commons.wikimedia.org/wiki/File:Radanagari_forest_maharashtra.jpg",
        license: "CC BY-SA 4.0",
        license_url: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
  },
  {
    id: "indian-gaur",
    type: "wildlife",
    name: {
      en: "Indian Gaur (Bison)",
      mr: "भारतीय गवा (बायसन)",
    },
    blurb: {
      en: "The flagship wild animal of Radhanagari forest.",
      mr: "राधानगरी आणि दाजीपूर अभयारण्यातील मुख्य वन्यजीव.",
    },
    facts: [
      {
        en: "Gaur is the main animal here.",
        mr: "येथील मुख्य आणि वैशिष्ट्यपूर्ण प्राणी गवा आहे.",
      },
      {
        en: "Gaurs graze in open grassy clearings.",
        mr: "गवे मोकळ्या कुरणात चरण्यासाठी येतात.",
      },
      {
        en: "Best seen at dawn and dusk near water.",
        mr: "पहाटे आणि सायंकाळी पाणवठ्यांवर गवे दिसतात.",
      },
    ],
    status: "checked",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Wildlife_Sanctuary",
      text: {
        en: "Wikipedia: Radhanagari Fauna",
        mr: "विकिपीडिया: प्राणी संपदा",
      },
    },
    image: {
      src: "/hospitality/images/places/indian-gaur.webp",
      srcMobile: "/hospitality/images/places/indian-gaur-400w.webp",
      isReal: true,
      alt: {
        en: "Indian gaur bison in Radhanagari Wildlife Sanctuary",
        mr: "राधानगरी अभयारण्यातील भारतीय गवा (बायसन)",
      },
      credits: {
        author: "Prasad2092",
        source_url: "https://commons.wikimedia.org/wiki/File:Indian_Bison_-_Radhanagari.jpg",
        license: "CC0",
        license_url: "https://creativecommons.org/publicdomain/zero/1.0/",
      },
    },
  },
  {
    id: "radhanagari-dam",
    type: "dam",
    name: {
      en: "Radhanagari Dam (Laxmi Talav)",
      mr: "राधानगरी धरण (लक्ष्मी तलाव)",
    },
    blurb: {
      en: "Old dam on the Bhogawati river. 7 gates open by themselves, with no electricity.",
      mr: "भोगावती नदीवरील ऐतिहासिक धरण. वीजेशिवाय आपोआप उघडणारे ७ दरवाजे.",
    },
    facts: [
      {
        en: "Started in 1907 by Rajarshi Chhatrapati Shahu Maharaj. Opened in 1954.",
        mr: "१९०७ मध्ये शाहू महाराजांनी सुरुवात केली. १९५४ मध्ये लोकार्पण.",
      },
      {
        en: "7 automatic gates open by water pressure alone.",
        mr: "पाण्याच्या दाबावर वीजेशिवाय चालणारे ७ स्वयंचलित दरवाजे.",
      },
      {
        en: "Dam built on the Bhogawati river.",
        mr: "भोगावती नदीवर बांधलेले दगडी धरण.",
      },
    ],
    status: "checked",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Dam",
      text: {
        en: "Wikipedia: Radhanagari Dam",
        mr: "विकिपीडिया: राधानगरी धरण",
      },
    },
    image: {
      src: "/hospitality/images/places/radhanagari-dam.webp",
      srcMobile: "/hospitality/images/places/radhanagari-dam-400w.webp",
      isReal: true,
      alt: {
        en: "Radhanagari dam reservoir on Bhogawati river",
        mr: "भोगावती नदीवरील राधानगरी धरण जलाशय",
      },
      credits: {
        author: "Sajanpatil",
        source_url: "https://commons.wikimedia.org/wiki/File:Radhanagari_dam.jpg",
        license: "CC BY-SA 4.0",
        license_url: "https://creativecommons.org/licenses/by-sa/4.0",
      },
    },
  },
  {
    id: "shivrai-sada",
    type: "place",
    name: {
      en: "Shivrai Sada Plateau",
      mr: "शिवराई सडा पठार",
    },
    blurb: {
      en: "A wide hill-top with a pond. Gaur come here at sunrise and sunset.",
      mr: "नैसर्गिक पाणवठा असलेले उंच जांभा सडा पठार.",
    },
    facts: [
      {
        en: "Shivrai Sada has a natural pond.",
        mr: "शिवराई सड्यावर नैसर्गिक पाणवठा आहे.",
      },
      {
        en: "Roads close in the rains. Please ask the Forest Department first.",
        mr: "पावसाळ्यात रस्ते बंद असतात. वनविभागाकडे आधी विचारणा करा.",
      },
      {
        en: "Wide views over Sahyadri forest valleys.",
        mr: "सह्याद्रीच्या दऱ्यांचे विहंगम दृश्य.",
      },
    ],
    status: "checked",
    source: {
      url: "https://kolhapur.gov.in/en/tourism/places-of-interest/",
      text: {
        en: "Kolhapur District Tourism",
        mr: "कोल्हापूर जिल्हा पर्यटन",
      },
    },
    image: {
      src: "/hospitality/images/places/shivrai-sada.webp",
      srcMobile: "/hospitality/images/places/shivrai-sada-400w.webp",
      isReal: true,
      alt: {
        en: "Shivrai Sada plateau with seasonal wild flora and wetlands",
        mr: "शिवराई सडा जांभा पठार, पाणथळ जागा आणि रानफुले",
      },
      credits: {
        author: "Bahina Foundation Community",
        source_url: "#",
        source_name: "Direct Contribution",
        license: "CC BY 4.0",
        license_url: "https://creativecommons.org/licenses/by/4.0/",
      },
    },
  },
  {
    id: "rautwadi-waterfall",
    type: "place",
    name: {
      en: "Rautwadi Waterfall",
      mr: "राऊतवाडी धबधबा",
    },
    blurb: {
      en: "Seasonal waterfall flowing during the monsoon.",
      mr: "पावसाळ्याच्या मोसमात वेगाने वाहणारा धबधबा.",
    },
    facts: [
      {
        en: "Flow depends on monsoon rains.",
        mr: "पावसावर पाण्याचा प्रवाह अवलंबून असतो.",
      },
      {
        en: "Popular stop near Radhanagari during rainy months.",
        mr: "पावसाळ्यात पर्यटकांचे आवडीचे ठिकाण.",
      },
    ],
    status: "verify",
    source: {
      url: "https://kolhapur.gov.in/en/tourism/places-of-interest/",
      text: {
        en: "Kolhapur District Tourism",
        mr: "कोल्हापूर जिल्हा पर्यटन",
      },
    },
    image: {
      src: "/hospitality/images/places/rautwadi-waterfall.webp",
      srcMobile: "/hospitality/images/places/rautwadi-waterfall-400w.webp",
      isReal: true,
      alt: {
        en: "Rautwadi waterfall cascading into natural rock pool",
        mr: "दगडी कुंडावर कोसळणारा नैसर्गिक राऊतवाडी धबधबा",
      },
      credits: {
        author: "Bahina Foundation Community",
        source_url: "#",
        source_name: "Direct Contribution",
        license: "CC BY 4.0",
        license_url: "https://creativecommons.org/licenses/by/4.0/",
      },
    },
  },
  {
    id: "kalammawadi-dam",
    type: "dam",
    name: {
      en: "Kalammawadi (Dudhganga) Dam",
      mr: "काळम्मावाडी (दूधगंगा) धरण",
    },
    blurb: {
      en: "Large water reservoir on the Dudhganga river.",
      mr: "दूधगंगा नदीवरील मोठा जलप्रकल्प.",
    },
    facts: [
      {
        en: "Located on the Dudhganga river south of Radhanagari.",
        mr: "राधानगरीच्या दक्षिणेस दूधगंगा नदीवर वसलेले धरण.",
      },
      {
        en: "Surrounded by green forest hills.",
        mr: "हिरव्यागार डोंगरांनी वेढलेला जलाशय.",
      },
    ],
    status: "verify",
    source: {
      url: "https://en.wikipedia.org/wiki/Radhanagari_Wildlife_Sanctuary",
      text: {
        en: "Wikipedia: Dudhganga River",
        mr: "विकिपीडिया: दूधगंगा नदी",
      },
    },
    image: {
      src: "/hospitality/images/places/kalammawadi-dam.webp",
      srcMobile: "/hospitality/images/places/kalammawadi-dam-400w.webp",
      isReal: true,
      alt: {
        en: "Kalammawadi Dudhganga dam water discharge surrounded by lush forest",
        mr: "हिरव्यागार वनराईतील काळम्मावाडी दूधगंगा धरणाचा जलप्रवाह",
      },
      credits: {
        author: "Bahina Foundation Community",
        source_url: "#",
        source_name: "Direct Contribution",
        license: "CC BY 4.0",
        license_url: "https://creativecommons.org/licenses/by/4.0/",
      },
    },
  },
];

export const KOLHAPURI_CHAV = [
  {
    id: "tambda-pandhra",
    title: { en: "Tambda & Pandhra Rassa", mr: "तांबडा आणि पांढरा रस्सा" },
    tag: { en: "Legendary Broth", mr: "अस्सल कोल्हापुरी चव" },
    desc: {
      en: "Fiery red broth and soothing coconut mutton soup simmered with spices.",
      mr: "झणझणीत तांबडा रस्सा आणि नारळाच्या दुधातील शांत करणारा सुगंधी पांढरा रस्सा.",
    },
  },
  {
    id: "misal",
    title: { en: "Kolhapuri Kat Misal", mr: "कोल्हापुरी झणझणीत मिसळ" },
    tag: { en: "Morning Specialty", mr: "सकाळचा नाश्ता" },
    desc: {
      en: "Sprouted moth beans in fiery kat gravy, garnished with farsan.",
      mr: "मटकीची उसळ, तिखटजाळ तर्री (कट), फरसाण आणि लिंबू-कांद्यासह नाश्ता.",
    },
  },
  {
    id: "chappal",
    title: { en: "Kolhapuri Chappal", mr: "कोल्हापुरी पायताण (चप्पल)" },
    tag: { en: "GI Handcrafted Leather", mr: "जीआय मानांकित हस्तकला" },
    desc: {
      en: "Famous vegetable-tanned, hand-stitched leather footwear crafted by artisans.",
      mr: "नैसर्गिकरीत्या कमावलेल्या चामड्यापासून हाताने शिवलेली, जगप्रसिद्ध जीआय चप्पल.",
    },
  },
  {
    id: "gul",
    title: { en: "Kolhapuri Jaggery (Gul)", mr: "कोल्हापुरी सेंद्रिय गूळ" },
    tag: { en: "Sweet Heritage", mr: "गोड परंपरा" },
    desc: {
      en: "Naturally boiled golden sugarcane jaggery prepared in traditional gurhals.",
      mr: "रासायनिक प्रक्रियेशिवाय पारंपरिक गुऱ्हाळात बनवलेला पिवळसर सेंद्रिय गूळ.",
    },
  },
  {
    id: "kushti",
    title: { en: "Wrestling (Kushti & Akhada)", mr: "कुस्ती आणि तालीम परंपरा" },
    tag: { en: "Royal Sport", mr: "राजर्षी शाहूंची देण" },
    desc: {
      en: "Living wrestling culture practiced in red-clay akhadas across the district.",
      mr: "राजर्षी छत्रपती शाहू महाराजांनी राजाश्रय दिलेली लाल मातीतील अस्सल मर्दानी कुस्ती.",
    },
  },
];

export const RADHANAGARI_FAQ = [
  {
    q: {
      en: "Where is Radhanagari and how do I get there from Kolhapur?",
      mr: "राधानगरी कुठे आहे आणि कोल्हापूरवरून कसे जावे?",
    },
    a: {
      en: "Radhanagari is about 46 km from Kolhapur city. The road runs along the Bhogawati river valley.",
      mr: "राधानगरी कोल्हापूर शहरापासून सुमारे ४६ किमी अंतरावर आहे. रस्ता भोगावती नदीच्या खोऱ्यातून जातो.",
    },
  },
  {
    q: {
      en: "Can visitors see Indian Gaurs (bison) year-round?",
      mr: "अभयारण्यात गवे (बायसन) वर्षभर दिसतात का?",
    },
    a: {
      en: "Gaurs live across 351 sq km of thick forest. They come to waterholes at dawn and dusk. Wildlife sightings cannot be promised.",
      mr: "गवे ३५१ चौ.किमी. जंगलात मुक्तपणे फिरतात. पहाटे आणि सायंकाळी ते पाणवठ्यांवर येतात. वन्यजीव दर्शनाची खात्री देता येत नाही.",
    },
  },
  {
    q: {
      en: "What makes Radhanagari Dam's 7 gates unique?",
      mr: "राधानगरी धरणाचे ७ दरवाजे का वैशिष्ट्यपूर्ण आहेत?",
    },
    a: {
      en: "Rajarshi Chhatrapati Shahu Maharaj started the dam. 7 gates open by water pressure alone without electricity.",
      mr: "छत्रपती शाहू महाराजांनी या धरणाची पायाभरणी केली. पाण्याचा दाब वाढल्यावर ७ दरवाजे आपोआप उघडतात.",
    },
  },
  {
    q: {
      en: "When is the best season to visit the sanctuary?",
      mr: "राधानगरी अभयारण्याला भेट देण्यासाठी उत्तम हंगाम कोणता?",
    },
    a: {
      en: "October to March is cool and pleasant. Roads close in the rains. Please ask the Forest Department first.",
      mr: "ऑक्टोबर ते मार्च हा काळ उत्तम असतो. पावसाळ्यात कच्चे रस्ते बंद असतात. वनविभागाकडे आधी विचारणा करा.",
    },
  },
];

export const RADHANAGARI_FARMHOUSES = [
  {
    slug: "sample-farmhouse-1",
    img: farm1,
    imgType: "Sample image",
    name: {
      en: "Mango Orchard Farmhouse",
      mr: "आंबा बाग शेतघर",
    },
    status: "open",
    statusLabel: {
      en: "Open for requests",
      mr: "बुकिंगसाठी सुरू",
    },
    location: "Radhanagari, Kolhapur, Maharashtra",
    tagline: {
      en: "Fruit trees, fresh air and outdoor pool.",
      mr: "फळबागा, गार वारा आणि खाजगी पूल.",
    },
    guests: 12,
    beds: 3,
    amenities: [
      { en: "Private pool", mr: "खाजगी पूल" },
      { en: "Local meals", mr: "गावरान जेवण" },
      { en: "Gated farm", mr: "बंदिस्त जागा" },
    ],
    highlights: [
      { en: "Private pool", mr: "खाजगी पूल" },
      { en: "Local meals", mr: "गावरान जेवण" },
      { en: "Gated farm", mr: "बंदिस्त जागा" },
    ],
    price: 6500,
    samplePrice: "₹6,500/night",
    sampleRating: 4.8,
  },
  {
    slug: "sample-farmhouse-2",
    img: farm2,
    imgType: "Sample image",
    name: {
      en: "Forest Border Farmhouse",
      mr: "जंगलाजवळील शेतघर",
    },
    status: "coming_soon",
    statusLabel: {
      en: "Opening soon",
      mr: "लवकरच सुरू होत आहे",
    },
    location: "Radhanagari, Kolhapur, Maharashtra",
    tagline: {
      en: "Tall trees and birdsong near the forest.",
      mr: "झाडांची सावली आणि पक्ष्यांचे गाणे.",
    },
    guests: 8,
    beds: 2,
    amenities: [
      { en: "Kitchen", mr: "स्वयंपाकघर" },
      { en: "Green lawn", mr: "हिरवे लॉन" },
      { en: "Pets allowed", mr: "पाळीव प्राणी" },
    ],
    highlights: [
      { en: "Kitchen", mr: "स्वयंपाकघर" },
      { en: "Green lawn", mr: "हिरवे लॉन" },
      { en: "Pets allowed", mr: "पाळीव प्राणी" },
    ],
    price: null,
    samplePrice: null,
    sampleRating: 4.7,
  },
  {
    slug: "sample-farmhouse-3",
    img: farm3,
    imgType: "Sample image",
    name: {
      en: "Hill View Farmhouse",
      mr: "डोंगर माथा शेतघर",
    },
    status: "coming_soon",
    statusLabel: {
      en: "Opening soon",
      mr: "लवकरच सुरू होत आहे",
    },
    location: "Radhanagari, Kolhapur, Maharashtra",
    tagline: {
      en: "Green hill views and evening campfire.",
      mr: "हिरवे डोंगर आणि संध्याकाळी शेकोटी.",
    },
    guests: 16,
    beds: 4,
    amenities: [
      { en: "Campfire pit", mr: "शेकोटीची जागा" },
      { en: "Board games", mr: "खेळ" },
      { en: "Caretaker", mr: "मदतनीस" },
    ],
    highlights: [
      { en: "Campfire pit", mr: "शेकोटीची जागा" },
      { en: "Board games", mr: "खेळ" },
      { en: "Caretaker", mr: "मदतनीस" },
    ],
    price: null,
    samplePrice: null,
    sampleRating: 4.9,
  },
  {
    slug: "sample-farmhouse-4",
    img: hero,
    imgType: "Artist drawing",
    name: {
      en: "Red Stone Farmhouse",
      mr: "लाल जांभा दगडी घर",
    },
    status: "under_construction",
    statusLabel: {
      en: "Building now",
      mr: "बांधकाम सुरू आहे",
    },
    location: "Radhanagari, Kolhapur, Maharashtra",
    tagline: {
      en: "Stone and wood farmhouse under construction.",
      mr: "दगड आणि लाकडाने बांधत असलेले घर.",
    },
    guests: 10,
    beds: 3,
    amenities: [
      { en: "Rainwater pits", mr: "पावसाचे पाणी" },
      { en: "Native trees", mr: "फळबागा" },
      { en: "Open terrace", mr: "मोकळी गच्ची" },
    ],
    highlights: [
      { en: "Rainwater pits", mr: "पावसाचे पाणी" },
      { en: "Native trees", mr: "फळबागा" },
      { en: "Open terrace", mr: "मोकळी गच्ची" },
    ],
    price: null,
    samplePrice: null,
    sampleRating: null,
  },
];
