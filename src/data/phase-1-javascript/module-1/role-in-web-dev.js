const roleInWebDev = {
  id: 'role-in-web-dev',
  title: 'Role of JavaScript in Web Development',
  phase: 1,
  module: 1,
  difficulty: 1,
  tags: ['javascript', 'web development', 'frontend', 'backend', 'fullstack'],
  date: '2026-06-01',
  estimatedReadTime: '4 min',
  prerequisites: ['intro-to-javascript'],

  overview:
    "JavaScript isn't just *a* web development tool — it's *the* web development tool. It plays a role in every single layer of a modern web application.",

  explanation: `Let me paint a picture for you. When you open any website — say, Instagram — there are three layers working together:

1. **HTML** — The skeleton. It decides what's on the page (a photo, a caption, a like button).
2. **CSS** — The skin. It decides how things look (colors, fonts, spacing, layout).
3. **JavaScript** — The brain. It decides what happens when you interact (double-tap to like, scroll to load more, send a DM).

Without JavaScript, every time you liked a post, the entire page would reload. That would be painfully slow and feel broken. JavaScript lets the page update *without* reloading — that smooth, app-like feel you're used to.

### Where JavaScript fits in 2026:

**On the Frontend (what users see):**
- React, Vue, Angular — these are all JavaScript frameworks/libraries
- Every animation, form validation, popup, dropdown — JavaScript
- Single Page Applications (SPAs) that feel like native apps — JavaScript

**On the Backend (the server):**
- Node.js lets you run JavaScript on the server
- So now one language handles BOTH frontend AND backend
- This is why "fullstack JavaScript" is such a big deal

**Beyond the web:**
- Mobile apps with React Native
- Desktop apps with Electron
- Game development, IoT, machine learning — JavaScript is creeping into everything

The key takeaway? Learning JavaScript well gives you access to the ENTIRE web development ecosystem. You're not learning a niche skill — you're learning the most versatile programming language on the planet.`,

  codeExamples: [
    {
      title: 'JavaScript working with HTML and CSS',
      code: `// JavaScript can read and change HTML
let heading = document.querySelector('h1');
console.log(heading.textContent);  // reads the text

// It can also change CSS styles
heading.style.color = 'blue';
heading.style.fontSize = '48px';

// And respond to user actions
heading.addEventListener('click', function() {
  alert('You clicked the heading!');
});`,
      language: 'javascript',
    },
  ],

  sandbox: {
    starterCode: `// JavaScript's role: making things interactive\n// Here's a simple example of JS processing data\n\nlet userName = "Kishan";\nlet courseName = "100 Days of Code";\n\nconsole.log("Welcome, " + userName + "!");\nconsole.log("You're learning: " + courseName);\n\n// Try changing the values above and see the output change`,
    challenge: 'Create a variable for your age and print a message like "I am 22 years old and learning JavaScript"',
  },

  struggleSpot: null,

  keyTakeaways: [
    'HTML = structure, CSS = appearance, JavaScript = interactivity — all three work together',
    'JavaScript runs on both frontend (browser) and backend (Node.js) — making fullstack JS possible',
    'Without JavaScript, web pages would need to reload for every user interaction',
    'In 2026, JavaScript is the most versatile language in web development',
  ],

  connectedTopics: ['intro-to-javascript', 'js-engine-vs-runtime'],
};

export default roleInWebDev;
