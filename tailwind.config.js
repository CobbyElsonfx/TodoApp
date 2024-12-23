/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include the paths to your component files
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1253AA", // Primary color
          dark: "#05243E",   // Darker version
        },
      },
    },
  },
  plugins: [],
};
