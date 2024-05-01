function every(array, test) {
  for (let a of array) {
    if (!test(a)) {
      return false;
    }
  }
  return true;
}

function everyUsingSome(array, test) {
  return !array.some(t => !test(t));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

console.log(everyUsingSome([1, 3, 5], n => n < 10));
// → true
console.log(everyUsingSome([2, 4, 16], n => n < 10));
// → false
console.log(everyUsingSome([], n => n < 10));
// → true
