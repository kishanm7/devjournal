const helloWorld = {
  id: 'hello-world',
  title: 'Hello, World Program',
  phase: 1,
  module: 2,
  difficulty: 1,
  tags: ['hello world', 'console', 'first program', 'basics'],
  date: '2026-06-03',
  estimatedReadTime: '3 min',
  prerequisites: ['intro-to-javascript'],

  overview:
    "Every programmer's journey starts here. It's simple, it's classic, and there's a reason it's been the tradition for decades.",

  explanation: `There's a tradition in programming that goes back to the 1970s — your first program in any language should print "Hello, World!" to the screen. It's kind of like a rite of passage.

In JavaScript, we do it with \`console.log()\`:

The \`console\` is an object that gives us access to the browser's debugging console. The \`log\` method prints whatever you pass to it. Simple as that.

But here's the thing — you can log way more than just strings:
- Numbers: \`console.log(42)\`
- Multiple values: \`console.log("age:", 25)\`
- Expressions: \`console.log(10 + 5)\`
- Even objects and arrays (we'll get to those later)

### Where to run it?

You've got a few options:
1. **Browser console** — Press F12 in your browser, go to Console tab, and type directly
2. **HTML file** — Create an HTML file, add a \`<script>\` tag, and open it in the browser
3. **Node.js** — If you have Node installed, save your code in a .js file and run \`node filename.js\` in the terminal

For now, the browser console is the quickest way to experiment. No setup needed.`,

  codeExamples: [
    {
      title: 'The classic Hello World',
      code: `// The classic
console.log("Hello, World!");

// But console can do more:
console.log("My name is", "Kishan");  // multiple values
console.log(2 + 3);                    // expressions
console.log("Result:", 10 * 5);        // mixed

// There are also other console methods:
console.warn("This is a warning");     // yellow warning
console.error("This is an error");     // red error
console.table({name: "JS", year: 1995}); // as a table!`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Your first program!\nconsole.log("Hello, World!");\n\n// Now make it personal:\nconsole.log("My name is ___");\nconsole.log("I'm learning JavaScript in 2026");\nconsole.log("Days into the course:", 3);`,
    challenge: 'Use console.log to print your name, your age, and the result of 365 - 3 (days left in the year).',
  },

  struggleSpot: null,

  keyTakeaways: [
    'console.log() is your best friend for printing output and debugging',
    'You can log strings, numbers, expressions, and even multiple values at once',
    'The browser console (F12) is the fastest way to test JavaScript — no setup needed',
    'console.warn() and console.error() exist too — useful for different types of messages',
  ],

  connectedTopics: ['variables', 'intro-to-javascript'],
};

export default helloWorld;
