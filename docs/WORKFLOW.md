# Workflow and Git Standards

## Branch Structure

Every project uses **Trunk-based development** with three main branches:

- **`dev`** - always the most current development branch
- **`staging`** - branch for completed features being tested
- **`main`** - production branch, this code is on the live site

⚠️ **IMPORTANT:** Never create other names for these three branches!

---

## Starting Work on a New Feature

### 1. Creating a Personal Branch

Always work in your own branch, never directly in `dev`, `staging`, or `main`.

```bash
# Make sure you're in the dev branch
git checkout dev

# Get the latest changes
git pull

# Create a personal branch (use your name or descriptive name)
git branch dev-yourname
# or
git branch feature/feature-name

# Switch to the new branch
git checkout dev-yourname
```

**Branch naming convention:**
- `dev-yourname` - for personal work
- `feature/feature-name` - for new functionality
- `fix/bug-description` - for bug fixes
- `hotfix/critical-fix` - for urgent fixes
- `refactor/component-name` - for refactoring

---

## Daily Work

### 2. Working in Your Personal Branch

During the day, work in your branch. At the end of the workday or when a feature is complete, you **MUST** commit.

### 3. Commit Process

```bash
# Check which files have changed
git status

# Add all files to the commit
git add -A

# Make a commit with a meaningful message
git commit -m "feat(component): added new functionality"

# Push changes to your branch
git push
```

For the first push of a new branch:
```bash
git push -u origin dev-yourname
```

---

## Commit Message Format

Follow this format for all commits:

```
<type>(<scope>): <short summary>
```

### Types:
- **feat** - new feature
- **fix** - bug fix
- **refactor** - code refactoring
- **docs** - documentation changes
- **style** - formatting, missing semicolons
- **test** - adding or fixing tests
- **perf** - performance improvement
- **build** - changes to build system
- **ci** - changes to CI configuration

### Examples:
```bash
git commit -m "feat(auth): added login functionality"
git commit -m "fix(header): fixed responsive layout"
git commit -m "refactor(api): optimized API calls"
git commit -m "docs(readme): updated installation section"
```

---

## Synchronizing with dev Branch

After committing to your own branch, synchronize with `dev` to get changes from others:

```bash
# Switch to dev branch
git checkout dev

# Get the latest changes
git pull

# Return to your branch
git checkout dev-yourname

# Merge changes from dev
git merge dev

# If there are conflicts, resolve them and commit
# Then push the changes
git push
```

---

## Merging Completed Features

When the feature is ready and tested:

### 1. Merge to dev

```bash
# Make sure you're synchronized with dev
git checkout dev
git pull

# Return to your personal branch
git checkout dev-yourname

# Merge dev into your personal branch (to ensure no conflicts)
git merge dev

# Switch to dev
git checkout dev

# Merge your personal branch into dev
git merge dev-yourname

# Push the changes
git push
```

### 2. Merge to staging (after testing in dev)

When everything is tested and has working functionality:

```bash
git checkout staging
git pull
git merge dev
git push
```

⚠️ **Staging is the beta version** - test here before production.

### 3. Merge to main (production)

**ONLY after client approval:**

```bash
git checkout main
git pull
git merge staging
git push
```

⚠️ **WARNING:** Never push directly to production without approval!

---

## Daily Workflow (Summary)

### Morning (start of work):
```bash
git checkout dev
git pull
git checkout dev-yourname
git merge dev
```

### During the day:
- Work in the `dev-yourname` branch
- Make small, meaningful commits

### Evening (end of workday):
```bash
# In your branch
git status
git add -A
git commit -m "feat(scope): description of changes"
git push

# Synchronize with dev
git checkout dev
git pull
git checkout dev-yourname
git merge dev
git push
```

---

## Important Rules

### ✅ DO:
- Always work in your own branch
- Commit at the end of each workday
- Use clear and descriptive commit messages
- Pull from dev before starting work
- Test locally before merging
- Resolve conflicts carefully

### ❌ DON'T:
- Never work directly in `dev`, `staging`, or `main`
- Don't commit `.env` files or sensitive data
- Don't force push without urgent need
- Don't merge without testing
- Don't overwrite others' changes without merging
- Don't delete Git history without agreement

---

## Resolving Conflicts

When there are conflicts during merge:

```bash
# Git will show which files have conflicts
git status

# Open the files and resolve the conflicts
# Look for markers: <<<<<<<, =======, >>>>>>>

# After resolving conflicts
git add .
git commit -m "fix: resolved merge conflicts"
git push
```

---

## Useful Commands

```bash
# View current branch and status
git status

# View all branches
git branch -a

# View recent commits
git log --oneline -10

# View changes before commit
git diff

# Undo changes in a file (before add)
git checkout -- filename

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# See who changed what
git blame filename

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

## Checklist Before Merging to staging/main

- [ ] Code is tested locally
- [ ] All tests pass
- [ ] No console.log or debug code
- [ ] Formatting is correct (npm run lint)
- [ ] `.env.example` is updated (if there are new variables)
- [ ] README is updated (if there are setup changes)
- [ ] Commit messages are clear and descriptive
- [ ] No conflicts with target branch
- [ ] Code follows project standards

---

## Questions and Issues

If you have questions or problems:
1. Check this documentation
2. Ask a team member
3. Don't assume - better to ask than to break something

**Remember:** Five minutes of documentation is better than half a day of guessing.
