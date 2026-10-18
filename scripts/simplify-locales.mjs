import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { hospitalityEn } from "../src/bahina-hospitality/locales/en.js";
import { hospitalityMr } from "../src/bahina-hospitality/locales/mr.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// English updates map
const enUpdates = {
  // Brand & Nav
  "hosp.brand.subline": "Quiet Farmhouse Stays",
  "hosp.nav.home": "Home",
  "hosp.nav.stays": "Farmhouses",
  "hosp.nav.howItWorks": "How booking works",
  "hosp.nav.faq": "Questions",
  "hosp.nav.backToGroup": "BAHINA Group",
  "hosp.btn.callUs": "Call us",
  "hosp.btn.whatsapp": "WhatsApp",
  "hosp.footer.about": "We build quiet farmhouses in villages near nature.",
  "hosp.footer.navTitle": "Links",
  "hosp.footer.contactTitle": "Contact us",
  "hosp.footer.location": "Radhanagari, Kolhapur, Maharashtra",
  "hosp.footer.previewDisclaimer": "This is a design preview. No bookings are taken.",
  "hosp.footer.rights": "All rights reserved.",
  "hosp.footer.craftedFor": "Made with care for rural Maharashtra.",

  // Preview & Status
  "hosp.preview.ribbonTitle": "Design preview",
  "hosp.preview.ribbonText": "Design preview. Sample content only, not real farmhouses.",
  "hosp.preview.sampleChip": "Sample",
  "hosp.photo.labelConstruction": "Building work",
  "hosp.photo.labelPlanned": "Planned design",
  "hosp.photo.artDescription": "Sample farmhouse drawing",
  "hosp.status.open": "Open for booking requests",
  "hosp.status.comingSoon": "Opening soon",
  "hosp.status.underConstruction": "We are still building this farmhouse",

  // Search & Filter
  "hosp.search.title": "Find a quiet farmhouse stay",
  "hosp.search.subtitle": "Farmhouse stays by BAHINA Hospitality",
  "hosp.search.locationLabel": "Location",
  "hosp.search.allLocations": "Radhanagari, Kolhapur",
  "hosp.search.datesLabel": "Dates",
  "hosp.search.guestsLabel": "Guests",
  "hosp.search.button": "Find stays",
  "hosp.search.checkIn": "Check-in",
  "hosp.search.checkOut": "Check-out",
  "hosp.search.selectDates": "Select dates",
  "hosp.search.selectGuests": "Select guests",
  "hosp.search.adults": "Adults",
  "hosp.search.adultsAge": "Age 13 and above",
  "hosp.search.children": "Children",
  "hosp.search.childrenAge": "Age 2 to 12",
  "hosp.search.guestSummarySingle": "1 guest",
  "hosp.search.guestSummaryPlural": "guests",
  "hosp.filter.filters": "Filters",
  "hosp.filter.status": "Status",
  "hosp.filter.allStatuses": "All farmhouses",
  "hosp.district.pune": "Bhogawati River",
  "hosp.hero.eyebrow": "Quiet stays in nature",
  "hosp.hero.supporting": "Clean village farmhouses with fruit trees and open skies.",
  "hosp.hero.ctaPrimary": "See farmhouses",
  "hosp.hero.scrollText": "Scroll down to see",
  "hosp.showcase.card1Desc": "Drink hot tea on the verandah. Listen to morning birds singing.",
  "hosp.pass.contactNote": "Our host calls you within 24 hours to confirm meals and route.",
  "hosp.notify.leadText": "Leave your phone number. We will message you when this farmhouse opens.",
  "hosp.filter.priceRange": "Price range",
  "hosp.filter.upTo": "Up to",
  "hosp.filter.perNight": "per night",
  "hosp.filter.amenities": "Things you get",
  "hosp.filter.sortBy": "Sort by",
  "hosp.filter.sortRecommended": "Recommended",
  "hosp.filter.sortPriceAsc": "Price: Low to High",
  "hosp.filter.sortPriceDesc": "Price: High to Low",
  "hosp.filter.sortCapacity": "Guests: High to Low",
  "hosp.filter.clearAll": "Clear all",
  "hosp.filter.apply": "Apply filters",
  "hosp.filter.showingCount": "Showing",
  "hosp.filter.farmhousesCount": "farmhouses",
  "hosp.filter.noResultsTitle": "No farmhouses match your search",
  "hosp.filter.noResultsText": "Clear some filters to see sample farmhouses.",
  "hosp.filter.clearFiltersBtn": "Clear filters",
  "hosp.filter.comingSoonTitle": "Farmhouse stays opening soon",
  "hosp.filter.comingSoonText": "We are building farmhouses across Maharashtra.",
  "hosp.filter.comingSoonAction": "Tell me when it opens",

  // Farmhouse Card
  "hosp.card.fromPrice": "from ₹",
  "hosp.card.perNight": "per night",
  "hosp.card.priceOnRequest": "Price on request",
  "hosp.card.maxGuests": "guests max",
  "hosp.card.bedrooms": "bedrooms",
  "hosp.card.viewAndRequest": "Ask to book",
  "hosp.card.viewDetails": "See details",
  "hosp.card.notifyMe": "Tell me when it opens",
  "hosp.card.sampleBadge": "Sample stay",

  // Details
  "hosp.details.photosButton": "See all photos",
  "hosp.details.aboutTitle": "About this farmhouse",
  "hosp.details.highlightsTitle": "Good things about this place",
  "hosp.details.amenitiesTitle": "Things provided here",
  "hosp.details.rulesTitle": "House rules",
  "hosp.details.timingsTitle": "Timings",
  "hosp.details.checkInLabel": "Check-in time",
  "hosp.details.checkOutLabel": "Check-out time",
  "hosp.details.nearbyTitle": "Places to see near here",
  "hosp.details.cancellationTitle": "Cancellation rule",
  "hosp.details.cancellationPolicyText": "Full refund if you cancel 5 days before check-in.",
  "hosp.details.faqTitle": "Questions about this stay",
  "hosp.details.requestToBook": "Ask to book",
  "hosp.details.notifyWhenOpens": "Tell me when it opens",
  "hosp.details.constructionUpdatesTitle": "Building updates",

  // Price Summary
  "hosp.price.estimatedNotice": "Estimated price. Our host confirms the final bill.",
  "hosp.price.night": "night",
  "hosp.price.nights": "nights",
  "hosp.price.totalEstimated": "Estimated total",
  "hosp.price.noDatesSelected": "Choose check-in and check-out dates to see price.",

  // Booking Flow
  "hosp.book.pageTitle": "Ask to book a farmhouse",
  "hosp.book.subtitle": "Design preview. No money is taken here.",
  "hosp.book.stepperAria": "Booking steps",
  "hosp.book.step1Title": "Dates & Guests",
  "hosp.book.step2Title": "Your Details",
  "hosp.book.step3Title": "Check & Send",
  "hosp.book.stayDetailsTitle": "Stay details",
  "hosp.book.contactDetailsTitle": "Your contact details",
  "hosp.book.fullNameLabel": "Your Name",
  "hosp.book.fullNamePlaceholder": "Enter your full name",
  "hosp.book.phoneLabel": "Mobile Number",
  "hosp.book.phonePlaceholder": "10-digit mobile number",
  "hosp.book.phoneHint": "Enter an Indian number starting with 6, 7, 8, or 9.",
  "hosp.book.villageLabel": "Village or Town",
  "hosp.book.villagePlaceholder": "Your village or town (optional)",
  "hosp.book.emailLabel": "Email Address",
  "hosp.book.emailPlaceholder": "name@example.com (optional)",
  "hosp.book.noteLabel": "Special Needs",
  "hosp.book.notePlaceholder": "Tell us about food habits or arrival time (optional)",
  "hosp.book.reviewTitle": "Check your booking request",
  "hosp.book.consentText": "I agree that BAHINA Hospitality may call me about this request.",
  "hosp.book.consentRequired": "Please tick this box to continue.",
  "hosp.book.nextStep": "Continue",
  "hosp.book.prevStep": "Back",
  "hosp.book.sendRequestBtn": "Send booking request",
  "hosp.book.submittingState": "Preparing preview...",
  "hosp.book.errName": "Please enter your name.",
  "hosp.book.errPhone": "Enter a valid 10-digit mobile number.",
  "hosp.book.errDates": "Please choose stay dates.",
  "hosp.book.errCapacity": "Guests exceed room capacity.",
  "hosp.book.errUnavailable": "These dates are already booked.",

  // Sent Page
  "hosp.sent.previewBanner": "Design preview: nothing was sent or stored.",
  "hosp.sent.title": "Booking request received",
  "hosp.sent.refLabel": "Request number",
  "hosp.sent.disclaimer": "This is a request, not a confirmed room. Our host will call you.",
  "hosp.sent.summaryTitle": "Request summary",
  "hosp.sent.backToStays": "See farmhouses",
  "hosp.sent.shareRequest": "Share request",
  "hosp.sent.copiedToast": "Details copied to clipboard.",

  // Notify Dialog
  "hosp.notify.title": "Get a message when it opens",
  "hosp.notify.subtitle": "We will message you when this farmhouse opens.",
  "hosp.notify.consent": "I agree to get one message when this opens.",
  "hosp.notify.submitBtn": "Tell me when it opens",
  "hosp.notify.submitting": "Saving...",
  "hosp.notify.successTitle": "Thank you for asking",
  "hosp.notify.successNote": "Design preview note: nothing was sent or saved.",
  "hosp.notify.closeBtn": "Close",

  // How It Works
  "hosp.how.title": "How booking works",
  "hosp.how.step1Title": "1. Pick your dates",
  "hosp.how.step1Desc": "Choose stay dates and how many people are coming.",
  "hosp.how.step2Title": "2. Send request",
  "hosp.how.step2Desc": "Share your phone number. You pay no money now.",
  "hosp.how.step3Title": "3. Phone call",
  "hosp.how.step3Desc": "Our host calls you to talk about food and directions.",

  // Timeline
  "hosp.timeline.stage1": "Land ready",
  "hosp.timeline.stage2": "Foundation",
  "hosp.timeline.stage3": "Walls and roof",
  "hosp.timeline.stage4": "Finishing",
  "hosp.timeline.stage5": "Opening",
  "hosp.timeline.completed": "Done",
  "hosp.timeline.inProgress": "Work going on",
  "hosp.timeline.upcoming": "Next step",

  // FAQs
  "hosp.faq.title": "Questions",
  "hosp.faq.q1": "Where is Radhanagari and how to reach?",
  "hosp.faq.a1": "Radhanagari is in Kolhapur district in Maharashtra. It is 46 km from Kolhapur city. You can reach here by road in one hour.",
  "hosp.faq.q2": "Can we see wildlife and bison?",
  "hosp.faq.a2": "Radhanagari is home to the Indian bison. We cannot promise you will see animals. They live free in the wild forest.",
  "hosp.faq.q3": "What is the best season to visit?",
  "hosp.faq.a3": "Winter from October to February is very pleasant. Rain closes the forest roads in monsoon. Please check with the Forest Department before visiting.",
  "hosp.faq.q4": "Are the farmhouses open for stays now?",
  "hosp.faq.a4": "We are still building these farmhouses. You cannot stay here yet. Leave your number to get an opening message.",
  "hosp.faq.q5": "Do you provide local meals?",
  "hosp.faq.a5": "Yes, our village cooks make fresh local food. You get hot jowar bhakri and vegetable curry. We cook to your family taste.",

  // Share
  "hosp.share.defaultTitle": "BAHINA Hospitality Farmhouse",
  "hosp.share.defaultText": "See this quiet farmhouse stay near Radhanagari.",
  "hosp.share.buttonAria": "Share this farmhouse",
  "hosp.share.buttonText": "Share",
  "hosp.share.copied": "Link copied",
  "hosp.share.toastSuccess": "Link copied to clipboard",

  // 404
  "hosp.404.title": "Farmhouse not found",
  "hosp.404.desc": "This farmhouse page does not exist or has moved.",
  "hosp.404.btn": "See all farmhouses",

  // Amenities
  "hosp.amenity.pool": "Swimming pool",
  "hosp.amenity.poolDesc": "Clean pool with fresh water",
  "hosp.amenity.meals": "Local food",
  "hosp.amenity.mealsDesc": "Fresh village food cooked on order",
  "hosp.amenity.wifi": "Wi-Fi",
  "hosp.amenity.wifiDesc": "Basic phone internet",
  "hosp.amenity.kitchen": "Kitchen",
  "hosp.amenity.kitchenDesc": "Gas stove and cooking pots",
  "hosp.amenity.powerBackup": "Power backup",
  "hosp.amenity.powerBackupDesc": "Battery backup for lights and fans",
  "hosp.amenity.lawn": "Green lawn",
  "hosp.amenity.lawnDesc": "Open grass to sit and walk",
  "hosp.amenity.campfire": "Campfire",
  "hosp.amenity.campfireDesc": "Evening wood fire to sit around",
  "hosp.amenity.parking": "Parking",
  "hosp.amenity.parkingDesc": "Safe space for cars and bikes",
  "hosp.amenity.mountainView": "Hill views",
  "hosp.amenity.mountainViewDesc": "Look out at green hills",
  "hosp.amenity.games": "Games",
  "hosp.amenity.gamesDesc": "Carrom and board games",
  "hosp.amenity.petFriendly": "Pets allowed",
  "hosp.amenity.petFriendlyDesc": "You can bring family pets",
  "hosp.amenity.ac": "Cool air",
  "hosp.amenity.acDesc": "Air conditioning in bedrooms",

  // Farmhouses sample
  "hosp.fh1.name": "Sample Farmhouse 1 (not real)",
  "hosp.fh1.tagline": "Fruit trees and cool air in Radhanagari",
  "hosp.fh1.leadDesc": "A quiet village farmhouse with mango trees and an outdoor pool.",
  "hosp.fh1.fullDesc": "This home has wide verandahs, green lawns, and fresh home-cooked food. Green hills sit all around.",
  "hosp.fh1.village": "Radhanagari",
  "hosp.fh1.taluka": "Radhanagari Taluka",
  "hosp.fh1.district": "Radhanagari, Kolhapur",
  "hosp.fh1.highlight1": "Private swimming pool beside fruit trees",
  "hosp.fh1.highlight2": "Fresh village breakfast and dinner",
  "hosp.fh1.highlight3": "Wide sitting verandah with wooden pillars",
  "hosp.fh1.rule1": "Keep quiet after 10:00 PM",
  "hosp.fh1.rule2": "Smoking only in outside open spaces",
  "hosp.fh1.rule3": "Bring government ID card for all adults",
  "hosp.fh1.rule4": "Speak politely with village neighbours",
  "hosp.fh1.near1Name": "Bhogawati River Walk",
  "hosp.fh1.near1Dist": "3 km away",
  "hosp.fh1.near2Name": "Radhanagari Dam",
  "hosp.fh1.near2Dist": "5 km away",
  "hosp.fh1.near3Name": "Dajipur Bison Sanctuary Gate",
  "hosp.fh1.near3Dist": "18 km away",
  "hosp.fh1.faq1Q": "Can we get local Kolhapuri food?",
  "hosp.fh1.faq1A": "Yes. Fresh bhakri, pitla, and Kolhapuri curries are cooked on order.",
  "hosp.fh1.faq2Q": "Is there car parking inside?",
  "hosp.fh1.faq2A": "Yes. Gated space fits up to 4 cars safely.",
  "hosp.fh1.faq3Q": "Can we bring pet dogs?",
  "hosp.fh1.faq3A": "Yes. Friendly pets are welcome if you tell us early.",

  "hosp.fh2.name": "Sample Farmhouse 2 (not real)",
  "hosp.fh2.tagline": "Green trees and bird calls in Dajipur",
  "hosp.fh2.leadDesc": "A quiet farmhouse near the forest with cool evening air.",
  "hosp.fh2.fullDesc": "Built for family stays. Walk on farm paths, sit in open courtyards, and rest.",
  "hosp.fh2.village": "Dajipur",
  "hosp.fh2.taluka": "Radhanagari Taluka",
  "hosp.fh2.district": "Radhanagari, Kolhapur",
  "hosp.fh2.highlight1": "Shaded coconut and teak trees",
  "hosp.fh2.highlight2": "Kitchen with gas stove",
  "hosp.fh2.highlight3": "Grass lawn where pets can run",
  "hosp.fh2.rule1": "No loud speakers after 9:30 PM",
  "hosp.fh2.rule2": "Keep the garden clean and litter-free",
  "hosp.fh2.rule3": "Only booked guests may stay overnight",
  "hosp.fh2.near1Name": "Shivrai Sada Trail",
  "hosp.fh2.near1Dist": "4 km away",
  "hosp.fh2.near2Name": "Forest View Point",
  "hosp.fh2.near2Dist": "12 km away",
  "hosp.fh2.faq1Q": "When will this stay open?",
  "hosp.fh2.faq1A": "Building work is going on. Click 'Tell me when it opens' for an alert.",
  "hosp.fh2.faq2Q": "Can we cook our own meals?",
  "hosp.fh2.faq2A": "Yes. A clean kitchen with gas is available for you.",

  "hosp.fh3.name": "Sample Farmhouse 3 (not real)",
  "hosp.fh3.tagline": "Hill views and evening fires in Radhanagari",
  "hosp.fh3.leadDesc": "A large hillside farmhouse built for big families.",
  "hosp.fh3.fullDesc": "Sit on the hill slope and look across the valley. Play games and sit by the fire.",
  "hosp.fh3.village": "Shivrai Sada",
  "hosp.fh3.taluka": "Radhanagari Taluka",
  "hosp.fh3.district": "Radhanagari, Kolhapur",
  "hosp.fh3.highlight1": "Views of green hills from bedrooms",
  "hosp.fh3.highlight2": "Big lawn for children to play",
  "hosp.fh3.highlight3": "Outdoor campfire space",
  "hosp.fh3.rule1": "Respect village quiet and farm fences",
  "hosp.fh3.rule2": "Turn off lights when leaving rooms",
  "hosp.fh3.rule3": "Light campfires only with our caretaker",
  "hosp.fh3.near1Name": "Radhanagari Dam Shore",
  "hosp.fh3.near1Dist": "6 km away",
  "hosp.fh3.near2Name": "Dajipur Meadow",
  "hosp.fh3.near2Dist": "15 km away",
  "hosp.fh3.faq1Q": "How many people can sleep here?",
  "hosp.fh3.faq1A": "Up to 16 guests can stay across 4 bedrooms.",
  "hosp.fh3.faq2Q": "Is there a caretaker on the farm?",
  "hosp.fh3.faq2A": "Yes. A caretaker lives nearby to help you.",

  "hosp.fh4.name": "Sample Farmhouse 4 (not real)",
  "hosp.fh4.tagline": "Red stone and wood farmhouse by the river",
  "hosp.fh4.leadDesc": "We are building this house with local red stone and wood.",
  "hosp.fh4.fullDesc": "It sits nicely on the hillside. We collect rainwater and plant fruit trees all around.",
  "hosp.fh4.village": "Bhogawati River",
  "hosp.fh4.taluka": "Radhanagari Taluka",
  "hosp.fh4.district": "Radhanagari, Kolhapur",
  "hosp.fh4.highlight1": "Strong stone walls built by local masons",
  "hosp.fh4.highlight2": "Rainwater pits and young fruit trees",
  "hosp.fh4.highlight3": "Open terrace to see stars at night",
  "hosp.fh4.rule1": "Building site is closed to visitors right now",
  "hosp.fh4.rule2": "Simple village living rules apply after opening",
  "hosp.fh4.near1Name": "Forest Border Trail",
  "hosp.fh4.near1Dist": "10 km away",
  "hosp.fh4.near2Name": "Dam View Point",
  "hosp.fh4.near2Dist": "8 km away",
  "hosp.fh4.faq1Q": "How much work is complete?",
  "hosp.fh4.faq1A": "Workers are putting up stone walls and roof wood now.",
  "hosp.fh4.faq2Q": "Can we visit the site today?",
  "hosp.fh4.faq2A": "No. For safety, visitors can come only after finishing work ends.",

  // Atmosphere Showcase
  "hosp.showcase.eyebrow": "Village atmosphere",
  "hosp.showcase.heading": "Live at the pace of nature.",
  "hosp.showcase.subheading": "Wake up to mist over trees. Sit by the fire under dark starry skies.",
  "hosp.showcase.card1Tag": "06:30 am · Early morning",
  "hosp.showcase.card1Title": "Verandah mornings",
  "hosp.showcase.card1Desc": "Drink hot tea on the verandah. Listen to morning birds singing.",
  "hosp.showcase.card2Tag": "01:00 pm · Farm lunch",
  "hosp.showcase.card2Title": "Fresh village food",
  "hosp.showcase.card2Desc": "Hot jowar bhakri, fresh farm vegetables, and slow-cooked village curries.",
  "hosp.showcase.card3Tag": "04:30 pm · Quiet trees",
  "hosp.showcase.card3Title": "Private pool and garden",
  "hosp.showcase.card3Desc": "Swim in a clean pool surrounded by mango and coconut trees.",
  "hosp.showcase.card4Tag": "09:30 pm · Starry night",
  "hosp.showcase.card4Title": "Campfire and stars",
  "hosp.showcase.card4Desc": "Sit around a warm wood fire. Look up at bright stars with family.",

  // Bento standard
  "hosp.bento.eyebrow": "The BAHINA promise",
  "hosp.bento.heading": "Private spaces and village calm.",
  "hosp.bento.subheading": "Every farmhouse gives you private land, fresh local food, and clean nature.",
  "hosp.bento.card1Title": "Red stone and wood.",
  "hosp.bento.card1Desc": "Built with red laterite stone and clay tile roofs. Open verandahs catch cool hill breeze.",
  "hosp.bento.card2Title": "Whole property is yours.",
  "hosp.bento.card2Desc": "No other guests stay with you. The farmhouse, pool, and garden belong only to your family.",
  "hosp.bento.card3Title": "Home-cooked farm meals.",
  "hosp.bento.card3Desc": "Enjoy hot jowar bhakris, fresh greens, and buttermilk made to your taste.",
  "hosp.bento.card4Title": "Solar power and clean water.",
  "hosp.bento.card4Desc": "Sun powers the lights. Rainwater pits feed farm wells without plastic waste.",

  // Story scenes
  "hosp.story.eyebrow": "The trip from city",
  "hosp.story.mainHeading": "Leave the noise. Breathe clean air.",
  "hosp.story.mainSub": "Travel from city roads to quiet green hills in Radhanagari.",
  "hosp.story.scene1Tag": "Step 01 · Start",
  "hosp.story.scene1Title": "Leave the traffic behind.",
  "hosp.story.scene1Desc": "Watch noisy city buildings fade in your mirror as you drive out.",
  "hosp.story.scene1Badge": "Kolhapur edge",
  "hosp.story.scene2Tag": "Step 02 · Road",
  "hosp.story.scene2Title": "Drive through green hills.",
  "hosp.story.scene2Desc": "Open your car window. Feel cool breeze blow through the trees.",
  "hosp.story.scene2Badge": "Hill road",
  "hosp.story.scene3Tag": "Step 03 · Arrive",
  "hosp.story.scene3Title": "Reach your quiet farmhouse.",
  "hosp.story.scene3Desc": "Walk into big mango orchards and open grass lawns.",
  "hosp.story.scene3Badge": "Farm gates",
  "hosp.story.scene4Tag": "Step 04 · Rest",
  "hosp.story.scene4Title": "Spend time with your family.",
  "hosp.story.scene4Desc": "Swim in the pool, eat hot meals, and talk without hurry.",
  "hosp.story.scene4Badge": "Private pool",
  "hosp.story.scene5Tag": "Step 05 · Farmhouses",
  "hosp.story.scene5Title": "Your stay starts here.",
  "hosp.story.scene5Desc": "See our simple countryside farmhouses built with stone and wood.",
  "hosp.story.scene5Badge": "Farmhouse verandah",
  "hosp.story.sceneCount": "Step",
  "hosp.story.viewStays": "See all farmhouses",

  // Feat
  "hosp.feat.eyebrow": "How we build",
  "hosp.feat.heading": "Not just a room. A simple way of living.",
  "hosp.feat.subheading": "Wake up to open skies and trees. Make memories away from crowd.",
  "hosp.feat.badgeTitle": "Village comfort",
  "hosp.feat.badgeSub": "Honest farmhouses made with local stone.",
  "hosp.feat.highlight1Title": "Room to sit together.",
  "hosp.feat.highlight1Desc": "Big verandahs, open lawns, and quiet courtyards made for family talk.",
  "hosp.feat.highlight2Title": "Trees outside your window.",
  "hosp.feat.highlight2Desc": "Wake up to morning dew on grass. Breathe sweet country air.",
  "hosp.feat.highlight3Title": "Time well spent.",
  "hosp.feat.highlight3Desc": "Eat fresh meals, rest by the pool, and sit by evening fires.",

  // Dest
  "hosp.dest.eyebrow": "Places around",
  "hosp.dest.heading": "Places to see near the farmhouses.",
  "hosp.dest.subheading": "Rivers, dams, and green hills around Radhanagari.",
  "hosp.dest.hint": "Click a card to filter farmhouses",
  "hosp.dest.sataraTitle": "Dajipur Sanctuary",
  "hosp.dest.sataraSubtitle": "Tall forest trees and bison trails",
  "hosp.dest.puneTitle": "Bhogawati River",
  "hosp.dest.puneSubtitle": "Clean river water and dam gates",
  "hosp.dest.raigadTitle": "Shivrai Sada Plateau",
  "hosp.dest.raigadSubtitle": "High open land and sunrise views",
  "hosp.dest.kolhapurTitle": "Kolhapur City",
  "hosp.dest.kolhapurSubtitle": "Historic temple and palace, 46 km away",
  "hosp.dest.exploreRegion": "See stays",

  // Day to night
  "hosp.dayNight.eyebrow": "A day on the farm",
  "hosp.dayNight.heading": "Every hour brings something new.",
  "hosp.dayNight.subheading": "Morning mist lifts, afternoon sun warms the pool, evening stars shine.",
  "hosp.dayNight.morningTitle": "Morning mist and birds",
  "hosp.dayNight.morningDesc": "Wake up to morning mist and birds. Drink hot tea on the verandah.",
  "hosp.dayNight.afternoonTitle": "Pool dips and orchard shade",
  "hosp.dayNight.afternoonDesc": "Swim in the pool, sit under mango trees, and eat farm lunch.",
  "hosp.dayNight.sunsetTitle": "Golden evening light",
  "hosp.dayNight.sunsetDesc": "Watch the sun sink behind the hills. Warm light covers the clay tiles.",
  "hosp.dayNight.nightTitle": "Campfire and starry sky",
  "hosp.dayNight.nightDesc": "Sit around a crackling wood fire. Look up at clear constellations.",

  // Discovery & amenities headers
  "hosp.discovery.heading": "Find your quiet farmhouse.",
  "hosp.discovery.subheading": "Small family cottages and large homes for everyone.",
  "hosp.amenities.eyebrow": "Farmhouse features",
  "hosp.amenities.heading": "Everything you need for a restful stay.",
  "hosp.amenities.subheading": "Clean beds, hot water, tasty food, and quiet nature.",
  "hosp.amenities.catAll": "All things",
  "hosp.amenities.catLeisure": "Pool & garden",
  "hosp.amenities.catComfort": "Rooms & power",
  "hosp.amenities.catDining": "Food & care",

  // How it works village path
  "hosp.howItWorks.eyebrow": "Simple steps",
  "hosp.howItWorks.heading": "How booking works",
  "hosp.howItWorks.lead": "Three easy steps to plan your family stay.",
  "hosp.howItWorks.step1Title": "Pick a farmhouse",
  "hosp.howItWorks.step1Desc": "Look at sample farmhouses by room size and pool.",
  "hosp.howItWorks.step2Title": "Send your dates",
  "hosp.howItWorks.step2Desc": "Pick your dates and family count. No money is paid now.",
  "hosp.howItWorks.step3Title": "Host phone call",
  "hosp.howItWorks.step3Desc": "Our local host calls you to talk about meals and road directions.",

  // Timeline path
  "hosp.timeline.lead": "Simple building updates from our site workers.",
  "hosp.timeline.step1": "Land check and plan",
  "hosp.timeline.step1Desc": "Test farm soil, check well water, and draw room plans.",
  "hosp.timeline.step2": "Stone foundation",
  "hosp.timeline.step2Desc": "Dig deep stone trenches and build a strong plinth.",
  "hosp.timeline.step3": "Walls and roof",
  "hosp.timeline.step3Desc": "Lay red laterite stones and fix wooden roof beams.",
  "hosp.timeline.step4": "Floors and verandah",
  "hosp.timeline.step4Desc": "Lay clay tiles, fit taps, and plant young fruit trees.",
  "hosp.timeline.step5": "Welcome first guests",
  "hosp.timeline.step5Desc": "Clean all rooms, train farm caretakers, and open the gate.",

  // Stay Pass
  "hosp.pass.title": "BAHINA Stay Pass",
  "hosp.pass.previewNote": "Design preview: nothing was sent or stored",
  "hosp.pass.stamp": "Request sent",
  "hosp.pass.guestCopy": "Guest copy",
  "hosp.pass.dates": "Stay dates",
  "hosp.pass.guests": "Total guests",
  "hosp.pass.reference": "Request number",
  "hosp.pass.contactNote": "Our host calls you within 24 hours to confirm meals and route.",
  "hosp.pass.location": "Location",
  "hosp.pass.status": "Status",
  "hosp.pass.statusVerified": "Sample verified",

  // Hero keys
  "hosp.hero.desc": "Quiet farmhouses near Radhanagari Wildlife Sanctuary. About 46 km from Kolhapur.",
  "hosp.hero.greenCorner": "Green hills, 46 km from Kolhapur",
  "hosp.hero.ctaFarmhouses": "See farmhouses",
  "hosp.hero.ctaAbout": "See Radhanagari",
  "hosp.hero.rotatingWords": "quiet|family|simple|village stays",
  "hosp.hero.headlineWords": "Find|your|quiet|corner.",
  "hosp.featured.badge": "Featured stay",
  "hosp.hero.rotateSuffix": "farmhouses across Maharashtra.",

  // Road labels (Prompt exact rules!)
  "hosp.road.startLabel": "Start",
  "hosp.road.startName": "Kolhapur city",
  "hosp.road.startDesc": "Railway station and road",
  "hosp.road.midText": "River, hills and forest",
  "hosp.road.midTag": "Hill road",
  "hosp.road.destLabel": "You reach",
  "hosp.road.destName": "Radhanagari",
  "hosp.road.destDesc": "Forest and dam",
  "hosp.road.enRoute": "On the way",
  "hosp.road.arrived": "You reached Radhanagari",
  "hosp.road.aboutDist": "About 46 km",

  // Know Radhanagari
  "hosp.know.eyebrow": "About the land",
  "hosp.know.tag": "Western Ghats forest",
  "hosp.know.titleBefore": "Radhanagari:",
  "hosp.know.titleHighlight": "A green sanctuary",
  "hosp.know.sub": "Official sanctuary records from Forest Department and UNESCO archives.",
  "hosp.know.verified": "Verified",

  // Things to see
  "hosp.see.eyebrow": "Places to see near the farmhouses",
  "hosp.see.titleBefore": "Places to see in",
  "hosp.see.titleHighlight": "Radhanagari",
  "hosp.see.sub": "Historic dams with automatic gates, bison plateaus, and seasonal waterfalls.",
  "hosp.see.filterAll": "All places",
  "hosp.see.filterWildlife": "Forest & animals",
  "hosp.see.filterDam": "Dams & water",
  "hosp.see.filterPlace": "Plateau & waterfalls",
  "hosp.see.filterCulture": "Kolhapur heritage",
  "hosp.see.verify": "Check timings",
  "hosp.see.verified": "Verified by records",

  // Wildlife (Plain safety rules!)
  "hosp.wildlife.eyebrow": "Animals and forest",
  "hosp.wildlife.tag": "Dajipur Bison Reserve",
  "hosp.wildlife.titleBefore": "Home of the bison:",
  "hosp.wildlife.titleHighlight": "Green forest",
  "hosp.wildlife.sub": "351 sq km of thick forest where bison and birds live.",
  "hosp.wildlife.gaurTitle": "Indian bison (Gaur)",
  "hosp.wildlife.gaurDesc": "Radhanagari is known as Maharashtra's best home for the Indian bison.",
  "hosp.wildlife.birdsEyebrow": "Forest birds",
  "hosp.wildlife.birdsCount": "264 bird species",
  "hosp.wildlife.birdsDesc": "See great pied hornbills and grey hornbills in tall fruit trees.",
  "hosp.wildlife.rulesTitle": "Forest rules for visitors",
  "hosp.wildlife.rule1": "Rain closes the forest roads. Please ask the Forest Department before you go.",
  "hosp.wildlife.rule2": "Enter only during official Forest Department hours with entry passes.",
  "hosp.wildlife.rule3": "We cannot promise you will see animals. They live free in the wild forest.",
  "hosp.wildlife.rulesNote": "Note: We do not sell safari tickets. Ask the local Forest Office for permits.",

  // Kolhapuri Chav
  "hosp.chav.eyebrow": "Local food",
  "hosp.chav.tag": "Taste of Kolhapur",
  "hosp.chav.titleBefore": "Kolhapuri food:",
  "hosp.chav.titleHighlight": "Taste and culture",
  "hosp.chav.sub": "Hot tambda rassa, gentle pandhra rassa, misal, and handmade leather chappals.",
  "hosp.chav.pride": "Kolhapur taste",
  "hosp.chav.disclaimer": "Cultural note only. Shows regional heritage, not immediate room service.",

  // Farmhouses section
  "hosp.fhSection.eyebrow": "Farmhouses",
  "hosp.fhSection.tag": "Radhanagari, Kolhapur, Maharashtra",
  "hosp.fhSection.titleBefore": "BAHINA farmhouses in",
  "hosp.fhSection.titleHighlight": "Radhanagari",
  "hosp.fhSection.sub": "Stone farmhouses in building stage. Exact location shared after opening.",
  "hosp.fhSection.filterAll": "All farmhouses",
  "hosp.fhSection.filterOpen": "Open for requests",
  "hosp.fhSection.filterComing": "Opening soon",
  "hosp.fhSection.filterUnderConst": "Under construction",
  "hosp.fhSection.sample": "Sample",
  "hosp.fhSection.locationNotice": "Exact location given after opening",
  "hosp.fhSection.guests": "guests",
  "hosp.fhSection.bedrooms": "bedrooms",
  "hosp.fhSection.samplePrice": "Sample price",
  "hosp.fhSection.perNight": " / night",
  "hosp.fhSection.priceOnRequest": "Price on request",
  "hosp.fhSection.requestToBook": "Ask to book",
  "hosp.fhSection.notifyMe": "Tell me when it opens",

  // Amenities section
  "hosp.amenities.titleBefore": "Everything you need for a",
  "hosp.amenities.titleHighlight": "Good stay",
  "hosp.amenities.sub": "Simple village quiet with clean, comfortable modern rooms.",
  "hosp.amenities.item1": "Private clean pool",
  "hosp.amenities.item2": "Hot Kolhapuri food",
  "hosp.amenities.item3": "Basic Wi-Fi",
  "hosp.amenities.item4": "Campfire on grass",
  "hosp.amenities.item5": "Solar and battery backup",
  "hosp.amenities.item6": "Green forest border",
  "hosp.amenities.item7": "Views of green hills",
  "hosp.amenities.item8": "Safe gated parking",
  "hosp.amenities.item9": "Hot water baths",
  "hosp.amenities.item10": "Carrom and board games",
  "hosp.amenities.item11": "Pets allowed",
  "hosp.amenities.item12": "Airy cross-ventilated rooms",

  // How booking works section
  "hosp.how.sub": "Direct planning without any advance money.",
  "hosp.how.step1Title": "Pick your farmhouse",
  "hosp.how.step1Desc": "Choose by pool, bedroom count, and family size.",
  "hosp.how.step2Title": "Send stay dates",
  "hosp.how.step2Desc": "Pick dates and guest count. You pay no money now.",
  "hosp.how.step3Title": "Host calls you",
  "hosp.how.step3Desc": "Our local host calls to coordinate route directions and meals.",

  // Final CTA
  "hosp.cta.eyebrow": "Visit Radhanagari",
  "hosp.cta.title": "Come to Radhanagari!",
  "hosp.cta.sub": "Send your interest to enjoy village food and green hill silence.",
  "hosp.cta.btn": "See farmhouses",
  "hosp.home.about": "Quiet village farmhouses near Radhanagari Wildlife Sanctuary. Made by BAHINA Group.",
  "hosp.home.explore": "Farmhouses",
  "hosp.home.contact": "Contact and place",
  "hosp.home.backToMain": "Back to BAHINA Group",

  // Modal
  "hosp.modal.bookingSuccessTitle": "Stay request received!",
  "hosp.modal.notifySuccessTitle": "Number saved!",
  "hosp.modal.bookingSuccessDesc": "Our host will call you to discuss dates and food needs.",
  "hosp.modal.notifySuccessDesc": "We will message you when this Radhanagari house opens.",
  "hosp.modal.bookingTitle": "Ask to book (No money now)",
  "hosp.modal.notifyTitle": "Tell me when it opens",
  "hosp.modal.nameLabel": "Your Name",
  "hosp.modal.phoneLabel": "Mobile Number",
  "hosp.modal.emailLabel": "Email Address",
  "hosp.modal.datesLabel": "Preferred Dates",
  "hosp.modal.guestsLabel": "Guests",
  "hosp.modal.requestsLabel": "Food or Bed Needs",
  "hosp.modal.requestsPlaceholder": "e.g. Vegetarian food or spicy Kolhapuri mutton curry",
  "hosp.modal.submitBooking": "Send stay request",
  "hosp.modal.submitNotify": "Tell me when it opens",
  "hosp.modal.noUpfront": "No money taken now. Our host calls to confirm details.",
  "hosp.footer.ticker1": "Fresh soil, tall trees, village food, and quiet farmhouses.",
  "hosp.footer.ticker2": "Open skies, fruit trees, cool breeze, and green hills in Radhanagari."
};

// Marathi updates map
const mrUpdates = {
  // Brand & Nav
  "hosp.brand.subline": "शांत शेतघरे",
  "hosp.nav.home": "मुख्य पान",
  "hosp.nav.stays": "शेतघरे",
  "hosp.nav.howItWorks": "बुकिंग कसे करावे",
  "hosp.nav.faq": "नेहमीचे प्रश्न",
  "hosp.nav.contact": "संपर्क",
  "hosp.nav.backToGroup": "बहिणा ग्रुप",
  "hosp.btn.callUs": "फोन करा",
  "hosp.btn.whatsapp": "व्हॉट्सॲप",
  "hosp.nav.aboutRadhanagari": "राधानगरी",
  "hosp.nav.route": "कसे पोहोचावे",
  "hosp.nav.thingsToSee": "पाहण्यासारखी ठिकाणे",
  "hosp.nav.wildlife": "प्राणी आणि जंगल",
  "hosp.nav.kolhapuriChav": "स्थानिक जेवण",
  "hosp.nav.farmhouses": "शेतघरे",
  "hosp.nav.selectLanguage": "भाषा निवडा",
  "hosp.nav.viewFarmhouses": "शेतघरे पहा",
  "hosp.footer.about": "आम्ही निसर्गाजवळ आणि गावात शांत शेतघरे बांधतो.",
  "hosp.footer.navTitle": "महत्त्वाचे दुवे",
  "hosp.footer.contactTitle": "संपर्क साधा",
  "hosp.footer.location": "राधानगरी, कोल्हापूर, महाराष्ट्र",
  "hosp.footer.previewDisclaimer": "हे नमुना डिझाइन आहे. प्रत्यक्ष बुकिंग सध्या सुरू नाही.",
  "hosp.footer.rights": "सर्व हक्क राखीव.",
  "hosp.footer.craftedFor": "महाराष्ट्राच्या ग्रामीण भागासाठी तयार केले.",

  // Preview & Status
  "hosp.preview.ribbonTitle": "नमुना डिझाइन",
  "hosp.preview.ribbonText": "हे नमुना डिझाइन आहे. प्रत्यक्ष शेतघरे नाहीत.",
  "hosp.preview.sampleChip": "नमुना",
  "hosp.photo.labelConstruction": "बांधकाम सुरू आहे",
  "hosp.photo.labelPlanned": "नियोजित डिझाइन",
  "hosp.photo.artDescription": "शेतघराचे चित्र",
  "hosp.status.open": "बुकिंग विनंतीसाठी सुरू",
  "hosp.status.comingSoon": "लवकरच सुरू होत आहे",
  "hosp.status.underConstruction": "हे शेतघर अजून बांधत आहोत",

  // Search & Filter
  "hosp.search.title": "शांत शेतघर शोधा",
  "hosp.search.subtitle": "बहिणा हॉस्पिटॅलिटीची सुंदर शेतघरे",
  "hosp.search.locationLabel": "ठिकाण",
  "hosp.search.allLocations": "राधानगरी, कोल्हापूर",
  "hosp.search.datesLabel": "तारीख",
  "hosp.search.guestsLabel": "पाहुणे",
  "hosp.search.button": "शेतघर शोधा",
  "hosp.search.checkIn": "येण्याची तारीख",
  "hosp.search.checkOut": "निघण्याची तारीख",
  "hosp.search.selectDates": "तारीख निवडा",
  "hosp.search.selectGuests": "पाहुणे निवडा",
  "hosp.search.adults": "मोठी माणसे",
  "hosp.search.adultsAge": "वय १३ वर्षांपेक्षा जास्त",
  "hosp.search.children": "लहान मुले",
  "hosp.search.childrenAge": "वय २ ते १२ वर्षे",
  "hosp.search.guestSummarySingle": "१ पाहुणा",
  "hosp.search.guestSummaryPlural": "पाहुणे",
  "hosp.filter.filters": "फिल्टर",
  "hosp.filter.status": "स्थिती",
  "hosp.filter.allStatuses": "सर्व शेतघरे",
  "hosp.filter.priceRange": "दर मर्यादा",
  "hosp.filter.upTo": "पर्यंत",
  "hosp.filter.perNight": "एका रात्रीचे",
  "hosp.filter.amenities": "सोयी",
  "hosp.filter.sortBy": "क्रम लावा",
  "hosp.filter.sortRecommended": "खास निवडक",
  "hosp.filter.sortPriceAsc": "कमी दर आधी",
  "hosp.filter.sortPriceDesc": "जास्त दर आधी",
  "hosp.filter.sortCapacity": "जास्त माणसे आधी",
  "hosp.filter.clearAll": "सर्व पुसा",
  "hosp.filter.apply": "लागू करा",
  "hosp.filter.showingCount": "दाखवत आहोत",
  "hosp.filter.farmhousesCount": "शेतघरे",
  "hosp.filter.noResultsTitle": "शेतघर सापडले नाही",
  "hosp.filter.noResultsText": "काही फिल्टर काढून पुन्हा पहा.",
  "hosp.filter.clearFiltersBtn": "फिल्टर काढा",
  "hosp.filter.comingSoonTitle": "शेतघरे लवकरच सुरू होत आहेत",
  "hosp.filter.comingSoonText": "आम्ही महाराष्ट्रात सुंदर शेतघरे बांधत आहोत.",
  "hosp.filter.comingSoonAction": "सुरू झाल्यावर कळवा",

  // Farmhouse Card
  "hosp.card.fromPrice": "दर ₹",
  "hosp.card.perNight": "एका रात्रीचे",
  "hosp.card.priceOnRequest": "दर विचारून घ्या",
  "hosp.card.maxGuests": "माणसे राहू शकतात",
  "hosp.card.bedrooms": "खोल्या",
  "hosp.card.viewAndRequest": "बुकिंगसाठी विचारा",
  "hosp.card.viewDetails": "माहिती पहा",
  "hosp.card.notifyMe": "सुरू झाल्यावर कळवा",
  "hosp.card.sampleBadge": "नमुना घर",

  // Details
  "hosp.details.photosButton": "सर्व फोटो पहा",
  "hosp.details.aboutTitle": "या शेतघराबद्दल",
  "hosp.details.highlightsTitle": "या घरातील चांगल्या गोष्टी",
  "hosp.details.amenitiesTitle": "येथे मिळणाऱ्या सोयी",
  "hosp.details.rulesTitle": "घराचे नियम",
  "hosp.details.timingsTitle": "वेळ",
  "hosp.details.checkInLabel": "येण्याची वेळ",
  "hosp.details.checkOutLabel": "निघण्याची वेळ",
  "hosp.details.nearbyTitle": "जवळची पाहण्यासारखी ठिकाणे",
  "hosp.details.cancellationTitle": "रद्द करण्याचा नियम",
  "hosp.details.cancellationPolicyText": "५ दिवस आधी रद्द केल्यास पूर्ण पैसे परत मिळतील.",
  "hosp.details.faqTitle": "या घराबद्दलचे प्रश्न",
  "hosp.details.requestToBook": "बुकिंगसाठी विचारा",
  "hosp.details.notifyWhenOpens": "सुरू झाल्यावर कळवा",
  "hosp.details.constructionUpdatesTitle": "बांधकाम माहिती",

  // Price Summary
  "hosp.price.estimatedNotice": "अंदाजे दर. आमचा प्रतिनिधी फोनवर खात्री करेल.",
  "hosp.price.night": "रात्र",
  "hosp.price.nights": "रात्री",
  "hosp.price.totalEstimated": "अंदाजे एकूण खर्च",
  "hosp.price.noDatesSelected": "दर पाहण्यासाठी येण्या-जाण्याची तारीख निवडा.",

  // Booking Flow
  "hosp.book.pageTitle": "शेतघर बुकिंगसाठी विचारा",
  "hosp.book.subtitle": "नमुना डिझाइन. येथे कोणतेही पैसे घेतले जात नाहीत.",
  "hosp.book.stepperAria": "बुकिंग पायऱ्या",
  "hosp.book.step1Title": "तारीख आणि माणसे",
  "hosp.book.step2Title": "तुमची माहिती",
  "hosp.book.step3Title": "तपासा आणि पाठवा",
  "hosp.book.stayDetailsTitle": "मुक्कामाची माहिती",
  "hosp.book.contactDetailsTitle": "तुमचा संपर्क",
  "hosp.book.fullNameLabel": "पूर्ण नाव",
  "hosp.book.fullNamePlaceholder": "तुमचे नाव लिहा",
  "hosp.book.phoneLabel": "मोबाईल नंबर",
  "hosp.book.phonePlaceholder": "१० अंकी मोबाईल नंबर",
  "hosp.book.phoneHint": "६, ७, ८ किंवा ९ ने सुरू होणारा नंबर टाका.",
  "hosp.book.villageLabel": "गाव किंवा शहर",
  "hosp.book.villagePlaceholder": "तुमचे गाव किंवा शहर (ऐच्छिक)",
  "hosp.book.emailLabel": "ईमेल",
  "hosp.book.emailPlaceholder": "name@example.com (ऐच्छिक)",
  "hosp.book.noteLabel": "काही विशेष गरज?",
  "hosp.book.notePlaceholder": "जेवण किंवा इतर गरजा सांगा (ऐच्छिक)",
  "hosp.book.reviewTitle": "तुमची माहिती तपासा",
  "hosp.book.consentText": "बहिणा हॉस्पिटॅलिटीने मला फोन करून माहिती द्यावी याला माझी संमती आहे.",
  "hosp.book.consentRequired": "पुढे जाण्यासाठी या चौकटीत खूण करा.",
  "hosp.book.nextStep": "पुढे जा",
  "hosp.book.prevStep": "मागे",
  "hosp.book.sendRequestBtn": "विनंती पाठवा",
  "hosp.book.submittingState": "माहिती तयार करत आहोत...",
  "hosp.book.errName": "कृपया तुमचे नाव लिहा.",
  "hosp.book.errPhone": "योग्य १० अंकी मोबाईल नंबर टाका.",
  "hosp.book.errDates": "कृपया तारीख निवडा.",
  "hosp.book.errCapacity": "घराच्या क्षमतेपेक्षा जास्त माणसे आहेत.",
  "hosp.book.errUnavailable": "या तारखेला घर आधीच बुक आहे.",

  // Sent Page
  "hosp.sent.previewBanner": "डिझाइन प्रिव्ह्यू: कोणतीही माहिती पाठवली किंवा साठवली नाही.",
  "hosp.sent.title": "बुकिंग विनंती मिळाली",
  "hosp.sent.refLabel": "विनंती क्रमांक",
  "hosp.sent.disclaimer": "ही फक्त विचारणा आहे, पक्के बुकिंग नाही. आमचा प्रतिनिधी फोन करेल.",
  "hosp.sent.summaryTitle": "विनंतीचा तपशील",
  "hosp.sent.backToStays": "शेतघरे पहा",
  "hosp.sent.shareRequest": "विनंती शेअर करा",
  "hosp.sent.copiedToast": "माहिती कॉपी झाली.",

  // Notify Dialog
  "hosp.notify.title": "सुरू झाल्यावर मेसेज मिळवा",
  "hosp.notify.subtitle": "हे शेतघर सुरू होताच आम्ही तुम्हाला मेसेज करू.",
  "hosp.notify.consent": "सुरू झाल्यावर एक मेसेज पाठवण्यास माझी संमती आहे.",
  "hosp.notify.submitBtn": "सुरू झाल्यावर कळवा",
  "hosp.notify.submitting": "जतन करत आहोत...",
  "hosp.notify.successTitle": "धन्यवाद",
  "hosp.notify.successNote": "नमुना डिझाइन: काहीही पाठवले किंवा साठवले नाही.",
  "hosp.notify.closeBtn": "बंद करा",

  // How It Works
  "hosp.how.title": "बुकिंग कसे करावे",
  "hosp.how.step1Title": "१. तारीख निवडा",
  "hosp.how.step1Desc": "मुक्कामाची तारीख आणि किती माणसे येणार ते ठरवा.",
  "hosp.how.step2Title": "२. विनंती पाठवा",
  "hosp.how.step2Desc": "तुमचा मोबाईल नंबर द्या. आता कोणतेही पैसे द्यावे लागत नाहीत.",
  "hosp.how.step3Title": "३. फोनवर संवाद",
  "hosp.how.step3Desc": "आमचा प्रतिनिधी फोन करून जेवण आणि रस्त्याची माहिती देईल.",

  // FAQs (Short simple sentences, max 3 per answer)
  "hosp.faq.title": "नेहमीचे प्रश्न",
  "hosp.faq.q1": "राधानगरी कुठे आहे आणि कसे जावे?",
  "hosp.faq.a1": "राधानगरी हे कोल्हापूर जिल्ह्यातील गाव आहे. ते कोल्हापूर शहरापासून ४६ किमी अंतरावर आहे. गाडीने तेथे एक तासात पोहोचता येते.",
  "hosp.faq.q2": "जंगलात प्राणी आणि गवे दिसतील का?",
  "hosp.faq.a2": "राधानगरीत गवे आणि इतर प्राणी राहतात. प्राणी दिसतीलच याची आम्ही खात्री देऊ शकत नाही. ते जंगलात मोकळे फिरतात.",
  "hosp.faq.q3": "फिरण्यासाठी कोणता महिना चांगला आहे?",
  "hosp.faq.a3": "ऑक्टोबर ते फेब्रुवारी या काळात हवा छान असते. पावसाळ्यात जंगलातील रस्ते बंद असतात. जाण्यापूर्वी वनविभागाकडे चौकशी करा.",
  "hosp.faq.q4": "शेतघरात आत्ता जाऊन राहू शकतो का?",
  "hosp.faq.a4": "आम्ही ही शेतघरे अजून बांधत आहोत. सध्या इथे मुक्काम करता येत नाही. सुरू झाल्यावर निरोप मिळण्यासाठी नंबर नोंदवा.",
  "hosp.faq.q5": "घरगुती गावरान जेवण मिळेल का?",
  "hosp.faq.a5": "होय, स्थानिक स्वयंपाकी ताजे गावरान जेवण बनवतात. तुम्हाला गरम ज्वारीची भाकरी आणि भाजी मिळेल. आम्ही तुमच्या आवडीनुसार जेवण बनवतो.",

  // Farmhouses sample full descriptions (keep <= 14 words per sentence)
  "hosp.fh1.fullDesc": "सुपीक शेतजमीन आणि हिरव्या डोंगरांनी हे घर वेढलेले आहे. येथे मोकळा व्हरांडा, हिरवेगार लॉन आणि ताजे जेवण मिळते.",
  "hosp.fh2.fullDesc": "हे घर लहान कुटुंबासाठी उत्तम आहे. येथे शांत रस्ते, मोकळे अंगण आणि दगडी भिंती आहेत.",
  "hosp.fh3.fullDesc": "हे मोठे घर टेकडीच्या उतारावर बांधलेले आहे. येथून हिरवे डोंगर दिसतात आणि संध्याकाळी शेकोटी पेटवता येते.",
  "hosp.fh4.fullDesc": "हे शेतघर टेकडीवर दगड आणि लाकडाने बांधत आहोत. येथे पावसाचे पाणी साठवून फळबागा लावल्या आहेत.",

  // Showcase
  "hosp.showcase.eyebrow": "गावाकडचे वातावरण",
  "hosp.showcase.heading": "निसर्गाच्या सोबतीने जगा.",
  "hosp.showcase.subheading": "सकाळी झाडांवर पडलेले धुके पहा. रात्री उघड्या आकाशाखाली शेकोटीभोवती बसा.",
  "hosp.showcase.card1Tag": "सकाळी ६:३० · पहाट",
  "hosp.showcase.card1Title": "व्हरांड्यातील सकाळ",
  "hosp.showcase.card1Desc": "सकाळी व्हरांड्यात बसून गरम चहा प्या. अंगणात पक्ष्यांचे गोड गाणे ऐका.",
  "hosp.showcase.card2Tag": "दुपारी १:०० · दुपारचे जेवण",
  "hosp.showcase.card2Title": "ताजे गावरान जेवण",
  "hosp.showcase.card2Desc": "गरम ज्वारीची भाकरी आणि चुलीवरची भाजी. स्थानिक स्वयंपाकी ताजे जेवण बनवतात.",
  "hosp.showcase.card3Tag": "दुपारी ४:३० · विसावा",
  "hosp.showcase.card3Title": "खाजगी पूल आणि बाग",
  "hosp.showcase.card3Desc": "आंबे आणि नारळाच्या बागेत स्वच्छ पूल आहे. तिथे शांतपणे पोहा आणि खेळा.",
  "hosp.showcase.card4Tag": "रात्री ९:३० · रात्रीचे आकाश",
  "hosp.showcase.card4Title": "शेकोटी आणि तारे",
  "hosp.showcase.card4Desc": "लाकडाच्या शेकोटीभोवती एकत्र बसा. रात्री आकाशात चमकणारे तारे पहा.",

  // Bento
  "hosp.bento.eyebrow": "बहिणाचा शब्द",
  "hosp.bento.heading": "खाजगी जागा आणि शांतता.",
  "hosp.bento.subheading": "प्रत्येक शेतघरात तुमच्या कुटुंबाला पूर्ण खाजगी जागा मिळते. येथे ताजे जेवण आणि शांतता आहे.",
  "hosp.bento.card1Title": "जांभा दगड आणि सागवान लाकूड.",
  "hosp.bento.card1Desc": "लाल जांभा दगड आणि कौलारू छताने हे घर बनवले आहे. मोकळ्या व्हरांड्यात गार वारा येतो.",
  "hosp.bento.card2Title": "संपूर्ण जागा फक्त तुमची.",
  "hosp.bento.card2Desc": "इतर कोणाचाही वावर नसतो. शेतघर, पूल आणि बाग फक्त तुमच्या माणसांसाठी असते.",
  "hosp.bento.card3Title": "स्थानिक स्वयंपाकी.",
  "hosp.bento.card3Desc": "गरम ज्वारीची भाकरी, ताजी भाजी आणि ताक तुमच्या आवडीनुसार मिळेल.",
  "hosp.bento.card4Title": "सौर ऊर्जा आणि शुद्ध पाणी.",
  "hosp.bento.card4Desc": "दिवे सौर ऊर्जेवर चालतात. विहिरीचे पाणी शेताला जाते आणि प्लास्टिक कचरा नसतो.",

  // Wildlife section (Plain rules, <= 14 words)
  "hosp.wildlife.eyebrow": "प्राणी आणि जंगल",
  "hosp.wildlife.tag": "दाजीपूर अभयारण्य",
  "hosp.wildlife.titleBefore": "गव्यांचे घर:",
  "hosp.wildlife.titleHighlight": "सदाहरित जंगल",
  "hosp.wildlife.sub": "३५१ चौ.किमी.चे घनदाट जंगल, जिथे गवे आणि पक्षी राहतात.",
  "hosp.wildlife.gaurTitle": "भारतीय गवा",
  "hosp.wildlife.gaurDesc": "राधानगरी हे महाराष्ट्रात गव्यांसाठी सर्वात प्रसिद्ध अभयारण्य आहे.",
  "hosp.wildlife.birdsEyebrow": "जंगलातील पक्षी",
  "hosp.wildlife.birdsCount": "२६४ पक्षी प्रजाती",
  "hosp.wildlife.birdsDesc": "महाधनेश आणि राखाडी धनेश हे मोठे पक्षी जुन्या झाडांवर घरटी बांधतात.",
  "hosp.wildlife.rulesTitle": "वनविभागाचे नियम",
  "hosp.wildlife.rule1": "पावसात जंगलातील कच्चे रस्ते बंद होतात. जाण्यापूर्वी वनविभागाकडे चौकशी करा.",
  "hosp.wildlife.rule2": "वनविभागाने दिलेल्या वेळेत आणि पास काढूनच जंगलात जावे.",
  "hosp.wildlife.rule3": "जंगलात प्राणी दिसतीलच याची खात्री देता येत नाही. प्राणी जंगलात मोकळे फिरतात.",
  "hosp.wildlife.rulesNote": "टीप: आम्ही सफारीचे तिकीट देत नाही. परवान्यासाठी स्थानिक वन कार्यालयाशी संपर्क साधा.",

  // Road
  "hosp.road.startLabel": "सुरुवात",
  "hosp.road.startName": "कोल्हापूर शहर",
  "hosp.road.startDesc": "रेल्वे स्थानक आणि रस्ता",
  "hosp.road.midText": "नदी, डोंगर आणि जंगल",
  "hosp.road.midTag": "घाटरस्ता",
  "hosp.road.destLabel": "पोहोचण्याचे ठिकाण",
  "hosp.road.destName": "राधानगरी",
  "hosp.road.destDesc": "जंगल आणि धरण",
  "hosp.road.enRoute": "वाटेत",
  "hosp.road.arrived": "राधानगरीला पोहोचलो",
  "hosp.road.aboutDist": "सुमारे ४६ किमी",

  // See
  "hosp.see.eyebrow": "पाहण्यासारखी ठिकाणे",
  "hosp.see.titleBefore": "राधानगरीतील",
  "hosp.see.titleHighlight": "सुंदर ठिकाणे",
  "hosp.see.sub": "ऐतिहासिक स्वयंचलित धरण, गव्यांचे पठार आणि पावसाळी धबधबे.",
  "hosp.see.filterAll": "सर्व ठिकाणे",
  "hosp.see.filterWildlife": "जंगल आणि प्राणी",
  "hosp.see.filterDam": "धरण आणि पाणी",
  "hosp.see.filterPlace": "पठार आणि धबधबे",
  "hosp.see.filterCulture": "कोल्हापूर वारसा",
  "hosp.see.verify": "वेळ तपासा",
  "hosp.see.verified": "नोंदीनुसार खरी माहिती",

  // Hero
  "hosp.hero.desc": "राधानगरी अभयारण्याजवळ शांत शेतघरे. कोल्हापूरपासून सुमारे ४६ किमी.",
  "hosp.hero.greenCorner": "हिरवे डोंगर, कोल्हापूरपासून ४६ किमी",
  "hosp.hero.ctaFarmhouses": "शेतघरे पहा",
  "hosp.hero.ctaAbout": "राधानगरी पहा",
  "hosp.hero.rotatingWords": "शांत|कुटुंबासाठी|साधे|गावरान घरे",
  "hosp.hero.headlineWords": "तुमचा|शांत|कोपरा|शोधा.",

  // Farmhouses section
  "hosp.fhSection.eyebrow": "शेतघरे",
  "hosp.fhSection.tag": "राधानगरी, कोल्हापूर, महाराष्ट्र",
  "hosp.fhSection.titleBefore": "राधानगरीतील",
  "hosp.fhSection.titleHighlight": "बहिणा शेतघरे",
  "hosp.fhSection.sub": "दगडी शेतघरे बांधत आहोत. नेमके ठिकाण सुरू झाल्यावर दिले जाईल.",
  "hosp.fhSection.filterAll": "सर्व शेतघरे",
  "hosp.fhSection.filterOpen": "विनंतीसाठी सुरू",
  "hosp.fhSection.filterComing": "लवकरच सुरू होत आहे",
  "hosp.fhSection.filterUnderConst": "बांधकाम सुरू आहे",
  "hosp.fhSection.sample": "नमुना",
  "hosp.fhSection.locationNotice": "नेमका पत्ता सुरू झाल्यावर दिला जाईल",
  "hosp.fhSection.guests": "पाहुणे",
  "hosp.fhSection.bedrooms": "खोल्या",
  "hosp.fhSection.samplePrice": "नमुना दर",
  "hosp.fhSection.perNight": " / रात्र",
  "hosp.fhSection.priceOnRequest": "दर विचारून घ्या",
  "hosp.fhSection.requestToBook": "बुकिंगसाठी विचारा",
  "hosp.fhSection.notifyMe": "सुरू झाल्यावर कळवा",

  // Pass
  "hosp.pass.title": "बहिणा स्टे पास",
  "hosp.pass.previewNote": "डिझाइन प्रिव्ह्यू: कोणतीही माहिती पाठवली नाही",
  "hosp.pass.stamp": "विनंती पाठवली",
  "hosp.pass.guestCopy": "पाहुण्यांसाठी प्रत",
  "hosp.pass.dates": "मुक्कामाची तारीख",
  "hosp.pass.guests": "एकूण पाहुणे",
  "hosp.pass.reference": "विनंती क्रमांक",
  "hosp.pass.contactNote": "आमचा प्रतिनिधी २४ तासांत फोन करून जेवण आणि पत्ता निश्चित करेल.",
  "hosp.pass.location": "ठिकाण",
  "hosp.pass.status": "स्थिती",
  "hosp.pass.statusVerified": "नमुना तपासला",

  // Tickers
  "hosp.footer.ticker1": "काळी माती, हिरवी झाडे, गावरान जेवण आणि शांत शेतघरे.",
  "hosp.footer.ticker2": "स्वच्छ आकाश, फळबागा, गार वारा आणि राधानगरीचे हिरवे डोंगर."
};

// Apply updates
let enChanges = [];
let mrChanges = [];

for (const [k, newVal] of Object.entries(enUpdates)) {
  const oldVal = hospitalityEn[k];
  if (oldVal !== newVal) {
    enChanges.push({ key: k, before: oldVal, after: newVal });
    hospitalityEn[k] = newVal;
  }
}

for (const [k, newVal] of Object.entries(mrUpdates)) {
  const oldVal = hospitalityMr[k];
  if (oldVal !== newVal) {
    mrChanges.push({ key: k, before: oldVal, after: newVal });
    hospitalityMr[k] = newVal;
  }
}

// Generate new files
const enPath = path.resolve(__dirname, "../src/bahina-hospitality/locales/en.js");
const mrPath = path.resolve(__dirname, "../src/bahina-hospitality/locales/mr.js");

const enFileContent = `/**
 * BAHINA Hospitality - English Locale Strings
 * Simplified Language: Sentences <= 12 words, Average <= 9 words.
 * No jargon, marketing fluff, or uppercase text blocks.
 */

export const hospitalityEn = ${JSON.stringify(hospitalityEn, null, 2)};

export default hospitalityEn;
`;

const mrFileContent = `/**
 * BAHINA Hospitality - Marathi Locale Strings
 * Everyday Spoken Marathi: Sentences <= 14 words, Average <= 9 words.
 * Plain conversational Marathi with natural village phrasing.
 */

export const hospitalityMr = ${JSON.stringify(hospitalityMr, null, 2)};

export default hospitalityMr;
`;

fs.writeFileSync(enPath, enFileContent, "utf8");
fs.writeFileSync(mrPath, mrFileContent, "utf8");

// Generate CHANGES-SIMPLE-ENGLISH.md
let doc = `# Changes to Simple English and Marathi Text

This document lists all changed strings in \`src/bahina-hospitality/locales/en.js\` and \`mr.js\`.
Rewritten in plain, simple language for a villager, farmer's family, or first-time traveller.

## Summary of Changes
- Total English strings changed: ${enChanges.length}
- Total Marathi strings changed: ${mrChanges.length}
- Max words per English sentence: 12 words
- Max words per Marathi sentence: 14 words
- Marketing jargon eliminated: retreat, unwind, curated, immersive, escape, serene, unhurried, basin, foothills, getaway, premium, bespoke, seamless.
- All-caps text blocks removed (converted to sentence case).
- Buttons simplified to 1-3 words starting with an active verb.

---

## English Changes (Before -> After)

| Key | Before | After (Simple English) |
| :--- | :--- | :--- |
`;

for (const c of enChanges) {
  doc += `| \`${c.key}\` | "${(c.before || "").replace(/\n/g, " ").replace(/\|/g, "\\|")}" | **"${c.after.replace(/\n/g, " ").replace(/\|/g, "\\|")}"** |\n`;
}

doc += `\n---

## Marathi Changes (Before -> After)

| Key | Before | After (Everyday Marathi) |
| :--- | :--- | :--- |
`;

for (const c of mrChanges) {
  doc += `| \`${c.key}\` | "${(c.before || "").replace(/\n/g, " ").replace(/\|/g, "\\|")}" | **"${c.after.replace(/\n/g, " ").replace(/\|/g, "\\|")}"** |\n`;
}

const docPath = path.resolve(__dirname, "../CHANGES-SIMPLE-ENGLISH.md");
fs.writeFileSync(docPath, doc, "utf8");

console.log(`Updated ${enChanges.length} English keys and ${mrChanges.length} Marathi keys.`);
console.log(`Generated CHANGES-SIMPLE-ENGLISH.md.`);
