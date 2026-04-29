# 📚 Study Materials — Complete Full Stack Developer Learning System
## Karki S's 90-Day Job Placement Roadmap

> **Target Role:** Full Stack Developer (React + Python/Node.js)
> **Start Date:** March 19, 2026
> **Target Completion:** June 17, 2026
> **Daily Commitment:** 5-6 hours

---

## 📂 Complete Folder Structure

```
study-materials/
│
│ ═══════════════════════════════════════════
│  🟢 CORE FULL STACK SKILLS (NEW)
│ ═══════════════════════════════════════════
│
├── ⚛️  10_react_frontend/
│   ├── guide.md          ← Complete React guide (JSX → Hooks → State → Performance)
│   └── key_notes.md      ← Hooks cheat sheet, anti-patterns, project structure
│
├── 🐍 11_python_backend/
│   ├── guide.md          ← Python + FastAPI (fundamentals → SQLAlchemy → WebSockets)
│   └── key_notes.md      ← FastAPI endpoints, Pydantic, SQLAlchemy queries
│
├── 🟢 12_nodejs_express/
│   ├── guide.md          ← Node.js + Express + Prisma ORM
│   └── key_notes.md      ← Express patterns, Prisma queries, npm packages
│
├── 💙 13_typescript/
│   ├── guide.md          ← TypeScript (types → generics → utility types → React TS)
│   └── key_notes.md      ← Type system card, React+TS patterns, common mistakes
│
├── 🌿 14_git_version_control/
│   └── guide.md          ← Git commands, branching, conventional commits, PR workflow
│
├── 🔗 15_rest_api_design/
│   └── guide.md          ← URL design, HTTP methods/codes, pagination, rate limiting
│
│ ═══════════════════════════════════════════
│  🔴 CRITICAL GAP TOPICS
│ ═══════════════════════════════════════════
│
├── 📘 01_sql_databases/
│   ├── guide.md          ← Complete SQL guide (fundamentals → advanced)
│   ├── key_notes.md      ← Quick reference cheat sheet
│   └── examples.sql      ← 🏃 Runnable SQL practice with sample data
│
├── 🐳 02_docker/
│   ├── guide.md          ← Complete Docker guide
│   ├── key_notes.md      ← Commands + Dockerfile cheat sheet
│   └── examples/
│       ├── Dockerfile.fastapi    ← Production Dockerfile template
│       └── docker-compose.yml    ← Full stack Compose template
│
├── 🧪 03_testing/
│   ├── guide.md          ← Complete testing guide (pytest + Vitest)
│   ├── key_notes.md      ← Testing patterns cheat sheet
│   └── examples_python.py ← 🏃 Runnable pytest examples
│
├── 🔐 04_auth_security/
│   ├── guide.md          ← JWT, OAuth2, security guide
│   ├── key_notes.md      ← Auth flow + vulnerabilities cheat sheet
│   └── examples_auth.py  ← 🏃 Complete FastAPI auth app (runnable!)
│
├── ⚡ 05_cicd/
│   ├── guide.md          ← GitHub Actions guide
│   ├── key_notes.md      ← YAML templates cheat sheet
│   └── examples_ci.yml   ← Copy-paste CI/CD pipeline
│
│ ═══════════════════════════════════════════
│  🟡 INTERVIEW & DSA
│ ═══════════════════════════════════════════
│
├── 💪 06_dsa/
│   ├── guide.md          ← Complete DSA guide (all patterns)
│   ├── key_notes.md      ← Pattern recognition + top 20 problems
│   └── examples_dsa.py   ← 🏃 10 solved problems (runnable with tests!)
│
├── 🏗️ 07_system_design/
│   ├── guide.md          ← System design concepts + 3 walkthroughs
│   └── key_notes.md      ← Interview framework + scalability cheat sheet
│
├── 🎤 08_interview_prep/
│   ├── guide.md          ← 50+ interview questions with YOUR project answers
│   └── key_notes.md      ← STAR stories + quick answer cards
│
│ ═══════════════════════════════════════════
│  🗺️ CAREER PLAN
│ ═══════════════════════════════════════════
│
├── 🗺️ 09_career_plan/
│   ├── roadmap.md        ← Gap analysis, target roles, resume template
│   ├── 90_day_calendar.md ← Every single day mapped out
│   ├── weekly_plan.md    ← Week-by-week milestones
│   └── resources.md      ← 100+ curated free learning links
│
└── 📖 README.md          ← You are here!
```

---

## 🎯 Full Stack Developer — Required Skills Map

```
 ┌─────────────────────────────────────────────────────────────┐
 │                   FULL STACK DEVELOPER                       │
 │               React + Python/Node.js                        │
 ├─────────────────────────┬───────────────────────────────────┤
 │      FRONTEND          │          BACKEND                   │
 │                         │                                    │
 │  ⚛️  React             │  🐍 Python + FastAPI              │
 │  💙 TypeScript         │     OR                            │
 │  📐 CSS/Tailwind       │  🟢 Node.js + Express            │
 │  🔄 State Management   │                                    │
 │  📡 API Integration    │  📘 SQL + PostgreSQL              │
 │                         │  🔐 Auth (JWT)                   │
 │                         │  🔗 REST API Design              │
 ├─────────────────────────┴───────────────────────────────────┤
 │                     DEVOPS & TOOLS                          │
 │                                                              │
 │  🐳 Docker  │  ⚡ CI/CD  │  🌿 Git  │  🧪 Testing        │
 │  🏗️ System Design  │  ☁️ Cloud (AWS)                      │
 ├──────────────────────────────────────────────────────────────┤
 │                 INTERVIEW SKILLS                             │
 │                                                              │
 │  💪 DSA (LeetCode)  │  🎤 Behavioral  │  🏗️ System Design │
 └──────────────────────────────────────────────────────────────┘
```

### Which Folder Covers Each Skill:

| Required Skill | Study Folder | Priority |
|---|---|---|
| React fundamentals + hooks + state | `10_react_frontend/` | 🔴 Must know |
| TypeScript | `13_typescript/` | 🔴 Must know |
| Python + FastAPI | `11_python_backend/` | 🔴 Must know |
| Node.js + Express (alternative) | `12_nodejs_express/` | 🟡 Good to know |
| SQL & Databases | `01_sql_databases/` | 🔴 Must know |
| REST API Design | `15_rest_api_design/` | 🔴 Must know |
| Authentication (JWT) | `04_auth_security/` | 🔴 Must know |
| Docker | `02_docker/` | 🔴 Must know |
| Testing | `03_testing/` | 🔴 Must know |
| CI/CD | `05_cicd/` | 🟡 Good to know |
| Git & Version Control | `14_git_version_control/` | 🔴 Must know |
| DSA / LeetCode | `06_dsa/` | 🔴 Must know |
| System Design | `07_system_design/` | 🟡 Good to know |
| Interview Prep | `08_interview_prep/` | 🔴 Must know |

---

## 🚀 How to Use This

### Day 1 (Start Here!)
1. Read `09_career_plan/roadmap.md` — understand your gaps and goals
2. Open `09_career_plan/90_day_calendar.md` — find today's tasks
3. Start with `01_sql_databases/guide.md` Chapter 1

### Daily Workflow
1. Check `09_career_plan/90_day_calendar.md` for today's schedule
2. Open the topic guide for today's learning
3. Use `key_notes.md` as a quick reference while practicing
4. Run the `examples` files to practice hands-on
5. Push your practice code to GitHub every day

### Before Interviews
1. Review all `key_notes.md` files (top-level concepts)
2. Study `08_interview_prep/guide.md` (questions + answers)
3. Practice DSA from `06_dsa/examples_dsa.py`
4. Rehearse your STAR stories from `08_interview_prep/key_notes.md`

---

## 📊 Your Progress Tracker

### Core Full Stack Skills
- [ ] React: Components, Hooks, Router, State — `10_react_frontend/`
- [ ] TypeScript: Types, Generics, React+TS — `13_typescript/`
- [ ] Python: FastAPI, SQLAlchemy, async — `11_python_backend/`
- [ ] Node.js: Express, Prisma (optional) — `12_nodejs_express/`
- [ ] Git: Branching, commits, PRs — `14_git_version_control/`
- [ ] REST API: Design patterns, status codes — `15_rest_api_design/`

### Gap Skills
- [ ] SQL: Queries, JOINs, Window Functions — `01_sql_databases/`
- [ ] Docker: Dockerfile, Compose, volumes — `02_docker/`
- [ ] Testing: pytest, Vitest, RTL — `03_testing/`
- [ ] Auth: JWT, password hashing, CORS — `04_auth_security/`
- [ ] CI/CD: GitHub Actions, deployment — `05_cicd/`

### Interview Skills
- [ ] DSA: 100+ problems solved — `06_dsa/`
- [ ] System Design: 3+ designs practiced — `07_system_design/`
- [ ] Behavioral: 5 STAR stories ready — `08_interview_prep/`
- [ ] 100+ job applications sent

---

## 📈 Total Content Summary

| Count | What |
|---|---|
| **15 topic folders** | Covering every Full Stack skill |
| **15 complete guides** | Deep-dive learning materials |
| **12 key notes** | Quick-reference cheat sheets |
| **5 runnable examples** | SQL, pytest, DSA, auth, CI/CD |
| **1 career roadmap** | Personalized 90-day plan |
| **1 daily calendar** | Day-by-day tasks |
| **100+ links** | Curated free resources |

---

*Follow the plan. Trust the process. You've got this!* 🚀
