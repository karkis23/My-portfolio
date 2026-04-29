# 🔄 n8n Exit Order Monitor

*Auto-Canceling Opposite Order Reconciler for Options Position Management*

In intraday algorithmic options trading, rigorous risk management is critical. While setting initial Stop-Loss and Target limits provides security, execution of one order leaves the alternate order floating in the market. This localized background process acts as a position reconciler, executing alongside Zenith's primary operational engine to auto-cancel opposite orders cleanly.

---

## Core Operational Mechanics

Because active trading loops focus primarily on inference and execution, memory retention of prior executions is handled seamlessly through cross-pollinated Google Sheet states. These states are checked every two minutes natively via this monitoring tool.

### 1. Continual Assessment Loop
A Cron node executes on a `*/2` (every 2 minutes) schedule, specifically tracking active positions requiring reconciliation.

### 2. Position Retrieval
- Authenticates into the Angel One dashboard using a secure `jwtToken`.
- Retrieves the active *Order Book*, capturing real-time states (`executed`, `cancelled`, `complete`, or `rejected`).
- Synchronously fetches active registered Entry pairs logged previously in the active ledger (`Google Sheets -> Active_Exit_Orders`).

### 3. Position Cancellation Execution
- The logic evaluates whether either the Primary Target LIMIT or Stop-Loss MKT was achieved by matching active Ledger OrderIDs against newly completed execution records on the broker API.
- If the Target limit is executed, the system constructs a payload specifying the corresponding Stop-Loss MKT OrderID and flags it for immediate cancellation via an API cancellation routine (`cancelOrder` POST request). The reverse applies if the Stop-Loss is hit.

### 4. Comprehensive P&L Logging
- Extracts precise exit values (target execution or stop-loss execution).
- Calculates the net trade points gained or lost.
- Pushes total Profit & Loss data into the exact `Trades` tab, updating tracking metrics in real-time. This transitions the position's active status from 'ACTIVE' to 'CLOSED' seamlessly, finalizing the accounting record without user intervention.
