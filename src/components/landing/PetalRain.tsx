'use client';

import React from 'react';

export const PetalRain: React.FC = () => {
  // Generate 20 pseudo-random petals configurations
  const petals = Array.from({ length: 25 }).map((_, idx) => ({
    id: idx,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${12 + Math.random() * 14}px`,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic CSS Keyframes */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-5%) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        .petal {
          animation-name: fall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>
      
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute bg-amora-rose/30 rounded-full block"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            borderRadius: '50% 0 50% 50%',
            transformOrigin: 'center center',
          }}
        />
      ))}
    </div>
  );
};
