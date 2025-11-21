## ex00 – two-sum-style

### Objective
Simulate a classic **array + hash map** interview question and practice structured reasoning.

### Problem
Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to `target`.  
You may assume that **exactly one solution** exists, and you may not use the same element twice.

### Mandatory
- Create a file `two_sum.js`.
- Implement:
  - `twoSum(nums, target)` → returns an array `[i, j]` (with `i` and `j` being indices).
- Create a file `REASONING.md` in this folder and answer **in English**:
  1. Restate the problem in your own words.
  2. Give a **brute-force** approach and its time/space complexity.
  3. Describe your **optimized** approach and its time/space complexity.
  4. List at least **3 edge cases** you considered.
  5. Explain **why you chose this data structure** (array, object, Map, etc.).

### Usage
- No direct I/O in the function itself; it will be tested by requiring the module.

Example (not exhaustive):
```js
const { twoSum } = require('./two_sum.js');

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

### Strict rules
- **Implementation**:
  - The final version of `twoSum` must be **better than \(O(n^2)\)** in time complexity.
- **Files**:
  - Both `two_sum.js` **and** `REASONING.md` are mandatory.
- **Exports**:
  - `module.exports = { twoSum };`

If you do not provide the reasoning file or your solution is still \(O(n^2)\), the exercise is **failed**, even if tests pass.


