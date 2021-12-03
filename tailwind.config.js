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
       backgroundColor: {
         captBar: 'rgba(29, 53, 87, 0.2)',
         arrowBox: 'rgba(196, 196, 196, 0.00001)',
       },
       boxShadow: {
          logo: '4px 4px 4px 1px rgba(0, 0, 0, 0.25)',
          captBar: '0px 5px 4px rgba(0, 0, 0, 0.25)',
          arrowBox: '0px 0px 4px rgba(0, 0, 0, 0.5)'
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
