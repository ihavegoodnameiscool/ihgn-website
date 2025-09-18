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
      
      {/* Main text with subtle glow */}
      <h1 
        className="relative text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-neon select-none"
        style={{
          textShadow: '0 0 10px hsl(180 100% 50% / 0.4), 0 0 20px hsl(180 100% 50% / 0.2)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '700',
          letterSpacing: '0.02em',
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default GlowingText;