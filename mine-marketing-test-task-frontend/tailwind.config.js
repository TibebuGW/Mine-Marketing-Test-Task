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
      gradientPrimary: '',
      white: '#ffffff',
      grey: '#e1e4f0',
      darkGrey: "#7c7c80",
      black: '#000000'
    },
    textColor: {
      black: 'black',
      white: 'white',
      grey: 'grey',
      blue: 'blue'
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