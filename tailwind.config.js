/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Blue accent (only color in brutalist palette)
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      borderRadius: {
        // Brutalist rounding: 2px for large sections, 4px for small elements
        'brutalist-sm': '2px',
        'brutalist': '4px',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
      },
      spacing: {
        'section': '6rem', // 96px - consistent section spacing
      },
    },
  },
  plugins: [],
};
