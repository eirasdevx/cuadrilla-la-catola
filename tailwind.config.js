/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        catola: {
          // MORADO (base)
          50: '#f7f3f7',
          100: '#efe7ef',
          300: '#c9a9cc',
          500: '#6b3a6e', // MORADO PRINCIPAL
          700: '#542b56',
          900: '#3a1d3c',
        },
        dorado: {
          100: '#fdf6e3',
          300: '#ead28a',
          500: '#d4af37', // DORADO PRINCIPAL
          700: '#b8962e',
        },
      },
    },
  },
  plugins: [],
}
