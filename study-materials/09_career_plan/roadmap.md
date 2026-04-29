# 🚀 Karki S's Career Mentorship Roadmap
## Personalized Tech Stack Learning Guide & Job Placement Strategy

> [!IMPORTANT]
> This document is your **single source of truth** for career growth. It's based on an analysis of your current skills, projects, and the 2026 job market. Follow it step-by-step.

---

## 📊 Your Current Profile Assessment

### ✅ What You Already Have (Strengths)

| Domain | Skills Demonstrated | Evidence |
|---|---|---|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Framer Motion, Recharts, React Flow | Portfolio site, Zenith Trading Terminal (11-page dashboard) |
| **Backend** | FastAPI, Python 3.12, Pydantic, Uvicorn | Zenith Intelligence Engine |
| **AI/ML** | XGBoost, Feature Engineering, Pandas, Scikit-learn | 57-feature ML pipeline, production AI signals |
| **Automation** | n8n, Node.js, Webhooks, REST APIs, Cron scheduling | 24-node trading bot, Exit Order Monitor |
| **Data** | Google Sheets API, JSON pipelines, ETL, Time-series | Real-time telemetry logging, data normalization |
| **APIs** | Angel One API, Telegram API, REST architecture | Live broker integration, automated alerts |
| **DevOps (Basic)** | Git/GitHub, Vite build pipeline | Multiple GitHub repos, portfolio deployment |

### ⚠️ Critical Gaps for Job Placement

| Gap | Why It Matters | Priority |
|---|---|---|
| **SQL / Relational Databases** | 90% of job listings require SQL. Google Sheets ≠ Database | 🔴 P0 |
| **Docker & Containerization** | Standard for deploying any backend. Expected in ALL backend/fullstack roles | 🔴 P0 |
| **Testing (Unit, Integration, E2E)** | No tests = instant red flag for employers. Shows professional maturity | 🔴 P0 |
| **System Design Knowledge** | Required for mid-level+ interviews. You build systems but need to articulate patterns | 🟡 P1 |
| **CI/CD Pipelines** | GitHub Actions / Jenkins — standard expectation for deployment | 🟡 P1 |
| **Cloud Platform (AWS/GCP/Azure)** | Even basic deployment knowledge is expected. Local-only projects raise concerns | 🟡 P1 |
| **Authentication & Security** | JWT, OAuth2, CORS — missing from all your projects | 🟡 P1 |
| **State Management (Advanced)** | Zustand/Redux for complex React apps | 🟢 P2 |
| **Message Queues** | RabbitMQ/Redis for async processing | 🟢 P2 |

---

## 🎯 Target Job Roles (Best Fit for You)

Based on your skill profile, here are the roles you should target, ranked by fit:

### 1. 🥇 **Full Stack Developer (React + Python/Node.js)** — BEST FIT
- **Why:** Your strongest combination. React frontend + FastAPI/Node.js backend
- **Salary Range (India):** ₹6-18 LPA (fresher-2yr exp range)
- **Companies:** Product startups, fintech companies, SaaS platforms
- **What they'll ask:** React hooks, REST API design, SQL queries, system design basics

### 2. 🥈 **Backend Developer (Python/Node.js)**
- **Why:** Your FastAPI + automation experience is strong
- **Salary Range (India):** ₹5-15 LPA
- **Companies:** Fintech, data companies, API-first companies
- **What they'll ask:** API design, database modeling, authentication, Docker

### 3. 🥉 **Automation / DevOps Engineer**
- **Why:** Your n8n workflow expertise is unique and valuable
- **Salary Range (India):** ₹6-20 LPA
- **Companies:** IT services, SaaS companies, enterprise automation teams
- **What they'll ask:** Workflow design, CI/CD, Docker, cloud basics, scripting

### 4. 🏅 **AI/ML Engineer (Junior/Associate)**
- **Why:** You have real ML in production, but need deeper theory
- **Salary Range (India):** ₹8-20 LPA
- **Companies:** AI startups, quantitative finance firms
- **What they'll ask:** ML algorithms from scratch, math (linear algebra, statistics), model evaluation

---

## 📚 Phase-by-Phase Learning Plan

> [!TIP]
> Each phase builds on the previous. **Do NOT skip phases.** The timeline assumes 4-6 hours of daily study.

---

### Phase 1: Fill Critical Gaps (Weeks 1-4)
**Goal:** Close the P0 gaps that will get your resume rejected

#### 1.1 SQL & Databases (Week 1-2)

**What to Learn:**
- SQL fundamentals: SELECT, JOIN, GROUP BY, subqueries, indexes
- PostgreSQL setup and usage
- Database design: normalization (1NF, 2NF, 3NF), relationships, ERD diagrams
- ORM basics: SQLAlchemy (Python) or Prisma (Node.js)

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| SQLBolt | [sqlbolt.com](https://sqlbolt.com) | Interactive | 4-6 hrs |
| PostgreSQL Tutorial | [postgresqltutorial.com](https://www.postgresqltutorial.com) | Tutorial | 8-10 hrs |
| Mode Analytics SQL | [mode.com/sql-tutorial](https://mode.com/sql-tutorial) | Practice | 5-8 hrs |
| LeetCode SQL 50 | [leetcode.com/studyplan/top-sql-50](https://leetcode.com/studyplan/top-sql-50) | Problems | 10-15 hrs |

**Practice Project:**
> Rebuild your Google Sheets logging in the Zenith system to use PostgreSQL instead. Create tables for `trades`, `signals`, `telemetry_logs`. Write queries to analyze your trading performance.

**Milestone Checklist:**
- [ ] Can write complex JOINs across 3+ tables
- [ ] Can design a normalized database schema from requirements
- [ ] Can explain indexing and query optimization
- [ ] Completed at least 30 of the LeetCode SQL 50

---

#### 1.2 Docker & Containerization (Week 2-3)

**What to Learn:**
- Docker fundamentals: images, containers, volumes, networks
- Writing Dockerfiles for Python and Node.js apps
- Docker Compose for multi-service apps
- Container registries (Docker Hub)

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| Docker Official Getting Started | [docs.docker.com/get-started](https://docs.docker.com/get-started) | Docs | 4-6 hrs |
| TechWorld with Nana (Docker) | YouTube | Video | 3 hrs |
| Docker Compose Tutorial | [docs.docker.com/compose](https://docs.docker.com/compose/gettingstarted/) | Hands-on | 3-4 hrs |

**Practice Project:**
> Dockerize your Zenith Intelligence Engine (FastAPI). Create a `docker-compose.yml` that spins up:
> 1. FastAPI app container
> 2. PostgreSQL database container
> 3. Redis container (for caching)
>
> This single project teaches you Docker, Compose, and multi-service architecture.

**Milestone Checklist:**
- [ ] Can write a Dockerfile from scratch
- [ ] Can explain layers, caching, and multi-stage builds
- [ ] Can run a multi-container app with Docker Compose
- [ ] Have deployed at least one project via Docker

---

#### 1.3 Testing Fundamentals (Week 3-4)

**What to Learn:**
- **Python:** pytest, unittest, mocking
- **JavaScript/TypeScript:** Vitest (since you use Vite), React Testing Library
- Test types: Unit, Integration, E2E
- TDD basics and test coverage

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| pytest Documentation | [docs.pytest.org](https://docs.pytest.org) | Docs | 4-6 hrs |
| Vitest Guide | [vitest.dev/guide](https://vitest.dev/guide/) | Docs | 3-4 hrs |
| React Testing Library | [testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro/) | Docs | 4-5 hrs |
| Kent C. Dodds Testing Blog | [kentcdodds.com](https://kentcdodds.com/blog/testing) | Articles | 2-3 hrs |

**Practice Project:**
> Add tests to your Zenith Intelligence Engine:
> - Unit tests for the 57-feature preprocessor
> - Integration tests for the `/predict` endpoint
> - Add test coverage reporting (>80% target)
>
> Add tests to your Portfolio:
> - Component tests for ProjectCard, TerminalPanel
> - Route testing with React Router

**Milestone Checklist:**
- [ ] Can write unit tests with pytest (Python) and Vitest (TypeScript)
- [ ] Can mock external dependencies (APIs, databases)
- [ ] Can set up CI test runs (ties into Phase 2)
- [ ] Have >80% test coverage on at least one project

---

### Phase 2: Level Up Your Stack (Weeks 5-8)
**Goal:** Add job-essential skills that differentiate you from other candidates

#### 2.1 Authentication & Security (Week 5)

**What to Learn:**
- JWT (JSON Web Tokens) — how they work, access/refresh tokens
- OAuth 2.0 flow (Google, GitHub login)
- Password hashing (bcrypt)
- CORS, CSRF, rate limiting
- Environment variables and secrets management

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| JWT.io Introduction | [jwt.io/introduction](https://jwt.io/introduction) | Docs | 2 hrs |
| FastAPI Security Docs | [fastapi.tiangolo.com/tutorial/security](https://fastapi.tiangolo.com/tutorial/security/) | Tutorial | 4-6 hrs |
| OAuth 2.0 Simplified | [aaronparecki.com/oauth-2-simplified](https://aaronparecki.com/oauth-2-simplified/) | Article | 2-3 hrs |

**Practice Project:**
> Add authentication to your FastAPI Zenith Engine:
> - User registration + login with hashed passwords
> - JWT-based route protection for `/predict`
> - Role-based access (admin vs. viewer)

---

#### 2.2 CI/CD Pipelines (Week 5-6)

**What to Learn:**
- GitHub Actions fundamentals
- Automated testing on push/PR
- Automated deployment (to cloud or Vercel/Railway)
- Environment secrets in CI

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| GitHub Actions Docs | [docs.github.com/en/actions](https://docs.github.com/en/actions) | Docs | 4-6 hrs |
| GitHub Actions Quickstart | [docs.github.com/en/actions/quickstart](https://docs.github.com/en/actions/quickstart) | Hands-on | 2 hrs |
| Fireship CI/CD in 100 Seconds | YouTube | Video | 5 min |

**Practice Project:**
> Set up GitHub Actions for your Portfolio repo:
> - Run lint + type-check on every PR
> - Run tests on every push to `main`
> - Auto-deploy to Vercel on merge to `main`

---

#### 2.3 Cloud Basics — AWS or GCP (Week 6-8)

**What to Learn:**
- **Start with ONE cloud provider** (AWS recommended — most job listings)
- Core services: EC2, S3, RDS, Lambda, IAM
- Deploy a FastAPI app to AWS (EC2 or Lambda + API Gateway)
- Basic networking: VPC, Security Groups

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| AWS Free Tier | [aws.amazon.com/free](https://aws.amazon.com/free/) | Platform | — |
| AWS Cloud Practitioner Path | [aws.amazon.com/training](https://aws.amazon.com/training/learn-about/cloud-practitioner/) | Course | 15-20 hrs |
| FreeCodeCamp AWS Tutorial | YouTube (search "AWS Full Course FreeCodeCamp") | Video | 5-6 hrs |

**Practice Project:**
> Deploy your Zenith Intelligence Engine to AWS:
> 1. PostgreSQL on RDS
> 2. FastAPI on EC2 (or ECS with Docker)
> 3. Frontend on S3 + CloudFront
> 4. Set up a domain name

**Milestone Checklist:**
- [ ] Have at least one project deployed to a cloud platform
- [ ] Can explain basic cloud architecture (compute, storage, database, CDN)
- [ ] Can set up CI/CD that deploys to cloud automatically

---

#### 2.4 System Design Fundamentals (Week 7-8)

**What to Learn:**
- Load balancing, caching, CDNs
- Database scaling (read replicas, sharding)
- Monolith vs Microservices
- Message queues (RabbitMQ, Redis)
- CAP theorem, consistency vs availability
- API design patterns (REST best practices, pagination, versioning)

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| System Design Primer | [github.com/donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | GitHub | 20+ hrs |
| ByteByteGo | YouTube Channel | Videos | Ongoing |
| Designing Data-Intensive Applications (Book) | — | Book | Long-term |

> [!TIP]
> You already HAVE a real system (Zenith) with multiple services. Use it as your mental model when studying system design. When they ask "how would you design X?", think about how your FastAPI ↔ n8n ↔ React architecture works.

---

### Phase 3: Build a "Hire Me" Project (Weeks 9-12)
**Goal:** Create ONE killer project that demonstrates ALL your skills combined

> [!IMPORTANT]
> Employers don't care about 10 small projects. They care about 1-2 DEEP projects that show you can build production-grade software.

#### The Project: **"Zenith Pro" — A Cloud-Deployed, Full-Stack Trading Intelligence Platform**

Evolve your existing Zenith system into a polished, deployable, full-stack application:

| Layer | Technology | What It Demonstrates |
|---|---|---|
| **Frontend** | React 18 + TypeScript + TailwindCSS | Component architecture, state management, responsive design |
| **Backend API** | FastAPI + PostgreSQL + SQLAlchemy | REST API design, database modeling, ORM, migrations |
| **AI/ML** | XGBoost model + feature pipeline | Production ML, model serving, monitoring |
| **Authentication** | JWT + OAuth2 (Google login) | Security best practices |
| **Infrastructure** | Docker + Docker Compose | Containerization |
| **Cloud** | AWS EC2/ECS + RDS + S3 | Cloud deployment |
| **CI/CD** | GitHub Actions | Automated testing + deployment |
| **Testing** | pytest + Vitest + 80%+ coverage | Professional code quality |
| **Monitoring** | Basic health checks + logging | Production readiness |
| **Documentation** | README, API docs (Swagger), architecture diagrams | Communication skills |

**This single project checks EVERY box on a Full Stack Developer job listing.**

---

### Phase 4: Interview Preparation (Weeks 10-14)
**Goal:** Be able to pass technical interviews consistently

#### 4.1 Data Structures & Algorithms (DSA)

> [!WARNING]
> This is non-negotiable for Indian tech interviews. Even for full-stack roles, most companies ask DSA questions. Start early and practice daily.

**What to Focus On (Priority Order):**

1. **Arrays & Strings** — Two pointers, sliding window, prefix sums
2. **Hash Maps & Sets** — Frequency counting, lookup optimization
3. **Linked Lists** — Reversal, cycle detection, merge
4. **Stacks & Queues** — Monotonic stack, BFS
5. **Trees & BST** — Traversals, LCA, validate BST
6. **Graphs** — BFS, DFS, topological sort
7. **Dynamic Programming** — Top-down (memoization), bottom-up (tabulation)
8. **Sorting & Searching** — Binary search patterns, merge sort

**Free Resources:**
| Resource | Link | Type | Time |
|---|---|---|---|
| NeetCode 150 | [neetcode.io](https://neetcode.io) | Problem Set | 50-100 hrs |
| Striver's A2Z DSA Sheet | [takeuforward.org/strivers-a2z-dsa-course](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2) | Problem Set | 100+ hrs |
| LeetCode (Easy → Medium) | [leetcode.com](https://leetcode.com) | Practice | Ongoing |
| Abdul Bari (Algorithms) | YouTube | Videos | 20+ hrs |

**Daily Practice Schedule:**
- **Week 1-2:** 2 Easy problems/day (Arrays, Strings, HashMaps)
- **Week 3-4:** 1 Easy + 1 Medium/day (Stacks, Trees)
- **Week 5-6:** 2 Medium problems/day (Graphs, DP)
- **Ongoing:** 1-2 problems/day minimum

**Milestone Checklist:**
- [ ] Solved 100+ LeetCode problems (70 Easy, 30 Medium)
- [ ] Can solve most Easy problems in <15 minutes
- [ ] Can solve Medium problems in <30 minutes
- [ ] Comfortable with top 5 patterns (sliding window, two pointers, BFS/DFS, binary search, DP basics)

---

#### 4.2 Technical Interview Topics

**For Full Stack Developer Roles:**

| Topic | Key Questions to Prepare |
|---|---|
| **React** | Virtual DOM, hooks lifecycle, custom hooks, memo/useCallback, Context vs State management, SSR vs CSR |
| **TypeScript** | Generics, utility types, type guards, interface vs type, discriminated unions |
| **Node.js/Python** | Event loop, async/await, middleware, error handling patterns |
| **REST API** | HTTP methods, status codes, idempotency, pagination, versioning, rate limiting |
| **SQL** | JOINs, subqueries, window functions, indexes, EXPLAIN ANALYZE, transactions |
| **Database** | ACID, normalization, indexing strategies, N+1 problem, connection pooling |
| **Docker** | Layers, multi-stage builds, volumes, networking, Compose |
| **Git** | Branching strategies, rebase vs merge, cherry-pick, conflict resolution |
| **System Design** | URL shortener, rate limiter, chat system, notification service |
| **Security** | JWT flow, OAuth2, XSS, CSRF, SQL injection, CORS |

---

#### 4.3 Behavioral Interview Preparation

**STAR Method (Situation → Task → Action → Result)**

Prepare stories for these common questions using YOUR real projects:

| Question | Your Story (from your projects) |
|---|---|
| "Tell me about a complex system you built" | Zenith: 3-layer architecture (FastAPI + React + n8n), 57 features, <50ms latency |
| "Describe a technical challenge you overcame" | Debugging the n8n trading bot nodes, fixing order placement and SL/Target calculation issues |
| "How do you handle production failures?" | Exit Order Monitor: automated reconciliation, dead-letter queues, Telegram alerts |
| "Tell me about a time you learned something new" | Going from n8n JavaScript (v3) to Python AI Microservice (v4) — complete paradigm shift |
| "How do you approach code quality?" | Feature engineering pipeline with [-1, +1] normalization, dual-brain safety architecture |

---

### Phase 5: Job Application Strategy (Weeks 12-16)
**Goal:** Get 3-5 interviews per week

#### 5.1 Resume Optimization

Your resume should follow this structure:

```
┌─────────────────────────────────────────┐
│  KARKI   s                  │
│  Full Stack Developer | AI Systems      │
│  📧 email | 📱 phone | 🔗 portfolio    │
│  🐙 github.com/karkis23                │
├─────────────────────────────────────────┤
│  TECHNICAL SKILLS                       │
│  Languages: Python, TypeScript, JS, SQL │
│  Frontend: React 18, Vite, TailwindCSS  │
│  Backend: FastAPI, Node.js, Express     │
│  Database: PostgreSQL, Redis            │
│  AI/ML: XGBoost, Pandas, Scikit-learn   │
│  DevOps: Docker, GitHub Actions, AWS    │
│  Tools: Git, n8n, Postman              │
├─────────────────────────────────────────┤
│  PROJECTS (2-3, detailed)               │
│  • Zenith Trading Platform              │
│  • Silent Money                         │
│  • Portfolio Website                    │
├─────────────────────────────────────────┤
│  EDUCATION                              │
├─────────────────────────────────────────┤
│  CERTIFICATIONS (if any)                │
└─────────────────────────────────────────┘
```

> [!TIP]
> **Action verb every bullet point.** Not "Responsible for building..." but "Engineered a 57-feature ML pipeline processing real-time market data at <50ms latency."

---

#### 5.2 Application Channels

| Channel | Strategy | Expected Response Rate |
|---|---|---|
| **LinkedIn** | Set to "Open to Work", connect with hiring managers, post about your projects weekly | 5-10% |
| **Naukri.com** | Upload updated resume, apply daily to 5-10 roles | 3-5% |
| **AngelList/Wellfound** | Focus on startup roles — they value project depth over degrees | 8-15% |
| **Company Career Pages** | Target specific companies you admire | 5-8% |
| **Referrals** | Best conversion rate. Network on LinkedIn, attend meetups | 20-40% |
| **Unstop / HackerEarth** | Hiring challenges and hackathons | Variable |

#### 5.3 Companies to Target (India — Aligned with Your Skills)

| Company Type | Examples | Why |
|---|---|---|
| **Fintech Startups** | Zerodha, Groww, Smallcase, Dhan, AngelOne | Your trading/finance domain knowledge is a huge advantage |
| **AI/ML Startups** | Fractal, Sigmoid, Tiger Analytics | Your production ML experience stands out |
| **SaaS Product Companies** | Freshworks, Zoho, Chargebee, CleverTap | Full-stack roles with good growth |
| **Automation/DevOps** | Hasura, Postman, BrowserStack | Your automation expertise is highly relevant |
| **Remote-First** | Turing, Toptal, Remote.com | Higher pay, global exposure |

---

## 📅 Complete 16-Week Timeline

```
Week 1-2   ████████░░░░░░░░  SQL & Databases
Week 2-3   ░░████████░░░░░░  Docker & Containerization
Week 3-4   ░░░░████████░░░░  Testing (pytest + Vitest)
Week 5     ░░░░░░██████░░░░  Auth & Security
Week 5-6   ░░░░░░██████░░░░  CI/CD (GitHub Actions)
Week 6-8   ░░░░░░░░████████  Cloud (AWS Basics)
Week 7-8   ░░░░░░░░██████░░  System Design Fundamentals
Week 9-12  ░░░░░░░░░░██████  Build "Zenith Pro" Project
Week 10-14 ░░░░░░░░░░██████  DSA Practice (ongoing)
Week 12-14 ░░░░░░░░░░░░████  Interview Prep
Week 14-16 ░░░░░░░░░░░░░░██  Active Job Applications

⚡ DSA: Start from Week 5 onwards, 1-2 problems DAILY without fail
```

---

## 🎓 Recommended Certifications (Optional but Helpful)

| Certification | Platform | Cost | Value |
|---|---|---|---|
| AWS Cloud Practitioner | AWS | $100 (exam) | High — shows cloud competency |
| Meta Front-End Developer | Coursera | Free to audit | Resume boost |
| Google IT Automation with Python | Coursera | Free to audit | Validates your automation skills |
| HackerRank SQL (Basic + Intermediate) | HackerRank | Free | Quick credential |

---

## 📖 Daily Routine Template

```
┌──────────────────────────────────────────────┐
│  DAILY LEARNING SCHEDULE (4-6 hrs)           │
├──────────────────────────────────────────────┤
│  🌅 Morning (1.5 hrs)                       │
│     → DSA Problem Solving (1-2 problems)     │
│     → Review yesterday's solutions           │
│                                              │
│  🌤️ Afternoon (2 hrs)                       │
│     → Phase-specific learning (current topic)│
│     → Hands-on coding / project work         │
│                                              │
│  🌙 Evening (1.5 hrs)                       │
│     → Build/improve "Zenith Pro" project     │
│     → Write 1 LinkedIn post or blog article  │
│     → Review and commit code to GitHub       │
│                                              │
│  📝 Weekly                                   │
│     → 1 mock interview (Pramp.com — free)    │
│     → Update portfolio with new learnings    │
│     → Apply to 5-10 jobs                     │
└──────────────────────────────────────────────┘
```

---

## 🔑 Key Principles for Success

> [!CAUTION]
> **Common mistakes that delay job placement:**
> 1. ❌ Learning too many technologies at once (scattered focus)
> 2. ❌ Only watching tutorials without building (tutorial hell)
> 3. ❌ Skipping DSA practice ("I'll start next week")
> 4. ❌ Not applying until you feel "ready" (you'll never feel 100% ready)
> 5. ❌ Ignoring networking and LinkedIn presence
> 6. ❌ Not practicing speaking about your projects out loud

### ✅ Do This Instead:
1. **Build in public** — Push code to GitHub EVERY DAY. Green squares matter.
2. **Document everything** — Write READMEs, blog posts, and LinkedIn posts about what you learn
3. **Network actively** — Comment on 5 LinkedIn posts daily, DM 2-3 people weekly
4. **Apply early** — Start applying by Week 12, even if you don't feel "ready"
5. **Practice talking** — Record yourself explaining your projects. This is crucial for interviews.

---

## 📊 Progress Tracker

Use this to track your progress. Update weekly:

### Phase 1: Critical Gaps
- [ ] SQL: Completed SQLBolt + 30 LeetCode problems
- [ ] SQL: Built PostgreSQL schema for Zenith project
- [ ] Docker: Can write Dockerfile + Compose from scratch
- [ ] Docker: Dockerized at least one project
- [ ] Testing: Added tests to Zenith Engine (>80% coverage)
- [ ] Testing: Added tests to Portfolio (component tests)

### Phase 2: Level Up
- [ ] Auth: Implemented JWT auth in FastAPI
- [ ] CI/CD: Set up GitHub Actions for at least one repo
- [ ] Cloud: Deployed a project to AWS
- [ ] System Design: Read 10+ chapters of System Design Primer

### Phase 3: Kill Project
- [ ] "Zenith Pro" fully deployed with all layers
- [ ] Clean README with architecture diagram
- [ ] Live demo link working

### Phase 4: Interview Ready
- [ ] 100+ LeetCode problems solved
- [ ] 5 behavioral stories prepared (STAR format)
- [ ] 3+ mock interviews completed (Pramp)
- [ ] Can whiteboard system design for 30 minutes

### Phase 5: Applications
- [ ] Resume updated and reviewed
- [ ] LinkedIn optimized and active
- [ ] Applied to 50+ positions
- [ ] Secured 3+ interview calls

---

## 🆘 Getting Unstuck

If you're stuck at any point, here's what to do:

| Problem | Solution |
|---|---|
| Can't solve a DSA problem after 30 min | Look at the solution, understand it, re-solve from scratch next day |
| Confused about a concept | Search "[concept] for beginners" on YouTube, then try the official docs |
| Project isn't working | Break the problem into smaller pieces. Get ONE thing working at a time |
| No interview calls | Get resume reviewed (ask me), improve LinkedIn headline, increase application volume |
| Failing interviews | Do more mock interviews (Pramp), record yourself, identify weak topics |
| Losing motivation | Review how far you've come. Look at your GitHub graph. Talk to others on the same journey |

---

> [!NOTE]
> **Remember:** You already have a MASSIVE advantage over most fresh candidates. You've built a production AI trading system with real-world data, automated workflows, and a polished React dashboard. Most candidates have todo apps. **You have an AI trading engine.** The gap is only in a few standardized skills (SQL, Docker, Testing, Cloud) that are very learnable. Close those gaps, practice DSA, and you WILL get placed.

---

*This roadmap was created on March 19, 2026. It will be updated as you progress. Ask me anything at any point — I'm here throughout the journey.* 🚀
