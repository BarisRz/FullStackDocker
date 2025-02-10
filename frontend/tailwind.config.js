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
          main: "#2196f3",
          background: "#fafafa",
          accent: "#009deb",
          card: "#e6f4f1",
          text: "#455a64",
          "text-hover": "#263238",
        },
      },
      height: {
        screen: "calc(100vh - 60px)", // 60px is the height of the navbar
      },
    },
  },
  plugins: [],
});
