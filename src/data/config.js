/**
 * Rural Community & Welcome Video Configuration
 * 
 * - WELCOME_VIDEO_HAS_BURNED_TEXT:
 *     Set to true if welcome.mp4 has burned-in title text in the picture.
 *     Set to false to render real HTML text over the video in the visitor's language.
 */
export const WELCOME_VIDEO_HAS_BURNED_TEXT = true;

export const RURAL_CONFIG = {
  phoneNumber: "", // e.g. "+919822000000" (Set to enable direct "आम्हाला फोन करा" button)
  whatsappNumber: "", // e.g. "919822000000" (Set to enable direct "व्हॉट्सअॅपवर बोला" button)
  welcomeVideo: "/video/welcome.mp4",
  welcomePoster: "/video/welcome-poster.jpg",
  welcomePortraitVideo: "/video/welcome-portrait.mp4",
  welcomePortraitPoster: "/video/welcome-portrait-poster.jpg",
  videoFileSizeMb: 20,
};

export default RURAL_CONFIG;
