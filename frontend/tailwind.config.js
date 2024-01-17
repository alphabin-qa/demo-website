/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      // screens: {
      //   sm: "280px",
      //   md: "800px",
      //   lg: "1280px",
      //   xl: "1700px",
      // },
    },
  },
  plugins: [],
};
