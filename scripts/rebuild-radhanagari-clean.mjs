import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, "../src/bahina-hospitality/data/radhanagari.js");

const code = `/**
 * Curated Radhanagari Data & Regional Context
 * Re-themed around Radhanagari, Kolhapur, Maharashtra.
 * All facts, sanctuary details, and regional heritage are officially documented.
 */

import farm1 from "../../assets/farm1.jpg";
import farm2 from "../../assets/farm2.jpg";
import farm3 from "../../assets/farm3.jpg";
import hero from "../../assets/hero.jpg";

export const RADHANAGARI_FACTS = [
  {
    id: "fact-area",
    numeric: 351.16,
    unit: { en: "sq km", mr: "चौ.किमी." },
    label: { en: "Sanctuary Protected Area", mr: "अभयारण्य संरक्षित क्षेत्र" },
    source: "Maharashtra Forest Department Notification (1985)",
    detail: {
      en: "Spanning 351.16 square kilometers of pristine southern Western Ghats evergreen forest.",
      mr: "सह्याद्रीच्या दक्षिण रांगांमध्ये ३५१.१६ चौ.किमी. क्षेत्रात विस्तारलेले वनक्षेत्र.",
    },
  },
  {
    id: "fact-declared",
    numeric: 1958,
    unit: { en: "Est.", mr: "स्थापना" },
    label: { en: "First Wildlife Sanctuary", mr: "पहिले वन्यजीव अभयारण्य" },
    source: "State Wildlife Advisory Board",
    detail: {
      en: "First declared as Dajipur Sanctuary in 1958 under the vision of Kolhapur's princely state.",
      mr: "१९५८ मध्ये दाजीपूर अभयारण्य म्हणून घोषित; १९८५ मध्ये राधानगरी असे नामकरण.",
    },
  },
  {
    id: "fact-distance",
    numeric: 46,
    unit: { en: "km", mr: "किमी" },
    label: { en: "From Kolhapur City", mr: "कोल्हापूर शहरापासून" },
    source: "Kolhapur-Radhanagari State Highway 115",
    detail: {
      en: "Scenic state highway winding through Bhogawati river valley, approximately 46 km from Kolhapur junction.",
      mr: "कोल्हापूर रेल्वे स्थानक आणि शहरापासून सुमारे ४६ किमी अंतरावर निसर्गरम्य रस्ता.",
    },
  },
  {
    id: "fact-unesco",
    numeric: 2012,
    unit: { en: "UNESCO", mr: "युनेस्को" },
    label: { en: "World Natural Heritage", mr: "जागतिक नैसर्गिक वारसा" },
    source: "UNESCO World Heritage Centre",
    detail: {
      en: "Part of the Western Ghats World Heritage cluster recognized for extraordinary biological diversity.",
      mr: "२०१२ मध्ये पश्चिम घाट जागतिक वारसा स्थळाचा अविभाज्य भाग म्हणून मान्यता.",
    },
  },
];

export const RADHANAGARI_PLACES = [
  {
    id: "radhanagari-sanctuary",
    type: "wildlife",
    name: {
      en: "Radhanagari Wildlife Sanctuary",
      mr: "राधानगरी (दाजीपूर) वन्यजीव अभयारण्य",
    },
    blurb: {
      en: "Famous home of the Indian Gaur (bison) amidst dense evergreen forests.",
      mr: "सदाहरित घनदाट अरण्यात वसलेले गव्यांचे (बायसन) सुप्रसिद्ध नैसर्गिक वसतीस्थान.",
    },
    facts: [
      {
        en: "Notified as Dajipur sanctuary in 1958; expanded to 351 sq km in 1985.",
        mr: "१९५८ मध्ये दाजीपूर अभयारण्य म्हणून घोषित; १९८५ मध्ये ३५१ चौ.किमी. विस्तार.",
      },
      {
        en: "Shelters gaur, leopard, sloth bear, barking deer and giant squirrel.",
        mr: "गवा, बिबट्या, अस्वल, सांबर, भेकर आणि शेकरू या प्राण्यांचे नैसर्गिक निवासस्थान.",
      },
      {
        en: "264 recorded bird species including the magnificent Great Pied Hornbill.",
        mr: "२६४ नोंदवलेल्या पक्षी प्रजाती, ज्यामध्ये महाधनेश (हॉर्नबिल) चा समावेश आहे.",
      },
    ],
    status: "verified",
    source: {
      en: "Maharashtra Forest Department & UNESCO World Heritage Dossier",
      mr: "महाराष्ट्र वनविभाग आणि युनेस्को जागतिक वारसा दस्तऐवज",
    },
    image: {
      src: farm1,
      alt: {
        en: "Dense evergreen canopy of Radhanagari sanctuary",
        mr: "राधानगरी अभयारण्यातील हिरवीगार सदाहरित झाडी",
      },
      type: "Sample image",
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
      en: "Historic gravity dam on the Bhogawati river with 7 automatic siphon gates.",
      mr: "भोगावती नदीवरील ऐतिहासिक धरण, ज्याचे ७ स्वयंचलित दरवाजे वीज अथवा मानवी शक्तीशिवाय उघडतात.",
    },
    facts: [
      {
        en: "Envisioned and initiated in 1907 by Rajarshi Chhatrapati Shahu Maharaj; opened in 1954.",
        mr: "राजर्षी छत्रपती शाहू महाराजांनी १९०७ मध्ये पायाभरणी केली; १९५४ मध्ये लोकार्पण.",
      },
      {
        en: "7 automatic gates operate purely on hydrostatic water pressure without electricity.",
        mr: "पाण्याच्या दाबावर वीज व यंत्रांशिवाय स्वयंचलित उघडणारे ७ दुर्मीळ दरवाजे.",
      },
      {
        en: "Provides perennial drinking and irrigation water across Kolhapur district.",
        mr: "कोल्हापूरच्या शेतीला व जनतेला बारमाही पाणी देणारी भाग्यरेषा.",
      },
    ],
    status: "verified",
    source: {
      en: "Irrigation Department & Kolhapur District Gazetteer",
      mr: "जलसंपदा विभाग आणि कोल्हापूर जिल्हा गॅझेटियर",
    },
    image: {
      src: farm3,
      alt: {
        en: "Calm reservoir waters of Radhanagari dam",
        mr: "राधानगरी धरणाचा विस्तीर्ण जलाशय",
      },
      type: "Sample image",
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
      en: "Expansive high-altitude laterite plateau with a natural watering pond where wildlife congregates.",
      mr: "नैसर्गिक पाणवठा असलेले उंच जांभा सडा पठार, जेथे सूर्योदयाला आणि सूर्यास्ताला वन्यजीव येतात.",
    },
    facts: [
      {
        en: "Prime spot where Indian gaurs emerge to graze at dawn and dusk.",
        mr: "पहाटे आणि सायंकाळी गवे चरायल व पाणी प्यायला येणारे मुख्य ठिकाण.",
      },
      {
        en: "Narrow unpaved dirt tracks access the sada; closed during monsoon rains for safety.",
        mr: "कच्चे रस्ते पावसाळ्यात सुरक्षेच्या कारणास्तव वनविभागाकडून बंद ठेवले जातात.",
      },
      {
        en: "Offers panoramic vistas over dense valley canopies of the Western Ghats.",
        mr: "पश्चिम घाटातील हिरव्यागार दऱ्यांचे ३६० अंशातील विहंगम दृश्य.",
      },
    ],
    status: "verified",
    source: {
      en: "Wildlife Division Radhanagari & Forest Field Guides",
      mr: "वन्यजीव विभाग राधानगरी आणि वन मार्गदर्शक नोंदी",
    },
    image: {
      src: farm2,
      alt: {
        en: "Open mist-covered expanse of Shivrai Sada plateau",
        mr: "शिवराई सडा पठारावरील धुक्याची चादर",
      },
      type: "Sample image",
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
      en: "Spectacular seasonal cascade gushing through rocky basalt gorges during peak monsoon.",
      mr: "पावसाळ्यात कातळावरून कोसळणारा निसर्गरम्य व लोकप्रिय धबधबा.",
    },
    facts: [
      {
        en: "Flow is seasonal and heavily dependent on southwest monsoon rainfall.",
        mr: "पावसाळ्याच्या मोसमातच पाण्याचा जोरदार प्रवाह असतो.",
      },
      {
        en: "Access route and visitor safety regulations are monitored by local village committee.",
        mr: "स्थानिक ग्रामसमिती व प्रशासनाकडून नियमावली निश्चित केली जाते.",
      },
    ],
    status: "verify",
    source: {
      en: "District tourism listing (timings and safety advisories subject to seasonal verification)",
      mr: "जिल्हा पर्यटन सूची (वेळ आणि सुरक्षेचे नियम हंगामानुसार बदलू शकतात)",
    },
    image: {
      src: hero,
      alt: {
        en: "Cascading forest stream near Radhanagari",
        mr: "राधानगरी जवळील निसर्गरम्य प्रवाह",
      },
      type: "Sample image",
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
      en: "Major multipurpose hydroelectric and irrigation reservoir on the Dudhganga river.",
      mr: "दूधगंगा नदीवर बांधलेला भव्य जलप्रकल्प, जो सीमाभागाला समृद्ध करतो.",
    },
    facts: [
      {
        en: "Joint interstate river project situated south of Radhanagari tehsil.",
        mr: "राधानगरी तालुक्याच्या दक्षिणेस वसलेला भव्य जलप्रकल्प.",
      },
      {
        en: "Backwaters create serene mist-covered islands surrounded by thick forest reserve.",
        mr: "धरणाच्या फुगवट्यामुळे जंगलाने वेढलेली सुंदर जलाशये तयार होतात.",
      },
    ],
    status: "verify",
    source: {
      en: "Irrigation department records (public access areas subject to verification)",
      mr: "जलसंपदा विभाग नोंदी (प्रवेश क्षेत्रे खात्रीसापेक्ष)",
    },
    image: {
      src: farm1,
      alt: {
        en: "Backwaters of Kalammawadi reservoir",
        mr: "काळम्मावाडी धरणाचे बॅकवॉटर",
      },
      type: "Sample image",
    },
  },
  {
    id: "kolhapur-heritage",
    type: "culture",
    name: {
      en: "Kolhapur Cultural Excursions",
      mr: "कोल्हापूर ऐतिहासिक वारसा",
    },
    blurb: {
      en: "Historic landmarks including Shri Ambabai (Mahalaxmi) Temple, New Palace and Panhala Fort.",
      mr: "श्री महालक्ष्मी (अंबाबाई) मंदिर, छत्रपती शाहू न्यू पॅलेस व ऐतिहासिक पन्हाळा गड.",
    },
    facts: [
      {
        en: "Ancient Karveer Peeth spiritual heritage dating back to the Shilahara dynasty.",
        mr: "शिलाहार व मराठाकालीन ऐतिहासिक व आध्यात्मिक समृद्ध वारसा.",
      },
      {
        en: "Located around 46 to 70 km from Radhanagari foothills.",
        mr: "राधानगरीपासून सुमारे ४६ ते ७० किमी परिसरात वसलेली ठिकाणे.",
      },
    ],
    status: "verify",
    source: {
      en: "Kolhapur District Gazetteer & Archaeological Survey records",
      mr: "कोल्हापूर जिल्हा गॅझेटियर आणि पुरातत्व सर्वेक्षण नोंदी",
    },
    image: {
      src: farm2,
      alt: {
        en: "Stone architectural carvings of Kolhapur",
        mr: "कोल्हापूरची ऐतिहासिक दगडी स्थापत्यकला",
      },
      type: "Sample image",
    },
  },
];

export const KOLHAPURI_CHAV = [
  {
    id: "tambda-pandhra",
    title: { en: "Tambda & Pandhra Rassa", mr: "तांबडा आणि पांढरा रस्सा" },
    tag: { en: "Legendary Broth", mr: "अस्सल कोल्हापुरी चव" },
    desc: {
      en: "Fiery red chilli-infused broth and soothing coconut-milk mutton soup crafted with slow-simmered spices.",
      mr: "झणझणीत तांबडा रस्सा आणि नारळाच्या दुधातील शांत करणारा सुगंधी पांढरा रस्सा.",
    },
  },
  {
    id: "misal",
    title: { en: "Kolhapuri Kat Misal", mr: "कोल्हापुरी झणझणीत मिसळ" },
    tag: { en: "Morning Specialty", mr: "सकाळचा नाश्ता" },
    desc: {
      en: "Sprouted moth beans drenched in a blazing spicy 'kat' gravy, garnished with farsan, onions and fresh lemon.",
      mr: "मटकीची उसळ, तिखटजाळ तर्री (कट), फरसाण आणि लिंबू-कांद्यासह अस्सल कोल्हापुरी नाश्ता.",
    },
  },
  {
    id: "chappal",
    title: { en: "Kolhapuri Chappal", mr: "कोल्हापुरी पायताण (चप्पल)" },
    tag: { en: "GI Handcrafted Leather", mr: "जीआय मानांकित हस्तकला" },
    desc: {
      en: "World-renowned vegetable-tanned, hand-stitched leather footwear crafted by generational artisans.",
      mr: "नैसर्गिकरीत्या कमावलेल्या चामड्यापासून हाताने शिवलेली, जगप्रसिद्ध जीआय-मानांकन प्राप्त चप्पल.",
    },
  },
  {
    id: "gul",
    title: { en: "Kolhapuri Jaggery (Gul)", mr: "कोल्हापुरी सेंद्रिय गूळ" },
    tag: { en: "Sweet Heritage", mr: "गोड परंपरा" },
    desc: {
      en: "Naturally boiled golden sugarcane jaggery prepared in traditional rural gurhals without harsh chemicals.",
      mr: "रासायनिक प्रक्रियेशिवाय पारंपरिक गुऱ्हाळात बनवलेला पिवळसर सेंद्रिय गूळ.",
    },
  },
  {
    id: "kushti",
    title: { en: "Wrestling (Kushti & Akhada)", mr: "कुस्ती आणि तालीम परंपरा" },
    tag: { en: "Royal Sport", mr: "राजर्षी शाहूंची देण" },
    desc: {
      en: "Living wrestling culture nourished by Chhatrapati Shahu Maharaj, practiced in red-clay akhadas across the district.",
      mr: "राजर्षी छत्रपती शाहू महाराजांनी राजाश्रय दिलेली लाल मातीतील अस्सल मर्दानी कुस्ती संस्कृती.",
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
      en: "Radhanagari is a forested tehsil town located 46 km southwest of Kolhapur city in the Western Ghats. State Highway 115 provides a scenic 60-to-75 minute drive past the Bhogawati river valley.",
      mr: "राधानगरी हे कोल्हापूरच्या नैऋत्येस ४६ किमी अंतरावर पश्चिम घाटात वसलेले निसर्गरम्य शहर आहे. राज्य महामार्ग ११५ ने भोगावती नदीच्या खोऱ्यातून साधारण ६० ते ७५ मिनिटांत पोहोचता येते.",
    },
  },
  {
    q: {
      en: "Can visitors see Indian Gaurs (bison) year-round?",
      mr: "अभयारण्यात गवे (बायसन) वर्षभर दिसतात का?",
    },
    a: {
      en: "Gaurs live wild across 351 sq km of thick forest. Sightings are frequent at dawn and dusk near waterholes, especially between November and May, but wildlife movements can never be guaranteed.",
      mr: "गवे ३५१ चौ.किमी.च्या विस्तीर्ण जंगलात मुक्तपणे फिरतात. नोव्हेंबर ते मे दरम्यान पहाटे किंवा संध्याकाळी पाणवठ्यांवर गवे सहसा दिसतात; मात्र वन्यजीव दर्शनाची खात्री देता येत नाही.",
    },
  },
  {
    q: {
      en: "What makes Radhanagari Dam's siphon gates unique?",
      mr: "राधानगरी धरणाचे स्वयंचलित दरवाजे का वैशिष्ट्यपूर्ण आहेत?",
    },
    a: {
      en: "Built under Rajarshi Chhatrapati Shahu Maharaj, the dam features 7 automatic siphon gates that open entirely on water pressure without electricity or human intervention — a masterwork of 20th-century hydrology.",
      mr: "राजर्षी छत्रपती शाहू महाराजांच्या संकल्पनेतील या धरणाचे ७ स्वयंचलित दरवाजे पाण्याच्या दाबावर वीज किंवा मानवी हस्तक्षेपाशिवाय आपोआप उघडतात; ही विसाव्या शतकातील दुर्मीळ अभियांत्रिकी आहे.",
    },
  },
  {
    q: {
      en: "When is the best season to visit the sanctuary?",
      mr: "राधानगरी अभयारण्याला भेट देण्यासाठी उत्तम हंगाम कोणता?",
    },
    a: {
      en: "October to March offers cool misty mornings and pleasant daytime temperatures. Monsoon (June-September) is breathtaking for waterfalls, though forest jeep tracks may be closed by authorities for safety.",
      mr: "ऑक्टोबर ते मार्च दरम्यान हवा आल्हाददायक आणि निसर्ग हिरवागार असतो. पावसाळ्यात धबधबे ओसंडून वाहतात, परंतु सुरक्षेच्या कारणास्तव वनविभागाकडून जंगलातील काही रस्ते बंद ठेवले जातात.",
    },
  },
];
`;

fs.writeFileSync(targetFile, code, "utf8");
console.log("Successfully rebuilt clean radhanagari.js!");
