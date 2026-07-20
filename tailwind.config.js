/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paperBg: "#FCFAF6",
        paperSheet: "#F4F2EE",
        paperBorder: "#E0DDD9",
        inkDark: "#1E1C1A",
        inkMuted: "#6E6C68",
        crimson: "#9E4733",
        // Maintain semantic placeholders for any direct bindings
        primary: "#9E4733",
        bright: "#9E4733",
        text: "#1E1C1A",
        muted: "#6E6C68",
      },
      fontFamily: {
        sans: ['"Outfit"', '"Satoshi"', "sans-serif"],
        display: ['"Fraunces"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        hairline: "0 1px 2px rgba(30,28,26,0.05)",
      },
    },
  },
  plugins: [],
};
