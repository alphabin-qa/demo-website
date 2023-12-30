/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        'sm': '350px',
        'md': '623px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
};