function isEven(n) {
  if (n < 0) {
    return isEven(-n);
  } else if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  }
  return isEven(n - 2);
}

console.log(isEven(50));
// true
console.log(isEven(75));
// false
console.log(isEven(-1));
// false
console.log(isEven(-10));
// true
console.log(isEven(0));
// true
