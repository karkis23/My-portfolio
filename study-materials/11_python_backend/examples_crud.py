"""
Python Backend Examples — FastAPI CRUD API
A complete, runnable mini-application

Install:
  pip install fastapi uvicorn pydantic

Run:
  uvicorn examples_crud:app --reload

Test:
  Open http://localhost:8000/docs (Swagger UI)
"""

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional
from enum import Enum


# =============================================
# APP SETUP
# =============================================

app = FastAPI(
    title="Zenith Signals API",
    description="CRUD example for learning FastAPI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================
# MODELS (Pydantic Schemas)
# =============================================

class Direction(str, Enum):
    LONG = "LONG"
    SHORT = "SHORT"
    NEUTRAL = "NEUTRAL"

class SignalCreate(BaseModel):
    """Request body for creating a signal."""
    symbol: str = Field(..., min_length=1, max_length=20, examples=["NIFTY"])
    direction: Direction = Field(..., examples=[Direction.LONG])
    confidence: float = Field(..., ge=0.0, le=1.0, examples=[0.85])
    notes: Optional[str] = Field(None, max_length=500)

class SignalUpdate(BaseModel):
    """Request body for updating a signal (all fields optional)."""
    symbol: Optional[str] = Field(None, min_length=1, max_length=20)
    direction: Optional[Direction] = None
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0)
    notes: Optional[str] = Field(None, max_length=500)

class SignalResponse(BaseModel):
    """Response model for a signal."""
    id: int
    symbol: str
    direction: Direction
    confidence: float
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

class PaginatedResponse(BaseModel):
    """Paginated list response."""
    data: list[SignalResponse]
    total: int
    page: int
    limit: int
    total_pages: int


# =============================================
# IN-MEMORY DATABASE (replace with real DB)
# =============================================

signals_db: dict[int, dict] = {}
next_id: int = 1

def seed_data():
    """Add some sample data."""
    global next_id
    samples = [
        {"symbol": "NIFTY", "direction": "LONG", "confidence": 0.85, "notes": "Strong uptrend"},
        {"symbol": "BANKNIFTY", "direction": "SHORT", "confidence": 0.72, "notes": "Resistance hit"},
        {"symbol": "RELIANCE", "direction": "LONG", "confidence": 0.91, "notes": "Breakout confirmed"},
        {"symbol": "TCS", "direction": "NEUTRAL", "confidence": 0.55, "notes": "Consolidating"},
        {"symbol": "INFY", "direction": "LONG", "confidence": 0.78, "notes": "Earnings beat"},
    ]
    now = datetime.now(timezone.utc)
    for sample in samples:
        signals_db[next_id] = {
            **sample,
            "id": next_id,
            "created_at": now,
            "updated_at": now,
        }
        next_id += 1

seed_data()


# =============================================
# ENDPOINTS
# =============================================

# --- Health Check ---
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "ok", "signals_count": len(signals_db)}


# --- LIST (GET /signals) ---
@app.get("/signals", response_model=PaginatedResponse)
async def list_signals(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    direction: Optional[Direction] = Query(None, description="Filter by direction"),
    min_confidence: float = Query(0.0, ge=0.0, le=1.0, description="Minimum confidence"),
    sort_by: str = Query("created_at", description="Sort field"),
    order: str = Query("desc", description="Sort order: asc or desc"),
):
    """
    List all signals with pagination, filtering, and sorting.
    
    Examples:
    - GET /signals?page=1&limit=5
    - GET /signals?direction=LONG&min_confidence=0.8
    - GET /signals?sort_by=confidence&order=desc
    """
    # Filter
    filtered = list(signals_db.values())
    if direction:
        filtered = [s for s in filtered if s["direction"] == direction.value]
    filtered = [s for s in filtered if s["confidence"] >= min_confidence]
    
    # Sort
    reverse = order == "desc"
    try:
        filtered.sort(key=lambda s: s.get(sort_by, 0), reverse=reverse)
    except (KeyError, TypeError):
        pass
    
    # Paginate
    total = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    page_data = filtered[start:end]
    
    return PaginatedResponse(
        data=page_data,
        total=total,
        page=page,
        limit=limit,
        total_pages=(total + limit - 1) // limit,
    )


# --- GET ONE (GET /signals/{id}) ---
@app.get("/signals/{signal_id}", response_model=SignalResponse)
async def get_signal(signal_id: int):
    """Get a single signal by ID."""
    signal = signals_db.get(signal_id)
    if not signal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Signal {signal_id} not found",
        )
    return signal


# --- CREATE (POST /signals) ---
@app.post("/signals", response_model=SignalResponse, status_code=status.HTTP_201_CREATED)
async def create_signal(signal_in: SignalCreate):
    """
    Create a new signal.
    
    The request body is automatically validated by Pydantic:
    - symbol: 1-20 characters
    - direction: LONG, SHORT, or NEUTRAL
    - confidence: 0.0 to 1.0
    """
    global next_id
    now = datetime.now(timezone.utc)
    
    new_signal = {
        "id": next_id,
        **signal_in.model_dump(),
        "direction": signal_in.direction.value,
        "created_at": now,
        "updated_at": now,
    }
    
    signals_db[next_id] = new_signal
    next_id += 1
    
    return new_signal


# --- UPDATE (PATCH /signals/{id}) ---
@app.patch("/signals/{signal_id}", response_model=SignalResponse)
async def update_signal(signal_id: int, signal_in: SignalUpdate):
    """
    Partially update a signal. Only provided fields are updated.
    """
    signal = signals_db.get(signal_id)
    if not signal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Signal {signal_id} not found",
        )
    
    update_data = signal_in.model_dump(exclude_unset=True)
    if "direction" in update_data and update_data["direction"]:
        update_data["direction"] = update_data["direction"].value
    
    signal.update(update_data)
    signal["updated_at"] = datetime.now(timezone.utc)
    
    return signal


# --- DELETE (DELETE /signals/{id}) ---
@app.delete("/signals/{signal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_signal(signal_id: int):
    """Delete a signal by ID."""
    if signal_id not in signals_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Signal {signal_id} not found",
        )
    del signals_db[signal_id]


# --- STATISTICS (GET /signals/stats) ---
@app.get("/signals/stats")
async def signal_stats():
    """
    Aggregate statistics for all signals.
    Demonstrates computed endpoints.
    """
    if not signals_db:
        return {"total": 0}
    
    signals = list(signals_db.values())
    confidences = [s["confidence"] for s in signals]
    
    direction_counts: dict[str, int] = {}
    for s in signals:
        d = s["direction"]
        direction_counts[d] = direction_counts.get(d, 0) + 1
    
    return {
        "total": len(signals),
        "by_direction": direction_counts,
        "avg_confidence": round(sum(confidences) / len(confidences), 3),
        "max_confidence": max(confidences),
        "min_confidence": min(confidences),
        "strongest": max(signals, key=lambda s: s["confidence"])["symbol"],
    }


# =============================================
# RUN (for direct execution)
# =============================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("examples_crud:app", host="0.0.0.0", port=8000, reload=True)
