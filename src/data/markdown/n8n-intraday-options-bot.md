# 🤖 Intraday Options Trading Bot

*Automated Trading Orchestration via n8n and FastAPI Engine*

This document outlines the architecture of the 18-node n8n workflow responsible for managing the end-to-end algorithmic options trading loop. The system processes live data, runs deep analytics, queries an XGBoost neural network via a FastAPI interface, and accurately executes risk-managed positions on the broker's platform.

---

## The Workflow Backbone

The workflow is synchronized to run exactly every 5 minutes, aligning with standard NSE candlestick formation.

### 1. Trigger & Filter Phase
- Utilizes an n8n Cron node (`*/5 9-15 * * 1-5`) restricted strictly to standard NSE timings.
- Additional filtering logic guarantees zero execution during market close or pre-market hours.

### 2. Market Intelligence Phase
- Authenticates to the Angel One API using live TOTP and `jwtToken` mapping.
- Parallelized execution fetches: (a) Spot Index Prices, (b) Historical 5-Minute Candles, and (c) Live India VIX data.

### 3. Sentiment & Options Chain Evaluation
- Queries external Sentiment APIs.
- Retrieves the full Options Chain (Call and Put data for ATM/OTM strikes).
- Calculates Max Pain, Open Interest (OI) concentrations, and overall Writers Zone context to determine Bullish/Bearish biases based on Put/Call volume ratios.

### 4. AI Inference Phase
- All 57 precalculated features (including RSI, MACD, SMC Breakouts, VIX conditions, and Options Bias) are structured into a precise JSON payload.
- A POST request is sent directly to the local FastAPI (`/api/predict`) engine for processing.
- The FastAPI engine returns a directional signal (BUY_CE/BUY_PE or WAIT) along with a model confidence metric.

### 5. Execution Phase
- The engine processes signals only when confidence exceeds established thresholds.
- Dynamic Strike Price discovery determines the appropriate active symbol token, ensuring the highest liquidity ATM expiry pair is targeted.
- The execution block places a primary Entry Market Order directly onto the exchange via the broker API.

### 6. Risk Parameter Deployment & Telemetry
- Extracts live Fill Price execution data.
- Programmatically calculates precise Stop-Loss (SL) and Target limit values, enforcing predefined risk-to-reward minimums.
- Deploys immediate SL-M and Target Limit orders to the broker's Order Book.
- Final telemetry is logged into a structured Google Sheet (`Active_Exit_Orders` / `Signals` / `Trades`), serving as the system's ledger to accurately track the P&L curve over time.
