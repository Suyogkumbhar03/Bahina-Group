/**
 * Rural Community & Visitor Configuration
 * 
 * Phone and WhatsApp buttons are the biggest actions on the screen
 * when numbers are specified here.
 * If empty, they are gracefully omitted to strictly avoid invented numbers.
 */
export const RURAL_CONFIG = {
  phoneNumber: "", // e.g. "+919822000000" (Set to enable direct "आम्हाला फोन करा" button)
  whatsappNumber: "", // e.g. "919822000000" (Set to enable direct "व्हॉट्सअॅपवर बोला" button)
  welcomeVideo: "/video/welcome.mp4",
  welcomePoster: "/video/welcome-poster.jpg",
  videoFileSizeMb: 20,
};

export default RURAL_CONFIG;
