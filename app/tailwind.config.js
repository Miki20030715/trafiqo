/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary from the Trafiqo logo; magenta/orange/green as brand accents (per brief).
        brand: {
          blue: '#1E63D6',
          magenta: '#D6206B',
          orange: '#F5821F',
          green: '#2BA24A',
        },
        // Status semantics: good/low → green, warning → amber, critical/high → red.
        status: {
          good: '#1FA86B',
          warn: '#F59E0B',
          crit: '#E0342A',
        },
        ink: '#15171C',
        'ink-soft': '#585A62',
        line: '#E7E8EC',
        mist: '#F6F7F9',
        surface: '#F4F6F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
