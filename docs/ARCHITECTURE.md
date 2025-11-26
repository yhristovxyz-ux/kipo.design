# Project Architecture

## Overview

This document defines the architectural patterns and structure for AI-assisted development, ensuring maintainability, scalability, and context clarity.

---

## 🏛️ Architectural Principles

### 1. Feature-First Organization
Organize by business capability, not technical layer.

### 2. Explicit Over Implicit
Make dependencies, data flow, and relationships obvious.

### 3. Bounded Contexts
Each feature is self-contained with clear boundaries.

### 4. Single Source of Truth
No duplicate logic or data definitions.

### 5. Progressive Disclosure
Expose only what's necessary at each level.

---

## 📁 Directory Structure

```
kipo.design/
├── .devcontainer/           # Development container config
├── .github/                 # GitHub workflows
├── docs/                    # Project documentation
│   ├── WORKFLOW.md
│   ├── GIT-GUIDE.md
│   ├── DEVELOPMENT-STANDARDS.md
│   ├── AI-DEVELOPMENT-PLAN.md
│   ├── ARCHITECTURE.md      # This file
│   └── DESIGN-SYSTEM.md
├── public/                  # Static assets
│   ├── fonts/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/                # Application core
│   │   ├── App.tsx         # Root component
│   │   ├── routes.tsx      # Route definitions
│   │   ├── layouts/        # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   └── providers/      # Global providers
│   │       ├── ThemeProvider.tsx
│   │       ├── AuthProvider.tsx
│   │       └── QueryProvider.tsx
│   │
│   ├── features/           # Feature modules
│   │   ├── auth/
│   │   │   ├── CONTEXT.md  # Feature documentation
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── PasswordReset.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useSession.ts
│   │   │   ├── services/
│   │   │   │   └── authApi.ts
│   │   │   ├── types.ts
│   │   │   ├── constants.ts
│   │   │   └── index.ts    # Public API
│   │   │
│   │   ├── dashboard/
│   │   │   ├── CONTEXT.md
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   │
│   │   └── profile/
│   │       └── ...
│   │
│   ├── shared/             # Shared across features
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/          # Reusable hooks
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/          # Helper functions
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/          # Global type definitions
│   │   │   ├── api.types.ts
│   │   │   ├── common.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── constants/      # Global constants
│   │       ├── routes.ts
│   │       ├── config.ts
│   │       └── index.ts
│   │
│   ├── design-system/      # Design system
│   │   ├── tokens/         # Design tokens
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── components/     # Base design components
│   │   │   ├── primitives/ # Atomic components
│   │   │   └── patterns/   # Composite patterns
│   │   │
│   │   └── theme.ts        # Theme configuration
│   │
│   ├── services/           # External services
│   │   ├── api/
│   │   │   ├── client.ts   # API client setup
│   │   │   ├── endpoints.ts
│   │   │   └── interceptors.ts
│   │   │
│   │   ├── analytics/
│   │   │   └── analytics.ts
│   │   │
│   │   └── storage/
│   │       └── storage.ts
│   │
│   ├── main.tsx            # Application entry
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite types
│
├── .env.example            # Environment template
├── .gitignore
├── eslint.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Feature Module Pattern

### Structure

Each feature follows this pattern:

```
feature-name/
├── CONTEXT.md           # Feature documentation
├── components/          # Feature-specific components
│   ├── ComponentName.tsx
│   └── index.ts
├── hooks/              # Feature-specific hooks
│   ├── useFeature.ts
│   └── index.ts
├── services/           # Feature-specific services
│   ├── featureApi.ts
│   └── index.ts
├── types.ts            # Feature types
├── constants.ts        # Feature constants
├── utils.ts            # Feature utilities (if needed)
└── index.ts            # Public API
```

### Public API Pattern

```typescript
// features/auth/index.ts

// Export only what other features need
export { LoginForm, RegisterForm } from './components';
export { useAuth, useSession } from './hooks';
export type { User, AuthState } from './types';

// Internal implementation stays private
```

### CONTEXT.md Template

```markdown
# Feature: [Name]

## Purpose
[One sentence description]

## Scope
**Included:**
- [List what this feature handles]

**Excluded:**
- [List what this feature does NOT handle]

## Files
- `components/` - [Description]
- `hooks/` - [Description]
- `services/` - [Description]

## Data Flow
[Describe how data moves through the feature]

## Dependencies
**Internal:**
- `shared/components/Button`
- `shared/hooks/useForm`

**External:**
- `react-router-dom`
- `zod`

## Public API
[List what this feature exports]

## Usage Example
\`\`\`typescript
import { useAuth } from '@/features/auth';

function MyComponent() {
  const { user, login } = useAuth();
  // ...
}
\`\`\`

## Constraints
- [List any constraints or limitations]

## Future Considerations
- [List potential future enhancements]
```

---

## 🔗 Dependency Management

### Import Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/design-system/*": ["./src/design-system/*"],
      "@/services/*": ["./src/services/*"]
    }
  }
}
```

### Import Order

```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal features
import { useAuth } from '@/features/auth';

// 3. Shared utilities
import { Button } from '@/shared/components';
import { formatDate } from '@/shared/utils';

// 4. Design system
import { colors } from '@/design-system/tokens';

// 5. Types
import type { User } from '@/shared/types';

// 6. Relative imports (avoid when possible)
import { LocalComponent } from './LocalComponent';
```

### Dependency Rules

**✅ Allowed:**
- Features → Shared
- Features → Design System
- Features → Services
- Shared → Design System
- App → Features
- App → Shared

**❌ Forbidden:**
- Features → Features (use shared instead)
- Shared → Features
- Design System → Features
- Design System → Shared

---

## 🧩 Component Architecture

### Component Types

**1. Primitive Components** (`design-system/components/primitives/`)
- Basic building blocks
- No business logic
- Highly reusable
- Examples: Button, Input, Card

**2. Pattern Components** (`design-system/components/patterns/`)
- Combinations of primitives
- Common UI patterns
- Examples: FormField, Modal, Dropdown

**3. Shared Components** (`shared/components/`)
- Application-specific reusable components
- May contain light business logic
- Examples: UserAvatar, DataTable, SearchBar

**4. Feature Components** (`features/*/components/`)
- Feature-specific components
- Contains business logic
- Examples: LoginForm, DashboardWidget

### Component Template

```typescript
import { FC, ReactNode } from 'react';
import { cn } from '@/shared/utils';

/**
 * [Component description]
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 * ```
 */

interface ComponentNameProps {
  /** Description of prop */
  children: ReactNode;
  /** Description of prop */
  variant?: 'primary' | 'secondary';
  /** Description of prop */
  className?: string;
}

export const ComponentName: FC<ComponentNameProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  return (
    <div className={cn('base-classes', variantClasses[variant], className)}>
      {children}
    </div>
  );
};

const variantClasses = {
  primary: 'bg-primary-500 text-white',
  secondary: 'bg-gray-200 text-gray-900',
};
```

---

## 🪝 Hook Architecture

### Hook Types

**1. Data Hooks** - Fetch and manage data
```typescript
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Implementation
  
  return { users, loading, error, refetch };
}
```

**2. State Hooks** - Manage component state
```typescript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}
```

**3. Effect Hooks** - Handle side effects
```typescript
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

### Hook Template

```typescript
/**
 * [Hook description]
 * 
 * @param [param] - [Description]
 * @returns [Description of return value]
 * 
 * @example
 * ```tsx
 * const { data, loading } = useHookName(params);
 * ```
 */
export function useHookName(params: Params): ReturnType {
  // Implementation
  
  return {
    // Return values
  };
}
```

---

## 🔌 Service Architecture

### Service Pattern

```typescript
// services/api/userApi.ts

import { apiClient } from './client';
import type { User, CreateUserDto } from '@/shared/types';

/**
 * User API service
 * Handles all user-related API calls
 */
export const userApi = {
  /**
   * Fetch all users
   */
  async getAll(): Promise<User[]> {
    const response = await apiClient.get('/users');
    return response.data;
  },

  /**
   * Fetch user by ID
   */
  async getById(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  async create(data: CreateUserDto): Promise<User> {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  /**
   * Update user
   */
  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
```

---

## 🎨 Design System Architecture

### Token System

```typescript
// design-system/tokens/colors.ts

export const colors = {
  // Brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Neutral colors
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Semantic colors
  success: {
    light: '#10b981',
    DEFAULT: '#059669',
    dark: '#047857',
  },
  
  error: {
    light: '#ef4444',
    DEFAULT: '#dc2626',
    dark: '#b91c1c',
  },
  
  warning: {
    light: '#f59e0b',
    DEFAULT: '#d97706',
    dark: '#b45309',
  },
  
  info: {
    light: '#3b82f6',
    DEFAULT: '#2563eb',
    dark: '#1d4ed8',
  },
} as const;
```

### Component Variants

```typescript
// design-system/components/Button/variants.ts

import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border-2 border-gray-300 hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
        danger: 'bg-error-600 text-white hover:bg-error-700',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

---

## 📊 State Management

### Context Pattern

```typescript
// features/auth/context/AuthContext.tsx

import { createContext, useContext, ReactNode, useState } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // Implementation
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
```

---

## 🧪 Testing Architecture

### Test Organization

```
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── LoginForm.test.tsx
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   └── useAuth.test.ts
│       └── services/
│           ├── authApi.ts
│           └── authApi.test.ts
```

### Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🔄 Data Flow

### Unidirectional Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Hook/Service Call
    ↓
API Request
    ↓
State Update
    ↓
Component Re-render
```

### Example Flow

```typescript
// 1. User clicks button
<Button onClick={handleLogin}>Login</Button>

// 2. Event handler
const handleLogin = async () => {
  // 3. Hook call
  await login(email, password);
};

// 4. Hook implementation
const login = async (email: string, password: string) => {
  // 5. API call
  const user = await authApi.login(email, password);
  
  // 6. State update
  setUser(user);
};

// 7. Component re-renders with new state
```

---

## 📝 Documentation Standards

### File-Level Documentation

```typescript
/**
 * @fileoverview User authentication components
 * @module features/auth/components
 * 
 * This module contains all authentication-related UI components.
 * Components handle user login, registration, and password reset.
 * 
 * @see {@link ../hooks/useAuth.ts} for authentication logic
 * @see {@link ../services/authApi.ts} for API calls
 */
```

### Function Documentation

```typescript
/**
 * Validates user email format
 * 
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 * 
 * @example
 * ```typescript
 * const isValid = validateEmail('user@example.com'); // true
 * const isInvalid = validateEmail('invalid'); // false
 * ```
 */
export function validateEmail(email: string): boolean {
  // Implementation
}
```

---

## 🚀 Performance Considerations

### Code Splitting

```typescript
// Lazy load feature modules
const Dashboard = lazy(() => import('@/features/dashboard'));
const Profile = lazy(() => import('@/features/profile'));

// Route-based splitting
<Route path="/dashboard" element={
  <Suspense fallback={<Loading />}>
    <Dashboard />
  </Suspense>
} />
```

### Memoization

```typescript
// Expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

// Callback functions
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Components
export const ExpensiveComponent = memo(({ data }) => {
  // Component logic
});
```

---

## 🔐 Security Patterns

### Input Validation

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(50),
});

function validateUser(data: unknown) {
  return userSchema.parse(data);
}
```

### API Security

```typescript
// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📈 Scalability Patterns

### Feature Flags

```typescript
// shared/constants/features.ts
export const FEATURES = {
  NEW_DASHBOARD: import.meta.env.VITE_FEATURE_NEW_DASHBOARD === 'true',
  BETA_FEATURES: import.meta.env.VITE_FEATURE_BETA === 'true',
} as const;

// Usage
if (FEATURES.NEW_DASHBOARD) {
  return <NewDashboard />;
}
return <OldDashboard />;
```

### Environment Configuration

```typescript
// shared/constants/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
```

---

**Last Updated:** 2024-11-24  
**Version:** 1.0  
**Status:** Active
