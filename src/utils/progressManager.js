// Utility to manage user progress via localStorage
const STORAGE_KEYS = {
  COMPLETED_TOPICS: 'devjournal_completed_topics',
  STUDY_TIME_MINS: 'devjournal_study_time',
  ACTIVITY_DATES: 'devjournal_activity_dates',
  FLASHCARD_STATS: 'devjournal_flashcard_stats'
};

// --- Topics ---
export const markTopicComplete = (topicId) => {
  const completed = getCompletedTopics();
  if (!completed.includes(topicId)) {
    completed.push(topicId);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(completed));
    recordActivity(); // Log activity for today
  }
};

export const getCompletedTopics = () => {
  const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
  return data ? JSON.parse(data) : [];
};

export const isTopicComplete = (topicId) => {
  return getCompletedTopics().includes(topicId);
};

// --- Study Time ---
export const addStudyTime = (minutes) => {
  const current = getStudyTime();
  localStorage.setItem(STORAGE_KEYS.STUDY_TIME_MINS, (current + minutes).toString());
};

export const getStudyTime = () => {
  const data = localStorage.getItem(STORAGE_KEYS.STUDY_TIME_MINS);
  return data ? parseInt(data, 10) : 0;
};

// --- Activity Graph ---
export const recordActivity = () => {
  const dates = getActivityDates();
  const today = new Date().toISOString().split('T')[0];
  
  if (!dates[today]) {
    dates[today] = 0;
  }
  dates[today] += 1;
  localStorage.setItem(STORAGE_KEYS.ACTIVITY_DATES, JSON.stringify(dates));
};

export const getActivityDates = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY_DATES);
  return data ? JSON.parse(data) : {};
};

export const getRecentActivityArray = (days = 14) => {
  const dates = getActivityDates();
  const recentDays = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    recentDays.push({
      date: dateStr,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      count: dates[dateStr] || 0
    });
  }
  return recentDays;
};

export const getCurrentStreak = () => {
  const dates = getActivityDates();
  let streak = 0;
  const today = new Date();
  
  // Check backwards from today
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    if (dates[dateStr] && dates[dateStr] > 0) {
      streak++;
    } else if (i === 0) {
      // If today is 0, we don't break the streak yet, maybe they just haven't studied today
      continue;
    } else {
      break;
    }
  }
  return streak;
};

// --- Flashcard Stats ---
export const recordFlashcardReview = (status) => {
  // status: 'known' or 'review'
  const stats = getFlashcardStats();
  stats[status] = (stats[status] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.FLASHCARD_STATS, JSON.stringify(stats));
  recordActivity();
};

export const getFlashcardStats = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FLASHCARD_STATS);
  return data ? JSON.parse(data) : { known: 0, review: 0 };
};
