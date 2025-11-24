# kipo.design

Modern web application built with React, TypeScript, and Vite.

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
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

### 3. Set up environment variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your favorite editor
```

---

## 🚀 Development

### Starting development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available commands

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
npm run type-check  # (add to package.json if missing)
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

The project contains detailed documentation in the `docs/` directory:

- **[WORKFLOW.md](docs/WORKFLOW.md)** - Git workflow and processes
- **[GIT-GUIDE.md](docs/GIT-GUIDE.md)** - Quick Git reference
- **[DEVELOPMENT-STANDARDS.md](docs/DEVELOPMENT-STANDARDS.md)** - Development standards

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
│   │   ├── common/          # Common components
│   │   ├── layout/          # Layout components
│   │   └── features/        # Feature-specific components
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript types
│   ├── constants/           # Constants
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
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
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

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

**Last Updated:** 2024-11-24
