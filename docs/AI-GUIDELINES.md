# AI Development Guidelines

## Working with Ona (AI Assistant)

This document provides specific guidelines for effective AI-assisted development, ensuring consistency, context retention, and error prevention.

---

## 🎯 Core Principles

### 1. Context is King
AI needs explicit context to make correct decisions. Never assume the AI remembers previous conversations.

### 2. Incremental Development
Build features in small, testable increments. Each step should be verifiable.

### 3. Explicit Over Implicit
State requirements clearly. Don't rely on AI to infer intentions.

### 4. Validate Everything
Always verify AI-generated code before committing.

---

## 📋 Before Starting Any Task

### 1. Provide Complete Context

**❌ Bad:**
```
Add a login form
```

**✅ Good:**
```
Task: Add login form to authentication feature

Context:
- Location: src/features/auth/components/LoginForm.tsx
- Reference existing: src/features/auth/components/RegisterForm.tsx
- Use shared components: src/shared/components/Button, Input
- Integrate with: src/features/auth/hooks/useAuth.ts
- Follow design system: src/design-system/tokens/colors.ts
- Validation: Use zod schema
- Error handling: Show inline errors + toast notifications

Requirements:
- Email and password fields
- Remember me checkbox
- Forgot password link
- Loading state during submission
- Accessible (ARIA labels)
- Mobile responsive

Constraints:
- Max file size: 200 lines
- Must use existing Button component
- Follow form pattern from RegisterForm
```

### 2. Reference Existing Patterns

Always point AI to similar existing code:

```
Create a UserProfile component similar to UserSettings.tsx but for profile display.
Key differences:
- Read-only by default
- Edit mode toggle
- Avatar upload
- Follow same validation pattern
```

### 3. Specify File Locations

```
Create these files:
1. src/features/profile/components/UserProfile.tsx
2. src/features/profile/hooks/useProfile.ts
3. src/features/profile/types.ts

Modify these files:
1. src/features/profile/index.ts - add exports
2. src/app/routes.tsx - add profile route
```

---

## 🔄 Development Workflow with AI

### Phase 1: Planning

**Step 1: Define the Feature**
```markdown
## Feature: User Profile Management

### Purpose
Allow users to view and edit their profile information.

### Scope
**Included:**
- View profile
- Edit profile
- Upload avatar
- Change password

**Excluded:**
- Account deletion
- Email change (requires verification)
- Two-factor authentication

### Files to Create
- src/features/profile/components/ProfileView.tsx
- src/features/profile/components/ProfileEdit.tsx
- src/features/profile/components/AvatarUpload.tsx
- src/features/profile/hooks/useProfile.ts
- src/features/profile/services/profileApi.ts
- src/features/profile/types.ts
- src/features/profile/CONTEXT.md

### Files to Modify
- src/features/profile/index.ts
- src/app/routes.tsx
- src/shared/types/User.types.ts (add profile fields)

### Dependencies
- Existing: useAuth, Button, Input, Card
- New: react-dropzone (for avatar upload)
```

**Step 2: Create CONTEXT.md**
```
Create src/features/profile/CONTEXT.md with:
- Feature purpose
- File structure
- Data flow diagram
- Dependencies list
- Public API
- Usage examples
```

**Step 3: Break Down into Steps**
```
Let's build this incrementally:

Step 1: Create types and API service
Step 2: Create ProfileView component (read-only)
Step 3: Create ProfileEdit component
Step 4: Create AvatarUpload component
Step 5: Create useProfile hook
Step 6: Integrate with routes
Step 7: Add tests

We'll do one step at a time, testing after each.
```

### Phase 2: Implementation

**For Each Step:**

1. **Provide Context**
```
Step 1: Create types and API service

Context:
- User type: src/shared/types/User.types.ts
- API client: src/services/api/client.ts
- Reference: src/features/auth/services/authApi.ts

Create:
- src/features/profile/types.ts
- src/features/profile/services/profileApi.ts

Requirements:
- Profile type extends User
- API methods: getProfile, updateProfile, uploadAvatar
- Proper error handling
- TypeScript strict mode
```

2. **Review Generated Code**
```
Review checklist:
- [ ] Follows project conventions
- [ ] Proper TypeScript types
- [ ] Error handling included
- [ ] No hardcoded values
- [ ] Imports are correct
- [ ] File size < 200 lines
```

3. **Test Immediately**
```bash
npm run type-check
npm run lint
npm run test
```

4. **Commit**
```bash
git add src/features/profile/types.ts src/features/profile/services/profileApi.ts
git commit -m "feat(profile): add profile types and API service"
```

5. **Move to Next Step**
```
Step 1 complete ✓

Step 2: Create ProfileView component

Context:
- Types: src/features/profile/types.ts
- API: src/features/profile/services/profileApi.ts
- Reference: src/features/auth/components/UserInfo.tsx
- Use: Card, Avatar from shared/components

[Continue with detailed requirements...]
```

### Phase 3: Integration

**After All Steps Complete:**

1. **Integration Testing**
```
Test the complete feature:
1. Navigate to profile page
2. View profile information
3. Click edit
4. Modify fields
5. Upload avatar
6. Save changes
7. Verify updates

Check:
- Loading states
- Error handling
- Validation
- Responsive design
- Accessibility
```

2. **Code Review**
```
Review entire feature:
- [ ] All files follow conventions
- [ ] No duplicate code
- [ ] Proper error handling
- [ ] Tests pass
- [ ] Documentation complete
- [ ] CONTEXT.md updated
```

3. **Final Commit**
```bash
git add .
git commit -m "feat(profile): complete user profile management feature

- Add profile view and edit components
- Implement avatar upload
- Add profile API service
- Include comprehensive tests
- Update documentation"
```

---

## 🎨 Design System Integration

### Always Reference Design Tokens

**❌ Bad:**
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
```

**✅ Good:**
```tsx
<div className="bg-primary-600 text-white p-4 rounded-xl">
```

### Use Design System Components

**❌ Bad:**
```
Create a button with blue background and white text
```

**✅ Good:**
```
Use the Button component from design-system/components/Button
with variant="primary" and size="md"
```

### Specify Design Requirements

```
Design requirements:
- Colors: Use primary-600 for main actions
- Spacing: Use spacing scale (4, 8, 12, 16, 24, 32)
- Borders: Use rounded-xl for cards, rounded-lg for buttons
- Typography: Use font-sans, text-base for body
- Shadows: Use shadow-lg for elevated elements
- Transitions: Use transition-colors for hover states
```

---

## 🐛 Error Prevention

### 1. Type Safety

**Always specify types:**
```typescript
// ❌ Bad
function handleSubmit(data) {
  // ...
}

// ✅ Good
interface FormData {
  email: string;
  password: string;
}

function handleSubmit(data: FormData): Promise<void> {
  // ...
}
```

### 2. Validation

**Request validation for all inputs:**
```
Add validation:
- Email: valid email format
- Password: min 8 chars, 1 uppercase, 1 number
- Name: 2-50 characters
- Use zod for schema validation
- Show errors inline
```

### 3. Error Handling

**Specify error handling:**
```
Error handling:
- API errors: Show toast notification
- Validation errors: Show inline below field
- Network errors: Show retry button
- 401 errors: Redirect to login
- 500 errors: Show generic error message
```

### 4. Edge Cases

**List edge cases:**
```
Handle edge cases:
- Empty state: Show "No data" message
- Loading state: Show skeleton
- Error state: Show error message with retry
- No internet: Show offline indicator
- Slow connection: Show loading indicator after 1s
```

---

## 📝 Documentation Requirements

### Component Documentation

**Request documentation:**
```
Add JSDoc comments:
- Component purpose
- Props description
- Usage example
- Related components
```

**Example:**
```typescript
/**
 * User profile card component
 * 
 * Displays user information in a card format with optional edit mode.
 * 
 * @example
 * ```tsx
 * <ProfileCard 
 *   user={user} 
 *   editable 
 *   onSave={handleSave} 
 * />
 * ```
 * 
 * @see {@link ProfileEdit} for edit mode
 * @see {@link useProfile} for profile data management
 */
```

### Function Documentation

```typescript
/**
 * Validates user profile data
 * 
 * @param data - Profile data to validate
 * @returns Validation result with errors if any
 * @throws {ValidationError} If data structure is invalid
 * 
 * @example
 * ```typescript
 * const result = validateProfile(profileData);
 * if (!result.valid) {
 *   console.error(result.errors);
 * }
 * ```
 */
```

---

## 🔍 Code Review with AI

### Self-Review Prompt

```
Review this code for:

1. Consistency
   - Does it follow patterns in [reference file]?
   - Are naming conventions consistent?
   - Is the structure similar to existing features?

2. Correctness
   - Are there any logical errors?
   - Are edge cases handled?
   - Is error handling complete?

3. Performance
   - Are there unnecessary re-renders?
   - Should anything be memoized?
   - Are there expensive operations in render?

4. Security
   - Is user input validated?
   - Are there any XSS vulnerabilities?
   - Is sensitive data handled properly?

5. Accessibility
   - Are ARIA labels present?
   - Is keyboard navigation supported?
   - Is color contrast sufficient?

6. Testing
   - What test cases are needed?
   - Are there any untested paths?
   - Should we add integration tests?
```

### Refactoring Prompt

```
Refactor this code to:
- Reduce complexity (current: [X], target: <10)
- Extract reusable logic to hooks
- Improve readability
- Follow DRY principle
- Maintain existing functionality
- Keep file under 200 lines

Reference style: [existing file]
```

---

## 🧪 Testing with AI

### Test Generation Prompt

```
Generate tests for [ComponentName]:

Test cases:
1. Renders correctly with default props
2. Renders correctly with all props
3. Handles user interactions (click, input, etc.)
4. Shows loading state
5. Shows error state
6. Handles edge cases (empty data, null, undefined)
7. Calls callbacks with correct arguments
8. Updates state correctly

Use:
- @testing-library/react
- vitest
- Follow pattern from [reference test file]
```

### Test Review Prompt

```
Review these tests:
- [ ] All user interactions covered?
- [ ] Edge cases tested?
- [ ] Error states tested?
- [ ] Async operations handled?
- [ ] Mocks used appropriately?
- [ ] Test names descriptive?
- [ ] Assertions meaningful?
```

---

## 🔄 Refactoring with AI

### When to Refactor

**Triggers:**
- File exceeds 200 lines
- Function complexity > 10
- Duplicate code appears
- Tests become difficult
- Context is lost

### Refactoring Prompt

```
This file has grown too large (current: 350 lines).

Refactor into:
1. [ComponentName].tsx (main component, <150 lines)
2. [ComponentName].hooks.ts (custom hooks)
3. [ComponentName].utils.ts (helper functions)
4. [ComponentName].types.ts (type definitions)

Maintain:
- All existing functionality
- Current API/props
- Test coverage
- Performance characteristics

Reference structure: [similar feature]
```

---

## 📊 Monitoring AI Effectiveness

### Quality Metrics

Track these metrics:

1. **First-Time Correctness**
   - % of AI code that works without modification
   - Target: >80%

2. **Context Retention**
   - AI correctly references existing files
   - Target: >90%

3. **Convention Adherence**
   - AI follows project patterns
   - Target: >95%

4. **Error Rate**
   - Bugs introduced by AI code
   - Target: <5%

### Improvement Actions

**If metrics decline:**

1. **Update Context Documents**
   - Refresh CONTEXT.md files
   - Add more examples
   - Document new patterns

2. **Improve Prompts**
   - Be more specific
   - Add more references
   - Include constraints

3. **Refactor Complex Areas**
   - Simplify architecture
   - Reduce dependencies
   - Improve naming

---

## 🎓 Learning from AI

### Extract Patterns

When AI generates good code:

1. **Document the Pattern**
```markdown
## Pattern: Form with Validation

AI generated excellent form validation pattern in LoginForm.tsx.

Key elements:
- Zod schema for validation
- useForm hook for state
- Inline error display
- Accessible error messages

Use this pattern for all forms.
```

2. **Create Template**
```typescript
// templates/form-component.template.tsx
// Copy AI-generated pattern for reuse
```

3. **Update Guidelines**
```markdown
Add to DEVELOPMENT-STANDARDS.md:
- Form validation pattern
- Error handling approach
- Accessibility requirements
```

---

## 🚨 Common Pitfalls

### 1. Vague Requirements

**❌ Problem:**
```
Add error handling
```

**✅ Solution:**
```
Add error handling:
- Try-catch around API calls
- Show toast notification on error
- Log errors to console in development
- Send to error tracking in production
- Display user-friendly message
- Provide retry option
```

### 2. Missing Context

**❌ Problem:**
```
Create a dashboard component
```

**✅ Solution:**
```
Create dashboard component:
- Location: src/features/dashboard/components/Dashboard.tsx
- Reference: src/features/analytics/components/AnalyticsView.tsx
- Use: Card, Chart from shared/components
- Data: useAnalytics hook
- Layout: 2-column grid on desktop, 1-column on mobile
- Sections: Overview, Recent Activity, Quick Actions
```

### 3. No Validation Step

**❌ Problem:**
```
[Accept AI code without review]
```

**✅ Solution:**
```
After AI generates code:
1. Read through entire implementation
2. Check against requirements
3. Verify imports and dependencies
4. Run type-check and lint
5. Test manually
6. Run automated tests
7. Only then commit
```

### 4. Large Changes

**❌ Problem:**
```
Rewrite the entire authentication system
```

**✅ Solution:**
```
Break into steps:
1. Update types
2. Refactor API service
3. Update login component
4. Update register component
5. Update password reset
6. Update tests
7. Integration testing

Do one step at a time, test after each.
```

---

## 📚 Prompt Library

### Component Creation

```
Create [ComponentName] component:

Location: [exact path]
Purpose: [one sentence]
Reference: [similar component]

Props:
- [prop]: [type] - [description]

Features:
- [list features]

Design:
- Use design system tokens
- Follow [reference] layout
- Responsive: [breakpoint behavior]

Validation:
- [validation rules]

Error Handling:
- [error scenarios]

Accessibility:
- [ARIA requirements]

Tests:
- [test scenarios]
```

### Hook Creation

```
Create [hookName] hook:

Location: [exact path]
Purpose: [one sentence]
Reference: [similar hook]

Parameters:
- [param]: [type] - [description]

Returns:
- [return value]: [type] - [description]

Side Effects:
- [list side effects]

Dependencies:
- [list dependencies]

Error Handling:
- [error scenarios]

Tests:
- [test scenarios]
```

### API Service

```
Create [serviceName] API service:

Location: [exact path]
Purpose: [one sentence]
Reference: [similar service]

Endpoints:
- GET [endpoint] - [description]
- POST [endpoint] - [description]

Types:
- Request: [type]
- Response: [type]

Error Handling:
- [error scenarios]

Tests:
- [test scenarios]
```

---

## ✅ Success Checklist

Before considering a task complete:

- [ ] Code follows project conventions
- [ ] All files under 200 lines
- [ ] TypeScript strict mode passes
- [ ] Linting passes
- [ ] Tests pass
- [ ] Manual testing complete
- [ ] Documentation updated
- [ ] CONTEXT.md updated
- [ ] No console errors
- [ ] No console warnings
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Performance acceptable
- [ ] Error handling complete
- [ ] Edge cases handled
- [ ] Code reviewed
- [ ] Committed with clear message

---

## 🔄 Continuous Improvement

### Weekly Review

1. **Review AI-generated code quality**
   - What worked well?
   - What needed correction?
   - What patterns emerged?

2. **Update documentation**
   - Add new patterns
   - Update examples
   - Clarify ambiguous sections

3. **Refine prompts**
   - Improve clarity
   - Add more context
   - Include better examples

### Monthly Audit

1. **Architecture review**
   - Is structure still optimal?
   - Are boundaries clear?
   - Is context manageable?

2. **Pattern consolidation**
   - Extract common patterns
   - Create templates
   - Update guidelines

3. **Metrics analysis**
   - Review quality metrics
   - Identify improvement areas
   - Adjust processes

---

**Last Updated:** 2024-11-24  
**Version:** 1.0  
**Status:** Active
