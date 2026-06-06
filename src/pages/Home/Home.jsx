import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TiltWrapper from '../../components/TiltWrapper/TiltWrapper';
import syllabus from '../../data/syllabus';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="home-warm">
      {/* Background Grid - Very Subtle */}
      <div className="bg-grid-overlay-warm"></div>

      {/* 1. HERO SECTION */}
      <section className="hero-warm">
        <div className="hero-inner-warm">
          <motion.div 
            className="hero-content-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="hero-headline">
              Learn Web Development Through Real Experience
            </motion.h1>
            
            <motion.p variants={fadeUp} className="hero-subheadline">
              A premium interactive platform built on actual developer journeys, struggles, and aha moments. Stop watching tutorials and start building.
            </motion.p>
            
            <motion.div variants={fadeUp} className="hero-metrics">
              <div className="metric">
                <span className="metric-val">72+</span>
                <span className="metric-label">Topics Learned</span>
              </div>
              <div className="metric">
                <span className="metric-val">8</span>
                <span className="metric-label">Projects Built</span>
              </div>
              <div className="metric">
                <span className="metric-val text-accent">14🔥</span>
                <span className="metric-label">Current Streak</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-actions">
              <Link to="/phase/phase-1" className="btn-primary-warm">
                Start Learning
              </Link>
              <a href="#projects" className="btn-secondary-warm" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Explore Projects
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-frame-warm">
              <img src="/assets/hero_workspace_warm.png" alt="Developer Workspace" className="hero-img-warm" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CURRENTLY LEARNING */}
      <motion.section 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <TiltWrapper scale={1.01} maxTilt={2}>
          <div className="currently-learning-card card">
            <div className="cl-header">
              <span className="status-live">Currently Exploring JavaScript Operators</span>
            </div>
            <div className="cl-body">
              <div className="cl-stats">
                <span className="cl-percent">In Progress</span>
                <span className="cl-topic">Phase 1 · Module 2</span>
              </div>
              <div className="cl-discovery">
                <h4>Latest Focus</h4>
                <p>Deep diving into logical operators, type coercion, and memory allocation. Trying to understand the difference between == and === under the hood.</p>
              </div>
              <Link to="/topic/mod-1-2-operators" className="btn-text">View active notes →</Link>
            </div>
          </div>
        </TiltWrapper>
      </motion.section>

      {/* 3. INTERACTIVE WORLD MAP */}
      <motion.section 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="section-header">
          <h2>The Developer's Map</h2>
          <p>Embark on the journey. Conquer the zones. Level up your skills.</p>
        </div>

        <div className="world-map">
          {[
            { id: 'phase-1', title: 'JavaScript City', icon: '🏙️', desc: 'Core logic, functions, async/await', color: '#F59E0B', status: 'active', xp: '350 XP' },
            { id: 'phase-2', title: 'React Mountain', icon: '⛰️', desc: 'Components, state, effects', color: '#3b82f6', status: 'locked', xp: '0 XP' },
            { id: 'phase-3', title: 'Backend Kingdom', icon: '🏰', desc: 'Node.js, Express, Databases', color: '#10b981', status: 'locked', xp: '0 XP' },
            { id: 'phase-4', title: 'DevOps Summit', icon: '🏔️', desc: 'Deployment, CI/CD, Docker', color: '#8b5cf6', status: 'locked', xp: '0 XP' }
          ].map((zone, idx) => (
            <div key={zone.id} className={`map-zone ${zone.status}`}>
              <div className="zone-connector"></div>
              <TiltWrapper scale={1.05} maxTilt={5}>
                <Link to={`/phase/${zone.id}`} className="zone-card card">
                  <div className="zone-icon" style={{ backgroundColor: zone.color + '22', color: zone.color }}>
                    {zone.icon}
                  </div>
                  <div className="zone-info">
                    <div className="zone-meta">
                      <span className="zone-status-label">{zone.status.toUpperCase()}</span>
                      <span className="zone-xp">{zone.xp}</span>
                    </div>
                    <h3>{zone.title}</h3>
                    <p>{zone.desc}</p>
                    {zone.status === 'active' && (
                      <div className="zone-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '45%', backgroundColor: zone.color }}></div>
                        </div>
                        <span className="progress-text">45% Explored</span>
                      </div>
                    )}
                  </div>
                  {zone.status === 'locked' && (
                    <div className="zone-lock-overlay">
                      <span>🔒 Complete previous zone to unlock</span>
                    </div>
                  )}
                </Link>
              </TiltWrapper>
            </div>
          ))}
          
          <div className="boss-battle-marker">
            <span className="boss-icon">🐉</span>
            <h4>Capstone Boss: Fullstack App</h4>
          </div>
        </div>
      </motion.section>

      {/* 4. LESSONS I WISH I KNEW EARLIER */}
      <motion.section 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="section-header">
          <h2>Things I Wish Someone Told Me Earlier</h2>
        </div>

        <div className="lessons-grid">
          <TiltWrapper scale={1.02} maxTilt={4}>
            <motion.div variants={fadeUp} className="lesson-card card h-100">
              <h3>Why I stopped tutorial hopping</h3>
              <p>I realized that following a video exactly doesn't teach you how to think. You have to break the code to understand it.</p>
            </motion.div>
          </TiltWrapper>
          
          <TiltWrapper scale={1.02} maxTilt={4}>
            <motion.div variants={fadeUp} className="lesson-card card h-100">
              <h3>My biggest CSS mistake</h3>
              <p>Overusing absolute positioning. Learning CSS Grid properly eliminated 90% of my layout headaches.</p>
            </motion.div>
          </TiltWrapper>

          <TiltWrapper scale={1.02} maxTilt={4}>
            <motion.div variants={fadeUp} className="lesson-card card h-100">
              <h3>What finally made JavaScript click</h3>
              <p>Drawing the Call Stack and Event Loop on paper. You can't understand async code until you know where it waits.</p>
            </motion.div>
          </TiltWrapper>
          
          <TiltWrapper scale={1.02} maxTilt={4}>
            <motion.div variants={fadeUp} className="lesson-card card h-100">
              <h3>The habit that improved consistency</h3>
              <p>Writing developer notes (like this site). Explaining it in simple English proves whether you actually understand it.</p>
            </motion.div>
          </TiltWrapper>
        </div>
      </motion.section>

      {/* 5. THE REALITY BEHIND THE JOURNEY */}
      <motion.section 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="authenticity-section card">
          <motion.div variants={fadeUp} className="auth-image">
            <img src="/assets/authenticity_workspace.png" alt="Late night coding" />
          </motion.div>
          
          <motion.div variants={fadeUp} className="auth-content">
            <h2>The Reality Behind the Journey</h2>
            <div className="story-text">
              <p>It's easy to look at a completed portfolio and think it was a straight line. It wasn't.</p>
              <p>For every green commit square, there are hours of staring at hydration errors, confusing CORS policies, and wondering if I was actually cut out for this.</p>
              <p><strong>What changed?</strong> I stopped trying to be perfect. I started documenting the slow progress, the trial and error, and the struggles. That's what this platform is really about.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. PROJECT SHOWCASE */}
      <motion.section 
        id="projects"
        className="section-container full-width-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="section-header">
          <h2>Project Case Studies</h2>
        </div>

        <div className="showcase-grid">
          <TiltWrapper scale={1.01} maxTilt={2}>
            <motion.div variants={fadeUp} className="showcase-card card">
              <div className="showcase-img-container">
                <div className="browser-mockup">
                  <div className="browser-header">
                    <div className="browser-dots"><span></span><span></span><span></span></div>
                    <div className="browser-address">devjournal.vercel.app</div>
                  </div>
                  <img src="/assets/project_showcase.png" alt="Project Screenshot" />
                </div>
              </div>
              <div className="showcase-info">
                <h3>DevJournal Analytics Dashboard</h3>
                <div className="case-study-details">
                  <div className="detail-item">
                    <span className="label text-danger">Problem</span>
                    <p>Wanted to visualize my daily coding hours and streak data dynamically.</p>
                  </div>
                  <div className="detail-item">
                    <span className="label text-success">Solution</span>
                    <p>Built a custom React dashboard using Chart.js with mocked backend data.</p>
                  </div>
                  <div className="detail-item">
                    <span className="label text-accent">Learning</span>
                    <p>Improved async JavaScript understanding and component lifecycle optimization.</p>
                  </div>
                </div>
                <div className="showcase-actions">
                  <button className="btn-secondary-warm" onClick={() => alert('Project live link coming soon!')}>View Project</button>
                  <button className="btn-text" onClick={() => alert('Case study coming soon!')}>Read Journey →</button>
                </div>
              </div>
            </motion.div>
          </TiltWrapper>
        </div>
      </motion.section>

      {/* 7. PREMIUM FOOTER */}
      <footer className="footer-authentic">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-text">DevJournal</span>
            </div>
            <p className="footer-statement">
              Documenting the journey so others can learn from both the wins and the mistakes.
            </p>
            <div className="social-links">
              <a href="https://github.com/kishanm7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Journey</h4>
              <Link to="/phase/phase-1">JavaScript</Link>
              <Link to="/phase/phase-2">React</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <Link to="/search">Search Notes</Link>
              <Link to="/study">Study Mode</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 DevJournal. Building in public.</p>
        </div>
      </footer>
    </div>
  );
}
