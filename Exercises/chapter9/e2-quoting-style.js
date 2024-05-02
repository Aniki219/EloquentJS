let text = "'I'm the cook,' he said, 'it's my job.' 'It's not james'' ''tis not'";

console.log(text.replace(/^'|(\W)'|'(\W)|'$/g, "$1\"$2"));
// → "I'm the cook," he said, "it's my job." "It's not james'" "'tis not"