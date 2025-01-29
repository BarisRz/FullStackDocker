const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#1337d8",
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#1337d8",
        },
      },
    },
  },
  plugins: [],
});
