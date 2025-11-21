## ex00 – arrays-and-strings

### Objective
Warm up with **array and string utilities** while respecting immutability and avoiding built-in shortcuts that hide complexity.

### Mandatory
- Create a file `arrays_strings.js`.
- Implement the following functions:
  - `reverseString(str)` → returns a **new string** with characters reversed.
  - `isPalindrome(str)` → returns `true` if `str` reads the same forwards and backwards, ignoring case and non-alphanumeric characters; otherwise `false`.
  - `uniqueChars(str)` → returns `true` if all characters in `str` are unique (case-sensitive), `false` otherwise.

### Usage
- No direct I/O; the functions are tested by requiring the module.

Example (not exhaustive):
```js
const { reverseString, isPalindrome, uniqueChars } = require('./arrays_strings.js');

console.log(reverseString('abc'));             // 'cba'
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(uniqueChars('abcA'));             // true
console.log(uniqueChars('hello'));            // false
```

### Strict rules
- **Forbidden**:
  - `Array.prototype.reverse` for `reverseString`.
  - Regex shortcuts that solve the whole function in one line (use them only to filter characters, not to replace all logic).
- **Required**:
  - Use **loops** and index access to build new strings.
  - Treat the input strings as **immutable**; never mutate them in-place.
  - Export as:
    `module.exports = { reverseString, isPalindrome, uniqueChars };`

Incorrect handling of edge cases (empty string, one char, punctuation only, etc.) or usage of forbidden helpers = **KO**.


