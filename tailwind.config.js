/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#1a1b26',
          secondary: '#24283b',
          accent: '#7aa2f7',
          text: '#a9b1d6',
          muted: '#565f89',
        },
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          accent: '#3b82f6',
          text: '#1f2937',
          muted: '#6b7280',
        },
      },
    },
  },
  plugins: [],
};