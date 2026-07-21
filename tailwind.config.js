/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paperBg: "var(--bg-primary)",
        paperSheet: "var(--bg-surface)",
        paperBorder: "var(--border)",
        inkDark: "var(--text-primary)",
        inkMuted: "var(--text-muted)",
        crimson: "var(--primary)",
        primary: "var(--primary)",
        bright: "var(--primary)",
        text: "var(--text-primary)",
        muted: "var(--text-muted)",
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
