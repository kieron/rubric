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
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
    },
  },
  plugins: [],
};
