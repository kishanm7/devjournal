import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGamification } from '../../context/GamificationContext';
import { getAllContent } from '../../data/content';
import syllabus from '../../data/syllabus';
import { getCompletedTopics, getRecentActivityArray } from '../../utils/progressManager';
import './DashboardPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function DashboardPage() {
  const { xp, streak, lessonsCompleted, achievements, addXp } = useGamification();

  const [stats, setStats] = useState({
    totalTopics: 0,
    difficultyBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    phaseProgress: [],
    recentDays: []
  });

  useEffect(() => {
    const allContent = getAllContent();
    const completedIds = getCompletedTopics();
    const completedContent = allContent.filter(c => completedIds.includes(c.id));
    
    const totalTopics = completedContent.length;

    const diff = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    completedContent.forEach(t => {
      if (t.difficulty >= 1 && t.difficulty <= 5) diff[t.difficulty]++;
    });

    const phaseProgress = syllabus.map(phase => {
      const phaseTopics = completedContent.filter(t => t.phase === phase.phase);
      const totalPhaseTopics = phase.modules.reduce((sum, m) => sum + m.topics.length, 0);
      return {
        id: phase.id,
        title: phase.title,
        color: phase.color,
        completed: phaseTopics.length,
        total: totalPhaseTopics,
        percentage: totalPhaseTopics > 0 ? Math.round((phaseTopics.length / totalPhaseTopics) * 100) : 0
      };
    });

    const recentDays = getRecentActivityArray(14);

    setStats({ totalTopics, difficultyBreakdown: diff, phaseProgress, recentDays });
  }, []);

  const diffColors = ['', '#10b981', '#34d399', '#f59e0b', '#f97316', '#ef4444'];
  const diffLabels = ['', 'Easy', 'Moderate', 'Intermediate', 'Challenging', 'Hard'];

  return (
    <div className="dashboard-v2">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-titles">
          <h1>Command Center</h1>
          <p>Welcome back. You're making great progress.</p>
        </div>
        <div className="header-stats">
          <div className="stat-pill xp-pill">
            <span className="icon">✨</span>
            <span className="value">{xp}</span>
            <span className="label">XP</span>
          </div>
          <div className="stat-pill streak-pill">
            <span className="icon">🔥</span>
            <span className="value">{streak || 14}</span>
            <span className="label">Day Streak</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="dashboard-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT COLUMN */}
        <div className="dashboard-col-main">
          
          {/* Continue Learning Card */}
          <motion.div variants={fadeUp} className="continue-learning-card card">
            <div className="cl-header">
              <span className="badge">UP NEXT</span>
              <span className="phase-indicator">Phase 1 · JavaScript</span>
            </div>
            <h2>Lexical Environment & Closures</h2>
            <p>You struggled with variable scope in the last quiz. Let's conquer closures today.</p>
            
            <div className="progress-bar-container">
              <div className="progress-labels">
                <span>Module Progress</span>
                <span>45%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="cl-actions">
              <Link to="/topic/mod-1-5-closures" className="btn-primary-warm">Resume Learning</Link>
              <Link to="/topic/mod-1-5-closures#resources" className="btn-secondary-warm">Review Notes</Link>
            </div>
          </motion.div>

          {/* Activity Widgets */}
          <motion.div variants={fadeUp} className="activity-widgets">
            <div className="widget card">
              <div className="widget-icon text-success">📚</div>
              <div className="widget-val">{lessonsCompleted || 12}</div>
              <div className="widget-label">Lessons Done</div>
            </div>
            <div className="widget card">
              <div className="widget-icon text-accent">⚔️</div>
              <div className="widget-val">8</div>
              <div className="widget-label">Challenges Solved</div>
            </div>
            <div className="widget card">
              <div className="widget-icon text-primary">🎯</div>
              <div className="widget-val">92%</div>
              <div className="widget-label">Quiz Accuracy</div>
            </div>
            <div className="widget card">
              <div className="widget-icon text-warning">⏱️</div>
              <div className="widget-val">34h</div>
              <div className="widget-label">Study Hours</div>
            </div>
          </motion.div>

          {/* Recent Breakthroughs & Difficulties */}
          <motion.div variants={fadeUp} className="insights-panel card">
            <h3>AI Coach Insights</h3>
            <div className="insights-grid">
              <div className="insight-box negative">
                <h4>You struggled with:</h4>
                <ul>
                  <li>Closures & Memory Reference</li>
                  <li>Block vs Function Scope</li>
                </ul>
              </div>
              <div className="insight-box positive">
                <h4>Recent Breakthrough:</h4>
                <p>Understanding the Event Loop and Macrotask queue! 🚀</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-col-side">
          
          {/* Daily Challenge */}
          <motion.div variants={fadeUp} className="daily-challenge card">
            <div className="challenge-header">
              <h3>Daily Challenge</h3>
              <span className="xp-reward">+50 XP</span>
            </div>
            <p>Predict the output of a complex closure scenario without running the code.</p>
            <button className="btn-secondary-warm full-width" onClick={() => alert('Daily Challenges arena coming soon! For now, find challenges inside Topic pages.')}>Start Challenge</button>
          </motion.div>

          {/* Weekly Mission */}
          <motion.div variants={fadeUp} className="weekly-mission card">
            <div className="challenge-header">
              <h3>Weekly Mission</h3>
              <span className="xp-reward">+300 XP</span>
            </div>
            <h4>Build a Weather Dashboard</h4>
            <p>Fetch data from an API, handle promises, and display the forecast using DOM manipulation.</p>
            <div className="mission-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
              <span>1/5 Tasks</span>
            </div>
            <button className="btn-text" onClick={() => alert('Weekly Missions board coming soon!')}>View Details →</button>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={fadeUp} className="achievements-card card">
            <div className="achievements-header">
              <h3>Achievements</h3>
              <button className="btn-text" onClick={() => alert('Full Profile page coming soon!')}>View All</button>
            </div>
            <div className="achievements-list">
              {achievements.length === 0 ? (
                <p className="no-achievements">Complete lessons to unlock achievements!</p>
              ) : (
                achievements.map((ach, idx) => (
                  <div key={idx} className="achievement-item">
                    <span className="ach-icon">🏆</span>
                    <span className="ach-name">{ach}</span>
                  </div>
                ))
              )}
              {/* Dummy achievements to show UI if none unlocked yet */}
              {achievements.length < 3 && (
                <>
                  <div className="achievement-item">
                    <span className="ach-icon">🛡️</span>
                    <span className="ach-name">DOM Explorer</span>
                  </div>
                  <div className="achievement-item locked">
                    <span className="ach-icon">🔒</span>
                    <span className="ach-name">Closure Conqueror</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* COMPREHENSIVE STATS */}
      <motion.div 
        className="comprehensive-stats-section"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="dashboard-main-grid">
          {/* Activity Graph */}
          <motion.div variants={fadeUp} className="dash-panel activity-panel card">
            <h2>Learning Activity (14 Days)</h2>
            <div className="activity-chart">
              {stats.recentDays.map((day, i) => (
                <div key={i} className="activity-bar-group">
                  <div className="activity-bar-bg">
                    <div 
                      className="activity-bar-fill" 
                      style={{ 
                        height: `${day.count === 0 ? 0 : Math.max(20, (day.count / 4) * 100)}%`,
                        background: day.count > 0 ? 'var(--accent-primary)' : 'transparent'
                      }}
                    >
                      <span className="activity-tooltip">{day.count} topics on {day.date}</span>
                    </div>
                  </div>
                  <span className="activity-label">{day.dayName.charAt(0)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Difficulty Distribution */}
          <motion.div variants={fadeUp} className="dash-panel difficulty-panel card">
            <h2>Difficulty Distribution</h2>
            <div className="diff-chart">
              {[1, 2, 3, 4, 5].map(level => {
                const count = stats.difficultyBreakdown[level];
                const percentage = stats.totalTopics > 0 ? (count / stats.totalTopics) * 100 : 0;
                return (
                  <div key={level} className="diff-row">
                    <div className="diff-label">
                      <span className="diff-dot" style={{ background: diffColors[level] }}></span>
                      {diffLabels[level]}
                    </div>
                    <div className="diff-bar-container">
                      <div 
                        className="diff-bar-fill" 
                        style={{ width: `${percentage}%`, background: diffColors[level] }}
                      ></div>
                    </div>
                    <div className="diff-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Phase Progress */}
        <motion.div variants={fadeUp} className="dash-panel progress-panel card">
          <h2>Phase Progress</h2>
          <div className="progress-grid">
            {stats.phaseProgress.map(phase => (
              <div key={phase.id} className="phase-progress-item">
                <div className="phase-progress-header">
                  <h3>{phase.title}</h3>
                  <span>{phase.percentage}%</span>
                </div>
                <div className="phase-progress-bar-bg">
                  <div 
                    className="phase-progress-bar-fill" 
                    style={{ width: `${phase.percentage}%`, background: phase.color }}
                  ></div>
                </div>
                <p className="phase-progress-details">{phase.completed} of {phase.total} topics</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
