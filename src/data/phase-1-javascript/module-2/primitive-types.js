const primitiveTypes = {
  id: 'primitive-types',
  title: 'Primitive Data Types',
  phase: 1,
  module: 2,
  difficulty: 2,
  tags: ['data types', 'string', 'number', 'boolean', 'null', 'undefined', 'symbol', 'bigint'],
  date: '2026-06-03',
  estimatedReadTime: '7 min',
  prerequisites: ['variables'],

  overview:
    "JavaScript has 7 primitive data types — the basic building blocks that everything else is built on. Know these, and you'll understand why your code behaves the way it does.",

  explanation: `Data types are basically the different *kinds* of values JavaScript can work with. Think of them like different types of containers: you wouldn't store water in a paper bag, right? Similarly, JavaScript treats numbers differently from text, and true/false differently from both.

There are 7 primitive (basic) types:

### 1. String — Text
Anything wrapped in quotes. Single quotes, double quotes, or backticks all work:
\`"hello"\`, \`'hello'\`, \`\\\`hello\\\`\`

Backticks are special because they let you embed variables inside:
\`\\\`My name is \${name}\\\`\` — this is called a **template literal** and it's incredibly useful.

### 2. Number — All numbers
Unlike many other languages, JavaScript has just ONE number type. Whether it's 5, 3.14, or -100 — they're all just "Number".

Watch out: there's a limit! Numbers aren't infinitely precise. That's why \`0.1 + 0.2\` gives you \`0.30000000000000004\` instead of \`0.3\`. This caught me off guard the first time.

### 3. Boolean — true or false
Just two possible values: \`true\` or \`false\`. Used everywhere in conditions and logic. Is the user logged in? \`true\`. Is the cart empty? \`false\`.

### 4. undefined — "I exist but have no value"
When you declare a variable but don't give it a value, it's \`undefined\`. JavaScript's way of saying "this exists but nobody put anything in it yet."

### 5. null — "I intentionally have no value"
This is YOU explicitly saying "this variable has no value." The difference from undefined is intent — null is a deliberate choice.

### 6. Symbol — Unique identifier
Created with \`Symbol()\`. Every Symbol is unique, even if you give them the same description. Used for creating truly unique property keys. You probably won't use this much as a beginner, and that's totally fine.

### 7. BigInt — Really big numbers
For numbers bigger than what regular Number can handle (bigger than 2^53 - 1). You create them by adding \`n\` to the end: \`9007199254740991n\`. Also rare in everyday code.

### How to check a type?
Use \`typeof\`:
\`typeof "hello"\` → \`"string"\`
\`typeof 42\` → \`"number"\`
\`typeof true\` → \`"boolean"\``,

  codeExamples: [
    {
      title: 'All 7 primitive types',
      code: `// String
let name = "Kishan";
console.log(typeof name);  // "string"

// Number (integers AND decimals — same type)
let age = 22;
let price = 9.99;
console.log(typeof age);    // "number"
console.log(typeof price);  // "number"

// Boolean
let isStudent = true;
console.log(typeof isStudent);  // "boolean"

// undefined
let futureValue;
console.log(typeof futureValue);  // "undefined"

// null (⚠️ typeof null has a famous bug!)
let emptyBox = null;
console.log(typeof emptyBox);  // "object" ← THIS IS A BUG! It's null, not object.

// Symbol
let id = Symbol("userId");
console.log(typeof id);  // "symbol"

// BigInt
let hugeNumber = 9007199254740991n;
console.log(typeof hugeNumber);  // "bigint"`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Let's explore data types!\n\nlet myName = "Your Name";     // string\nlet myAge = 22;               // number\nlet isLearning = true;        // boolean\nlet favoriteColor;            // undefined (no value assigned)\nlet previousJob = null;       // null (intentionally empty)\n\n// Check each type:\nconsole.log(myName, "→", typeof myName);\nconsole.log(myAge, "→", typeof myAge);\nconsole.log(isLearning, "→", typeof isLearning);\nconsole.log(favoriteColor, "→", typeof favoriteColor);\nconsole.log(previousJob, "→", typeof previousJob);\n\n// Try the famous floating point problem:\nconsole.log("0.1 + 0.2 =", 0.1 + 0.2);  // not 0.3! 🤯`,
    challenge: 'Create one variable of each type and use typeof to verify. Can you trigger the typeof null bug?',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "The difference between null and undefined drove me crazy. They both mean 'nothing', so why do we need both? And then typeof null returns 'object'?! That made zero sense.",
    ahamoment:
      "I started thinking of undefined as 'JavaScript says this is empty' and null as 'I say this is empty.' It's about who made the decision — the language or you, the programmer.",
    howIUnderstood:
      "Imagine a new apartment. An unfurnished room is 'undefined' — nobody put anything there. An empty room with a sign saying 'intentionally left empty' is 'null' — someone decided it should be empty. And typeof null returning 'object'? That's a bug from 1995 that was never fixed because too much code depends on it now. Just memorize it and move on.",
  },

  keyTakeaways: [
    'JavaScript has 7 primitive types: String, Number, Boolean, undefined, null, Symbol, BigInt',
    'Use typeof to check what type a value is',
    'undefined = no value assigned yet; null = intentionally set to nothing',
    'typeof null returns "object" — this is a known bug from 1995',
    '0.1 + 0.2 !== 0.3 in JavaScript (floating-point precision issue)',
    'You\'ll mostly use String, Number, Boolean, undefined, and null in everyday code',
  ],

  connectedTopics: ['variables', 'operators', 'type-coercion'],

  resources: [
    {
      title: 'JavaScript Types Decoded',
      type: 'pdf',
      url: '/assets/JavaScript_Types_Decoded.pdf',
      description: 'NotebookLM masterclass on the weird quirks of JS types.'
    }
  ]
};

export default primitiveTypes;
