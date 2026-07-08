/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cia: {
          bg: "#f4f2eb",      // Vintage typewritten paper
          card: "#faf8f2",     // Typed index card paper
          dark: "#0f0f0f",     // Heavy typewriter ink black
          muted: "#4e4e4e",    // Faded carbon ribbon gray
          red: "#9e1b1b",      // Red classified stamp ink
          border: "#1c1c1c",   // Vintage stencil lines
        }
      },
      fontFamily: {
        typewriter: ["'Courier Prime'", "Courier", "monospace"],
        stamp: ["'Special Elite'", "cursive"],
        mono: ["'Courier Prime'", "monospace"],
      },
      boxShadow: {
        // 60s solid block/shadow overlays
        'cia-card': '4px 4px 0px 0px #0f0f0f',
        'cia-card-hover': '8px 8px 0px 0px #0f0f0f',
        'cia-btn': '3px 3px 0px 0px #0f0f0f',
        'cia-btn-hover': '5px 5px 0px 0px #0f0f0f',
        'cia-input': 'inset 2px 2px 0px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
