#!/usr/bin/env node

/**
 * Moulinette for ex01 - sorting
 * Tests bubbleSort and mergeSort implementations
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'sorting.js');
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
  console.error(`\x1b[31mKO: sorting.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check forbidden methods
test('No Array.prototype.sort used', () => {
  if (/\.sort\s*\(/.test(fileContent)) {
    throw new Error('Found .sort() usage. Implement your own sorting algorithms.');
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require sorting.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports bubbleSort and mergeSort', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.bubbleSort === 'function', 'bubbleSort should be exported');
  assert(typeof moduleExports.mergeSort === 'function', 'mergeSort should be exported');
});

const { bubbleSort, mergeSort } = moduleExports;

// Test bubbleSort (in-place)
test('bubbleSort sorts correctly', () => {
  const arr = [3, 1, 2];
  const result = bubbleSort(arr);
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test('bubbleSort mutates input array', () => {
  const arr = [3, 1, 2];
  bubbleSort(arr);
  assert.deepStrictEqual(arr, [1, 2, 3], 'bubbleSort should mutate input');
});

test('bubbleSort handles empty array', () => {
  const arr = [];
  assert.deepStrictEqual(bubbleSort(arr), []);
});

test('bubbleSort handles single element', () => {
  const arr = [42];
  assert.deepStrictEqual(bubbleSort(arr), [42]);
});

test('bubbleSort handles duplicates', () => {
  const arr = [3, 1, 3, 2, 1];
  assert.deepStrictEqual(bubbleSort(arr), [1, 1, 2, 3, 3]);
});

test('bubbleSort handles already sorted array', () => {
  const arr = [1, 2, 3];
  assert.deepStrictEqual(bubbleSort(arr), [1, 2, 3]);
});

test('bubbleSort handles reverse sorted array', () => {
  const arr = [5, 4, 3, 2, 1];
  assert.deepStrictEqual(bubbleSort(arr), [1, 2, 3, 4, 5]);
});

// Test mergeSort (new array)
test('mergeSort sorts correctly', () => {
  const arr = [5, 1, 4, 2];
  const result = mergeSort(arr);
  assert.deepStrictEqual(result, [1, 2, 4, 5]);
});

test('mergeSort does not mutate input', () => {
  const arr = [5, 1, 4, 2];
  const original = [...arr];
  mergeSort(arr);
  assert.deepStrictEqual(arr, original, 'mergeSort should not mutate input');
});

test('mergeSort handles empty array', () => {
  const arr = [];
  assert.deepStrictEqual(mergeSort(arr), []);
});

test('mergeSort handles single element', () => {
  const arr = [42];
  assert.deepStrictEqual(mergeSort(arr), [42]);
});

test('mergeSort handles duplicates', () => {
  const arr = [3, 1, 3, 2, 1];
  assert.deepStrictEqual(mergeSort(arr), [1, 1, 2, 3, 3]);
});

test('mergeSort handles already sorted array', () => {
  const arr = [1, 2, 3];
  assert.deepStrictEqual(mergeSort(arr), [1, 2, 3]);
});

test('mergeSort handles reverse sorted array', () => {
  const arr = [5, 4, 3, 2, 1];
  assert.deepStrictEqual(mergeSort(arr), [1, 2, 3, 4, 5]);
});

test('mergeSort handles large array', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
  const sorted = mergeSort(arr);
  for (let i = 1; i < sorted.length; i++) {
    assert(sorted[i - 1] <= sorted[i], 'Array should be sorted');
  }
});

test('bubbleSort handles large array', () => {
  const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
  bubbleSort(arr);
  for (let i = 1; i < arr.length; i++) {
    assert(arr[i - 1] <= arr[i], 'Array should be sorted');
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

