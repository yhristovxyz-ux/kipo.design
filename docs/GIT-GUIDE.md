# Git Quick Reference

## Core Concepts

### Three Main Branches
```
main (production) ← staging (beta) ← dev (development)
                                          ↑
                                    dev-yourname (your work)
```

---

## Quick Commands for Daily Work

### Start of Day
```bash
git checkout dev && git pull && git checkout dev-yourname && git merge dev
```

### End of Day
```bash
git status && git add -A && git commit -m "feat(scope): description" && git push
git checkout dev && git pull && git checkout dev-yourname && git merge dev && git push
```

---

## Complete Workflow Scenarios

### Scenario 1: Starting a New Feature

```bash
# 1. Go to dev and get latest changes
git checkout dev
git pull

# 2. Create new branch for the feature
git branch feature/new-feature
git checkout feature/new-feature

# Or in one command:
git checkout -b feature/new-feature

# 3. Start working...
```

### Scenario 2: Daily Commit

```bash
# 1. Check what you've changed
git status

# 2. See exact changes
git diff

# 3. Add files
git add -A
# Or selectively:
git add src/components/Header.tsx
git add src/styles/main.css

# 4. Make commit
git commit -m "feat(header): added new navigation menu"

# 5. Push to your branch
git push

# If first time:
git push -u origin feature/new-feature
```

### Scenario 3: Synchronizing with dev (getting changes from others)

```bash
# 1. Save current work (if there are unfinished changes)
git stash

# 2. Go to dev
git checkout dev

# 3. Get latest changes
git pull

# 4. Return to your branch
git checkout feature/new-feature

# 5. Merge changes from dev
git merge dev

# 6. If you had stash, restore changes
git stash pop

# 7. Push
git push
```

### Scenario 4: Merging Completed Feature to dev

```bash
# 1. Make sure you're synchronized
git checkout dev
git pull
git checkout feature/new-feature
git merge dev

# 2. Resolve conflicts if any
# (open files and edit)

# 3. If there were conflicts:
git add .
git commit -m "fix: resolved merge conflicts"

# 4. Test locally!
npm run dev
npm run lint

# 5. Merge to dev
git checkout dev
git merge feature/new-feature

# 6. Push
git push

# 7. (Optional) Delete old branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Scenario 5: Resolving Conflicts

```bash
# When there's a conflict during merge:
git merge dev
# Auto-merging src/App.tsx
# CONFLICT (content): Merge conflict in src/App.tsx

# 1. See which files have conflicts
git status

# 2. Open file and look for:
# <<<<<<< HEAD
# your code
# =======
# code from dev
# >>>>>>> dev

# 3. Edit the file - choose what to keep

# 4. Remove markers (<<<<, ====, >>>>)

# 5. Add the file
git add src/App.tsx

# 6. Complete the merge
git commit -m "fix: resolved conflicts in App.tsx"

# 7. Push
git push
```

### Scenario 6: Undoing Mistakes

```bash
# Undo changes in file (before add)
git checkout -- src/App.tsx

# Undo all changes (before add)
git checkout -- .

# Undo add (unstage)
git reset HEAD src/App.tsx

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Undo last commit (deletes changes) ⚠️
git reset --hard HEAD~1

# Change last commit message
git commit --amend -m "new message"
```

### Scenario 7: Working with Temporary Changes (stash)

```bash
# Save current changes temporarily
git stash

# Save with description
git stash save "work on header component"

# View all stashes
git stash list

# Restore last stash
git stash pop

# Restore specific stash
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

---

## Commit Messages - Examples

### Good Examples ✅
```bash
git commit -m "feat(auth): added registration form"
git commit -m "fix(header): fixed responsive layout on mobile devices"
git commit -m "refactor(api): optimized API calls with React Query"
git commit -m "docs(readme): added deployment instructions"
git commit -m "style(button): formatting according to project standards"
git commit -m "perf(images): added lazy loading for optimization"
git commit -m "test(auth): added unit tests for login functionality"
```

### Bad Examples ❌
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
git commit -m "work"
git commit -m "asdasd"
git commit -m "final version"
git commit -m "this should work now"
```

---

## Useful Git Commands

### Information
```bash
# View current status
git status

# View current branch
git branch

# View all branches (including remote)
git branch -a

# View last 10 commits
git log --oneline -10

# View commit tree graphically
git log --graph --oneline --all -20

# View changes in specific commit
git show commit-hash

# See who changed what in a file
git blame src/App.tsx

# View differences between branches
git diff dev..feature/new-feature
```

### Working with Branches
```bash
# Create new branch
git branch feature/new-feature

# Create and switch to new branch
git checkout -b feature/new-feature

# Switch to branch
git checkout dev

# Rename branch
git branch -m old-name new-name

# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature

# View remote branch
git remote -v
```

### Working with Changes
```bash
# View changes (unstaged)
git diff

# View changes (staged)
git diff --staged

# View changes in specific file
git diff src/App.tsx

# Add all files
git add -A

# Add specific file
git add src/App.tsx

# Add all .tsx files
git add src/**/*.tsx

# Remove file from staging
git reset HEAD src/App.tsx
```

### Synchronization
```bash
# Get changes from remote
git pull

# Get changes without merge
git fetch

# Push to remote
git push

# Push new branch
git push -u origin feature/new-feature

# Push with force (BE CAREFUL!) ⚠️
git push --force
```

---

## Common Problems and Solutions

### Problem: "Your branch is behind"
```bash
# Solution:
git pull
```

### Problem: "Your branch is ahead"
```bash
# Solution:
git push
```

### Problem: "Your branch has diverged"
```bash
# Solution 1 (recommended):
git pull --rebase
git push

# Solution 2:
git pull
# resolve conflicts
git push
```

### Problem: Accidentally committed to wrong branch
```bash
# 1. Save commit hash
git log --oneline -1

# 2. Undo commit
git reset --soft HEAD~1

# 3. Stash changes
git stash

# 4. Switch to correct branch
git checkout correct-branch

# 5. Restore changes
git stash pop

# 6. Commit again
git add -A
git commit -m "correct message"
```

### Problem: Merge conflict in many files
```bash
# If you want to abort the merge:
git merge --abort

# If you want to accept all changes from dev:
git checkout --theirs .
git add -A

# If you want to keep all your changes:
git checkout --ours .
git add -A
```

### Problem: Accidentally deleted file
```bash
# If you haven't committed:
git checkout -- deleted-file.tsx

# If you have committed:
git log -- deleted-file.tsx  # find last commit
git checkout commit-hash -- deleted-file.tsx
```

---

## Git Configuration

### Initial Setup
```bash
# Set name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main

# View all settings
git config --list
```

### Useful Aliases
```bash
# Add shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# Use them like this:
git st
git co dev
git br
git ci -m "message"
```

---

## Checklist Before Important Operations

### Before merge to dev:
- [ ] `git status` - no uncommitted changes
- [ ] `npm run lint` - code is formatted
- [ ] `npm run build` - project builds
- [ ] Local testing - everything works
- [ ] `git pull origin dev` - you have latest changes

### Before merge to staging:
- [ ] All above checks
- [ ] Code review from colleague
- [ ] All tests pass
- [ ] README is updated
- [ ] `.env.example` is updated

### Before merge to main:
- [ ] Client approval
- [ ] Tested on staging
- [ ] Production database backup (if applicable)
- [ ] Deployment plan is ready

---

## Additional Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Remember:** When you're not sure, ask! Better to lose 5 minutes asking than 5 hours fixing a mistake.
