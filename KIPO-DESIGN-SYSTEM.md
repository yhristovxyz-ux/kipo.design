# Kipo Design System

Complete design system documentation for kipo.design - A brutalist design system refined with utilitarian principles.

**Version**: 1.1  
**Last Updated**: November 2024  
**Status**: Active

---

## Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing](#spacing)
6. [Border System](#border-system)
7. [Components](#components)
8. [Utilities](#utilities)
9. [Usage Examples](#usage-examples)
10. [Migration Guide](#migration-guide)

---

## Overview

The Kipo Design System combines **brutalist** structure with **utilitarian** refinements to create a functional, precise, and visually refined interface.

### Key Characteristics

- **Geometric layouts** with strict grid-based design
- **Muted borders** (1px, light gray) instead of harsh black
- **Two-tier border radius** (1px sections, 6px interactive)
- **Paper backgrounds** (off-white #FAFAF8)
- **Electric blue accent** (#0066FF)
- **Semantic color tokens** derived from Tailwind
- **No shadows or gradients**
- **Strong typographic hierarchy**

---

## Design Philosophy

### Brutalist Principles (Structure)

- Geometric alignment and modular layout
- Strong typographic hierarchy
- Grid-based structure
- Functional over decorative
- No shadows or gradients

### Utilitarian Refinements (Aesthetics)

- Muted, subtle borders for softer appearance
- Paper-like backgrounds for reduced eye strain
- Technical precision with monospace labels
- Two-tier radius system for visual hierarchy
- High contrast text for readability
- Semantic color system for consistency

---

## Color System

### Architecture

The color system has three tiers:

1. **Primary Tokens** - Base Tailwind colors
2. **Semantic Tokens** - Purpose-driven colors
3. **Context Tokens** - Usage-specific colors

### Primary Tokens (from Tailwind)

```css
/* Blue scale - Primary/Interactive */
--tw-blue-400: #60a5fa
--tw-blue-500: #3b82f6
--tw-blue-600: #2563eb
--tw-blue-700: #1d4ed8

/* Zinc scale - Neutrals */
--tw-zinc-50: #fafafa
--tw-zinc-100: #f4f4f5
--tw-zinc-200: #e4e4e7
--tw-zinc-300: #d4d4d8
--tw-zinc-400: #a1a1aa
--tw-zinc-500: #71717a
--tw-zinc-600: #52525b
--tw-zinc-700: #3f3f46
--tw-zinc-800: #27272a
--tw-zinc-900: #18181b

/* Feedback colors */
--tw-green-500: #22c55e   /* Success */
--tw-red-500: #ef4444     /* Error */
--tw-yellow-500: #eab308  /* Warning */
--tw-cyan-500: #06b6d4    /* Info */
```

### Semantic Tokens

#### Accent Colors

```css
--color-primary: #0066FF           /* Electric blue */
--color-primary-hover: #0052CC
--color-primary-active: #003D99
```

#### Background Colors

```css
--color-bg-primary: #FAFAF8        /* Off-white paper */
--color-bg-secondary: #f4f4f5      /* Zinc-100 */
--color-bg-tertiary: #F0F0ED       /* Darker paper */
--color-bg-hover: #fafafa          /* Zinc-50 */
--color-bg-active: #e4e4e7         /* Zinc-200 */
```

#### Text Colors

```css
--color-text-primary: #18181b      /* Zinc-900 */
--color-text-secondary: #52525b    /* Zinc-600 */
--color-text-tertiary: #71717a     /* Zinc-500 */
--color-text-inverse: #FFFFFF
--color-text-muted: #a1a1aa        /* Zinc-400 */
```

#### Border Colors

```css
--color-border-primary: #d4d4d8    /* Zinc-300 - Muted */
--color-border-secondary: #e4e4e7  /* Zinc-200 */
--color-border-subtle: #f4f4f5     /* Zinc-100 */
--color-border-strong: #a1a1aa     /* Zinc-400 */
```

### Context Tokens

#### Interactive States

```css
--color-interactive-default: var(--color-primary)
--color-interactive-hover: var(--color-primary-hover)
--color-interactive-active: var(--color-primary-active)
--color-interactive-disabled: var(--tw-zinc-300)
```

#### Feedback Colors

```css
/* Success */
--color-success: #16a34a
--color-success-bg: #dcfce7
--color-success-border: #22c55e

/* Error */
--color-error: #dc2626
--color-error-bg: #fee2e2
--color-error-border: #ef4444

/* Warning */
--color-warning: #ca8a04
--color-warning-bg: #fef3c7
--color-warning-border: #eab308

/* Info */
--color-info: #0891b2
--color-info-bg: #cffafe
--color-info-border: #06b6d4
```

#### Surface Colors

```css
--color-surface-default: var(--color-bg-primary)
--color-surface-elevated: #FFFFFF
--color-surface-sunken: var(--tw-zinc-50)
```

### Tailwind Usage

All tokens are available as Tailwind classes:

```tsx
// Background
<div className="bg-bg-primary">
<div className="bg-bg-secondary">

// Text
<p className="text-text-primary">
<p className="text-text-secondary">

// Borders
<div className="border-border-primary">
<div className="border-border-secondary">

// Interactive
<button className="bg-interactive hover:bg-interactive-hover">

// Feedback
<div className="bg-success-bg border-success-border text-success">
<div className="bg-error-bg border-error-border text-error">
```

---

## Typography

### Font Families

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', Arial, sans-serif
--font-mono: 'SF Mono', 'Roboto Mono', 'Courier New', monospace
```

### Font Sizes

```css
--text-xs: 0.6875rem    /* 11px - technical labels */
--text-sm: 0.8125rem    /* 13px - metadata */
--text-base: 0.9375rem  /* 15px - body */
--text-lg: 1.125rem     /* 18px - subheadings */
--text-xl: 1.5rem       /* 24px - headings */
--text-2xl: 2rem        /* 32px - large headings */
--text-3xl: 2.5rem      /* 40px - hero */
--text-4xl: 3rem        /* 48px */
--text-5xl: 3.5rem      /* 56px */
```

### Line Heights

```css
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.6
```

### Font Weights

```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 48-56px | Bold | Tight |
| H2 | 32-48px | Bold | Tight |
| H3 | 24-40px | Bold | Tight |
| Body Large | 18px | Normal | Relaxed |
| Body | 15px | Normal | Normal |
| Body Small | 13px | Normal | Normal |
| Label | 11px | Medium | Normal |

---

## Spacing

### 8px Base Grid

```css
--space-0: 0
--space-1: 0.5rem    /* 8px */
--space-2: 1rem      /* 16px */
--space-3: 1.5rem    /* 24px */
--space-4: 2rem      /* 32px */
--space-5: 2.5rem    /* 40px */
--space-6: 3rem      /* 48px */
--space-8: 4rem      /* 64px */
--space-10: 5rem     /* 80px */
--space-12: 6rem     /* 96px */
```

### Section Spacing

```css
--space-section: 6rem  /* 96px - consistent vertical spacing */
```

---

## Border System

### Border Width

```css
--border-width: 1px        /* Standard */
--border-width-thick: 2px  /* Emphasis */
```

### Border Radius - Two-Tier System

#### Large Sections (1px)

Used for: Sections, containers, cards, large layout elements

```css
--radius-section: 1px
```

**Tailwind classes:**
- `rounded-section`
- `rounded-brutalist-sm`

**Usage:**
```tsx
<div className="border border-border-primary rounded-section">
  Large section content
</div>
```

#### Interactive Elements (6px)

Used for: Buttons, inputs, badges, chips, small interactive components

```css
--radius-interactive: 6px
```

**Tailwind classes:**
- `rounded-interactive`
- `rounded-brutalist`
- `rounded-md`

**Usage:**
```tsx
<button className="border border-border-primary rounded-interactive">
  Button
</button>
```

### Border Colors

See [Color System](#color-system) for border color tokens.

---

## Components

### Button

**Variants:** primary, secondary, ghost, outline  
**Sizes:** sm, md, lg, xl

```tsx
import { Button } from '@/design-system/components/primitives/Button';

<Button variant="primary" size="md">
  Click Me
</Button>
```

**Styles:**
- Border: 1px solid
- Radius: 6px (interactive)
- Padding: Size-dependent
- Font: Bold, uppercase, tracked

### Card

**Subcomponents:** CardHeader, CardContent, CardFooter, CardTitle, CardDescription

```tsx
import { Card, CardContent, CardTitle } from '@/design-system/components/primitives/Card';

<Card>
  <CardContent>
    <CardTitle>Card Title</CardTitle>
    <p>Card content</p>
  </CardContent>
</Card>
```

**Styles:**
- Border: 1px solid
- Radius: 1px (section)
- Background: Paper
- Padding: Size-dependent

### Input

**States:** default, error, success  
**Sizes:** sm, md, lg

```tsx
import { Input } from '@/design-system/components/primitives/Input';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>
```

**Styles:**
- Border: 1px solid
- Radius: 6px (interactive)
- Height: Size-dependent (h-9, h-11, h-14)
- Focus: 2px ring

### Badge

**Variants:** default, primary, secondary, success, error, warning, info, outline  
**Sizes:** sm, md, lg

```tsx
import { Badge } from '@/design-system/components/primitives/Badge';

<Badge variant="success" size="md">
  Active
</Badge>
```

**Styles:**
- Border: 1px solid
- Radius: 6px (interactive)
- Font: Bold, uppercase, tracked
- Padding: Size-dependent

---

## Utilities

### Container Classes

```css
/* Brutalist container - centered, max-width */
.brutalist-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section wrapper - vertical spacing */
.brutalist-section {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

/* Bordered section */
.brutalist-section-bordered {
  border-left: 1px solid var(--color-border-primary);
  border-right: 1px solid var(--color-border-primary);
}

/* Section with border and radius */
.brutalist-section-bordered-radius {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-section);
}

/* Accent background */
.brutalist-section-accent {
  background-color: var(--color-bg-secondary);
}
```

### Element Classes

```css
/* Grid block - large bordered element */
.brutalist-block {
  padding: 1.5rem 2rem;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-section);
}

/* Small element - interactive */
.brutalist-element {
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-interactive);
}
```

### Button Classes

```css
/* Brutalist button */
.brutalist-button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-interactive);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: all 150ms ease;
}

.brutalist-button:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Primary button */
.brutalist-button-primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
```

### Pattern Classes

```css
/* Hatched background - for technical zones */
.brutalist-hatch {
  background-color: var(--color-bg-tertiary);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(26, 26, 26, 0.04) 10px,
    rgba(26, 26, 26, 0.04) 20px
  );
}
```

---

## Usage Examples

### Page Section

```tsx
<section className="brutalist-section brutalist-section-bordered-radius">
  <div className="brutalist-container">
    <h2 className="text-4xl font-bold text-text-primary mb-6">
      Section Title
    </h2>
    <p className="text-lg text-text-secondary">
      Section content
    </p>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid md:grid-cols-2 gap-6">
  <Card className="brutalist-block">
    <CardContent>
      <CardTitle>Feature 1</CardTitle>
      <p className="text-text-secondary">Description</p>
    </CardContent>
  </Card>
  
  <Card className="brutalist-block">
    <CardContent>
      <CardTitle>Feature 2</CardTitle>
      <p className="text-text-secondary">Description</p>
    </CardContent>
  </Card>
</div>
```

### Form

```tsx
<form className="space-y-4">
  <Input
    label="Name"
    type="text"
    placeholder="Your name"
  />
  
  <Input
    label="Email"
    type="email"
    placeholder="you@example.com"
  />
  
  <Button variant="primary" size="lg" fullWidth>
    Submit
  </Button>
</form>
```

### Footer with Hatching

```tsx
<footer className="brutalist-hatch border-t border-border-primary py-12">
  <div className="brutalist-container">
    <p className="text-text-secondary text-sm">
      © 2024 kipo.design
    </p>
  </div>
</footer>
```

---

## Migration Guide

### From v1.0 (Pure Brutalist)

#### Color Changes

```tsx
// Before
<div className="bg-white text-zinc-900 border-zinc-900">

// After
<div className="bg-bg-primary text-text-primary border-border-primary">
```

#### Border Changes

```tsx
// Before
<div className="border-2 border-zinc-900">

// After
<div className="border border-border-primary">
```

#### Radius Changes

```tsx
// Before
<div className="rounded-brutalist-sm">  // 2px
<button className="rounded-brutalist">  // 4px

// After
<div className="rounded-section">       // 1px
<button className="rounded-interactive"> // 6px
```

### No Breaking Changes

All existing code continues to work. These are additive refinements.

---

## Design Tokens Reference

### Quick Reference Table

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #0066FF | Interactive elements |
| `--color-bg-primary` | #FAFAF8 | Main background |
| `--color-text-primary` | #18181b | Primary text |
| `--color-border-primary` | #d4d4d8 | Borders |
| `--radius-section` | 1px | Large sections |
| `--radius-interactive` | 6px | Buttons, inputs |
| `--space-4` | 2rem (32px) | Standard spacing |
| `--space-6` | 3rem (48px) | Large spacing |

---

## Version History

### v1.1 (Current) - Brutalist + Utilitarian

- Muted borders (light gray instead of black)
- Two-tier border radius (1px/6px)
- Paper backgrounds (#FAFAF8)
- Electric blue accent (#0066FF)
- Semantic color tokens
- Hatching pattern utility

### v1.0 - Pure Brutalist

- Black borders (2px)
- Pure white backgrounds
- Standard blue accent
- 2px/4px border radius

---

## Resources

- **Design System Showcase**: `/design-system` route
- **Component Library**: `src/design-system/components/`
- **Tokens**: `src/index.css`
- **Tailwind Config**: `tailwind.config.js`

---

**Maintained By**: kipo.design team  
**License**: All rights reserved  
**Last Updated**: November 2024
