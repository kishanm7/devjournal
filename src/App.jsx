import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import PhasePage from './pages/Phase/PhasePage';
import TopicPage from './pages/Topic/TopicPage';
import SearchPage from './pages/Search/SearchPage';
import StudyPage from './pages/Study/StudyPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AITutor from './components/AITutor/AITutor';

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dj-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dj-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phase/:phaseId" element={<PhasePage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/study" element={<StudyPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        
        {/* Floating AI Tutor */}
        <AITutor />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
