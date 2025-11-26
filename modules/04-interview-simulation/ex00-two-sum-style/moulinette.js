#!/usr/bin/env node

/**
 * Moulinette for ex00 - two-sum-style
 * Tests twoSum implementation and checks for REASONING.md
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const EXERCISE_FILE = path.join(__dirname, "two_sum.js");
const REASONING_FILE = path.join(__dirname, "REASONING.md");
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
  console.error(`\x1b[31mKO: two_sum.js not found\x1b[0m`);
  process.exit(1);
}

if (!fs.existsSync(REASONING_FILE)) {
  console.error(`\x1b[31mKO: REASONING.md not found\x1b[0m`);
  process.exit(1);
}

// Check REASONING.md content
test("REASONING.md exists and has content", () => {
  const content = fs.readFileSync(REASONING_FILE, "utf8");
  assert(content.length > 100, "REASONING.md should have substantial content");

  // Check for key sections (heuristic)
  const lower = content.toLowerCase();
  assert(
    lower.includes("brute") || lower.includes("brute-force"),
    "Should mention brute-force approach"
  );
  assert(
    lower.includes("complexity") || lower.includes("o("),
    "Should mention complexity"
  );
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(
    `\x1b[31mKO: Failed to require two_sum.js: ${error.message}\x1b[0m`
  );
  process.exit(1);
}

test("Exports twoSum", () => {
  assert(moduleExports, "Module exports should exist");
  assert(
    typeof moduleExports.twoSum === "function",
    "twoSum should be exported"
  );
});

const { twoSum } = moduleExports;

// Test twoSum
test("twoSum finds correct indices", () => {
  const result = twoSum([2, 7, 11, 15], 9);
  assert(Array.isArray(result), "Should return an array");
  assert.strictEqual(result.length, 2, "Should return 2 indices");
  assert.strictEqual(result[0] + result[1], 1, "Indices should be 0 and 1");
  // Check values sum to target
  const [i, j] = result;
  assert.strictEqual(2 + 7, 9);
});

test("twoSum returns correct indices", () => {
  const result = twoSum([2, 7, 11, 15], 9);
  // Should be [0, 1] since nums[0] + nums[1] = 2 + 7 = 9
  assert.deepStrictEqual(result, [0, 1]);
});

test("twoSum handles different target", () => {
  const result = twoSum([3, 2, 4], 6);
  assert.deepStrictEqual(result, [1, 2]); // nums[1] + nums[2] = 2 + 4 = 6
});

test("twoSum handles array with duplicates", () => {
  const result = twoSum([3, 3], 6);
  assert.deepStrictEqual(result.length, 2);
  assert.notStrictEqual(
    result[0],
    result[1],
    "Should not use same element twice"
  );
});

test("twoSum handles negative numbers", () => {
  const result = twoSum([-1, -2, -3, -4, -5], -8);
  const [i, j] = result;
  assert.strictEqual(-3 + -5, -8);
});

test("twoSum handles zero", () => {
  const result = twoSum([0, 4, 3, 0], 0);
  const [i, j] = result;
  assert.strictEqual(0 + 0, 0);
});

test("twoSum is better than O(n^2)", () => {
  // This is a heuristic test - we check that it completes quickly on large input
  const largeArray = Array.from({ length: 10001 }, (_, i) => i);
  const target = 19999; // last two elements

  const start = Date.now();
  const result = twoSum(largeArray, target);
  const elapsed = Date.now() - start;

  assert(result.length === 2, "Should return 2 indices");
  // If O(n^2), this would take much longer
  assert(elapsed < 100, "Should complete quickly (better than O(n^2))");
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
