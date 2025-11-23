const reverseString = (str) => {
  let reverseStr = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reverseStr += str[i];
  }
  return reverseStr;
};

const isPalindrome = (str) => {
  let i = 0;
  let j = str.length - 1;

  while (str[i]) {
    while (str[i] == " ") i++;
    while (str[j] == " ") j--;
    if (str[i].toUpperCase() != str[j].toUpperCase()) return false;
    i++;
    j--;
  }
  return true;
};

const uniqueChars = (str) => {
  const seen = {};

  for (let i = 0; str[i]; i++) {
    if (seen[str[i]]) return false;
    seen[str[i]] = true;
  }
  return true;
};

// const main = () => {
// console.log(reverseString("SALUT TLMD"));
// console.log(isPalindrome("kayak"));
// console.log(isPalindrome("salut"));
// console.log(isPalindrome("l ev de L"));
// console.log(isPalindrome("/..!!../"));
// console.log(uniqueChars("salut"));
// console.log(uniqueChars("saluat"));
// };

// main();

export { reverseString, isPalindrome, uniqueChars };
