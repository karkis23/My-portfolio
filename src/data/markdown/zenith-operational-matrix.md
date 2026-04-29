# 🤖 System Architecture — NIFTY Trading Bot (v4.0)

> **Last Updated:** March 2026

---

## 1. Architectural Overview

The Zenith trading system is a hybrid institutional-grade platform utilizing a microservice architecture. The system separates data orchestration from logic and computation.

| Component | Infrastructure | Status |
|---|---|---|
| **Python AI API** | FastAPI Server | Active (`localhost:8000`) |
| **Automation Workflow** | n8n Platform | Decoupled Data Messenger |
| **Fallback Logic** | `rule_engine.py` | Deterministic Rules Engine |
| **Inference Logic** | `signal_engine.py` | XGBoost Model Loader |
| **Mathematical Engine** | `indicators.py` | Pandas/NumPy Calculator |
| **Options Intelligence** | `writers_zone.py` | GEX, Max Pain, IV Skew metrics |
| **Client Interface** | React + Vite | Active (`localhost:5173`) |

---

## 2. Core Upgrades (v4.0)

- **Decoupled Logic:** All mathematical computations and signal logic are processed in a dedicated Python API. The automation workflow (n8n) acts exclusively as a data transport layer.
- **ML Data Pipeline:** Implementation of `preprocessor.py`, generating a 57-feature normalized vector suitable for machine learning training.
- **Advanced Indicators:** Integration of institutional-grade metrics including Volume Profile (POC/VAH/VAL) and Gamma Exposure (GEX).

---

## 3. Directory Structure and Responsibilities

- **Signal Logic:**
  - `api/engine/rule_engine.py`: Defines the deterministic fallback execution parameters.
  - `api/scripts/train_model.py`: Controls model training hyper-parameters.
- **Calculations:**
  - `api/engine/indicators.py`: Manages all Pandas and NumPy indicator generation.
  - `api/engine/writers_zone.py`: Manages option greeks and related financial logic.
- **API Endpoints:**
  - Hosted locally; the primary prediction route is exposed at `/api/predict`.

---

## 4. Operational Guidelines

### System Initialization
The Python microservice is initialized via standard ASGI server commands (e.g., Uvicorn). System health can be verified via the `/health` endpoint.

### Model Training
The machine learning pipeline is designed to ingest telemetry data. Once sufficient operational data is collected, `train_model.py` generates the active model, seamlessly transitioning the system from `RULES_FALLBACK` to `AI_ENSEMBLE` mode.

### Operational Constraints
- The system enforces a strict 09:15–15:30 IST market window filter within `rule_engine.py`.
- Final signals are restricted to explicitly defined strings to prevent execution errors.
- Schema definitions in `api/engine/models.py` must align exactly with the incoming JSON payloads to maintain pipeline integrity.
