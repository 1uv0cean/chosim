'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypingAnimation({ 
  text, 
  className = '', 
  speed = 50, 
  onComplete 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete && currentIndex === text.length) {
      const completionTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completionTimer);
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className={`${className} h-[1.2em] flex items-center justify-center`}>
      <span>
        {displayedText}
        {currentIndex < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    </div>
  );
}