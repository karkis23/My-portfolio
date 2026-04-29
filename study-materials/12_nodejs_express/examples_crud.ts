// =============================================
// Node.js + Express + TypeScript — CRUD Example
// A complete REST API (same as the Python example)
//
// Setup:
//   npm init -y
//   npm install express cors
//   npm install -D typescript @types/express @types/cors tsx
//   npx tsc --init
//
// Run:
//   npx tsx examples_crud.ts
//
// Test:
//   curl http://localhost:8000/signals
//   curl -X POST http://localhost:8000/signals \
//     -H "Content-Type: application/json" \
//     -d '{"symbol":"NIFTY","direction":"LONG","confidence":0.85}'
// =============================================

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});


// =============================================
// TYPES
// =============================================

type Direction = 'LONG' | 'SHORT' | 'NEUTRAL';

interface Signal {
  id: number;
  symbol: string;
  direction: Direction;
  confidence: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateSignalBody {
  symbol: string;
  direction: Direction;
  confidence: number;
  notes?: string;
}

interface UpdateSignalBody {
  symbol?: string;
  direction?: Direction;
  confidence?: number;
  notes?: string;
}


// =============================================
// IN-MEMORY DATABASE
// =============================================

const signalsDb = new Map<number, Signal>();
let nextId = 1;

// Seed data
function seedData() {
  const samples: Omit<Signal, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { symbol: 'NIFTY', direction: 'LONG', confidence: 0.85, notes: 'Strong uptrend' },
    { symbol: 'BANKNIFTY', direction: 'SHORT', confidence: 0.72, notes: 'Resistance hit' },
    { symbol: 'RELIANCE', direction: 'LONG', confidence: 0.91, notes: 'Breakout confirmed' },
    { symbol: 'TCS', direction: 'NEUTRAL', confidence: 0.55, notes: 'Consolidating' },
    { symbol: 'INFY', direction: 'LONG', confidence: 0.78, notes: 'Earnings beat' },
  ];

  for (const sample of samples) {
    const now = new Date().toISOString();
    signalsDb.set(nextId, { ...sample, id: nextId, createdAt: now, updatedAt: now });
    nextId++;
  }
}

seedData();


// =============================================
// VALIDATION HELPER
// =============================================

function validateSignalInput(body: any): string | null {
  if (!body.symbol || typeof body.symbol !== 'string' || body.symbol.length > 20) {
    return 'symbol is required (string, max 20 chars)';
  }
  if (!['LONG', 'SHORT', 'NEUTRAL'].includes(body.direction)) {
    return 'direction must be LONG, SHORT, or NEUTRAL';
  }
  if (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 1) {
    return 'confidence must be a number between 0 and 1';
  }
  return null;
}


// =============================================
// ROUTES
// =============================================

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', signalsCount: signalsDb.size });
});

// LIST — GET /signals (with pagination + filtering)
app.get('/signals', (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const directionFilter = req.query.direction as Direction | undefined;
  const minConfidence = Number(req.query.min_confidence) || 0;
  const sortBy = (req.query.sort_by as string) || 'createdAt';
  const order = req.query.order === 'asc' ? 1 : -1;

  let signals = Array.from(signalsDb.values());

  // Filter
  if (directionFilter && ['LONG', 'SHORT', 'NEUTRAL'].includes(directionFilter)) {
    signals = signals.filter((s) => s.direction === directionFilter);
  }
  signals = signals.filter((s) => s.confidence >= minConfidence);

  // Sort
  signals.sort((a, b) => {
    const aVal = (a as any)[sortBy];
    const bVal = (b as any)[sortBy];
    if (typeof aVal === 'string') return aVal.localeCompare(bVal) * order;
    if (typeof aVal === 'number') return (aVal - bVal) * order;
    return 0;
  });

  // Paginate
  const total = signals.length;
  const start = (page - 1) * limit;
  const data = signals.slice(start, start + limit);

  res.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET ONE — GET /signals/:id
app.get('/signals/:id', (req: Request, res: Response) => {
  const signal = signalsDb.get(Number(req.params.id));
  if (!signal) {
    return res.status(404).json({ error: `Signal ${req.params.id} not found` });
  }
  res.json({ data: signal });
});

// CREATE — POST /signals
app.post('/signals', (req: Request, res: Response) => {
  const body: CreateSignalBody = req.body;

  const error = validateSignalInput(body);
  if (error) {
    return res.status(400).json({ error });
  }

  const now = new Date().toISOString();
  const newSignal: Signal = {
    id: nextId,
    symbol: body.symbol.toUpperCase(),
    direction: body.direction,
    confidence: body.confidence,
    notes: body.notes || null,
    createdAt: now,
    updatedAt: now,
  };

  signalsDb.set(nextId, newSignal);
  nextId++;

  res.status(201).json({ data: newSignal });
});

// UPDATE — PATCH /signals/:id
app.patch('/signals/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const signal = signalsDb.get(id);

  if (!signal) {
    return res.status(404).json({ error: `Signal ${id} not found` });
  }

  const body: UpdateSignalBody = req.body;

  // Validate only provided fields
  if (body.direction && !['LONG', 'SHORT', 'NEUTRAL'].includes(body.direction)) {
    return res.status(400).json({ error: 'direction must be LONG, SHORT, or NEUTRAL' });
  }
  if (body.confidence !== undefined && (body.confidence < 0 || body.confidence > 1)) {
    return res.status(400).json({ error: 'confidence must be between 0 and 1' });
  }

  const updated: Signal = {
    ...signal,
    ...(body.symbol && { symbol: body.symbol.toUpperCase() }),
    ...(body.direction && { direction: body.direction }),
    ...(body.confidence !== undefined && { confidence: body.confidence }),
    ...(body.notes !== undefined && { notes: body.notes }),
    updatedAt: new Date().toISOString(),
  };

  signalsDb.set(id, updated);
  res.json({ data: updated });
});

// DELETE — DELETE /signals/:id
app.delete('/signals/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!signalsDb.has(id)) {
    return res.status(404).json({ error: `Signal ${id} not found` });
  }

  signalsDb.delete(id);
  res.status(204).send();
});

// STATS — GET /signals/stats
app.get('/signals/stats', (_req: Request, res: Response) => {
  const signals = Array.from(signalsDb.values());

  if (signals.length === 0) {
    return res.json({ total: 0 });
  }

  const directionCounts: Record<string, number> = {};
  let totalConfidence = 0;

  for (const s of signals) {
    directionCounts[s.direction] = (directionCounts[s.direction] || 0) + 1;
    totalConfidence += s.confidence;
  }

  const strongest = signals.reduce((max, s) =>
    s.confidence > max.confidence ? s : max
  );

  res.json({
    total: signals.length,
    byDirection: directionCounts,
    avgConfidence: Math.round((totalConfidence / signals.length) * 1000) / 1000,
    maxConfidence: Math.max(...signals.map((s) => s.confidence)),
    minConfidence: Math.min(...signals.map((s) => s.confidence)),
    strongest: strongest.symbol,
  });
});


// =============================================
// ERROR HANDLER (must be last middleware)
// =============================================

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});


// =============================================
// START SERVER
// =============================================

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
  console.log(`📖 Try: curl http://localhost:${PORT}/signals`);
  console.log(`📊 Stats: curl http://localhost:${PORT}/signals/stats`);
});

export default app;
