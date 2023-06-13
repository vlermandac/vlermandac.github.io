/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'rosewater': '#dc8a78',
        'flamingo': '#dd7878',
        'pink': '#ea76cb',
        'mauve': '#8839ef',
        'red': '#d20f39',
        'maroon': '#e64553',
        'peach': '#fe640b',
        'yellow': '#df8e1d',
        'green': '#40a02b',
        'teal': '#179299',
        'sky': '#04a5e5',
        'sapphire': '#209fb5',
        'blue': '#1e66f5',
        'lavender': '#7287fd',
        'text': '#4c4f69',
        'subtext1': '#5c5f77',
        'subtext0': '#6c6f85',
        'overlay2': '#7c7f93',
        'overlay1': '#8c8fa1',
        'overlay0': '#9ca0b0',
        'surface2': '#acb0be',
        'surface1': '#bcc0cc',
        'surface0': '#ccd0da',
        'base': '#eff1f5',
        'mantle': '#e6e9ef',
        'crust': '#dce0e8',
      }
    },
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      }
    }
  },
  plugins: [
    require('tailwindcss-bg-patterns'),
  ]
}
