# DevJournal 🚀

> Learn Web Development, The Honest Way.

DevJournal is a modern, highly-interactive web application built for developers, by a developer. Instead of generic AI-generated tutorials or dry academic documentation, DevJournal focuses on the **reality** of learning to code. It highlights real struggle spots, provides interactive code sandboxes, and breaks down complex concepts (like the JS Engine vs. Runtime) into simple English.

## ✨ Features

- **🎓 7-Phase Curriculum:** A complete journey from JavaScript basics to DevOps mastery.
- **🤔 Struggle Spots:** Honest documentation of confusing concepts and the "Aha!" moments that solve them.
- **⚡ Interactive Sandboxes:** Built-in code execution to test concepts immediately.
- **📊 Dynamic Dashboard:** Tracks your study progress, mastered topics, and provides difficulty ratings.
- **📎 NotebookLM Integration:** Deep dive into specific topics with AI-curated PDFs and visual assets.
- **🤖 Built-in AI Tutor:** Get unblocked instantly with an integrated RAG-based AI chat assistant.
- **💎 Premium UX:** Built with glassmorphism, native 3D mouse-tracking tilt effects, and smooth micro-animations.

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router (HashRouter for zero-config deployments)
- **Styling:** Custom Vanilla CSS (Design System with CSS Variables, Flexbox/Grid, Glassmorphism)
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Animations:** Custom CSS Keyframes & React Type Animation
- **Diagrams:** Mermaid.js

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/devjournal.git
   ```

2. **Install dependencies:**
   ```bash
   cd devjournal
   npm install
   ```

3. **Set up your environment variables:**
   Create a `.env` file in the root directory and add your Gemini API key (needed for the AI Tutor):
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🎯 Hackathon Goals Achieved
- ✅ Build a fully responsive frontend web application
- ✅ Implement a unique "Vibe Coding" aesthetic (Dark mode, 3D Tilt, Neon Accents)
- ✅ Integrate interactive elements (AI Tutor, Confetti, Search)
- ✅ Showcase NotebookLM assets seamlessly

---
*Built with ❤️ for the Hackathon.*
