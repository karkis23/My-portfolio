# 📘 Complete Authentication & Security Guide
## JWT, OAuth2, Password Hashing & Security Best Practices

---

## Chapter 1: Authentication Fundamentals

### Authentication vs Authorization

| Concept | Question It Answers | Example |
|---|---|---|
| **Authentication (AuthN)** | "WHO are you?" | Login with username + password |
| **Authorization (AuthZ)** | "WHAT can you do?" | Admin can delete, viewer can only read |

### Authentication Methods

| Method | How It Works | Used For |
|---|---|---|
| **Session-Based** | Server stores session in memory, sends cookie | Traditional web apps |
| **Token-Based (JWT)** | Server sends token, client sends it with each request | APIs, SPAs, mobile apps |
| **OAuth 2.0** | Third-party login (Google, GitHub) | "Login with Google" |
| **API Keys** | Static key in request headers | Server-to-server, public APIs |

> [!IMPORTANT]
> **For modern web apps (React + FastAPI), JWT is the standard.** Learn JWT first, then OAuth 2.0.

---

## Chapter 2: Password Hashing

**NEVER store passwords as plain text.** Always hash them.

### How Hashing Works:
```
Password: "mypassword123"
    ↓ bcrypt hash
Hash: "$2b$12$LJ3m4ys4Lz/DXsJPT4e9XOxmRVz4EgFt5fN2kqK..."

- One-way: cannot reverse hash → password
- Same password → different hash each time (salt)
- Slow by design (prevents brute force)
```

### Implementation with passlib:
```python
# pip install passlib[bcrypt]
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password for storage."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

# Usage
hashed = hash_password("mypassword123")
print(hashed)  # $2b$12$LJ3m4ys4Lz/DXsJPT4e9XO...

is_valid = verify_password("mypassword123", hashed)
print(is_valid)  # True

is_valid = verify_password("wrongpassword", hashed)
print(is_valid)  # False
```

---

## Chapter 3: JWT (JSON Web Tokens)

### 3.1 What is a JWT?

A JWT is a self-contained token with three parts:
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
 └──── Header ──────┘ └─────── Payload ──────────┘ └────────── Signature ──────────────┘
```

| Part | Contains | Example |
|---|---|---|
| **Header** | Algorithm + token type | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | Data (claims) | `{"sub": "user123", "role": "admin", "exp": 1679000000}` |
| **Signature** | Verification hash | HMAC-SHA256(header + payload, secret) |

### 3.2 Access Token + Refresh Token Flow

```
┌──────────┐                            ┌──────────┐
│  Client  │                            │  Server  │
└────┬─────┘                            └────┬─────┘
     │                                       │
     │  1. POST /login (email, password)     │
     │──────────────────────────────────────→│
     │                                       │ Verify credentials
     │  2. Return access_token (15min)       │ Generate tokens
     │     + refresh_token (7 days)          │
     │←──────────────────────────────────────│
     │                                       │
     │  3. GET /api/data                     │
     │     Authorization: Bearer <access>    │
     │──────────────────────────────────────→│
     │                                       │ Verify token
     │  4. Return data                       │
     │←──────────────────────────────────────│
     │                                       │
     │  ... 15 minutes later, token expires  │
     │                                       │
     │  5. POST /refresh                     │
     │     Body: { refresh_token }           │
     │──────────────────────────────────────→│
     │                                       │ Verify refresh token
     │  6. Return new access_token           │
     │←──────────────────────────────────────│
```

### 3.3 Complete FastAPI JWT Implementation

```python
# auth.py
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# ----- Configuration -----
SECRET_KEY = "your-super-secret-key-change-this"  # Use env variable in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# ----- Pydantic Models -----
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None
    role: Optional[str] = None


# ----- Token Creation -----
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ----- Token Verification -----
def verify_token(token: str, expected_type: str = "access") -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        role: str = payload.get("role")
        token_type: str = payload.get("type")
        
        if user_id is None or token_type != expected_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
        return TokenData(user_id=user_id, role=role)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired or invalid",
        )


# ----- Dependency: Get Current User -----
async def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    """Dependency that extracts and validates the JWT from the request."""
    return verify_token(token, expected_type="access")


# ----- Dependency: Require Admin Role -----
async def require_admin(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Dependency that requires the user to be an admin."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user
```

### 3.4 API Endpoints

```python
# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from auth import (
    hash_password, verify_password,
    create_access_token, create_refresh_token, verify_token,
    get_current_user, require_admin,
    UserCreate, UserResponse, Token, TokenData
)

app = FastAPI(title="Zenith API")


# ----- Register -----
@app.post("/register", response_model=UserResponse, status_code=201)
async def register(user: UserCreate):
    # Check if user already exists (pseudo-code — use real DB)
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = hash_password(user.password)
    new_user = create_user_in_db(
        username=user.username,
        email=user.email,
        password_hash=hashed_pw,
        role="viewer"
    )
    return new_user


# ----- Login -----
@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email(form_data.username)  # username field holds email
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(data={"sub": user.id, "role": user.role})
    refresh_token = create_refresh_token(data={"sub": user.id, "role": user.role})
    
    return Token(access_token=access_token, refresh_token=refresh_token)


# ----- Refresh Token -----
@app.post("/refresh", response_model=Token)
async def refresh(refresh_token: str):
    token_data = verify_token(refresh_token, expected_type="refresh")
    
    new_access_token = create_access_token(
        data={"sub": token_data.user_id, "role": token_data.role}
    )
    new_refresh_token = create_refresh_token(
        data={"sub": token_data.user_id, "role": token_data.role}
    )
    
    return Token(access_token=new_access_token, refresh_token=new_refresh_token)


# ----- Protected Routes -----
@app.get("/me", response_model=UserResponse)
async def get_profile(current_user: TokenData = Depends(get_current_user)):
    """Anyone with a valid token can access this."""
    user = get_user_by_id(current_user.user_id)
    return user


@app.get("/predict")
async def predict(current_user: TokenData = Depends(get_current_user)):
    """Protected prediction endpoint."""
    return {"direction": "LONG", "confidence": 0.82, "user_id": current_user.user_id}


@app.delete("/users/{user_id}")
async def delete_user(user_id: int, admin: TokenData = Depends(require_admin)):
    """Only admins can delete users."""
    delete_user_from_db(user_id)
    return {"message": f"User {user_id} deleted"}
```

---

## Chapter 4: CORS (Cross-Origin Resource Sharing)

When your React app (localhost:3000) calls your FastAPI (localhost:8000), the browser blocks it by default. CORS fixes this.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",       # React dev server
        "http://localhost:5173",       # Vite dev server
        "https://your-domain.com",     # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],               # Allow all HTTP methods
    allow_headers=["*"],               # Allow all headers
)
```

---

## Chapter 5: Security Vulnerabilities to Know

### 5.1 SQL Injection
```python
# ❌ VULNERABLE — string concatenation
query = f"SELECT * FROM users WHERE email = '{email}'"

# ✅ SAFE — parameterized queries
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# ✅ SAFE — ORM (SQLAlchemy)
user = session.query(User).filter(User.email == email).first()
```

### 5.2 XSS (Cross-Site Scripting)
```javascript
// ❌ VULNERABLE — inserting raw HTML
element.innerHTML = userInput;

// ✅ SAFE — React does this automatically (escapes HTML)
<div>{userInput}</div>

// ⚠️ CAREFUL — dangerouslySetInnerHTML bypasses React's protection
<div dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
```

### 5.3 Environment Variables
```python
# ❌ NEVER hardcode secrets
SECRET_KEY = "my-secret-key"

# ✅ Use environment variables
import os
SECRET_KEY = os.getenv("SECRET_KEY")

# ✅ Or use .env file with python-dotenv
from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
```

**.env file (NEVER commit this to Git):**
```
SECRET_KEY=your-super-secret-key
DATABASE_URL=postgresql://user:pass@localhost/db
```

**.gitignore:**
```
.env
.env.local
.env.production
```

---

## Chapter 6: Rate Limiting

```python
# pip install slowapi
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/predict")
@limiter.limit("10/minute")  # Max 10 requests per minute per IP
async def predict(request: Request):
    return {"direction": "LONG"}
```

---

*Implement auth in your Zenith Engine: register → login → protected /predict endpoint. This is a MUST for any full-stack project.* 🔐
