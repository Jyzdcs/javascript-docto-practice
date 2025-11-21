# JavaScript Algorithm Interview Prep - Doctolib

Structured practice modules for coding interview preparation, inspired by 42's piscine format.

## Structure

Each module contains:
- `context.md` - Explains the module's purpose and learning objectives
- `exXX-*/` - Exercise folders with:
  - `subject.md` - Strict exercise requirements (like 42 piscine subjects)
  - `moulinette.js` - Automated test suite (like 42's moulinette)

## Modules

1. **01-js-refresher** - JavaScript fundamentals (scope, closures, HOF, async)
2. **02-data-structures** - Core data structures (arrays, stack, queue, linked list, hash map/set)
3. **03-algorithms-basics** - Essential algorithms (binary search, sorting, recursion)
4. **04-interview-simulation** - Real interview-style problems with reasoning requirements

## How to Use

### Running the Moulinette

For each exercise, navigate to its folder and run:

```bash
node moulinette.js
# or
./moulinette.js
```

The moulinette will:
- Check if your solution file exists
- Verify exports are correct
- Test all required functionality
- Check for forbidden patterns (var, built-in methods, etc.)
- Display OK/KO with detailed failure messages

### Example Workflow

```bash
# Start with module 1, exercise 0
cd modules/01-js-refresher/ex00-scope-and-closures

# Read the subject
cat subject.md

# Create your solution
# ... write scope.js ...

# Test it
node moulinette.js

# If KO, fix issues and retest
# If OK, move to next exercise
```

## Rules

- **Strict rules** in each `subject.md` must be followed exactly
- Violations result in **KO** even if output looks correct
- Each exercise is self-contained - no external dependencies
- Use Node.js >= 18

## Tips

- Read `context.md` first to understand the module's goals
- Read `subject.md` carefully - every rule matters
- Run `moulinette.js` frequently while coding
- For interview-simulation exercises, don't skip `REASONING.md` - it's mandatory

Good luck! 🚀

