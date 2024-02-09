function countBs(string) {
  let numBs = 0;
  for (i = 0; i < string.length; i++) {
    if (string[i] === "B") numBs++;
  }
  return numBs;
}

function countChar(string, character) {
  let numChars = 0;
  for (i = 0; i < string.length; i++) {
    if (string[i] === character) {
      numChars++;
    }
  }
  return numChars;
}

console.log(countChar("test", "t"));
// 2
console.log(countChar("test", "y"));
// 0
console.log(countBs("Best"));
// 1
console.log(countBs("test"));
// 0
