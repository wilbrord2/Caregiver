/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        display: ["Playfair Display"],
      },
      backgroundImage: {
        bgImage: "url('/src/assets/bg-image.svg')",
      },

      colors: {
        btnPrimary: "#292A6B",
        bgPrimaryColor: "#F7F7F7",
        defaultOrange: "#FFB74D",
      },
    },
    fontFamily: {},
  },
  plugins: [],
};
