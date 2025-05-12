import React, { useState, useEffect, useRef } from 'react';

const StatsCounter = ({ stat, label }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !observedRef.current) {
          observedRef.current = true;
          
          const target = stat;
          const duration = 2000; // 2 seconds
          const frameDuration = 1000 / 60; // 60fps
          const totalFrames = Math.round(duration / frameDuration);
          const countIncrement = target / totalFrames;
          
          let currentCount = 0;
          let frame = 0;
          
          const counter = setInterval(() => {
            frame++;
            currentCount += countIncrement;
            
            if (frame === totalFrames) {
              clearInterval(counter);
              setCount(target);
            } else {
              setCount(Math.floor(currentCount));
            }
          }, frameDuration);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [stat]);

  return (
    <div className="px-5 text-center">
      <div 
        ref={countRef} 
        className="text-5xl font-bold text-purple mb-2 flex items-center justify-center"
      >
        {count.toLocaleString()}
      </div>
      <div className="text-base text-charcoal opacity-70">{label}</div>
    </div>
  );
};

export default StatsCounter;