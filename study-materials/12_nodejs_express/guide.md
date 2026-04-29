# 📘 Complete Node.js & Express Guide
## Backend Alternative to FastAPI

---

## Chapter 1: Node.js Fundamentals

### 1.1 Why Node.js?

| Feature | Python (FastAPI) | Node.js (Express) |
|---|---|---|
| Language | Python | JavaScript/TypeScript |
| Concurrency | async/await (asyncio) | Event loop (single-threaded, non-blocking) |
| Package Manager | pip | npm / pnpm |
| Best For | AI/ML, data processing | Real-time apps, APIs, microservices |
| Job Market | Backend, ML roles | Full stack roles (same language front+back) |

> [!TIP]
> Knowing both Python AND Node.js backends makes you a **stronger** full stack candidate. Many companies use one or the other.

### 1.2 Core Modules

```javascript
// File System
const fs = require('fs');
const data = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(data);

// Async file read
const fsAsync = require('fs').promises;
const content = await fsAsync.readFile('data.txt', 'utf-8');

// Path
const path = require('path');
const filePath = path.join(__dirname, 'data', 'signals.json');
const ext = path.extname('file.json'); // '.json'

// HTTP (low-level — use Express instead)
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello!' }));
});
server.listen(3000);
```

### 1.3 ES Modules (Modern Syntax)

```javascript
// package.json: "type": "module"

// Named exports/imports
export function calculatePnl(entry, exit, qty) { ... }
import { calculatePnl } from './utils.js';

// Default export
export default class SignalService { ... }
import SignalService from './services/signal.js';

// Import all
import * as utils from './utils.js';
```

---

## Chapter 2: Express.js Framework

### 2.1 Setup

```bash
mkdir zenith-api && cd zenith-api
npm init -y
npm install express cors helmet morgan dotenv
npm install -D typescript @types/express @types/node tsx nodemon
npx tsc --init
```

**tsconfig.json (key settings):**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest"
  }
}
```

### 2.2 Basic Express App

```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ---- Middleware ----
app.use(helmet());                    // Security headers
app.use(cors({ origin: 'http://localhost:3000' }));  // CORS
app.use(morgan('dev'));               // Request logging
app.use(express.json());             // Parse JSON body
app.use(express.urlencoded({ extended: true }));

// ---- Routes ----
app.get('/', (req, res) => {
  res.json({ message: 'Zenith API is running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
```

### 2.3 Routing

```typescript
// src/routes/signals.ts
import { Router, Request, Response } from 'express';

const router = Router();

interface Signal {
  id: number;
  symbol: string;
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
  createdAt: Date;
}

// In-memory store (replace with database)
let signals: Signal[] = [];
let nextId = 1;

// GET /api/signals — List all signals
router.get('/', (req: Request, res: Response) => {
  const { direction, min_confidence } = req.query;
  
  let filtered = signals;
  if (direction) {
    filtered = filtered.filter(s => s.direction === direction);
  }
  if (min_confidence) {
    filtered = filtered.filter(s => s.confidence >= Number(min_confidence));
  }
  
  res.json({ data: filtered, total: filtered.length });
});

// GET /api/signals/:id — Get single signal
router.get('/:id', (req: Request, res: Response) => {
  const signal = signals.find(s => s.id === Number(req.params.id));
  if (!signal) {
    return res.status(404).json({ error: 'Signal not found' });
  }
  res.json(signal);
});

// POST /api/signals — Create signal
router.post('/', (req: Request, res: Response) => {
  const { symbol, direction, confidence } = req.body;
  
  // Validation
  if (!symbol || !direction) {
    return res.status(400).json({ error: 'Symbol and direction are required' });
  }
  if (!['LONG', 'SHORT', 'NEUTRAL'].includes(direction)) {
    return res.status(400).json({ error: 'Direction must be LONG, SHORT, or NEUTRAL' });
  }
  if (confidence < 0 || confidence > 1) {
    return res.status(400).json({ error: 'Confidence must be between 0 and 1' });
  }
  
  const newSignal: Signal = {
    id: nextId++,
    symbol,
    direction,
    confidence,
    createdAt: new Date(),
  };
  
  signals.push(newSignal);
  res.status(201).json(newSignal);
});

// PUT /api/signals/:id — Update signal
router.put('/:id', (req: Request, res: Response) => {
  const index = signals.findIndex(s => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Signal not found' });
  }
  
  signals[index] = { ...signals[index], ...req.body };
  res.json(signals[index]);
});

// DELETE /api/signals/:id — Delete signal
router.delete('/:id', (req: Request, res: Response) => {
  const index = signals.findIndex(s => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Signal not found' });
  }
  
  signals.splice(index, 1);
  res.status(204).send();
});

export default router;
```

**Register routes in index.ts:**
```typescript
import signalRoutes from './routes/signals';
app.use('/api/signals', signalRoutes);
```

### 2.4 Middleware

```typescript
// Custom error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Auth middleware
function authenticate(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use on protected routes
router.get('/me', authenticate, (req, res) => {
  res.json((req as any).user);
});
```

---

## Chapter 3: Database with Prisma ORM

### 3.1 Setup Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

### 3.2 Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int       @id @default(autoincrement())
  username  String    @unique
  email     String    @unique
  password  String
  role      String    @default("viewer")
  createdAt DateTime  @default(now())
  signals   Signal[]
}

model Signal {
  id         Int      @id @default(autoincrement())
  symbol     String
  direction  String
  confidence Float
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  createdAt  DateTime @default(now())

  @@index([symbol])
  @@index([direction])
}

model Trade {
  id         Int       @id @default(autoincrement())
  symbol     String
  direction  String
  entry      Float
  exit       Float?
  quantity   Int
  pnl        Float?
  status     String    @default("open")
  createdAt  DateTime  @default(now())
  closedAt   DateTime?
}
```

```bash
# Create migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate

# Open DB viewer
npx prisma studio
```

### 3.3 Using Prisma Client

```typescript
// src/db.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

// src/routes/signals.ts
import prisma from '../db';

// Create
router.post('/', async (req, res) => {
  const signal = await prisma.signal.create({
    data: {
      symbol: req.body.symbol,
      direction: req.body.direction,
      confidence: req.body.confidence,
      userId: req.user.id,
    },
  });
  res.status(201).json(signal);
});

// Read (with pagination)
router.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  
  const [signals, total] = await Promise.all([
    prisma.signal.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { username: true } } },
    }),
    prisma.signal.count(),
  ]);
  
  res.json({
    data: signals,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
});

// Update
router.put('/:id', async (req, res) => {
  const signal = await prisma.signal.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(signal);
});

// Delete
router.delete('/:id', async (req, res) => {
  await prisma.signal.delete({
    where: { id: Number(req.params.id) },
  });
  res.status(204).send();
});

// Complex queries
router.get('/stats', async (req, res) => {
  const stats = await prisma.signal.groupBy({
    by: ['direction'],
    _count: true,
    _avg: { confidence: true },
  });
  res.json(stats);
});
```

---

## Chapter 4: Express vs FastAPI — Quick Comparison

| Feature | FastAPI (Python) | Express (Node.js) |
|---|---|---|
| Auto docs | ✅ Built-in (Swagger, ReDoc) | ❌ Need swagger-ui-express |
| Validation | ✅ Pydantic (automatic) | ❌ Manual or use Zod/Joi |
| Async | ✅ native async/await | ✅ native async/await |
| Type safety | ✅ Type hints | ✅ TypeScript |
| ORM | SQLAlchemy / Tortoise | Prisma / TypeORM / Drizzle |
| Testing | pytest | Vitest / Jest + supertest |
| Middleware | ✅ | ✅ |
| WebSockets | ✅ Built-in | ❌ Need socket.io |
| Performance | Very fast (Starlette) | Fast (V8 engine) |

---

## Chapter 5: Project Structure (Express + TypeScript)

```
zenith-api/
├── src/
│   ├── index.ts           ← App entry, middleware setup
│   ├── config.ts          ← Environment variables
│   ├── db.ts              ← Prisma client
│   ├── routes/
│   │   ├── auth.ts        ← Register, login, refresh
│   │   ├── signals.ts     ← Signal CRUD
│   │   ├── trades.ts      ← Trade CRUD
│   │   └── predictions.ts ← AI prediction endpoint
│   ├── middleware/
│   │   ├── auth.ts        ← JWT verification
│   │   ├── validate.ts    ← Request validation
│   │   └── errorHandler.ts
│   ├── services/
│   │   ├── signalService.ts
│   │   └── tradeService.ts
│   └── types/
│       └── index.ts       ← TypeScript interfaces
├── prisma/
│   └── schema.prisma
├── tests/
│   └── signals.test.ts
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── .gitignore
```

---

*Build the same Zenith API in BOTH FastAPI and Express. This proves versatility to employers!* 🟢
