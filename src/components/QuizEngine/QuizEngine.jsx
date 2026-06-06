import React, { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import './QuizEngine.css';

export default function QuizEngine({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const { addXp } = useGamification();

  if (!questions || questions.length === 0) return null;

  const handleSelect = (idx) => {
    if (isCorrect !== null) return; // Prevent changing after answer
    setSelectedAnswer(idx);
  };

  const checkAnswer = () => {
    const correct = questions[currentQuestion].correctAnswer === selectedAnswer;
    setIsCorrect(correct);
    if (correct) {
      addXp(10, 'Correct Answer!');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizComplete(true);
      addXp(50, 'Quiz Completed!');
    }
  };

  if (quizComplete) {
    return (
      <div className="quiz-engine card complete-state">
        <div className="quiz-icon">🏆</div>
        <h3>Quiz Complete!</h3>
        <p>Great job testing your knowledge.</p>
        <button className="btn-secondary-warm" onClick={() => {
          setQuizComplete(false);
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setIsCorrect(null);
        }}>Retry Quiz</button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="quiz-engine card">
      <div className="quiz-header">
        <span className="quiz-badge">KNOWLEDGE CHECK</span>
        <span className="quiz-progress">{currentQuestion + 1} / {questions.length}</span>
      </div>
      
      <h3 className="quiz-question">{q.question}</h3>
      
      <div className="quiz-options">
        {q.options.map((opt, idx) => {
          let optionClass = "quiz-option";
          if (selectedAnswer === idx) {
            optionClass += " selected";
            if (isCorrect === true) optionClass += " correct";
            if (isCorrect === false) optionClass += " incorrect";
          } else if (isCorrect !== null && idx === q.correctAnswer) {
            // Show correct answer if they got it wrong
            optionClass += " correct-reveal";
          }

          return (
            <button 
              key={idx} 
              className={optionClass}
              onClick={() => handleSelect(idx)}
              disabled={isCorrect !== null}
            >
              <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="opt-text">{opt}</span>
            </button>
          );
        })}
      </div>

      <div className="quiz-footer">
        {isCorrect === null ? (
          <button 
            className="btn-primary-warm" 
            onClick={checkAnswer} 
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        ) : (
          <div className="feedback-section">
            <div className={`feedback-msg ${isCorrect ? 'text-success' : 'text-danger'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Not quite right.'}
            </div>
            <p className="explanation">{q.explanation}</p>
            <button className="btn-secondary-warm" onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
