# 📘 REST API Design — Complete Guide + Key Notes

---

## Chapter 1: REST Principles

### What is REST?
REST (Representational State Transfer) is an architectural style for designing APIs. A RESTful API:
- Is **stateless** (no session stored on server)
- Uses **HTTP methods** (GET, POST, PUT, PATCH, DELETE)
- Operates on **resources** (nouns, not verbs)
- Returns **standard HTTP status codes**

### URL Design Rules

```
✅ GOOD (nouns, plural, lowercase)
GET    /api/v1/signals
GET    /api/v1/signals/42
POST   /api/v1/signals
PUT    /api/v1/signals/42
DELETE /api/v1/signals/42
GET    /api/v1/users/5/signals          ← nested resource

❌ BAD (verbs, singular, mixed case)
GET    /api/getSignals
POST   /api/createSignal
GET    /api/Signal/42
POST   /api/deleteSignal/42
```

---

## Chapter 2: HTTP Methods

| Method | Purpose | Idempotent? | Body? | Example |
|---|---|---|---|---|
| **GET** | Read/retrieve | ✅ Yes | ❌ No | `GET /signals` |
| **POST** | Create new resource | ❌ No | ✅ Yes | `POST /signals` |
| **PUT** | Full update/replace | ✅ Yes | ✅ Yes | `PUT /signals/42` |
| **PATCH** | Partial update | ✅ Yes | ✅ Yes | `PATCH /signals/42` |
| **DELETE** | Remove resource | ✅ Yes | ❌ No | `DELETE /signals/42` |

**Idempotent** = calling it multiple times has the same effect as calling it once.

---

## Chapter 3: Request & Response Design

### Request Examples

```bash
# List with pagination, filtering, sorting
GET /api/v1/signals?page=2&limit=20&direction=LONG&sort=confidence&order=desc

# Create
POST /api/v1/signals
Content-Type: application/json
Authorization: Bearer eyJhbG...

{
  "symbol": "NIFTY",
  "direction": "LONG",
  "confidence": 0.85,
  "features": [0.5, 0.3, 0.8, ...]
}

# Partial update
PATCH /api/v1/signals/42
{
  "confidence": 0.92
}
```

### Response Format (Consistent JSON Envelope)

```json
// Success — Single Resource
{
  "data": {
    "id": 42,
    "symbol": "NIFTY",
    "direction": "LONG",
    "confidence": 0.85,
    "createdAt": "2026-03-19T10:30:00Z"
  }
}

// Success — List with Pagination
{
  "data": [
    { "id": 1, "symbol": "NIFTY", "direction": "LONG" },
    { "id": 2, "symbol": "BANKNIFTY", "direction": "SHORT" }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}

// Error Response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid confidence value",
    "details": [
      { "field": "confidence", "message": "Must be between 0 and 1" }
    ]
  }
}
```

---

## Chapter 4: HTTP Status Codes

### Success (2xx)
| Code | Name | When |
|---|---|---|
| **200** | OK | GET, PUT, PATCH success |
| **201** | Created | POST success (return created resource) |
| **204** | No Content | DELETE success (no body) |

### Client Errors (4xx)
| Code | Name | When |
|---|---|---|
| **400** | Bad Request | Invalid JSON, missing required fields |
| **401** | Unauthorized | No token, expired token, invalid token |
| **403** | Forbidden | Valid token, insufficient permissions |
| **404** | Not Found | Resource ID doesn't exist |
| **409** | Conflict | Duplicate username/email |
| **422** | Unprocessable Entity | Valid JSON but fails validation rules |
| **429** | Too Many Requests | Rate limit exceeded |

### Server Errors (5xx)
| Code | Name | When |
|---|---|---|
| **500** | Internal Server Error | Unhandled exception (bug in your code) |
| **502** | Bad Gateway | Upstream service is down |
| **503** | Service Unavailable | Server overloaded, maintenance |

---

## Chapter 5: API Versioning

```bash
# URL versioning (most common, recommended)
GET /api/v1/signals
GET /api/v2/signals

# Header versioning
GET /api/signals
Accept: application/vnd.zenith.v2+json

# Query parameter
GET /api/signals?version=2
```

---

## Chapter 6: Authentication in APIs

### Bearer Token (JWT)
```
Request:
  GET /api/v1/signals
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Server:
  1. Extract token from header
  2. Verify signature + expiry
  3. Extract user_id and role from payload
  4. Authorize action
```

### API Key (Simple, server-to-server)
```
Request:
  GET /api/v1/data
  X-API-Key: sk_live_abc123def456
```

---

## Chapter 7: Pagination Patterns

### Offset-Based (Simple)
```
GET /api/signals?page=3&limit=20
→ Skip (3-1)*20 = 40 rows, take 20

Pros: Easy to implement, jump to any page
Cons: Slow on large datasets (OFFSET is O(n) in SQL)
```

### Cursor-Based (Better for Large Data)
```
GET /api/signals?cursor=eyJpZCI6NDJ9&limit=20
→ WHERE id > 42 ORDER BY id LIMIT 20

Pros: Consistent performance, no skipped/duplicate items
Cons: Can't jump to page 50
```

---

## Chapter 8: Rate Limiting

```
Response Headers:
  X-RateLimit-Limit: 100          ← max requests per window
  X-RateLimit-Remaining: 67       ← requests left
  X-RateLimit-Reset: 1679000000   ← when window resets (Unix timestamp)

When exceeded:
  HTTP 429 Too Many Requests
  Retry-After: 30                 ← try again in 30 seconds
```

---

## Chapter 9: Complete API for Zenith (Design)

```yaml
# Zenith Intelligence Engine API v1

Auth:
  POST   /api/v1/auth/register      # Register
  POST   /api/v1/auth/login          # Login → tokens
  POST   /api/v1/auth/refresh        # Refresh token
  GET    /api/v1/auth/me             # Get profile

Signals:
  GET    /api/v1/signals             # List (paginated, filterable)
  GET    /api/v1/signals/:id         # Get single
  POST   /api/v1/signals             # Create (AI prediction)
  DELETE /api/v1/signals/:id         # Delete (admin only)

Trades:
  GET    /api/v1/trades              # List trades
  GET    /api/v1/trades/:id          # Get single
  POST   /api/v1/trades              # Open trade
  PATCH  /api/v1/trades/:id          # Update (close trade)
  GET    /api/v1/trades/stats        # PnL statistics

Predictions:
  POST   /api/v1/predict             # Run AI prediction
  GET    /api/v1/predict/history     # Prediction history

Admin:
  GET    /api/v1/admin/users         # List users
  PATCH  /api/v1/admin/users/:id     # Update user role
  DELETE /api/v1/admin/users/:id     # Delete user
  GET    /api/v1/admin/stats         # System stats
```

---

## Key Interview Questions

### Q: What makes an API RESTful?
> Stateless, resource-based URLs, standard HTTP methods, proper status codes, JSON responses.

### Q: PUT vs PATCH?
> PUT replaces the ENTIRE resource (send all fields). PATCH updates ONLY the specified fields.

### Q: How do you handle API errors?
> Consistent error format with error code, human-readable message, and field-level details. Use proper HTTP status codes (400, 401, 403, 404, 422, 500).

### Q: How do you version APIs?
> URL versioning (`/api/v1/`) is most common. Allows running V1 and V2 simultaneously during migration.

### Q: What is HATEOAS?
> Hypermedia As The Engine Of Application State — APIs return links to related resources. Advanced REST concept, rarely implemented in practice.

---

*Design your Zenith API following these patterns. A well-designed API impresses interviewers immediately!* 🔗
