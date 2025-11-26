/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Electric blue
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
        },
        
        // Background colors
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        'bg-hover': 'var(--color-bg-hover)',
        'bg-active': 'var(--color-bg-active)',
        
        // Text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',
        'text-muted': 'var(--color-text-muted)',
        
        // Border colors
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-strong': 'var(--color-border-strong)',
        
        // Interactive states
        'interactive': {
          DEFAULT: 'var(--color-interactive-default)',
          hover: 'var(--color-interactive-hover)',
          active: 'var(--color-interactive-active)',
          disabled: 'var(--color-interactive-disabled)',
        },
        
        // Feedback colors
        'success': {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
          border: 'var(--color-success-border)',
        },
        'error': {
          DEFAULT: 'var(--color-error)',
          bg: 'var(--color-error-bg)',
          border: 'var(--color-error-border)',
        },
        'warning': {
          DEFAULT: 'var(--color-warning)',
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
        },
        'info': {
          DEFAULT: 'var(--color-info)',
          bg: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
        },
        
        // Surface colors
        'surface': {
          DEFAULT: 'var(--color-surface-default)',
          elevated: 'var(--color-surface-elevated)',
          sunken: 'var(--color-surface-sunken)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      borderRadius: {
        // Two-tier system: 1px for sections, 6px for interactive
        'brutalist-sm': '1px',  // Large sections
        'brutalist': '6px',     // Interactive elements
        'section': '1px',
        'interactive': '6px',
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
