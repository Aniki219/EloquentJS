class PGroup {
    values = [];
    static empty = new PGroup([]);

    constructor(values) {
        this.values = values;
    }

    has(value) {
        return this.values.includes(value);
    }

    add(value) {
    if (this.has(value)) {
        return this;
    }
        return new PGroup(this.values.concat(value));
    }

    delete(value) {
        return new PGroup(this.values.filter(v => v !== value));
    }
}

let a = PGroup.empty.add("a");
let aa = a.add("a");
let ab = a.add("b");
let b = ab.delete("a");
let bb = b.delete();

console.log(PGroup.empty.values)
// → []
console.log(aa.values)
// → ["a"]
console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
console.log(bb.has("b"));
// → true
