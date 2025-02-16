/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For the Pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // For the Components directory
    "./app/**/*.{js,ts,jsx,tsx}", // If using the App Router (Next.js 13+)
    "./src/**/*.{js,ts,jsx,tsx}", // Include the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
