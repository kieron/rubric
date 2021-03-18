module.exports = {
  purge: [
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
      },
      transitionProperty: {
        width: "width",
      },
      borderRadius: ["hover", "focus"],
      // screens: {
      //   "2xl": "1600px",
      // },
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
