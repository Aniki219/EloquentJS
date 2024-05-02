//car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

//pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

//ferret, ferry, and ferrari
verify(/ferr(et|y|ari)$/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A", "ferrety"]);

//Any word ending in ious
verify(/ious(\s|$)/,
       ["how delicious", "spacious room", "testious\no"],
       ["ruinous", "consciousness", "testiouso"]);

//A whitespace character followed by a period, comma, colon, or semicolon
verify(/\s[\.,:;]/,
       ["bad punctuation .", "pun :", " ;asd", "\n."],
       ["escape the period", "sentence.", "also:"]);

//A word longer than six letters
verify(/\w{7}/,
       ["Siebentausenddreihundertzweiundzwanzig", "7letter"],
       ["no", "three small words", "6lettr"]);

//A word without the letter e (or E)
verify(/(^|\s)[^eE]*(\s|$)/,
       ["red platypus", "wobbling nest", "let me\ntry"],
       ["earth bed", "bedrøvet abe", "BEET", "let mE"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}