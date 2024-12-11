module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8B5E3C',
          DEFAULT: '#6D4C30',
          dark: '#4B3020',
        },
        secondary: {
          light: '#E6D2C0',
          DEFAULT: '#D3B8A8',
          dark: '#A38274',
        },
      },
    },
  },
  plugins: [],
};
