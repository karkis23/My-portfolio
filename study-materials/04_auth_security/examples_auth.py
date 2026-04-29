"""
Complete Auth Example — FastAPI + JWT
Install: pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt]
Run:     uvicorn examples_auth:app --reload
Docs:    http://localhost:8000/docs
"""

from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel


# =============================================
# CONFIG
# =============================================
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 15  # minutes
REFRESH_TOKEN_EXPIRE = 7  # days

app = FastAPI(title="Auth Example API")

# CORS — allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# =============================================
# FAKE DATABASE (replace with real DB)
# =============================================
fake_users_db = {}


# =============================================
# MODELS
# =============================================
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str
    role: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# =============================================
# AUTH HELPERS
# =============================================
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_token(data: dict, expires_delta: timedelta, token_type: str) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "type": token_type})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_access_token(user_id: str, role: str) -> str:
    return create_token(
        {"sub": user_id, "role": role},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE),
        "access"
    )

def create_refresh_token(user_id: str, role: str) -> str:
    return create_token(
        {"sub": user_id, "role": role},
        timedelta(days=REFRESH_TOKEN_EXPIRE),
        "refresh"
    )


# =============================================
# DEPENDENCIES
# =============================================
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Extract and validate JWT from Authorization header."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        token_type = payload.get("type")
        if user_id is None or token_type != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": user_id, "role": payload.get("role")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")

async def require_admin(user: dict = Depends(get_current_user)):
    """Require admin role."""
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


# =============================================
# ENDPOINTS
# =============================================

@app.post("/register", response_model=UserResponse, status_code=201)
async def register(user: UserCreate):
    """Register a new user."""
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    fake_users_db[user.email] = {
        "username": user.username,
        "email": user.email,
        "password_hash": hash_password(user.password),
        "role": "viewer",
    }
    return UserResponse(username=user.username, email=user.email, role="viewer")


@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login and receive JWT tokens."""
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return Token(
        access_token=create_access_token(user["email"], user["role"]),
        refresh_token=create_refresh_token(user["email"], user["role"]),
    )


@app.get("/me")
async def get_profile(user: dict = Depends(get_current_user)):
    """Protected: Get current user profile."""
    return {"user_id": user["user_id"], "role": user["role"]}


@app.get("/predict")
async def predict(user: dict = Depends(get_current_user)):
    """Protected: AI prediction endpoint."""
    return {
        "direction": "LONG",
        "confidence": 0.82,
        "requested_by": user["user_id"],
    }


@app.delete("/admin/users/{email}")
async def delete_user(email: str, admin: dict = Depends(require_admin)):
    """Admin only: Delete a user."""
    if email not in fake_users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del fake_users_db[email]
    return {"message": f"User {email} deleted", "deleted_by": admin["user_id"]}


@app.get("/health")
async def health():
    return {"status": "ok"}
