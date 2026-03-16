/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#b7860b",
        "background-light": "#f8f7f5",
        "background-dark": "#221d10",
        sage: "#3D6B4F",
        rose: "#C0392B",
      },
      fontFamily: {
        display: ["Inter"],
        serif: ["PlayfairDisplay"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
