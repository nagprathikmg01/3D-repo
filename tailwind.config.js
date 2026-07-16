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
        darkBg: "#04080f",          // deep space black
        surface: "#080f1a",         // dark navy surface
        surfaceCard: "#0d1520",     // card background
        surfaceBorder: "#1a2535",   // navy border
        primaryBlue: "#0ea5e9",     // sky blue primary
        secondaryPurple: "#0d9488", // deep teal secondary
        accentGreen: "#0ea5e9",     // primary brand sky blue
        brightTeal: "#0d9488",      // deep teal
        accentAmber: "#f59e0b",     // amber gold accent
        glowIndigo: "#38bdf8",      // light sky glow
        glowingMagenta: "#fbbf24",  // bright gold
        textPrimary: "#f0f9ff",
        textMuted: "#64748b",
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
