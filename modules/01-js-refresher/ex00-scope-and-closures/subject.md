## ex00 – scope-and-closures

### Objective

Re-introduce yourself to JavaScript scope rules and closures by re-implementing simple functions **without relying on global variables**.

### Mandatory

- Create a file `scope.js`.
- Implement the following **functions**:
  - `makeCounter(start)` → returns a function that, when called, returns the next integer (start, start+1, …).
  - `makePrefixer(prefix)` → returns a function `f(str)` that returns `prefix + str`.
- You **must** use closures to keep internal state. No globals.

### Usage

- The program will **not** read from `stdin`.
- It will be tested by `require('./scope.js')` and calling the exported functions.

Example (not exhaustive):

```js
const { makeCounter, makePrefixer } = require("./scope.js");

const c = makeCounter(10);
console.log(c()); // 10
console.log(c()); // 11

const hey = makePrefixer("hey ");
console.log(hey("you")); // "hey you"
```

### Strict rules

- **Language**: JavaScript (Node.js >= 18).
- **Allowed**: only the **standard language features** and built-in objects (no external libraries).
- **Forbidden**:
  - Global variables used as state.
  - `var` (only `let` and `const` allowed).
  - Any I/O in the implementation (no `console.log` inside the functions).
- **Exports**:
  - You must export an object:  
    `module.exports = { makeCounter, makePrefixer };`
- **Style**:
  - No unused parameters.
  - No dead code.

If any of these rules is not respected, the exercise is considered **failed**, even if the output looks correct.
