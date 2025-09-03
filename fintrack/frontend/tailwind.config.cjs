/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintrack: {
          background: "#0D1117",
          card: "#161B22",
          primary: "#60A5FA",
          secondary: "#059669",
          warning: "#F59E0B",
          danger: "#EF4444",
          text: {
            primary: "#F9FAFB",
            secondary: "#9CA3AF",
          },
          border: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
