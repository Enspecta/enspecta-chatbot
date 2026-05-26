/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B2545',
        stroke: '#E5E5E1',
        bg: '#FAFAF8',
        'bg-alt': '#F5F5F2',
        muted: '#6B7280',
        brand: {
          blue: '#006AA7',
          'blue-dark': '#005589',
          'blue-light': '#E6F3FA',
          orange: '#E8640C',
          'orange-dark': '#C4510A',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'trust-card': 'trustCard 0.6s ease-out 0.2s both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        trustCard: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
