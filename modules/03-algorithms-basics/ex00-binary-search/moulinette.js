#!/usr/bin/env node

/**
 * Moulinette for ex00 - binary-search
 * Tests binarySearchIterative and binarySearchRecursive
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'binary_search.js');
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
  console.error(`\x1b[31mKO: binary_search.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check forbidden methods
test('No indexOf used', () => {
  if (/\.indexOf\s*\(/.test(fileContent)) {
    throw new Error('Found .indexOf() usage. Implement binary search manually.');
  }
});

test('No includes used', () => {
  if (/\.includes\s*\(/.test(fileContent)) {
    throw new Error('Found .includes() usage. Implement binary search manually.');
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require binary_search.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports binarySearchIterative and binarySearchRecursive', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.binarySearchIterative === 'function', 'binarySearchIterative should be exported');
  assert(typeof moduleExports.binarySearchRecursive === 'function', 'binarySearchRecursive should be exported');
});

const { binarySearchIterative, binarySearchRecursive } = moduleExports;

// Test binarySearchIterative
test('binarySearchIterative finds element in middle', () => {
  assert.strictEqual(binarySearchIterative([1, 3, 5, 7], 5), 2);
});

test('binarySearchIterative finds element at start', () => {
  assert.strictEqual(binarySearchIterative([1, 3, 5, 7], 1), 0);
});

test('binarySearchIterative finds element at end', () => {
  assert.strictEqual(binarySearchIterative([1, 3, 5, 7], 7), 3);
});

test('binarySearchIterative returns -1 when not found', () => {
  assert.strictEqual(binarySearchIterative([1, 3, 5, 7], 4), -1);
});

test('binarySearchIterative handles empty array', () => {
  assert.strictEqual(binarySearchIterative([], 5), -1);
});

test('binarySearchIterative handles single element', () => {
  assert.strictEqual(binarySearchIterative([5], 5), 0);
  assert.strictEqual(binarySearchIterative([5], 3), -1);
});

test('binarySearchIterative handles large array', () => {
  const arr = Array.from({ length: 1000 }, (_, i) => i * 2);
  assert.strictEqual(binarySearchIterative(arr, 500), 250);
  assert.strictEqual(binarySearchIterative(arr, 501), -1);
});

// Test binarySearchRecursive
test('binarySearchRecursive finds element in middle', () => {
  assert.strictEqual(binarySearchRecursive([1, 3, 5, 7], 5), 2);
});

test('binarySearchRecursive finds element at start', () => {
  assert.strictEqual(binarySearchRecursive([1, 3, 5, 7], 1), 0);
});

test('binarySearchRecursive finds element at end', () => {
  assert.strictEqual(binarySearchRecursive([1, 3, 5, 7], 7), 3);
});

test('binarySearchRecursive returns -1 when not found', () => {
  assert.strictEqual(binarySearchRecursive([1, 3, 5, 7], 4), -1);
});

test('binarySearchRecursive handles empty array', () => {
  assert.strictEqual(binarySearchRecursive([], 5), -1);
});

test('binarySearchRecursive handles single element', () => {
  assert.strictEqual(binarySearchRecursive([5], 5), 0);
  assert.strictEqual(binarySearchRecursive([5], 3), -1);
});

test('binarySearchRecursive handles large array', () => {
  const arr = Array.from({ length: 1000 }, (_, i) => i * 2);
  assert.strictEqual(binarySearchRecursive(arr, 500), 250);
  assert.strictEqual(binarySearchRecursive(arr, 501), -1);
});

test('Both functions return same results', () => {
  const testCases = [
    [[1, 3, 5, 7], 5],
    [[1, 3, 5, 7], 1],
    [[1, 3, 5, 7], 7],
    [[1, 3, 5, 7], 4],
    [[], 5],
    [[5], 5],
    [[5], 3],
  ];
  
  for (const [arr, target] of testCases) {
    const iter = binarySearchIterative(arr, target);
    const rec = binarySearchRecursive(arr, target);
    assert.strictEqual(iter, rec, `Mismatch for arr=${JSON.stringify(arr)}, target=${target}`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: \x1b[32m${testsPassed}\x1b[0m`);
console.log(`Tests failed: \x1b[31m${testsFailed}\x1b[0m`);

if (testsFailed > 0) {
  console.log('\nFailures:');
  failures.forEach(({ name, error }) => {
    console.log(`  - ${name}: ${error}`);
  });
  console.log('\n\x1b[31mKO\x1b[0m');
  process.exit(1);
} else {
  console.log('\n\x1b[32mOK\x1b[0m');
  process.exit(0);
}

