# Brutalist Design System Documentation

## Overview

This project uses a brutalist design system inspired by Momentic.ai, featuring geometric layouts, bold typography, and a strict zinc neutral palette with blue accents.

## Design Principles

### 1. **Geometric & Modular**
- Strict grid-based layouts
- Architectural spacing (multiples of 4px/8px)
- Clean, rectangular shapes

### 2. **Bold Typography**
- All headings use `font-bold`
- Uppercase text with `tracking-wide` for labels
- Clear hierarchy with size variations

### 3. **No Decorative Elements**
- No shadows (`shadow-*` classes forbidden)
- No gradients (`gradient-*` classes forbidden)
- No rounded corners except brutalist variants

### 4. **Minimal Color Palette**
- **Neutral**: Zinc palette (zinc-50 to zinc-900)
- **Accent**: Primary blue (#3b82f6)
- **Background**: White or zinc-50
- **Text**: zinc-900 (headings), zinc-600 (body)

### 5. **Brutalist Rounding**
- **Large sections**: `rounded-brutalist-sm` (2px)
- **Small elements**: `rounded-brutalist` (4px)
- **Never use**: rounded-xl, rounded-2xl, rounded-full

### 6. **Strong Borders**
- Always use `border-2` (2px borders)
- Border color: `border-zinc-900`
- Grid gaps: `gap-px` with `bg-zinc-900` for 1px dividers

## Component Library

### Primitives

#### Button
```tsx
import { Button } from '@/design-system';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

**Variants:**
- `primary` - Blue fill, white text
- `secondary` - White fill, black border
- `ghost` - Transparent, no border
- `outline` - Zinc border

**Sizes:** `sm`, `md`, `lg`, `xl`

#### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

#### Input
```tsx
import { Input } from '@/design-system';

<Input 
  type="text" 
  placeholder="Enter text"
/>
```

#### Badge
```tsx
import { Badge } from '@/design-system';

<Badge variant="secondary">
  Label
</Badge>
```

**Variants:** `default`, `primary`, `secondary`

#### Avatar
```tsx
import { Avatar } from '@/design-system';

<Avatar 
  src="/path/to/image.jpg"
  alt="User Name"
  size="md"
/>
```

**Sizes:** `sm`, `md`, `lg`

#### Typography
```tsx
import { Heading, Text } from '@/design-system';

<Heading level="h2">Section Title</Heading>
<Text size="lg">Body text content</Text>
```

### Layout Components

#### Container
```tsx
import { Container } from '@/design-system';

<Container>
  {/* Max-width content */}
</Container>

<Container fluid>
  {/* Full-width content */}
</Container>
```

#### Section
```tsx
import { Section } from '@/design-system';

<Section bordered variant="white">
  {/* Section content */}
</Section>
```

**Variants:** `white`, `zinc`

## Utility Classes

### Brutalist Utilities (defined in index.css)

```css
/* Container */
.brutalist-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section */
.brutalist-section {
  padding: 4rem 0;
}

/* Block */
.brutalist-block {
  border: 2px solid #18181b;
  padding: 2rem;
  background: white;
}

/* Grid */
.brutalist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## Color Tokens

### Zinc Palette
- `zinc-50` - Lightest background
- `zinc-100` - Light background
- `zinc-200` - Subtle borders
- `zinc-300` - Borders
- `zinc-400` - Disabled text
- `zinc-500` - Muted text
- `zinc-600` - Body text
- `zinc-700` - Emphasis
- `zinc-800` - Strong emphasis
- `zinc-900` - Headings, borders

### Primary (Blue)
- `primary` - #3b82f6
- `primary-hover` - #2563eb

## Usage Guidelines

### ✅ DO

```tsx
// Use design system components
import { Button, Card, Badge } from '@/design-system';

// Use brutalist rounding
<div className="rounded-brutalist border-2 border-zinc-900">

// Use zinc colors
<p className="text-zinc-600">

// Use bold typography
<h2 className="font-bold text-zinc-900">

// Use 2px borders
<div className="border-2 border-zinc-900">
```

### ❌ DON'T

```tsx
// Don't use gray colors
<p className="text-gray-600"> // Use zinc-600 instead

// Don't use shadows
<div className="shadow-lg"> // Remove shadows

// Don't use gradients
<div className="bg-gradient-to-r"> // Use solid colors

// Don't use rounded-xl/2xl/full
<div className="rounded-xl"> // Use rounded-brutalist

// Don't use thin borders
<div className="border"> // Use border-2

// Don't use indigo/purple colors
<div className="bg-indigo-50"> // Use zinc-50 or primary
```

## Component Propagation

All sections use centralized design system components. Changes to design system components automatically propagate to:

- **Button** → Hero, Contact, Header
- **Card** → Services, Projects, Contact, Testimonials, Approach
- **Input** → Contact form
- **Badge** → Projects
- **Avatar** → Testimonials

## Migration Checklist

When adding new sections or components:

1. ✅ Import from `@/design-system`
2. ✅ Use `zinc-*` colors (not `gray-*`)
3. ✅ Use `rounded-brutalist` or `rounded-brutalist-sm`
4. ✅ Use `border-2` for all borders
5. ✅ Use `font-bold` for headings
6. ✅ Remove all shadows and gradients
7. ✅ Use `brutalist-*` utility classes
8. ✅ Test that changes propagate correctly

## Examples

### Service Card
```tsx
<Card className="group">
  <CardContent className="p-8">
    <div className="w-10 h-10 border-2 border-zinc-900 rounded-brutalist flex items-center justify-center mb-4">
      <Icon className="text-zinc-900" />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-3">
      Service Title
    </h3>
    <p className="text-zinc-600 mb-4">
      Service description
    </p>
  </CardContent>
</Card>
```

### Contact Form
```tsx
<Card>
  <CardContent className="p-8">
    <label className="block text-sm font-bold text-zinc-900 mb-2 uppercase tracking-wide">
      Name *
    </label>
    <Input
      type="text"
      placeholder="Your name"
      required
    />
    <Button variant="primary" size="lg" className="w-full mt-6">
      Submit
    </Button>
  </CardContent>
</Card>
```

### Stats Grid
```tsx
<div className="grid grid-cols-3 gap-px bg-zinc-900">
  <div className="bg-white p-8 text-center">
    <div className="text-4xl font-bold text-zinc-900 mb-2">
      50+
    </div>
    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
      Projects
    </div>
  </div>
  {/* More stats... */}
</div>
```

## Resources

- **Design System Showcase**: `/design-system` route
- **Tailwind Config**: `tailwind.config.js`
- **Global Styles**: `src/index.css`
- **Component Library**: `src/design-system/components/`

## Support

For questions or issues with the design system, refer to:
1. This documentation
2. Design System Showcase page
3. Component source code in `src/design-system/`
