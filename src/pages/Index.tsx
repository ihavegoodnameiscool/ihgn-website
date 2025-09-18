import React from 'react';
import ParticleSystem from '@/components/ParticleSystem';
import GlowingText from '@/components/GlowingText';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-primary">
      {/* Particle system overlay */}
      <ParticleSystem />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(180_100%_50%_/_0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(270_100%_60%_/_0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(330_100%_60%_/_0.1)_0%,transparent_50%)]" />
      </div>
      
      {/* Main content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center">
        <div className="text-center px-4">
          <GlowingText 
            text="ihavegoodname" 
            className="animate-float"
          />
          
          {/* Subtle subtitle */}
          <div className="mt-8 opacity-60">
            <div className="text-foreground/60 text-lg font-light tracking-widest">
              <span className="inline-block animate-pulse">●</span>
              <span className="mx-4">INTERACTIVE</span>
              <span className="inline-block animate-pulse animation-delay-1000">●</span>
              <span className="mx-4">PARTICLES</span>
              <span className="inline-block animate-pulse animation-delay-2000">●</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-glow opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-glow opacity-30 animate-pulse animation-delay-1000" />
    </div>
  );
};

export default Index;
