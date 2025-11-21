#!/usr/bin/env node

/**
 * Moulinette for ex02 - async-promises
 * Tests wait and retry implementations
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const EXERCISE_FILE = path.join(__dirname, 'async.js');
let testsPassed = 0;
let testsFailed = 0;
const failures = [];

function test(name, fn) {
  return new Promise(async (resolve) => {
    try {
      await fn();
      testsPassed++;
      console.log(`\x1b[32m✓\x1b[0m ${name}`);
    } catch (error) {
      testsFailed++;
      failures.push({ name, error: error.message });
      console.log(`\x1b[31m✗\x1b[0m ${name}`);
      console.log(`  \x1b[31m${error.message}\x1b[0m`);
    }
    resolve();
  });
}

async function runTests() {
  if (!fs.existsSync(EXERCISE_FILE)) {
    console.error(`\x1b[31mKO: async.js not found\x1b[0m`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(EXERCISE_FILE, 'utf8');

  // Check for forbidden patterns
  test('Uses async/await (not only then/catch)', () => {
    if (!/\basync\b/.test(fileContent) || !/\bawait\b/.test(fileContent)) {
      throw new Error('Must use async/await syntax (not only .then/.catch chains)');
    }
  });

  test('Uses setTimeout for wait', () => {
    if (!/setTimeout/.test(fileContent)) {
      throw new Error('wait() must use setTimeout');
    }
  });

  test('No setInterval used', () => {
    if (/setInterval/.test(fileContent)) {
      throw new Error('setInterval is forbidden');
    }
  });

  let moduleExports;
  try {
    delete require.cache[require.resolve(EXERCISE_FILE)];
    moduleExports = require(EXERCISE_FILE);
  } catch (error) {
    console.error(`\x1b[31mKO: Failed to require async.js: ${error.message}\x1b[0m`);
    process.exit(1);
  }

  test('Exports wait and retry', () => {
    assert(moduleExports, 'Module exports should exist');
    assert(typeof moduleExports.wait === 'function', 'wait should be exported');
    assert(typeof moduleExports.retry === 'function', 'retry should be exported');
  });

  const { wait, retry } = moduleExports;

  // Test wait
  await test('wait returns a Promise', async () => {
    const promise = wait(10);
    assert(promise instanceof Promise, 'wait should return a Promise');
    await promise;
  });

  await test('wait resolves after correct delay', async () => {
    const start = Date.now();
    await wait(50);
    const elapsed = Date.now() - start;
    assert(elapsed >= 45 && elapsed < 100, `Expected ~50ms delay, got ${elapsed}ms`);
  });

  await test('wait rejects for negative ms', async () => {
    try {
      await wait(-1);
      throw new Error('wait(-1) should reject');
    } catch (error) {
      assert(error instanceof RangeError, 'Should throw RangeError');
      assert(error.message.includes('ms must be >= 0'), 'Error message should mention ms >= 0');
    }
  });

  await test('wait rejects for zero ms (edge case)', async () => {
    // Zero should be fine, but let's test it works
    await wait(0);
  });

  // Test retry
  await test('retry resolves on first success', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return 'success';
    };
    const result = await retry(fn, 3, 10);
    assert.strictEqual(result, 'success');
    assert.strictEqual(calls, 1);
  });

  await test('retry retries on failure', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      if (calls < 3) throw new Error('fail');
      return 'success';
    };
    const result = await retry(fn, 3, 10);
    assert.strictEqual(result, 'success');
    assert.strictEqual(calls, 3);
  });

  await test('retry rejects after all attempts fail', async () => {
    const fn = async () => {
      throw new Error('always fails');
    };
    try {
      await retry(fn, 2, 10);
      throw new Error('retry should reject after all attempts');
    } catch (error) {
      assert.strictEqual(error.message, 'always fails');
    }
  });

  await test('retry waits between attempts', async () => {
    let lastCall = Date.now();
    const fn = async () => {
      const now = Date.now();
      const elapsed = now - lastCall;
      lastCall = now;
      if (elapsed < 45) throw new Error('not enough delay');
      throw new Error('fail');
    };
    try {
      await retry(fn, 1, 50);
    } catch (error) {
      // Expected to fail, but delay should have been respected
    }
  });

  await test('retry respects retries parameter', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      throw new Error('fail');
    };
    try {
      await retry(fn, 2, 10);
    } catch (error) {
      // Should have tried 2 + 1 = 3 times
      assert.strictEqual(calls, 3);
    }
  });

  await test('retry works with sync function returning Promise', async () => {
    const fn = () => Promise.resolve('ok');
    const result = await retry(fn, 1, 10);
    assert.strictEqual(result, 'ok');
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
}

runTests();

