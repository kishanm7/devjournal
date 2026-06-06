import './DifficultyBadge.css';

const labels = ['', 'Easy', 'Moderate', 'Intermediate', 'Challenging', 'Hard'];
const colors = ['', '#10b981', '#34d399', '#f59e0b', '#f97316', '#ef4444'];

export default function DifficultyBadge({ level }) {
  if (!level || level < 1 || level > 5) return null;
  
  return (
    <span
      className="difficulty-badge"
      style={{
        '--diff-color': colors[level],
        background: `${colors[level]}15`,
        color: colors[level],
        borderColor: `${colors[level]}30`,
      }}
    >
      <span className="difficulty-dots">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`difficulty-dot ${i < level ? 'active' : ''}`}
            style={{ background: i < level ? colors[level] : undefined }}
          ></span>
        ))}
      </span>
      {labels[level]}
    </span>
  );
}
