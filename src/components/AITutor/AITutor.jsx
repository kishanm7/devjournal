import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllContent } from '../../data/content';
import './AITutor.css';

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm your DevJournal AI Tutor. I know everything you've documented in your journal. Paste your Gemini API key below to start chatting!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSetKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      setMessages([
        { role: 'model', text: "API Key set! Ask me anything about your web dev journey. For example, 'What did I find confusing about Type Coercion?'" }
      ]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Gather all DevJournal context
      const allContent = getAllContent();
      let context = "You are the DevJournal AI Tutor. You help the user understand the web development concepts they have logged in their journal. Be encouraging, concise, and refer back to their specific 'Struggle Spots' or 'Takeaways' if relevant. Here is the data they have logged:\n\n";
      
      allContent.forEach(topic => {
        context += `Topic: ${topic.title}\nDescription: ${topic.description}\nStruggle Spot: ${topic.struggleSpot}\nKey Takeaways: ${topic.keyTakeaways.join(', ')}\nExplanation Snippet: ${topic.explanation.substring(0, 300)}...\n\n`;
      });

      context += `User Question: ${userMsg}\n`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops, there was an error. Please check your API key and try again." }]);
      setIsApiKeySet(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`ai-tutor-fab ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title="Ask AI Tutor"
      >
        <span className="ai-icon">✨</span>
      </button>

      {isOpen && (
        <div className="ai-chat-window animate-fade-in-up">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <span className="ai-icon">✨</span>
              <h3>AI Tutor</h3>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="ai-message model loading">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isApiKeySet ? (
            <form className="ai-api-form" onSubmit={handleSetKey}>
              <input 
                type="password" 
                placeholder="Paste Gemini API Key..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <form className="ai-chat-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask about your notes..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
