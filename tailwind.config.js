export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // previous palette (kept so nothing breaks)
        night: '#09051D', royal: '#251044', gold: '#FFD700', saffron: '#FF8C32', fest: '#FF4F91', cream: '#FFF3D6',
        // new royal palette
        midnight: '#080D25', imperial: '#39205F', deepviolet: '#6B3FA0',
        champagne: '#F4D58D', warmgold: '#D9A441', ivory: '#FFF5DC'
      },
      fontFamily: {
        display: ['"Yatra One"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        hand: ['Caveat', 'cursive'],
        elegant: ['"Cormorant Garamond"', 'serif']
      }
    }
  },
  plugins: []
}
