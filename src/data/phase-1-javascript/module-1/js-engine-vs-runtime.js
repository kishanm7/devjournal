const jsEngineVsRuntime = {
  id: 'js-engine-vs-runtime',
  title: 'JavaScript Engine vs Runtime',
  phase: 1,
  module: 1,
  difficulty: 2,
  tags: ['v8', 'engine', 'runtime', 'node.js', 'browser', 'internals'],
  date: '2026-06-02',
  estimatedReadTime: '6 min',
  prerequisites: ['intro-to-javascript'],

  overview:
    "People throw around terms like 'V8 engine' and 'JavaScript runtime' like they're the same thing. They're not. Understanding the difference helps you understand how your code actually runs.",

  explanation: `Okay, this one tripped me up at first. Let me break it down the way I wish someone had explained it to me.

### JavaScript Engine — The Translator

Think of the JavaScript engine as a **translator**. Your code is written in English (well, JavaScript), but your computer's processor only speaks machine code (binary — 0s and 1s). The engine's job is to translate your JavaScript into something the processor can actually execute.

**V8** is Google's JavaScript engine. It's written in C++ and is used in both Chrome and Node.js. Other engines exist too:
- **SpiderMonkey** — Used by Firefox (fun fact: this was the first-ever JS engine)
- **JavaScriptCore** — Used by Safari

What the engine does:
1. **Parses** your code (reads it and checks for syntax errors)
2. **Compiles** it into machine code (using something called JIT — Just-In-Time compilation)
3. **Executes** the machine code

That's it. The engine is purely about taking JavaScript and running it. Nothing more.

### JavaScript Runtime — The Full Package

Now here's where it gets interesting. The engine alone can only do basic stuff — math, string manipulation, logic. It has NO idea what a "web page" is or how to read a file from your hard drive.

The **runtime** is the engine PLUS a bunch of extra tools:

**In the browser**, the runtime gives you:
- The engine (V8, SpiderMonkey, etc.)
- **Web APIs** — DOM manipulation, fetch(), setTimeout, event listeners
- **Event Loop** — manages async operations
- **Callback Queue** — holds callbacks waiting to execute

**In Node.js**, the runtime gives you:
- The engine (V8)
- **Node APIs** — file system access, HTTP server, streams
- **libuv** — handles async I/O operations
- **Event Loop** — same concept, different implementation

### The Restaurant Analogy

Here's how I think about it:
- **Engine** = The chef. They know how to cook (execute code).
- **Runtime** = The entire restaurant. It includes the chef, but also the waiters (Web APIs), the order queue (callback queue), and the manager coordinating everything (event loop).

The chef (engine) can't serve customers alone. You need the whole restaurant (runtime) for things to work.`,

  codeExamples: [
    {
      title: 'Engine work vs Runtime work',
      code: `// This is PURE ENGINE work — just JavaScript:
let x = 10;
let y = 20;
let sum = x + y;  // The engine handles this directly

// This is RUNTIME work — needs extra APIs:
console.log(sum);         // console is provided by the runtime
setTimeout(() => {        // setTimeout is a Web API (runtime)
  console.log("Delayed!");
}, 1000);

// In a browser:
// document.getElementById()  → Web API (runtime)
// fetch('https://...')       → Web API (runtime)

// In Node.js:
// fs.readFile()              → Node API (runtime)
// http.createServer()        → Node API (runtime)`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Let's see the difference!\n\n// Pure engine work (runs anywhere):\nlet a = 5;\nlet b = 10;\nconsole.log("Sum:", a + b);\n\n// Runtime-provided feature:\nconsole.log("This console.log itself is a runtime feature!");\n\n// Try setTimeout — this is NOT the engine, it's the runtime!\nsetTimeout(() => {\n  console.log("This ran after 1 second — thanks to the runtime!");\n}, 1000);\n\nconsole.log("This prints BEFORE the timeout. Why? 🤔");`,
    challenge: 'Can you explain (in your own words as a comment) why the last console.log prints before the setTimeout callback?',
  },

  struggleSpot: {
    hasStruggle: true,
    whatConfusedMe:
      "I kept hearing 'V8 engine' and 'JavaScript runtime' and honestly thought they were the same thing. Like, V8 runs JavaScript, Node.js runs JavaScript... what's the difference?",
    ahamoment:
      "The moment it clicked was when I realized that console.log() — the most basic thing we use — isn't actually part of JavaScript itself. It's provided by the runtime. The engine doesn't know what a console is!",
    howIUnderstood:
      "I started thinking of it like a car. The engine is the motor — it generates power. But you also need wheels, steering, brakes (the runtime) to actually drive. V8 is the motor. Chrome/Node.js is the whole car.",
  },

  keyTakeaways: [
    'The engine (like V8) translates and executes JavaScript — that\'s all it does',
    'The runtime = engine + extra APIs + event loop + callback queue',
    'Browser runtime gives you DOM, fetch, setTimeout; Node.js runtime gives you file system, HTTP server',
    "Even console.log() isn't part of the engine — it's a runtime feature",
    'Same engine (V8) can be used in different runtimes (Chrome vs Node.js)',
  ],

  connectedTopics: ['how-js-executes', 'intro-to-javascript'],

  resources: [
    {
      title: 'THE JAVASCRIPT MACHINE',
      type: 'pdf',
      url: '/assets/THE_JAVASCRIPT_MACHINE.pdf',
      description: 'NotebookLM deep dive into how V8 parses and compiles your code.'
    }
  ]
};

export default jsEngineVsRuntime;
