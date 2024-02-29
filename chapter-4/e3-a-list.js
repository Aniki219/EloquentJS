function arrayToList(arr) {
  function addValueToList(index) {
    if (index === arr.length - 1) {
      return {value: arr[index], rest: null};
    }
    return {value: arr[index], rest: addValueToList(index+1)}
  }

  return addValueToList(0);
}

function listToArray(list) {
  arr = [];
  while (list !== null) {
    arr.push(list.value);
    list = list.rest;
  }
  return arr;
}

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, index) {
  for (let i = index; i > 0; i--) {
    list = list.rest;
    if (list === null) {
      throw new Error("Index exceeds length of list!");
    }
  }
  return list.value;
}

function recursiveNth(list, index) {
  if (list === null) {
    throw new Error("Index exceeds length of list!");
  }
  if (index === 0) {
    return list.value;
  }
  return recursiveNth(list.rest, index-1);
}

console.log(arrayToList([10, 20, 30]));
// → {value:	10, rest:	{value:	20, rest:	{value: 30, rest: null}}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
// console.log(nth(arrayToList([10, 20, 30]), 5));
// → Error: Index exceeds length of list
console.log(recursiveNth(arrayToList([10, 20, 30]), 1));
// → 20
// console.log(recursiveNth(arrayToList([10, 20, 30]), 10));
// → Error: Index exceeds length of list
