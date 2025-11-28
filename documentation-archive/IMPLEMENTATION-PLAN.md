# Implementation Plan - AI-Optimized Architecture

## Current Status

**Environment:** Node.js not yet installed in container  
**Current Structure:** Flat component structure with CMS functionality  
**Target:** Feature-based modular architecture with Momentic.ai design system

---

## Phase 1: Environment Setup

### Step 1: Install Node.js Dependencies

```bash
# This will be available once the devcontainer rebuilds
npm install

# Install new dependencies for design system
npm install -D class-variance-authority clsx tailwind-merge zod

# Note: Keeping Tailwind 3.4.1 for now (stable)
# Tailwind 4 is still in alpha, will upgrade when stable
```

### Step 2: Verify Installation

```bash
npm run dev  # Should start Vite dev server
npm run lint # Should run ESLint
npm run build # Should build for production
```

---

## Phase 2: Design System Implementation

### Step 1: Create Design System Structure

```bash
mkdir -p src/design-system/{tokens,components/{primitives,patterns},utils}
```

### Step 2: Implement Design Tokens

Files to create:
- `src/design-system/tokens/colors.ts`
- `src/design-system/tokens/typography.ts`
- `src/design-system/tokens/spacing.ts`
- `src/design-system/tokens/radius.ts`
- `src/design-system/tokens/shadows.ts`
- `src/design-system/tokens/animations.ts`
- `src/design-system/tokens/index.ts`

### Step 3: Update Tailwind Configuration

Update `tailwind.config.js` with Momentic.ai-inspired tokens.

### Step 4: Create Base Components

- Button (with CVA variants)
- Input
- Card
- Badge
- Avatar

### Step 5: Create Utility Functions

- `cn()` - classnames utility
- Validation helpers

---

## Phase 3: Architecture Refactoring

### Step 1: Create Feature Structure

```bash
mkdir -p src/features/{home,admin,cms}
mkdir -p src/shared/{components,hooks,utils,types,constants}
mkdir -p src/services/api
mkdir -p src/app/{layouts,providers,routes}
```

### Step 2: Migrate Components

**Home Feature:**
- Move: Hero, Services, Process, Studio, Approach, Projects, Testimonials, Contact
- Create: `src/features/home/CONTEXT.md`
- Organize: components/, hooks/, types.ts, index.ts

**Admin Feature:**
- Move: AdminPanel, AdminDashboard, AdminLogin
- Create: `src/features/admin/CONTEXT.md`
- Add: Authentication logic, API services

**CMS Feature:**
- Move: CMSContext, EditingToolbar, SectionManager, etc.
- Create: `src/features/cms/CONTEXT.md`
- Refactor: Into smaller, focused modules

**Shared:**
- Move: Button, Icon, Tag → shared/components
- Create: Reusable hooks
- Add: Utility functions

### Step 3: Update Imports

Use path aliases:
- `@/features/*`
- `@/shared/*`
- `@/design-system/*`
- `@/services/*`

### Step 4: Add CONTEXT.md Files

Each feature gets a CONTEXT.md documenting:
- Purpose
- Files
- Data flow
- Dependencies
- Public API

---

## Phase 4: Apply Design System

### Step 1: Update Global Styles

Replace current CSS variables with Momentic.ai tokens:
- Dark background: `#0a0a0a`
- Primary blue: `#3b82f6`
- Surface: `#111111`

### Step 2: Refactor Components

Update each component to use:
- Design system tokens
- CVA variants
- Consistent spacing
- Proper typography

### Step 3: Add Animations

Implement smooth transitions:
- Fade in on scroll
- Hover effects
- Loading states

---

## Phase 5: Validation & Testing

### Step 1: Add Validation

- Zod schemas for forms
- Type guards
- Input validation

### Step 2: Add Linting Rules

Update ESLint config:
- Max file size: 300 lines
- Max complexity: 10
- Import order rules

### Step 3: Test Everything

- Manual testing
- Type checking
- Lint checking
- Build verification

---

## Phase 6: Documentation

### Step 1: Create CONTEXT.md Files

For each feature:
- home/CONTEXT.md
- admin/CONTEXT.md
- cms/CONTEXT.md

### Step 2: Update README

Add:
- New structure explanation
- How to add features
- Design system usage

### Step 3: Add Code Comments

JSDoc comments for:
- All exported functions
- All components
- Complex logic

---

## File Migration Map

### Current → New Structure

```
src/
├── components/
│   ├── Header.tsx → features/home/components/Header.tsx
│   ├── Hero.tsx → features/home/components/Hero.tsx
│   ├── Services.tsx → features/home/components/Services.tsx
│   ├── Process.tsx → features/home/components/Process.tsx
│   ├── Studio.tsx → features/home/components/Studio.tsx
│   ├── Approach.tsx → features/home/components/Approach.tsx
│   ├── Projects.tsx → features/home/components/Projects.tsx
│   ├── Testimonials.tsx → features/home/components/Testimonials.tsx
│   ├── Contact.tsx → features/home/components/Contact.tsx
│   ├── Footer.tsx → features/home/components/Footer.tsx
│   │
│   ├── admin/
│   │   └── * → features/admin/components/
│   │
│   ├── cms/
│   │   └── * → features/cms/components/
│   │
│   ├── atoms/
│   │   ├── Button.tsx → design-system/components/primitives/Button/
│   │   ├── Icon.tsx → shared/components/Icon/
│   │   └── Tag.tsx → shared/components/Tag/
│   │
│   └── sections/
│       └── HeroSection.tsx → features/home/components/
│
├── contexts/
│   └── CMSContext.tsx → features/cms/context/CMSContext.tsx
│
└── App.tsx → app/App.tsx
```

---

## Implementation Checklist

### Phase 1: Setup ✅
- [x] Create implementation plan
- [ ] Install Node.js dependencies
- [ ] Verify build works

### Phase 2: Design System
- [ ] Create design system structure
- [ ] Implement design tokens
- [ ] Update Tailwind config
- [ ] Create base components
- [ ] Create utility functions

### Phase 3: Architecture
- [ ] Create feature directories
- [ ] Migrate home feature
- [ ] Migrate admin feature
- [ ] Migrate CMS feature
- [ ] Move shared components
- [ ] Update all imports
- [ ] Add path aliases

### Phase 4: Styling
- [ ] Update global styles
- [ ] Apply design tokens
- [ ] Refactor component styles
- [ ] Add animations
- [ ] Test responsive design

### Phase 5: Validation
- [ ] Add Zod schemas
- [ ] Update linting rules
- [ ] Add type guards
- [ ] Run all checks
- [ ] Fix any issues

### Phase 6: Documentation
- [ ] Create CONTEXT.md files
- [ ] Update README
- [ ] Add JSDoc comments
- [ ] Document patterns
- [ ] Create examples

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Quality Checks
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Check TypeScript types

# Git Workflow
git checkout -b feature/design-system
git add .
git commit -m "feat(design-system): implement Momentic.ai design system"
git push -u origin feature/design-system
```

---

## Next Steps

1. **Rebuild devcontainer** to get Node.js
2. **Install dependencies** with npm install
3. **Start with Phase 2** - Design System
4. **Work incrementally** - One phase at a time
5. **Test frequently** - After each major change
6. **Commit often** - Small, focused commits

---

## Notes

- Keep existing functionality working during migration
- Test after each phase
- Update documentation as you go
- Ask for help when needed
- Follow the AI guidelines for effective prompting

---

**Created:** 2024-11-24  
**Status:** Ready for implementation  
**Estimated Time:** 2-3 days for complete migration
