const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#40c0f0",
        secondary: "#f8ad1a",
        hover: "#01273b",
        dark: "#1C1D21",
        gray: "#979797",
        white: "#ffffff",
        red: "#e77052",
        lightGray: "#b4b4b4",
        lightSeparator: "#eeece9",
        green: "#83C396",
        darkGray: "#4c4c4c",
        darker: "#01273b",
        light: "#eeece9",
      },
      gridTemplateColumns: {
        list: "1fr 2fr",
      },
    },
  },
  plugins: [],
};
