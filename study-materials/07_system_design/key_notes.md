# 🗝️ System Design — Key Notes (Cheat Sheet)

## Interview Framework (4 Steps — Time Yourself)

| Step | Time | What to Do |
|---|---|---|
| 1. Requirements | 3-5 min | Ask: functional + non-functional + scope |
| 2. High-Level Design | 10-15 min | Draw: client → server → DB → cache. Define APIs |
| 3. Deep Dive | 10-15 min | Database schema, scaling, critical components |
| 4. Trade-offs | 5 min | Bottlenecks, monitoring, what you'd improve |

---

## Scalability Cheat Sheet

```
Problem: Too many requests      → Load Balancer (Nginx, ALB)
Problem: Slow reads             → Cache (Redis) + Read Replicas
Problem: Slow globally          → CDN (CloudFront, Cloudflare)
Problem: Database bottleneck    → Sharding + Read Replicas
Problem: Tight coupling         → Message Queue (Kafka, RabbitMQ)
Problem: Long computations      → Async workers (Celery, background jobs)
```

## Key Numbers to Know

| Metric | Value |
|---|---|
| L1 cache access | 0.5 ns |
| RAM access | 100 ns |
| SSD read | 150 μs |
| Network round trip (same DC) | 500 μs |
| HDD read | 10 ms |
| Network round trip (cross DC) | 150 ms |
| 1 request/sec = | 2.5M requests/month |
| 1 MB * 1M users = | 1 TB |

## CAP Theorem
```
Pick 2 of 3:
  C (Consistency)    — every read gets latest write
  A (Availability)   — every request gets a response
  P (Partition Tolerance) — system works despite network failures

CP → Banks (consistency matters most)
AP → Social media (availability matters most)
CA → Not possible in distributed systems
```

## Common Design Problems — Key Components

| System | Core Components | Key Decisions |
|---|---|---|
| **URL Shortener** | Hash + Base62, Redis cache, DB | Short code generation, collision handling |
| **Twitter Feed** | Fan-out, timeline cache, async | Fan-out on write vs read |
| **Chat App** | WebSocket, Kafka, Cassandra | Real-time delivery, offline storage |
| **Rate Limiter** | Token bucket, Redis counter | Distributed counting |
| **File Storage** | Chunking, metadata DB, CDN, S3 | Deduplication, replication |
| **Search Engine** | Inverted index, ranking | Elasticsearch, relevance |
| **Notification** | Priority queue, channels | Push vs pull, multi-channel |

## Database Choices

| Need | Choose | Why |
|---|---|---|
| Structured data + relationships | **PostgreSQL** | ACID, powerful queries |
| High-speed caching | **Redis** | In-memory, O(1) lookups |
| Document storage | **MongoDB** | Flexible schema, JSON |
| Write-heavy time-series | **Cassandra** | Distributed, write-optimized |
| Full-text search | **Elasticsearch** | Inverted index, fast search |
| Graph relationships | **Neo4j** | Efficient graph traversal |

## API Design Quick Reference

```
GET    /api/v1/resources          → List (paginated)
GET    /api/v1/resources/:id      → Get one
POST   /api/v1/resources          → Create
PUT    /api/v1/resources/:id      → Full update
PATCH  /api/v1/resources/:id      → Partial update
DELETE /api/v1/resources/:id      → Delete

Pagination: ?page=2&limit=20
Filtering:  ?status=active&sort=created_at&order=desc
```

## HTTP Status Codes (Must Know)

| Code | Meaning | When |
|---|---|---|
| 200 | OK | GET/PUT/PATCH success |
| 201 | Created | POST success |
| 204 | No Content | DELETE success |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | Token valid, no permission |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Server bug |
