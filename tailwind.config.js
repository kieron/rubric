const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/main.js",
  ],
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        orange: {
          DEFAULT: "#ff5a1f",
        },
        purple: {
          DEFAULT: "#7e3af2",
        },
        bluegray: colors.slate,
      },
      transitionProperty: {
        width: "width",
      },
      borderRadius: ["hover", "focus"],
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
      margin: ["hover", "focus"],
      padding: ["hover"],
    },
  },
  darkMode: "class",
};
