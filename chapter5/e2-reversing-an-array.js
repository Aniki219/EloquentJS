function reverseArray(arr) {
  let output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i])
  }
  return output;
}

function reverseArrayInPlace(arr) {
  let endIndex = arr.length - 1;
  let midIndex = Math.ceil(arr.length/2);

  for (let i = 0; i < midIndex; i++) {
    let temp = arr[i];
    arr[i] = arr[midIndex - i];
    arr[midIndex - i] = temp;
  }
}
