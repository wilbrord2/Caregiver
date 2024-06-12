/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        defaultTextColor: "#CAD0D7",
        defaultGreen: "#214274",
        secondaryGreen: "#00E7DA",
        defaultYellow: "#D1AC2D",
        defaultGray: "#3D404B",
        defaultBlack: "#121212",
        secondGray: "#D9D9D9",
        thirdGray: "#E8ECEC",
      },
      backgroundImage: {
        homeBackImage: "url('/src/assets/backImage.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "dark",
    base: false,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
