import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { getTopicContent } from '../../data/content';
import { markTopicComplete, isTopicComplete, addStudyTime } from '../../utils/progressManager';
import syllabus from '../../data/syllabus';
import DifficultyBadge from '../../components/DifficultyBadge/DifficultyBadge';
import CodeSandbox from '../../components/CodeSandbox/CodeSandbox';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import QuizEngine from '../../components/QuizEngine/QuizEngine';
import InteractiveChallenge from '../../components/InteractiveChallenge/InteractiveChallenge';
import { useGamification } from '../../context/GamificationContext';
import './TopicPage.css';

export default function TopicPage() {
  const { topicId } = useParams();
  const topic = getTopicContent(topicId);

  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef(Date.now());
  const { addXp, completeLesson } = useGamification();

  // Scroll to top and reset timer on topic change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsCompleted(isTopicComplete(topicId));
    startTimeRef.current = Date.now();

    return () => {
      // Add study time when leaving page
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 60000); // in minutes
      if (timeSpent > 0) {
        addStudyTime(timeSpent);
      }
    };
  }, [topicId]);

  const handleMastered = () => {
    if (!isCompleted) {
      markTopicComplete(topicId);
      setIsCompleted(true);
      completeLesson(topicId);
      addXp(100, 'Topic Mastered!');
      
      // Fire confetti!
      const end = Date.now() + 1.5 * 1000;
      const colors = ['#3b82f6', '#10b981', '#8b5cf6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  };

  if (!topic) {
    return (
      <div className="page-not-found">
        <h2>Topic not found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          This topic hasn&apos;t been covered yet. Check back soon!
        </p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    );
  }

  // Find parent phase info
  const phase = syllabus.find((p) => p.phase === topic.phase);
  const phaseColor = phase?.color || '#3b82f6';



  return (
    <div className="topic-page animate-fade-in-up">
      <div className="topic-page-inner">
        {/* Breadcrumb */}
        <div className="topic-breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/phase/${phase?.id}`} style={{ color: phaseColor }}>
            {phase?.title}
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Module {topic.module}</span>
        </div>

        {/* Topic Header */}
        <header className="topic-header" id="topic-header">
          <div className="topic-meta-row">
            <DifficultyBadge level={topic.difficulty} />
            <span className="topic-read-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {topic.estimatedReadTime}
            </span>
            <span className="topic-date">
              {new Date(topic.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="topic-title">{topic.title}</h1>
          <p className="topic-overview">{topic.overview}</p>

          {/* Tags */}
          <div className="topic-tags">
            {topic.tags.map((tag) => (
              <span key={tag} className="topic-tag">
                {tag}
              </span>
            ))}
          </div>
          {isCompleted && (
            <div className="topic-mastered-badge animate-fade-in-up">
              <span className="mastered-icon">🏆</span> Mastered
            </div>
          )}
        </header>

        {/* Main Explanation */}
        <article className="topic-content" id="topic-content">
          <MarkdownRenderer content={topic.explanation} />
        </article>

        {/* Code Examples */}
        {topic.codeExamples?.length > 0 && (
          <section className="topic-section" id="code-examples">
            <h2 className="section-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Code Examples
            </h2>
            {topic.codeExamples.map((example, i) => (
              <div key={i} className="code-example">
                <h3 className="code-example-title">{example.title}</h3>
                <CodeBlock code={example.code} language={example.language} />
              </div>
            ))}
          </section>
        )}

        {/* Interactive Sandbox */}
        {topic.sandbox && (
          <section className="topic-section" id="interactive-sandbox">
            <h2 className="section-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              </svg>
              Try It Yourself
            </h2>
            <CodeSandbox
              starterCode={topic.sandbox.starterCode}
              challenge={topic.sandbox.challenge}
            />
          </section>
        )}

        {/* Gamified Challenge */}
        <section className="topic-section">
          <InteractiveChallenge 
            title={topic.title + " Challenge"}
            description={`Apply what you've learned about ${topic.title}. Console log the expected string.`}
            initialCode={`// Write your code here to output 'Success!'\n\nconsole.log('Success!');`}
            expectedOutput="Success!"
          />
        </section>

        {/* Gamified Quiz */}
        <section className="topic-section">
          <QuizEngine 
            questions={topic.quiz || [
              {
                question: `Which concept is central to understanding ${topic.title}?`,
                options: ["Memory Allocation", "Call Stack", "Lexical Environment", "All of the above"],
                correctAnswer: 3,
                explanation: `${topic.title} relies on understanding the complete JavaScript execution context.`
              },
              {
                question: "What happens if you don't properly handle errors here?",
                options: ["Nothing", "Memory Leak", "Silent Failure or Crash", "Performance Boost"],
                correctAnswer: 2,
                explanation: "Uncaught exceptions usually lead to script termination or silent UI failures."
              }
            ]}
          />
        </section>

        {/* Struggle Spot */}
        {topic.struggleSpot?.hasStruggle && (
          <section className="struggle-section" id="struggle-spot">
            <div className="struggle-card">
              <div className="struggle-header">
                <span className="struggle-emoji">🤔</span>
                <h2 className="struggle-title">I Found This Hard</h2>
              </div>

              <div className="struggle-block">
                <h4 className="struggle-label">What confused me:</h4>
                <p className="struggle-text">{topic.struggleSpot.whatConfusedMe}</p>
              </div>

              <div className="struggle-block aha">
                <h4 className="struggle-label">💡 The aha moment:</h4>
                <p className="struggle-text">{topic.struggleSpot.ahamoment}</p>
              </div>

              <div className="struggle-block">
                <h4 className="struggle-label">How I finally understood it:</h4>
                <p className="struggle-text">{topic.struggleSpot.howIUnderstood}</p>
              </div>
            </div>
          </section>
        )}

        {/* Key Takeaways */}
        {topic.keyTakeaways?.length > 0 && (
          <section className="topic-section" id="key-takeaways">
            <h2 className="section-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Key Takeaways
            </h2>
            <ul className="takeaways-list">
              {topic.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="takeaway-item">
                  <span className="takeaway-check">✓</span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Resources & PDFs */}
        {topic.resources?.length > 0 && (
          <section className="topic-section" id="resources">
            <h2 className="section-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Attached Resources
            </h2>
            <div className="resources-list">
              {topic.resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-header">
                  <h4>{resource.title}</h4>
                  <div className="resource-actions">
                    <span className="resource-type">{resource.type.toUpperCase()}</span>
                    <a href={resource.url} download className="btn-download" title="Download Resource">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="resource-desc">{resource.description}</p>
                
                {resource.type === 'pdf' && (
                  <div className="pdf-container">
                    <object data={resource.url} type="application/pdf" width="100%" height="600px">
                      <p>Your browser doesn't have a PDF plugin. <a href={resource.url}>Click here to download the PDF file.</a></p>
                    </object>
                  </div>
                )}
                
                {resource.type === 'image' && (
                  <div className="image-resource-container">
                    <img src={resource.url} alt={resource.title} className="resource-image" />
                  </div>
                )}
              </div>
            ))}
            </div>
          </section>
        )}

        {/* Connected Topics */}
        {topic.connectedTopics?.length > 0 && (
          <section className="topic-section" id="connected-topics">
            <h2 className="section-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Related Topics
            </h2>
            <div className="connected-grid">
              {topic.connectedTopics.map((connId) => {
                const conn = getTopicContent(connId);
                if (!conn) return null;
                return (
                  <Link
                    to={`/topic/${conn.id}`}
                    key={conn.id}
                    className="connected-card"
                  >
                    <div className="connected-card-top">
                      <DifficultyBadge level={conn.difficulty} />
                    </div>
                    <h4 className="connected-card-title">{conn.title}</h4>
                    <p className="connected-card-desc">{conn.overview}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        {/* Mastered Button */}
        <div className="topic-completion-section">
          <button 
            className={`btn-mastered ${isCompleted ? 'completed' : ''}`}
            onClick={handleMastered}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mastered
              </>
            ) : (
              'Mark as Mastered'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
