const defaultTheme = require(`tailwindcss/defaultTheme`);
const colors = require(`tailwindcss/lib/public/colors`);

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin'),
    require('tw-elements/dist/plugin'),
  ],
  theme: {
    screens: {
      xxs: '320px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      ...colors.default,
    },
    extend: {
      fontFamily: {
        sans: ['Bai Jamjuree', 'Inter', ...defaultTheme.fontFamily.sans],
        cursive: ['"Baloo Paaji 2"', 'cursive'],
      },
      width: {},
      height: {},
      minWidth: {},
      maxWidth: {},
      minHeight: {},
      maxHeight: {},
      inset: {},
      fontSize: {},
      backgroundColor: {
        dark: '#0D1B1E',
      },
      textColor: {
        dark: '#0D1B1E',
      },
      borderColor: {
        dark: '#0D1B1E',
      },
      borderWidth: {
        0.5: '0.5px',
        1: '1px',
        1.5: '1.5px',
        2.5: '2.5px',
        3: '3px',
        5: '5px',
      },
      fill: {
        dark: '#0D1B1E',
      },
      stroke: {
        dark: '#0D1B1E',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
      },
      margin: {},
      padding: {},
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(120px, 1fr));',
      },
      divideWidth: {
        1: '1px',
      },
      divideColor: { dark: '#0D1B1E' },
      ringColor: { dark: '#0D1B1E' },
      backdropBlur: {
        '5xl': '100px',
      },
      gradientColorStops: {},
    },
  },
};
