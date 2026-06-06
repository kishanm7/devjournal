import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import TiltWrapper from '../../components/TiltWrapper/TiltWrapper';
import { getAllContent, getLatestContent, getStruggleContent } from '../../data/content';
import syllabus from '../../data/syllabus';
import DifficultyBadge from '../../components/DifficultyBadge/DifficultyBadge';
import './Home.css';

export default function Home() {
  const allContent = getAllContent();
  const latestContent = getLatestContent(4);
  const struggleContent = getStruggleContent();

  // Count covered topics per phase
  const phaseCoverage = syllabus.map((phase) => {
    const totalTopics = phase.modules.reduce((sum, m) => sum + m.topics.length, 0);
    const coveredTopics = allContent.filter((c) => c.phase === phase.phase).length;
    return { ...phase, totalTopics, coveredTopics };
  });

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Currently learning: 100 Days of Code
          </div>
          <h1 className="hero-title">
            Master Web Development. <br />
            <span className="text-gradient">No Bullshit.</span>
          </h1>
          <div className="hero-subtitle">
            <TypeAnimation
              sequence={[
                'Track your learning journey step by step.',
                2000,
                'Document your "Struggle Spots".',
                2000,
                'Gamify your technical knowledge.',
                2000,
                'Prepare for your next technical interview.',
                2000,
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className="typewriter-text"
            />
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{allContent.length}</span>
              <span className="hero-stat-label">Topics Covered</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">{struggleContent.length}</span>
              <span className="hero-stat-label">Struggle Spots</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">{syllabus.length}</span>
              <span className="hero-stat-label">Phases</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/phase/phase-1" className="btn-primary" id="start-learning-btn">
              Start Learning
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => document.getElementById('phases-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
              id="explore-btn"
            >
              Explore Phases
            </button>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="features-section" id="features-section">
        <div className="section-container">
          <h2 className="section-title">Not Your Typical Tutorial Site</h2>
          <p className="section-subtitle">This isn&apos;t AI-generated content or copy-pasted docs. It&apos;s a real developer sharing real learnings — the good, the bad, and the confusing.</p>
          <div className="features-grid stagger-children">
            <TiltWrapper scale={1.05} maxTilt={10}>
              <div className="feature-card h-100">
                <div className="feature-icon struggle-anim">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3>Struggle Spots</h3>
                <p>Don't hide what you don't know. Document exactly what confused you, and log the "Aha!" moment when it finally clicks.</p>
              </div>
            </TiltWrapper>

            <TiltWrapper scale={1.05} maxTilt={10}>
              <div className="feature-card h-100">
                <div className="feature-icon interactive-anim">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3>Interactive Code</h3>
                <p>Every concept comes with a built-in sandbox. Don't just read about closure — break the code and fix it yourself.</p>
              </div>
            </TiltWrapper>

            <TiltWrapper scale={1.05} maxTilt={10}>
              <div className="feature-card h-100">
                <div className="feature-icon english-anim">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3>Simple English</h3>
                <p>Written by a developer, for a developer. No academic jargon. Just clear explanations of how things actually work.</p>
              </div>
            </TiltWrapper>

            <TiltWrapper scale={1.05} maxTilt={10}>
              <div className="feature-card h-100">
                <div className="feature-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>📊</div>
                <h3>Difficulty Ratings</h3>
                <p>Every topic is rated by difficulty so you know what to brace for and can plan your study sessions.</p>
              </div>
            </TiltWrapper>
          </div>
        </div>
      </section>

      {/* Phases Overview */}
      <section className="phases-section" id="phases-section">
        <div className="section-container">
          <h2 className="section-title">The Learning Path</h2>
          <p className="section-subtitle">7 phases, 72 modules, one complete journey from JavaScript basics to DevOps mastery.</p>
          <div className="phases-grid stagger-children">
            {syllabus.map(phase => (
              <TiltWrapper 
                key={phase.id} 
                scale={1.03} 
                maxTilt={6}
              >
                <div style={{ '--phase-color': phase.color, width: '100%', height: '100%' }}>
                  <Link to={`/phase/${phase.id}`} className="phase-card">
                    <div className="phase-card-header">
                      <span className="phase-icon">{phase.icon}</span>
                      <span className="phase-number">Phase {phase.phase}</span>
                    </div>
                    <h3 className="phase-title">{phase.title}</h3>
                    <p className="phase-desc">{phase.description}</p>
                    <div className="phase-progress">
                      <div className="phase-progress-bar">
                        <div 
                          className="phase-progress-fill" 
                          style={{ width: '0%', background: 'var(--phase-color)' }}
                        ></div>
                      </div>
                      <span className="phase-progress-text">0%</span>
                    </div>
                    <span className="phase-module-count">{phase.modules.length} Modules</span>
                  </Link>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      {latestContent.length > 0 && (
        <section className="recent-section" id="recent-section">
          <div className="section-container">
            <h2 className="section-title">Recently Added</h2>
            <p className="section-subtitle">The latest topics from my learning journey.</p>
            <div className="recent-grid stagger-children">
              {latestContent.map((topic) => (
                <TiltWrapper key={topic.id} scale={1.03} maxTilt={8}>
                  <Link to={`/topic/${topic.id}`} className="recent-card h-100">
                    <div className="recent-card-top">
                      {topic.struggleSpot?.hasStruggle && (
                        <span className="struggle-tag">🤔 Struggle Spot</span>
                      )}
                      {topic.resources?.length > 0 && (
                        <span className="pdf-tag">📎 Includes PDF</span>
                      )}
                    </div>
                    <h3 className="recent-card-title">{topic.title}</h3>
                    <p className="recent-card-overview">{topic.overview}</p>
                    <div className="recent-card-meta">
                      <DifficultyBadge level={topic.difficulty} />
                      <span>{topic.estimatedReadTime}</span>
                    </div>
                  </Link>
                </TiltWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="section-container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="nav-logo-icon">dj</span>
              <span className="footer-name">DevJournal</span>
            </div>
            <p className="footer-text">
              Built with ☕ and curiosity during the 100 Days of Code journey.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} DevJournal. Learning in public.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
