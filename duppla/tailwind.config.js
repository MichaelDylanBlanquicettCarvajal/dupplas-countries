/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bogota': "url('/public/bogota.jpg')",
      },
    },
  },
  plugins: [],
}

