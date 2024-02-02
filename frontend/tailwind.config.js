/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      coolitalic: ["cool italic", "sans-serif"],
      coolregular: ["cool regular", "sans-serif"],
      coolthin: ["cool thin", "sans-serif"],
      coolcompressed: ["cool compressed", "sans-serif"],
      coolcrammed: ["cool crammed", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
