import React from 'react';

// Beautiful SVG paths for the pressed botanical illustrations
export const PressedBotanical: React.FC<{ type: 'lavender' | 'olive' | 'sakura' | 'fern' | 'wildflower'; className?: string; style?: React.CSSProperties }> = ({ type, className = '', style = {} }) => {
  const renderPath = () => {
    switch (type) {
      case 'lavender':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Main stem */}
            <path d="M50,90 L50,15" />
            {/* Buds and leaves */}
            <path d="M50,75 C45,72 44,67 50,65 C56,67 55,72 50,75 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50,62 C43,59 42,52 50,50 C58,52 57,59 50,62 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50,47 C44,44 43,38 50,36 C57,38 56,44 50,47 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50,33 C45,30 45,25 50,23 C55,25 55,30 50,33 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50,20 C47,17 47,14 50,12 C53,14 53,17 50,20 Z" fill="currentColor" fillOpacity="0.15" />
            {/* Side leaves */}
            <path d="M50,80 Q40,78 35,82" />
            <path d="M50,78 Q60,76 65,80" />
            <path d="M50,65 Q38,62 30,68" />
            <path d="M50,63 Q62,60 70,66" />
          </g>
        );
      case 'olive':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Curved stem */}
            <path d="M35,85 Q50,70 50,15" />
            {/* Leaves and olives */}
            <path d="M50,25 C58,22 62,30 50,38 C42,30 45,22 50,25 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M47,40 C38,40 35,48 44,54 C50,48 48,40 47,40 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50,52 C58,55 60,65 52,70 C46,64 48,55 50,52 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M44,65 C35,70 36,78 43,80 C48,74 46,67 44,65 Z" fill="currentColor" fillOpacity="0.15" />
            {/* Olives */}
            <circle cx="53" cy="46" r="3" fill="currentColor" fillOpacity="0.35" />
            <circle cx="43" cy="60" r="3.2" fill="currentColor" fillOpacity="0.35" />
          </g>
        );
      case 'sakura':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Branch */}
            <path d="M30,80 Q45,65 65,30 Q75,15 70,10" />
            <path d="M48,61 Q35,55 25,58" />
            <path d="M58,41 Q70,45 80,38" />
            {/* Blossom 1 */}
            <g transform="translate(65,30)">
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <path d="M0,0 Q-8,-8 -12,0 Q-8,8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q-8,8 0,12 Q8,8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q8,8 12,0 Q8,-8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q8,-8 0,-12 Q-8,-8 0,0" fill="currentColor" fillOpacity="0.2" />
            </g>
            {/* Blossom 2 */}
            <g transform="translate(25,58) scale(0.8)">
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <path d="M0,0 Q-8,-8 -12,0 Q-8,8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q-8,8 0,12 Q8,8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q8,8 12,0 Q8,-8 0,0" fill="currentColor" fillOpacity="0.2" />
              <path d="M0,0 Q8,-8 0,-12 Q-8,-8 0,0" fill="currentColor" fillOpacity="0.2" />
            </g>
            {/* Buds */}
            <circle cx="72" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="78" cy="38" r="2.2" fill="currentColor" fillOpacity="0.4" />
            <circle cx="28" cy="52" r="1.8" fill="currentColor" fillOpacity="0.4" />
          </g>
        );
      case 'fern':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            {/* Central stem */}
            <path d="M50,90 Q50,45 50,12" />
            {/* Fronds */}
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 80 - i * 8;
              const size = 20 - i * 1.8;
              return (
                <g key={i}>
                  <path d={`M50,${y} Q${50 - size},${y - 2} ${50 - size * 1.2},${y + 2}`} fill="currentColor" fillOpacity="0.1" />
                  <path d={`M50,${y} Q${50 + size},${y - 2} ${50 + size * 1.2},${y + 2}`} fill="currentColor" fillOpacity="0.1" />
                </g>
              );
            })}
          </g>
        );
      case 'wildflower':
      default:
        return (
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Stems */}
            <path d="M45,85 Q45,55 35,30" />
            <path d="M50,85 L50,15" />
            <path d="M55,85 Q52,60 65,40" />
            {/* Flower heads */}
            <circle cx="50" cy="15" r="2" fill="currentColor" />
            <path d="M50,15 C45,10 55,2 50,15 Z" fill="currentColor" fillOpacity="0.25" />
            <path d="M50,15 C40,18 42,8 50,15 Z" fill="currentColor" fillOpacity="0.25" />
            <path d="M50,15 C60,18 58,8 50,15 Z" fill="currentColor" fillOpacity="0.25" />
            {/* Side flowers */}
            <g transform="translate(35,30) scale(0.7)">
              <circle cx="0" cy="0" r="1.5" fill="currentColor" />
              <circle cx="-5" cy="-5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="5" cy="-5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="5" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="-5" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
            </g>
            <g transform="translate(65,40) scale(0.6)">
              <circle cx="0" cy="0" r="1.5" fill="currentColor" />
              <circle cx="-5" cy="-5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="5" cy="-5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="5" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
              <circle cx="-5" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
            </g>
          </g>
        );
    }
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`w-full h-full pointer-events-none select-none ${className}`}
      style={{
        filter: 'drop-shadow(0.7px 0.7px 0.5px rgba(255,255,255,0.8)) drop-shadow(-0.7px -0.7px 0.5px rgba(0,0,0,0.18))',
        opacity: 0.15,
        mixBlendMode: 'multiply',
        ...style
      }}
    >
      {renderPath()}
    </svg>
  );
};


