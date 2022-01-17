module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "420px",
      },
      height: {
        "(screen-20)": "calc(100vh - 5rem)",
      },
      maxWidth: { "8xl": "90rem", "9xl": "100rem" },
      colors: {
        "main-bg-color": "var(--main-bg-color)",
        "main-text-color": "var(--main-text-color)",
        fb: "#1877F2",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
