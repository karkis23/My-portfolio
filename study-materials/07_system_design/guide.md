# 📘 Complete System Design Guide
## From Concepts to Interview-Ready Answers

---

## Chapter 1: System Design Interview Framework

Use this 4-step framework for EVERY system design question:

### Step 1: Requirements Clarification (3-5 min)
- Ask functional requirements (what should the system DO?)
- Ask non-functional requirements (performance, scale, availability)
- Define scope — what's in/out

### Step 2: High-Level Design (10-15 min)
- Draw the main components (client, server, database, cache)
- Show data flow between components
- Define APIs

### Step 3: Deep Dive (10-15 min)
- Elaborate on critical components
- Discuss database schema
- Address scaling challenges

### Step 4: Bottlenecks & Trade-offs (5 min)
- Identify potential bottlenecks
- Discuss trade-offs you made
- Mention monitoring and alerting

---

## Chapter 2: Scalability Concepts

### 2.1 Horizontal vs Vertical Scaling

```
Vertical Scaling:                 Horizontal Scaling:
┌──────────────────┐              ┌────────┐ ┌────────┐ ┌────────┐
│                  │              │Server 1│ │Server 2│ │Server 3│
│   BIG SERVER     │              └───┬────┘ └───┬────┘ └───┬────┘
│   (more CPU/RAM) │                  │          │          │
│                  │              ┌───┴──────────┴──────────┴───┐
└──────────────────┘              │       Load Balancer          │
                                  └─────────────────────────────┘
Pros: Simple                      Pros: Infinite scalability
Cons: Has a ceiling               Cons: More complex (state management)
```

### 2.2 Load Balancing

Distributes traffic across multiple servers.

**Algorithms:**
| Algorithm | How It Works | Best For |
|---|---|---|
| **Round Robin** | Server 1, 2, 3, 1, 2, 3... | Equal capacity servers |
| **Weighted Round Robin** | More traffic to powerful servers | Mixed capacity |
| **Least Connections** | Send to server with fewest active connections | Varying request durations |
| **IP Hash** | Same client → same server (consistent hashing) | Session stickiness |

### 2.3 Caching

Store frequently accessed data closer to the user.

```
Client → CDN (static assets) → Load Balancer → App Server → Cache (Redis) → Database
                                                                  ↑
                                                       95% of reads
                                                       served here
```

**Caching Strategies:**
| Strategy | How It Works | Best For |
|---|---|---|
| **Cache-Aside** | App checks cache first, then DB. Updates cache on miss | General purpose |
| **Write-Through** | App writes to cache AND DB simultaneously | Data consistency |
| **Write-Behind** | App writes to cache. Cache async writes to DB | High write throughput |
| **Read-Through** | Cache automatically loads from DB on miss | Simple implementation |

**Cache Invalidation:**
- **TTL (Time-To-Live):** Expire after N seconds
- **Event-Based:** Invalidate on data change
- **LRU (Least Recently Used):** Evict oldest unused items when cache is full

### 2.4 Database Scaling

**Read Replicas:**
```
Writes → Primary DB
Reads  → Replica 1, Replica 2, Replica 3 (copies of primary)
```

**Sharding (Partitioning):**
```
Users A-M → Shard 1 (Database 1)
Users N-Z → Shard 2 (Database 2)
```

### 2.5 CAP Theorem

In a distributed system, you can only guarantee 2 of 3:
- **C**onsistency — Every read gets the latest write
- **A**vailability — Every request gets a response
- **P**artition Tolerance — System works despite network failures

| Choice | Trade-off | Example |
|---|---|---|
| **CP** | May be unavailable during partitions | Banking systems, MongoDB |
| **AP** | May serve stale data | Social media feeds, DNS, Cassandra |
| **CA** | Not possible in distributed systems | Single-node databases |

### 2.6 Message Queues

Decouple services for async processing.

```
Producer → [  Queue  ] → Consumer
             Message 1
             Message 2        → Process async
             Message 3
```

**When to use:**
- Email sending (don't block user request)
- Image processing (resize in background)
- Order processing (validate, then fulfill async)
- Log aggregation

**Tools:** RabbitMQ, Redis Pub/Sub, Apache Kafka, AWS SQS

### 2.7 CDN (Content Delivery Network)

```
Without CDN:                      With CDN:
User (India) ────────→ Server     User (India) → CDN Edge (Mumbai) ✅ Fast
                      (US)              ↓ Cache miss only
                      🐌 Slow     Origin Server (US)
```

CDNs cache static assets (images, CSS, JS) at edge locations worldwide.

---

## Chapter 3: API Design Best Practices

```
GET    /api/v1/signals            → List all signals
GET    /api/v1/signals/:id        → Get single signal
POST   /api/v1/signals            → Create a signal
PUT    /api/v1/signals/:id        → Update a signal (full replace)
PATCH  /api/v1/signals/:id        → Partial update
DELETE /api/v1/signals/:id        → Delete a signal

# Pagination
GET /api/v1/signals?page=2&limit=20

# Filtering
GET /api/v1/signals?direction=LONG&confidence_gte=0.80

# Sorting
GET /api/v1/signals?sort_by=confidence&order=desc

# Response format
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

**HTTP Status Codes:**
| Code | Meaning | When to Use |
|---|---|---|
| **200** | OK | Successful GET/PUT/PATCH |
| **201** | Created | Successful POST |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid input |
| **401** | Unauthorized | Missing/invalid token |
| **403** | Forbidden | Valid token but insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate resource |
| **422** | Unprocessable Entity | Validation error |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server bug |

---

## Chapter 4: Design a URL Shortener (Interview Walkthrough)

### Requirements
- **Functional:** Shorten a URL, redirect short URL to original
- **Non-functional:** Low latency (<100ms), highly available, 100M URLs/month

### High-Level Design
```
Client → API Gateway → URL Service → Database
                              ↓
                           Cache (Redis)
```

### API Design
```
POST /api/shorten
  Body: { "url": "https://very-long-url.com/path/..." }
  Response: { "short_url": "https://short.ly/abc123" }

GET /:short_code → 301 Redirect to original URL
```

### Database Schema
```sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    short_code VARCHAR(8) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
```

### Short Code Generation
```python
import hashlib
import base64

def generate_short_code(url: str) -> str:
    # MD5 hash → Base62 encode → take first 7 chars
    hash_bytes = hashlib.md5(url.encode()).digest()
    encoded = base64.urlsafe_b64encode(hash_bytes).decode()
    return encoded[:7].replace('-', 'a').replace('_', 'b')
```

### Scaling
1. **Cache:** Redis for hot URLs (most URLs follow 80/20 rule)
2. **Database:** Shard by short_code hash
3. **Rate Limiting:** Prevent abuse (100 creates/hour per user)

---

## Chapter 5: Design a Chat Application

### Requirements
- 1-to-1 and group messaging
- Online/offline status
- Message delivery confirmation (sent, delivered, read)
- 50M daily active users

### Architecture
```
┌─────────┐    WebSocket    ┌──────────────┐    ┌───────────┐
│  Client  │←──────────────→│  Chat Server  │───→│ Message DB│
└─────────┘                 └──────┬───────┘    └───────────┘
                                   │
                            ┌──────┴───────┐
                            │ Message Queue │
                            │   (Kafka)     │
                            └──────────────┘
```

### Key Decisions
- **WebSocket** for real-time bidirectional communication
- **Message Queue** for guaranteed delivery
- **NoSQL (Cassandra)** for messages (write-heavy, time-series)
- **Redis** for online status and recent messages cache

### Message Flow
```
1. User A sends message to User B
2. Chat Server receives via WebSocket
3. Server publishes to Kafka
4. Consumer stores in Cassandra
5. If User B is online: push via WebSocket
6. If User B is offline: store for later delivery (push notification)
```

---

## Chapter 6: Design a Rate Limiter

### Algorithms

**1. Token Bucket:**
```
Bucket capacity: 10 tokens
Refill rate: 1 token/second

Request comes in:
  - If bucket has tokens → accept, remove 1 token
  - If bucket is empty → reject (429)
```

**2. Sliding Window:**
```python
import time
from collections import defaultdict

class SlidingWindowRateLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = defaultdict(list)  # user_id → [timestamps]
    
    def is_allowed(self, user_id):
        now = time.time()
        window_start = now - self.window
        
        # Remove old requests
        self.requests[user_id] = [
            t for t in self.requests[user_id] if t > window_start
        ]
        
        if len(self.requests[user_id]) < self.max_requests:
            self.requests[user_id].append(now)
            return True
        return False

# Usage
limiter = SlidingWindowRateLimiter(max_requests=10, window_seconds=60)
limiter.is_allowed("user_123")  # True (first request)
```

### Production Implementation (Redis)
```python
import redis

r = redis.Redis()

def is_rate_limited(user_id, max_requests=10, window=60):
    key = f"rate:{user_id}"
    current = r.get(key)
    
    if current is None:
        r.setex(key, window, 1)
        return False
    elif int(current) < max_requests:
        r.incr(key)
        return False
    else:
        return True  # Rate limited!
```

---

## System Design Cheat Sheet

| System | Key Components | Key Decisions |
|---|---|---|
| **URL Shortener** | Hash function, cache, database | Base62 encoding, Redis cache |
| **Chat App** | WebSocket, message queue, push notifications | Kafka for reliability, Cassandra for storage |
| **Rate Limiter** | Token bucket/sliding window, Redis | Distributed counting with Redis |
| **Twitter Feed** | Fan-out, timeline cache, async processing | Fan-out on write for celebrities vs read |
| **File Storage** | Chunking, metadata DB, CDN | S3-like object storage, deduplication |
| **Notification** | Priority queue, channels, templates | Multi-channel (push, email, SMS) |
| **Search Engine** | Inverted index, ranking, caching | Elasticsearch, relevance scoring |

---

> [!TIP]
> **Your advantage:** You've ALREADY built a distributed system (Zenith: FastAPI → n8n → Google Sheets → Telegram). When discussing system design, reference your REAL architecture. Interviewers love candidates who relate concepts to experience.

*Study 1 design problem per week. Draw the architecture on paper. Practice explaining it out loud.* 🏗️
