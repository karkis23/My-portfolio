"""
DSA Practice Problems — Solved Examples in Python
Run: python examples_dsa.py
Each problem includes: description, brute force, optimized solution, and complexity
"""


# =============================================
# 1. TWO SUM (LeetCode #1) — HashMap Pattern
# =============================================
def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Given an array and a target, return indices of two numbers that add up to target.
    
    Example: nums=[2,7,11,15], target=9 → [0,1] (because 2+7=9)
    
    Brute force: O(n²) — check every pair
    Optimized:   O(n)  — use HashMap to store seen values
    """
    seen = {}  # value → index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
assert two_sum([2, 7, 11, 15], 9) == [0, 1]
assert two_sum([3, 2, 4], 6) == [1, 2]
print("✅ Two Sum passed")


# =============================================
# 2. BEST TIME TO BUY/SELL STOCK (LeetCode #121)
# =============================================
def max_profit(prices: list[int]) -> int:
    """
    Find max profit from buying and selling once.
    
    Example: prices=[7,1,5,3,6,4] → 5 (buy@1, sell@6)
    
    Pattern: Track minimum price seen so far, calculate profit at each step.
    Time: O(n), Space: O(1)
    """
    min_price = float('inf')
    best_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        best_profit = max(best_profit, price - min_price)
    
    return best_profit

assert max_profit([7, 1, 5, 3, 6, 4]) == 5
assert max_profit([7, 6, 4, 3, 1]) == 0  # no profit possible
print("✅ Best Time to Buy/Sell Stock passed")


# =============================================
# 3. VALID PARENTHESES (LeetCode #20) — Stack Pattern
# =============================================
def is_valid(s: str) -> bool:
    """
    Check if parentheses are valid: ({[]}) → True, ({[} → False
    
    Pattern: Stack — push opening brackets, pop and match closing brackets.
    Time: O(n), Space: O(n)
    """
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

assert is_valid("()") == True
assert is_valid("()[]{}") == True
assert is_valid("(]") == False
assert is_valid("([)]") == False
assert is_valid("{[]}") == True
print("✅ Valid Parentheses passed")


# =============================================
# 4. MAXIMUM SUBARRAY (LeetCode #53) — Kadane's Algorithm
# =============================================
def max_subarray(nums: list[int]) -> int:
    """
    Find the contiguous subarray with the largest sum.
    
    Example: [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])
    
    Kadane's: Reset running sum if it goes negative.
    Time: O(n), Space: O(1)
    """
    max_sum = nums[0]
    current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum

assert max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
assert max_subarray([1]) == 1
assert max_subarray([-1]) == -1
print("✅ Maximum Subarray passed")


# =============================================
# 5. LONGEST SUBSTRING WITHOUT REPEATING (LeetCode #3) — Sliding Window
# =============================================
def length_of_longest_substring(s: str) -> int:
    """
    Find the length of the longest substring without repeating characters.
    
    Example: "abcabcbb" → 3 ("abc")
    
    Pattern: Sliding window with a set to track characters in window.
    Time: O(n), Space: O(min(n, alphabet_size))
    """
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

assert length_of_longest_substring("abcabcbb") == 3
assert length_of_longest_substring("bbbbb") == 1
assert length_of_longest_substring("pwwkew") == 3
print("✅ Longest Substring Without Repeating passed")


# =============================================
# 6. CLIMBING STAIRS (LeetCode #70) — Dynamic Programming
# =============================================
def climb_stairs(n: int) -> int:
    """
    You can climb 1 or 2 steps at a time. How many distinct ways to climb n steps?
    
    Example: n=3 → 3 ways: (1+1+1), (1+2), (2+1)
    
    Pattern: DP (Fibonacci-like). dp[i] = dp[i-1] + dp[i-2]
    Time: O(n), Space: O(1)
    """
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

assert climb_stairs(2) == 2
assert climb_stairs(3) == 3
assert climb_stairs(5) == 8
print("✅ Climbing Stairs passed")


# =============================================
# 7. NUMBER OF ISLANDS (LeetCode #200) — Graph DFS
# =============================================
def num_islands(grid: list[list[str]]) -> int:
    """
    Count the number of islands (connected '1's) in a 2D grid.
    
    Pattern: DFS from each unvisited '1', mark all connected '1's as visited.
    Time: O(m*n), Space: O(m*n) for recursion stack
    """
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count

grid1 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
]
assert num_islands(grid1) == 3
print("✅ Number of Islands passed")


# =============================================
# 8. COIN CHANGE (LeetCode #322) — DP
# =============================================
def coin_change(coins: list[int], amount: int) -> int:
    """
    Find minimum number of coins to make up the amount.
    
    Example: coins=[1,5,10], amount=11 → 2 (10+1)
    
    Pattern: DP. dp[i] = minimum coins to make amount i.
    Time: O(amount * len(coins)), Space: O(amount)
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

assert coin_change([1, 5, 10], 11) == 2
assert coin_change([2], 3) == -1
assert coin_change([1], 0) == 0
print("✅ Coin Change passed")


# =============================================
# 9. MERGE INTERVALS (LeetCode #56) — Sorting
# =============================================
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Merge overlapping intervals.
    
    Example: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
    
    Pattern: Sort by start, merge overlapping.
    Time: O(n log n), Space: O(n)
    """
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    
    return merged

assert merge_intervals([[1,3],[2,6],[8,10],[15,18]]) == [[1,6],[8,10],[15,18]]
print("✅ Merge Intervals passed")


# =============================================
# 10. BINARY SEARCH (LeetCode #704)
# =============================================
def binary_search(nums: list[int], target: int) -> int:
    """
    Search for target in sorted array.
    Time: O(log n), Space: O(1)
    """
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

assert binary_search([-1, 0, 3, 5, 9, 12], 9) == 4
assert binary_search([-1, 0, 3, 5, 9, 12], 2) == -1
print("✅ Binary Search passed")


print("\n🎉 All 10 examples passed! Practice these until you can solve them from memory.")
