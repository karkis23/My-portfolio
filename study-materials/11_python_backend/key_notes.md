# 🗝️ Python Backend — Key Notes (Cheat Sheet)

## FastAPI Quick Reference

### Endpoint Patterns
```python
@app.get("/items")                          # List
@app.get("/items/{id}")                     # Get one
@app.post("/items", status_code=201)        # Create
@app.put("/items/{id}")                     # Full update
@app.patch("/items/{id}")                   # Partial update
@app.delete("/items/{id}", status_code=204) # Delete
```

### Parameter Types
```python
# Path: /users/123
async def get_user(user_id: int):

# Query: /users?role=admin&page=2
async def list_users(role: str | None = None, page: int = 1):

# Body: JSON in request body
async def create_user(user: UserCreate):

# Header: Authorization header
async def protected(authorization: str = Header()):

# Dependency Injection
async def endpoint(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
```

### Pydantic Validation Cheat Sheet
```python
from pydantic import BaseModel, Field, validator

class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)   # required string
    price: float = Field(..., gt=0)                         # must be > 0
    quantity: int = Field(default=1, ge=0)                  # optional, >= 0
    tags: list[str] = []                                    # optional list
    category: str = Field(..., pattern="^(A|B|C)$")         # regex validation
    
    @validator("name")
    def name_must_be_alpha(cls, v):
        if not v.replace(" ", "").isalpha():
            raise ValueError("Name must contain only letters")
        return v.title()
```

### Response Types
```python
from fastapi.responses import JSONResponse, FileResponse, StreamingResponse

# JSON (default)
return {"key": "value"}

# Custom status code
return JSONResponse(content={"msg": "created"}, status_code=201)

# File download
return FileResponse("report.pdf")

# Streaming
return StreamingResponse(generate_csv(), media_type="text/csv")
```

---

## SQLAlchemy Quick Reference

### Common Query Patterns
```python
# Get all
db.query(Signal).all()

# Get one (or None)
db.query(Signal).filter(Signal.id == 5).first()

# Get one (or raise)
db.query(Signal).filter(Signal.id == 5).one()

# Filter with multiple conditions
db.query(Signal).filter(
    Signal.direction == "LONG",
    Signal.confidence >= 0.8,
    Signal.symbol.in_(["NIFTY", "BANKNIFTY"])
).all()

# Order + limit
db.query(Signal).order_by(Signal.created_at.desc()).limit(10).all()

# Count
db.query(Signal).filter(Signal.direction == "LONG").count()

# Aggregate
from sqlalchemy import func
db.query(func.avg(Signal.confidence)).scalar()

# Join
db.query(Signal, User).join(User).filter(User.role == "admin").all()
```

### CRUD Template
```python
def create(db: Session, obj_in: CreateSchema):
    db_obj = Model(**obj_in.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update(db: Session, db_obj: Model, obj_in: UpdateSchema):
    for field, value in obj_in.model_dump(exclude_unset=True).items():
        setattr(db_obj, field, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def delete(db: Session, db_obj: Model):
    db.delete(db_obj)
    db.commit()
```

---

## Python Must-Know Concepts

| Concept | What | Example |
|---|---|---|
| **List comprehension** | Create lists concisely | `[x*2 for x in range(10) if x > 3]` |
| **Dict comprehension** | Create dicts concisely | `{k: v for k, v in pairs}` |
| **Generator** | Lazy iteration | `(x*2 for x in range(10))` |
| **Decorator** | Wrap function with extra behavior | `@timer`, `@app.get("/")` |
| **Context manager** | Auto cleanup (with statement) | `with open('f') as f:` |
| **Dataclass** | Class with less boilerplate | `@dataclass class User:` |
| **Type hints** | Document expected types | `def fn(x: int) -> str:` |
| **f-string** | String formatting | `f"Hello {name}, {age=}"` |
| **Walrus operator** | Assign + use in expression | `if (n := len(a)) > 10:` |
| **Match statement** | Pattern matching (3.10+) | `match status: case 200:` |

## Key Libraries

```bash
# Web framework
fastapi
uvicorn[standard]

# Database
sqlalchemy
alembic
asyncpg              # async PostgreSQL driver

# Validation
pydantic
pydantic-settings

# Auth
python-jose[cryptography]
passlib[bcrypt]

# HTTP client
httpx                # async-compatible requests

# Testing
pytest
pytest-asyncio
pytest-cov

# Utilities
python-dotenv
redis
celery               # background task queue
```

## Common HTTP Status Codes in FastAPI

```python
from fastapi import status

status.HTTP_200_OK
status.HTTP_201_CREATED
status.HTTP_204_NO_CONTENT
status.HTTP_400_BAD_REQUEST
status.HTTP_401_UNAUTHORIZED
status.HTTP_403_FORBIDDEN
status.HTTP_404_NOT_FOUND
status.HTTP_422_UNPROCESSABLE_ENTITY
status.HTTP_500_INTERNAL_SERVER_ERROR
```
