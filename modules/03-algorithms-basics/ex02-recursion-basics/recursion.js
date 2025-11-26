export const factorial = (n) => {
  if (n < 0) throw new RangeError("n must be >= 0");
  if (n === 1) return n;
  return factorial(n - 1) * n;
};

// let n = factorial(5);

// console.log(n);
