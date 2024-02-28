class Group {
  constructor() {
    this.values = [];
  }

  static from(array) {
    let group = new Group();
    array.forEach(e => group.add(e));
    return group;
  }

  add(value) {
    if (!this.has(value)) {
      this.values.push(value);
    }
  }

  delete(value) {
    let indexToDelete = this.values.indexOf(value);
    if (indexToDelete !== -1) {
      this.values.splice(indexToDelete, 1);
    }
  }

  has(value) {
    return this.values.indexOf(value) !== -1;
  }
}

class IterableGroup extends Group {
  static from(array) {
    let group = new IterableGroup();
    array.forEach(e => group.add(e));
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index >= this.group.values.length) {
      return {done: true};
    }

    let value = this.group.values[this.index];
    this.index++;

    return {value, done: false}
  }
}

for (let value of IterableGroup.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

let igroup = IterableGroup.from(["rooster", "bear", "hawk"]);
igroup.delete("rooster");
igroup.add("rooster");
for (let value of igroup) {
  console.log(value);
}
// → bear
// → hawk
// → rooster
