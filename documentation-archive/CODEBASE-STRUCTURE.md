# Codebase Structure Documentation

## Current Architecture

### Main Application Flow

```
App.tsx
├── CMSProvider (wraps everything)
├── EditingToolbar (when in edit mode)
├── Router
    ├── HomePage (main route)
    │   ├── Header
    │   ├── HeroSection (CMS-enabled) ✅ UPDATED
    │   ├── Services
    │   ├── Process
    │   ├── Studio
    │   ├── Approach
    │   ├── Projects
    │   ├── Testimonials
    │   ├── Contact
    │   └── Footer
    └── AdminPanel (admin route)
```

### Component Organization

#### `/src/components/` - Main Components

**Layout Components:**
- `Header.tsx` ✅ UPDATED - Navigation header (brutalist style)
- `Footer.tsx` - Footer section
- `Hero.tsx` - Static hero (NOT USED - replaced by HeroSection)

**Section Components:**
- `Services.tsx` - Services grid
- `Process.tsx` - Process/workflow section
- `Studio.tsx` - Studio/about section
- `Approach.tsx` - Approach/methodology
- `Projects.tsx` - Portfolio/work showcase
- `Testimonials.tsx` - Client testimonials
- `Contact.tsx` - Contact form

#### `/src/components/sections/` - CMS-Enabled Sections

- `HeroSection.tsx` ✅ UPDATED - CMS-enabled hero (brutalist style)

#### `/src/components/atoms/` - Atomic Components

- `Button.tsx` ✅ UPDATED - Button wrapper with CMS support
- `Icon.tsx` - Icon component
- `Tag.tsx` - Tag/badge component
- `EditableText.tsx` - CMS editable text
- `EditableButton.tsx` - CMS editable button
- `EditableImage.tsx` - CMS editable image
- `EditableServiceCard.tsx` - CMS editable service card

#### `/src/components/cms/` - CMS System

- `SectionManager.tsx` - Section management UI
- `SectionWrapper.tsx` - Wrapper for CMS sections
- `EditingToolbar.tsx` - Top editing toolbar
- `EditingPopups.tsx` - Edit mode popups

#### `/src/components/admin/` - Admin Panel

- `AdminPanel.tsx` - Main admin interface
- `AdminDashboard.tsx` - Admin dashboard
- `AdminLogin.tsx` - Admin login

### Design System

#### `/src/design-system/` - Design System

**Tokens:**
- `tokens/colors.ts` - Color palette (zinc + blue)
- `tokens/index.ts` - All design tokens

**Components:**
- `components/primitives/Button/` ✅ UPDATED - Brutalist button
- `components/primitives/Input/` - Form input
- `components/primitives/Card/` - Card component
- `components/primitives/Badge/` - Badge component
- `components/primitives/Avatar/` - Avatar component

**Utils:**
- `utils/cn.ts` - Class name utility

### Context & State

#### `/src/contexts/`

- `CMSContext.tsx` - CMS state management
  - Stores all section content
  - Edit mode state
  - Section management functions

**Default Sections in CMS:**
1. `hero` - Hero section content
2. `services` - Services section content
3. `process` - Process section content
4. `studio` - Studio section content
5. `approach` - Approach section content
6. `projects` - Projects section content
7. `testimonials` - Testimonials content
8. `contact` - Contact section content

---

## Content Structure

### Hero Section Content (from CMSContext)

```javascript
{
  badge: 'Available for new projects',
  headline: 'Design That Moves.',
  subheadline: 'Ideas That Convert.',
  description: 'We build scalable, user-first digital products...',
  primaryButton: { text: 'Let\'s Build Something Brilliant', href: '#contact' },
  secondaryButton: { text: 'See Our Work', href: '#work' },
  stats: [
    { value: '50+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '3x', label: 'Conversion Increase' }
  ]
}
```

---

## Design System Status

### ✅ Updated to Brutalist Design

**Components:**
- Button (primitives) - Geometric, bold borders, flat colors
- Button (atoms) - Wrapper with CMS support
- Header - White bg, uppercase nav, bold typography
- HeroSection - Centered, large typography, geometric grid

**Styling:**
- White background
- Zinc neutral palette (50-900)
- Blue accent only (#3b82f6)
- 2px rounding for large sections
- 4px rounding for buttons/small elements
- No shadows, no gradients
- Bold typography, uppercase labels

### ⏳ Needs Update

**Sections:**
- Services - Needs Card components, brutalist grid
- Process - Needs geometric layout
- Studio - Needs brutalist styling
- Approach - Needs brutalist styling
- Projects - Needs brutalist grid
- Testimonials - Needs brutalist cards
- Contact - Needs brutalist form
- Footer - Needs brutalist styling

---

## File Locations Quick Reference

| Component | File Path | Status |
|-----------|-----------|--------|
| App Entry | `src/App.tsx` | ✅ Working |
| Header | `src/components/Header.tsx` | ✅ Updated |
| Hero (CMS) | `src/components/sections/HeroSection.tsx` | ✅ Updated |
| Hero (Static) | `src/components/Hero.tsx` | ⚠️ Not Used |
| Services | `src/components/Services.tsx` | ⏳ Needs Update |
| Process | `src/components/Process.tsx` | ⏳ Needs Update |
| Studio | `src/components/Studio.tsx` | ⏳ Needs Update |
| Approach | `src/components/Approach.tsx` | ⏳ Needs Update |
| Projects | `src/components/Projects.tsx` | ⏳ Needs Update |
| Testimonials | `src/components/Testimonials.tsx` | ⏳ Needs Update |
| Contact | `src/components/Contact.tsx` | ⏳ Needs Update |
| Footer | `src/components/Footer.tsx` | ⏳ Needs Update |

---

## Next Steps

1. **Update Services Section**
   - Use Card components
   - Brutalist grid layout
   - Bold typography

2. **Update Other Sections**
   - Apply brutalist styling
   - Use design system components
   - Geometric layouts

3. **Create Missing Components**
   - Logo grid component
   - Testimonial card component
   - Feature section layout

4. **Refactor Structure** (Optional)
   - Move all sections to `/sections/`
   - Consolidate CMS-enabled versions
   - Remove unused Hero.tsx

---

**Last Updated:** 2024-11-25  
**Status:** In Progress - Brutalist Redesign
