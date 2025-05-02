/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F3460',      // azul oscuro
        secondary: '#16213E',    // azul más oscuro
        accent: '#E94560',       // rojo rosado
        background: '#F9F9F9',   // fondo gris claro
        muted: '#d3d3d3',        // texto gris
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
