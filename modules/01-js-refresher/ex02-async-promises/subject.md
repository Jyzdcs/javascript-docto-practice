## ex02 – async-promises

### Objective
Practice **Promises** and `async` / `await` by writing small, deterministic async helpers without using external libraries.

### Mandatory
- Create a file `async.js`.
- Implement the following functions:
  - `wait(ms)`  
    - Returns a **Promise** that resolves after `ms` milliseconds.  
    - If `ms` is negative, it must reject with `new RangeError('ms must be >= 0')`.
  - `retry(fn, retries, delayMs)`  
    - `fn` is an **async function** (or a function returning a Promise).  
    - Tries to call `fn()` up to `retries + 1` times.  
    - Between each failed attempt, waits `delayMs` milliseconds using your own `wait` function.  
    - If one call resolves, `retry` resolves with that value.  
    - If all attempts fail, `retry` rejects with the **last error** thrown by `fn`.

### Usage
- No direct I/O is required. The functions will be tested by requiring the module and inspecting behavior.

Example (not exhaustive):
```js
const { wait, retry } = require('./async.js');

async function unstable() {
  if (Math.random() < 0.7) throw new Error('boom');
  return 'ok';
}

retry(unstable, 3, 50)
  .then(console.log)
  .catch(err => console.error('failed:', err.message));
```

### Strict rules
- **Required**:
  - Use **Promises** and at least one `async` / `await` in your implementation of `retry`.
  - Implement `wait` **using `setTimeout`**.
  - Export as:
    `module.exports = { wait, retry };`
- **Forbidden**:
  - Any external library.
  - `setInterval`.
  - Blocking the event loop (no busy loops like `while (Date.now() < ...)`).
  - Using `then` / `catch` chains **only**; at least one function must use `async` / `await`.

Any violation of these rules, or incorrect edge-case handling, results in a **failed exercise**, even if basic examples seem to work.


