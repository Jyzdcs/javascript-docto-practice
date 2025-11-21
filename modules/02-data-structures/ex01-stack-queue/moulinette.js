#!/usr/bin/env node

/**
 * Moulinette for ex01 - stack-queue
 * Tests Stack and Queue implementations
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'stack_queue.js');
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
  console.error(`\x1b[31mKO: stack_queue.js not found\x1b[0m`);
  process.exit(1);
}

let moduleExports;
try {
  delete require.cache[require.resolve(EXERCISE_FILE)];
  moduleExports = require(EXERCISE_FILE);
} catch (error) {
  console.error(`\x1b[31mKO: Failed to require stack_queue.js: ${error.message}\x1b[0m`);
  process.exit(1);
}

test('Exports Stack and Queue classes', () => {
  assert(moduleExports, 'Module exports should exist');
  assert(typeof moduleExports.Stack === 'function', 'Stack should be exported');
  assert(typeof moduleExports.Queue === 'function', 'Queue should be exported');
});

const { Stack, Queue } = moduleExports;

// Test Stack
test('Stack can be instantiated', () => {
  const s = new Stack();
  assert(s instanceof Stack);
});

test('Stack isEmpty returns true for empty stack', () => {
  const s = new Stack();
  assert.strictEqual(s.isEmpty(), true);
});

test('Stack push adds element', () => {
  const s = new Stack();
  s.push(1);
  assert.strictEqual(s.isEmpty(), false);
});

test('Stack pop returns undefined for empty stack', () => {
  const s = new Stack();
  assert.strictEqual(s.pop(), undefined);
});

test('Stack pop returns last pushed element', () => {
  const s = new Stack();
  s.push(1);
  s.push(2);
  assert.strictEqual(s.pop(), 2);
  assert.strictEqual(s.pop(), 1);
});

test('Stack peek returns undefined for empty stack', () => {
  const s = new Stack();
  assert.strictEqual(s.peek(), undefined);
});

test('Stack peek returns top without removing', () => {
  const s = new Stack();
  s.push(10);
  s.push(20);
  assert.strictEqual(s.peek(), 20);
  assert.strictEqual(s.peek(), 20); // Still there
  assert.strictEqual(s.pop(), 20);
});

test('Stack LIFO order', () => {
  const s = new Stack();
  s.push('a');
  s.push('b');
  s.push('c');
  assert.strictEqual(s.pop(), 'c');
  assert.strictEqual(s.pop(), 'b');
  assert.strictEqual(s.pop(), 'a');
  assert.strictEqual(s.isEmpty(), true);
});

// Test Queue
test('Queue can be instantiated', () => {
  const q = new Queue();
  assert(q instanceof Queue);
});

test('Queue isEmpty returns true for empty queue', () => {
  const q = new Queue();
  assert.strictEqual(q.isEmpty(), true);
});

test('Queue enqueue adds element', () => {
  const q = new Queue();
  q.enqueue(1);
  assert.strictEqual(q.isEmpty(), false);
});

test('Queue dequeue returns undefined for empty queue', () => {
  const q = new Queue();
  assert.strictEqual(q.dequeue(), undefined);
});

test('Queue dequeue returns first enqueued element', () => {
  const q = new Queue();
  q.enqueue(10);
  q.enqueue(20);
  assert.strictEqual(q.dequeue(), 10);
  assert.strictEqual(q.dequeue(), 20);
});

test('Queue peek returns undefined for empty queue', () => {
  const q = new Queue();
  assert.strictEqual(q.peek(), undefined);
});

test('Queue peek returns front without removing', () => {
  const q = new Queue();
  q.enqueue(100);
  q.enqueue(200);
  assert.strictEqual(q.peek(), 100);
  assert.strictEqual(q.peek(), 100); // Still there
  assert.strictEqual(q.dequeue(), 100);
});

test('Queue FIFO order', () => {
  const q = new Queue();
  q.enqueue('first');
  q.enqueue('second');
  q.enqueue('third');
  assert.strictEqual(q.dequeue(), 'first');
  assert.strictEqual(q.dequeue(), 'second');
  assert.strictEqual(q.dequeue(), 'third');
  assert.strictEqual(q.isEmpty(), true);
});

test('Queue handles many operations', () => {
  const q = new Queue();
  for (let i = 0; i < 1000; i++) {
    q.enqueue(i);
  }
  for (let i = 0; i < 1000; i++) {
    assert.strictEqual(q.dequeue(), i);
  }
  assert.strictEqual(q.isEmpty(), true);
});

test('Stack handles many operations', () => {
  const s = new Stack();
  for (let i = 0; i < 1000; i++) {
    s.push(i);
  }
  for (let i = 999; i >= 0; i--) {
    assert.strictEqual(s.pop(), i);
  }
  assert.strictEqual(s.isEmpty(), true);
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

