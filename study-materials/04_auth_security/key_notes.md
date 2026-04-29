# 🗝️ Auth & Security — Key Notes (Cheat Sheet)

## Authentication Flow (JWT)
```
1. Client sends: POST /login {email, password}
2. Server verifies password hash (bcrypt)
3. Server creates JWT tokens:
   - Access Token  (15 min expiry)
   - Refresh Token (7 days expiry)
4. Client stores tokens
5. Client sends: GET /api/data Header: "Authorization: Bearer <access_token>"
6. Server decodes JWT, verifies signature + expiry
7. When access token expires → POST /refresh {refresh_token} → new tokens
```

## JWT Structure
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.signature
└──── Header ──────┘ └──── Payload ─────┘ └── Signature ──┘

Header:    {"alg": "HS256", "typ": "JWT"}
Payload:   {"sub": "user123", "role": "admin", "exp": 1679000000}
Signature: HMAC-SHA256(header + payload, SECRET_KEY)
```

## Password Security
```python
# NEVER: store plain text passwords
# ALWAYS: hash with bcrypt (slow by design, includes salt)

from passlib.context import CryptContext
pwd = CryptContext(schemes=["bcrypt"])

hashed = pwd.hash("mypassword")     # Hash for storage
is_valid = pwd.verify("mypassword", hashed)  # Verify at login
```

## Security Vulnerabilities Quick Reference

| Attack | What | Prevention |
|---|---|---|
| **SQL Injection** | `' OR 1=1 --` in input | Parameterized queries / ORM |
| **XSS** | `<script>alert()</script>` in input | React auto-escapes. Never use `dangerouslySetInnerHTML` |
| **CSRF** | Forged requests from other sites | CSRF tokens, SameSite cookies |
| **Brute Force** | Password guessing | Rate limiting, account lockout |
| **Token Theft** | Stolen JWT | Short expiry, HTTPS only, httpOnly cookies |

## CORS (in 1 sentence)
CORS allows your React app (localhost:3000) to call your API (localhost:8000) by adding allowed origins to the server.

```python
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"])
```

## Key Libraries
```bash
# Python
pip install python-jose[cryptography]   # JWT creation/verification
pip install passlib[bcrypt]             # Password hashing
pip install python-dotenv               # Environment variables

# Required in requirements.txt
python-jose[cryptography]
passlib[bcrypt]
python-dotenv
```

## Environment Variables
```bash
# .env file (NEVER commit to Git!)
SECRET_KEY=your-super-secret-key
DATABASE_URL=postgresql://user:pass@localhost/db
```
```python
# Load in Python
from dotenv import load_dotenv
import os
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
```
