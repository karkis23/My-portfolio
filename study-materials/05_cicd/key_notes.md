# 🗝️ CI/CD & GitHub Actions — Key Notes (Cheat Sheet)

## CI/CD in 30 Seconds
```
CI (Continuous Integration):   Push code → Auto lint → Auto test → Auto build
CD (Continuous Deployment):    After CI passes → Auto deploy to server
```

## GitHub Actions Structure
```
.github/workflows/ci.yml
    ↓
Workflow (ci.yml)
  └── Job (lint-test-build)
        └── Step 1: checkout code
        └── Step 2: setup python
        └── Step 3: install deps
        └── Step 4: run tests
```

## YAML Template — Copy-Paste Ready

### Python CI
```yaml
name: Python CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: pytest --cov=app -v
```

### React/Vite CI
```yaml
name: Frontend CI
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run test:run
      - run: npm run build
```

## Key Concepts
| Concept | Meaning |
|---|---|
| `on: push` | Triggered when code is pushed |
| `on: pull_request` | Triggered when PR is opened |
| `runs-on: ubuntu-latest` | Run on a free Ubuntu VM |
| `uses: actions/checkout@v4` | Download your repo code |
| `needs: [job1, job2]` | Wait for other jobs to finish |
| `if: github.ref == 'refs/heads/main'` | Only run on main branch |
| `secrets.MY_SECRET` | Access repo secrets securely |

## Add Status Badge to README
```markdown
![CI](https://github.com/USERNAME/REPO/actions/workflows/ci.yml/badge.svg)
```
