/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 28px rgba(34, 211, 238, 0.35)",
        "neon-strong": "0 0 52px rgba(34, 211, 238, 0.55)",
      },
      animation: {
        grid: "grid 18s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-80px)" },
        },
      },
    },
  },
  plugins: [],
};
