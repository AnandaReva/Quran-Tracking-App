/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Menggunakan class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
      colors: {
        // Menambahkan warna kustom jika diperlukan
        darkBackground: '#121212',
        darkText: '#e0e0e0',
        lightBackground: '#ffffff',
        lightText: '#000000',
      },
    },
  },
  plugins: [],
}
