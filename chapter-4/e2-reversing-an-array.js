function reverseArray(arr) {
  let output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i])
  }
  return output;
}

function reverseArrayInPlace(arr) {
  let endIndex = arr.length - 1;
  let midIndex = arr.length / 2;

  for (let i = 0; i < midIndex; i++) {
    let swapValue = arr[i];
    arr[i] = arr[endIndex - i];
    arr[endIndex - i] = swapValue;
  }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5, 6];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [6, 5, 4, 3, 2, 1]
