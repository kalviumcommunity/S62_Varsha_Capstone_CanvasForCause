/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#333344",
        coral: "#FF7F6B",     
        purple: "#6B4EE6",    
        lavender: "#E9E4FF",  
      },
    },
  },
  plugins: [],
}