const howJsExecutes = {
  id: 'how-js-executes',
  title: 'How JavaScript Code Executes',
  phase: 1,
  module: 1,
  difficulty: 3,
  tags: ['execution', 'parsing', 'compilation', 'JIT', 'AST', 'machine code'],
  date: '2026-06-02',
  estimatedReadTime: '7 min',
  prerequisites: ['js-engine-vs-runtime'],

  overview:
    "Your JavaScript code goes through a wild journey before it actually runs. It gets parsed, turned into a tree, compiled, optimized — and all of this happens in milliseconds.",

  explanation: `This is one of those topics that sounds intimidating but is actually pretty cool once you get it. Let me walk you through what happens from the moment you write \`let x = 5;\` to the moment your computer actually stores 5 somewhere in memory.

### Step 1: Tokenizing / Lexing

The engine first breaks your code into small chunks called **tokens**. Think of it like breaking a sentence into individual words.

\`let x = 5;\` becomes:
- \`let\` → keyword
- \`x\` → identifier
- \`=\` → assignment operator
- \`5\` → numeric literal
- \`;\` → semicolon

### Step 2: Parsing → Abstract Syntax Tree (AST)

Those tokens get organized into a tree structure called an **AST**. This is basically the engine's way of understanding the *meaning* of your code, not just the words.

It's like the difference between knowing the words "the", "dog", "bit", "man" versus understanding the sentence "The dog bit the man" (who did the biting? the dog — that's what the tree structure captures).

### Step 3: Compilation (JIT)

Here's where it gets interesting. JavaScript used to be an **interpreted** language (executed line by line). Modern engines like V8 use something called **JIT (Just-In-Time) compilation**.

The idea is genius:
1. First, the code is compiled quickly into basic machine code (so it starts running fast)
2. While it's running, the engine watches which parts of your code run frequently ("hot" code)
3. Those hot sections get **re-compiled with heavy optimizations** for speed

So it's not purely interpreted (slow) or purely compiled (slow to start) — it's a hybrid that gives you the best of both worlds.

### Step 4: Execution

Finally, the optimized machine code runs on your CPU. Variables get stored in memory, functions get called, and your program comes to life.

### The Whole Picture:

\`\`\`
Your Code → Tokenizer → Tokens → Parser → AST → Compiler (JIT) → Machine Code → CPU
\`\`\`

All of this happens in milliseconds. Every. Single. Time. You run your code. That's honestly mind-blowing to me.`,

  codeExamples: [
    {
      title: 'Understanding execution order',
      code: `// JavaScript executes top to bottom (mostly)
console.log("Step 1: I run first");
console.log("Step 2: I run second");
console.log("Step 3: I run third");

// But there are exceptions! (we'll learn about these later)
// These are related to hoisting and async behavior

// For now, just know: your code goes through
// Tokenize → Parse → Compile → Execute
// all in milliseconds!`,
      language: 'javascript',
    },
    {
      title: 'What happens with a syntax error',
      code: `// If you have a syntax error, the PARSER catches it
// before any code runs:

console.log("Will this print?");
// let x = ;  // ← SyntaxError! Parser can't make sense of this

// The important thing: even the first console.log won't run!
// Because parsing happens BEFORE execution.
// The engine reads your ENTIRE file first.`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Let's see execution in action\nconsole.log("Line 1 runs");\nconsole.log("Line 2 runs");\n\n// What if we have a function?\nfunction greet() {\n  console.log("Hello from inside the function!");\n}\n\nconsole.log("Line 3 runs");\ngreet(); // Function executes here\nconsole.log("Line 4 runs");\n\n// Notice: the function DEFINITION doesn't print anything.\n// Only the function CALL (greet()) does.`,
    challenge: 'Move the greet() call to BEFORE the function definition. Does it still work? Why? (Hint: hoisting — we\'ll cover this soon!)',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "I couldn't wrap my head around JIT compilation. Is JavaScript compiled or interpreted? Every article said something different, and I was going in circles.",
    ahamoment:
      "It finally clicked when I stopped thinking in binary (compiled OR interpreted) and realized it's BOTH. Modern JS engines compile your code, but they do it just-in-time — not ahead of time like C++. It's a spectrum, not a switch.",
    howIUnderstood:
      "I think of it like cooking: Interpreted = cooking each dish as orders come in (slow but flexible). Compiled = prepping everything in the morning (fast service but takes setup time). JIT = prepping the most popular dishes in advance, cooking rare ones on demand. Best of both worlds.",
  },

  keyTakeaways: [
    'Your code goes through: Tokenize → Parse (AST) → Compile (JIT) → Execute',
    'Syntax errors are caught during parsing — before ANY code runs',
    "JIT compilation means JavaScript is both compiled and interpreted — it's a hybrid",
    'The engine optimizes frequently-run code ("hot" code) for better performance',
    'All of this happens in milliseconds — modern engines are incredibly fast',
  ],

  connectedTopics: ['js-engine-vs-runtime', 'variables'],
};

export default howJsExecutes;
