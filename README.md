# kipo.design

Modern portfolio website with a brutalist design system refined with utilitarian principles. Built with React, TypeScript, Tailwind CSS, and a custom CMS with JSON backend.

## ✨ Features

- 🎨 Brutalist design system with utilitarian refinements
- ✏️ Inline content editing
- 📁 Project management with CRUD operations
- 🖼️ Image upload and management
- 💾 Server-side persistence (JSON files)
- 🔄 Multi-user support
- 📱 Fully responsive

## 🚀 Quick Start

See [QUICK-START.md](QUICK-START.md) for 5-minute setup.

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
- [CMS Backend](#cms-backend)
- [Design System](#design-system)
- [Build & Deployment](#build--deployment)
- [Git Workflow](#git-workflow)
- [Documentation](#documentation)
- [Project Structure](#project-structure)

---

## 🔧 Requirements

Before you begin, make sure you have installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** >= 1.22.0)
- **Git** >= 2.30.0

Check versions:
```bash
node --version
npm --version
git --version
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yordanhristovUX/kipo.design.git
cd kipo.design
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Set up environment variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your favorite editor
```

---

## 🚀 Development

### Starting servers

**Backend** (in one terminal):
```bash
cd backend
npm start
```

Backend runs on `http://localhost:3001`

**Frontend** (in another terminal):
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Available commands

**Frontend**:
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint check
npm run lint

# TypeScript type checking
npx tsc --noEmit
```

**Backend**:
```bash
# Start server
npm start

# Development with auto-reload
npm run dev
```

---

## 💾 CMS Backend

The CMS uses a JSON file backend for data persistence.

### Features
- RESTful API with Express
- JSON file storage for sections and projects
- Image upload with file storage
- CORS enabled for frontend
- Multi-user support

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/sections` - Get all sections
- `POST /api/sections` - Save sections
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/upload` - Upload image

### Documentation
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Deployment instructions
- **[JSON-BACKEND-COMPLETE.md](JSON-BACKEND-COMPLETE.md)** - Implementation details

---

## 🎨 Design System

This project uses a **brutalist design system** refined with **utilitarian principles**:

### Key Features
- **Geometric layouts** with strict grid-based design
- **Bold typography** with strong hierarchy
- **Muted borders** - Light gray (1px, #D4D4D4) instead of harsh black
- **Two-tier radius**: 1px for sections, 6px for interactive elements
- **Paper backgrounds** - Off-white (#FAFAF8) for reduced eye strain
- **Electric blue accent** - #0066FF for interactive elements
- **Semantic color tokens** - Derived from Tailwind colors
- **No shadows or gradients** - pure brutalist aesthetic

### Design System Components
- Button (4 variants, 4 sizes)
- Card (with Header, Content, Footer, Title, Description)
- Input (with validation states)
- Badge (8 variants)
- Avatar (with borders)
- Typography (Heading, Text)
- Layout (Container, Section)

### Documentation
- **[KIPO-DESIGN-SYSTEM.md](KIPO-DESIGN-SYSTEM.md)** - Complete design system guide (v1.1)
- **[CHANGELOG-v1.1.md](CHANGELOG-v1.1.md)** - Latest refinements and changes
- **Design System Showcase** - Available at `/design-system` route

### Quick Example
```tsx
import { Button, Card, CardContent } from '@/design-system';

<Card>
  <CardContent className="p-8">
    <h3 className="text-xl font-bold text-zinc-900 mb-4">
      Card Title
    </h3>
    <p className="text-zinc-600 mb-6">
      Card content goes here
    </p>
    <Button variant="primary" size="lg">
      Click Me
    </Button>
  </CardContent>
</Card>
```

---

## 🏗️ Build & Deployment

### Build for production

```bash
npm run build
```

Build files will be in the `dist/` directory.

### Preview production build

```bash
npm run preview
```

### Deployment process

1. **Development** → work in `dev` branch
2. **Staging** → merge to `staging` for testing
3. **Production** → merge to `master` after approval

See [Git Workflow documentation](docs/WORKFLOW.md) for details.

---

## 🌿 Git Workflow

The project uses **Trunk-based development** with three main branches:

- **`dev`** - development branch (always most current)
- **`staging`** - beta version for testing
- **`master`** - production branch

### Quick Start

```bash
# Start work
git checkout dev
git pull
git checkout -b dev-yourname

# Work and commit
git add -A
git commit -m "feat(component): description"
git push

# Synchronize with dev
git checkout dev && git pull
git checkout dev-yourname
git merge dev
```

📖 **Full documentation:** [docs/WORKFLOW.md](docs/WORKFLOW.md)

---

## 📚 Documentation

**📖 [Complete Documentation Index](DOCUMENTATION-INDEX.md)** - Full guide to all documentation

### 🎯 Start Here (For AI Agents)

1. **README.md** (this file) - Project overview and quick start
2. **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and structure
3. **[KIPO-DESIGN-SYSTEM.md](KIPO-DESIGN-SYSTEM.md)** - Design system guide
4. **[docs/DEVELOPMENT-STANDARDS.md](docs/DEVELOPMENT-STANDARDS.md)** - Coding standards
5. **[docs/AI-GUIDELINES.md](docs/AI-GUIDELINES.md)** - AI development patterns

### Core Documentation

- **[KIPO-DESIGN-SYSTEM.md](KIPO-DESIGN-SYSTEM.md)** - Complete design system guide (v1.1)
- **[docs/WORKFLOW.md](docs/WORKFLOW.md)** - Git workflow and processes
- **[docs/GIT-GUIDE.md](docs/GIT-GUIDE.md)** - Quick Git reference
- **[docs/DEVELOPMENT-STANDARDS.md](docs/DEVELOPMENT-STANDARDS.md)** - Standards and patterns
- **[docs/AI-GUIDELINES.md](docs/AI-GUIDELINES.md)** - AI-specific development patterns
- **[docs/AI-DEVELOPMENT-PLAN.md](docs/AI-DEVELOPMENT-PLAN.md)** - AI development strategy

### Version History

- **[CHANGELOG-v1.1.md](CHANGELOG-v1.1.md)** - Design system v1.1 changes

---

## 📁 Project Structure

```
kipo.design/
├── docs/                      # Documentation
│   ├── WORKFLOW.md           # Git workflow
│   ├── GIT-GUIDE.md          # Git reference
│   └── DEVELOPMENT-STANDARDS.md
├── src/
│   ├── components/           # React components
│   │   ├── sections/        # Page sections (Hero, etc.)
│   │   ├── atoms/           # Editable atomic components
│   │   ├── cms/             # CMS editing components
│   │   └── admin/           # Admin panel components
│   ├── design-system/       # Brutalist design system
│   │   ├── components/      # Design system components
│   │   │   ├── primitives/  # Button, Card, Input, etc.
│   │   │   └── layout/      # Container, Section
│   │   ├── tokens/          # Design tokens
│   │   └── utils/           # Design system utilities
│   ├── contexts/            # React Context providers
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + brutalist utilities
├── public/                   # Static assets
├── DESIGN_SYSTEM.md         # Design system documentation
├── FIXES_SUMMARY.md         # Recent fixes documentation
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── README.md                # This file
```

---

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **CVA (Class Variance Authority)** - Component variants
- **Lucide React** - Icon library
- **Custom Design System** - Brutalist component library

---

## 👥 Team and Contributing

### Before making changes:

1. Read [WORKFLOW.md](docs/WORKFLOW.md)
2. Read [DEVELOPMENT-STANDARDS.md](docs/DEVELOPMENT-STANDARDS.md)
3. Create personal branch from `dev`
4. Follow commit conventions
5. Test locally before push

### Commit Convention

```
<type>(<scope>): <short summary>

Examples:
feat(auth): added login form
fix(header): fixed responsive layout
refactor(api): optimized API calls
docs(readme): updated documentation
```

---

## 🐛 Issues and Questions

If you encounter a problem:

1. Check documentation in `docs/`
2. Check if you have latest changes from `dev`
3. Check if dependencies are installed
4. Ask a team member

---

## 📝 Checklist for New Developer

- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`
- [ ] Development server starts successfully (`npm run dev`)
- [ ] Documentation in `docs/` read
- [ ] Personal branch created from `dev`
- [ ] First test commit made

---

## 📄 License

[Add license information]

---

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated:** 2024-11-26
