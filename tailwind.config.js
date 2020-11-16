const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(function ({addBase, config}) {
      addBase({
        'h1': {
          fontSize: config('theme.fontSize.2xl')
        },
        'h2': {
          fontSize: config('theme.fontSize.xl')
        },
        'h3': {
          fontSize: config('theme.fontSize.lg')
        }
      })
    })
  ],
}
