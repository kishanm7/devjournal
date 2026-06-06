const operators = {
  id: 'operators',
  title: 'Operators — Arithmetic, Comparison, Logical, Assignment',
  phase: 1,
  module: 2,
  difficulty: 2,
  tags: ['operators', 'arithmetic', 'comparison', 'logical', 'assignment', 'equality'],
  date: '2026-06-04',
  estimatedReadTime: '10 min',
  prerequisites: ['variables', 'primitive-types'],

  overview:
    "Operators are the verbs of programming. Variables hold your data, but operators are what let you DO things with that data — add numbers, compare values, combine conditions.",

  explanation: `I like to think of operators as the tools in a toolbox. Variables are the materials (wood, nails, paint), but operators are the hammer, saw, and drill that let you build something with those materials.

JavaScript has four main categories of operators. Let me break each one down:

### 1. Arithmetic Operators — Math stuff

These are the straightforward ones:

| Operator | What it does | Example |
|----------|-------------|---------|
| \`+\` | Addition | \`5 + 3\` → \`8\` |
| \`-\` | Subtraction | \`10 - 4\` → \`6\` |
| \`*\` | Multiplication | \`3 * 7\` → \`21\` |
| \`/\` | Division | \`15 / 4\` → \`3.75\` |
| \`%\` | Modulo (remainder) | \`10 % 3\` → \`1\` |
| \`**\` | Exponentiation | \`2 ** 3\` → \`8\` |

The modulo operator (\`%\`) is weirdly useful. Want to check if a number is even? \`num % 2 === 0\`. Want to cycle through 0-2 repeatedly? \`counter % 3\`. It comes up ALL the time.

### 2. Comparison Operators — Is this equal/bigger/smaller?

These always return \`true\` or \`false\`:

| Operator | Meaning | Example |
|----------|---------|---------|
| \`==\` | Equal (with type coercion) | \`5 == "5"\` → \`true\` 😱 |
| \`===\` | Strictly equal (no coercion) | \`5 === "5"\` → \`false\` ✅ |
| \`!=\` | Not equal (with coercion) | \`5 != "5"\` → \`false\` |
| \`!==\` | Strictly not equal | \`5 !== "5"\` → \`true\` |
| \`>\` | Greater than | \`10 > 5\` → \`true\` |
| \`<\` | Less than | \`3 < 7\` → \`true\` |
| \`>=\` | Greater or equal | \`5 >= 5\` → \`true\` |
| \`<=\` | Less or equal | \`3 <= 2\` → \`false\` |

**The golden rule: ALWAYS use \`===\` and \`!==\`.** The \`==\` operator does type coercion, which means \`0 == ""\` is \`true\`, \`null == undefined\` is \`true\`, and all sorts of weird stuff. Just avoid it.

Here is a visual breakdown of how chaotic loose equality (\`==\`) is compared to strict equality (\`===\`):

\`\`\`mermaid
graph TD
    classDef default fill:#1e293b,stroke:#334155,color:#f8fafc,stroke-width:2px;
    classDef loose fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:2px;
    classDef strict fill:#3b82f6,stroke:#1d4ed8,color:#fff,stroke-width:2px;
    classDef truthy fill:#10b981,stroke:#047857,color:#fff,stroke-width:2px;
    classDef falsy fill:#ef4444,stroke:#b91c1c,color:#fff,stroke-width:2px;

    A[Compare: 0 == '0'] --> B{Are types the same?}
    B -- No --> C[Loose Equality ==]:::loose
    C --> D[Convert string '0' to number 0]
    D --> E[Compare 0 === 0]
    E --> F([Result: true]):::truthy
    
    A2[Compare: 0 === '0'] --> B2{Are types the same?}
    B2 -- No --> C2[Strict Equality ===]:::strict
    C2 --> D2([Result: false]):::falsy
\`\`\`

### 3. Logical Operators — Combining conditions

| Operator | Meaning | How it works |
|----------|---------|-------------|
| \`&&\` | AND | Both must be true |
| \`\\|\\|\` | OR | At least one must be true |
| \`!\` | NOT | Flips true→false, false→true |

These are used constantly in if-statements:
\`if (age >= 18 && hasID)\` — must be 18+ AND have ID
\`if (isAdmin || isModerator)\` — can be admin OR moderator

**Short-circuit evaluation** — this is a trick worth knowing:
- \`&&\` stops at the first false value
- \`||\` stops at the first true value

This lets you write clever one-liners like \`name || "Anonymous"\` — if name is empty/undefined, use "Anonymous" instead.

### 4. Assignment Operators — Storing values

The basic one is \`=\`, but there are shortcuts:

| Operator | Same as | Example |
|----------|---------|---------|
| \`=\` | — | \`x = 5\` |
| \`+=\` | \`x = x + n\` | \`x += 3\` |
| \`-=\` | \`x = x - n\` | \`x -= 2\` |
| \`*=\` | \`x = x * n\` | \`x *= 4\` |
| \`/=\` | \`x = x / n\` | \`x /= 2\` |
| \`++\` | \`x = x + 1\` | \`x++\` |
| \`--\` | \`x = x - 1\` | \`x--\` |

The \`+=\` and \`++\` ones show up everywhere in loops and counters. You'll use these daily.`,

  codeExamples: [
    {
      title: 'Arithmetic operators',
      code: `let a = 10;
let b = 3;

console.log("a + b =", a + b);   // 13
console.log("a - b =", a - b);   // 7
console.log("a * b =", a * b);   // 30
console.log("a / b =", a / b);   // 3.333...
console.log("a % b =", a % b);   // 1 (remainder)
console.log("a ** b =", a ** b); // 1000 (10 to the power of 3)

// The + operator with strings does CONCATENATION, not addition:
console.log("Hello" + " " + "World");  // "Hello World"
console.log("5" + 3);  // "53" (not 8!) — string wins`,
      language: 'javascript',
    },
    {
      title: '== vs === (the most important difference)',
      code: `// == (loose equality) — does type coercion
console.log(5 == "5");     // true  😱 (string "5" converted to number 5)
console.log(0 == false);   // true  😱 (false converted to 0)
console.log("" == false);  // true  😱 (both converted to 0)
console.log(null == undefined); // true 😱

// === (strict equality) — no coercion, checks type AND value
console.log(5 === "5");    // false ✅ (different types!)
console.log(0 === false);  // false ✅
console.log("" === false); // false ✅
console.log(null === undefined); // false ✅

// ALWAYS use ===. Seriously. Always.`,
      language: 'javascript',
    },
    {
      title: 'Logical operators and short-circuit magic',
      code: `// AND (&&) — both must be true
let age = 20;
let hasID = true;
console.log(age >= 18 && hasID);  // true (both true)

// OR (||) — at least one must be true
let isAdmin = false;
let isMod = true;
console.log(isAdmin || isMod);  // true (isMod is true)

// NOT (!) — flips the value
console.log(!true);   // false
console.log(!false);  // true

// Short-circuit trick: default values
let userName = "";  // empty string is "falsy"
let displayName = userName || "Anonymous";
console.log(displayName);  // "Anonymous"

let realName = "Kishan";
let display2 = realName || "Anonymous";
console.log(display2);  // "Kishan" (truthy, so || stops here)`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Operator playground!\n\n// 1. Arithmetic\nlet price = 299;\nlet discount = 15; // percent\nlet finalPrice = price - (price * discount / 100);\nconsole.log("Final price: ₹" + finalPrice);\n\n// 2. Comparison\nlet myAge = 22;\nconsole.log("Can vote?", myAge >= 18);\nconsole.log("Is exactly 21?", myAge === 21);\n\n// 3. Logical\nlet hasPassport = true;\nlet hasVisa = false;\nconsole.log("Can travel abroad?", hasPassport && hasVisa);\n\n// 4. Try the weird ones:\nconsole.log("5 == '5':", 5 == "5");   // what do you expect?\nconsole.log("5 === '5':", 5 === "5"); // and this?`,
    challenge: 'Write a mini calculator: create two number variables, then print the result of all 5 arithmetic operators (+, -, *, /, %) applied to them.',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "I kept mixing up == and ===. I would use == everywhere and then get weird bugs where things that shouldn't be equal were being treated as equal. Like, why is 0 == '' true?! That makes no sense!",
    ahamoment:
      "When I finally sat down and looked at what == actually does under the hood — it converts types before comparing. So 0 == '' becomes 0 == 0 (empty string gets converted to 0). Once I saw the conversion rules, I understood why it's chaos. The fix is dead simple: just always use ===.",
    howIUnderstood:
      "I made a personal rule: pretend == doesn't exist. I literally never use it anymore. If I'm comparing things, it's always === and !==. The only exception I've seen senior devs use is `value == null` to check for both null and undefined at once, but honestly, I just write `value === null || value === undefined` to be explicit.",
  },

  keyTakeaways: [
    'Arithmetic: +, -, *, /, % (modulo), ** (power)',
    'ALWAYS use === (strict) instead of == (loose) — this alone prevents countless bugs',
    'The + operator does concatenation with strings: "5" + 3 = "53", not 8',
    'Modulo (%) returns the remainder — super useful for even/odd checks and cycling',
    'Logical operators: && (AND), || (OR), ! (NOT) — used everywhere in conditions',
    'Short-circuit: || can provide default values, && can guard expressions',
    'Assignment shortcuts: +=, -=, *=, /=, ++, -- save time in loops and counters',
  ],

  resources: [
    {
      title: 'The JS Logic Matrix',
      type: 'pdf',
      url: '/assets/The_JS_Logic_Matrix.pdf',
      description: 'NotebookLM deep dive on truthiness, operators, and coercion.'
    }
  ],

  connectedTopics: ['type-coercion', 'variables', 'primitive-types'],
};

export default operators;
