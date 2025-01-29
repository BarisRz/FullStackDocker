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
          background: "#f8f8ff",
          accent: "#009deb",
          card: "#e6f4f1",
        },
      },
      height: {
        screen: "calc(100vh - 60px)", // 60px is the height of the navbar
      },
    },
  },
  plugins: [],
});
