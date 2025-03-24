/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xs": "375px",
        xs: "500px",
      },
    },
  },
  darkMode: 'class', // فعال‌سازی حالت تیره با کلاس
  plugins: [],
};