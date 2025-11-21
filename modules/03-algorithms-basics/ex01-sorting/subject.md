## ex01 – sorting

### Objective
Implement **two classic sorting algorithms** and compare them to the built-in sort.

### Mandatory
- Create a file `sorting.js`.
- Implement:
  - `bubbleSort(array)` → sorts the array **in-place** using bubble sort, and returns it.
  - `mergeSort(array)` → returns a **new sorted array** using merge sort (do not mutate the input).

### Assumptions
- All elements are numbers.
- You must support:
  - Empty arrays.
  - Arrays with duplicates.

### Usage
- No direct I/O; tested by requiring the module.

Example (not exhaustive):
```js
const { bubbleSort, mergeSort } = require('./sorting.js');

console.log(bubbleSort([3, 1, 2]));      // [1, 2, 3]
console.log(mergeSort([5, 1, 4, 2]));    // [1, 2, 4, 5]
```

### Strict rules
- **Forbidden**:
  - `array.sort(...)` anywhere in this file.
- **Required**:
  - `bubbleSort` MUST be clearly recognizable as bubble sort (nested loops, swapping neighbors).
  - `mergeSort` MUST use the divide-and-conquer approach:
    - Split array into halves.
    - Recursively sort each half.
    - Merge the two sorted halves.
  - Export as:
    `module.exports = { bubbleSort, mergeSort };`

If you try to hack around using the built-in sort or don’t respect the divide-and-conquer structure, the exercise is **failed**.


