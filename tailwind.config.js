/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          'darkest': '#063133',
          'dark': '#185154',
          'medium-dark': '#397C80',
          DEFAULT: '#6AA8AB',
          'medium-light': '#6AA8AB',
          'light': '#A5D1D4',
          'lightest': '#D9FDFF',
        },
      },
      height: {
        '88': '22rem',
        '96': '24rem',
        '108': '26rem',
        '120': '28rem',
        '128': '32rem',
      },
      width: {
        '88': '22rem',
        '96': '24rem',
        '108': '26rem',
        '120': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

