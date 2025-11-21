## ex03 – hashmap-set

### Objective
Understand how a **hash map** and **set** can be implemented under the hood using buckets.

### Mandatory
- Create a file `hashmap_set.js`.
- Implement:
  - A `HashMap` class with methods:
    - `set(key, value)`
    - `get(key)` → returns the stored value or `undefined`.
    - `has(key)` → boolean.
    - `delete(key)` → boolean; `true` if key was present and removed.
  - A `HashSet` class built **on top of your `HashMap`** with:
    - `add(value)`
    - `has(value)`
    - `delete(value)`

### Implementation details
- Use an **array of buckets** internally:
  - Each bucket is an array of `[key, value]` pairs.
  - Use a simple hash function on stringified keys:
    - Example idea (you can choose your own):  
      - Convert key to string: `String(key)`  
      - Sum character codes modulo `bucketCount`.
- Handle **collisions** by storing multiple pairs in the same bucket.

### Usage
- No direct I/O; tested by requiring the module.

Example (not exhaustive):
```js
const { HashMap, HashSet } = require('./hashmap_set.js');

const map = new HashMap();
map.set('a', 1);
map.set('b', 2);
console.log(map.get('a')); // 1
console.log(map.has('c')); // false

const set = new HashSet();
set.add('hello');
console.log(set.has('hello')); // true
set.delete('hello');
console.log(set.has('hello')); // false
```

### Strict rules
- **Forbidden**:
  - Built-ins `Map` and `Set` as internal storage.
- **Required**:
  - Use an array of buckets (e.g. size 53 or 101).
  - Export as:
    `module.exports = { HashMap, HashSet };`
  - Ensure `set` overwrites existing key instead of duplicating it.

If you use built-in `Map`/`Set` internally or don’t correctly handle collisions / overwrites, the exercise is **failed**.


