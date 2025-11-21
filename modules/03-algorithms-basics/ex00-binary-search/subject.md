## ex00 – binary-search

### Objective
Implement **iterative** and **recursive** binary search on a sorted array.

### Mandatory
- Create a file `binary_search.js`.
- Implement:
  - `binarySearchIterative(array, target)` → returns the index of `target` in `array`, or `-1` if not found.
  - `binarySearchRecursive(array, target)` → same behavior, but recursive.

### Assumptions
- `array` is sorted in **strictly increasing** order.
- `array` may be empty.

### Usage
- No I/O; tested by requiring the module.

Example (not exhaustive):
```js
const { binarySearchIterative, binarySearchRecursive } = require('./binary_search.js');

console.log(binarySearchIterative([1, 3, 5, 7], 5)); // 2
console.log(binarySearchRecursive([1, 3, 5, 7], 4)); // -1
```

### Strict rules
- **Forbidden**:
  - Using `indexOf`, `includes` or other search helpers that hide the algorithm.
- **Required**:
  - Use the classic binary search pattern with `left`, `right`, and `mid`.
  - Handle empty arrays and single-element arrays correctly.
  - Export as:
    `module.exports = { binarySearchIterative, binarySearchRecursive };`

Incorrect handling of bounds / infinite loops / stack overflow due to bad recursion base-case = **KO**.


