const typeCoercion = {
  id: 'type-coercion',
  title: 'Type Coercion',
  phase: 1,
  module: 2,
  difficulty: 3,
  tags: ['type coercion', 'implicit conversion', 'truthy', 'falsy', 'conversion'],
  date: '2026-06-04',
  estimatedReadTime: '8 min',
  prerequisites: ['operators', 'primitive-types'],

  overview:
    "Type coercion is JavaScript automatically converting one data type to another when it thinks you need it. Sometimes helpful, often confusing, always important to understand.",

  explanation: `Okay, buckle up. Type coercion is probably the most "WTF" part of JavaScript for beginners. It's the reason you see memes about JavaScript being weird. But once you understand it, those memes become funny instead of scary.

### What is Type Coercion?

It's when JavaScript automatically converts a value from one type to another. You didn't ask for it, but JavaScript does it anyway — trying to be "helpful."

There are two kinds:

### 1. Implicit Coercion (JavaScript does it for you)

This happens when you use operators between different types:

\`"5" + 3\` → JavaScript sees a string and a number. It decides to convert the number to a string. Result: \`"53"\`

But wait:
\`"5" - 3\` → JavaScript can't "subtract" strings, so it converts the string to a number. Result: \`2\`

Yes, \`+\` and \`-\` behave differently with strings. This is peak JavaScript weirdness.

### 2. Explicit Coercion (YOU do it on purpose)

You can convert types yourself:
- \`Number("5")\` → \`5\`
- \`String(42)\` → \`"42"\`
- \`Boolean(0)\` → \`false\`

### Truthy and Falsy Values

This is HUGE. In JavaScript, every value can be treated as either \`true\` or \`false\` in a boolean context (like an if-statement).

**Falsy values** (these are ALL of them — memorize this list):
- \`false\`
- \`0\` (and \`-0\`)
- \`""\` (empty string)
- \`null\`
- \`undefined\`
- \`NaN\`

**Everything else is truthy.** Including:
- \`"0"\` (string with zero — it's NOT empty)
- \`[]\` (empty array)
- \`{}\` (empty object)
- \`"false"\` (string that says "false" — it's still a non-empty string!)

The truthy/falsy thing comes up ALL the time in real code, so this list is worth memorizing.`,

  codeExamples: [
    {
      title: 'The weirdness of implicit coercion',
      code: `// The + operator with strings → concatenation
console.log("5" + 3);     // "53" (number → string)
console.log("5" + true);  // "5true" (boolean → string)

// Other operators → number conversion
console.log("5" - 3);     // 2 (string → number)
console.log("5" * 2);     // 10 (string → number)
console.log("5" / 1);     // 5 (string → number)

// The truly weird ones:
console.log(true + true);    // 2 (true → 1)
console.log(true + false);   // 1 (true=1, false=0)
console.log("" - 1);        // -1 (empty string → 0)
console.log(null + 1);      // 1 (null → 0)
console.log(undefined + 1); // NaN (undefined can't become a number)`,
      language: 'javascript',
    },
    {
      title: 'Truthy and falsy in action',
      code: `// ALL the falsy values:
if (!false) console.log("false is falsy");
if (!0) console.log("0 is falsy");
if (!"") console.log("empty string is falsy");
if (!null) console.log("null is falsy");
if (!undefined) console.log("undefined is falsy");
if (!NaN) console.log("NaN is falsy");

// Surprise truthy values:
if ("0") console.log("'0' is truthy! (it's a non-empty string)");
if ([]) console.log("[] is truthy! (even though it's empty)");
if ({}) console.log("{} is truthy! (even though it's empty)");

// This is why you can do stuff like:
let userName = "";
if (userName) {
  console.log("Hello, " + userName);
} else {
  console.log("No name provided");  // This runs! Empty string is falsy.
}`,
      language: 'javascript',
    },
    {
      title: 'Explicit conversion (the safe way)',
      code: `// String to Number
let str = "42";
let num = Number(str);     // 42
let parsed = parseInt(str); // 42 (also works)

// Number to String
let price = 99;
let priceStr = String(price);  // "99"
let also = price.toString();   // "99"

// Anything to Boolean
console.log(Boolean(0));       // false
console.log(Boolean("hello")); // true
console.log(Boolean(null));    // false
console.log(Boolean(42));      // true

// Quick trick: double NOT (!!) converts to boolean
console.log(!!"hello");  // true
console.log(!!0);         // false
console.log(!!null);      // false`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Type coercion playground — test the weird stuff!\n\n// Predict the output BEFORE running:\nconsole.log("10" + 5);      // ?\nconsole.log("10" - 5);      // ?\nconsole.log("" + 123);      // ?\nconsole.log(true + 1);      // ?\nconsole.log(false + "1");   // ?\n\n// Truthy/falsy checks:\nconsole.log("Is '0' truthy?", Boolean("0"));\nconsole.log("Is 0 truthy?", Boolean(0));\nconsole.log("Is [] truthy?", Boolean([]));\nconsole.log("Is '' truthy?", Boolean(""));\n\n// The famous ones:\nconsole.log([] + []);    // what??\nconsole.log([] + {});    // what??\nconsole.log({} + []);    // what??`,
    challenge: 'Without running the code first, predict what each console.log outputs. Write your predictions as comments, then run to check. How many did you get right?',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "The fact that + behaves completely differently from -, *, and / when strings are involved. Like, '5' - 3 gives 2 (converts string to number) but '5' + 3 gives '53' (converts number to string). WHY? Why isn't it consistent?",
    ahamoment:
      "It's because + has a dual role — it's both addition AND string concatenation. When JavaScript sees a string with +, it assumes you want concatenation. For -, *, /, there's no string equivalent, so it HAS to convert to numbers. Once I realized + is the odd one out (because it has two jobs), the rest made sense.",
    howIUnderstood:
      "My rule now: if there's any chance of type mixing, I explicitly convert first. Number('5') + 3 instead of '5' + 3. Be explicit. Don't let JavaScript guess what you want. Also, I memorized the 6 falsy values — everything else is truthy. That covers 90% of coercion situations you'll actually hit in real code.",
  },

  keyTakeaways: [
    'Type coercion = JavaScript automatically converting types; implicit is automatic, explicit is intentional',
    '+ with strings does concatenation; -, *, / always convert to numbers',
    'Memorize the 6 falsy values: false, 0, "", null, undefined, NaN — everything else is truthy',
    '"0", [], and {} are all truthy — this catches people off guard',
    'When in doubt, convert explicitly: Number(), String(), Boolean()',
    'Double NOT (!!) is a quick way to convert any value to its boolean equivalent',
  ],

  connectedTopics: ['operators', 'primitive-types', 'variables'],
};

export default typeCoercion;
