import React, { useRef, useState } from 'react';

export default function TiltWrapper({ children, className = '', scale = 1.02, maxTilt = 8 }) {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Convert to percentages (-1 to 1)
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    
    // Calculate rotation angles
    const rotateX = percentY * -maxTilt; // Invert Y so it tilts toward mouse
    const rotateY = percentX * maxTilt;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset to initial state smoothly
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div 
      ref={containerRef}
      className={`custom-tilt-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        display: 'flex',
        height: '100%',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}
