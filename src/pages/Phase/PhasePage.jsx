import { useParams, Link } from 'react-router-dom';
import syllabus from '../../data/syllabus';
import { getModuleContent } from '../../data/content';
import DifficultyBadge from '../../components/DifficultyBadge/DifficultyBadge';
import './PhasePage.css';

export default function PhasePage() {
  const { phaseId } = useParams();
  const phase = syllabus.find((p) => p.id === phaseId);

  if (!phase) {
    return (
      <div className="page-not-found">
        <h2>Phase not found</h2>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="phase-page animate-fade-in-up">
      {/* Phase Header */}
      <div className="phase-header" style={{ '--phase-color': phase.color }}>
        <div className="phase-header-inner">
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Phases
          </Link>
          <div className="phase-header-content">
            <span className="phase-header-icon">{phase.icon}</span>
            <div>
              <span className="phase-header-label">Phase {phase.phase}</span>
              <h1 className="phase-header-title">{phase.title}</h1>
              <p className="phase-header-desc">{phase.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="phase-modules">
        <div className="phase-modules-inner">
          {phase.modules.map((mod) => {
            const modContent = getModuleContent(phase.phase, mod.module);
            const hasCoverage = modContent.length > 0;

            return (
              <div
                key={mod.id}
                className={`module-card ${hasCoverage ? '' : 'module-locked'}`}
                id={`module-${mod.id}`}
              >
                <div className="module-header">
                  <div className="module-number-badge" style={{ background: hasCoverage ? phase.color : undefined }}>
                    {mod.module}
                  </div>
                  <div className="module-info">
                    <h2 className="module-title">{mod.title}</h2>
                    <span className="module-topic-count">
                      {mod.topics.length} topics
                      {hasCoverage && (
                        <> · <span style={{ color: phase.color }}>{modContent.length} covered</span></>
                      )}
                    </span>
                  </div>
                </div>

                <div className="module-topics">
                  {mod.topics.map((topicName, idx) => {
                    // Try to find content for this topic
                    const topicContent = modContent.find(
                      (c) => c.title.toLowerCase().includes(topicName.toLowerCase().slice(0, 15)) ||
                        topicName.toLowerCase().includes(c.title.toLowerCase().slice(0, 15))
                    );

                    if (topicContent) {
                      return (
                        <Link
                          to={`/topic/${topicContent.id}`}
                          key={idx}
                          className="module-topic-item covered"
                        >
                          <span className="topic-status-icon covered-icon">✓</span>
                          <span className="topic-name">{topicContent.title}</span>
                          <div className="topic-right">
                            <DifficultyBadge level={topicContent.difficulty} />
                            {topicContent.struggleSpot?.hasStruggle && (
                              <span className="topic-struggle-icon" title="Has struggle spot">🤔</span>
                            )}
                          </div>
                        </Link>
                      );
                    }

                    return (
                      <div key={idx} className="module-topic-item locked">
                        <span className="topic-status-icon locked-icon">○</span>
                        <span className="topic-name">{topicName}</span>
                        <span className="topic-coming-soon">Coming soon</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
