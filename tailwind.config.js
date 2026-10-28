/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yt: {
          dark: '#0f0f0f',
          light: '#ffffff',
          red: '#ff0000',
          hover: '#272727',
          card: '#1e1e1e',
          textMuted: '#aaaaaa',
          border: '#303030'
        }
      }
    },
  },
  plugins: [],
};
