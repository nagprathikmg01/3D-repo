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
        // Electric Blue / Purple / Cyan palette
        darkBg: "#020805",          // deep space black
        surface: "#060f08",         // dark navy surface
        surfaceCard: "#0a1a0d",     // card background
        surfaceBorder: "#1a3320",   // navy border
        primaryBlue: "#10b981",     // blue-500 primary
        secondaryPurple: "#d4a017", // violet-600
        accentGreen: "#10b981",     // emerald-500
        brightTeal: "#f59e0b",      // cyan-500 accent
        accentAmber: "#f59e0b",     // amber-500 — badge/tag pops
        glowIndigo: "#34d399",      // blue-400 — glow layer
        glowingMagenta: "#fbbf24",  // fuchsia
        textPrimary: "#f0fdf4",
        textMuted: "#6b7280",
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
