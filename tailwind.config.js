/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        surface: '#111111',
        gold: '#D4A017',
        'gold-dim': '#8A6A0F',
        violet: '#1E0D3D',
        'violet-bright': '#3A1A6E',
        green: '#00B359',
        muted: '#555555',
        light: '#CCCCCC',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cycle': 'glowCycle 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        glowCycle: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.5), 0 0 80px rgba(212, 160, 23, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

