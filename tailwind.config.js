/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
        purple: "#741E88",
        red: "#B50A0F",
        "light-grey": "#dddddd",
        grey:  "#6B6B6B"
      },
      fontFamily: {
				kallisto: 'kallisto'
			}
    },
  },
  plugins: [],
}

