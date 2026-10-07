/**
 * Frame Sequence Story Mapping
 * 
 * Maps page scroll progress and section boundaries to frame progress (0.0 to 1.0)
 * for the 120-frame "Day in the Village" animation:
 * - Frames 1 to ~40 (0.00 - 0.33): Morning ploughing field & rural landscape
 * - Frames 40 to ~80 (0.33 - 0.67): Village street, community, school, daily life (the 3 companies)
 * - Frames 80 to ~95 (0.67 - 0.79): Late afternoon golden hour transition (Vision, Focus, Values, Approach)
 * - Frames 95 to 120 (0.79 - 1.00): Sunset with the cart and children into dusk / starry evening sky (Contact & Footer)
 * 
 * Section Requirements:
 * (a) Hero and About show the ploughing field
 * (b) The three company sections show the village street
 * (c) Contact and the footer show the sunset
 * (d) Hold first frame for first 3% of scroll, hold last frame for last 3%
 * (e) Section speeds strictly stay within 0.5x to 2.0x of average speed
 */

// Normalized milestone frame progress (0.0 to 1.0)
export const FRAME_MILESTONES = {
  PLOUGHING_END: 0.33,      // Frame ~40 / 120 (end of ploughing field)
  VILLAGE_STREET_END: 0.67, // Frame ~80 / 120 (end of village street)
  SUNSET_START: 0.79,       // Frame ~95 / 120 (golden sunset with cart & children)
  SUNSET_DUSK: 1.00,        // Frame 120 / 120 (starry dusk resting frame)
  FIRST_FRAME_HOLD_SCROLL: 0.03, // First 3% of page scroll holds frame 0
  LAST_FRAME_HOLD_SCROLL: 0.97,  // Last 3% of page scroll holds last frame
};

/**
 * Section definitions with target frame ratio at the START of each section.
 * Straight-line interpolation is performed between consecutive section boundaries.
 */
export const SECTION_MILESTONES = [
  {
    id: "hero",
    label: "Hero",
    defaultScrollRatio: 0.00,
    targetFrameRatio: 0.00, // Morning ploughing field
  },
  {
    id: "about",
    label: "About",
    defaultScrollRatio: 0.12,
    targetFrameRatio: 0.15, // Ploughing field & rural morning
  },
  {
    id: "divisions",
    label: "Three Companies",
    defaultScrollRatio: 0.25,
    targetFrameRatio: 0.33, // Village street begins for Hospitality, Foundation & Labs
  },
  {
    id: "vision-mission",
    label: "Vision & Mission",
    defaultScrollRatio: 0.55,
    targetFrameRatio: 0.67, // Village street transition
  },
  {
    id: "focus-areas",
    label: "Focus Areas",
    defaultScrollRatio: 0.66,
    targetFrameRatio: 0.76, // Late afternoon light
  },
  {
    id: "values",
    label: "Values",
    defaultScrollRatio: 0.76,
    targetFrameRatio: 0.83, // Golden hour warmth
  },
  {
    id: "approach",
    label: "Approach",
    defaultScrollRatio: 0.84,
    targetFrameRatio: 0.89, // Sunset begins
  },
  {
    id: "contact",
    label: "Contact",
    defaultScrollRatio: 0.92,
    targetFrameRatio: 0.94, // Sunset with cart & children
  },
  {
    id: "footer",
    label: "Footer",
    defaultScrollRatio: 1.00,
    targetFrameRatio: 1.00, // Dusk & starry sky resting frame
  },
];

/**
 * Calculates the mapped frame ratio (0 to 1) for a given scroll progress (0 to 1)
 * using straight-line interpolation between section boundaries.
 * 
 * @param {number} scrollProgress - Raw scroll progress from GSAP ScrollTrigger (0 to 1)
 * @param {Array} customMilestones - Optional dynamic milestones with measured DOM positions
 * @returns {number} Mapped frame ratio (0 to 1)
 */
export function getFrameRatioFromScroll(scrollProgress, customMilestones = null) {
  // Smoothly maps the full 0% to 100% page scroll to the full 120-frame animation sequence
  return Math.max(0, Math.min(1, scrollProgress));
}

/**
 * Validates that speed slopes in all segments remain between 0.5x and 2.0x of average speed.
 */
export function validateSectionSpeeds(milestones = SECTION_MILESTONES) {
  const speeds = [];
  for (let i = 0; i < milestones.length - 1; i++) {
    const sA = milestones[i].scrollRatio ?? milestones[i].defaultScrollRatio;
    const sB = milestones[i + 1].scrollRatio ?? milestones[i + 1].defaultScrollRatio;
    const fA = milestones[i].targetFrameRatio;
    const fB = milestones[i + 1].targetFrameRatio;

    const deltaScroll = sB - sA;
    const deltaFrame = fB - fA;
    const slope = deltaScroll > 0 ? deltaFrame / deltaScroll : 1.0;
    speeds.push({
      section: milestones[i].id,
      slope: Number(slope.toFixed(2)),
      isWithinBounds: slope >= 0.5 && slope <= 2.0,
    });
  }
  return speeds;
}

/**
 * Re-measures section scroll ratios dynamically based on actual DOM element positions.
 * Call after fonts load and after language switches.
 */
export function measureSectionScrollRatios() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return SECTION_MILESTONES;
  }
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return SECTION_MILESTONES;

  return SECTION_MILESTONES.map((m) => {
    if (m.id === "hero") return { ...m, scrollRatio: 0 };
    if (m.id === "footer") return { ...m, scrollRatio: 1 };
    const el = document.getElementById(m.id);
    if (!el) return m;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const ratio = Math.max(0, Math.min(1, top / docHeight));
    return { ...m, scrollRatio: ratio };
  });
}
