function dominantDirection(text) {
  let scriptCounts = countBy(text, scriptDirectionFromChar);
  let dominantCount = scriptCounts.reduce((c1, c2) => c1.count > c2.count ? c1 : c2);
  return dominantCount.name;
}

function scriptDirectionFromChar(c) {
  let script = characterScript(c.codePointAt(0));
  return script ? script.direction : null;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

/* takes in a character code and returns the script object
  that corresponds to the given character
*/
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

/* takes an array of items and a function that
  generates a group name for a given item and returns
  an array of count objects listing the unique
  group name and the number of times this group
  occurs in the array.
*/
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
