# Design System - Momentic.ai Inspired

## Overview

This design system is inspired by [momentic.ai](https://momentic.ai/), featuring a modern, clean aesthetic with smooth animations and professional typography.

---

## 🎨 Design Tokens

### Color Palette

Based on momentic.ai's color scheme:

```typescript
// design-system/tokens/colors.ts

export const colors = {
  // Primary - Blue tones (momentic.ai brand color)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Neutral - Dark grays (momentic.ai uses very dark backgrounds)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Dark theme colors (momentic.ai primary palette)
  dark: {
    bg: '#0a0a0a',        // Main background
    surface: '#111111',    // Card/surface background
    border: '#1f1f1f',     // Border color
    hover: '#1a1a1a',      // Hover state
  },

  // Accent colors
  accent: {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  },

  // Semantic colors
  success: {
    light: '#d1fae5',
    DEFAULT: '#10b981',
    dark: '#047857',
  },
  
  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },
  
  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },
  
  info: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#1d4ed8',
  },
} as const;
```

### Typography

```typescript
// design-system/tokens/typography.ts

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],           // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;
```

### Spacing

```typescript
// design-system/tokens/spacing.ts

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;
```

### Border Radius

```typescript
// design-system/tokens/radius.ts

export const radius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
} as const;
```

### Shadows

```typescript
// design-system/tokens/shadows.ts

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
  
  // Glow effects (momentic.ai style)
  glow: {
    sm: '0 0 10px rgb(59 130 246 / 0.3)',
    DEFAULT: '0 0 20px rgb(59 130 246 / 0.4)',
    lg: '0 0 30px rgb(59 130 246 / 0.5)',
  },
} as const;
```

### Animations

```typescript
// design-system/tokens/animations.ts

export const animations = {
  duration: {
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    slideUp: {
      '0%': { transform: 'translateY(10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },
  },
} as const;
```

---

## 🧩 Component Patterns

### Button Variants

Based on momentic.ai button styles:

```typescript
// design-system/components/Button/variants.ts

import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary - Blue gradient (momentic.ai CTA style)
        primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-lg hover:shadow-xl',
        
        // Secondary - Outlined
        secondary: 'border-2 border-gray-700 text-gray-100 hover:bg-gray-800 hover:border-gray-600',
        
        // Ghost - Transparent
        ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white',
        
        // Danger
        danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
        
        // Link
        link: 'text-primary-500 hover:text-primary-400 underline-offset-4 hover:underline',
      },
      
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg',
        md: 'h-11 px-5 text-base rounded-xl',
        lg: 'h-13 px-7 text-lg rounded-xl',
        xl: 'h-16 px-10 text-xl rounded-2xl',
      },
      
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### Card Styles

```typescript
// design-system/components/Card/variants.ts

export const cardVariants = cva(
  'rounded-2xl transition-all duration-200',
  {
    variants: {
      variant: {
        // Default - Dark surface
        default: 'bg-dark-surface border border-dark-border',
        
        // Elevated - With shadow
        elevated: 'bg-dark-surface border border-dark-border shadow-xl',
        
        // Outlined
        outlined: 'border-2 border-gray-700',
        
        // Gradient (momentic.ai feature cards)
        gradient: 'bg-gradient-to-br from-dark-surface to-gray-900 border border-dark-border',
      },
      
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      
      hover: {
        true: 'hover:border-gray-600 hover:shadow-2xl cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);
```

---

## 🎭 Layout Patterns

### Container

```typescript
// Momentic.ai uses centered containers with max-width
export const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1400px]',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);
```

### Section Spacing

```typescript
// Consistent section spacing (momentic.ai pattern)
export const sectionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        sm: 'py-12',
        md: 'py-16 md:py-24',
        lg: 'py-20 md:py-32',
        xl: 'py-24 md:py-40',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

### Mobile-First Approach

```tsx
// Example: Responsive grid (momentic.ai pattern)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Example: Responsive text
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
  Heading
</h1>

// Example: Responsive padding
<section className="px-4 md:px-8 lg:px-12">
  {/* Content */}
</section>
```

---

## ✨ Special Effects

### Gradient Text (Momentic.ai Hero Style)

```tsx
<h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
  Ship fast with AI testing
</h1>
```

### Glow Effects

```tsx
// Button with glow
<button className="bg-primary-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
  Get Started
</button>

// Card with subtle glow on hover
<div className="hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
  {/* Card content */}
</div>
```

### Backdrop Blur

```tsx
// Glassmorphism effect (momentic.ai navigation)
<nav className="bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border">
  {/* Navigation */}
</nav>
```

---

## 🎬 Animations

### Fade In on Scroll

```tsx
// Using Tailwind classes
<div className="opacity-0 animate-fadeIn">
  {/* Content */}
</div>

// With delay
<div className="opacity-0 animate-fadeIn animation-delay-200">
  {/* Content */}
</div>
```

### Hover Animations

```tsx
// Scale on hover
<div className="transition-transform hover:scale-105">
  {/* Content */}
</div>

// Lift on hover (momentic.ai cards)
<div className="transition-all hover:-translate-y-1 hover:shadow-2xl">
  {/* Card */}
</div>
```

### Loading States

```tsx
// Skeleton loader
<div className="animate-pulse bg-gray-800 rounded-lg h-20" />

// Shimmer effect
<div className="relative overflow-hidden bg-gray-800">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-shimmer" />
</div>
```

---

## 🖼️ Image Handling

### Optimized Images

```tsx
// Lazy loading with blur placeholder
<img
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  className="w-full h-auto rounded-2xl"
/>

// With aspect ratio
<div className="aspect-video rounded-2xl overflow-hidden">
  <img src="/image.jpg" alt="Description" className="w-full h-full object-cover" />
</div>
```

---

## 📐 Grid Layouts

### Feature Grid (Momentic.ai Style)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map(feature => (
    <div key={feature.id} className="bg-dark-surface rounded-2xl p-8 border border-dark-border hover:border-gray-600 transition-colors">
      <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </div>
  ))}
</div>
```

### Bento Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="md:col-span-2 lg:row-span-2">
    {/* Large feature */}
  </div>
  <div>
    {/* Small feature */}
  </div>
  <div>
    {/* Small feature */}
  </div>
  <div className="md:col-span-2">
    {/* Wide feature */}
  </div>
</div>
```

---

## 🎨 Dark Theme (Default)

Momentic.ai uses a dark theme by default. Our design system follows this pattern:

```typescript
// Global styles
body {
  background-color: #0a0a0a;
  color: #ffffff;
}

// Text colors
.text-primary: #ffffff
.text-secondary: #a1a1aa
.text-muted: #71717a

// Backgrounds
.bg-primary: #0a0a0a
.bg-surface: #111111
.bg-elevated: #1a1a1a
```

---

## 📦 Component Library Structure

```
design-system/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── shadows.ts
│   ├── animations.ts
│   └── index.ts
├── components/
│   ├── primitives/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── Avatar/
│   ├── patterns/
│   │   ├── Modal/
│   │   ├── Dropdown/
│   │   ├── Tabs/
│   │   └── Accordion/
│   └── index.ts
├── utils/
│   ├── cn.ts (classnames utility)
│   └── index.ts
└── theme.ts
```

---

## 🚀 Implementation Checklist

- [ ] Install Tailwind CSS 4
- [ ] Configure design tokens
- [ ] Create base components
- [ ] Implement animations
- [ ] Add responsive utilities
- [ ] Create component variants
- [ ] Add dark theme support
- [ ] Implement accessibility features
- [ ] Create documentation
- [ ] Add Storybook (optional)

---

## 📚 Resources

- [Momentic.ai](https://momentic.ai/) - Design inspiration
- [Tailwind CSS v4](https://tailwindcss.com/) - Framework
- [Class Variance Authority](https://cva.style/) - Variant management
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives

---

**Last Updated:** 2024-11-24  
**Version:** 1.0  
**Status:** Active
