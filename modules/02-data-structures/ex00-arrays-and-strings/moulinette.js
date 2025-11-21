#!/usr/bin/env node

/**
 * Moulinette for ex00 - arrays-and-strings
 * Tests reverseString, isPalindrome, uniqueChars
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'arrays_strings.js');
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
  console.error(`\x1b[31mKO: arrays_strings.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check forbidden methods
test('No Array.prototype.reverse used', () => {
  if (/\.reverse\s*\(/.test(fileContent)) {
    throw new Error('Found .reverse() usage. Implement your own reverse logic.');
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require arrays_strings.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports reverseString, isPalindrome, uniqueChars', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.reverseString === 'function', 'reverseString should be exported');
  assert(typeof moduleExports.isPalindrome === 'function', 'isPalindrome should be exported');
  assert(typeof moduleExports.uniqueChars === 'function', 'uniqueChars should be exported');
});

const { reverseString, isPalindrome, uniqueChars } = moduleExports;

// Test reverseString
test('reverseString returns new string', () => {
  const input = 'abc';
  const result = reverseString(input);
  assert.notStrictEqual(result, input, 'Should return new string');
  assert.strictEqual(input, 'abc', 'Should not mutate input');
});

test('reverseString reverses correctly', () => {
  assert.strictEqual(reverseString('abc'), 'cba');
  assert.strictEqual(reverseString('hello'), 'olleh');
});

test('reverseString handles empty string', () => {
  assert.strictEqual(reverseString(''), '');
});

test('reverseString handles single character', () => {
  assert.strictEqual(reverseString('a'), 'a');
});

test('reverseString handles special characters', () => {
  assert.strictEqual(reverseString('🎉'), '🎉');
  assert.strictEqual(reverseString('a🎉b'), 'b🎉a');
});

// Test isPalindrome
test('isPalindrome returns true for simple palindromes', () => {
  assert.strictEqual(isPalindrome('aba'), true);
  assert.strictEqual(isPalindrome('racecar'), true);
});

test('isPalindrome ignores case', () => {
  assert.strictEqual(isPalindrome('Aba'), true);
  assert.strictEqual(isPalindrome('RaceCar'), true);
});

test('isPalindrome ignores non-alphanumeric', () => {
  assert.strictEqual(isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.strictEqual(isPalindrome('race a car'), false);
});

test('isPalindrome handles empty string', () => {
  assert.strictEqual(isPalindrome(''), true);
});

test('isPalindrome handles single character', () => {
  assert.strictEqual(isPalindrome('a'), true);
  assert.strictEqual(isPalindrome('A'), true);
});

test('isPalindrome handles punctuation only', () => {
  assert.strictEqual(isPalindrome('!!!'), true);
  assert.strictEqual(isPalindrome('.,;:'), true);
});

test('isPalindrome returns false for non-palindromes', () => {
  assert.strictEqual(isPalindrome('hello'), false);
  assert.strictEqual(isPalindrome('abc'), false);
});

// Test uniqueChars
test('uniqueChars returns true for unique characters', () => {
  assert.strictEqual(uniqueChars('abc'), true);
  assert.strictEqual(uniqueChars('abcA'), true); // case-sensitive
});

test('uniqueChars returns false for duplicates', () => {
  assert.strictEqual(uniqueChars('hello'), false);
  assert.strictEqual(uniqueChars('aabb'), false);
});

test('uniqueChars is case-sensitive', () => {
  assert.strictEqual(uniqueChars('abcA'), true); // 'a' and 'A' are different
  assert.strictEqual(uniqueChars('abcabc'), false);
});

test('uniqueChars handles empty string', () => {
  assert.strictEqual(uniqueChars(''), true);
});

test('uniqueChars handles single character', () => {
  assert.strictEqual(uniqueChars('a'), true);
});

test('uniqueChars handles special characters', () => {
  assert.strictEqual(uniqueChars('!@#'), true);
  assert.strictEqual(uniqueChars('!!'), false);
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

