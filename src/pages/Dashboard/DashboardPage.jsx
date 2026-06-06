import { useState, useEffect } from 'react';
import { getAllContent } from '../../data/content';
import syllabus from '../../data/syllabus';
import { getCompletedTopics, getStudyTime, getRecentActivityArray, getCurrentStreak } from '../../utils/progressManager';
import './DashboardPage.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTopics: 0,
    readTimeMins: 0,
    difficultyBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    phaseProgress: [],
    recentDays: [],
    streak: 0
  });

  useEffect(() => {
    const allContent = getAllContent();
    const completedIds = getCompletedTopics();
    const completedContent = allContent.filter(c => completedIds.includes(c.id));
    
    // Calculate total topics
    const totalTopics = completedContent.length;

    // Get actual study time from localStorage
    const readTimeMins = getStudyTime();

    // Difficulty breakdown of COMPLETED topics
    const diff = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    completedContent.forEach(t => {
      if (t.difficulty >= 1 && t.difficulty <= 5) {
        diff[t.difficulty]++;
      }
    });

    // Phase progress based on completed topics
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

    // Recent Activity from localStorage
    const recentDays = getRecentActivityArray(14);
    const streak = getCurrentStreak();

    setStats({
      totalTopics,
      readTimeMins,
      difficultyBreakdown: diff,
      phaseProgress,
      recentDays,
      streak
    });

  }, []);

  const diffColors = ['', '#10b981', '#34d399', '#f59e0b', '#f97316', '#ef4444'];
  const diffLabels = ['', 'Easy', 'Moderate', 'Intermediate', 'Challenging', 'Hard'];

  return (
    <div className="dashboard-page animate-fade-in-up">
      <div className="dashboard-header">
        <h1>My Learning Journey</h1>
        <p>Analytics and progress tracking for the 100 Days of Code.</p>
      </div>

      {/* Top Stats */}
      <div className="dashboard-stats-grid">
        <div className="dash-stat-card glow-card">
          <div className="dash-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>📚</div>
          <div className="dash-stat-content">
            <h3>{stats.totalTopics}</h3>
            <p>Topics Mastered</p>
          </div>
        </div>
        <div className="dash-stat-card glow-card">
          <div className="dash-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>⏱️</div>
          <div className="dash-stat-content">
            <h3>{Math.floor(stats.readTimeMins / 60)}h {stats.readTimeMins % 60}m</h3>
            <p>Study Time Logged</p>
          </div>
        </div>
        <div className="dash-stat-card glow-card">
          <div className="dash-stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <span className={stats.streak > 0 ? 'streak-fire active' : 'streak-fire'}>🔥</span>
          </div>
          <div className="dash-stat-content">
            <h3>{stats.streak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        {/* Activity Graph */}
        <div className="dash-panel activity-panel">
          <h2>Learning Activity</h2>
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
                <span className="activity-label">{day.dayName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="dash-panel difficulty-panel">
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
        </div>
      </div>

      {/* Phase Progress */}
      <div className="dash-panel progress-panel">
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
      </div>
    </div>
  );
}
