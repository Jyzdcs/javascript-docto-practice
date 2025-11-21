#!/usr/bin/env node

/**
 * Moulinette for ex01 - higher-order-functions
 * Tests map, filter, reduce implementations
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const EXERCISE_FILE = path.join(__dirname, "hof.js");
let testsPassed = 0;
let testsFailed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`\x1b[32m✓\x1b[0m ${name}`);
  } catch (error) {
    testsFailed++;
    failures.push({ name, error: error.message });
    console.log(`\x1b[31m✗\x1b[0m ${name}`);
    console.log(`  \x1b[31m${error.message}\x1b[0m`);
  }
}

if (!fs.existsSync(EXERCISE_FILE)) {
  console.error(`\x1b[31mKO: hof.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, "utf8");

// Check for forbidden methods
test("No Array.prototype.map used", () => {
  if (/\.map\s*\(/.test(fileContent)) {
    throw new Error("Found .map() usage. Implement your own map function.");
  }
});

test("No Array.prototype.filter used", () => {
  if (/\.filter\s*\(/.test(fileContent)) {
    throw new Error(
      "Found .filter() usage. Implement your own filter function."
    );
  }
});

test("No Array.prototype.reduce used", () => {
  if (/\.reduce\s*\(/.test(fileContent)) {
    throw new Error(
      "Found .reduce() usage. Implement your own reduce function."
    );
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(
    `\x1b[31mKO: Failed to require hof.js: ${error.message}\x1b[0m`
  );
  process.exit(1);
}

test("Exports map, filter, reduce", () => {
  assert(moduleExports, "Module exports should exist");
  assert(typeof moduleExports.map === "function", "map should be exported");
  assert(
    typeof moduleExports.filter === "function",
    "filter should be exported"
  );
  assert(
    typeof moduleExports.reduce === "function",
    "reduce should be exported"
  );
});

const { map, filter, reduce } = moduleExports;

// Test map
test("map returns new array", () => {
  const arr = [1, 2, 3];
  const result = map(arr, (x) => x * 2);
  assert.notStrictEqual(result, arr, "map should return a new array");
  assert.deepStrictEqual(arr, [1, 2, 3], "map should not mutate input");
});

test("map transforms elements correctly", () => {
  assert.deepStrictEqual(
    map([1, 2, 3], (x) => x * 2),
    [2, 4, 6]
  );
});

test("map passes index and array to callback", () => {
  const result = map([10, 20, 30], (el, idx, arr) => el + idx + arr.length);
  assert.deepStrictEqual(result, [13, 24, 35]); // 10+0+3, 20+1+3, 30+2+3
});

test("map handles empty array", () => {
  assert.deepStrictEqual(
    map([], (x) => x),
    []
  );
});

// Test filter
test("filter returns new array", () => {
  const arr = [1, 2, 3];
  const result = filter(arr, (x) => x > 1);
  assert.notStrictEqual(result, arr, "filter should return a new array");
  assert.deepStrictEqual(arr, [1, 2, 3], "filter should not mutate input");
});

test("filter keeps truthy elements", () => {
  assert.deepStrictEqual(
    filter([1, 2, 3, 4], (x) => x % 2),
    [1, 3]
  );
});

test("filter passes index and array to callback", () => {
  const result = filter([5, 10, 15], (el, idx, arr) => idx < 2);
  assert.deepStrictEqual(result, [5, 10]);
});

test("filter handles empty array", () => {
  assert.deepStrictEqual(
    filter([], (x) => x),
    []
  );
});

test("filter handles all falsy", () => {
  assert.deepStrictEqual(
    filter([0, false, null, undefined, ""], (x) => x),
    []
  );
});

// Test reduce
test("reduce returns initial for empty array", () => {
  assert.strictEqual(
    reduce([], (a, b) => a + b, 42),
    42
  );
});

test("reduce works with initial value", () => {
  assert.strictEqual(
    reduce([1, 2, 3], (a, b) => a + b, 0),
    6
  );
});

test("reduce works without initial (uses first element)", () => {
  assert.strictEqual(
    reduce([1, 2, 3], (a, b) => a + b),
    6
  );
});

test("reduce handles single element", () => {
  assert.strictEqual(
    reduce([42], (a, b) => a + b, 0),
    42
  );
});

test("reduce passes index and array to callback", () => {
  const result = reduce(
    [1, 2, 3],
    (acc, el, idx, arr) => acc + el + idx + arr.length,
    0
  );
  assert.strictEqual(result, 0 + 1 + 0 + 3 + 2 + 1 + 3 + 3 + 2 + 3); // 15
});

// Test error handling
test("map throws TypeError for non-array", () => {
  assert.throws(() => map(null, (x) => x), TypeError);
  assert.throws(() => map("hello", (x) => x), TypeError);
});

test("filter throws TypeError for non-array", () => {
  assert.throws(() => filter(null, (x) => x), TypeError);
  assert.throws(() => filter(42, (x) => x), TypeError);
});

test("reduce throws TypeError for non-array", () => {
  assert.throws(() => reduce(null, (a, b) => a + b, 0), TypeError);
  assert.throws(() => reduce({}, (a, b) => a + b, 0), TypeError);
});

// Summary
console.log("\n" + "=".repeat(50));
console.log(`Tests passed: \x1b[32m${testsPassed}\x1b[0m`);
console.log(`Tests failed: \x1b[31m${testsFailed}\x1b[0m`);

if (testsFailed > 0) {
  console.log("\nFailures:");
  failures.forEach(({ name, error }) => {
    console.log(`  - ${name}: ${error}`);
  });
  console.log("\n\x1b[31mKO\x1b[0m");
  process.exit(1);
} else {
  console.log("\n\x1b[32mOK\x1b[0m");
  process.exit(0);
}
