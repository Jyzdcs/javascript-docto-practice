#!/usr/bin/env node

/**
 * Moulinette for ex03 - hashmap-set
 * Tests HashMap and HashSet implementations
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'hashmap_set.js');
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
  console.error(`\x1b[31mKO: hashmap_set.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check forbidden built-ins
test('No built-in Map used internally', () => {
  // Check for Map usage that's not just a comment or string
  const withoutComments = fileContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutStrings = withoutComments.replace(/['"`].*?['"`]/gs, '');
  if (/\bnew\s+Map\s*\(/.test(withoutStrings) && !/module\.exports/.test(withoutStrings)) {
    throw new Error('Found built-in Map usage. Implement your own HashMap.');
  }
});

test('No built-in Set used internally', () => {
  const withoutComments = fileContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutStrings = withoutComments.replace(/['"`].*?['"`]/gs, '');
  if (/\bnew\s+Set\s*\(/.test(withoutStrings) && !/module\.exports/.test(withoutStrings)) {
    throw new Error('Found built-in Set usage. Implement your own HashSet.');
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require hashmap_set.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports HashMap and HashSet', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.HashMap === 'function', 'HashMap should be exported');
  assert(typeof moduleExports.HashSet === 'function', 'HashSet should be exported');
});

const { HashMap, HashSet } = moduleExports;

// Test HashMap
test('HashMap can be instantiated', () => {
  const map = new HashMap();
  assert(map instanceof HashMap);
});

test('HashMap set and get work', () => {
  const map = new HashMap();
  map.set('a', 1);
  assert.strictEqual(map.get('a'), 1);
});

test('HashMap get returns undefined for missing key', () => {
  const map = new HashMap();
  assert.strictEqual(map.get('missing'), undefined);
});

test('HashMap has returns correct boolean', () => {
  const map = new HashMap();
  map.set('key', 'value');
  assert.strictEqual(map.has('key'), true);
  assert.strictEqual(map.has('missing'), false);
});

test('HashMap delete returns true when key exists', () => {
  const map = new HashMap();
  map.set('a', 1);
  assert.strictEqual(map.delete('a'), true);
  assert.strictEqual(map.has('a'), false);
});

test('HashMap delete returns false when key missing', () => {
  const map = new HashMap();
  assert.strictEqual(map.delete('missing'), false);
});

test('HashMap set overwrites existing key', () => {
  const map = new HashMap();
  map.set('key', 'old');
  map.set('key', 'new');
  assert.strictEqual(map.get('key'), 'new');
});

test('HashMap handles different key types', () => {
  const map = new HashMap();
  map.set('string', 1);
  map.set(42, 'number');
  map.set(true, 'boolean');
  assert.strictEqual(map.get('string'), 1);
  assert.strictEqual(map.get(42), 'number');
  assert.strictEqual(map.get(true), 'boolean');
});

test('HashMap handles collisions', () => {
  const map = new HashMap();
  // Add many keys to potentially cause collisions
  for (let i = 0; i < 100; i++) {
    map.set(`key${i}`, `value${i}`);
  }
  for (let i = 0; i < 100; i++) {
    assert.strictEqual(map.get(`key${i}`), `value${i}`);
  }
});

// Test HashSet
test('HashSet can be instantiated', () => {
  const set = new HashSet();
  assert(set instanceof HashSet);
});

test('HashSet add and has work', () => {
  const set = new HashSet();
  set.add('hello');
  assert.strictEqual(set.has('hello'), true);
  assert.strictEqual(set.has('world'), false);
});

test('HashSet delete returns true when value exists', () => {
  const set = new HashSet();
  set.add('value');
  assert.strictEqual(set.delete('value'), true);
  assert.strictEqual(set.has('value'), false);
});

test('HashSet delete returns false when value missing', () => {
  const set = new HashSet();
  assert.strictEqual(set.delete('missing'), false);
});

test('HashSet add overwrites duplicates', () => {
  const set = new HashSet();
  set.add('value');
  set.add('value'); // Should not duplicate
  assert.strictEqual(set.has('value'), true);
  set.delete('value');
  assert.strictEqual(set.has('value'), false);
});

test('HashSet handles different value types', () => {
  const set = new HashSet();
  set.add('string');
  set.add(42);
  set.add(true);
  assert.strictEqual(set.has('string'), true);
  assert.strictEqual(set.has(42), true);
  assert.strictEqual(set.has(true), true);
});

test('HashSet handles many values', () => {
  const set = new HashSet();
  for (let i = 0; i < 100; i++) {
    set.add(`value${i}`);
  }
  for (let i = 0; i < 100; i++) {
    assert.strictEqual(set.has(`value${i}`), true);
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

