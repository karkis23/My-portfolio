# 📘 Complete Python Backend Guide
## FastAPI from Zero to Production

---

## Chapter 1: Python Fundamentals for Backend

### 1.1 Core Data Types

```python
# Strings
name = "Karki"
greeting = f"Hello, {name}!"                         # f-string
multiline = """Multiple
lines here"""
parts = "a,b,c".split(",")                           # ['a', 'b', 'c']
joined = "-".join(["a", "b", "c"])                    # 'a-b-c'

# Lists (mutable, ordered)
signals = ["LONG", "SHORT", "NEUTRAL"]
signals.append("LONG")
signals.remove("NEUTRAL")
last = signals.pop()
filtered = [s for s in signals if s == "LONG"]        # list comprehension

# Dictionaries (key-value pairs)
trade = {"symbol": "NIFTY", "direction": "LONG", "confidence": 0.85}
trade["entry_price"] = 23500                          # add/update
value = trade.get("missing_key", "default")           # safe get
for key, val in trade.items():                        # iterate
    print(f"{key}: {val}")

# Sets (unique values, unordered)
unique_symbols = {"NIFTY", "BANKNIFTY", "NIFTY"}     # → {'NIFTY', 'BANKNIFTY'}

# Tuples (immutable)
coordinates = (28.6139, 77.2090)
lat, lng = coordinates                                # unpacking
```

### 1.2 Functions

```python
# Basic function
def calculate_pnl(entry: float, exit_price: float, qty: int) -> float:
    """Calculate profit/loss."""
    return (exit_price - entry) * qty

# Default parameters
def predict(features: list[float], threshold: float = 0.75) -> str:
    score = sum(features) / len(features)
    return "LONG" if score > threshold else "SHORT"

# *args and **kwargs
def log_trade(*args, **kwargs):
    print(f"Args: {args}")      # tuple of positional args
    print(f"Kwargs: {kwargs}")  # dict of keyword args

log_trade("NIFTY", "LONG", confidence=0.85, entry=23500)

# Lambda (anonymous function)
signals.sort(key=lambda s: s["confidence"], reverse=True)

# Decorators
import time
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"{func.__name__} took {duration:.3f}s")
        return result
    return wrapper

@timer
def heavy_computation():
    return sum(range(10_000_000))
```

### 1.3 OOP (Object-Oriented Python)

```python
from dataclasses import dataclass
from abc import ABC, abstractmethod

# Dataclass (modern, cleaner syntax)
@dataclass
class Signal:
    symbol: str
    direction: str
    confidence: float
    features: list[float]
    
    def is_strong(self) -> bool:
        return self.confidence >= 0.80
    
    def __str__(self) -> str:
        return f"{self.symbol} {self.direction} ({self.confidence:.0%})"

# Usage
signal = Signal("NIFTY", "LONG", 0.85, [0.5, 0.3, 0.8])
print(signal)            # NIFTY LONG (85%)
print(signal.is_strong()) # True

# Abstract base class (interface-like)
class BasePredictor(ABC):
    @abstractmethod
    def predict(self, features: list[float]) -> str:
        pass

class AIPredictor(BasePredictor):
    def predict(self, features: list[float]) -> str:
        score = sum(features) / len(features)
        return "LONG" if score > 0.5 else "SHORT"
```

### 1.4 Async/Await (Critical for FastAPI)

```python
import asyncio
import httpx

# Sync — blocks while waiting
def fetch_sync():
    import requests
    r = requests.get("https://api.example.com/data")
    return r.json()

# Async — non-blocking (can do other work while waiting)
async def fetch_async():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.example.com/data")
        return r.json()

# Run multiple async tasks concurrently
async def main():
    results = await asyncio.gather(
        fetch_async(),
        fetch_async(),
        fetch_async(),
    )  # 3 requests at the SAME TIME, not one-by-one
    return results
```

---

## Chapter 2: FastAPI Framework

### 2.1 Your First API

```python
# main.py
from fastapi import FastAPI

app = FastAPI(
    title="Zenith Intelligence Engine",
    description="AI-powered trading signal API",
    version="4.0.0",
)

@app.get("/")
async def root():
    return {"message": "Zenith Engine is running", "version": "4.0.0"}

@app.get("/health")
async def health():
    return {"status": "ok", "uptime": "5d 3h 22m"}
```

Run: `uvicorn main:app --reload`
→ API: `http://localhost:8000`
→ Docs: `http://localhost:8000/docs` (auto-generated Swagger UI!)

### 2.2 Path & Query Parameters

```python
# Path parameters
@app.get("/signals/{signal_id}")
async def get_signal(signal_id: int):
    return {"signal_id": signal_id, "direction": "LONG"}

# Query parameters
@app.get("/signals")
async def list_signals(
    direction: str | None = None,
    min_confidence: float = 0.0,
    page: int = 1,
    limit: int = 20,
):
    return {
        "direction": direction,
        "min_confidence": min_confidence,
        "page": page,
        "limit": limit,
    }
# GET /signals?direction=LONG&min_confidence=0.8&page=2
```

### 2.3 Request Body with Pydantic Models

```python
from pydantic import BaseModel, Field, validator
from datetime import datetime

class SignalCreate(BaseModel):
    symbol: str = Field(..., min_length=1, max_length=20)
    direction: str = Field(..., pattern="^(LONG|SHORT|NEUTRAL)$")
    confidence: float = Field(..., ge=0.0, le=1.0)
    features: list[float] = Field(..., min_length=1)
    
    @validator("features")
    def validate_features(cls, v):
        if len(v) != 57:
            raise ValueError(f"Expected 57 features, got {len(v)}")
        return v

class SignalResponse(BaseModel):
    id: int
    symbol: str
    direction: str
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True  # works with ORM objects

# Endpoint using models
@app.post("/signals", response_model=SignalResponse, status_code=201)
async def create_signal(signal: SignalCreate):
    # FastAPI automatically validates the input!
    # If validation fails → returns 422 with details
    new_signal = save_to_db(signal)
    return new_signal
```

### 2.4 Error Handling

```python
from fastapi import HTTPException, status

@app.get("/signals/{signal_id}")
async def get_signal(signal_id: int):
    signal = find_signal_by_id(signal_id)
    if not signal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Signal {signal_id} not found"
        )
    return signal

# Global exception handler
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"error": str(exc), "type": "validation_error"}
    )
```

### 2.5 Middleware

```python
import time
from fastapi import Request

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    
    print(f"{request.method} {request.url.path} → {response.status_code} ({duration:.3f}s)")
    response.headers["X-Process-Time"] = str(duration)
    
    return response
```

---

## Chapter 3: Database with SQLAlchemy

### 3.1 Setup

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = "postgresql://postgres:secret@localhost:5432/zenith"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 3.2 Models

```python
# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="viewer")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    signals = relationship("Signal", back_populates="user")

class Signal(Base):
    __tablename__ = "signals"
    
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(20), nullable=False, index=True)
    direction = Column(String(10), nullable=False)
    confidence = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    user = relationship("User", back_populates="signals")
```

### 3.3 CRUD Operations

```python
# crud.py
from sqlalchemy.orm import Session
from models import User, Signal
from schemas import SignalCreate

def get_signals(db: Session, skip: int = 0, limit: int = 20):
    return db.query(Signal).offset(skip).limit(limit).all()

def get_signal(db: Session, signal_id: int):
    return db.query(Signal).filter(Signal.id == signal_id).first()

def create_signal(db: Session, signal: SignalCreate, user_id: int):
    db_signal = Signal(**signal.model_dump(), user_id=user_id)
    db.add(db_signal)
    db.commit()
    db.refresh(db_signal)
    return db_signal

def get_signals_by_direction(db: Session, direction: str):
    return db.query(Signal).filter(Signal.direction == direction).all()

# Using in endpoint
@app.get("/signals")
async def list_signals(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return crud.get_signals(db, skip=skip, limit=limit)
```

### 3.4 Alembic Migrations

```bash
# Install
pip install alembic

# Initialize
alembic init alembic

# In alembic/env.py, set:
# target_metadata = Base.metadata

# Create migration
alembic revision --autogenerate -m "add signals table"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## Chapter 4: Project Structure (Production)

```
zenith-engine/
├── app/
│   ├── __init__.py
│   ├── main.py                ← FastAPI app creation, middleware
│   ├── config.py              ← Settings (env variables)
│   ├── database.py            ← DB connection, session
│   ├── models/                ← SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── signal.py
│   ├── schemas/               ← Pydantic request/response models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── signal.py
│   ├── api/                   ← Route handlers (endpoints)
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── signals.py
│   │   └── predictions.py
│   ├── services/              ← Business logic
│   │   ├── __init__.py
│   │   ├── predictor.py
│   │   └── preprocessor.py
│   ├── core/                  ← Auth, security
│   │   ├── __init__.py
│   │   ├── security.py
│   │   └── deps.py
│   └── utils/                 ← Helpers
│       └── formatting.py
├── alembic/                   ← Database migrations
├── tests/                     ← All tests
│   ├── conftest.py
│   ├── test_api_signals.py
│   └── test_services.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
└── README.md
```

### Config with Pydantic Settings

```python
# config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    redis_url: str = "redis://localhost:6379"
    debug: bool = False
    
    class Config:
        env_file = ".env"

settings = Settings()
```

---

## Chapter 5: Background Tasks & WebSockets

### Background Tasks
```python
from fastapi import BackgroundTasks

def send_notification(email: str, message: str):
    # This runs IN THE BACKGROUND, doesn't block the response
    import smtplib
    # Send email...

@app.post("/signals")
async def create_signal(signal: SignalCreate, bg_tasks: BackgroundTasks):
    new_signal = save_to_db(signal)
    bg_tasks.add_task(send_notification, "admin@zenith.ai", f"New signal: {signal.direction}")
    return new_signal  # Returns immediately, notification sends in background
```

### WebSockets (Real-time)
```python
from fastapi import WebSocket, WebSocketDisconnect

connected_clients: list[WebSocket] = []

@app.websocket("/ws/signals")
async def signal_feed(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast to all connected clients
            for client in connected_clients:
                await client.send_json({"type": "signal", "data": data})
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
```

---

*Build a complete FastAPI backend with auth, database, and real-time signals for your Zenith Pro project.* 🐍
