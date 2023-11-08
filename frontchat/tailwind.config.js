/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    spacing: {
      '128': '32rem',
      '60': '2px'
    },
    extend: {
      colors: {
        'lightGray': '#836FFF;',
      }
    },
  },
  plugins: [],
}

