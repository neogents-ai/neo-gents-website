/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#161b22',
        surface: '#1e232c',
        gold: '#D4A017',
        'gold-dim': '#8A6A0F',
        violet: '#0f172a',
        'violet-bright': '#1e293b',
        green: '#00B359',
        muted: '#6B7280',
        light: '#E2E2E2',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cycle': 'glowCycle 3s ease-in-out infinite',
        'glow-green': 'glowGreen 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'hud-flicker': 'hudFlicker 6s ease-in-out infinite',
        'particle-drift': 'particleDrift 12s ease-in-out infinite',
        'grid-scroll': 'gridScroll 10s linear infinite',
      },
      keyframes: {
        glowCycle: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.5), 0 0 80px rgba(212, 160, 23, 0.2)' },
        },
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,179,89,0.25)' },
          '50%': { boxShadow: '0 0 50px rgba(0,179,89,0.6), 0 0 100px rgba(0,179,89,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        hudFlicker: {
          '0%, 88%, 100%': { opacity: '1' },
          '92%': { opacity: '0.8' },
          '95%': { opacity: '1' },
          '97%': { opacity: '0.85' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-28px) translateX(14px)' },
          '66%': { transform: 'translateY(-12px) translateX(-8px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 60px' },
        },
      },
    },
  },
  plugins: [],
}

