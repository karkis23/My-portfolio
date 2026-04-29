-- =============================================
-- SQL PRACTICE EXAMPLES
-- Run these in PostgreSQL to learn by doing
-- =============================================

-- =============================================
-- SETUP: Create and populate tables
-- =============================================

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    manager_id INTEGER REFERENCES employees(id),
    hire_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    customer_name VARCHAR(100),
    amount DECIMAL(10,2),
    order_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Insert sample data
INSERT INTO employees (name, department, salary, manager_id, hire_date) VALUES
('Rahul Sharma', 'Engineering', 85000, NULL, '2023-01-15'),
('Priya Patel', 'Engineering', 92000, 1, '2023-03-20'),
('Amit Kumar', 'Sales', 65000, 1, '2023-06-10'),
('Sneha Gupta', 'Engineering', 78000, 1, '2024-01-05'),
('Vikram Singh', 'Marketing', 72000, NULL, '2023-02-28'),
('Ananya Reddy', 'Sales', 68000, 5, '2023-09-15'),
('Karthik Nair', 'Engineering', 95000, 1, '2022-11-01'),
('Deepa Menon', 'Marketing', 71000, 5, '2024-03-10'),
('Arjun Das', 'Engineering', 85000, 1, '2023-07-22'),
('Meera Iyer', 'Sales', 62000, 5, '2024-06-01');

INSERT INTO orders (employee_id, customer_name, amount, order_date, status) VALUES
(3, 'Tech Corp', 15000, '2025-01-10', 'completed'),
(3, 'Data Inc', 22000, '2025-01-15', 'completed'),
(6, 'AI Labs', 8500, '2025-02-01', 'completed'),
(3, 'Cloud Co', 31000, '2025-02-10', 'pending'),
(6, 'Tech Corp', 12000, '2025-02-20', 'completed'),
(10, 'Data Inc', 9500, '2025-03-01', 'cancelled'),
(6, 'ML Studio', 18000, '2025-03-05', 'completed'),
(3, 'AI Labs', 27000, '2025-03-10', 'pending');


-- =============================================
-- EXAMPLE 1: Basic SELECT + WHERE
-- =============================================

-- All engineers
SELECT * FROM employees WHERE department = 'Engineering';

-- Engineers earning > 80K
SELECT name, salary FROM employees
WHERE department = 'Engineering' AND salary > 80000
ORDER BY salary DESC;

-- Employees hired in 2023
SELECT name, hire_date FROM employees
WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';


-- =============================================
-- EXAMPLE 2: Aggregates + GROUP BY
-- =============================================

-- Average salary per department
SELECT department, 
       ROUND(AVG(salary), 2) AS avg_salary,
       COUNT(*) AS headcount,
       MAX(salary) AS highest,
       MIN(salary) AS lowest
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Departments with more than 3 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 3;


-- =============================================
-- EXAMPLE 3: JOINs
-- =============================================

-- INNER JOIN: Employees who have made sales
SELECT e.name, o.customer_name, o.amount, o.order_date
FROM employees e
INNER JOIN orders o ON e.id = o.employee_id;

-- LEFT JOIN: ALL employees, even those with no sales
SELECT e.name, e.department, 
       COALESCE(SUM(o.amount), 0) AS total_sales,
       COUNT(o.id) AS order_count
FROM employees e
LEFT JOIN orders o ON e.id = o.employee_id
GROUP BY e.id, e.name, e.department
ORDER BY total_sales DESC;

-- Self JOIN: Employee with their manager's name
SELECT e.name AS employee, 
       m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Employees earning MORE than their manager
SELECT e.name AS employee, e.salary,
       m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;


-- =============================================
-- EXAMPLE 4: Subqueries
-- =============================================

-- Employees earning above average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Department with the highest total salary
SELECT department, SUM(salary) AS total
FROM employees
GROUP BY department
ORDER BY total DESC
LIMIT 1;

-- Employees who have NEVER made a sale
SELECT name, department
FROM employees
WHERE id NOT IN (SELECT DISTINCT employee_id FROM orders);


-- =============================================
-- EXAMPLE 5: Window Functions
-- =============================================

-- Rank employees by salary within each department
SELECT name, department, salary,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,
       RANK() OVER (ORDER BY salary DESC) AS overall_rank
FROM employees;

-- Top 2 earners per department
SELECT * FROM (
    SELECT name, department, salary,
           ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) ranked
WHERE rn <= 2;

-- Running total of order amounts
SELECT o.id, e.name, o.amount, o.order_date,
       SUM(o.amount) OVER (ORDER BY o.order_date) AS running_total
FROM orders o
JOIN employees e ON o.employee_id = e.id
WHERE o.status = 'completed';

-- Compare each employee's salary to department average
SELECT name, department, salary,
       ROUND(AVG(salary) OVER (PARTITION BY department), 2) AS dept_avg,
       salary - ROUND(AVG(salary) OVER (PARTITION BY department), 2) AS diff_from_avg
FROM employees;

-- Month-over-month sales change using LAG
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(amount) AS monthly_total,
    LAG(SUM(amount)) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS prev_month,
    SUM(amount) - LAG(SUM(amount)) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS change
FROM orders
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', order_date);


-- =============================================
-- EXAMPLE 6: CTEs (Common Table Expressions)
-- =============================================

-- Find top salesperson using CTE
WITH sales_summary AS (
    SELECT e.id, e.name, e.department,
           SUM(o.amount) AS total_sales,
           COUNT(o.id) AS deal_count
    FROM employees e
    JOIN orders o ON e.id = o.employee_id
    WHERE o.status = 'completed'
    GROUP BY e.id, e.name, e.department
)
SELECT name, department, total_sales, deal_count,
       ROUND(total_sales / deal_count, 2) AS avg_deal_size
FROM sales_summary
ORDER BY total_sales DESC;


-- =============================================
-- EXAMPLE 7: 2nd Highest Salary (Classic Interview)
-- =============================================

-- Method 1: OFFSET
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Method 2: Dense Rank
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;

-- Method 3: Subquery
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);


-- =============================================
-- EXAMPLE 8: Find Duplicates
-- =============================================

-- Find duplicate salaries
SELECT salary, COUNT(*) AS count
FROM employees
GROUP BY salary
HAVING COUNT(*) > 1;

-- Find customers who ordered from multiple salespeople
SELECT customer_name, COUNT(DISTINCT employee_id) AS salespeople_count
FROM orders
GROUP BY customer_name
HAVING COUNT(DISTINCT employee_id) > 1;


-- =============================================
-- EXAMPLE 9: Transactions
-- =============================================

BEGIN;
    UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';
    -- Check if budget allows
    -- If total > budget: ROLLBACK;
    -- If OK: COMMIT;
COMMIT;


-- =============================================
-- EXAMPLE 10: Indexes
-- =============================================

CREATE INDEX idx_emp_department ON employees(department);
CREATE INDEX idx_emp_salary ON employees(salary);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_employee ON orders(employee_id);

-- Check query plan
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'Engineering';
