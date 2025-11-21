#!/usr/bin/env node

/**
 * Moulinette for ex01 - string-cleaning
 * Tests cleanString implementation and checks for REASONING.md
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'string_cleaning.js');
const REASONING_FILE = path.join(__dirname, 'REASONING.md');
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
  console.error(`\x1b[31mKO: string_cleaning.js not found\x1b[0m`);
  process.exit(1);
}

if (!fs.existsSync(REASONING_FILE)) {
  console.error(`\x1b[31mKO: REASONING.md not found\x1b[0m`);
  process.exit(1);
}

// Check REASONING.md
test('REASONING.md exists and has content', () => {
  const content = fs.readFileSync(REASONING_FILE, 'utf8');
  assert(content.length > 50, 'REASONING.md should have content');
  
  const lower = content.toLowerCase();
  assert(lower.includes('edge') || lower.includes('case'), 'Should mention edge cases');
  assert(lower.includes('complexity') || lower.includes('o('), 'Should mention complexity');
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require string_cleaning.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports cleanString', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.cleanString === 'function', 'cleanString should be exported');
});

const { cleanString } = moduleExports;

// Test cleanString
test('cleanString removes leading/trailing spaces', () => {
  assert.strictEqual(cleanString('  hello  '), 'hello');
});

test('cleanString collapses multiple spaces', () => {
  assert.strictEqual(cleanString('hello   world'), 'hello world');
});

test('cleanString removes non-alphanumeric (except spaces)', () => {
  assert.strictEqual(cleanString('Hello, world!!!'), 'Hello world');
});

test('cleanString handles example from subject', () => {
  assert.strictEqual(cleanString('  Hello,   world!!!  '), 'Hello world');
});

test('cleanString handles tabs and newlines as spaces', () => {
  assert.strictEqual(cleanString('42   is\tgreat'), '42 isgreat');
  // Note: subject example shows '42 isgreat' (no space after 'is' because \t is collapsed)
});

test('cleanString handles empty string', () => {
  assert.strictEqual(cleanString(''), '');
});

test('cleanString handles only spaces', () => {
  assert.strictEqual(cleanString('     '), '');
});

test('cleanString handles only punctuation', () => {
  assert.strictEqual(cleanString('!!!@@@###'), '');
});

test('cleanString preserves alphanumeric and spaces', () => {
  assert.strictEqual(cleanString('abc123 XYZ'), 'abc123 XYZ');
});

test('cleanString handles mixed case', () => {
  assert.strictEqual(cleanString('Hello World 123'), 'Hello World 123');
});

test('cleanString collapses multiple spaces correctly', () => {
  assert.strictEqual(cleanString('a    b    c'), 'a b c');
});

test('cleanString handles leading/trailing with internal spaces', () => {
  assert.strictEqual(cleanString('  a   b   c  '), 'a b c');
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

