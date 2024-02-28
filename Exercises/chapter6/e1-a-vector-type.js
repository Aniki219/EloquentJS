class Vec {
  constructor Vec(x, y) {
    this.x = x;
    this.y = y;
  }

  function plus(other) {
    let x = this.x + other.x;
    let y = this.y + other.y;
    return new Vec(x, y);
  }

  function minus(other) {
    let x = this.x - other.x;
    let y = this.y - other.y;
    return new Vec(x, y);
  }

  get length() {
    return Math.sqrt(x * x + y * y);
  }
}
