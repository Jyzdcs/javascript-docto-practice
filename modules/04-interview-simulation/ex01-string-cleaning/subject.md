## ex01 – string-cleaning

### Objective
Work on a more **logic / implementation heavy** problem, similar to easy–medium CodinGame puzzles that require careful string handling.

### Problem
You receive a string containing:
- Lowercase letters `a-z`
- Uppercase letters `A-Z`
- Digits `0-9`
- Spaces and punctuation

You must:
1. Remove leading and trailing spaces.
2. Collapse any sequence of **one or more** spaces into **a single space**.
3. Remove all characters that are **not** letters (`a-z`, `A-Z`), digits (`0-9`) or spaces.

### Mandatory
- Create a file `string_cleaning.js`.
- Implement:
  - `cleanString(input)` → returns the cleaned string according to the rules above.
- Create a file `REASONING.md` and answer:
  1. What are the possible edge cases?
  2. What is the time complexity of your solution?
  3. How would you adapt this to very long strings (millions of characters)?

### Usage
- No I/O; tested by requiring the module.

Example (not exhaustive):
```js
const { cleanString } = require('./string_cleaning.js');

console.log(cleanString('  Hello,   world!!!  ')); // 'Hello world'
console.log(cleanString('42   is\tgreat'));        // '42 isgreat'
```

### Strict rules
- **Forbidden**:
  - One-line regex “god mode” that hides all logic (e.g. a single mega-regex doing all 3 steps at once).
- **Required**:
  - You may use **small, readable regexes** as helpers, or loops; your code must stay understandable.
  - Export as:
    `module.exports = { cleanString };`

If you ignore any of the three transformation rules or don’t provide `REASONING.md`, the exercise is **failed**.


