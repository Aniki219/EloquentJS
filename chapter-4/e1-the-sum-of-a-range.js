function range(from, to, step = 1) {
  let arr = [];
  let totalSteps = Math.abs((from - to) / step) + 1;
  for (let i = 0; i < totalSteps; i++) {
    arr[i] = from + i * step;
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
