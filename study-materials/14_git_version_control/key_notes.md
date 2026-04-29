# 🗝️ Git — Key Notes (Cheat Sheet)

## Daily Workflow (5 Commands)
```bash
git status                          # 1. What changed?
git add .                           # 2. Stage everything
git commit -m "feat: add auth"      # 3. Save with message
git pull origin main                # 4. Get latest from team
git push origin main                # 5. Share your work
```

## Branching (4 Commands)
```bash
git checkout -b feature/auth        # Create + switch
git checkout main                   # Switch back to main
git merge feature/auth              # Merge feature → main
git branch -d feature/auth          # Delete merged branch
```

## Undoing Things
```bash
# Discard file changes (NOT committed yet)
git restore file.py

# Unstage a file (added but not committed)
git restore --staged file.py

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (DELETE changes) ⚠️
git reset --hard HEAD~1

# Safely undo a pushed commit (creates new commit)
git revert HEAD
```

## Stash (Save Work Temporarily)
```bash
git stash                           # Save current work
git stash pop                       # Restore saved work
git stash list                      # See all stashes
```

## Viewing History
```bash
git log --oneline -10               # Last 10 commits
git log --graph --oneline --all     # Visual branch graph
git diff                            # See uncommitted changes
git diff --staged                   # See staged changes
git blame file.py                   # Who wrote each line?
```

## Commit Message Format
```
type(scope): description

feat:     New feature
fix:      Bug fix
docs:     Documentation
test:     Add tests
refactor: Restructure code
chore:    Tooling/config
style:    Formatting
perf:     Performance
```

## .gitignore Essentials
```
node_modules/
__pycache__/
.env
dist/
coverage/
.DS_Store
*.pyc
```

## Merge Conflict Resolution
```bash
# 1. Git marks conflicts in files:
<<<<<<< HEAD
your code
=======
their code
>>>>>>> main

# 2. Edit file: keep correct code, remove markers
# 3. Stage and commit:
git add .
git commit -m "resolve: merge conflict in auth.py"
```

## Key Rules
1. **Commit often** — small, focused commits
2. **Pull before push** — always `git pull` first
3. **Never commit secrets** — use `.env` + `.gitignore`
4. **Write clear messages** — use conventional commits
5. **Branch for features** — never commit directly to main
6. **Push daily** — green GitHub squares matter!
