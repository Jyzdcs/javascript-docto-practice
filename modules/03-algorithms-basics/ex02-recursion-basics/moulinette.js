#!/usr/bin/env node

/**
 * Moulinette for ex02 - recursion-basics
 * Tests factorial, fib, sumArrayRecursive
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'recursion.js');
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
  console.error(`\x1b[31mKO: recursion.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check for forbidden loops (heuristic - check if loops are used in function bodies)
test('No for loops in function implementations', () => {
  // Remove comments and strings
  const clean = fileContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutStrings = clean.replace(/['"`].*?['"`]/gs, '');
  
  // Check if factorial, fib, or sumArrayRecursive contain for/while
  const funcPatterns = [
    /factorial\s*\([^)]*\)\s*\{[\s\S]*?\}/,
    /fib\s*\([^)]*\)\s*\{[\s\S]*?\}/,
    /sumArrayRecursive\s*\([^)]*\)\s*\{[\s\S]*?\}/
  ];
  
  for (const pattern of funcPatterns) {
    const match = withoutStrings.match(pattern);
    if (match) {
      const funcBody = match[0];
      if (/\b(for|while|for\s*\(|for\s+of|for\s+in)\b/.test(funcBody)) {
        throw new Error('Found loop in recursive function. Use pure recursion only.');
      }
    }
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require recursion.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports factorial, fib, sumArrayRecursive', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.factorial === 'function', 'factorial should be exported');
  assert(typeof moduleExports.fib === 'function', 'fib should be exported');
  assert(typeof moduleExports.sumArrayRecursive === 'function', 'sumArrayRecursive should be exported');
});

const { factorial, fib, sumArrayRecursive } = moduleExports;

// Test factorial
test('factorial(0) returns 1', () => {
  assert.strictEqual(factorial(0), 1);
});

test('factorial(1) returns 1', () => {
  assert.strictEqual(factorial(1), 1);
});

test('factorial(5) returns 120', () => {
  assert.strictEqual(factorial(5), 120);
});

test('factorial throws RangeError for negative', () => {
  assert.throws(() => factorial(-1), RangeError);
  assert.throws(() => factorial(-10), RangeError);
});

test('factorial handles larger numbers', () => {
  assert.strictEqual(factorial(10), 3628800);
});

// Test fib (memoized)
test('fib(0) returns 0', () => {
  assert.strictEqual(fib(0), 0);
});

test('fib(1) returns 1', () => {
  assert.strictEqual(fib(1), 1);
});

test('fib(2) returns 1', () => {
  assert.strictEqual(fib(2), 1);
});

test('fib(10) returns 55', () => {
  assert.strictEqual(fib(10), 55);
});

test('fib is memoized (fast for large n)', () => {
  const start = Date.now();
  const result = fib(40);
  const elapsed = Date.now() - start;
  assert.strictEqual(result, 102334155);
  // If not memoized, this would take forever
  assert(elapsed < 1000, 'fib should be fast (memoized)');
});

test('fib handles larger numbers efficiently', () => {
  const result = fib(50);
  assert.strictEqual(result, 12586269025);
});

// Test sumArrayRecursive
test('sumArrayRecursive sums correctly', () => {
  assert.strictEqual(sumArrayRecursive([1, 2, 3]), 6);
});

test('sumArrayRecursive handles empty array', () => {
  assert.strictEqual(sumArrayRecursive([]), 0);
});

test('sumArrayRecursive handles single element', () => {
  assert.strictEqual(sumArrayRecursive([42]), 42);
});

test('sumArrayRecursive handles negative numbers', () => {
  assert.strictEqual(sumArrayRecursive([1, -2, 3]), 2);
});

test('sumArrayRecursive handles zeros', () => {
  assert.strictEqual(sumArrayRecursive([0, 0, 0]), 0);
});

test('sumArrayRecursive handles large array', () => {
  const arr = Array.from({ length: 100 }, (_, i) => i);
  const expected = (99 * 100) / 2; // sum 0..99
  assert.strictEqual(sumArrayRecursive(arr), expected);
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

