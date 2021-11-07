const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       colors: {
          blue: {
            'light': '#a8dadc',
            'darker': '#041b2d',
            'dark': '#1d3557',
            'med': '#457b9d',
            
          },
          'magenta': '#B80E65',
          'semi-white': '#F8F9FA',
          'dark-blurple': '#1c1b4d',
          'red': '#e63946',

       },
       height: {
          '1/2': '50vh',
          '3/4': '75vh',
          '1/4': '25vh'
       },
       screens: {
          
       },
       boxShadow: {
          logo: '4px 4px 4px 1px rgba(0, 0, 0, 0.25)'
       },
       fontFamily: {
         //  "lato": ['Lato']
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
