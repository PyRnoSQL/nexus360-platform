/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#00030a', 900: '#010515', 800: '#020a2a', 700: '#030f3f', 600: '#051440' },
        gold: { 500: '#ffc305', 600: '#cc9c04', 700: '#997503' }
      }
    }
  },
  plugins: []
};
