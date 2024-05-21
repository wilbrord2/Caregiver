/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgImage: "url('/src/assets/bg-image.svg')",
      },

      colors: { 
        btnPrimary: "#3C8CDE",
        bgPrimaryColor:"#A6A6DE"
    },
    },
    fontFamily: {

    }
  },
  plugins: [],
};
