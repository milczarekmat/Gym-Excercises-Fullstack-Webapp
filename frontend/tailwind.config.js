/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e7d9c3",
        secondary: "#813F3C",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
