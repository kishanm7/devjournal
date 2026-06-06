const introToJs = {
  id: 'intro-to-javascript',
  title: 'Introduction to JavaScript',
  phase: 1,
  module: 1,
  difficulty: 1,
  tags: ['javascript', 'introduction', 'basics', 'web development'],
  date: '2026-06-01',
  estimatedReadTime: '5 min',
  prerequisites: [],

  overview:
    "JavaScript is the programming language of the web. Every time you click a button, see a popup, or watch content load without the page refreshing — that's JavaScript doing its thing behind the scenes.",

  explanation: `So here's the deal — when the web started, pages were just static HTML. You could read stuff, click links, and that was about it. Super boring, right?

Then JavaScript came along in 1995 (fun fact: it was built in just 10 days by a guy named Brendan Eich at Netscape). The whole point was to make web pages *do things* — respond to clicks, validate forms, show animations, update content on the fly.

Fast forward to today, and JavaScript is literally everywhere:
- **Frontend** — Making websites interactive (React, Vue, Angular)
- **Backend** — Running servers with Node.js
- **Mobile apps** — React Native, Ionic
- **Desktop apps** — Electron (VS Code is built with it!)
- **Even AI/ML** — TensorFlow.js

The thing that blew my mind is this: JavaScript is the ONLY language that runs natively in every web browser. That's a massive advantage. You write JavaScript, and it works on Chrome, Firefox, Safari, Edge — everywhere. No installation needed.

### Why should you care?

If you want to build anything for the web (and let's be honest, almost everything is on the web now), JavaScript isn't optional — it's the foundation. HTML gives structure, CSS makes it look good, but JavaScript makes it *alive*.`,

  codeExamples: [
    {
      title: 'Your browser already speaks JavaScript',
      code: `// Open your browser console (F12 → Console tab) and try this:
console.log("Hey, JavaScript works here!");

// You can even do math
console.log(2 + 2);  // 4

// Or manipulate the page
document.title = "I just changed the tab title!";`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// Try writing your first JavaScript!\n// Change the message and click Run\nconsole.log("Hello from JavaScript!");\n\n// Try some math\nlet result = 10 * 5;\nconsole.log("10 x 5 =", result);`,
    challenge:
      'Try using console.log() to print your name and your favorite number.',
  },

  struggleSpot: null,

  keyTakeaways: [
    "JavaScript was created in 1995 and it's the only language browsers natively understand",
    "It's not just for websites anymore — it's used for servers, mobile apps, desktop apps, and more",
    'HTML = structure, CSS = styling, JavaScript = behavior and interactivity',
    "You can start experimenting with JS right now in your browser's console (F12)",
  ],

  connectedTopics: ['role-in-web-dev', 'js-engine-vs-runtime'],

  resources: [
    {
      title: 'JavaScript Built to Survive',
      type: 'pdf',
      url: '/assets/JavaScript_Built_to_Survive (1).pdf',
      description: 'NotebookLM masterclass slides on the origins and survival of JS.'
    },
    {
      title: 'Evolution of Web Scripting Constraints',
      type: 'image',
      url: '/assets/Evolution_of_Web_Scripting_Constraints (1).png',
      description: 'Visual map of the constraints that shaped JS.'
    }
  ]
};

export default introToJs;
