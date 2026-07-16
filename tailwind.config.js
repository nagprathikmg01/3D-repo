/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0a0f",
        surface: "#111118",
        surfaceBorder: "#1e1e2e",
        primaryBlue: "#3b82f6",
        secondaryPurple: "#7c3aed",
        accentGreen: "#10b981",
        
        // Keep some existing colors for backward compatibility
        brightTeal: "#06b6d4",
        glowingMagenta: "#d946ef",
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

