const map = (array, fn) => {
  let mapped_array = [];

  if (!Array.isArray(array)) {
    throw new TypeError("Expected array");
  }
  for (let i = 0; i < array.length; i++) {
    mapped_array.push(fn(array[i], i, array));
  }
  return mapped_array;
};

const filter = (array, fn) => {
  let filtered_array = [];

  if (!Array.isArray(array)) {
    throw new TypeError("Expected array");
  }
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i, array)) {
      filtered_array.push(array[i]);
    }
  }
  return filtered_array;
};

// const reduce = (array, fn, initialValue) => {
//   return 0;
// };

// console.log(
//   my_map([1, 2, 3, 4, 5, 6], (num) => {
//     return num * 2;
//   })
// );

// console.log(
//   my_filter([1, 2, 3, 4, 5, 6], (num) => {
//     return num % 2;
//   })
// );

// console.log("finished");
export { map, filter };
