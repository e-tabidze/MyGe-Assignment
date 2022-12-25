/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "upper": "0px 2px 16px rgba(39, 42, 55, 0.13)",
      },
      colors: {
        "main-cyan": "#59D8C9",
        "secondary-cyan": "#F0F9F7",
        "third-cyan": "#CEE8E5",
        "custom-gray": "#f2f3f6",
        "main-green": "#26B753",
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
