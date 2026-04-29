# 🧠 Python NIFTY AI Engine (v4.0) Architecture

> **Version:** 4.0.0 | **Last Updated:** March 2026

This document outlines the architecture and operational flow of the Python-based AI Engine powering the Zenith trading system.

---

## 1. System Objective

The core objective of the Python API is to provide a high-performance, low-latency computational engine for technical indicators and machine learning inference. By offloading complex mathematical calculations (e.g., SuperTrend, Gamma Exposure, MACD) to a dedicated Python microservice, the system achieves sub-100ms response times and supports advanced AI frameworks like XGBoost.

---

## 2. Dual-Engine Architecture

The engine is engineered with a two-tiered fallback system to ensure safe execution in all market conditions.

### Primary: Rule Engine Fallback
When a trained AI model is unavailable or specifically bypassed, the system defaults to the `rule_engine.py`. This is a deterministic, 25-step mathematical logic model. It provides safe, predictable trading signals based on hardcoded risk parameters.

### Secondary: AI Model Inference
When sufficient market data is accumulated, an XGBoost model is trained. Once deployed, the orchestrator automatically detects the `xgboost_model.pkl` file and routes live market data through the ML pipeline for predictive analysis, falling back to the Rule Engine only if model confidence is low.

---

## 3. Signal Pipeline

Data flows through the system in a strict, sequential pipeline:

1. **Ingestion & Validation (`models.py`)**
   Incoming JSON payloads are validated against strict Pydantic schemas to ensure data integrity before any processing occurs.
2. **Indicator Calculation (`indicators.py`)**
   The engine calculates a suite of technical metrics, including trend direction (MACD, SuperTrend), momentum (RSI, Stochastic), and volume profiles.
3. **Options Intelligence (`writers_zone.py`)**
   The system evaluates the Options Chain to calculate institutional metrics such as Gamma Exposure (GEX), Max Pain, and Implied Volatility (IV) Skew.
4. **Feature Normalization (`preprocessor.py`)**
   All calculated metrics are transformed into a normalized 57-feature vector, scaling values to a `[-1, +1]` range optimized for machine learning algorithms.
5. **Decision Engine (`signal_engine.py`)**
   The 57-feature vector is passed to the active logic engine (AI or Rules). The system generates a directional signal with a confidence percentage.
6. **Response Generation**
   The final decision is structured into a JSON payload and returned to the automation layer. The complete cycle averages 14–52 milliseconds.

---

## 4. Machine Learning Implementation

The system is designed to train on accumulated telemetry.
The `train_model.py` script executes the following pipeline:
- **Data Ingestion:** Reads historical CSV datasets containing the 57-feature snapshots.
- **Model Training:** Utilizes XGBoost to identify non-linear relationships and high-probability patterns.
- **Validation:** Tests the model against a holdout dataset to prevent overfitting.
- **Deployment:** Serializes the trained model into a `.pkl` file for live inference.

---

## 5. System Controls

The system includes a manual override function controlled via environment variables. By setting `FORCE_RULES=true` in the `.env` configuration, administrators can instantly bypass the ML model and force all execution through the deterministic rule engine during periods of structural market anomalies.
