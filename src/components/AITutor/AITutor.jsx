import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllContent } from '../../data/content';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import './AITutor.css';

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm your AI Learning Coach. I'm here to help you truly understand these concepts, not just give you the answers. What do you need help with?" }
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
        { role: 'model', text: "API Key set! You can ask me questions, or use the quick actions below to generate analogies, quizzes, or simplify complex topics." }
      ]);
    }
  };

  const sendPrompt = async (userMsg) => {
    if (!userMsg.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Gather context
      const allContent = getAllContent();
      let context = "You are the DevJournal AI Learning Coach. Your goal is to be a mentor. Do NOT just give away code answers immediately. Ask guiding questions, provide analogies, and explain concepts simply. Here is the user's logged data context:\n\n";
      
      allContent.forEach(topic => {
        const takeaways = topic.keyTakeaways ? topic.keyTakeaways.join(', ') : 'None';
        const struggle = topic.struggleSpot?.hasStruggle ? topic.struggleSpot.whatConfusedMe : 'None';
        context += `Topic: ${topic.title}\nStruggle Spot: ${struggle}\nTakeaways: ${takeaways}\n\n`;
      });

      context += `User Prompt: ${userMsg}\n`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("API Call Failed:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Oops, there was an error: ${error.message || 'Please check your API key and try again.'}` }]);
      setIsApiKeySet(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendPrompt(input);
  };

  const quickActions = [
    { label: "Explain Like I'm 12", prompt: "Please explain the current topic to me as if I am 12 years old. Use simple language." },
    { label: "Give Analogy", prompt: "Give me a real-world analogy to help me understand this concept better." },
    { label: "Generate Quiz", prompt: "Generate a 3-question multiple-choice quiz about what I'm currently learning to test my knowledge." },
    { label: "Identify Gaps", prompt: "Based on my struggle spots, what fundamental knowledge gaps do I have, and what should I review?" }
  ];

  return (
    <>
      <button 
        className={`ai-tutor-fab ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title="AI Learning Coach"
      >
        <span className="ai-icon">💡</span>
      </button>

      {isOpen && (
        <div className="ai-chat-window animate-fade-in-up">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <span className="ai-icon">💡</span>
              <div>
                <h3>AI Learning Coach</h3>
                <span className="online-status">● Online</span>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                {msg.role === 'model' ? (
                  <MarkdownRenderer content={msg.text} />
                ) : (
                  msg.text
                )}
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
            <div className="ai-chat-bottom">
              <div className="quick-actions-scroll">
                {quickActions.map((action, idx) => (
                  <button 
                    key={idx} 
                    className="quick-action-btn"
                    onClick={() => sendPrompt(action.prompt)}
                    disabled={isLoading}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              <form className="ai-chat-input" onSubmit={handleSend}>
                <input 
                  type="text" 
                  placeholder="Ask your coach..." 
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
            </div>
          )}
        </div>
      )}
    </>
  );
}
