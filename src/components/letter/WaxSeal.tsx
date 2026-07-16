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

interface WaxSealProps {
  type: 'heart' | 'star' | 'moon' | 'floral' | 'rose' | 'olive' | 'initial' | null;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  broken?: boolean; // Support cracking animations
}

export const WaxSeal: React.FC<WaxSealProps> = ({ type, className = '', onClick, style = {}, broken = false }) => {
  if (type === null) return null;

  const renderEmblem = () => {
    switch (type) {
      case 'heart':
        return (
          <path 
            d="M25,18 C22,12 14,12 14,18 C14,24 25,32 25,32 C25,32 36,24 36,18 C36,12 28,12 25,18 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]"
          />
        );
      case 'star':
        return (
          <path 
            d="M25,9 L29.5,18.5 L40,20 L32.5,27.5 L34.2,38 L25,33 L15.8,38 L17.5,27.5 L10,20 L20.5,18.5 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]"
          />
        );
      case 'moon':
        return (
          <g className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]">
            <path 
              d="M30,14 C30,23 23,30 14,30 C20,30 26,24 26,18 C26,14 23,10 20,8 C26,8 30,10 30,14 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path d="M34,12 L35,14 L37,14 L35.5,15.5 L36,17.5 L34,16 L32,17.5 L32.5,15.5 L31,14 L33,14 Z" fill="currentColor" />
          </g>
        );
      case 'floral':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]">
            <circle cx="25" cy="25" r="3" fill="currentColor" />
            <path d="M25,22 Q25,12 21,14 T25,22 M25,28 Q25,38 29,36 T25,28 M22,25 Q12,25 14,21 T22,25 M28,25 Q38,25 36,29 T28,25" />
            <path d="M22.8,22.8 Q15.8,15.8 19.8,13.8 T22.8,22.8 M27.2,27.2 Q34.2,34.2 30.2,36.2 T27.2,27.2 M27.2,22.8 Q34.2,15.8 36.2,19.8 T27.2,22.8 M22.8,27.2 Q15.8,34.2 13.8,30.2 T22.8,27.2" />
          </g>
        );
      case 'rose':
        return (
          <path 
            d="M25,12 C23,12 21,14 20,16 C17,14 14,17 16,20 C13,20 13,24 16,25 C14,28 17,31 20,29 C21,31 23,33 25,33 C27,33 29,31 30,29 C33,31 36,28 34,25 C37,24 37,20 34,20 C36,17 33,14 30,16 C29,14 27,12 25,12 Z M25,16 Q25,24 21,24 M25,20 C23,20 22,22 25,23 C28,22 27,20 25,20 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]"
          />
        );
      case 'olive':
        return (
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0.5px_0.5px_0.5px_rgba(255,255,255,0.3)]">
            <path d="M14,34 Q25,28 28,12" />
            <path d="M22,25 C18,22 17,15 22,17 C26,17 25,22 22,25 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M26,18 C28,14 34,14 32,19 C28,22 27,20 26,18 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M24,30 C30,32 32,25 28,26 T24,30 Z" fill="currentColor" fillOpacity="0.2" />
          </g>
        );
      case 'initial':
      default:
        return (
          <text 
            x="50%" 
            y="56%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            className="font-serif font-bold text-[22px] select-none fill-current drop-shadow-[0.7px_0.7px_0.5px_rgba(255,255,255,0.35)]"
          >
            A
          </text>
        );
    }
  };

  if (broken) {
    // Render split/cracked seal
    return (
      <div 
        className={`relative w-16 h-16 pointer-events-none select-none ${className}`}
        style={{
          perspective: '200px',
          ...style
        }}
      >
        {/* Left half */}
        <div 
          className="absolute inset-y-0 left-0 w-1/2 overflow-hidden origin-left transition-transform duration-700 ease-out"
          style={{ transform: 'rotateY(-25deg) translateX(-8px) translateZ(5px)' }}
        >
          <svg viewBox="0 0 50 50" className="w-[64px] h-[64px] max-w-none">
            <path d="M25,2 C34,1.5 42,4.5 45,12 C48,20 46,31 43,38 C40,45 33,48 25,47.5 L25,2 Z" fill="currentColor" className="filter brightness-90 saturate-[1.1]" />
            <path d="M25,4.5 C32,4 38.5,6.5 41,12.5 C43.5,19 42.5,28.5 40,34.5 C37.5,40.5 31.5,43 25,42.5 L25,4.5 Z" fill="currentColor" className="filter brightness-105" />
            <circle cx="25" cy="25" r="16" fill="currentColor" className="filter brightness-[0.82] saturate-[1.05]" />
            <g className="text-current opacity-70 filter brightness-[0.45] mix-blend-overlay">{renderEmblem()}</g>
            <g className="text-white opacity-40">{renderEmblem()}</g>
            <path d="M25,2 Q22,15 27,25 T24,47.5 L25,47.5 Z" fill="rgba(0,0,0,0.4)" />
          </svg>
        </div>

        {/* Right half */}
        <div 
          className="absolute inset-y-0 right-0 w-1/2 overflow-hidden origin-right transition-transform duration-700 ease-out"
          style={{ transform: 'rotateY(25deg) translateX(8px) translateZ(5px)' }}
        >
          <svg viewBox="0 0 50 50" className="w-[64px] h-[64px] max-w-none ml-[-32px]">
            <path d="M25,2 L25,47.5 C16,48 9,45 6,38 C3,31 2.5,20 6,12 C9.5,4.5 16,2.5 25,2 Z" fill="currentColor" className="filter brightness-90 saturate-[1.1]" />
            <path d="M25,4.5 L25,42.5 C18.5,43 12.5,40.5 10,34.5 C7.5,28.5 6.5,19 9,12.5 C11.5,6.5 18,5 25,4.5 Z" fill="currentColor" className="filter brightness-105" />
            <circle cx="25" cy="25" r="16" fill="currentColor" className="filter brightness-[0.82] saturate-[1.05]" />
            <g className="text-current opacity-70 filter brightness-[0.45] mix-blend-overlay">{renderEmblem()}</g>
            <g className="text-white opacity-40">{renderEmblem()}</g>
            <path d="M25,2 Q22,15 27,25 T24,47.5 L25,47.5 Z" fill="rgba(0,0,0,0.4)" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-300 select-none ${className}`}
      style={{
        width: '64px',
        height: '64px',
        ...style
      }}
    >
      <svg viewBox="0 0 50 50" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(12,35,28,0.22)]">
        {/* Layer 1: Hand-poured outer wax blob */}
        <path 
          d="M25,2 C33.5,1.8 41.2,4.8 44.5,11.8 C47.8,19.2 46.2,29.8 43.1,36.8 C39.8,43.8 32.8,46.8 25,46.2 C17.2,46.8 10.2,43.8 6.9,36.8 C3.8,29.8 2.2,19.2 5.5,11.8 C8.8,4.8 16.5,1.8 25,2 Z" 
          fill="currentColor"
          className="filter brightness-90 saturate-[1.1]"
        />
        
        {/* Layer 2: Overflow ring */}
        <path 
          d="M25,4.2 C31.2,3.8 37.2,6.2 39.8,11.8 C42.2,17.8 41.2,26.8 38.8,32.8 C36.2,38.8 30.8,41.2 25,40.8 C19.2,41.2 13.8,38.8 11.2,32.8 C8.8,26.8 7.8,17.8 10.2,11.8 C12.8,6.2 18.8,4.8 25,4.2 Z" 
          fill="currentColor"
          className="filter brightness-105"
        />

        {/* Layer 3: Rim shadow */}
        <circle cx="25" cy="25" r="16.5" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
        
        {/* Layer 4: Recessed center */}
        <circle cx="25" cy="25" r="16" fill="currentColor" className="filter brightness-[0.84] saturate-[1.05]" />
        
        {/* Layer 5: Inner shading */}
        <circle cx="25" cy="25" r="16" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2" className="mix-blend-multiply" />

        {/* Layer 6: Stamp Emblem */}
        <g className="text-current opacity-70 filter brightness-[0.45] mix-blend-overlay">
          {renderEmblem()}
        </g>
        <g className="text-white opacity-35">
          {renderEmblem()}
        </g>

        {/* Layer 7: Specular Highlight */}
        <path 
          d="M13,13 C18,8 28,8 33,11 C28,10.2 19,10.5 14,14.5 C13.5,14 13.2,13.5 13,13 Z" 
          fill="rgba(255,255,255,0.38)" 
          className="pointer-events-none"
        />
        <path 
          d="M8,17 C12,11 20,8 26,8 C21,9 13,13 10,19 C9.2,18.5 8.5,17.8 8,17 Z" 
          fill="rgba(255,255,255,0.15)" 
          className="pointer-events-none"
        />
      </svg>
    </div>
  );


