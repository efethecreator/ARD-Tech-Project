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
          light: '#6E4A3A',   // Açık kahverengi
          DEFAULT: '#4E342E', // Orta kahverengi
          dark: '#3A2521',    // Koyu kahverengi
        },
        secondary: {
          light: '#D4C2AF',   // Açık bej
          DEFAULT: '#A89078', // Orta bej
          dark: '#776555',    // Koyu bej
        },
        accent: {
          DEFAULT: '#8B5E3C', // Ana vurgu kahvesi
          dark: '#6D4C2E',    // Daha koyu vurgu
        },
        background: {
          light: '#F8F6F4',   // Hafif arka plan
          DEFAULT: '#EDE6DB', // Orta ton arka plan
          dark: '#2A211B',    // Koyu arka plan
        },
        text: {
          DEFAULT: '#4B3A2D', // Ana metin rengi
          muted: '#8C7764',   // Yumuşak kahve tonu, alt başlıklar için
          accent: '#2C1C17',  // Vurgu metin
        },
        border: '#E0D5C8',     // Yumuşak sınır rengi
        error: '#C0392B',      // Hata mesajları için kırmızı ton
        success: '#27AE60',    // Başarı mesajları için yeşil ton
      },
    },
  },
  plugins: [],
};
