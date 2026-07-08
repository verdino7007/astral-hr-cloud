/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: "#f6f8fb",
          card: "rgba(255, 255, 255, 0.8)",
          pink: {
            light: "#ffe4e6", // rose-100
            DEFAULT: "#fda4af", // rose-300
            dark: "#be123c", // rose-700
          },
          mint: {
            light: "#d1fae5", // emerald-100
            DEFAULT: "#6ee7b7", // emerald-300
            dark: "#047857", // emerald-700
          },
          lavender: {
            light: "#f3e8ff", // purple-100
            DEFAULT: "#d8b4fe", // purple-300
            dark: "#6b21a8", // purple-900
          },
          blue: {
            light: "#dbeafe", // blue-100
            DEFAULT: "#93c5fd", // blue-300
            dark: "#1e3a8a", // blue-900
          },
          peach: {
            light: "#ffedd5", // orange-100
            DEFAULT: "#fdba74", // orange-300
            dark: "#c2410c", // orange-700
          },
        },
        slate: {
          850: "#1e293b",
        }
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'pastel': '0 8px 32px 0 rgba(148, 163, 184, 0.08)',
        'pastel-hover': '0 12px 40px 0 rgba(148, 163, 184, 0.15)',
        'pastel-pink': '0 8px 24px rgba(253, 164, 175, 0.2)',
        'pastel-mint': '0 8px 24px rgba(110, 231, 183, 0.2)',
        'pastel-lavender': '0 8px 24px rgba(216, 180, 254, 0.2)',
      }
    },
  },
  plugins: [],
}
