/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the official Trafiqo logo.
        brand: {
          blue: '#1E63D6', // primary
          green: '#2BA24A',
          yellow: '#F4B400',
          red: '#E0342A',
        },
        // Status semantics: good/low → green, warning → amber, critical/high → red.
        status: {
          good: '#2BA24A',
          warn: '#F59E0B',
          crit: '#E0342A',
        },
        ink: '#1A1B1F',
        'ink-soft': '#585A62',
        mist: '#F6F6F7',
        line: '#E7E8EC',
        surface: '#F4F5F7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
