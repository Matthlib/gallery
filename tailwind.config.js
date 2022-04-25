const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        coiny: ["Coiny", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brand-purple': 'var(--clr-purple)',
        'brand-pink': 'var(--clr-pink)',
        'brand-yellow': 'var(--clr-yellow)',
        'brand-blue': 'var(--clr-blue)',
        'brand-green': 'var(--clr-green)',
        'brand-light': 'var(--clr-light)',
        'brand-background': 'var(--clr-background)',
        'blue': '#33d2f4',
        'bluegrey':'#252a2d',
        'purp':'#941bc7'
      },
      animation: {
        'pulse-slow': 'pulse 10s linear infinite'
      }
    }
  },
  plugins: []
}