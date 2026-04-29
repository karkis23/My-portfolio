# 📘 Complete SQL & Database Guide
## From Zero to Interview-Ready

---

## Chapter 1: What is a Database?

A **database** is an organized collection of data stored electronically. Think of it as a super-powered Excel spreadsheet that can handle millions of rows, multiple users simultaneously, and complex relationships between data.

### Types of Databases

| Type | Examples | When to Use |
|---|---|---|
| **Relational (SQL)** | PostgreSQL, MySQL, SQLite | Structured data with relationships. Most common |
| **NoSQL Document** | MongoDB, CouchDB | Flexible schemas, JSON-like data |
| **Key-Value** | Redis, Memcached | Caching, session storage, high-speed lookups |
| **Graph** | Neo4j | Social networks, recommendation engines |
| **Time Series** | InfluxDB, TimescaleDB | IoT data, monitoring, trading data |

> [!IMPORTANT]
> **For job interviews, you MUST know SQL/Relational databases.** They're used in 90%+ of applications. Learn PostgreSQL — it's the most powerful and most asked about.

---

## Chapter 2: SQL Fundamentals

### 2.1 Setting Up PostgreSQL

**Windows Installation:**
1. Download from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Run installer → set password for `postgres` user
3. Install pgAdmin 4 (comes with installer)
4. Open pgAdmin → Create a new database called `learning_sql`

**Or use Docker (if you've learned it):**
```bash
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:16
```

### 2.2 Creating Tables

```sql
-- Create a table to store trading signals
CREATE TABLE signals (
    id SERIAL PRIMARY KEY,           -- Auto-incrementing ID
    symbol VARCHAR(20) NOT NULL,     -- e.g., 'NIFTY', 'BANKNIFTY'
    direction VARCHAR(10) NOT NULL,  -- 'LONG' or 'SHORT'
    confidence DECIMAL(4,2),         -- e.g., 0.82
    entry_price DECIMAL(12,2),       -- e.g., 23450.50
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table to store trades
CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    signal_id INTEGER REFERENCES signals(id),  -- Foreign key
    entry_price DECIMAL(12,2) NOT NULL,
    exit_price DECIMAL(12,2),
    quantity INTEGER NOT NULL,
    pnl DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'ACTIVE',  -- 'ACTIVE', 'CLOSED', 'CANCELLED'
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP
);

-- Create a users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Data Types You Must Know:**

| Type | Description | Example |
|---|---|---|
| `INTEGER` / `INT` | Whole numbers | `42` |
| `SERIAL` | Auto-incrementing integer | Used for IDs |
| `VARCHAR(n)` | Variable-length string up to n chars | `'NIFTY'` |
| `TEXT` | Unlimited length string | Long descriptions |
| `DECIMAL(p,s)` | Exact decimal (precision, scale) | `23450.75` |
| `BOOLEAN` | True/False | `TRUE` |
| `TIMESTAMP` | Date + Time | `'2026-03-19 10:30:00'` |
| `DATE` | Date only | `'2026-03-19'` |
| `JSONB` | JSON data (PostgreSQL) | `'{"key": "value"}'` |

### 2.3 INSERT — Adding Data

```sql
-- Insert a single row
INSERT INTO signals (symbol, direction, confidence, entry_price)
VALUES ('NIFTY', 'LONG', 0.82, 23450.50);

-- Insert multiple rows
INSERT INTO signals (symbol, direction, confidence, entry_price) VALUES
('NIFTY', 'SHORT', 0.75, 23380.00),
('BANKNIFTY', 'LONG', 0.88, 49800.00),
('NIFTY', 'LONG', 0.65, 23520.75),
('BANKNIFTY', 'SHORT', 0.91, 49650.25);

-- Insert a trade linked to signal
INSERT INTO trades (signal_id, entry_price, quantity, status)
VALUES (1, 23450.50, 50, 'ACTIVE');
```

### 2.4 SELECT — Reading Data

```sql
-- Select all columns
SELECT * FROM signals;

-- Select specific columns
SELECT symbol, direction, confidence FROM signals;

-- With alias
SELECT symbol AS "Stock", confidence AS "AI Score" FROM signals;
```

### 2.5 WHERE — Filtering Data

```sql
-- Basic comparison
SELECT * FROM signals WHERE direction = 'LONG';
SELECT * FROM signals WHERE confidence > 0.80;
SELECT * FROM signals WHERE confidence >= 0.75 AND direction = 'LONG';

-- IN operator
SELECT * FROM signals WHERE symbol IN ('NIFTY', 'BANKNIFTY');

-- BETWEEN
SELECT * FROM signals WHERE confidence BETWEEN 0.70 AND 0.90;

-- LIKE (pattern matching)
SELECT * FROM signals WHERE symbol LIKE 'NIFTY%';  -- starts with NIFTY
SELECT * FROM signals WHERE symbol LIKE '%NIFTY';   -- ends with NIFTY
SELECT * FROM signals WHERE symbol LIKE '%IF%';     -- contains IF

-- IS NULL / IS NOT NULL
SELECT * FROM trades WHERE exit_price IS NULL;  -- trades still open

-- NOT
SELECT * FROM signals WHERE direction != 'SHORT';
SELECT * FROM signals WHERE NOT direction = 'SHORT';
```

### 2.6 ORDER BY — Sorting

```sql
-- Sort by confidence descending
SELECT * FROM signals ORDER BY confidence DESC;

-- Sort by multiple columns
SELECT * FROM signals ORDER BY direction ASC, confidence DESC;

-- LIMIT and OFFSET (pagination)
SELECT * FROM signals ORDER BY created_at DESC LIMIT 10;         -- first 10
SELECT * FROM signals ORDER BY created_at DESC LIMIT 10 OFFSET 10; -- next 10
```

### 2.7 UPDATE — Modifying Data

```sql
-- Update a specific trade
UPDATE trades SET exit_price = 23520.00, pnl = 3475.00, status = 'CLOSED',
  closed_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Update multiple rows
UPDATE signals SET confidence = confidence * 1.05
WHERE symbol = 'NIFTY' AND confidence < 0.80;
```

### 2.8 DELETE — Removing Data

```sql
-- Delete specific rows
DELETE FROM signals WHERE confidence < 0.50;

-- Delete all rows (dangerous!)
DELETE FROM trades;  -- removes all trade records

-- TRUNCATE (faster for deleting all rows, resets auto-increment)
TRUNCATE TABLE trades RESTART IDENTITY;
```

---

## Chapter 3: Intermediate SQL

### 3.1 Aggregate Functions

```sql
-- COUNT — how many rows
SELECT COUNT(*) FROM signals;                            -- total signals
SELECT COUNT(*) FROM signals WHERE direction = 'LONG';   -- total LONG signals

-- SUM
SELECT SUM(pnl) FROM trades WHERE status = 'CLOSED';    -- total P&L

-- AVG
SELECT AVG(confidence) FROM signals;                      -- average confidence

-- MIN / MAX
SELECT MIN(entry_price), MAX(entry_price) FROM signals WHERE symbol = 'NIFTY';

-- ROUND
SELECT ROUND(AVG(confidence), 2) AS avg_confidence FROM signals;
```

### 3.2 GROUP BY — Aggregation by Category

```sql
-- Count signals per symbol
SELECT symbol, COUNT(*) AS total_signals
FROM signals
GROUP BY symbol;

-- Average confidence per direction
SELECT direction, ROUND(AVG(confidence), 2) AS avg_confidence
FROM signals
GROUP BY direction;

-- Total P&L per symbol (need JOIN — covered next)
SELECT s.symbol, SUM(t.pnl) AS total_pnl, COUNT(t.id) AS trade_count
FROM trades t
JOIN signals s ON t.signal_id = s.id
WHERE t.status = 'CLOSED'
GROUP BY s.symbol;

-- HAVING — filter AFTER grouping (WHERE filters BEFORE grouping)
SELECT symbol, COUNT(*) AS total
FROM signals
GROUP BY symbol
HAVING COUNT(*) > 2;   -- only symbols with more than 2 signals
```

> [!TIP]
> **WHERE vs HAVING:** `WHERE` filters individual rows BEFORE grouping. `HAVING` filters groups AFTER aggregation. Use `HAVING` only with aggregate functions.

### 3.3 JOINs — Combining Tables

**This is the most important SQL concept for interviews.**

```sql
-- INNER JOIN — only matching rows from both tables
SELECT s.symbol, s.direction, t.entry_price, t.exit_price, t.pnl
FROM signals s
INNER JOIN trades t ON s.id = t.signal_id;

-- LEFT JOIN — all signals, even those without trades
SELECT s.symbol, s.direction, s.confidence, t.status, t.pnl
FROM signals s
LEFT JOIN trades t ON s.id = t.signal_id;
-- Signals without trades will show NULL for trade columns

-- RIGHT JOIN — all trades, even if signal was deleted
SELECT s.symbol, t.entry_price, t.pnl
FROM signals s
RIGHT JOIN trades t ON s.id = t.signal_id;

-- FULL OUTER JOIN — all rows from both tables
SELECT s.symbol, t.pnl
FROM signals s
FULL OUTER JOIN trades t ON s.id = t.signal_id;
```

**Visual Representation:**
```
INNER JOIN:        LEFT JOIN:         RIGHT JOIN:
  ┌──┬──┐           ┌──────┐           ┌──────┐
  │A │B │           │A ┌──┐│           │┌──┐ B│
  │  ├──┤           │  │AB││           ││AB│  │
  │  │AB│           │  └──┘│           │└──┘  │
  │  ├──┤           └──────┘           └──────┘
  │B │  │
  └──┴──┘
```

### 3.4 Subqueries

```sql
-- Subquery in WHERE
-- Find signals with above-average confidence
SELECT * FROM signals
WHERE confidence > (SELECT AVG(confidence) FROM signals);

-- Subquery in FROM
-- Find the symbol with the highest average confidence
SELECT symbol, avg_conf FROM (
    SELECT symbol, AVG(confidence) AS avg_conf
    FROM signals
    GROUP BY symbol
) sub
ORDER BY avg_conf DESC
LIMIT 1;

-- EXISTS subquery
-- Find signals that have at least one trade
SELECT * FROM signals s
WHERE EXISTS (
    SELECT 1 FROM trades t WHERE t.signal_id = s.id
);

-- IN subquery
-- Find signals for symbols that have more than 2 signals
SELECT * FROM signals
WHERE symbol IN (
    SELECT symbol FROM signals GROUP BY symbol HAVING COUNT(*) > 2
);
```

### 3.5 String Functions

```sql
SELECT
    UPPER('nifty'),                    -- 'NIFTY'
    LOWER('NIFTY'),                    -- 'nifty'
    LENGTH('BANKNIFTY'),               -- 9
    CONCAT(symbol, '-', direction),    -- 'NIFTY-LONG'
    SUBSTRING(symbol, 1, 4),          -- 'NIFT'
    TRIM('  hello  '),                -- 'hello'
    REPLACE(symbol, 'NIFTY', 'NF')   -- 'NF' or 'BANKNF'
FROM signals;
```

### 3.6 Date Functions

```sql
SELECT
    CURRENT_DATE,                                       -- today's date
    CURRENT_TIMESTAMP,                                  -- now
    EXTRACT(YEAR FROM created_at),                      -- 2026
    EXTRACT(MONTH FROM created_at),                     -- 3
    DATE_TRUNC('month', created_at),                    -- first of the month
    created_at + INTERVAL '1 day',                      -- next day
    AGE(CURRENT_TIMESTAMP, created_at),                 -- time since creation
    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS')      -- formatted string
FROM signals;

-- Signals from the last 7 days
SELECT * FROM signals
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days';
```

---

## Chapter 4: Advanced SQL

### 4.1 Window Functions (VERY Important for Interviews)

Window functions perform calculations across a set of rows RELATED to the current row, without collapsing them into groups.

```sql
-- ROW_NUMBER — assign a sequential number
SELECT
    symbol, direction, confidence,
    ROW_NUMBER() OVER (ORDER BY confidence DESC) AS rank
FROM signals;

-- ROW_NUMBER with PARTITION — rank within each symbol
SELECT
    symbol, direction, confidence,
    ROW_NUMBER() OVER (PARTITION BY symbol ORDER BY confidence DESC) AS rank_in_symbol
FROM signals;

-- RANK vs DENSE_RANK
-- RANK: 1, 2, 2, 4 (skips numbers for ties)
-- DENSE_RANK: 1, 2, 2, 3 (no gaps)
SELECT
    symbol, confidence,
    RANK() OVER (ORDER BY confidence DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY confidence DESC) AS dense_rank
FROM signals;

-- LAG / LEAD — access previous/next row
SELECT
    symbol, confidence,
    LAG(confidence) OVER (ORDER BY created_at) AS prev_confidence,
    confidence - LAG(confidence) OVER (ORDER BY created_at) AS confidence_change
FROM signals;

-- Running total (cumulative sum)
SELECT
    symbol, pnl,
    SUM(pnl) OVER (ORDER BY closed_at) AS running_pnl
FROM trades
WHERE status = 'CLOSED';

-- Moving average
SELECT
    symbol, confidence,
    AVG(confidence) OVER (ORDER BY created_at ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3
FROM signals;
```

### 4.2 Common Table Expressions (CTEs)

CTEs make complex queries readable by breaking them into named steps.

```sql
-- Basic CTE
WITH high_confidence_signals AS (
    SELECT * FROM signals WHERE confidence > 0.80
)
SELECT symbol, COUNT(*) 
FROM high_confidence_signals 
GROUP BY symbol;

-- Multiple CTEs
WITH 
signal_stats AS (
    SELECT symbol, 
           COUNT(*) AS total_signals,
           AVG(confidence) AS avg_confidence
    FROM signals
    GROUP BY symbol
),
trade_stats AS (
    SELECT s.symbol,
           SUM(t.pnl) AS total_pnl,
           COUNT(t.id) AS total_trades
    FROM trades t
    JOIN signals s ON t.signal_id = s.id
    WHERE t.status = 'CLOSED'
    GROUP BY s.symbol
)
SELECT 
    ss.symbol,
    ss.total_signals,
    ROUND(ss.avg_confidence, 2) AS avg_confidence,
    COALESCE(ts.total_pnl, 0) AS total_pnl,
    COALESCE(ts.total_trades, 0) AS total_trades
FROM signal_stats ss
LEFT JOIN trade_stats ts ON ss.symbol = ts.symbol;

-- Recursive CTE (for hierarchical data)
WITH RECURSIVE subordinates AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    -- Recursive case: find reports
    SELECT e.id, e.name, e.manager_id, s.level + 1
    FROM employees e
    JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates ORDER BY level;
```

### 4.3 Indexes and Query Optimization

```sql
-- Create an index
CREATE INDEX idx_signals_symbol ON signals(symbol);
CREATE INDEX idx_signals_confidence ON signals(confidence);
CREATE INDEX idx_trades_status ON trades(status);

-- Composite index (for queries filtering on multiple columns)
CREATE INDEX idx_signals_symbol_direction ON signals(symbol, direction);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- EXPLAIN ANALYZE — see how PostgreSQL executes your query
EXPLAIN ANALYZE SELECT * FROM signals WHERE symbol = 'NIFTY' AND confidence > 0.80;

-- Output shows:
-- Seq Scan (full table scan — slow for large tables)
-- Index Scan (using an index — fast)
-- Execution time in milliseconds
```

> [!WARNING]
> **Don't over-index!** Each index slows down INSERT/UPDATE operations because the index must also be updated. Index columns you frequently search/filter/join on.

### 4.4 Transactions

```sql
-- Transaction ensures all operations succeed or all fail
BEGIN;

-- Step 1: Create a new trade
INSERT INTO trades (signal_id, entry_price, quantity, status)
VALUES (1, 23450.50, 50, 'ACTIVE');

-- Step 2: Log the order
INSERT INTO order_logs (trade_id, action, timestamp)
VALUES (currval('trades_id_seq'), 'ENTRY', CURRENT_TIMESTAMP);

-- If everything is fine:
COMMIT;

-- If something went wrong:
-- ROLLBACK;
```

### 4.5 CASE Statements

```sql
SELECT 
    symbol,
    confidence,
    CASE 
        WHEN confidence >= 0.90 THEN 'Very High'
        WHEN confidence >= 0.75 THEN 'High'
        WHEN confidence >= 0.60 THEN 'Medium'
        ELSE 'Low'
    END AS confidence_level
FROM signals;
```

### 4.6 COALESCE and NULL Handling

```sql
-- COALESCE returns the first non-null value
SELECT 
    symbol,
    COALESCE(exit_price, 0) AS exit_price,     -- 0 if null
    COALESCE(pnl, 0) AS pnl                    -- 0 if null
FROM trades;

-- NULLIF — returns NULL if two values are equal (avoid division by zero)
SELECT 
    total_trades,
    winning_trades,
    winning_trades * 100.0 / NULLIF(total_trades, 0) AS win_rate
FROM stats;
```

---

## Chapter 5: Database Design

### 5.1 Normalization

**1NF (First Normal Form):**
- Each column contains atomic (single) values
- Each row is unique
- ❌ `tags: 'python,fastapi,react'` → ✅ Separate `tags` table

**2NF (Second Normal Form):**
- Must be in 1NF
- No partial dependencies (every non-key column depends on the ENTIRE primary key)

**3NF (Third Normal Form):**
- Must be in 2NF
- No transitive dependencies (non-key columns don't depend on other non-key columns)
- ❌ Storing `city_name` when you have `city_id` → ✅ Separate `cities` table

### 5.2 Relationships

```
One-to-One:    user → profile         (rare)
One-to-Many:   user → orders          (most common)
Many-to-Many:  students ↔ courses     (junction table needed)
```

```sql
-- One-to-Many: A signal can have many trades
CREATE TABLE signals (id SERIAL PRIMARY KEY, ...);
CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    signal_id INTEGER REFERENCES signals(id),  -- FK pointing to signals
    ...
);

-- Many-to-Many: Students and Courses
CREATE TABLE students (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE courses (id SERIAL PRIMARY KEY, title VARCHAR(100));
CREATE TABLE enrollments (  -- junction table
    student_id INTEGER REFERENCES students(id),
    course_id INTEGER REFERENCES courses(id),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id)
);
```

### 5.3 ER Diagram for Your Zenith Pro Project

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   users      │     │   signals    │     │   trades     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)      │
│ username     │     │ user_id (FK) │←────│ signal_id(FK)│
│ email        │     │ symbol       │     │ entry_price  │
│ password_hash│     │ direction    │     │ exit_price   │
│ role         │     │ confidence   │     │ quantity     │
│ created_at   │     │ entry_price  │     │ pnl          │
└──────┬───────┘     │ features_json│     │ status       │
       │             │ created_at   │     │ opened_at    │
       └────────────→└──────────────┘     │ closed_at    │
                                          └──────────────┘
                     ┌──────────────┐
                     │ telemetry    │
                     ├──────────────┤
                     │ id (PK)      │
                     │ signal_id(FK)│
                     │ metric_name  │
                     │ metric_value │
                     │ logged_at    │
                     └──────────────┘
```

---

## Chapter 6: Practice Problems

### Easy Level
1. Write a query to find all employees earning more than ₹50,000
2. Count the number of orders per customer
3. Find customers who have never placed an order (LEFT JOIN + IS NULL)
4. Find the most recent order for each customer

### Medium Level
5. Write a query to find the 2nd highest salary (without LIMIT in some databases)
6. Find employees whose salary is above the department average
7. Calculate running total of daily sales
8. Find consecutive dates with no orders (using LAG)

### Hard Level
9. Write a query to find the median salary (without built-in function)
10. Pivot rows to columns (CASE + aggregation)
11. Find the longest streak of profitable trades
12. Implement a friendship graph query (mutual friends)

---

*Master these concepts and you'll comfortably handle 95% of SQL questions in interviews.* ✅
