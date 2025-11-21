## ex01 – higher-order-functions

### Objective
Practice **higher-order functions** by re-implementing a small subset of array utilities **without using `Array.prototype.map/filter/reduce`**.

### Mandatory
- Create a file `hof.js`.
- Implement the following functions:
  - `map(array, fn)` → returns a **new array** where each element is `fn(element, index, array)`.
  - `filter(array, fn)` → returns a **new array** with only the elements for which `fn(element, index, array)` returns a truthy value.
  - `reduce(array, fn, initial)` → behaves like native `Array.prototype.reduce` (left fold).

### Usage
- No direct I/O. The functions will be tested by requiring the module.

Example (not exhaustive):
```js
const { map, filter, reduce } = require('./hof.js');

console.log(map([1, 2, 3], x => x * 2));        // [2, 4, 6]
console.log(filter([1, 2, 3, 4], x => x % 2));  // [1, 3]
console.log(reduce([1, 2, 3], (a, b) => a + b, 0)); // 6
```

### Strict rules
- **Forbidden**:
  - `Array.prototype.map`, `Array.prototype.filter`, `Array.prototype.reduce`.
  - Any external libraries.
  - Mutating the input array.
- **Required**:
  - Use **plain `for` / `for...of` loops** or `while` to iterate.
  - Export the functions as:
    `module.exports = { map, filter, reduce };`
- **Edge cases**:
  - `reduce([], fn, initial)` should return `initial` without calling `fn`.
  - If `array` is not an array, you must throw: `throw new TypeError('Expected array');`

Any violation of the forbidden list or missing behavior = **KO**.


