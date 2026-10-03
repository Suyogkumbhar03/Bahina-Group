// =====================================================================
// BAHINA GROUP — CENTRALIZED BRAND CONTENT & ASSETS (STRICT PROFILE FACTS)
// =====================================================================

// Single background image constant for the animated parallax layer
export const BG_IMAGE = "/bg.jpg";

export const BAHINA_CONTENT = {
  brand: {
    name: "BAHINA Group",
    shortName: "BAHINA",
    tagline: "From Soil to Spaces. Enriching Every Life.",
    subline: "One Name. Three Commitments. Endless Impact.",
    email: "info@bahinaa.com",
    website: "www.bahinaa.com",
    websiteUrl: "https://www.bahinaa.com",
    // NOTE: Corporate HQ and founded year to be confirmed in official audit
  },

  nav: {
    links: [
      { name: "About", href: "#about" },
      { name: "Divisions", href: "#divisions" },
      { name: "Vision & Mission", href: "#vision-mission" },
      { name: "Focus Areas", href: "#focus-areas" },
      { name: "Values", href: "#values" },
      { name: "Approach", href: "#approach" },
    ],
    cta: {
      text: "Get in Touch",
      href: "#contact",
    },
  },

  hero: {
    eyebrow: "Group Portfolio",
    headlinePart1: "From Soil",
    headlinePart2: "to Spaces.",
    subline: "Enriching Every Life.",
    description: "One Name. Three Commitments. Endless Impact. A diversified group of companies enriching lives through hospitality, sustainable community impact, and deep technology R&D.",
    primaryCta: {
      text: "Explore Our Companies",
      href: "#divisions",
    },
    secondaryCta: {
      text: "Contact Us",
      href: "#contact",
    },
    scrollHint: "Scroll to explore",
  },

  about: {
    eyebrow: "01 / The Essence",
    heading: "Founded on strong values, entrepreneurial thinking, and a commitment to sustainable growth.",
    words: [
      "BAHINA", "Group", "is", "a", "diversified", "and", "future-oriented",
      "group", "of", "companies", "dedicated", "to", "enriching", "lives.",
      "From", "warm", "hospitality", "and", "empowering", "social", "impact",
      "to", "groundbreaking", "technological", "research,", "we", "build",
      "sustainable", "value-driven", "enterprises", "with", "positive",
      "contributions", "to", "society."
    ],
    quote: "Founded on strong values, entrepreneurial thinking, and a commitment to sustainable growth.",
    // Truthful metrics derived strictly from the company profile:
    // 3 Divisions, 7 Focus Areas, 6 Core Values, 1 Vision
    stats: [
      {
        number: 3,
        suffix: "",
        label: "Operating Divisions",
      },
      {
        number: 7,
        suffix: "",
        label: "Core Focus Areas",
      },
      {
        number: 6,
        suffix: "",
        label: "Core Values",
      },
      {
        number: 1,
        suffix: "",
        label: "Unified Vision",
      },
    ],
  },

  divisions: [
    {
      id: "hospitality",
      number: "01",
      name: "BAHINA Hospitality Pvt Ltd",
      shortName: "Hospitality",
      accent: "#D9A441", // amber
      tagline: "Warmth. Comfort. Memorable Experiences.",
      category: "Hospitality, guest experiences, tourism, lifestyle",
      leadText: "Delivering warmth, comfort, and memorable guest experiences across hospitality, tourism, and lifestyle ventures.",
      bullets: [
        "Curated hospitality ventures offering warmth, comfort, and attentive service.",
        "Experiential tourism and lifestyle concepts that celebrate memorable guest journeys.",
        "Customer-centric, service-oriented enterprises built for sustainable long-term value."
      ],
      link: "#divisions",
    },
    {
      id: "foundation",
      number: "02",
      name: "BAHINA Foundation",
      shortName: "Foundation",
      accent: "#3E9B63", // green
      tagline: "Empowering Lives. Enriching Communities.",
      category: "Social impact, education, empowerment, community welfare",
      leadText: "Driving social impact, educational advancement, and empowerment to uplift communities and foster welfare.",
      bullets: [
        "Community welfare initiatives focused on sustainable and inclusive social impact.",
        "Educational programs and grassroots empowerment designed to elevate lives.",
        "Socially responsible development initiatives committed to positive societal change."
      ],
      link: "#divisions",
    },
    {
      id: "labs",
      number: "03",
      name: "BAHINA Labs Pvt Ltd",
      shortName: "Labs",
      accent: "#4C8DF6", // cool blue
      tagline: "Innovate. Research. Build the Future.",
      category: "AI, automation, agriculture R&D, technology",
      leadText: "Pioneering innovation and research across AI, automation, and agriculture technology to build future-ready solutions.",
      bullets: [
        "Artificial Intelligence and automation solutions engineered for real-world impact.",
        "Agricultural innovation and research & development for forward-looking industries.",
        "Technology development delivering innovative, sustainable, and future-oriented systems."
      ],
      link: "#divisions",
    }
  ],

  visionMission: {
    eyebrow: "02 / Purpose & Pillars",
    vision: {
      badge: "Our Vision",
      statement: "To build a trusted, diversified, and future-oriented group of companies that enrich lives through innovation, hospitality, sustainability, and community impact."
    },
    mission: {
      badge: "Mission Pillars",
      items: [
        {
          num: "01",
          title: "Sustainable Value-Driven Businesses",
          desc: "Building enterprises that generate long-term value through sound economic and environmental sustainability."
        },
        {
          num: "02",
          title: "Innovation & Entrepreneurship",
          desc: "Fostering entrepreneurial ownership and continuous innovation across all business divisions."
        },
        {
          num: "03",
          title: "Customer-Centric & Socially Responsible",
          desc: "Placing genuine customer satisfaction, safety, and social welfare at the heart of our operations."
        },
        {
          num: "04",
          title: "Long-Term Partnerships",
          desc: "Cultivating lasting relationships grounded in mutual trust, transparency, and collaboration."
        },
        {
          num: "05",
          title: "Positive Contribution to Society",
          desc: "Ensuring our group initiatives contribute constructively to community prosperity and progress."
        }
      ]
    }
  },

  focusAreas: [
    {
      id: "hospitality-tourism",
      title: "Hospitality & Tourism",
      desc: "Creating warm guest experiences, lifestyle ventures, and tourism destinations.",
      division: "Hospitality",
      accent: "#D9A441",
    },
    {
      id: "ai-tech",
      title: "AI & Technology",
      desc: "Developing intelligent systems, modern software architectures, and automated workflows.",
      division: "Labs",
      accent: "#4C8DF6",
    },
    {
      id: "agri-innovation",
      title: "Agricultural Innovation",
      desc: "Advancing agriculture-related research, modern agronomy, and sustainable farm practices.",
      division: "Labs",
      accent: "#3E9B63",
    },
    {
      id: "rd",
      title: "Research & Development",
      desc: "Conducting systematic research to pioneer modern, practical technological solutions.",
      division: "Labs",
      accent: "#4C8DF6",
    },
    {
      id: "automation",
      title: "Automation & Smart Systems",
      desc: "Deploying automated processes and smart systems to enhance productivity and precision.",
      division: "Labs",
      accent: "#4C8DF6",
    },
    {
      id: "social-csr",
      title: "Social Development & CSR",
      desc: "Empowering rural and local communities through welfare and educational development.",
      division: "Foundation",
      accent: "#3E9B63",
    },
    {
      id: "infrastructure",
      title: "Infrastructure & Future Ventures",
      desc: "Investing in sustainable facilities, collaborative spaces, and future-ready ventures.",
      division: "Group",
      accent: "#C8C4BD",
    }
  ],

  values: [
    {
      name: "Integrity",
      desc: "Operating with honesty, ethics, and transparency in every relationship and transaction."
    },
    {
      name: "Innovation",
      desc: "Encouraging curiosity and original thinking to solve challenges and build new solutions."
    },
    {
      name: "Sustainability",
      desc: "Committing to responsible, long-term practices that protect our environment and society."
    },
    {
      name: "Collaboration",
      desc: "Working synergistically across divisions, teams, and partners to achieve shared goals."
    },
    {
      name: "Excellence",
      desc: "Pursuing high standards of quality, reliability, and service in all that we undertake."
    },
    {
      name: "Community Impact",
      desc: "Creating tangible, uplifting benefits for the communities and individuals we serve."
    }
  ],

  approach: [
    {
      num: "01",
      title: "Agility",
      desc: "Adapting swiftly to emerging needs, new technologies, and evolving market opportunities."
    },
    {
      num: "02",
      title: "Entrepreneurial Ownership",
      desc: "Empowering teams with autonomy, personal responsibility, and pride in execution."
    },
    {
      num: "03",
      title: "Hands-on Leadership",
      desc: "Engaging directly with ground realities, operations, guests, and community partners."
    },
    {
      num: "04",
      title: "Cross-functional Collaboration",
      desc: "Connecting research, hospitality, and social development into a cohesive group ecosystem."
    },
    {
      num: "05",
      title: "Long-term Value Creation",
      desc: "Focusing on sustainable fundamentals and enduring progress rather than short-term gains."
    }
  ],

  cta: {
    eyebrow: "06 / Inquiries",
    headline: "One Name. Three Commitments. Endless Impact.",
    subline: "Connect with BAHINA Group to explore opportunities across hospitality, community initiatives, and technology.",
    action: "Get in Touch",
    email: "info@bahinaa.com",
    website: "www.bahinaa.com",
  },

  footer: {
    description: "A future-oriented group of companies enriching lives through hospitality, sustainable community impact, and deep technology R&D.",
    quickLinks: [
      { name: "About", href: "#about" },
      { name: "Divisions", href: "#divisions" },
      { name: "Vision & Mission", href: "#vision-mission" },
      { name: "Focus Areas", href: "#focus-areas" },
      { name: "Values", href: "#values" },
      { name: "Approach", href: "#approach" },
    ],
    divisions: [
      { name: "BAHINA Hospitality Pvt Ltd", href: "/hospitality" },
      { name: "BAHINA Foundation", href: "/foundation" },
      { name: "BAHINA Labs Pvt Ltd", href: "/labs" },
    ],
    contact: {
      email: "info@bahinaa.com",
      website: "www.bahinaa.com",
      rights: "© 2026 BAHINA Group. All rights reserved."
    }
  }
};
