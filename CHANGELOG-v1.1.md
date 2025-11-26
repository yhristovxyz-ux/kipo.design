# Changelog v1.1 - Brutalist + Utilitarian Refinements

## Overview

Updated the brutalist design system with utilitarian refinements while maintaining the original structure and component architecture.

## Changes Summary

### ✅ Fixed Issues

1. **Button Height** - Fixed large button height (h-13 → h-14)
2. **Hatching Pattern** - Added `.brutalist-hatch` utility class
3. **Section Radius** - Ensured 1px radius is visible on sections

### 🎨 Design System Updates

#### Color System

**Added Semantic Color Tokens:**
- Primary tokens derived from Tailwind colors (blue, zinc, green, red, yellow, cyan)
- Semantic tokens for specific purposes (interactive, success, error, warning, info)
- Context tokens for usage (bg, text, border, surface)

**Color Structure:**
```css
/* Primary Tokens (from Tailwind) */
--tw-blue-500, --tw-zinc-300, --tw-green-600, etc.

/* Semantic Tokens (derived) */
--color-primary: #0066FF
--color-bg-primary: #FAFAF8
--color-text-primary: #18181b
--color-border-primary: #d4d4d8

/* Context Tokens */
--color-interactive-default
--color-success, --color-error, --color-warning, --color-info
--color-surface-default, --color-surface-elevated
```

#### Border Radius

**Two-Tier System:**
- `--radius-section: 1px` - Large sections and containers
- `--radius-interactive: 6px` - Buttons, inputs, badges, chips

#### Components Updated

1. **Button**
   - Fixed large size height (h-14)
   - Uses semantic color tokens
   - 6px border radius (interactive)

2. **Card**
   - 1px border radius (section)
   - Muted borders
   - Semantic color tokens

3. **Input**
   - Fixed large size height (h-14)
   - 6px border radius (interactive)
   - Semantic color tokens

4. **Badge**
   - 6px border radius (interactive)
   - Semantic color tokens

#### Utilities Added

```css
.brutalist-hatch {
  background-color: var(--color-bg-tertiary);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 8px,
    rgba(26, 26, 26, 0.02) 8px,
    rgba(26, 26, 26, 0.02) 16px
  );
}
```

### 📚 Documentation Updates

#### New Documentation

1. **DOCUMENTATION-INDEX.md** - Complete documentation index
   - Categorized all documentation
   - Marked current vs superseded files
   - Quick navigation for different audiences

2. **CHANGELOG-v1.1.md** - This file
   - Complete change summary
   - Migration guide
   - Breaking changes (none)

#### Updated Documentation

1. **README.md**
   - Updated design system description
   - Added documentation index link
   - Updated quick start for AI agents
   - Current technology stack

2. **BRUTALIST-UTILITARIAN-UPDATE.md**
   - Complete design system changes
   - Before/after comparison
   - Component updates

3. **BORDER_RADIUS_GUIDE.md**
   - Two-tier radius system
   - Usage examples
   - Migration notes

4. **DESIGN_SYSTEM_UPDATE.md**
   - Token reference
   - Utility classes
   - Latest updates section

### 🔧 Configuration Updates

#### Tailwind Config

Extended theme with all semantic tokens:

```javascript
colors: {
  primary: 'var(--color-primary)',
  'bg-primary': 'var(--color-bg-primary)',
  'text-primary': 'var(--color-text-primary)',
  'border-primary': 'var(--color-border-primary)',
  interactive: { ... },
  success: { ... },
  error: { ... },
  warning: { ... },
  info: { ... },
  surface: { ... },
}
```

#### CSS Variables

Organized into three tiers:
1. **Primary tokens** - Base Tailwind colors
2. **Semantic tokens** - Purpose-driven colors
3. **Context tokens** - Usage-specific colors

## Migration Guide

### No Breaking Changes

All existing code continues to work. The changes are additive and refinements.

### Optional Updates

**Use semantic tokens instead of direct colors:**

```tsx
// Before
<div className="bg-white text-zinc-900 border-zinc-300">

// After (recommended)
<div className="bg-bg-primary text-text-primary border-border-primary">
```

**Use new radius classes:**

```tsx
// Before
<div className="rounded-brutalist-sm">  // 2px

// After
<div className="rounded-section">       // 1px
```

**Use hatching pattern:**

```tsx
// New utility
<footer className="brutalist-hatch">
  Footer content
</footer>
```

## Files Modified

### Design System
- `src/index.css` - Added semantic tokens, hatching pattern
- `tailwind.config.js` - Extended theme with semantic tokens
- `src/design-system/components/primitives/Button/Button.tsx`
- `src/design-system/components/primitives/Card/Card.tsx`
- `src/design-system/components/primitives/Input/Input.tsx`
- `src/design-system/components/primitives/Badge/Badge.tsx`

### Documentation
- `README.md` - Updated with current information
- `DOCUMENTATION-INDEX.md` - New comprehensive index
- `BRUTALIST-UTILITARIAN-UPDATE.md` - Design system changes
- `BORDER_RADIUS_GUIDE.md` - Radius system guide
- `DESIGN_SYSTEM_UPDATE.md` - Token reference
- `CHANGELOG-v1.1.md` - This file

### Configuration
- `.devcontainer/Dockerfile` - Node.js installation
- `.devcontainer/devcontainer.json` - Dev container config

## Testing Checklist

- [x] Button sizes render correctly (especially large)
- [x] Hatching pattern visible in footer
- [x] Section radius (1px) visible on containers
- [x] Interactive radius (6px) visible on buttons/inputs
- [x] Semantic color tokens work in Tailwind
- [x] All components use new tokens
- [x] Documentation is accessible and clear
- [x] Dev server runs without errors

## Next Steps

### Recommended

1. Update remaining page sections to use semantic tokens
2. Add more examples to design system showcase
3. Create component usage documentation
4. Add visual regression tests

### Optional

1. Create dark mode variant
2. Add animation utilities
3. Expand color palette
4. Create more utility classes

## Version Information

- **Version**: 1.1
- **Date**: November 26, 2024
- **Branch**: dev
- **Status**: Complete

## Contributors

- Design system refinements
- Semantic color system
- Documentation restructure
- Bug fixes

---

**Previous Version**: 1.0 (Pure Brutalist)  
**Current Version**: 1.1 (Brutalist + Utilitarian)  
**Next Version**: TBD
