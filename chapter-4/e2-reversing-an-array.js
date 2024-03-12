function reverseArray(arr) {
  let output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i])
  }
  return output;
}

function reverseArrayInPlace(arr) {
  let endIndex = arr.length - 1;
  
  if (endIndex <= 0) {
    return arr;
  }

  let midIndex = Mathf.ceil(arr.length / 2);

  for (let i = 0; i < midIndex; i++) {
    let swapValue = arr[i];
    arr[i] = arr[endIndex - i];
    arr[endIndex - i] = swapValue;
  }
}


let evenElementArray = [1, 2, 3, 4, 5, 6];
let oddElementArray = ["A", "B", "C", "D", "E"];
let emptyArray = [];

console.log(reverseArray(evenElementArray));
// → [6, 5, 4, 3, 2, 1]
console.log(reverseArray(oddElementArray));
// → ["E", "D", "C", "B", "A"]
console.log(reverseArray(emptyArray));
// → []

reverseArrayInPlace(evenElementArray);
reverseArrayInPlace(oddElementArray);
reverseArrayInPlace(emptyArray);

console.log(evenElementArray);
// → [6, 5, 4, 3, 2, 1]
console.log(oddElementArray);
// → ["E", "D", "C", "B", "A"]
console.log(emptyArray);
// → []
