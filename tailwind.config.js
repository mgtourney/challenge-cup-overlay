/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
        purple: "#741E88",
        red: "#970004",
        "light-grey": "#dddddd",
        grey:  "#6B6B6B",
        banned: "#ff0000",
        selected: "#d630ff",
        picked: "#00FF08"
      },
      fontFamily: {
				kallisto: 'kallisto'
			}
    },
  },
  safelist: [
    "border-banned",
    "border-picked",
    "border-selected",
  ],
  plugins: [],
}

