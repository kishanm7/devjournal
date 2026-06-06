import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { searchContent } from '../../data/content';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Ctrl+K to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchQuery('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchContent(searchQuery);
      setSearchResults(results.slice(0, 5));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.nav-search-wrapper')) {
        setShowSearch(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (topicId) => {
    navigate(`/topic/${topicId}`);
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <nav className="navbar glass" id="main-nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" id="nav-logo">
          <span className="nav-logo-icon">dj</span>
          <span className="nav-logo-text">DevJournal</span>
        </Link>

        {/* Search Bar */}
        <div className="nav-search-wrapper">
          <form onSubmit={handleSearchSubmit} className="nav-search-form">
            <svg className="nav-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search topics..."
              className="nav-search-input"
              id="nav-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSearch(true)}
            />
            <kbd className="nav-search-kbd">Ctrl+K</kbd>
          </form>

          {/* Search Results Dropdown */}
          {showSearch && searchResults.length > 0 && (
            <div className="nav-search-results animate-scale-in">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  className="nav-search-result-item"
                  onClick={() => handleResultClick(result.id)}
                >
                  <span className="result-title">{result.title}</span>
                  <span className="result-meta">
                    Phase {result.phase} · Module {result.module}
                  </span>
                </button>
              ))}
              <button
                className="nav-search-view-all"
                onClick={handleSearchSubmit}
              >
                View all results →
              </button>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          <Link to="/" className="nav-link" id="nav-link-home">
            Home
          </Link>
          <Link to="/study" className="nav-link" id="nav-link-study">
            Study Mode
          </Link>
          <Link to="/dashboard" className="nav-link" id="nav-link-dashboard">
            Dashboard
          </Link>

          {/* Theme Toggle */}
          <button
            className="nav-theme-toggle"
            onClick={toggleTheme}
            id="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            className={`nav-hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="nav-mobile-menu animate-fade-in">
            <Link to="/" className="nav-mobile-link">Home</Link>
            <Link to="/phase/phase-1" className="nav-mobile-link">JavaScript</Link>
            <Link to="/phase/phase-2" className="nav-mobile-link">Backend</Link>
            <Link to="/phase/phase-3" className="nav-mobile-link">System Design</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
