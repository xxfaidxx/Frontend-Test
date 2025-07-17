module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // pastikan ini memuat semua file React-mu
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
