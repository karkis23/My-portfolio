# 📘 Git & Version Control — Complete Guide + Key Notes

---

## Chapter 1: Git Fundamentals

### Git Flow
```
Working Directory → Staging Area → Local Repository → Remote Repository
     (edit)          (git add)       (git commit)       (git push)
```

### Essential Commands

```bash
# ---- Setup ----
git config --global user.name "Karki S"
git config --global user.email "your@email.com"
git init                        # Initialize repo
git clone URL                   # Clone remote repo

# ---- Daily Workflow ----
git status                      # Check what's changed
git add .                       # Stage all changes
git add file.py                 # Stage specific file
git commit -m "feat: add signal prediction endpoint"
git push origin main            # Push to remote
git pull origin main            # Pull latest from remote

# ---- Branching ----
git branch                      # List branches
git branch feature/auth         # Create branch
git checkout feature/auth       # Switch to branch
git checkout -b feature/auth    # Create + switch (shortcut)
git switch feature/auth         # Modern switch command
git switch -c feature/auth      # Modern create + switch

# ---- Merging ----
git checkout main               # Switch to main
git merge feature/auth          # Merge feature into main
git branch -d feature/auth      # Delete merged branch

# ---- Viewing History ----
git log --oneline -10           # Last 10 commits (compact)
git log --graph --oneline       # Visual branch graph
git diff                        # See unstaged changes
git diff --staged               # See staged changes
git show abc123                 # See specific commit

# ---- Undoing Changes ----
git restore file.py             # Discard working directory changes
git restore --staged file.py    # Unstage a file
git reset --soft HEAD~1         # Undo last commit (keep changes staged)
git reset --hard HEAD~1         # Undo last commit (DELETE changes) ⚠️
git revert abc123               # Create new commit that undoes abc123

# ---- Stashing ----
git stash                       # Save uncommitted changes
git stash pop                   # Restore stashed changes
git stash list                  # List all stashes
git stash drop                  # Delete last stash
```

---

## Chapter 2: Git Branching Strategy

### Git Flow (Most Common)
```
main        ──●──────────────────●──────────── (production)
              │                  ↑
develop     ──●──●──●──●──●──●──● (integration)
                 │     │
feature/auth  ───●──●──●
feature/api   ──────●──●──●
```

### Branch Naming Convention
```
feature/add-auth        ← New feature
bugfix/fix-login-error  ← Bug fix
hotfix/security-patch   ← Urgent production fix
chore/update-deps       ← Maintenance work
docs/api-documentation  ← Documentation
refactor/cleanup-utils  ← Code refactoring
```

---

## Chapter 3: Commit Messages (Conventional Commits)

### Format
```
type(scope): short description

[optional body]

[optional footer]
```

### Types
| Type | When | Example |
|---|---|---|
| `feat` | New feature | `feat(api): add prediction endpoint` |
| `fix` | Bug fix | `fix(auth): handle expired token refresh` |
| `docs` | Documentation | `docs: update API README` |
| `style` | Formatting (no logic change) | `style: fix indentation in utils` |
| `refactor` | Code restructure (no feature/fix) | `refactor: extract auth middleware` |
| `test` | Add/update tests | `test: add signal service tests` |
| `chore` | Build/tooling | `chore: update Docker config` |
| `perf` | Performance improvement | `perf: cache prediction results` |

### Good vs Bad Commits
```bash
# ❌ BAD
git commit -m "fix"
git commit -m "update"
git commit -m "stuff"
git commit -m "changes"

# ✅ GOOD
git commit -m "feat(signals): add confidence threshold filter"
git commit -m "fix(auth): return 401 when JWT expires"
git commit -m "test(api): add integration tests for /predict endpoint"
git commit -m "docs: add Docker setup instructions to README"
```

---

## Chapter 4: Pull Requests (PR) Flow

```
1. Create feature branch:  git checkout -b feature/add-signals
2. Make changes + commits
3. Push branch:            git push origin feature/add-signals
4. Create PR on GitHub (base: main ← compare: feature/add-signals)
5. Code review (teammates review your code)
6. CI runs (tests, lint, build)
7. Approve + Merge
8. Delete branch
9. Pull latest main:       git pull origin main
```

### PR Description Template
```markdown
## What
Brief description of what this PR does.

## Why
Context on why this change is needed.

## How
Technical approach taken.

## Testing
- [ ] Unit tests added
- [ ] Manually tested locally
- [ ] CI pipeline passes

## Screenshots (if UI change)
```

---

## Chapter 5: .gitignore

```gitignore
# Python
__pycache__/
*.pyc
*.pyo
.env
venv/
.venv/
*.egg-info/
dist/
build/

# Node.js
node_modules/
dist/
.next/
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Secrets (NEVER commit these!)
.env
.env.local
.env.production
*.pem
*.key

# Docker
docker-compose.override.yml

# Logs
*.log
npm-debug.log*
```

---

## Chapter 6: Common Scenarios

### Resolve Merge Conflict
```bash
git pull origin main
# CONFLICT! Edit the files manually:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> main
# Remove markers, keep correct code
git add .
git commit -m "resolve merge conflict in signal.py"
```

### Undo a Pushed Commit
```bash
git revert HEAD            # Create a new commit that undoes the last one
git push origin main       # Push the revert (safe — preserves history)
```

### Create a Tag (for releases)
```bash
git tag v1.0.0
git push origin v1.0.0
```

### GitHub Daily Contribution
```
The green squares on your GitHub profile = DAILY COMMITS
Employers check this. Push at least 1 commit every day!
```

---

*Good Git hygiene (branching, commit messages, PRs) shows professionalism. Start using conventional commits TODAY.* 🌿
