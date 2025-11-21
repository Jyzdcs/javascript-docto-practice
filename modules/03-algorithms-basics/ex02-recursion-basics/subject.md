## ex02 – recursion-basics

### Objective
Get comfortable with **recursion** and reasoning about base cases and stack depth.

### Mandatory
- Create a file `recursion.js`.
- Implement:
  - `factorial(n)` → recursive implementation of factorial.  
    - If `n < 0`, throw `new RangeError('n must be >= 0')`.
  - `fib(n)` → returns the n-th Fibonacci number using **memoized recursion** (top-down DP).  
    - `fib(0) = 0`, `fib(1) = 1`.
  - `sumArrayRecursive(array)` → recursively sums numbers in an array.

### Usage
- No direct I/O; the functions are tested via `require('./recursion.js')`.

Example (not exhaustive):
```js
const { factorial, fib, sumArrayRecursive } = require('./recursion.js');

console.log(factorial(5));          // 120
console.log(fib(10));               // 55
console.log(sumArrayRecursive([1, 2, 3])); // 6
```

### Strict rules
- **Forbidden**:
  - Iterative loops (`for`, `while`, `for...of`, etc.) **inside these functions**.
- **Required**:
  - Use **pure recursion** for all three functions.
  - Use memoization in `fib` (e.g. internal object or closure) to avoid exponential complexity.
  - Export as:
    `module.exports = { factorial, fib, sumArrayRecursive };`

If you bypass recursion with loops or ignore memoization for `fib`, the exercise is **failed**.


