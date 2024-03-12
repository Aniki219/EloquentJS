function loop(value, test, update, body) {
  while (test(value)) {
    body(value);
    value = update(value);
  }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
loop(0, n => n > 0, n => n - 1, console.log);
// no output
loop(0, n => n <= 3, n => n + 1, (n) => {n *= n; console.log(n)});
// → 0
// → 1
// → 4
// → 9
