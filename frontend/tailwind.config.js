/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        brygada: ["Brygada 1918", "serif"],
        dmsans: ["DM Sans", "sans-serif"],
        protest: ["Protest Riot", "sans-serif"]
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
