class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw Error(`Inputs ${a} and ${b} must both be number values!`);
  }
  try {
    return primitiveMultiply(a, b);
  } catch(e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw e;
    }
  }
}

for (let i = 0; i < 10; i++) {
  console.log(reliableMultiply(2, i));
  // → 0 2 4 6 8 10 12 14 16 18
}
console.log(reliableMultiply(2, "i"));
// → Error: Inputs 2 and i must both be number values!
