import { useSearchParams, Link } from 'react-router-dom';
import { searchContent } from '../../data/content';
import DifficultyBadge from '../../components/DifficultyBadge/DifficultyBadge';
import './SearchPage.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchContent(query) : [];

  return (
    <div className="search-page animate-fade-in-up">
      <div className="search-page-inner">
        <h1 className="search-page-title">
          {query ? (
            <>
              Results for <span className="gradient-text">&quot;{query}&quot;</span>
            </>
          ) : (
            'Search Topics'
          )}
        </h1>

        {query && (
          <p className="search-count">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        )}

        {results.length > 0 ? (
          <div className="search-results-list stagger-children">
            {results.map((topic) => (
              <Link
                to={`/topic/${topic.id}`}
                key={topic.id}
                className="search-result-card"
              >
                <div className="search-result-left">
                  <div className="search-result-meta">
                    <DifficultyBadge level={topic.difficulty} />
                    <span className="search-result-phase">
                      Phase {topic.phase} · Module {topic.module}
                    </span>
                    {topic.struggleSpot?.hasStruggle && (
                      <span className="struggle-tag">🤔 Struggle Spot</span>
                    )}
                  </div>
                  <h3 className="search-result-title">{topic.title}</h3>
                  <p className="search-result-overview">{topic.overview}</p>
                  <div className="search-result-tags">
                    {topic.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="topic-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="search-result-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="search-empty">
            <span className="search-empty-icon">🔍</span>
            <h3>No results found</h3>
            <p>Try a different search term or browse the phases.</p>
            <Link to="/" className="btn-primary">Browse All Phases</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
