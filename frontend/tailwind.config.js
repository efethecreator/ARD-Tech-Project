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
          light: '#A9927D',   // Açık kahverengi (Kart rengi)
          DEFAULT: '#5E503F', // Orta kahverengi
          dark: '#3A2D21',    // Koyu kahverengi
        },
        secondary: {
          light: '#F2F4F3',   // Açık bej
          DEFAULT: '#EDE6DB', // Orta ton bej
          dark: '#776555',    // Koyu bej
        },
        accent: {
          DEFAULT: '#8B5E3C', // Ana vurgu kahvesi
          dark: '#6D4C2E',    // Daha koyu vurgu
        },
        background: {
          light: '#F2F4F3',   // Hafif arka plan
          DEFAULT: '#EDE6DB', // Orta ton arka plan
          dark: '#2A211B',    // Koyu arka plan
        },
        text: {
          DEFAULT: '#4B3A2D', // Ana metin rengi
          muted: '#8C7764',   // Alt başlıklar için yumuşak kahve
          accent: '#2C1C17',  // Vurgu metin
        },
        border: '#D8CABF',     // Yumuşak sınır rengi
        error: '#C0392B',      // Hata mesajları için kırmızı ton
        success: '#27AE60',    // Başarı mesajları için yeşil ton
        neutral: {
          light: '#D4C2AF',   // Açık nötr kahve tonu
          DEFAULT: '#A89078', // Orta nötr kahve
          dark: '#776555',    // Koyu nötr kahve
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Genel font
        serif: ['Georgia', 'serif'],   // Özel fontlar için
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};
