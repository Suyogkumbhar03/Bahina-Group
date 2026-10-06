/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.14)",
        background: "#070908",
        foreground: "#F3EFEA",
        neutral: {
          950: "#070908",
          900: "#0E1210",
          850: "#131815",
          800: "#1A221E",
          700: "#2B3731",
          500: "#6F7C75",
          400: "#9E9A93",
          300: "#C8C4BD",
          200: "#E3DFD7",
          100: "#F3EFEA",
        },
        division: {
          hospitality: "#D9A441", // amber
          foundation: "#3E9B63",  // green
          labs: "#4C8DF6",        // cool blue
        },
      },
      fontFamily: {
        display: ["Fraunces", "Noto Serif Devanagari", "Georgia", "serif"],
        sans: ["Manrope", "Noto Sans Devanagari", "-apple-system", "sans-serif"],
        body: ["Manrope", "Noto Sans Devanagari", "-apple-system", "sans-serif"],
      },
      keyframes: {
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" }
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "shimmer": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
        "shiny-text": {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
          "100%": { backgroundPosition: "0% center" },
        },
      },
      animation: {
        "marquee": "marquee var(--duration) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "shimmer": "shimmer 8s infinite",
        "star-movement-bottom": "star-movement-bottom 4s linear infinite alternate",
        "star-movement-top": "star-movement-top 4s linear infinite alternate",
        "shiny-text": "shiny-text 5s linear infinite",
        "gradient-flow": "gradient-flow 6s ease infinite",
      },
    },
  },
  plugins: [],
}
