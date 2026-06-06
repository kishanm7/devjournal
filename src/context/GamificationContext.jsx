import React, { createContext, useState, useEffect, useContext } from 'react';

const GamificationContext = createContext();

export function useGamification() {
  return useContext(GamificationContext);
}

export function GamificationProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [achievements, setAchievements] = useState([]);
  
  // For UI Popups
  const [popupQueue, setPopupQueue] = useState([]);

  // Load from local storage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('devjournal_gamification')) || {};
    if (savedData.xp) setXp(savedData.xp);
    if (savedData.streak) setStreak(savedData.streak);
    if (savedData.lessonsCompleted) setLessonsCompleted(savedData.lessonsCompleted);
    if (savedData.achievements) setAchievements(savedData.achievements);
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('devjournal_gamification', JSON.stringify({
      xp,
      streak,
      lessonsCompleted,
      achievements
    }));
  }, [xp, streak, lessonsCompleted, achievements]);

  const addXp = (amount, reason) => {
    setXp(prev => prev + amount);
    triggerPopup(`+${amount} XP`, reason);
  };

  const completeLesson = (lessonId) => {
    setLessonsCompleted(prev => prev + 1);
    addXp(50, 'Lesson Completed!');
    
    // Check for achievements
    if (lessonsCompleted === 0) unlockAchievement('First Steps');
    if (lessonsCompleted === 4) unlockAchievement('5 Lessons Done!');
  };

  const unlockAchievement = (name) => {
    if (!achievements.includes(name)) {
      setAchievements(prev => [...prev, name]);
      triggerPopup('Achievement Unlocked!', name);
    }
  };

  const triggerPopup = (title, subtitle) => {
    const id = Date.now() + Math.random();
    setPopupQueue(prev => [...prev, { id, title, subtitle }]);
    
    // Auto remove after 3s
    setTimeout(() => {
      setPopupQueue(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  return (
    <GamificationContext.Provider value={{
      xp, streak, lessonsCompleted, achievements,
      addXp, completeLesson, unlockAchievement,
      popupQueue
    }}>
      {children}
    </GamificationContext.Provider>
  );
}
