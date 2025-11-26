export const binarySearchIterative = (array, target) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) return mid;
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

export const binarySearchRecursive = (array, target) => {
  const b = (left, right) => {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) return mid;
    if (array[mid] < target) {
      return b(mid + 1, right);
    } else {
      return b(left, mid - 1);
    }
  };

  return b(0, array.length - 1);
};

// const main = () => {
//   console.log(
//     binarySearchIterative(
//       [
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//         21, 22, 23, 24, 25, 26,
//       ],
//       21
//     )
//   );
//   console.log(
//     binarySearchRecursive(
//       [
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//         21, 22, 23, 24, 25, 26,
//       ],
//       21
//     )
//   );
// };

// main();
