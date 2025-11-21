#!/usr/bin/env node

/**
 * Moulinette for ex00 - scope-and-closures
 * Tests makeCounter and makePrefixer implementations
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const EXERCISE_FILE = path.join(__dirname, "scope.js");
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

// Check if file exists
if (!fs.existsSync(EXERCISE_FILE)) {
  console.error(`\x1b[31mKO: scope.js not found\x1b[0m`);
  process.exit(1);
}

// Read file to check for forbidden patterns
const fileContent = fs.readFileSync(EXERCISE_FILE, "utf8");

// Check for forbidden patterns
test("No var keyword used", () => {
  if (/\bvar\b/.test(fileContent)) {
    throw new Error('Found "var" keyword. Use "let" or "const" instead.');
  }
});

test("No console.log in implementation", () => {
  // Remove comments and strings to avoid false positives
  const withoutStrings = fileContent
    .replace(/\/\/.*$/gm, "")
    .replace(/['"`].*?['"`]/gs, "");
  if (/console\.log/.test(withoutStrings)) {
    throw new Error(
      "Found console.log in implementation. Remove all I/O from functions."
    );
  }
});

// Try to require the module
let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(
    `\x1b[31mKO: Failed to require scope.js: ${error.message}\x1b[0m`
  );
  process.exit(1);
}

// Check exports
test("Exports makeCounter and makePrefixer", () => {
  assert(moduleExports, "Module exports should exist");
  assert(
    typeof moduleExports.makeCounter === "function",
    "makeCounter should be exported"
  );
  assert(
    typeof moduleExports.makePrefixer === "function",
    "makePrefixer should be exported"
  );
});

const { makeCounter, makePrefixer } = moduleExports;

// Test makeCounter
test("makeCounter returns a function", () => {
  const counter = makeCounter(0);
  assert(typeof counter === "function", "makeCounter should return a function");
});

test("makeCounter starts at given value", () => {
  const c = makeCounter(10);
  assert.strictEqual(c(), 10, "First call should return start value");
});

test("makeCounter increments correctly", () => {
  const c = makeCounter(5);
  assert.strictEqual(c(), 5);
  assert.strictEqual(c(), 6);
  assert.strictEqual(c(), 7);
});

test("makeCounter works with negative start", () => {
  const c = makeCounter(-3);
  assert.strictEqual(c(), -3);
  assert.strictEqual(c(), -2);
});

test("makeCounter instances are independent", () => {
  const c1 = makeCounter(0);
  const c2 = makeCounter(100);
  assert.strictEqual(c1(), 0);
  assert.strictEqual(c2(), 100);
  assert.strictEqual(c1(), 1);
  assert.strictEqual(c2(), 101);
});

// Test makePrefixer
test("makePrefixer returns a function", () => {
  const prefixer = makePrefixer("test ");
  assert(
    typeof prefixer === "function",
    "makePrefixer should return a function"
  );
});

test("makePrefixer adds prefix correctly", () => {
  const hey = makePrefixer("hey ");
  assert.strictEqual(hey("you"), "hey you");
});

test("makePrefixer works with empty string", () => {
  const empty = makePrefixer("");
  assert.strictEqual(empty("test"), "test");
});

test("makePrefixer works with multiple calls", () => {
  const prefix = makePrefixer("pre-");
  assert.strictEqual(prefix("a"), "pre-a");
  assert.strictEqual(prefix("b"), "pre-b");
  assert.strictEqual(prefix("c"), "pre-c");
});

test("makePrefixer instances are independent", () => {
  const p1 = makePrefixer("A: ");
  const p2 = makePrefixer("B: ");
  assert.strictEqual(p1("x"), "A: x");
  assert.strictEqual(p2("y"), "B: y");
});

test("makePrefixer handles special characters", () => {
  const special = makePrefixer("🎉 ");
  assert.strictEqual(special("party"), "🎉 party");
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
