# 📘 Complete CI/CD Guide
## GitHub Actions from Zero to Auto-Deploy

---

## Chapter 1: What is CI/CD?

### CI = Continuous Integration
Every time you push code, automated systems:
1. Run linters (check code style)
2. Run tests (verify code works)
3. Build the project (verify it compiles)

### CD = Continuous Deployment/Delivery
After CI passes:
1. **Continuous Delivery:** Auto-deploy to staging, manual approval for production
2. **Continuous Deployment:** Auto-deploy to production (full automation)

```
Developer pushes code
      ↓
  ┌───────────┐
  │   LINT    │ ← Check code style
  └─────┬─────┘
        ↓
  ┌───────────┐
  │   TEST    │ ← Run all tests
  └─────┬─────┘
        ↓
  ┌───────────┐
  │   BUILD   │ ← Create production build
  └─────┬─────┘
        ↓
  ┌───────────┐
  │  DEPLOY   │ ← Push to cloud/server
  └───────────┘
```

---

## Chapter 2: GitHub Actions Concepts

| Concept | Description |
|---|---|
| **Workflow** | An automated process defined in a YAML file |
| **Event (Trigger)** | What starts the workflow (push, PR, schedule) |
| **Job** | A set of steps that run on one machine |
| **Step** | A single task within a job |
| **Action** | A reusable unit of code (like a function) |
| **Runner** | The server that executes your workflow |

### File Location
```
your-repo/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Main CI pipeline
│       ├── deploy.yml       # Deployment pipeline
│       └── scheduled.yml    # Scheduled tasks
├── src/
└── ...
```

---

## Chapter 3: Your First Workflow

### 3.1 Python FastAPI CI Pipeline

```yaml
# .github/workflows/python-ci.yml
name: Python CI

# When to run
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    # Service containers (like Docker Compose for CI)
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      # Step 1: Check out the code
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Set up Python
      - name: Set up Python 3.12
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      # Step 3: Cache pip dependencies
      - name: Cache pip
        uses: actions/cache@v4
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
          restore-keys: |
            ${{ runner.os }}-pip-

      # Step 4: Install dependencies
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install pytest pytest-cov flake8 mypy

      # Step 5: Lint
      - name: Run linter (flake8)
        run: flake8 app/ --max-line-length=120 --statistics

      # Step 6: Type check
      - name: Run type checker (mypy)
        run: mypy app/ --ignore-missing-imports

      # Step 7: Run tests
      - name: Run tests with coverage
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
          SECRET_KEY: test-secret-key
        run: |
          pytest --cov=app --cov-report=xml --cov-report=term-missing

      # Step 8: Upload coverage report
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage.xml
```

### 3.2 React/Vite CI Pipeline

```yaml
# .github/workflows/frontend-ci.yml
name: Frontend CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-test-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npx tsc --noEmit

      - name: Run tests
        run: npm run test:run

      - name: Build production bundle
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

---

## Chapter 4: Multi-Job Workflows

```yaml
name: Full CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  # Job 1: Backend tests
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r backend/requirements.txt
      - run: pytest backend/tests/

  # Job 2: Frontend tests (runs in PARALLEL with backend)
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run test:run
      - run: cd frontend && npm run build

  # Job 3: Deploy (runs AFTER both test jobs pass)
  deploy:
    runs-on: ubuntu-latest
    needs: [backend-tests, frontend-tests]  # Wait for both
    if: github.ref == 'refs/heads/main'     # Only deploy from main branch
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: echo "Deploying to production..."
        # Add your actual deployment steps here
```

---

## Chapter 5: Auto-Deploy to Vercel

```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Setting up secrets:**
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

---

## Chapter 6: Deploy to AWS EC2

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: [backend-tests]  # Only after tests pass

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /home/ubuntu/zenith-api
            git pull origin main
            pip install -r requirements.txt
            sudo systemctl restart zenith-api
```

---

## Chapter 7: Branch Protection Rules

Set up rules so no one (including you) can push directly to `main`:

1. Go to repo → Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass (select your CI workflow)
   - ✅ Require branches to be up to date

**Workflow:**
```
feature-branch → Pull Request → CI runs → Review → Merge to main → CD deploys
```

---

## Chapter 8: Status Badges

Add a badge to your README showing CI status:

```markdown
# Zenith Intelligence Engine

![CI](https://github.com/karkis23/newsignalengine/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/karkis23/newsignalengine/actions/workflows/deploy.yml/badge.svg)

> Production-grade AI trading system...
```

This shows recruiters and hiring managers that your project has professional CI/CD.

---

*Set up CI for your portfolio repo TODAY. Even a simple lint + build check shows professionalism.* ⚡
