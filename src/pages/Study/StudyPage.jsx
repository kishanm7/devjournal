import { useState, useEffect } from 'react';
import { getAllContent } from '../../data/content';
import './StudyPage.css';

export default function StudyPage() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, review: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const allContent = getAllContent();
    const flashcards = [];

    // Extract struggle spots and key takeaways into cards
    allContent.forEach((topic) => {
      if (topic.struggleSpot?.hasStruggle) {
        flashcards.push({
          id: `struggle-${topic.id}`,
          topicTitle: topic.title,
          type: 'Aha! Moment',
          front: `What was confusing about:\n**${topic.title}**?\n\n*${topic.struggleSpot.whatConfusedMe}*`,
          back: `💡 **The Fix:**\n${topic.struggleSpot.ahamoment}\n\n**Rule:** ${topic.struggleSpot.howIUnderstood}`,
          phase: topic.phase,
          module: topic.module
        });
      }

      if (topic.keyTakeaways?.length > 0) {
        flashcards.push({
          id: `takeaway-${topic.id}`,
          topicTitle: topic.title,
          type: 'Key Takeaways',
          front: `What are the key takeaways for:\n**${topic.title}**?`,
          back: topic.keyTakeaways.map(t => `• ${t}`).join('\n'),
          phase: topic.phase,
          module: topic.module
        });
      }
    });

    // Shuffle cards
    const shuffled = flashcards.sort(() => 0.5 - Math.random());
    setCards(shuffled);
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (status) => {
    if (status === 'known') {
      setStats(prev => ({ ...prev, known: prev.known + 1 }));
    } else {
      setStats(prev => ({ ...prev, review: prev.review + 1 }));
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150); // wait for flip animation to reset
    } else {
      setIsCompleted(true);
    }
  };

  const restart = () => {
    setCards(prev => [...prev].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setIsFlipped(false);
    setStats({ known: 0, review: 0 });
    setIsCompleted(false);
  };

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-empty">
          <h2>No Study Material Yet</h2>
          <p>Complete some topics with Key Takeaways or Struggle Spots to generate flashcards.</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="study-page animate-fade-in-up">
        <div className="study-completed">
          <div className="study-completed-icon">🎉</div>
          <h2>Study Session Complete!</h2>
          <div className="study-stats-final">
            <div className="stat-box success">
              <span className="stat-num">{stats.known}</span>
              <span className="stat-label">Mastered</span>
            </div>
            <div className="stat-box warning">
              <span className="stat-num">{stats.review}</span>
              <span className="stat-label">Need Review</span>
            </div>
          </div>
          <button className="btn-primary" onClick={restart}>Study Again</button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const formatText = (text) => {
    // Simple bold and italic parsing for flashcards without needing full markdown renderer
    return text.split('\n').map((line, i) => {
      let formatted = line;
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return (
        <p key={i} dangerouslySetInnerHTML={{ __html: formatted || '<br/>' }} />
      );
    });
  };

  return (
    <div className="study-page animate-fade-in-up">
      <div className="study-header">
        <h1>Study Mode</h1>
        <div className="study-progress">
          <div className="study-progress-text">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="study-progress-bar">
            <div 
              className="study-progress-fill" 
              style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flashcard-container">
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-front">
            <div className="flashcard-meta">
              <span className="flashcard-type">{currentCard.type}</span>
              <span className="flashcard-location">Phase {currentCard.phase} · Module {currentCard.module}</span>
            </div>
            <div className="flashcard-content">
              {formatText(currentCard.front)}
            </div>
            <div className="flashcard-hint">Click to flip</div>
          </div>
          
          <div className="flashcard-back">
            <div className="flashcard-meta">
              <span className="flashcard-type">{currentCard.type}</span>
              <span className="flashcard-location">{currentCard.topicTitle}</span>
            </div>
            <div className="flashcard-content">
              {formatText(currentCard.back)}
            </div>
            
            {/* Actions only show when flipped */}
            <div className="flashcard-actions" onClick={e => e.stopPropagation()}>
              <button 
                className="btn-review" 
                onClick={() => handleNext('review')}
              >
                Need Review
              </button>
              <button 
                className="btn-known" 
                onClick={() => handleNext('known')}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
