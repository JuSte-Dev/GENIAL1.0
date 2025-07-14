/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#222222',
        'neon-blue': '#0066ff',
        'neon-blue-hover': '#0052cc',
      }
    },
  },
  plugins: [],
};