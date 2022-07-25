
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css,scss,json,md,mdx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
    colors: {
      amber: colors.amber,
      cyan: colors.cyan,
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      sky: colors.sky,
      red: colors.red,
    },
  },
  plugins: [],
};
