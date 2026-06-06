import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../../context/GamificationContext';
import './XpPopup.css';

export default function XpPopup() {
  const { popupQueue } = useGamification();

  return (
    <div className="xp-popup-container">
      <AnimatePresence>
        {popupQueue.map(popup => (
          <motion.div
            key={popup.id}
            className="xp-popup card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="xp-popup-icon">✨</div>
            <div className="xp-popup-content">
              <h4>{popup.title}</h4>
              {popup.subtitle && <p>{popup.subtitle}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
