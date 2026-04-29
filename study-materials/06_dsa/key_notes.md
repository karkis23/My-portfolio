# 🗝️ DSA — Key Notes (Cheat Sheet)

## Pattern Recognition — THE Most Important Skill

> When you see a problem, ask: "Which PATTERN does this match?"

| If the problem says... | Think... | Pattern |
|---|---|---|
| "Find a pair/triplet" | Two Pointers | `left=0, right=n-1` |
| "Contiguous subarray" | Sliding Window | `for right in range(n)` |
| "Count occurrences / lookup" | HashMap | `seen = {}` |
| "Sorted array + search" | Binary Search | `while left <= right` |
| "Tree traversal" | DFS (recursive) or BFS (queue) | `def dfs(node)` |
| "Shortest path / level by level" | BFS | `queue = deque([start])` |
| "Connected components / islands" | DFS/BFS on grid | `visited set` |
| "Valid expression / matching" | Stack | `stack = []` |
| "Optimization (min/max)" | DP | `dp[i] = min(...)` |
| "All combinations / permutations" | Backtracking | `def backtrack(path)` |
| "Linked list manipulation" | Two Pointers (slow/fast) | Floyd's algorithm |

---

## Time Complexity Cheat Sheet

| Operation | Array | Hash Map | Linked List | BST (balanced) | Heap |
|---|---|---|---|---|---|
| Access by index | O(1) | — | O(n) | — | — |
| Search | O(n) | **O(1)** | O(n) | O(log n) | O(n) |
| Insert | O(n) | **O(1)** | **O(1)** | O(log n) | O(log n) |
| Delete | O(n) | **O(1)** | **O(1)** | O(log n) | O(log n) |
| Min/Max | O(n) | O(n) | O(n) | O(log n) | **O(1)** |

## Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |

---

## Code Templates — Copy and Customize

### Two Pointers
```python
def two_pointer(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        curr = arr[left] + arr[right]
        if curr == target: return [left, right]
        elif curr < target: left += 1
        else: right -= 1
```

### Sliding Window
```python
def sliding_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum
```

### BFS (Graph/Tree Level Order)
```python
from collections import deque
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### DFS (Graph/Grid)
```python
def dfs(grid, r, c):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
        return
    if grid[r][c] == '0': return
    grid[r][c] = '0'  # mark visited
    dfs(grid, r+1, c); dfs(grid, r-1, c)
    dfs(grid, r, c+1); dfs(grid, r, c-1)
```

### Binary Search
```python
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1
```

### DP (Bottom-Up)
```python
def dp_example(n):
    dp = [0] * (n + 1)
    dp[0] = base_case
    for i in range(1, n + 1):
        dp[i] = min(dp[i-1] + cost1, dp[i-2] + cost2)  # recurrence
    return dp[n]
```

---

## Top 20 Must-Solve Problems

| # | Problem | Pattern | Difficulty |
|---|---|---|---|
| 1 | Two Sum (#1) | HashMap | Easy |
| 2 | Best Time to Buy/Sell Stock (#121) | Sliding Window | Easy |
| 3 | Valid Parentheses (#20) | Stack | Easy |
| 4 | Merge Two Sorted Lists (#21) | Linked List | Easy |
| 5 | Maximum Subarray (#53) | Kadane's/DP | Medium |
| 6 | Climbing Stairs (#70) | DP | Easy |
| 7 | Binary Search (#704) | Binary Search | Easy |
| 8 | Invert Binary Tree (#226) | Tree DFS | Easy |
| 9 | Longest Substr No Repeat (#3) | Sliding Window | Medium |
| 10 | 3Sum (#15) | Two Pointers | Medium |
| 11 | Container Most Water (#11) | Two Pointers | Medium |
| 12 | Group Anagrams (#49) | HashMap | Medium |
| 13 | Number of Islands (#200) | Graph DFS | Medium |
| 14 | Course Schedule (#207) | Topological Sort | Medium |
| 15 | Coin Change (#322) | DP | Medium |
| 16 | Product Except Self (#238) | Array | Medium |
| 17 | Valid BST (#98) | Tree DFS | Medium |
| 18 | LRU Cache (#146) | HashMap + LinkedList | Medium |
| 19 | Word Search (#79) | Backtracking | Medium |
| 20 | Merge Intervals (#56) | Sorting | Medium |

---

## Problem-Solving Steps (Interview)

```
1. UNDERSTAND: Read problem twice. Ask clarifying questions.
2. EXAMPLES: Work through 2-3 examples by hand.
3. BRUTE FORCE: State the obvious solution first. "O(n²) brute force would be..."
4. OPTIMIZE: Apply a pattern to improve. "Using a HashMap reduces to O(n)..."
5. CODE: Write clean code. Name variables clearly.
6. TEST: Walk through your code with an example.
7. COMPLEXITY: State time and space complexity.
```
