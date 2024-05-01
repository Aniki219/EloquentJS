class Group {
  constructor() {
    this.values = [];
  }

  static from(array) {
    let group = new Group();
    for (let e of array) {
      group.add(e);
    }
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

let group = Group.from([10, 20]);
console.log(group.has(10) && group.has(20));
// → true
console.log(group.has(30));
// → false

group.add(5);
console.log(group.has(5));
// → true

group.add(5);
group.delete(5);
console.log(group.has(5));
// → false
