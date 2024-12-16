module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C3E50', // Derin ve muted bir mavi (arka plan için)
        },
        secondary: {
          DEFAULT: '#E74C3C', // Canlı bir coral (butonlar ve vurgular için)
        },
        accent: {
          DEFAULT: '#ECF0F1', // Yumuşak gri (form arka planı için)
        },
      },
    },
  },
  plugins: [],
};
