# 01 — Project Overview: Zenith Intelligence

---

## Overview

Zenith is a fully automated, AI-assisted trading system for NIFTY 50 Options. It polls the live market at 5-minute intervals, calculates 57 unique technical and sentiment data points, and executes trades programmatically.

---

## System Architecture

The project consists of three primary, decoupled layers:

### Part 1: The Data Orchestrator (n8n)
n8n functions as the system's data transport and automation layer. At scheduled 5-minute intervals during market hours, the workflow aggregates live data from external providers:
- **Angel One API**: 5-minute OHLCV candlestick data.
- **TradingView**: Market volatility indexes (India VIX).
- **Broker API**: Live Options Chain data (OI, Premiums).

The orchestrator packages this data into a structured JSON payload and transmits it to the Python computation engine.

### Part 2: The Computation Engine (Python + FastAPI)
A dedicated microservice handles all mathematical logic and decision-making. 
1. **Data Validation**: Ensures payload integrity.
2. **Indicator Calculation**: Processes technical indicators and options chain intelligence.
3. **Feature Engineering**: Normalizes raw data into 57 machine-readable inputs.
4. **Decision Logic**: Routes data through the active AI model or deterministic rule engine.
5. **Response**: Returns a structured JSON object containing the execution signal and confidence score.

### Part 3: The Execution Layer
Upon receiving a valid execution signal (with sufficient confidence thresholds) from the Python engine, the n8n orchestrator initiates the trade via the broker's API, placing the required market, stop-loss, and target limit orders.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Automation | n8n |
| API Layer | Python 3.12 + FastAPI |
| Machine Learning | XGBoost |
| Data Processing | Pandas + NumPy |
| Dashboard UI | React + Vite + TypeScript |
| Market Data | Angel One SmartAPI / Dhan API |
| Telemetry Storage | PostgreSQL / Google Sheets |

---

## Operational Status
The Python engine is architected to run in `RULES_FALLBACK` mode initially, utilizing a hardcoded, deterministic rules engine while capturing live market telemetry. Once a sufficient historical dataset is logged, the XGBoost ML model is trained and deployed for live predictive inference.
