/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21618c',
        secondary: '#ffffff',
        background: '#f9fafb',
        card: '#ffffff',
        sidebar: '#21618c',
        'text-dark': '#000000',
        'text-light': '#ffffff',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
