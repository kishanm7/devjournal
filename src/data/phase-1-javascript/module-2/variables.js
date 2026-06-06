const variables = {
  id: 'variables',
  title: 'Variables — var, let, and const',
  phase: 1,
  module: 2,
  difficulty: 2,
  tags: ['variables', 'var', 'let', 'const', 'declaration', 'scope'],
  date: '2026-06-03',
  estimatedReadTime: '8 min',
  prerequisites: ['hello-world'],

  overview:
    "Variables are like labeled boxes where you store data. JavaScript gives you three ways to create them — var, let, and const — and choosing the right one matters more than you'd think.",

  explanation: `Alright, variables. This is where real programming starts.

A variable is basically a **name you give to a piece of data** so you can use it later. Instead of writing \`"Kishan"\` everywhere in your code, you store it once in a variable and refer to it by name.

### The Three Ways to Declare Variables

**\`var\`** — The OG. This is how JavaScript did variables before 2015.
**\`let\`** — The modern way. Introduced in ES6 (2015). Use this when the value will change.
**\`const\`** — Also ES6. Use this when the value should NOT change.

### var vs let vs const — The Real Difference

Here's what actually matters:

| Feature | \`var\` | \`let\` | \`const\` |
|---------|--------|---------|----------|
| Can reassign? | Yes | Yes | No |
| Scope | Function | Block | Block |
| Hoisted? | Yes (as undefined) | Yes (but not accessible) | Yes (but not accessible) |

**Block scope** means the variable only exists inside the curly braces \`{}\` where it was declared. **Function scope** means it exists throughout the entire function.

### The Rule I Follow

I always start with \`const\`. If I later need to change the value, I switch to \`let\`. I never use \`var\` — it's basically legacy JavaScript and its scoping behavior can cause unexpected bugs.

The priority: **const > let > var**

### Variable Naming Rules

- Must start with a letter, \`_\`, or \`$\` (not a number)
- Can contain letters, numbers, \`_\`, \`$\`
- Case-sensitive (\`name\` and \`Name\` are different)
- Can't use reserved words (\`let\`, \`class\`, \`return\`, etc.)
- Use **camelCase** by convention: \`firstName\`, \`totalPrice\`, \`isLoggedIn\``,

  codeExamples: [
    {
      title: 'var vs let vs const in action',
      code: `// const — value can't be reassigned
const PI = 3.14159;
const name = "Kishan";
// PI = 3.14;  // ❌ Error! Can't reassign const

// let — value CAN be reassigned
let age = 22;
age = 23;  // ✅ Works fine
console.log(age);  // 23

// var — works but DON'T use it
var score = 100;
score = 200;  // works, but var has scoping issues`,
      language: 'javascript',
    },
    {
      title: 'Block scoping — why let is better than var',
      code: `// This is the BIG reason to prefer let over var:

if (true) {
  var x = 10;    // var: leaks OUT of the block
  let y = 20;    // let: stays INSIDE the block
}

console.log(x);  // 10 — var leaked out! 😱
// console.log(y);  // ❌ Error! y is not defined (block-scoped)

// This might not seem like a big deal, but in real code
// with loops and conditions, var can cause NASTY bugs.`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Let's practice with variables!\n\n// 1. Create a const for something that won't change:\nconst myName = "Your Name";\n\n// 2. Create a let for something that might change:\nlet dayOfCourse = 3;\n\n// 3. Print them:\nconsole.log("Name:", myName);\nconsole.log("Day:", dayOfCourse);\n\n// 4. Change the let:\ndayOfCourse = 4;\nconsole.log("Next day:", dayOfCourse);\n\n// 5. Try uncommenting this — what happens?\n// myName = "New Name";`,
    challenge: 'Create variables for a mini user profile: const for name and birthYear, let for currentMood. Print them all, then change the mood and print again.',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "I kept wondering — why does JavaScript have THREE ways to make a variable? Coming from no programming background, it felt unnecessarily complicated. Like, just give me one way to store data, please.",
    ahamoment:
      "It clicked when I understood that var was the original and it had real problems (especially with scoping in loops). let and const were added to FIX those problems. It's not complexity for the sake of complexity — it's JavaScript evolving and learning from its mistakes.",
    howIUnderstood:
      "Now I think of it like this: const is a locked box (can't change what's inside), let is an unlocked box (swap things freely), and var is an old broken box that sometimes spills its contents into places you don't expect. Just don't use the broken box.",
  },

  keyTakeaways: [
    'Always prefer const (default) → let (when you need to reassign) → never var',
    'const doesn\'t mean the VALUE is immutable — it means you can\'t reassign the variable',
    'let and const are block-scoped (inside {}); var is function-scoped (leaks out of blocks)',
    'Use camelCase for variable names: firstName, totalScore, isActive',
    'var exists for backwards compatibility — modern JavaScript uses let and const',
  ],

  connectedTopics: ['primitive-types', 'hello-world', 'operators'],
};

export default variables;
