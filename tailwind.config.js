/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        aspekta: ["Aspekta", "Inter Variable", "system-ui", "sans-serif"]
      },
      colors: {
        stackblue: {
          50: '#e6f1ff',
          100: '#cce3ff',
          500: '#0057e4',
          600: '#0046b8',
          700: '#00348a',
          800: '#00225c',
          900: '#00112e',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'slide-in': 'slideIn 0.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
  plugins: [],
}