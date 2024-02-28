class Group {
  constructor() {
    this.group = [];
  }

  static from(array) {
    for (let e of array) {
      this.add(e));
    }
  }

  add(value) {
    if (this.has(value)) {
      this.group.push(value);
    }
  }

  delete(value) {
    let indexToDelete = this.group.indexOf(value);
    if (indexToDelete !== -1) {
      this.group.splice(indexToDelete, 1);
    }
  }

  has(value) {
    return this.group.indexOf(value) !== -1;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10) && group.has(20));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
