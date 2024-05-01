function range(from, to, step = 1) {
  if (step === 0 || isNaN(step)) {
    throw new Error("Step size must be a non-zero numeric value.");
  }
  if (step < 0 && to - from > 0) {
    throw new Error("Step size must be positive for provided range.");
  }
  if (step > 0 && to - from < 0) {
    throw new Error("Step size must be negative for provided range.");
  }
  let arr = [];
  stepSign = Math.sign(step);
  for (let i = from; i * stepSign <= to * stepSign; i+=step) {
    arr[i] = i;
  }
  return arr;
}

function sum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(range(1, 6, 2));
// → [1, 3, 5]
console.log(sum(range(1, 10)));
// → 55
