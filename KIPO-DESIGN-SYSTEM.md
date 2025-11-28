# Kipo Design System

Complete design system documentation for kipo.design - A brutalist design system refined with utilitarian principles.

**Version**: 1.1  
**Last Updated**: November 2024  
**Status**: Active

---

## Table of Contents

1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Layout System](#layout-system)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing](#spacing)
7. [Border System](#border-system)
8. [Icon System](#icon-system)
9. [Components](#components)
10. [Utilities](#utilities)
11. [Usage Examples](#usage-examples)
12. [Migration Guide](#migration-guide)

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

## Layout System

### Containment Rules

The layout system follows strict containment principles to create clear visual boundaries and hierarchy.

#### Core Principles

1. **Border Containment** - All major sections use borders to define boundaries
2. **No Floating Elements** - Avoid decorative elements that float outside containers
3. **Connected Components** - Related elements share borders rather than having gaps
4. **Grid-Based Division** - Use CSS Grid with border divisions for multi-column layouts

#### Section Patterns

**Full-Width Sections**
```tsx
<section className="brutalist-section bg-bg-primary">
  <div className="brutalist-container">
    {/* Content */}
  </div>
</section>
```

**Bordered Container Pattern**
```tsx
<div className="border border-border-primary">
  <div className="grid lg:grid-cols-2">
    <div className="border-r border-border-primary p-8">
      {/* Left content */}
    </div>
    <div className="p-8">
      {/* Right content */}
    </div>
  </div>
</div>
```

**Divided Grid Pattern**
```tsx
<div className="brutalist-grid-divided grid-cols-2 md:grid-cols-4">
  <div className="bg-bg-primary p-8">{/* Item 1 */}</div>
  <div className="bg-bg-primary p-8">{/* Item 2 */}</div>
  <div className="bg-bg-primary p-8">{/* Item 3 */}</div>
  <div className="bg-bg-primary p-8">{/* Item 4 */}</div>
</div>
```

**Vertical Stack with Borders**
```tsx
<div className="border border-border-primary">
  {items.map((item, index) => (
    <div 
      key={index}
      className="p-8 border-b border-border-primary last:border-b-0"
    >
      {/* Item content */}
    </div>
  ))}
</div>
```

#### Layout Anti-Patterns

❌ **Avoid:**
- Floating decorative elements outside containers
- Gaps between related components
- Rounded containers with shadows
- Overlapping elements
- Arbitrary spacing between sections

✅ **Use Instead:**
- Contained elements within borders
- Shared borders between components
- Sharp edges with subtle borders
- Adjacent placement with dividers
- Consistent grid-based spacing

#### Responsive Behavior

- Mobile: Single column, full-width borders
- Tablet: 2-column grids with vertical dividers
- Desktop: Multi-column grids with both vertical and horizontal dividers

#### Examples in Practice

**Services Section**: Grid of cards with top borders only
**Studio Section**: Two-column grid with shared vertical border
**Contact Section**: Centered content with side-by-side form and info
**Stats Section**: Four-column grid with dividers between each stat

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

#### Icon Colors

Icons use the gray scale for a cohesive, professional appearance:

```css
/* Icon fills */
--color-icon-fill-primary: #71717a    /* Zinc-500 */
--color-icon-fill-secondary: #52525b  /* Zinc-600 */

/* Icon strokes */
--color-icon-stroke-primary: #a1a1aa  /* Zinc-400 */
--color-icon-stroke-secondary: #52525b /* Zinc-600 */
```

**Usage Guidelines:**
- Use zinc-500 for primary icon fills
- Use zinc-400 for stroke outlines
- Maintain consistent colors across all icons
- Avoid using accent colors in icons (use gray scale only)

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

### Spacing Guidelines

**Container Padding:**
- Desktop: `px-8` (32px) or `px-12` (48px)
- Mobile: `px-4` (16px) or `px-6` (24px)

**Section Margins:**
- Between sections: `mb-16` (64px) or `mb-20` (80px)
- Within sections: `mb-8` (32px) or `mb-12` (48px)

**Component Spacing:**
- Card padding: `p-6` (24px) or `p-8` (32px)
- Button padding: `px-6 py-3` (24px × 12px)
- Input padding: `px-4 py-3` (16px × 12px)

**Grid Gaps:**
- Large grids: `gap-8` (32px) or `gap-12` (48px)
- Small grids: `gap-4` (16px) or `gap-6` (24px)
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

## Icon System

### Isocons - Isometric Icon Library

The design system uses **Isocons** - a library of isometric 3D icons that provide visual depth while maintaining the brutalist aesthetic.

#### Style Characteristics

1. **Isometric Perspective** - 3D appearance with consistent 45° angles
2. **Monochromatic** - Single color fills with stroke outlines
3. **Geometric** - Clean lines and sharp angles
4. **Scalable** - SVG-based for any size without quality loss

#### Color Palette

All icons use the gray color scheme from the design system:

```css
/* Fill colors */
--icon-fill-primary: #71717a    /* zinc-500 */
--icon-fill-secondary: #52525b  /* zinc-600 */

/* Stroke colors */
--icon-stroke-primary: #a1a1aa  /* zinc-400 */
--icon-stroke-secondary: #52525b /* zinc-600 */
```

#### Standard Sizes

```tsx
// Small - UI elements
<Isocon name="code" size={64} />

// Medium - Cards and features
<Isocon name="palette" size={128} />

// Large - Hero sections and showcases
<Isocon name="layers" size={192} />
```

#### Available Icons

Current icon library includes:

- **messagecircle** - Communication, chat, messaging
- **lightbulb** - Ideas, innovation, creativity
- **layers** - Design systems, structure, organization
- **code** - Web development, programming, technical
- **palette** - UX/UI design, visual design, creativity

#### Adding New Icons

When adding new Isocons:

1. **Source**: Use icons from [isocons.app](https://isocons.app)
2. **Color Conversion**: Replace all blue colors with gray palette
   - `#229EFF` → `#71717a` (fill)
   - `#229EFF` → `#52525b` (stroke)
   - `white` → `#a1a1aa` (stroke on filled backgrounds)
3. **Size**: Maintain original viewBox proportions
4. **Animation**: Icons include subtle glow animation on hover

#### Implementation Example

```tsx
import { Isocon } from '@/design-system/components/primitives/Isocon';

// In a service card
<div className="w-full h-64 mb-6 flex items-center justify-center">
  <Isocon name="code" size={192} />
</div>
```

#### Icon Naming Convention

- Use lowercase names
- Match the original Isocon name when possible
- Use descriptive names for custom icons
- Remove special characters and spaces

#### Animation

Icons include a built-in subtle animation:

```css
@keyframes isocon-glow {
  0%, 100% { 
    filter: brightness(1);
  }
  50% { 
    filter: brightness(1.3) drop-shadow(0 0 2px rgba(113, 113, 122, 0.5));
  }
}
```

- Duration: 8 seconds
- Easing: ease-in-out
- Staggered delays for multiple paths
- Faster on hover (4 seconds)

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

---

## Component Patterns

### Service Card Pattern

Used for displaying services with icons, titles, descriptions, and features.

```tsx
<div className="bg-bg-primary p-8 border-t border-border-primary">
  {/* Icon container */}
  <div className="w-full h-64 mb-6 flex items-center justify-center">
    <Isocon name="code" size={192} />
  </div>
  
  {/* Title */}
  <h3 className="text-xl font-bold text-text-primary mb-3">
    Service Title
  </h3>
  
  {/* Description */}
  <p className="text-sm text-text-secondary mb-4">
    Service description text
  </p>
  
  {/* Features list */}
  <ul className="space-y-2">
    {features.map((feature, idx) => (
      <li key={idx} className="flex items-start text-xs text-text-tertiary">
        <span className="mr-2 mt-1 w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
</div>
```

### Two-Column Split Pattern

Used for content with image or media on one side.

```tsx
<div className="border border-border-primary">
  <div className="grid lg:grid-cols-2">
    {/* Left content */}
    <div className="border-r border-border-primary">
      {items.map((item, index) => (
        <div 
          key={index}
          className="p-8 border-b border-border-primary last:border-b-0 bg-bg-secondary hover:bg-bg-primary"
        >
          {/* Item content */}
        </div>
      ))}
    </div>
    
    {/* Right media */}
    <div className="bg-bg-secondary">
      <div className="aspect-square w-full overflow-hidden">
        <img src={mediaUrl} className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</div>
```

### Stats Grid Pattern

Used for displaying metrics and statistics.

```tsx
<div className="brutalist-grid-divided grid-cols-2 md:grid-cols-4">
  {stats.map((stat, index) => (
    <div key={index} className="text-center bg-bg-primary p-8">
      <div className="text-3xl md:text-4xl font-bold text-text-primary">
        {stat.value}
      </div>
      <div className="text-text-secondary mt-2 text-sm font-bold uppercase tracking-wide">
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

### Contact Form Pattern

Used for forms with side-by-side layout.

```tsx
<div className="grid lg:grid-cols-3 gap-8">
  {/* Form - 2 columns */}
  <div className="lg:col-span-2">
    <Card>
      <CardContent className="p-8">
        <form className="space-y-6">
          {/* Form fields */}
        </form>
      </CardContent>
    </Card>
  </div>
  
  {/* Sidebar - 1 column */}
  <div className="space-y-6">
    <Card>
      <CardContent className="p-8">
        {/* Contact info */}
      </CardContent>
    </Card>
    
    {/* CTA card with stripes */}
    <Card className="bg-text-primary border-text-primary diagonal-stripes overflow-hidden">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-4 text-bg-primary">
          Free Consultation
        </h3>
        <p className="text-zinc-300 mb-6 text-sm">
          Description text
        </p>
        <Button className="w-full">
          Book a Call
        </Button>
      </CardContent>
    </Card>
  </div>
</div>
```

### Hero Section Pattern

Used for main landing sections with centered content.

```tsx
<section className="brutalist-section bg-bg-primary">
  <div className="brutalist-container">
    <div className="text-center max-w-4xl mx-auto">
      {/* Label */}
      <div className="util-label mb-4">001-HERO</div>
      
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
        Main Headline
      </h1>
      
      {/* Description */}
      <p className="text-xl text-text-secondary mb-8">
        Supporting description text
      </p>
      
      {/* CTA buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="primary" size="lg">Primary Action</Button>
        <Button variant="secondary" size="lg">Secondary Action</Button>
      </div>
    </div>
  </div>
</section>
```

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

### Stat

**Purpose:** Display metrics and statistics

```tsx
import { Stat } from '@/design-system/components/primitives/Stat';

<Stat value="100+" label="Projects Completed" />
```

**Styles:**
- Value: 3xl-4xl, bold, monospace
- Label: util-label class
- Center aligned

### SectionHeader

**Purpose:** Consistent section headers with technical labels

```tsx
import { SectionHeader } from '@/design-system/components/primitives/SectionHeader';

<SectionHeader 
  label="001-HERO" 
  title="Welcome" 
  description="Optional description"
  align="center"
/>
```

**Props:**
- label: Technical section label
- title: Section heading
- description: Optional description
- align: 'left' | 'center'

### IconBox

**Purpose:** Icon containers with borders

```tsx
import { IconBox } from '@/design-system/components/primitives/IconBox';

<IconBox icon="Mail" size="md" variant="default" />
```

**Variants:** default, secondary, primary  
**Sizes:** sm (8x8), md (12x12), lg (16x16)

**Styles:**
- Border: 1px solid
- Radius: 6px (interactive)
- Centered icon

### ContactInfo

**Purpose:** Display contact information with icons

```tsx
import { ContactInfo } from '@/design-system/components/primitives/ContactInfo';

<ContactInfo 
  icon="Mail" 
  label="Email" 
  value="hello@kipo.design"
  href="mailto:hello@kipo.design"
/>
```

**Props:**
- icon: Lucide icon name
- label: Contact type
- value: Contact value
- href: Optional link

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

## Quick Reference

### Layout Checklist

When creating new sections:

- ✅ Use border containment (no floating elements)
- ✅ Connect related components with shared borders
- ✅ Use grid-based layouts with border divisions
- ✅ Apply consistent padding (p-8 for cards, p-6 for smaller items)
- ✅ Center headlines with `text-center` and `mx-auto`
- ✅ Use `brutalist-container` for max-width containment

### Color Checklist

- ✅ Use gray scale for icons (zinc-400, zinc-500, zinc-600)
- ✅ Use electric blue (#0066FF) for primary actions only
- ✅ Use paper backgrounds (bg-bg-primary, bg-bg-secondary)
- ✅ Use muted borders (border-border-primary)
- ✅ Maintain high contrast for text (text-text-primary)

### Icon Checklist

- ✅ Use Isocons from isocons.app
- ✅ Convert all colors to gray scale
- ✅ Size: 64px (small), 128px (medium), 192px (large)
- ✅ Include subtle glow animation
- ✅ Use lowercase names without special characters

### Component Checklist

- ✅ Cards: 1px border radius, paper background
- ✅ Buttons: 6px border radius, bold uppercase text
- ✅ Inputs: 6px border radius, consistent height
- ✅ Grids: Use `brutalist-grid-divided` for stats
- ✅ Forms: 2-column layout with sidebar

---

## Resources

- **Design System Showcase**: `/design-system` route
- **Component Library**: `src/design-system/components/`
- **Tokens**: `src/index.css`
- **Tailwind Config**: `tailwind.config.js`
- **Icon Library**: `src/design-system/components/primitives/Isocon/`
- **Isocons Source**: [isocons.app](https://isocons.app)

---

**Maintained By**: kipo.design team  
**License**: All rights reserved  
**Last Updated**: November 2024
