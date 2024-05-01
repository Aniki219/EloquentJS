function flattenArray(arr) {
  return arr.reduce((a, b) => a.concat(b));
}

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]
console.log(flattenArray([[],[]]));
// → []
console.log(flattenArray([]));
// → []
console.log(flattenArray([[[1,2,3],[4]], [[1], [2, 3]]]));
// → [[1,2,3], [4], [1], [2, 3]]
