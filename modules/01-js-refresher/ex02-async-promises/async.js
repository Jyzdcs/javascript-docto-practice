const wait = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms < 0) reject(new RangeError("ms must be >= 0"));
    setTimeout(resolve, ms);
  });
};

const retry = async (fn, retries, delayMs) => {
  let attempt = 0;
  for (attempt; attempt <= retries; attempt++) {
    try {
      let result = await fn(attempt);
      return result;
    } catch (err) {
      await wait(delayMs);
      if (attempt == retries) {
        throw err;
      }
    }
  }
};

// const loop = (attempt) => {
//   return new Promise((resolve, reject) => {
//     // resolve("Password succefully reseted !");
//     reject("You attemp 3 times and failds 3 times, come back in 2min...");
//   });
// };

// async function main() {
//   const res = await retry(loop, 3, 500);
//   console.log(res);
// }
// main();

export { wait, retry };
