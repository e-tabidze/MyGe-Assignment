/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "#f2f3f6",
      },
      boxShadow: {
        "upper": "0px 2px 16px rgba(39, 42, 55, 0.13)",
      },
      colors: {
        "main-orange": "#FD4100",
        "main-gray": "#6F7383",
        "secondary-gray": "#8C929B",
        "main-black": "#1B1D25",
        "secondary-black": "#272A37",
      },
    },
  },
  plugins: [],
};
