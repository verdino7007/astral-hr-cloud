/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.05)",
        glassBorder: "rgba(255, 255, 255, 0.1)",
        primary: "#8B5CF6", // Violet
        secondary: "#3B82F6", // Blue
        darkBg: "#0f172a", // Slate 900
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'esoteric-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      }
    },
  },
  plugins: [],
}
