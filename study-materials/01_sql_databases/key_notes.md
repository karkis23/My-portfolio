# 🗝️ SQL & Databases — Key Notes (Cheat Sheet)

## Must-Remember Rules

1. **SQL execution order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
2. **WHERE** filters rows BEFORE grouping. **HAVING** filters AFTER grouping.
3. **NULL** is not equal to anything, not even NULL. Use `IS NULL` / `IS NOT NULL`.
4. **INNER JOIN** = only matching rows. **LEFT JOIN** = all left + matched right.
5. **Index** = B-tree structure that speeds up reads but slows writes.
6. **Primary Key** = unique + not null. **Foreign Key** = reference to another table's PK.
7. **Normalization** eliminates redundancy: 1NF (atomic) → 2NF (no partial deps) → 3NF (no transitive deps).

---

## SQL Quick Reference Card

### SELECT Template
```sql
SELECT column1, column2, AGG_FUNC(column3)
FROM table1
JOIN table2 ON table1.id = table2.fk_id
WHERE condition
GROUP BY column1, column2
HAVING AGG_FUNC(column3) > value
ORDER BY column1 DESC
LIMIT 10 OFFSET 20;
```

### JOIN Types (Visual)
```
INNER:  A ∩ B       (only matching)
LEFT:   A + (A ∩ B)  (all A, matched B)
RIGHT:  B + (A ∩ B)  (all B, matched A)
FULL:   A ∪ B        (everything)
```

### Window Functions Formula
```sql
FUNCTION() OVER (
    PARTITION BY group_column    -- optional: group rows
    ORDER BY sort_column         -- required for most functions
    ROWS BETWEEN ... AND ...     -- optional: frame
)
```

### Key Functions
| Function | Purpose | Example |
|---|---|---|
| `ROW_NUMBER()` | Sequential number, no ties | Ranking results |
| `RANK()` | Rank with gaps (1,2,2,4) | Leaderboards |
| `DENSE_RANK()` | Rank without gaps (1,2,2,3) | Top-N queries |
| `LAG(col, n)` | Value from N rows back | Compare to previous |
| `LEAD(col, n)` | Value from N rows ahead | Compare to next |
| `SUM() OVER()` | Running total | Cumulative P&L |
| `AVG() OVER()` | Moving average | Smoothed metrics |

### Index Rules of Thumb
- ✅ Index columns in WHERE, JOIN, ORDER BY
- ✅ Create composite indexes for multi-column filters (order matters!)
- ❌ Don't index columns with low cardinality (boolean, status)
- ❌ Don't index tiny tables (<1000 rows)
- ❌ Don't over-index (each index slows INSERT/UPDATE)

### Common Interview Patterns
| Pattern | SQL Approach |
|---|---|
| 2nd highest value | `DENSE_RANK()` or `LIMIT 1 OFFSET 1` |
| Find duplicates | `GROUP BY + HAVING COUNT(*) > 1` |
| Running total | `SUM() OVER (ORDER BY date)` |
| Find gaps | `LAG()` to compare consecutive rows |
| Pivot data | `CASE WHEN` + aggregate |
| Self-join | Join table to itself (employees → managers) |
| Top N per group | `ROW_NUMBER() OVER (PARTITION BY group ORDER BY val DESC)` |

---

## 10 Most Common SQL Interview Questions

1. **Find the 2nd highest salary** → `DENSE_RANK()` or subquery
2. **Find duplicate emails** → `GROUP BY email HAVING COUNT(*) > 1`
3. **Employees earning more than their manager** → Self JOIN
4. **Department with highest avg salary** → `GROUP BY + ORDER BY + LIMIT`
5. **Customers who never ordered** → `LEFT JOIN + IS NULL`
6. **Consecutive login days** → Window function + date arithmetic
7. **Running total of sales** → `SUM() OVER (ORDER BY date)`
8. **Top 3 salaries per department** → `ROW_NUMBER() PARTITION BY dept`
9. **Nth highest salary** → `DENSE_RANK() = N` or `OFFSET N-1`
10. **Delete duplicate rows** → `DELETE` with `ROW_NUMBER()` in CTE
