// Import the daisyui plugin
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        vt323: ["'VT323'", 'monospace'],
      },
    },
  },
  plugins: [daisyui],
};
