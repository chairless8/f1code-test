// tailwind.config.js
module.exports = {
  content: ['./src/**/*.vue', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary': '#835d4f',  // Antes era 'coffee'
        'secondary': '#c08272',  // Antes era 'old-rose'
        'tertiary': '#dfa18e',  // Antes era 'melon'
        'quaternary': '#7d533f',  // Antes era 'coffee-2'
        'accent': '#fcd3a5',  // Antes era 'sunset'
      },
      backgroundImage: theme => ({
        'gradient-top': 'linear-gradient(0deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-right': 'linear-gradient(90deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-bottom': 'linear-gradient(180deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-left': 'linear-gradient(270deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-top-right': 'linear-gradient(45deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-bottom-right': 'linear-gradient(135deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-top-left': 'linear-gradient(225deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-bottom-left': 'linear-gradient(315deg, #835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
        'gradient-radial': 'radial-gradient(#835d4f, #c08272, #dfa18e, #7d533f, #fcd3a5)',
      }),
    },
  },
  plugins: [],
};
