import React from 'react';

interface GlowingTextProps {
  text: string;
  className?: string;
}

const GlowingText: React.FC<GlowingTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-neon opacity-20 blur-3xl"
        aria-hidden="true"
      />
      
      {/* Main text with glow animation */}
      <h1 
        className="relative text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-neon animate-text-glow select-none"
        style={{
          textShadow: '0 0 30px hsl(180 100% 50% / 0.8), 0 0 60px hsl(180 100% 50% / 0.5)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '900',
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </h1>
      
      {/* Additional glow layers for depth */}
      <div 
        className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-bold text-primary opacity-30 blur-sm animate-pulse-glow select-none"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '900',
          letterSpacing: '0.05em',
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  );
};

export default GlowingText;