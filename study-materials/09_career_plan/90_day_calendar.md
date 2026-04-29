# 📅 90-Day Daily Study Calendar
## Every Single Day Mapped Out — Your Complete Ramp-Up Plan

> [!IMPORTANT]
> **Daily commitment:** 5-6 hours minimum. Follow this EXACTLY. Check off each day as you complete it.

---

## ⏰ Daily Time Blocks

```
06:00-07:30  🌅 DSA Practice (1.5 hrs)
07:30-08:00  ☕ Break
08:00-10:00  📚 Main Topic Study (2 hrs)
10:00-10:30  🚶 Break
10:30-12:00  🔨 Project Work (1.5 hrs)
12:00-12:30  📝 Review & commit code to GitHub
```

> Adjust times to fit your schedule, but keep the ORDER and DURATION the same.

---

# 🔴 PHASE 1: FOUNDATION (Days 1-28)

---

## Week 1: SQL Basics

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 1 (Thu)** | No DSA yet — install LeetCode & Python | SQL Guide Ch.1-2.3: Setup PostgreSQL, CREATE TABLE | Create `signals`, `trades`, `users` tables |
| **Day 2 (Fri)** | — | SQL Guide Ch.2.4-2.5: SELECT, WHERE | Write 10 SELECT queries on your tables |
| **Day 3 (Sat)** | — | SQL Guide Ch.2.6-2.8: ORDER BY, UPDATE, DELETE | Insert 20 rows of sample data, practice CRUD |
| **Day 4 (Sun)** | — | Review Day 1-3 + SQLBolt Lessons 1-6 | Write a blog post: "My First Week Learning SQL" |
| **Day 5 (Mon)** | — | SQL Guide Ch.3.1-3.2: Aggregates, GROUP BY | Write 5 aggregate queries (SUM, AVG, COUNT) |
| **Day 6 (Tue)** | — | SQL Guide Ch.3.3: JOINs (INNER, LEFT, RIGHT) | Write JOIN queries: signals + trades tables |
| **Day 7 (Wed)** | — | SQL Guide Ch.3.4-3.6: Subqueries, Date functions | LeetCode SQL: #175, #181, #182 |

**✅ Week 1 Milestone:** Can write SELECT, JOIN, GROUP BY queries. Have PostgreSQL running with sample data.

---

## Week 2: Advanced SQL + Docker Start

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 8 (Thu)** | — | SQL Guide Ch.4.1: Window Functions (ROW_NUMBER, RANK) | Write window function queries on your data |
| **Day 9 (Fri)** | — | SQL Guide Ch.4.1: LAG, LEAD, Running Totals | Calculate running P&L with window functions |
| **Day 10 (Sat)** | — | SQL Guide Ch.4.2: CTEs (Common Table Expressions) | Rewrite complex queries using CTEs |
| **Day 11 (Sun)** | — | SQL Guide Ch.4.3-4.4: Indexes, Transactions | LeetCode SQL: #183, #196, #197, #595, #596 |
| **Day 12 (Mon)** | — | SQL Guide Ch.5: Normalization & ER Diagrams | Design ERD for Zenith Pro (use dbdiagram.io) |
| **Day 13 (Tue)** | — | Docker Guide Ch.1-3: Install, concepts, commands | Run postgres, nginx containers from Docker Hub |
| **Day 14 (Wed)** | — | Docker Guide Ch.4: Writing Dockerfiles | Write Dockerfile for a simple Python app |

**✅ Week 2 Milestone:** LeetCode SQL: 10 problems done. Docker installed. Can run containers.

---

## Week 3: Docker Deep Dive + Testing Start

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 15 (Thu)** | — | Docker Guide Ch.4.1: Dockerize your FastAPI app | Build & run Zenith Engine in Docker |
| **Day 16 (Fri)** | — | Docker Guide Ch.5-6: Volumes + Docker Compose | Write docker-compose.yml: FastAPI + PostgreSQL |
| **Day 17 (Sat)** | — | Docker Guide Ch.6: Add Redis to Compose | 3-service docker-compose working |
| **Day 18 (Sun)** | — | Docker Guide Ch.7: Multi-stage builds | Optimize Dockerfile with multi-stage build |
| **Day 19 (Mon)** | — | Testing Guide Ch.2.1-2.2: pytest setup, first tests | Install pytest, write 5 unit tests |
| **Day 20 (Tue)** | — | Testing Guide Ch.2.3-2.4: Running tests, Fixtures | Write fixtures for market data, test preprocessor |
| **Day 21 (Wed)** | — | Testing Guide Ch.2.5-2.6: Parametrize, Mocking | Mock API calls, test with multiple inputs |

**✅ Week 3 Milestone:** Dockerized FastAPI + PostgreSQL + Redis. 10+ pytest tests written.

---

## Week 4: Frontend Testing + Phase 1 Review

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 22 (Thu)** | — | Testing Guide Ch.2.7: FastAPI endpoint testing | Test `/predict`, `/health` endpoints |
| **Day 23 (Fri)** | — | Testing Guide Ch.3.1-3.2: Vitest setup, unit tests | Setup Vitest in your portfolio, write 3 tests |
| **Day 24 (Sat)** | — | Testing Guide Ch.3.3: React component testing | Test ProjectCard, TerminalPanel components |
| **Day 25 (Sun)** | — | Testing Guide Ch.3.4-3.5: User interactions, async | Test click events, form submissions |
| **Day 26 (Mon)** | — | Review: SQL (redo 5 LeetCode problems) | Push all tests to GitHub |
| **Day 27 (Tue)** | — | Review: Docker (rebuild everything from scratch) | Ensure Compose works cleanly |
| **Day 28 (Wed)** | — | **PHASE 1 EXAM:** Can you build a tested, Dockerized app from scratch? | Write Phase 1 completion post on LinkedIn |

**✅ Week 4 Milestone:** 🎉 Phase 1 Complete! SQL + Docker + Testing fundamentals mastered.

---

# 🟡 PHASE 2: LEVEL UP (Days 29-56)

---

## Week 5: Authentication + DSA Begins

> [!WARNING]
> **DSA starts NOW.** You will do DSA problems EVERY MORNING from this point forward. No exceptions.

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 29 (Thu)** | Two Sum (#1), Contains Duplicate (#217) | Auth Guide Ch.2: Password Hashing (bcrypt) | Add password hashing to your FastAPI app |
| **Day 30 (Fri)** | Valid Anagram (#242), Best Time Buy/Sell (#121) | Auth Guide Ch.3.1-3.2: JWT concepts, token flow | Implement JWT creation functions |
| **Day 31 (Sat)** | Valid Parentheses (#20), Maximum Subarray (#53) | Auth Guide Ch.3.3: FastAPI JWT implementation | Build `/register` + `/login` endpoints |
| **Day 32 (Sun)** | Merge Two Lists (#21), Reverse List (#206) | Auth Guide Ch.3.4: Protected routes | Protect `/predict` with JWT |
| **Day 33 (Mon)** | Binary Search (#704), Climbing Stairs (#70) | Auth Guide Ch.4: CORS setup | Add CORS middleware to FastAPI |
| **Day 34 (Tue)** | Linked List Cycle (#141), Middle of List (#876) | Auth Guide Ch.5: Security vulnerabilities | Add role-based access (admin/viewer) |
| **Day 35 (Wed)** | Review: re-solve Days 29-34 problems | Auth Guide Ch.6: Rate limiting | Test auth flow end-to-end |

**✅ Week 5 Milestone:** JWT auth working. 12 DSA problems solved.

---

## Week 6: CI/CD + More DSA

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 36 (Thu)** | Invert Binary Tree (#226), Max Depth (#104) | CI/CD Guide Ch.1-2: Concepts, GitHub Actions | Create `.github/workflows/ci.yml` |
| **Day 37 (Fri)** | Same Tree (#100), Subtree of Another (#572) | CI/CD Guide Ch.3.1: Python CI pipeline | Add lint + test steps to CI |
| **Day 38 (Sat)** | Longest Substr No Repeat (#3), 3Sum (#15) | CI/CD Guide Ch.3.2: Frontend CI pipeline | Add frontend lint + build to CI |
| **Day 39 (Sun)** | Container With Most Water (#11), Product Except Self (#238) | CI/CD Guide Ch.4: Multi-job workflows | Combine backend + frontend CI |
| **Day 40 (Mon)** | Group Anagrams (#49), Top K Frequent (#347) | CI/CD Guide Ch.5: Vercel deployment | Set up auto-deploy for portfolio |
| **Day 41 (Tue)** | Encode Decode Strings (#271), Longest Consecutive (#128) | CI/CD Guide Ch.7: Status badges | Add CI badge to README |
| **Day 42 (Wed)** | Review: re-solve any failed problems | Review week: fix any CI issues | Push everything to GitHub |

**✅ Week 6 Milestone:** CI/CD pipeline running. 24 DSA problems total.

---

## Week 7: AWS Cloud Basics

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 43 (Thu)** | Min Stack (#155), Daily Temperatures (#739) | AWS: Create account, IAM user, understand regions | Watch "AWS in 10 mins" by Fireship |
| **Day 44 (Fri)** | Number of Islands (#200), Clone Graph (#133) | AWS: EC2 — launch instance, SSH, security groups | Deploy a simple Python app to EC2 |
| **Day 45 (Sat)** | Validate BST (#98), LCA of BST (#235) | AWS: RDS — set up PostgreSQL database | Connect your FastAPI to RDS |
| **Day 46 (Sun)** | Kth Smallest in BST (#230), Level Order (#102) | AWS: S3 — bucket creation, static website hosting | Upload your React build to S3 |
| **Day 47 (Mon)** | Rotting Oranges (#994), Pacific Atlantic (#417) | AWS: CloudFront CDN setup | Add CloudFront in front of S3 |
| **Day 48 (Tue)** | Course Schedule (#207), Walls and Gates (#286) | AWS: Review all services, draw architecture | Full stack on AWS: EC2 + RDS + S3 |
| **Day 49 (Wed)** | Review: Graph problems | AWS: Connect everything, test end-to-end | Write deployment documentation |

**✅ Week 7 Milestone:** Full app deployed on AWS. 36 DSA problems total.

---

## Week 8: System Design + Consolidation

| Day | 🌅 DSA (1.5h) | 📚 Main Topic (2h) | 🔨 Project (1.5h) |
|---|---|---|---|
| **Day 50 (Thu)** | Coin Change (#322), House Robber (#198) | System Design Ch.2: Scalability concepts | Notes on scaling, caching, load balancing |
| **Day 51 (Fri)** | Climbing Stairs (#70), LIS (#300) | System Design Ch.3: API design | Review and improve your API design |
| **Day 52 (Sat)** | Unique Paths (#62), Decode Ways (#91) | System Design Ch.4: Design URL Shortener | Draw the architecture on paper |
| **Day 53 (Sun)** | Word Break (#139), Longest Palindromic Sub (#5) | System Design Ch.5: Design Chat App | Draw the architecture on paper |
| **Day 54 (Mon)** | Review DP problems | System Design Ch.6: Design Rate Limiter | Implement rate limiter in your FastAPI |
| **Day 55 (Tue)** | Search Rotated Array (#33), Find Min Rotated (#153) | Review ALL Phase 2 topics | Ensure all code is on GitHub |
| **Day 56 (Wed)** | Matrix problems: Set Matrix Zeros (#73), Spiral (#54) | **PHASE 2 EXAM:** Can you explain auth, CI/CD, cloud, system design? | LinkedIn post: "Phase 2 Complete" |

**✅ Week 8 Milestone:** 🎉 Phase 2 Complete! 48+ DSA problems. Cloud deployed. System Design basics understood.

---

# 🟢 PHASE 3: BUILD THE KILLER PROJECT (Days 57-70)

Focus: Transform Zenith into a job-winning portfolio piece.

| Day | 🌅 DSA (1.5h) | 📚 Build "Zenith Pro" (3.5h) |
|---|---|---|
| **Day 57** | Subsets (#78), Combination Sum (#39) | Set up project structure: monorepo (backend/ + frontend/) |
| **Day 58** | Permutations (#46), Word Search (#79) | Backend: PostgreSQL models with SQLAlchemy (users, signals, trades) |
| **Day 59** | Letter Combos Phone (#17), Palindrome Partition (#131) | Backend: CRUD endpoints for signals and trades |
| **Day 60** | Merge Intervals (#56), Insert Interval (#57) | Backend: JWT authentication (register + login + protected) |
| **Day 61** | Non-Overlapping Intervals (#435), Meeting Rooms (#252) | Backend: AI prediction endpoint with model loading |
| **Day 62** | Rotate Image (#48), Implement Trie (#208) | Frontend: Dashboard page with signal feed |
| **Day 63** | Review: Backtracking problems | Frontend: Trade history page with charts |
| **Day 64** | Design Add Search Words (#211), Word Search II (#212) | Write comprehensive tests (backend: 80% coverage) |
| **Day 65** | Min Cost Climbing (#746), Partition Equal Subset (#416) | Write comprehensive tests (frontend: component tests) |
| **Day 66** | Target Sum (#494), Edit Distance (#72) | Dockerize entire stack (docker-compose.yml) |
| **Day 67** | Maximum Product Subarray (#152), Jump Game (#55) | Set up GitHub Actions CI/CD pipeline |
| **Day 68** | Longest Common Subseq (#1143), Stock Buy Sell (#309) | Deploy to AWS (EC2 + RDS + S3) |
| **Day 69** | Review: DP problems | Write comprehensive README with screenshots |
| **Day 70** | Review: All weak topics | Record 2-minute demo video. **PROJECT COMPLETE** 🎉 |

**✅ Phase 3 Milestone:** "Zenith Pro" deployed, tested, documented, with demo video. 68+ DSA problems total.

---

# 🔵 PHASE 4: INTERVIEW PREPARATION (Days 71-84)

| Day | 🌅 DSA (2h) | 📚 Interview Prep (2h) | 🔨 Applications (1.5h) |
|---|---|---|---|
| **Day 71** | 3 Medium problems | Interview Guide: React questions (Q1-Q5) | Update resume with new skills |
| **Day 72** | 3 Medium problems | Interview Guide: React questions (Q6-Q15) | Optimize LinkedIn profile |
| **Day 73** | 3 Medium problems | Interview Guide: TypeScript + Python (Q1-Q5) | Create Naukri profile |
| **Day 74** | 2 Medium + 1 Hard | Interview Guide: SQL + Database questions | Apply to 5 jobs |
| **Day 75** | 2 Medium + 1 Hard | Interview Guide: Docker + System Design | Apply to 5 jobs |
| **Day 76** | 2 Medium + 1 Hard | Mock Interview #1 (Pramp.com) | Apply to 5 jobs |
| **Day 77** | Review weak topics | Behavioral: Prepare STAR Story #1 and #2 | Apply to 5 jobs |
| **Day 78** | 3 Medium problems | Behavioral: Prepare STAR Story #3, #4, #5 | Apply to 5 jobs |
| **Day 79** | 2 Medium + 1 Hard | Mock Interview #2 (Pramp.com) | Apply to 5 jobs |
| **Day 80** | 3 Medium problems | Practice: Explain your projects out loud | Apply to 10 jobs |
| **Day 81** | 2 Medium + 1 Hard | Mock Interview #3 (Pramp.com) | Apply to 10 jobs |
| **Day 82** | 3 Medium problems | System Design: Practice URL Shortener on whiteboard | Apply to 10 jobs |
| **Day 83** | Review all important patterns | Full mock interview: DSA + behavioral + system design | Apply to 10 jobs |
| **Day 84** | 2 Hard problems | Review all interview notes | Apply to 10 jobs |

**✅ Phase 4 Milestone:** 100+ DSA problems. 3+ mock interviews. 100+ job applications sent. STAR stories prepared.

---

# ⚡ PHASE 5: ACTIVE JOB HUNTING (Days 85-90+)

| Day | 🌅 DSA (1.5h) | 📚 Prep (1.5h) | 🔨 Applications (2.5h) |
|---|---|---|---|
| **Day 85** | 2 problems (focus on weak areas) | System Design practice | Apply 10 + follow up on previous |
| **Day 86** | 2 problems | Behavioral practice | Apply 10 + network on LinkedIn |
| **Day 87** | 2 problems | Mock interview (Pramp) | Apply 10 + reach out for referrals |
| **Day 88** | 2 problems | Review any upcoming interview topics | Apply 10 + follow up |
| **Day 89** | 2 problems | Practice coding under pressure (timed) | Apply 10 + post project on LinkedIn |
| **Day 90** | 2 problems | **REVIEW EVERYTHING** | **Continue applying daily until placed** |

---

## 📊 Cumulative Progress Tracker

| Checkpoint | DSA Total | SQL Problems | Tests Written | Projects Deployed | Applications |
|---|---|---|---|---|---|
| Week 2 (Day 14) | 0 | 10+ | 0 | 0 | 0 |
| Week 4 (Day 28) | 0 | 15+ | 20+ | Dockerized | 0 |
| Week 6 (Day 42) | 24 | 15+ | 25+ | CI/CD running | 0 |
| Week 8 (Day 56) | 48 | 15+ | 30+ | AWS deployed | 0 |
| Week 10 (Day 70) | 68 | 15+ | 50+ | Zenith Pro live | 0 |
| Week 12 (Day 84) | 100+ | 15+ | 50+ | Zenith Pro live | 100+ |
| Week 13 (Day 90) | 110+ | 15+ | 50+ | Zenith Pro live | 150+ |

---

## 🗓️ Monthly Checkpoints

### Month 1 Review (Day 28)
- [ ] Can I write complex SQL queries from scratch?
- [ ] Can I Dockerize a Python/React app from memory?
- [ ] Do I have tests in at least one project?
- [ ] Is my GitHub showing daily commits?

### Month 2 Review (Day 56)
- [ ] Can I implement JWT auth from scratch?
- [ ] Does my CI/CD pipeline work?
- [ ] Have I deployed anything to the cloud?
- [ ] Have I solved 48+ DSA problems?
- [ ] Can I explain basic system design?

### Month 3 Review (Day 84)
- [ ] Is my "Zenith Pro" project live and polished?
- [ ] Have I done 3+ mock interviews?
- [ ] Have I applied to 100+ jobs?
- [ ] Can I solve most Medium LeetCode problems?
- [ ] Can I explain my projects clearly in 2 minutes?

---

> [!CAUTION]
> **Days you skip compound.** If you skip 3 days, you don't just lose 3 days — you lose the momentum that took weeks to build. If you MUST take a day off, still do 1 DSA problem and push at least 1 commit to GitHub. **Consistency is the #1 predictor of success.**

---

*Print this calendar. Mark off each day. Share your progress on LinkedIn weekly. You've got this!* 🚀
