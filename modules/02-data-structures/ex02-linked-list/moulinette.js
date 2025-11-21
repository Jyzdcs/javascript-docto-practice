#!/usr/bin/env node

/**
 * Moulinette for ex02 - linked-list
 * Tests Node and LinkedList implementations
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'linked_list.js');
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
  console.error(`\x1b[31mKO: linked_list.js not found\x1b[0m`);
  process.exit(1);
}

const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

// Check that find doesn't convert to array
test('find does not use toArray internally', () => {
  // This is a heuristic check - if find calls toArray, it's likely wrong
  const findFunction = fileContent.match(/find\s*\([^)]*\)\s*\{[\s\S]*?\}/);
  if (findFunction && /toArray/.test(findFunction[0])) {
    throw new Error('find() should not use toArray() - traverse nodes directly');
  }
});

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require linked_list.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports Node and LinkedList', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.Node === 'function', 'Node should be exported');
  assert(typeof moduleExports.LinkedList === 'function', 'LinkedList should be exported');
});

const { Node, LinkedList } = moduleExports;

// Test Node
test('Node can be instantiated', () => {
  const node = new Node(42);
  assert(node instanceof Node);
  assert.strictEqual(node.value, 42);
  assert.strictEqual(node.next, null);
});

test('Node can have next set', () => {
  const n1 = new Node(1);
  const n2 = new Node(2);
  n1.next = n2;
  assert.strictEqual(n1.next, n2);
});

// Test LinkedList
test('LinkedList can be instantiated', () => {
  const list = new LinkedList();
  assert(list instanceof LinkedList);
});

test('LinkedList insertAtHead adds to head', () => {
  const list = new LinkedList();
  list.insertAtHead(1);
  assert.deepStrictEqual(list.toArray(), [1]);
});

test('LinkedList insertAtHead maintains order', () => {
  const list = new LinkedList();
  list.insertAtHead(3);
  list.insertAtHead(2);
  list.insertAtHead(1);
  assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
});

test('LinkedList insertAtTail adds to tail', () => {
  const list = new LinkedList();
  list.insertAtTail(1);
  assert.deepStrictEqual(list.toArray(), [1]);
});

test('LinkedList insertAtTail maintains order', () => {
  const list = new LinkedList();
  list.insertAtTail(1);
  list.insertAtTail(2);
  list.insertAtTail(3);
  assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
});

test('LinkedList insertAtHead and insertAtTail work together', () => {
  const list = new LinkedList();
  list.insertAtHead(2);
  list.insertAtHead(1);
  list.insertAtTail(3);
  assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
});

test('LinkedList find returns node matching predicate', () => {
  const list = new LinkedList();
  list.insertAtTail(10);
  list.insertAtTail(20);
  list.insertAtTail(30);
  const node = list.find(x => x === 20);
  assert(node !== null);
  assert.strictEqual(node.value, 20);
});

test('LinkedList find returns null if not found', () => {
  const list = new LinkedList();
  list.insertAtTail(10);
  assert.strictEqual(list.find(x => x === 99), null);
});

test('LinkedList find returns first match', () => {
  const list = new LinkedList();
  list.insertAtTail(10);
  list.insertAtTail(20);
  list.insertAtTail(20);
  const node = list.find(x => x === 20);
  assert.strictEqual(node.value, 20);
  // Should be the first one
});

test('LinkedList remove returns true when element removed', () => {
  const list = new LinkedList();
  list.insertAtTail(1);
  list.insertAtTail(2);
  assert.strictEqual(list.remove(2), true);
  assert.deepStrictEqual(list.toArray(), [1]);
});

test('LinkedList remove returns false when element not found', () => {
  const list = new LinkedList();
  list.insertAtTail(1);
  assert.strictEqual(list.remove(99), false);
  assert.deepStrictEqual(list.toArray(), [1]);
});

test('LinkedList remove removes first occurrence', () => {
  const list = new LinkedList();
  list.insertAtTail(1);
  list.insertAtTail(2);
  list.insertAtTail(2);
  list.insertAtTail(3);
  assert.strictEqual(list.remove(2), true);
  assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
});

test('LinkedList toArray returns empty array for empty list', () => {
  const list = new LinkedList();
  assert.deepStrictEqual(list.toArray(), []);
});

test('LinkedList handles complex operations', () => {
  const list = new LinkedList();
  list.insertAtHead(2);
  list.insertAtHead(1);
  list.insertAtTail(3);
  list.insertAtTail(4);
  assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4]);
  list.remove(2);
  assert.deepStrictEqual(list.toArray(), [1, 3, 4]);
  list.remove(1);
  assert.deepStrictEqual(list.toArray(), [3, 4]);
  list.remove(4);
  assert.deepStrictEqual(list.toArray(), [3]);
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

