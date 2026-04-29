# 📅 Week-by-Week Study Plan
## Detailed Daily Tasks & Milestones

> [!IMPORTANT]
> This is your day-by-day breakdown. Check off items as you complete them. Each week has specific deliverables that you MUST complete before moving on.

---

## 🔴 PHASE 1: FILL CRITICAL GAPS

---

### Week 1: SQL Fundamentals

| Day | Morning (1.5 hrs) | Afternoon (2 hrs) | Evening (1.5 hrs) |
|---|---|---|---|
| **Mon** | Complete SQLBolt Lessons 1-6 (SELECT, WHERE, Filtering) | Install PostgreSQL locally + pgAdmin | Write 3 CREATE TABLE statements for a mock "trading" database |
| **Tue** | SQLBolt Lessons 7-12 (JOINs, NULLs) | Practice JOIN queries on your trading tables | LeetCode SQL: #175, #181, #182 (Easy) |
| **Wed** | SQLBolt Lessons 13-18 (INSERT, UPDATE, DELETE, CREATE) | Add seed data to your trading database, write UPDATE/DELETE queries | LeetCode SQL: #183, #196, #197 (Easy) |
| **Thu** | PostgreSQL Tutorial: GROUP BY, HAVING, aggregate functions | Write analytics queries: "total P&L per month", "best performing signals" | LeetCode SQL: #595, #596, #620 (Easy) |
| **Fri** | PostgreSQL Tutorial: Subqueries and nested queries | Practice subqueries: "signals with above-average confidence" | LeetCode SQL: #1757, #584, #1141 (Easy) |
| **Sat** | PostgreSQL Tutorial: Window functions (ROW_NUMBER, RANK, LAG) | Build a view that shows running P&L with LAG comparison | Review all week's problems, re-solve any wrong ones |
| **Sun** | Review & consolidate. Write a blog post about what you learned | Design ERD for "Zenith Pro" database (draw on paper or use dbdiagram.io) | REST — recharge |

**Week 1 Deliverable:** Screenshot of your PostgreSQL database with 3+ tables and 5+ complex queries saved in a `.sql` file in your GitHub.

---

### Week 2: Advanced SQL + Docker Intro

| Day | Morning (1.5 hrs) | Afternoon (2 hrs) | Evening (1.5 hrs) |
|---|---|---|---|
| **Mon** | SQL: Indexes, EXPLAIN ANALYZE, query optimization | Practice optimizing slow queries with indexes | LeetCode SQL: #1148, #550, #1070 (Medium) |
| **Tue** | SQL: Transactions, ACID properties, isolation levels | Implement a transaction that locks during trade execution | LeetCode SQL: #180, #1164, #1174 (Medium) |
| **Wed** | SQLAlchemy ORM basics (for Python/FastAPI) | Connect SQLAlchemy to your PostgreSQL, create models | Rewrite one Zenith endpoint to use PostgreSQL instead of Google Sheets |
| **Thu** | Docker: Install Docker Desktop, understand images vs containers | Follow Docker Getting Started guide (Part 1-3) | Run `hello-world`, `nginx`, and `postgres` containers |
| **Fri** | Docker: Dockerfile syntax (FROM, RUN, COPY, CMD, EXPOSE) | Write a Dockerfile for a simple Python FastAPI app | Build and run your Dockerized FastAPI app |
| **Sat** | Docker: Volumes, persistent data, environment variables | Dockerize your Zenith Intelligence Engine | Push your Docker image to Docker Hub |
| **Sun** | Review week. Write about Docker learnings on LinkedIn | Consolidate: SQL + Docker notes | REST |

**Week 2 Deliverable:** Zenith Engine Dockerfile committed to GitHub + PostgreSQL integration for at least one endpoint.

---

### Week 3: Docker Compose + Testing Basics

| Day | Morning (1.5 hrs) | Afternoon (2 hrs) | Evening (1.5 hrs) |
|---|---|---|---|
| **Mon** | Docker Compose: syntax, services, networks, volumes | Write `docker-compose.yml` for FastAPI + PostgreSQL | Test that compose brings up both services correctly |
| **Tue** | Docker Compose: Add Redis service, configure depends_on | Implement basic Redis caching in your FastAPI app | Practice: `docker-compose up/down/logs/exec` commands |
| **Wed** | Docker: Multi-stage builds for production images | Optimize your Dockerfile with multi-stage build | Create a `.dockerignore` file, understand layer caching |
| **Thu** | Testing: Introduction to pytest, test structure, assertions | Install pytest, write first 5 unit tests for utility functions | Test your feature normalizer function with edge cases |
| **Fri** | Testing: Fixtures, parametrize, mocking with unittest.mock | Write tests for your Zenith preprocessor (mock market data) | Test the `/predict` endpoint with pytest + httpx |
| **Sat** | Testing: Test coverage with `pytest-cov`, aim for 60%+ | Add pytest to CI (prepare for Week 5 GitHub Actions) | Write a test for error cases (bad input, missing data) |
| **Sun** | Review. Update GitHub READMEs with Docker instructions | Blog/LinkedIn post: "How I Dockerized my AI Trading Engine" | REST |

**Week 3 Deliverable:** Working `docker-compose.yml` with 3 services + at least 10 pytest tests committed.

---

### Week 4: Frontend Testing + Consolidation

| Day | Morning (1.5 hrs) | Afternoon (2 hrs) | Evening (1.5 hrs) |
|---|---|---|---|
| **Mon** | Vitest: Setup in your Vite project, configuration | Write first component test for `ProjectCard` | Test `TerminalPanel` rendering with different data |
| **Tue** | React Testing Library: render, screen, fireEvent, waitFor | Test navigation (React Router testing patterns) | Test `HomePage` renders all sections |
| **Wed** | Testing: Mocking API calls in frontend tests | Test data fetching and error states | Write a snapshot test for a complex component |
| **Thu** | Review ALL Phase 1 topics: SQL, Docker, Testing | Fill any remaining gaps — revisit weak areas | LeetCode SQL: solve 5 problems you haven't done |
| **Fri** | Practice: Explain SQL, Docker, and Testing concepts out loud | Record yourself explaining (simulate interview) | Update your portfolio project README with testing badge |
| **Sat** | Personal project time: Keep improving Zenith with new skills | Push all code to GitHub, ensure clean commit history | Write a comprehensive Phase 1 reflection post |
| **Sun** | **PHASE 1 COMPLETE CHECKPOINT** 🎉 | Review all deliverables are committed to GitHub | Plan Phase 2 |

**Week 4 Deliverable:** Frontend tests with Vitest + all Phase 1 deliverables committed. Clean GitHub history.

---

## 🟡 PHASE 2: LEVEL UP YOUR STACK

---

### Week 5: Authentication + CI/CD + DSA Start

> [!IMPORTANT]
> DSA practice starts this week and continues EVERY DAY until you get a job. Non-negotiable.

| Day | Morning (1.5 hrs) — DSA | Afternoon (2 hrs) — Auth | Evening (1.5 hrs) — CI/CD |
|---|---|---|---|
| **Mon** | DSA: Two Sum (#1), Valid Anagram (#242) | JWT: Read jwt.io intro, understand header/payload/signature | GitHub Actions: Create first workflow file `.github/workflows/ci.yml` |
| **Tue** | DSA: Contains Duplicate (#217), Best Time to Buy/Sell (#121) | FastAPI Security: Implement password hashing with bcrypt | GitHub Actions: Add lint + typecheck step |
| **Wed** | DSA: Valid Parentheses (#20), Reverse Linked List (#206) | FastAPI Security: Implement login endpoint returning JWT | GitHub Actions: Add pytest step |
| **Thu** | DSA: Merge Two Sorted Lists (#21), Maximum Subarray (#53) | Implement JWT middleware for protected routes | GitHub Actions: Add Vitest step for frontend |
| **Fri** | DSA: Binary Search (#704), Climbing Stairs (#70) | Implement refresh tokens and token expiry | Test full CI pipeline — push and watch it run |
| **Sat** | DSA: Review all week's problems. Re-solve from scratch | Add role-based access control (admin/viewer) | Set up branch protection rules on GitHub |
| **Sun** | DSA: 1 extra problem for fun | Write about auth implementation | REST |

**Week 5 Deliverable:** JWT auth on FastAPI + Working GitHub Actions CI pipeline + 10 DSA problems solved.

---

### Week 6-7: Cloud (AWS) + System Design

| Day | Morning (1.5 hrs) — DSA | Afternoon (2 hrs) — AWS/System Design | Evening (1.5 hrs) — Project |
|---|---|---|---|
| **Week 6** | 2 problems/day (focus: Arrays, Strings, HashMaps) | AWS: EC2 setup, security groups, SSH, deploy FastAPI | Integrate AWS deployment into CI/CD |
| **Week 7** | 2 problems/day (focus: Trees, Stacks, BFS/DFS) | System Design: Read Primer chapters, watch ByteByteGo | Build architecture diagram for your system |

**Week 6-7 Deliverable:** FastAPI deployed to AWS EC2 + 28 more DSA problems solved + System Design notes.

---

### Week 8: Advanced Backend + Cloud Polish

| Day Pattern | DSA | Learning | Project |
|---|---|---|---|
| Daily | 2 Medium problems/day (Graphs, DP intro) | Deploy PostgreSQL to RDS, Frontend to S3 | Connect all pieces: Frontend → API → DB |

**Week 8 Deliverable:** Full-stack app deployed on AWS (Frontend + API + DB) + 14 more DSA problems.

---

## 🟢 PHASE 3: BUILD THE KILLER PROJECT (Weeks 9-12)

Focus 100% on making "Zenith Pro" production-ready:

### Week 9-10: Core Features
- Implement all 6 API endpoints with PostgreSQL
- Add auth to all routes
- Set up proper error handling and logging
- Write comprehensive tests (aim: 80% coverage)

### Week 11-12: Polish & Deploy
- Clean up UI, fix all edge cases
- Write comprehensive README with screenshots
- Record a demo video (2-3 minutes)
- Deploy to AWS with CI/CD
- Write a detailed blog post about the project

**DSA continues:** 2 problems/day throughout.

---

## 🔵 PHASE 4-5: INTERVIEW PREP & APPLICATIONS (Weeks 13-16)

### Week 13-14: Intensive Interview Prep
- 3 DSA problems/day
- 2 mock interviews/week (Pramp.com)
- Practice system design (30-min whiteboard sessions)
- Prepare 5 STAR stories
- Start applying (5 applications/day)

### Week 15-16: Full Application Mode
- Apply to 10 positions/day
- Continue DSA (2/day)
- Follow up on applications
- Attend any interviews
- Iterate on resume based on feedback

---

## 📊 DSA Problem Tracker

Track your LeetCode/NeetCode progress:

| Week | Easy | Medium | Hard | Total | Running Total |
|---|---|---|---|---|---|
| Week 5 | 10 | 0 | 0 | 10 | 10 |
| Week 6 | 8 | 6 | 0 | 14 | 24 |
| Week 7 | 4 | 10 | 0 | 14 | 38 |
| Week 8 | 2 | 12 | 0 | 14 | 52 |
| Week 9 | 2 | 12 | 0 | 14 | 66 |
| Week 10 | 0 | 12 | 2 | 14 | 80 |
| Week 11 | 0 | 10 | 4 | 14 | 94 |
| Week 12 | 0 | 10 | 4 | 14 | 108 |
| Week 13+ | 0 | 14 | 7 | 21 | 129 |
| **Target** | **26** | **86** | **17** | — | **130+** |

---

> [!NOTE]
> This plan is designed to be aggressive but achievable with 4-6 hours of daily commitment. If you're working a job simultaneously, extend the timeline to 24 weeks instead of 16, but maintain the same daily hours. Consistency > intensity.

*Update this tracker every Sunday. Being honest with yourself here is critical.* ✅
