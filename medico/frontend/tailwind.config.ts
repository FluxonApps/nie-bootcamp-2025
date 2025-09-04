import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // <-- must include this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
