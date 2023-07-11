/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      primaryFont: ['Yanone Kaffeesatz', 'cursive']
    },
    colors: {
      lightPrimary: '#2c5ec9',
      darkPrimary: '#02287a',
      lightSecondary: '#5128b0',
      darkSecondary: '#30107a',
      white: '#ffffff',
      grey: '#e1e4f0',
      darkGrey: "#7c7c80",
      black: '#000000',
      red: '#c23a4e',
      green: '#2b9447'
    },
    textColor: {
      black: 'black',
      white: 'white',
      grey: 'grey',
      blue: 'blue',
      red: 'red',
    },
    gradientColorStops: {
      'blue-purple': {
        '0': '#3490dc',
        '50': '#6574cd',
        '100': '#8b5cf6',
      },
    },
    extend: {},
  },
  plugins: [],
}
