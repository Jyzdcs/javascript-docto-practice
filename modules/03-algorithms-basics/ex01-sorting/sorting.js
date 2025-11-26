export const bubbleSort = (array) => {
  let i = 0;
  let j;

  while (i < array.length) {
    // Point clé du bubble sort : Boucle qui ramene le plus grand element a la fin
    j = 0;
    while (j < array.length - i - 1) {
      // Si le nombre de gauche est superieur au nombre de droite, echanger les 2
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      // passer au nombre suivamt
      j++;
    }
    // passer a la comparaison suivante
    i++;
  }
  return array;
};

export const mergeSort = (array) => {
  let leftPart = [];
  let rightPart = [];

  // array = [1]
  if (array.length <= 1) return array;
  // array = [1, 2, 3, 4]
  const mid = Math.floor(array.length / 2);
  // separer le probleme en 2
  // leftPart = [1, 2]
  leftPart = mergeSort(array.slice(0, mid));
  // rightPart = [3, 4]
  rightPart = mergeSort(array.slice(mid));
  // fusionner leftPart et rightPart en triant
  let sortedArray = [];
  while (leftPart.length > 0 && rightPart.length > 0) {
    if (leftPart[0] < rightPart[0]) {
      sortedArray.push(leftPart.shift());
    } else {
      sortedArray.push(rightPart.shift());
    }
  }
  return sortedArray.concat(leftPart, rightPart);
};

const main = () => {
  let bubble = [2, 6, 3, 17, 9, 3, 65, 3, 237, 8, 4, 0, 5, 25];
  console.log(bubble);
  console.log(`bubble: ${bubbleSort(bubble)}`);
  let merge = [2, 6, 3, 17, 9, 3, 65, 3, 237, 8, 4, 0, 5, 25];
  console.log(merge);
  console.log(`merge ${mergeSort(merge)}`);
};

main();
