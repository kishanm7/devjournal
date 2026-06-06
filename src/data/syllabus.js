// Complete syllabus data structure for the 100 Days of Code course
// Each phase contains modules, and each module contains topics

const syllabus = [
  {
    id: 'phase-1',
    phase: 1,
    title: 'JavaScript Mastery',
    description: 'Master JavaScript from the ground up — variables, functions, async, DOM, and everything in between.',
    icon: '⚡',
    color: '#f59e0b',
    modules: [
      {
        id: 'mod-1-1',
        module: 1,
        title: 'Introduction to JavaScript',
        topics: [
          'Introduction to JavaScript',
          'Role in Web Development',
          'State of JavaScript in 2026',
          'Future Scope of JavaScript',
          'JavaScript Engine vs Runtime',
          'Introduction to V8 JavaScript Engine',
          'How JavaScript Code Executes'
        ]
      },
      {
        id: 'mod-1-2',
        module: 2,
        title: 'JavaScript Fundamentals',
        topics: [
          'Hello, World Program',
          'Comments in JavaScript',
          'Variables (var, let, const)',
          'Primitive Data Types',
          'Operators — Arithmetic, Comparison, Logical, Assignment',
          'Type Coercion',
          'Introduction to Memory (Stack vs Heap)'
        ]
      },
      {
        id: 'mod-1-3',
        module: 3,
        title: 'Control Flow',
        topics: [
          'Conditional Statements — if-else, switch, Ternary',
          'Loops — for, while, do-while',
          'Break and Continue'
        ]
      },
      {
        id: 'mod-1-4',
        module: 4,
        title: 'Functions and Execution Context',
        topics: [
          'What is a Function',
          'Function Declaration, Expression, Arrow Functions',
          'Parameters and Arguments',
          'Return Values',
          'Default and Rest Parameters',
          'Execution Context — Global and Function',
          'Creation Phase and Execution Phase',
          'Hoisting',
          'Scope — Global, Function, Block'
        ]
      },
      {
        id: 'mod-1-5',
        module: 5,
        title: 'Call Stack and Closures',
        topics: [
          'Call Stack',
          'Stack Frames',
          'Function Invocation Flow',
          'Closures (Introduction)',
          'Closures with Memory Reference',
          'Practical Use Cases of Closures'
        ]
      },
      {
        id: 'mod-1-6',
        module: 6,
        title: 'Data Types Deep Dive',
        topics: [
          'Strings',
          'Arrays — Methods (map, filter, reduce), Iteration',
          'Objects (Basics)',
          'Date and Time'
        ]
      },
      {
        id: 'mod-1-7',
        module: 7,
        title: 'Objects in JavaScript',
        topics: [
          'Object Properties and Methods',
          'Object References and Copying',
          'Optional Chaining',
          'JSON (JavaScript Object Notation)',
          'Symbol Data Type'
        ]
      },
      {
        id: 'mod-1-8',
        module: 8,
        title: 'Modern JavaScript (ES6+)',
        topics: [
          'Template Literals',
          'Destructuring (Arrays and Objects)',
          'Spread and Rest Operator',
          'Default Parameters',
          'Modules (import / export)',
          'Maps and Sets',
          'WeakMap and WeakSet'
        ]
      },
      {
        id: 'mod-1-9',
        module: 9,
        title: 'Object-Oriented JavaScript',
        topics: [
          'Introduction to OOP',
          'Classes and Objects',
          'Constructors',
          'this Keyword (Basics)',
          'Prototypal Inheritance',
          'Encapsulation (Private Fields)',
          'Polymorphism'
        ]
      },
      {
        id: 'mod-1-10',
        module: 10,
        title: 'Asynchronous JavaScript',
        topics: [
          'Synchronous vs Asynchronous Execution',
          'setTimeout and setInterval',
          'Callbacks',
          'Callback Hell',
          'Promises',
          'Promise Chaining',
          'async and await',
          'Error Handling using try-catch'
        ]
      },
      {
        id: 'mod-1-11',
        module: 11,
        title: 'Event Loop and Async Internals',
        topics: [
          'JavaScript Single Thread Model',
          'Web APIs (Browser Environment)',
          'Callback Queue (Task Queue)',
          'Microtask Queue',
          'Event Loop',
          'Microtask vs Macrotask',
          'Execution Order Deep Dive'
        ]
      },
      {
        id: 'mod-1-12',
        module: 12,
        title: 'DOM Manipulation',
        topics: [
          'DOM Introduction',
          'DOM Tree',
          'Selecting Elements',
          'Updating Content',
          'Adding and Removing Elements'
        ]
      },
      {
        id: 'mod-1-13',
        module: 13,
        title: 'Event Handling',
        topics: [
          'Browser Events',
          'Event Listeners',
          'Event Bubbling and Capturing',
          'Event Delegation',
          'Prevent Default',
          'Stop Propagation'
        ]
      },
      {
        id: 'mod-1-14',
        module: 14,
        title: 'Network Requests and Advanced Concepts',
        topics: [
          'HTTP Basics',
          'Fetch API',
          'Handling API Responses',
          'Error Handling in Requests',
          'CORS (Cross-Origin Requests)',
          'Deep Dive into this Keyword',
          'call, apply, bind',
          'Advanced Error Handling',
          'Custom Errors',
          'Garbage Collection',
          'V8 Engine Optimization'
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phase: 2,
    title: 'Backend Mastery',
    description: 'Build servers, APIs, and databases — the engine that powers every web application.',
    icon: '🔧',
    color: '#3b82f6',
    modules: [
      {
        id: 'mod-2-1',
        module: 1,
        title: 'Backend Fundamentals and Node.js Introduction',
        topics: [
          'What is Backend Development',
          'Client-Server Architecture',
          'Need for JavaScript on Server',
          'Introduction to Node.js',
          'How Node.js runs JavaScript',
          'Event-driven and Non-blocking nature'
        ]
      },
      {
        id: 'mod-2-2',
        module: 2,
        title: 'Node.js Basics',
        topics: [
          'Running JavaScript outside the browser',
          'Global objects (process, __dirname, etc.)',
          'Modules in Node.js — CommonJS',
          'Creating a basic project structure'
        ]
      },
      {
        id: 'mod-2-3',
        module: 3,
        title: 'Core Node.js',
        topics: [
          'File System (fs) — Reading and Writing files',
          'Async vs Sync code in Node.js',
          'Intro to Streams'
        ]
      },
      {
        id: 'mod-2-4',
        module: 4,
        title: 'Building Your First Server',
        topics: [
          'Creating HTTP server using Node.js',
          'Request and Response objects',
          'Handling routes manually',
          'HTTP Methods — GET, POST, PUT, DELETE',
          'Sending JSON data',
          'Why raw Node.js is painful → Express'
        ]
      },
      {
        id: 'mod-2-5',
        module: 5,
        title: 'Introduction to Express.js',
        topics: [
          'Why Express.js',
          'Setting up Express server',
          'Basic routing',
          'Handling requests and responses',
          'Sending JSON'
        ]
      },
      {
        id: 'mod-2-6',
        module: 6,
        title: 'Routing and Middleware',
        topics: [
          'Route parameters',
          'Query parameters',
          'Middleware concept',
          'Built-in middleware (express.json)',
          'Custom middleware',
          'Request lifecycle in Express'
        ]
      },
      {
        id: 'mod-2-7',
        module: 7,
        title: 'REST API Development',
        topics: [
          'REST principles',
          'CRUD operations',
          'Designing endpoints',
          'Handling request body',
          'Status codes',
          'Centralized error handling'
        ]
      },
      {
        id: 'mod-2-8',
        module: 8,
        title: 'MongoDB Basics',
        topics: [
          'Why database is needed',
          'SQL vs NoSQL',
          'Introduction to MongoDB',
          'Collections and Documents',
          'Basic CRUD operations'
        ]
      },
      {
        id: 'mod-2-9',
        module: 9,
        title: 'MongoDB with Mongoose',
        topics: [
          'Introduction to Mongoose',
          'Creating schemas and models',
          'CRUD using Mongoose',
          'Data validation',
          'Simple relationships'
        ]
      },
      {
        id: 'mod-2-10',
        module: 10,
        title: 'Authentication',
        topics: [
          'Authentication vs Authorization',
          'User signup and login flow',
          'Password hashing using bcryptjs',
          'JWT basics',
          'Protecting routes using middleware'
        ]
      },
      {
        id: 'mod-2-11',
        module: 11,
        title: 'File Uploads',
        topics: [
          'Handling file uploads using Multer',
          'Storing files locally',
          'Returning file URLs'
        ]
      },
      {
        id: 'mod-2-12',
        module: 12,
        title: 'AI Integration',
        topics: [
          'What is LLM',
          'Vector Database',
          'Integrating AI',
          'AI Agent'
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phase: 3,
    title: 'System Thinking & Scaling',
    description: 'Think beyond code — learn how systems scale, break, and recover under real-world load.',
    icon: '🧠',
    color: '#8b5cf6',
    modules: [
      {
        id: 'mod-3-1',
        module: 1,
        title: 'Introduction to System Thinking',
        topics: ['System Design (practical meaning)', 'Coding vs Designing systems', 'Understanding scale', 'Latency vs Throughput', 'Monolith vs Microservices']
      },
      {
        id: 'mod-3-2',
        module: 2,
        title: 'Backend Performance Basics',
        topics: ['What happens when traffic increases', 'Identifying bottlenecks', 'Horizontal vs Vertical scaling', 'Why naive backend breaks under load']
      },
      {
        id: 'mod-3-3',
        module: 3,
        title: 'Rate Limiting',
        topics: ['What is Rate Limiting', 'Real-world use cases', 'Fixed Window, Sliding Window', 'Implementing Rate Limiting in Express.js', 'Redis (conceptual)']
      },
      {
        id: 'mod-3-4',
        module: 4,
        title: 'MongoDB Architecture Basics',
        topics: ['How MongoDB works internally', 'Indexes and why they matter', 'Query performance', 'Replication', 'Sharding', 'When MongoDB becomes slow']
      },
      {
        id: 'mod-3-5',
        module: 5,
        title: 'Caching Fundamentals',
        topics: ['What is caching', 'Why caching improves performance', 'Where to use caching', 'Intro to Redis', 'Cache invalidation']
      },
      {
        id: 'mod-3-6',
        module: 6,
        title: 'Real-Time Systems with WebSockets',
        topics: ['Why HTTP is not enough', 'Polling vs WebSockets vs SSE', 'How WebSocket connection works', 'Building with Socket.IO', 'Handling multiple clients']
      },
      {
        id: 'mod-3-7',
        module: 7,
        title: 'System Design Thinking (Applied)',
        topics: ['Breaking features into components', 'Designing APIs', 'Data flow between client and server', 'Fault tolerance', 'Scalability decisions']
      }
    ]
  },
  {
    id: 'phase-4',
    phase: 4,
    title: 'Advanced System Design',
    description: 'Internals, HLD, and the deep architectural patterns that power companies like Netflix and Uber.',
    icon: '🏗️',
    color: '#ef4444',
    modules: [
      {
        id: 'mod-4-1',
        module: 1,
        title: 'Advanced System Design Foundations',
        topics: ['Scalability with real numbers', 'Latency vs Throughput (quantitative)', 'Availability vs Consistency', 'CAP Theorem', 'Identifying bottlenecks at scale']
      },
      {
        id: 'mod-4-2',
        module: 2,
        title: 'Core Architecture Components',
        topics: ['API Gateway', 'Load Balancers — L4 vs L7', 'Reverse Proxy', 'Stateless vs Stateful', 'Service-to-service communication']
      },
      {
        id: 'mod-4-3',
        module: 3,
        title: 'Database Scaling',
        topics: ['Replication — Master-Slave', 'Sharding', 'Consistent Hashing', 'Eventual Consistency', 'Gossip Protocol and Merkle Tree', 'Leader Election']
      },
      {
        id: 'mod-4-4',
        module: 4,
        title: 'Database Internals (MongoDB)',
        topics: ['Internal working of MongoDB', 'Storage engine', 'Indexing deep dive', 'B+ Tree']
      },
      {
        id: 'mod-4-5',
        module: 5,
        title: 'Searching Systems and Elasticsearch',
        topics: ['Why databases fail for search', 'Elasticsearch', 'Inverted Index', 'Distributed search']
      },
      {
        id: 'mod-4-6',
        module: 6,
        title: 'Caching and Distributed Caching',
        topics: ['Caching at scale', 'Cache strategies', 'Cache invalidation', 'Redis internals', 'Eviction strategies (LRU, LFU)']
      },
      {
        id: 'mod-4-7',
        module: 7,
        title: 'Messaging Systems and Kafka',
        topics: ['Why messaging systems', 'Queue vs Pub/Sub', 'Apache Kafka', 'Kafka Internals']
      },
      {
        id: 'mod-4-8',
        module: 8,
        title: 'Advanced Rate Limiting',
        topics: ['Rate limiting at scale', 'Token Bucket, Leaky Bucket', 'Distributed rate limiting', 'Designing rate limiter for real systems']
      },
      {
        id: 'mod-4-9',
        module: 9,
        title: 'System Design Patterns',
        topics: ['Microservices vs Monoliths', 'Strangler Pattern', 'SAGA Pattern', 'CQRS', 'Circuit Breaker']
      },
      {
        id: 'mod-4-10',
        module: 10,
        title: 'Modern Design Infrastructure',
        topics: ['CDN', 'Object Storage (S3)', 'Media Processing Pipelines', 'Search Systems', 'Recommendation Systems']
      },
      {
        id: 'mod-4-11',
        module: 11,
        title: 'Observability and Debugging',
        topics: ['Logging systems', 'Metrics and monitoring', 'Distributed tracing', 'Debugging production']
      },
      {
        id: 'mod-4-12',
        module: 12,
        title: 'Security in System Design',
        topics: ['Secure architecture', 'Auth at scale', 'API protection', 'Rate limiting as security', 'Common attack patterns']
      }
    ]
  },
  {
    id: 'phase-5',
    phase: 5,
    title: 'Frontend Development',
    description: 'React, TypeScript, Tailwind — build beautiful, fast, production-grade user interfaces.',
    icon: '🎨',
    color: '#06b6d4',
    modules: [
      {
        id: 'mod-5-1',
        module: 1,
        title: 'Frontend Architecture and React',
        topics: ['Role of frontend', 'SPA vs MPA', 'Why React', 'Virtual DOM', 'Project setup (Vite)', 'Folder structure']
      },
      {
        id: 'mod-5-2',
        module: 2,
        title: 'React Fundamentals',
        topics: ['JSX', 'Functional Components', 'Props', 'Conditional Rendering', 'Lists and Keys', 'Event Handling']
      },
      {
        id: 'mod-5-3',
        module: 3,
        title: 'State and Component Thinking',
        topics: ['What is state', 'useState', 'Controlled vs uncontrolled', 'Lifting state up', 'Component communication']
      },
      {
        id: 'mod-5-4',
        module: 4,
        title: 'Side Effects and Data Fetching',
        topics: ['useEffect', 'Dependency array', 'API calls', 'Cleanup', 'Common mistakes']
      },
      {
        id: 'mod-5-5',
        module: 5,
        title: 'Advanced Hooks',
        topics: ['useRef', 'useMemo', 'useCallback', 'Custom hooks', 'Optimization basics']
      },
      {
        id: 'mod-5-6',
        module: 6,
        title: 'Routing',
        topics: ['React Router', 'Dynamic routes', 'Protected routes', 'Navigation patterns']
      },
      {
        id: 'mod-5-7',
        module: 7,
        title: 'API Integration and Auth Flow',
        topics: ['Connecting to backend APIs', 'Loading and error states', 'JWT flow', 'Token storage']
      },
      {
        id: 'mod-5-8',
        module: 8,
        title: 'Introduction to TypeScript',
        topics: ['Why TypeScript', 'Basic types', 'Interfaces vs types', 'Functions with types', 'Type inference']
      },
      {
        id: 'mod-5-9',
        module: 9,
        title: 'TypeScript with React',
        topics: ['Typing props', 'Typing hooks', 'Forms and events', 'API response typing']
      },
      {
        id: 'mod-5-10',
        module: 10,
        title: 'Styling with Tailwind CSS',
        topics: ['Tailwind CSS intro', 'Utility-first', 'Layout (flex, grid)', 'Responsive design', 'Reusable components']
      },
      {
        id: 'mod-5-11',
        module: 11,
        title: 'State Management (Redux)',
        topics: ['Why Global State', 'Prop drilling', 'Redux core concepts', 'Redux Toolkit', 'Async State Management', 'Context API']
      },
      {
        id: 'mod-5-12',
        module: 12,
        title: 'Forms and Validation',
        topics: ['Controlled forms', 'Form validation', 'Error handling', 'UX best practices']
      },
      {
        id: 'mod-5-13',
        module: 13,
        title: 'Performance Optimization',
        topics: ['Re-rendering behavior', 'Memoization', 'Lazy loading', 'Code splitting']
      }
    ]
  },
  {
    id: 'phase-6',
    phase: 6,
    title: 'Capstone Projects',
    description: 'Put it all together — build real, production-grade applications from scratch.',
    icon: '🚀',
    color: '#10b981',
    modules: [
      {
        id: 'mod-6-1',
        module: 1,
        title: 'Cloud Video Storage System (S3-like)',
        topics: ['Video upload system', 'Presigned URLs', 'Video processing pipeline', 'HLS-based streaming', 'Storage and metadata', 'CDN-style delivery']
      },
      {
        id: 'mod-6-2',
        module: 2,
        title: 'Quick Commerce Platform (Blinkit-style + AI)',
        topics: ['E-commerce flow', 'Real-time rider tracking', 'Order lifecycle', 'Inventory management', 'Search and filtering', 'AI recommendations', 'Semantic search']
      }
    ]
  },
  {
    id: 'phase-7',
    phase: 7,
    title: 'DevOps',
    description: 'Deploy, monitor, and scale — the final piece that takes your code from laptop to production.',
    icon: '☁️',
    color: '#ec4899',
    modules: [
      {
        id: 'mod-7-1',
        module: 1,
        title: 'DevOps Foundations & Linux',
        topics: ['DevOps philosophy', 'CALMS framework', 'DORA metrics', 'Linux essentials', 'Bash scripting']
      },
      {
        id: 'mod-7-2',
        module: 2,
        title: 'Git & Version Control Mastery',
        topics: ['Git internals', 'Branching strategies', 'Merge vs rebase', 'Monorepo vs polyrepo', 'PR workflows']
      },
      {
        id: 'mod-7-3',
        module: 3,
        title: 'Networking, DNS & TLS',
        topics: ['TCP/IP', 'DNS resolution', 'Load balancing', 'SSL/TLS', 'Reverse proxies']
      },
      {
        id: 'mod-7-4',
        module: 4,
        title: 'CI/CD with Jenkins & GitHub Actions',
        topics: ['CI vs CD', 'Jenkins Pipelines', 'GitHub Actions', 'Deployment strategies', 'Artifact management']
      },
      {
        id: 'mod-7-5',
        module: 5,
        title: 'Docker & Containerisation',
        topics: ['Container vs VM', 'Dockerfile best practices', 'Image registries', 'Docker networking', 'Docker Compose', 'Image scanning']
      },
      {
        id: 'mod-7-6',
        module: 6,
        title: 'Kubernetes Core',
        topics: ['K8s architecture', 'Pods, Deployments, DaemonSets', 'Services', 'ConfigMaps & Secrets', 'Resource management', 'kubectl']
      },
      {
        id: 'mod-7-7',
        module: 7,
        title: 'Kubernetes in Production',
        topics: ['Ingress controllers', 'Persistent Volumes', 'Autoscaling (HPA, VPA)', 'RBAC', 'Network policies', 'Troubleshooting']
      },
      {
        id: 'mod-7-8',
        module: 8,
        title: 'Helm & GitOps',
        topics: ['Helm charts', 'Chart repositories', 'GitOps principles', 'ArgoCD', 'Flux CD']
      },
      {
        id: 'mod-7-9',
        module: 9,
        title: 'Terraform & Infrastructure as Code',
        topics: ['IaC concepts', 'Terraform basics', 'Remote state', 'Reusable modules', 'Ansible', 'Terraform vs Ansible vs Pulumi']
      },
      {
        id: 'mod-7-10',
        module: 10,
        title: 'Cloud Platforms (AWS / GCP / Azure)',
        topics: ['Core services', 'Managed Kubernetes (EKS, GKE, AKS)', 'IAM', 'Cost optimisation']
      },
      {
        id: 'mod-7-11',
        module: 11,
        title: 'Observability — Metrics, Logs & Traces',
        topics: ['Three pillars', 'Prometheus', 'PromQL', 'Grafana', 'Log aggregation', 'Distributed tracing']
      },
      {
        id: 'mod-7-12',
        module: 12,
        title: 'DevSecOps, SRE & Capstone',
        topics: ['Shift-left security', 'Secrets management', 'Container hardening', 'SRE practices', 'Incident management', 'Chaos engineering']
      }
    ]
  }
];

export default syllabus;
