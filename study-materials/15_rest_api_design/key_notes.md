# 🗝️ REST API Design — Key Notes (Cheat Sheet)

## URL Design Rules
```
✅ /api/v1/signals              → Plural nouns
✅ /api/v1/signals/42           → ID for specific resource
✅ /api/v1/users/5/signals      → Nested for relationships
✅ /api/v1/signals?page=2       → Query params for filtering

❌ /api/getSignals               → No verbs!
❌ /api/Signal                   → No singular!
❌ /api/deleteSignal/42          → No action in URL!
```

## HTTP Methods
```
GET     → Read (no body)
POST    → Create (with body)
PUT     → Full replace (with body)
PATCH   → Partial update (with body)
DELETE  → Remove (no body)
```

## Status Codes — Must Memorize

| Code | Name | When to Use |
|---|---|---|
| **200** | OK | GET/PUT/PATCH success |
| **201** | Created | POST created a resource |
| **204** | No Content | DELETE success |
| **400** | Bad Request | Invalid input/JSON |
| **401** | Unauthorized | Missing/invalid token |
| **403** | Forbidden | Valid token, no permission |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate (e.g., email exists) |
| **422** | Unprocessable | Validation error |
| **429** | Too Many Requests | Rate limited |
| **500** | Server Error | Bug in your code |

## Response Format Template
```json
// Success (single)
{ "data": { "id": 1, "name": "..." } }

// Success (list)
{
  "data": [...],
  "pagination": { "page": 1, "limit": 20, "total": 156, "totalPages": 8 }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Confidence must be between 0 and 1",
    "details": [{ "field": "confidence", "message": "Must be ≤ 1.0" }]
  }
}
```

## Pagination Query Params
```
?page=2&limit=20                → Offset-based (simple)
?cursor=eyJpZCI6NDJ9&limit=20  → Cursor-based (scalable)
?sort=created_at&order=desc     → Sorting
?direction=LONG&status=active   → Filtering
```

## Auth Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Rate Limiting Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 67
X-RateLimit-Reset: 1679000000
```

## API Design Interview Question
```
Q: Design the endpoints for a to-do app

POST   /api/v1/todos              → Create todo
GET    /api/v1/todos              → List (paginated, filter by status)
GET    /api/v1/todos/:id          → Get single
PATCH  /api/v1/todos/:id          → Update (mark complete)
DELETE /api/v1/todos/:id          → Delete

Bonus:
GET    /api/v1/todos/stats        → Count by status
GET    /api/v1/users/:id/todos    → User's todos
```
