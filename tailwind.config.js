/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif', 'Montserrat'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      colors: {
        'custom-purple-button': '#592bb9',
        'custom-purple-container': '#7864B2',
        'custom-grey': '#718096',
      }
    },
  },
  plugins: [],
};