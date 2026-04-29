# 📘 Complete DSA Guide
## Data Structures & Algorithms for Interviews

---

## Chapter 1: Big-O Notation

Big-O describes how your algorithm's performance scales with input size.

```
O(1)       → Constant     → Array access, hash lookup        ⚡ Best
O(log n)   → Logarithmic  → Binary search                    ✅ Great
O(n)       → Linear       → Single loop through array        ✅ Good
O(n log n) → Linearithmic → Merge sort, quick sort           👍 Acceptable
O(n²)      → Quadratic    → Nested loops                     ⚠️ Avoid if possible
O(2^n)     → Exponential  → Recursive subsets                ❌ Very slow
O(n!)      → Factorial    → Permutations                     ❌ Terrible
```

```python
# O(1) — constant time
def get_first(arr):
    return arr[0]

# O(n) — linear time
def find_max(arr):
    max_val = arr[0]
    for num in arr:       # loops n times
        if num > max_val:
            max_val = num
    return max_val

# O(n²) — quadratic time
def has_duplicate(arr):
    for i in range(len(arr)):        # n times
        for j in range(i+1, len(arr)):  # n times
            if arr[i] == arr[j]:
                return True
    return False

# O(log n) — logarithmic
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:             # cuts in half each time
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

---

## Chapter 2: Arrays & Strings

### Pattern 1: Two Pointers

**When to use:** Sorted arrays, finding pairs, palindromes

```python
# Problem: Two Sum II (Sorted Array) — LeetCode #167
# Given a SORTED array, find two numbers that add up to target
def two_sum_sorted(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]  # 1-indexed
        elif current_sum < target:
            left += 1     # need bigger sum
        else:
            right -= 1    # need smaller sum
    return []

# Problem: Valid Palindrome — LeetCode #125
def is_palindrome(s):
    s = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# Problem: Container With Most Water — LeetCode #11
def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water
```

### Pattern 2: Sliding Window

**When to use:** Contiguous subarrays/substrings, maximum/minimum in a window

```python
# Problem: Maximum Subarray Sum of Size K
def max_sum_subarray_k(arr, k):
    window_sum = sum(arr[:k])  # first window
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # slide window
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Problem: Longest Substring Without Repeating Characters — LeetCode #3
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Problem: Minimum Window Substring — LeetCode #76 (Hard)
from collections import Counter
def min_window(s, t):
    need = Counter(t)
    missing = len(t)
    left = 0
    result = ""
    
    for right in range(len(s)):
        if need[s[right]] > 0:
            missing -= 1
        need[s[right]] -= 1
        
        while missing == 0:  # window contains all chars
            window = s[left:right + 1]
            if not result or len(window) < len(result):
                result = window
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    
    return result
```

### Pattern 3: Prefix Sum

```python
# Problem: Subarray Sum Equals K — LeetCode #560
def subarray_sum(nums, k):
    count = 0
    prefix_sum = 0
    prefix_map = {0: 1}  # sum → count of occurrences
    
    for num in nums:
        prefix_sum += num
        if prefix_sum - k in prefix_map:
            count += prefix_map[prefix_sum - k]
        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1
    
    return count
```

---

## Chapter 3: Hash Maps & Sets

**When to use:** O(1) lookups, counting frequencies, finding duplicates

```python
# Problem: Two Sum — LeetCode #1 (MOST ASKED)
def two_sum(nums, target):
    seen = {}  # value → index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Problem: Group Anagrams — LeetCode #49
def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))  # anagrams have the same sorted form
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())

# Problem: Top K Frequent Elements — LeetCode #347
from collections import Counter
def top_k_frequent(nums, k):
    count = Counter(nums)
    return [num for num, _ in count.most_common(k)]

# Problem: Contains Duplicate — LeetCode #217
def contains_duplicate(nums):
    return len(nums) != len(set(nums))

# Problem: Valid Anagram — LeetCode #242
def is_anagram(s, t):
    return Counter(s) == Counter(t)
```

---

## Chapter 4: Linked Lists

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Problem: Reverse Linked List — LeetCode #206
def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next  # save next
        current.next = prev       # reverse pointer
        prev = current             # advance prev
        current = next_node        # advance current
    return prev

# Problem: Detect Cycle — LeetCode #141 (Floyd's Algorithm)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Problem: Merge Two Sorted Lists — LeetCode #21
def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

# Problem: Middle of Linked List — LeetCode #876
def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

---

## Chapter 5: Stacks & Queues

```python
# Problem: Valid Parentheses — LeetCode #20
def is_valid_parentheses(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0

# Problem: Min Stack — LeetCode #155
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]

# Monotonic Stack Pattern
# Problem: Next Greater Element — find next larger element for each item
def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # store indices
    
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    
    return result
```

---

## Chapter 6: Trees

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# ----- Traversals -----

# Inorder: Left → Root → Right (gives sorted order for BST)
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# Preorder: Root → Left → Right
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# Postorder: Left → Right → Root
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# Level Order (BFS) — LeetCode #102
from collections import deque
def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result

# Problem: Maximum Depth — LeetCode #104
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Problem: Invert Binary Tree — LeetCode #226
def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root

# Problem: Validate BST — LeetCode #98
def is_valid_bst(root, low=float('-inf'), high=float('inf')):
    if not root:
        return True
    if root.val <= low or root.val >= high:
        return False
    return (is_valid_bst(root.left, low, root.val) and
            is_valid_bst(root.right, root.val, high))

# Problem: Lowest Common Ancestor — LeetCode #236
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left or right
```

---

## Chapter 7: Graphs

```python
# Graph representation: Adjacency List
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# BFS — Breadth-First Search (Level by level)
from collections import deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return order

# DFS — Depth-First Search (Go deep first)
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    order = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            order.extend(dfs(graph, neighbor, visited))
    return order

# Problem: Number of Islands — LeetCode #200
def num_islands(grid):
    if not grid:
        return 0
    count = 0
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count

# Problem: Course Schedule (Topological Sort) — LeetCode #207
def can_finish(num_courses, prerequisites):
    graph = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    completed = 0
    
    while queue:
        course = queue.popleft()
        completed += 1
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return completed == num_courses
```

---

## Chapter 8: Dynamic Programming

### The Two Approaches

```python
# Problem: Fibonacci Number — LeetCode #509

# Approach 1: Top-Down (Memoization)
def fib_memo(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Approach 2: Bottom-Up (Tabulation)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Approach 3: Space-Optimized
def fib_optimized(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

### Classic DP Problems

```python
# Problem: Climbing Stairs — LeetCode #70
def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

# Problem: Coin Change — LeetCode #322
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Problem: Longest Increasing Subsequence — LeetCode #300
def length_of_lis(nums):
    n = len(nums)
    dp = [1] * n  # each element is a subsequence of length 1
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

# Problem: 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],                          # don't take
                    dp[i-1][w - weights[i-1]] + values[i-1]  # take
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

# Problem: House Robber — LeetCode #198
def rob(nums):
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    
    return dp[-1]
```

---

## Chapter 9: Binary Search Patterns

```python
# Pattern: Find exact target
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Pattern: Find leftmost (first occurrence)
def find_first(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1  # keep searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return result

# Problem: Search in Rotated Sorted Array — LeetCode #33
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
```

---

## Quick Reference: Pattern → Problem Mapping

| Pattern | Problems |
|---|---|
| **Two Pointers** | Two Sum II, 3Sum, Container With Most Water, Valid Palindrome |
| **Sliding Window** | Max Subarray Sum K, Longest Substring Without Repeating, Min Window Substring |
| **HashMap** | Two Sum, Group Anagrams, Top K Frequent, Subarray Sum Equals K |
| **Binary Search** | Search Rotated Array, Find Peak Element, Koko Eating Bananas |
| **BFS** | Level Order Traversal, Shortest Path, Rotten Oranges |
| **DFS** | Number of Islands, Path Sum, Word Search |
| **Stack** | Valid Parentheses, Min Stack, Next Greater Element, Daily Temperatures |
| **DP** | Climbing Stairs, Coin Change, House Robber, LIS, Knapsack |
| **Linked List** | Reverse List, Detect Cycle, Merge Sorted, Remove Nth From End |
| **Tree** | Max Depth, Invert Tree, Validate BST, LCA, Serialize/Deserialize |

---

*Solve 2 problems per day. Start with Easy, move to Medium after 3 weeks. You'll be interview-ready in 8-10 weeks.* 💪
