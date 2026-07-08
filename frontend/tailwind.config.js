/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          bg: "#fdf6ee",
          peach: "#faeae0",
          orange: {
            light: "#ffccb0",
            DEFAULT: "#ff9a62",
            dark: "#e06c2b",
          },
          dark: "#2d2d2d",
          muted: "#666666",
          card: "#ffffff",
        }
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        // Claymorphism shadows (soft spread, soft colors, with white highlights)
        'clay-card': '0 20px 40px -10px rgba(255, 154, 98, 0.15), 0 8px 16px -4px rgba(255, 154, 98, 0.05), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
        'clay-card-hover': '0 30px 50px -10px rgba(255, 154, 98, 0.22), 0 12px 24px -4px rgba(255, 154, 98, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
        'clay-btn': '0 10px 25px -5px rgba(255, 154, 98, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 0 4px 8px rgba(255, 255, 255, 0.4)',
        'clay-btn-hover': '0 15px 30px -5px rgba(255, 154, 98, 0.5), inset 0 -4px 8px rgba(0, 0, 0, 0.15), inset 0 4px 8px rgba(255, 255, 255, 0.5)',
        'clay-btn-secondary': '0 10px 25px -5px rgba(224, 182, 155, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.05), inset 0 4px 8px rgba(255, 255, 255, 0.8)',
        'clay-btn-secondary-hover': '0 15px 30px -5px rgba(224, 182, 155, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.08), inset 0 4px 8px rgba(255, 255, 255, 0.8)',
        'clay-input': 'inset 0 2px 6px rgba(255, 154, 98, 0.05), 0 2px 4px rgba(255, 255, 255, 0.8)',
        'clay-input-focus': '0 0 0 4px rgba(255, 154, 98, 0.2), inset 0 2px 6px rgba(255, 154, 98, 0.05)',
      }
    },
  },
  plugins: [],
}
