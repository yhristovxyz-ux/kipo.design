# Development Standards

## General Principles

### Mindset
- The goal is not just to write code, but to create systems that we can maintain easily
- If you can make life easier for the next person working on the project - do it
- Five minutes of documentation is better than half a day of guessing
- Always think about how someone with less context will understand your code
- Keep it simple - good code is clear, not "clever"

---

## 1. Code Quality and Standards

### Code Style
- **Follow project conventions** - code should look like it was written by one person
- **Use meaningful names** for variables, functions, and components
  - ✅ `const userAuthentication = ...`
  - ❌ `const ua = ...`
  - ✅ `function calculateTotalPrice() { ... }`
  - ❌ `function calc() { ... }`
- **Avoid abbreviations** except commonly accepted ones (URL, API, HTTP)
- **Don't leave commented code** or "TODO" without context
- **Every commit should have clear meaning** and a short, descriptive message

### Functions and Components
- **One function/component does one thing well**
- **Avoid "magic numbers"** - use constants
  ```typescript
  // ❌ Bad
  if (users.length > 50) { ... }
  
  // ✅ Good
  const MAX_USERS_PER_PAGE = 50;
  if (users.length > MAX_USERS_PER_PAGE) { ... }
  ```
- **Maintain consistent formatting style** - use `npm run lint` before every push
- **Use existing solutions** - don't reinvent something that already works

### Comments
- **API comments document "why", not "what"**
- **Avoid redundant comments** that restate the code
  ```typescript
  // ❌ Bad
  // Increment counter by 1
  counter++;
  
  // ✅ Good (only if logic is not obvious)
  // Using exponential backoff to prevent API rate limiting
  await delay(Math.pow(2, retryCount) * 1000);
  ```
- **Add comments only for non-obvious logic** or performance trade-offs

---

## 2. Project Structure

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, Card)
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API calls and external services
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
├── constants/          # Constants and configuration
├── styles/             # Global styles
└── pages/              # Page components (if using routing)
```

### File Naming
- **Components:** PascalCase - `UserProfile.tsx`, `NavigationMenu.tsx`
- **Utilities:** camelCase - `formatDate.ts`, `apiClient.ts`
- **Styles:** kebab-case - `user-profile.module.css`
- **Constants:** UPPER_SNAKE_CASE - `API_ENDPOINTS.ts`

---

## 3. React & TypeScript Best Practices

### Components
```typescript
// ✅ Good - clear structure, typed, documented
interface UserCardProps {
  user: User;
  onEdit?: (userId: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  const handleEdit = () => {
    onEdit?.(user.id);
  };

  return (
    <div className={className}>
      <h3>{user.name}</h3>
      {onEdit && <button onClick={handleEdit}>Edit</button>}
    </div>
  );
}
```

### Custom Hooks
```typescript
// ✅ Good - reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### State Management
- **Use Context for global state**
- **Avoid prop drilling** - if passing props through more than 2-3 levels, consider Context
- **Use useReducer for complex logic**
- **Memoize expensive calculations** with `useMemo` and `useCallback`

---

## 4. Security and Stability

### Data Validation
```typescript
// ✅ Always validate incoming data
function processUserInput(input: unknown): User | null {
  if (!input || typeof input !== 'object') {
    return null;
  }
  
  const data = input as Record<string, unknown>;
  
  if (typeof data.name !== 'string' || typeof data.email !== 'string') {
    return null;
  }
  
  return {
    name: data.name,
    email: data.email,
    // ... other fields
  };
}
```

### Error Handling
```typescript
// ✅ Good - graceful error handling
async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch user: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return processUserInput(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
```

### Sensitive Data
- **Never commit `.env` or sensitive files to Git**
- **Use `.env.example`** to document required variables
- **Don't log sensitive data** in console or error tracking
- **Use environment variables** for API keys and secrets

---

## 5. Performance & Optimization

### Component Optimization
```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // complex render logic
});

// ✅ Use useCallback for functions in dependencies
const handleClick = useCallback(() => {
  // logic
}, [dependency]);

// ✅ Use useMemo for expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
```

### Lazy Loading
```typescript
// ✅ Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization
- Use appropriate formats (WebP, AVIF)
- Add `loading="lazy"` for images
- Optimize sizes before upload
- Use CDN for static resources

---

## 6. Testing and Quality

### Before Commit
```bash
# Check for errors
npm run lint

# Check TypeScript types
npm run type-check

# Build project
npm run build

# Test locally
npm run dev
```

### Checklist Before Push
- [ ] Code is tested locally
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] No console.log or debug code
- [ ] Formatting is correct
- [ ] Commit message is clear and descriptive

---

## 7. Collaboration & Communication

### Communication
- **Understand the task before starting** - if something is unclear, ask
- **Communicate often and on time** - better a quick clarification today than a day lost in the wrong direction
- **Always work in a separate branch** (`feature/`, `fix/`, `refactor/`)
- **Main branch should always be stable** and deployable
- **Use clear commit messages** following the convention
- **Never overwrite others' changes** without merging

### Code Review
- Review colleagues' code constructively
- Explain "why", not just "what" to change
- Accept feedback positively - the goal is better code

---

## 8. Documentation

### README.md should contain:
- Project description
- Requirements (Node version, dependencies)
- Installation instructions
- How to start the project
- Available scripts
- Environment variables
- Deployment process

### Document when:
- Creating a new feature with non-standard logic
- Changing API endpoints or data structures
- Adding new environment variables
- Changing build or deployment process

---

## 9. Deployment & Maintenance

### Before Deployment
- [ ] Code is tested on staging
- [ ] All tests pass
- [ ] Build is successful
- [ ] Environment variables are configured
- [ ] Logs checked for errors
- [ ] Backup is made (if needed)

### After Deployment
- Check if main functions work
- Monitor for errors
- Check performance metrics
- Document changes

---

## 10. Common Mistakes

### ❌ Avoid:
```typescript
// Hard-coded values
if (user.role === 'admin') { ... }

// Unclear names
const d = new Date();
const temp = data.filter(x => x.active);

// Long functions
function processEverything() {
  // 200 lines of code
}

// Ignoring errors
try {
  await fetchData();
} catch (e) {
  // empty
}

// Prop drilling
<Component1 data={data}>
  <Component2 data={data}>
    <Component3 data={data}>
      <Component4 data={data} />
```

### ✅ Do:
```typescript
// Constants
const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

if (user.role === USER_ROLES.ADMIN) { ... }

// Clear names
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);

// Small, focused functions
function validateUser(user: User): boolean { ... }
function formatUserData(user: User): FormattedUser { ... }
function saveUser(user: User): Promise<void> { ... }

// Proper error handling
try {
  await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  showErrorNotification('Unable to load data');
}

// Context for shared state
const UserContext = createContext<UserContextType | null>(null);
```

---

## 11. Useful Tools

### VS Code Extensions
- ESLint
- Prettier
- TypeScript Error Translator
- Auto Rename Tag
- GitLens
- Error Lens

### NPM Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

---

## 12. Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Best Practices
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

---

## Conclusion

**Remember:**
- Write code that others can maintain
- Think about rollback before deploy
- If something can break - it will break, so anticipate it
- Better clear code today than "clever" code that nobody understands tomorrow
- Learn from every project - repetition creates stability, not boredom

**Always ask when you're not sure!**
