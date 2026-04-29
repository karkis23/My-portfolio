# 🗝️ Node.js & Express — Key Notes (Cheat Sheet)

## Express App Template
```typescript
import express from 'express';
const app = express();

app.use(express.json());       // Parse JSON
app.use(cors());               // Enable CORS

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(8000, () => console.log('Running on :8000'));
```

## Request Object
```typescript
req.params.id        // /users/:id → "123"
req.query.page       // /users?page=2 → "2"
req.body.name        // POST JSON body → "Karki"
req.headers          // All headers
req.method           // "GET", "POST"
req.path             // "/users/123"
```

## Response Object
```typescript
res.json({ data })              // Send JSON
res.status(201).json(data)      // Status + JSON
res.status(204).send()          // No content
res.status(404).json({ error }) // Error response
res.redirect('/login')          // Redirect
res.sendFile(path)              // Send file
```

## Route Patterns
```typescript
const router = Router();
router.get('/', listAll);           // GET /api/items
router.get('/:id', getOne);        // GET /api/items/5
router.post('/', create);          // POST /api/items
router.put('/:id', update);        // PUT /api/items/5
router.delete('/:id', remove);     // DELETE /api/items/5

app.use('/api/items', router);     // Mount router
```

## Middleware Order
```
Request → cors → helmet → morgan → json → auth → route handler → error handler → Response

// Order matters! Middleware runs top-to-bottom
app.use(cors());        // 1st
app.use(helmet());      // 2nd
app.use(express.json());// 3rd
app.use('/api', routes); // 4th
app.use(errorHandler);  // LAST (catches errors)
```

## Error Handling Pattern
```typescript
// Async wrapper (avoids try-catch in every route)
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage
router.get('/', asyncHandler(async (req, res) => {
  const data = await prisma.signal.findMany();
  res.json(data);
}));

// Global error handler (must be last middleware)
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});
```

## Prisma Quick Reference
```typescript
// Create
await prisma.user.create({ data: { name: 'Karki', email: 'a@b.com' } });

// Find many (with filter + pagination)
await prisma.signal.findMany({
  where: { direction: 'LONG', confidence: { gte: 0.8 } },
  orderBy: { createdAt: 'desc' },
  skip: 0, take: 20,
  include: { user: true },
});

// Find unique
await prisma.user.findUnique({ where: { email: 'a@b.com' } });

// Update
await prisma.signal.update({ where: { id: 5 }, data: { confidence: 0.9 } });

// Delete
await prisma.signal.delete({ where: { id: 5 } });

// Aggregate
await prisma.signal.aggregate({ _avg: { confidence: true }, _count: true });

// Group by
await prisma.signal.groupBy({ by: ['direction'], _count: true });
```

## Key npm Packages

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `cors` | Cross-origin requests |
| `helmet` | Security headers |
| `morgan` | Request logging |
| `dotenv` | Environment variables |
| `jsonwebtoken` | JWT auth |
| `bcryptjs` | Password hashing |
| `zod` | Input validation |
| `@prisma/client` | Database ORM |
| `socket.io` | WebSockets |
| `multer` | File upload |
| `nodemailer` | Email sending |
| `rate-limiter-flexible` | Rate limiting |
