function isEven(n) {
  if (n < 0) return isEven(-n);
  if (n == 0) return "Even";
  if (n == 1) return "Odd";
  return isEven(n - 2);
}
