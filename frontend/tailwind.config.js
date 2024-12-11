/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5A3A2E', // Açık koyu kahverengi
          DEFAULT: '#3E2A21', // Orta kahverengi
          dark: '#2C1C17', // Daha koyu kahverengi
        },
        secondary: {
          light: '#CAB9A1', // Hafif koyu bej
          DEFAULT: '#A58F7A', // Orta koyu bej
          dark: '#736556', // Daha koyu bej
        },
        accent: '#1F120C', // Çok koyu kahve, vurgu için
        background: '#2A211B', // Çok koyu nötr arka plan
        muted: '#8C7764', // Yumuşak kahverengi, yan metinler için
      },
    },
  },
  plugins: [],
};
