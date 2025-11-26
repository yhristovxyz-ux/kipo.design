/**
 * @fileoverview Color tokens inspired by Momentic.ai design system
 * @module design-system/tokens/colors
 * 
 * Dark-first color palette with blue primary and neutral grays.
 * All colors follow the Tailwind color scale (50-950).
 */

export const colors = {
  // Primary - Blue (Momentic.ai brand color)
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

  // Neutral - Dark grays (Momentic.ai uses very dark backgrounds)
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

  // Dark theme colors (Momentic.ai primary palette)
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

export type ColorToken = typeof colors;
