const stackVsHeap = {
  id: 'stack-vs-heap',
  title: 'Introduction to Memory — Stack vs Heap',
  phase: 1,
  module: 2,
  difficulty: 3,
  tags: ['memory', 'stack', 'heap', 'reference', 'value', 'primitive', 'object'],
  date: '2026-06-04',
  estimatedReadTime: '6 min',
  prerequisites: ['variables', 'primitive-types'],

  overview:
    "When you create a variable, JavaScript needs to store it somewhere in memory. It uses two areas — the Stack and the Heap — and understanding which one is used tells you a lot about how your code behaves.",

  explanation: `This topic is a sneak peek into how JavaScript works under the hood. You don't NEED this to write basic code, but understanding it prevents a whole category of bugs that will haunt you later.

### The Stack — Fast and Organized

Think of the stack like a stack of plates. Last plate in, first plate out (LIFO).

The stack stores:
- **Primitive values** (numbers, strings, booleans, null, undefined)
- **Function call information** (we'll cover this more later)

It's fast because everything is organized, small, and predictable. Each value has a fixed size.

When you copy a primitive, you get a **completely independent copy**:

\`\`\`
let a = 5;
let b = a;    // b gets its OWN copy of 5
b = 10;
console.log(a);  // still 5! Changing b didn't affect a.
\`\`\`

### The Heap — Big and Flexible

The heap is a large, unorganized pool of memory. Think of it like a big warehouse where you can store stuff anywhere.

The heap stores:
- **Objects** (including arrays and functions)

Why? Because objects can be any size. An object might have 2 properties or 2000 properties. You can add/remove properties at any time. The stack can't handle that kind of flexibility.

### The Gotcha: References

Here's where it gets tricky. When you store an object, the actual data goes to the heap, but the stack stores a **reference** (basically the address of where the data is in the heap).

So when you "copy" an object, you're really just copying the reference — both variables now point to the SAME data:

\`\`\`
let user1 = { name: "Kishan" };
let user2 = user1;     // user2 gets the REFERENCE, not a copy
user2.name = "Raj";
console.log(user1.name);  // "Raj"! 😱 Both point to same object!
\`\`\`

This is one of the most common sources of bugs for beginners. I've been burned by this multiple times.`,

  codeExamples: [
    {
      title: 'Primitives (Stack) — independent copies',
      code: `// Primitives are stored by VALUE
let originalAge = 25;
let copiedAge = originalAge;  // gets its own copy

copiedAge = 30;

console.log("Original:", originalAge);  // 25 (unchanged!)
console.log("Copy:", copiedAge);        // 30

// Each variable has its own independent copy in the stack.
// Changing one does NOT affect the other.`,
      language: 'javascript',
    },
    {
      title: 'Objects (Heap) — shared references',
      code: `// Objects are stored by REFERENCE
let person1 = { name: "Kishan", age: 22 };
let person2 = person1;  // copies the REFERENCE, not the object!

person2.name = "Raj";

console.log(person1.name);  // "Raj" — BOTH changed! 😱
console.log(person2.name);  // "Raj"

// They point to the SAME object in memory.
// To make a real copy, use the spread operator:
let person3 = { ...person1 };  // creates a NEW object
person3.name = "Amit";

console.log(person1.name);  // "Raj" (unchanged this time!)
console.log(person3.name);  // "Amit"`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Let's see the difference in action!\n\n// PRIMITIVES (stack — independent copies)\nlet x = 100;\nlet y = x;\ny = 200;\nconsole.log("x:", x);  // what do you expect?\nconsole.log("y:", y);\nconsole.log("---");\n\n// OBJECTS (heap — shared reference)\nlet car1 = { brand: "Toyota", year: 2024 };\nlet car2 = car1;  // just copies the reference!\ncar2.brand = "Honda";\nconsole.log("car1:", car1.brand);  // what do you expect?\nconsole.log("car2:", car2.brand);\nconsole.log("---");\n\n// FIX: use spread to make a real copy\nlet car3 = { ...car1 };\ncar3.brand = "BMW";\nconsole.log("car1:", car1.brand);  // still Honda!\nconsole.log("car3:", car3.brand);  // BMW`,
    challenge: 'Create an array [1, 2, 3], copy it using = (reference), and copy it using [...arr] (real copy). Modify the copies and verify which one affects the original.',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "I couldn't understand WHY my original object kept changing when I only modified the 'copy'. I spent 30 minutes debugging something that turned out to be this exact reference issue. I thought `let copy = original` made a full copy. It doesn't.",
    ahamoment:
      "Drawing it out helped. When I drew two boxes (variables) with arrows pointing to ONE circle (the actual object in the heap), I finally saw it. Both arrows point to the same place. Change the circle, and both boxes 'see' the change.",
    howIUnderstood:
      "I think of it like Google Docs. Primitives are like emailing someone a PDF — they get their own copy. Objects are like sharing a Google Doc link — everyone is looking at (and editing) the same document. If you want someone to have their own copy, you need to explicitly duplicate it (spread operator).",
  },

  keyTakeaways: [
    'Stack: stores primitives and references. Fast, organized, fixed-size.',
    'Heap: stores objects (arrays, functions, objects). Flexible, unorganized.',
    'Primitives are copied by VALUE — each variable gets its own independent copy',
    'Objects are copied by REFERENCE — multiple variables can point to the same data',
    'Use the spread operator { ...obj } or [ ...arr ] to create actual copies of objects/arrays',
    'This reference behavior is one of the most common sources of bugs — always be aware of it',
  ],

  connectedTopics: ['variables', 'primitive-types'],
};

export default stackVsHeap;
