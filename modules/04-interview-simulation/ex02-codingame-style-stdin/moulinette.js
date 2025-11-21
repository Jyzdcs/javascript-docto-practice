#!/usr/bin/env node

/**
 * Moulinette for ex02 - codingame-style-stdin
 * Tests main function with various inputs
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const EXERCISE_FILE = path.join(__dirname, 'codingame_stdin.js');
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

async function runProgram(input) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [EXERCISE_FILE], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code !== 0 && stderr) {
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      } else {
        resolve(stdout.trim());
      }
    });
    
    proc.stdin.write(input);
    proc.stdin.end();
  });
}

async function runTests() {
  if (!fs.existsSync(EXERCISE_FILE)) {
    console.error(`\x1b[31mKO: codingame_stdin.js not found\x1b[0m`);
    process.exit(1);
  }

  // Check that main is exported for unit testing
  let moduleExports;
  try {
    delete require.cache[require.resolve(EXERCISE_FILE)];
    moduleExports = require(EXERCISE_FILE);
  } catch (error) {
    console.error(`\x1b[31mKO: Failed to require codingame_stdin.js: ${error.message}\x1b[0m`);
    process.exit(1);
  }

  await test('Exports main function', () => {
    assert(moduleExports, 'Module exports should exist');
    assert(typeof moduleExports.main === 'function', 'main should be exported');
  });

  const { main } = moduleExports;

  // Test main function directly (unit test style)
  await test('main handles example input correctly', () => {
    const input = ['3', 'hello', 'world', 'hi'];
    const output = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(args.join(' '));
    };
    
    main(input);
    console.log = originalLog;
    
    assert.deepStrictEqual(output, ['hello 5/5', 'world 5/5', 'hi 2/5']);
  });

  await test('main handles single word', () => {
    const input = ['1', 'test'];
    const output = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(args.join(' '));
    };
    
    main(input);
    console.log = originalLog;
    
    assert.deepStrictEqual(output, ['test 4/4']);
  });

  await test('main handles words of different lengths', () => {
    const input = ['4', 'a', 'bb', 'ccc', 'dddd'];
    const output = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(args.join(' '));
    };
    
    main(input);
    console.log = originalLog;
    
    assert.deepStrictEqual(output, ['a 1/4', 'bb 2/4', 'ccc 3/4', 'dddd 4/4']);
  });

  await test('main preserves order', () => {
    const input = ['3', 'first', 'second', 'third'];
    const output = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(args.join(' '));
    };
    
    main(input);
    console.log = originalLog;
    
    assert(output[0].startsWith('first'));
    assert(output[1].startsWith('second'));
    assert(output[2].startsWith('third'));
  });

  // Test via stdin (integration test)
  await test('Program reads from stdin correctly', async () => {
    const input = '3\nhello\nworld\nhi\n';
    const output = await runProgram(input);
    const lines = output.split('\n');
    assert(lines.includes('hello 5/5'));
    assert(lines.includes('world 5/5'));
    assert(lines.includes('hi 2/5'));
  });

  await test('Program handles single word via stdin', async () => {
    const input = '1\ntest\n';
    const output = await runProgram(input);
    assert(output.includes('test 4/4'));
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

