function dominantDirection(text) {
  let scriptCounts = countBy(text, scriptDirectionFromChar);
  let scriptCountsArray = Array.from(scriptCounts, ([name, count]) => ({name, count}));
  let dominantCount = scriptCountsArray.reduce((c1, c2) => c1.count > c2.count ? c1 : c2);
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

/**
  Takes in a character code and returns the script object that corresponds to
  the given character
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

/**
  Takes an array of items and a function that generates a group name for a given item and returns
  a Map object whose keys are unique group names and whose values represent the number of occurences
  of those group names.
*/
function countBy(items, groupName) {
  let counts = new Map();
  for (let item of items) {
    let name = groupName(item);
    if (name === null) {
      continue;
    }
    let known = counts.has(name);
    if (!known) {
      counts.set(name, 1);
    } else {
      counts.set(name, counts.get(name) + 1);
    }
  }
  return counts;
}
