## ex01 – stack-queue

### Objective
Implement a **Stack** and a **Queue** from scratch and understand the cost of their operations.

### Mandatory
- Create a file `stack_queue.js`.
- Implement:
  - A `Stack` class with methods:
    - `push(value)`
    - `pop()` → removes and returns top element, or `undefined` if empty.
    - `peek()` → returns top element without removing, or `undefined`.
    - `isEmpty()` → boolean.
  - A `Queue` class with methods:
    - `enqueue(value)`
    - `dequeue()` → removes and returns front element, or `undefined` if empty.
    - `peek()` → returns front element without removing, or `undefined`.
    - `isEmpty()` → boolean.

### Usage
- No direct I/O; tested via `require('./stack_queue.js')`.

Example (not exhaustive):
```js
const { Stack, Queue } = require('./stack_queue.js');

const s = new Stack();
s.push(1);
s.push(2);
console.log(s.pop());   // 2
console.log(s.peek());  // 1

const q = new Queue();
q.enqueue(10);
q.enqueue(20);
console.log(q.dequeue()); // 10
console.log(q.peek());    // 20
```

### Strict rules
- **Implementation**:
  - You may use a plain JavaScript array **internally**, but:
    - For `Queue`, you must avoid `shift()` in a way that would cause amortized \(O(n)\) per `dequeue` (e.g. use head/tail indices).
  - No external libraries.
- **Exports**:
  - `module.exports = { Stack, Queue };`
- **Complexity**:
  - Target **amortized \(O(1)\)** for:
    - `push`, `pop`, `enqueue`, `dequeue`, `peek`, `isEmpty`.

If complexity or interface rules are not respected, the exercise is **failed**, even if basic examples pass.


