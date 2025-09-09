/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','sans-serif']
      },
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfdffe',
          300: '#93cafa',
          400: '#5baef6',
          500: '#2d8fe9',
          600: '#1971cc',
          700: '#155aa5',
          800: '#174d85',
          900: '#183f69',
          950: '#102945'
        }
      }
    },
  },
  plugins: [],
};
