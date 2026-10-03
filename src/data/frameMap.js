/**
 * Frame Sequence Story Mapping
 * 
 * Maps page scroll progress and section boundaries to frame progress (0.0 to 1.0).
 * 
 * Storyline Arc:
 * - Frames 1 to ~145 (0.00 - 0.48): Approach to open white door in daytime meadow
 * - Frame ~145-150 (0.48): Camera passes through the doorway portal ("door moment")
 * - Frames 150 to ~250 (0.48 - 0.85): Night meadow, stars, milky way, Earth rising
 * - Frames 250 to 300 (0.85 - 1.00): Earth fully risen and glowing, lone person gazing forward
 * 
 * Section Requirements:
 * (a) Hero and About show the approach to the door
 * (b) Camera passes through the door right as Three Divisions section begins
 * (c) Night field and rising planet play during Divisions, Vision, Focus Areas and Values
 * (d) Planet is fully risen and person is visible by Final CTA
 * (e) Hold first frame for first 4% of scroll, hold last frame for last 4%
 * (f) Section speeds stay within 0.5x to 2.0x of average speed
 */

// Normalized milestone frame progress (0.0 to 1.0)
export const FRAME_MILESTONES = {
  DOOR_PASSAGE: 0.48, // Frame ~145-150 / 300 (camera crosses threshold)
  PLANET_RISEN: 0.94, // Frame ~270-285 / 300 (Earth fully risen & person standing)
  FIRST_FRAME_HOLD_SCROLL: 0.04, // First 4% of page scroll holds frame 0
  LAST_FRAME_HOLD_SCROLL: 0.96,  // Last 4% of page scroll holds last frame
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
    targetFrameRatio: 0.00, // Daylight meadow, looking at door
  },
  {
    id: "about",
    label: "About",
    defaultScrollRatio: 0.12,
    targetFrameRatio: 0.20, // Approaching door along flower path
  },
  {
    id: "divisions",
    label: "Three Divisions",
    defaultScrollRatio: 0.26,
    targetFrameRatio: FRAME_MILESTONES.DOOR_PASSAGE, // 0.48: crosses door right as Divisions begins!
  },
  {
    id: "vision-mission",
    label: "Vision & Mission",
    defaultScrollRatio: 0.56,
    targetFrameRatio: 0.70, // Night field, stars emerging, Earth crest rising
  },
  {
    id: "focus-areas",
    label: "Focus Areas",
    defaultScrollRatio: 0.68,
    targetFrameRatio: 0.79, // Earth rising higher in night sky
  },
  {
    id: "values",
    label: "Values",
    defaultScrollRatio: 0.78,
    targetFrameRatio: 0.86, // Luminous blue Earth ascending
  },
  {
    id: "approach",
    label: "Approach",
    defaultScrollRatio: 0.85,
    targetFrameRatio: 0.90, // Earth almost fully elevated
  },
  {
    id: "contact",
    label: "Final CTA",
    defaultScrollRatio: 0.92,
    targetFrameRatio: FRAME_MILESTONES.PLANET_RISEN, // 0.94 - 0.96: Planet fully risen & person visible
  },
  {
    id: "footer",
    label: "Footer",
    defaultScrollRatio: 1.00,
    targetFrameRatio: 1.00, // Resting final frame
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
  // Clamp progress
  const progress = Math.max(0, Math.min(1, scrollProgress));

  // Hold first frame for the first 4% of scroll
  if (progress <= FRAME_MILESTONES.FIRST_FRAME_HOLD_SCROLL) {
    return 0;
  }

  // Hold last frame for the last 4% of scroll
  if (progress >= FRAME_MILESTONES.LAST_FRAME_HOLD_SCROLL) {
    return 1;
  }

  const milestones = customMilestones && customMilestones.length > 1
    ? customMilestones
    : SECTION_MILESTONES;

  // Remap inner scroll [0.04, 0.96] to effective progression
  // Normalize progress within [firstHold, lastHold]
  const pNorm = (progress - FRAME_MILESTONES.FIRST_FRAME_HOLD_SCROLL) / 
                (FRAME_MILESTONES.LAST_FRAME_HOLD_SCROLL - FRAME_MILESTONES.FIRST_FRAME_HOLD_SCROLL);

  // Find surrounding milestone segment
  let start = milestones[0];
  let end = milestones[milestones.length - 1];

  for (let i = 0; i < milestones.length - 1; i++) {
    const mA = milestones[i];
    const mB = milestones[i + 1];
    const scrollA = mA.scrollRatio ?? mA.defaultScrollRatio;
    const scrollB = mB.scrollRatio ?? mB.defaultScrollRatio;

    if (pNorm >= scrollA && pNorm <= scrollB) {
      start = mA;
      end = mB;
      break;
    }
  }

  const scrollStart = start.scrollRatio ?? start.defaultScrollRatio;
  const scrollEnd = end.scrollRatio ?? end.defaultScrollRatio;
  const frameStart = start.targetFrameRatio;
  const frameEnd = end.targetFrameRatio;

  if (scrollEnd <= scrollStart) {
    return frameStart;
  }

  // Straight-line interpolation
  const segmentT = (pNorm - scrollStart) / (scrollEnd - scrollStart);
  const clampedT = Math.max(0, Math.min(1, segmentT));
  const interpolatedFrameRatio = frameStart + clampedT * (frameEnd - frameStart);

  return Math.max(0, Math.min(1, interpolatedFrameRatio));
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
