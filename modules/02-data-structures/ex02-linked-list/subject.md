## ex02 – linked-list

### Objective
Implement a **singly linked list** and manipulate nodes manually instead of relying on arrays.

### Mandatory
- Create a file `linked_list.js`.
- Implement:
  - A `Node` class with:
    - `value`
    - `next` (default `null`)
  - A `LinkedList` class with methods:
    - `insertAtHead(value)`
    - `insertAtTail(value)`
    - `find(predicate)` → returns the **first node** for which `predicate(value)` is truthy, or `null`.
    - `remove(value)` → removes the **first node** whose `value === value`; returns `true` if removed, `false` otherwise.
    - `toArray()` → returns an array of all node values from head to tail.

### Usage
- No direct I/O; will be tested by requiring the module.

Example (not exhaustive):
```js
const { LinkedList } = require('./linked_list.js');

const list = new LinkedList();
list.insertAtHead(2);
list.insertAtHead(1);
list.insertAtTail(3);
console.log(list.toArray()); // [1, 2, 3]
list.remove(2);
console.log(list.toArray()); // [1, 3]
```

### Strict rules
- **Implementation**:
  - You must manage `Node` links manually; **no internal arrays** to store values.
  - `find` must **not** convert the list to an array to search.
- **Exports**:
  - `module.exports = { Node, LinkedList };`
- **Complexity**:
  - `insertAtHead` should be \(O(1)\).
  - `insertAtTail` should be \(O(1)\) on average (keep a tail reference).

Any use of arrays as the primary storage, or ignoring the complexity constraints, results in **KO**.


