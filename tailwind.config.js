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
        // Option C — Electric Indigo palette
        darkBg: "#09090b",          // zinc-950 warm black
        surface: "#18181b",         // zinc-800 warm card bg
        surfaceBorder: "#27272a",   // zinc-700 border
        primaryBlue: "#4f46e5",     // indigo-600 — fresh, not overused
        secondaryPurple: "#7c3aed", // violet-600
        accentGreen: "#10b981",     // emerald-500
        brightTeal: "#22d3ee",      // cyan-400 — brighter highlights
        accentAmber: "#f59e0b",     // amber-500 — badge/tag pops
        glowIndigo: "#818cf8",      // indigo-400 — glow layer
        glowingMagenta: "#d946ef",  // fuchsia
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'mesh-drift': 'meshDrift 12s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        meshDrift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.98)' },
          '100%': { transform: 'translate(10px, -5px) scale(1.02)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
