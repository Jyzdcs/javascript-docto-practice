## ex02 – codingame-style-stdin

### Objective
Simulate a **CodinGame-like** puzzle where you must read from `stdin`, process data, and print an exact output format.

### Problem
You are given:
- On the first line: an integer `N` (number of lines that follow).
- On the next `N` lines: each line contains a **word** (letters only).

Your job:
1. Find the **longest word length**.
2. For each word, output a line:  
   `<word> <len>/<maxLen>`  
   where:
   - `<word>` is the original word.
   - `<len>` is the length of the word.
   - `<maxLen>` is the maximum length among all words.

Lines must be printed in the **same order** as the input.

### Examples
Input:
```
3
hello
world
hi
```
Output:
```
hello 5/5
world 5/5
hi 2/5
```

### Mandatory
- Create a file `codingame_stdin.js`.
- Read from standard input and write to standard output using Node.js.
- You MUST implement a main function and call it from the bottom of the file.

### Boilerplate (you may follow this pattern)
```js
function main(lines) {
  // lines is an array of non-empty strings, already trimmed.
}

function readStdinAndRun() {
  const fs = require('fs');
  const data = fs.readFileSync(0, 'utf8').split('\n').map(line => line.replace(/\r$/, ''));
  const nonEmpty = data.filter(line => line.length > 0);
  main(nonEmpty);
}

if (require.main === module) {
  readStdinAndRun();
}

module.exports = { main };
```

### Strict rules
- **Input**:
  - Do **not** prompt the user; read directly from `stdin`.
- **Output**:
  - Do **not** add extra spaces or empty lines.
  - Use `console.log` for each output line.
- **Testing**:
  - Your logic must be isolated in `main(lines)` so it can be unit-tested.

If your program does not read exactly the expected format or prints extra junk, the exercise is **failed**, even if your logic is correct.


