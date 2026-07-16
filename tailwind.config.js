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
        darkBg: "#1a1b20",          // graphite background
        surface: "#1e2026",         // surface panels
        surfaceCard: "#22242d",     // card background
        surfaceBorder: "#2a2c33",   // hairline border
        primaryBlue: "#B5654A",     // desaturated brick/rust accent
        secondaryPurple: "#2e3039", // neutral dark fill
        accentGreen: "#B5654A",     // desaturated brick/rust
        brightTeal: "#B5654A",      // desaturated brick/rust
        accentAmber: "#B5654A",     // desaturated brick/rust
        glowIndigo: "#9c9c94",      // muted text
        glowingMagenta: "#EDEDE8",  // light text
        textPrimary: "#EDEDE8",     // warm off-white text
        textMuted: "#9c9c94",       // warm gray text
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
