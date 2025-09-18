import React, { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

interface MouseParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const ParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate random ambient particles
  const generateParticle = useCallback((): Particle => {
    const colors = ['hsl(180 100% 50%)', 'hsl(270 100% 60%)', 'hsl(330 100% 60%)'];
    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
    };
  }, []);

  // Generate mouse-following particles
  const generateMouseParticle = useCallback((x: number, y: number): MouseParticle => {
    return {
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      opacity: 1,
      life: 0,
      maxLife: 60,
    };
  }, []);

  // Track mouse movement with immediate response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Generate mouse particles more frequently for smoother trail
      if (Math.random() < 0.8) {
        setMouseParticles(prev => [
          ...prev.slice(-30), // Keep more particles for smoother trail
          generateMouseParticle(e.clientX, e.clientY)
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [generateMouseParticle]);

  // Initialize and update ambient particles
  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 15 }, () => generateParticle());
    setParticles(initialParticles);

    const interval = setInterval(() => {
      // Add new particles occasionally
      if (Math.random() < 0.3) {
        setParticles(prev => [...prev, generateParticle()]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [generateParticle]);

  // High-frequency animation loop for smooth particle movement
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
          opacity: particle.opacity * 0.998,
        }))
        .filter(particle => 
          particle.y > -50 && 
          particle.x > -50 && 
          particle.x < window.innerWidth + 50 && 
          particle.opacity > 0.01
        )
      );

      setMouseParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.95,
          y: particle.y + particle.vy * 0.95,
          vx: particle.vx * 0.95,
          vy: particle.vy * 0.95,
          life: particle.life + 1,
          opacity: Math.max(0, 1 - (particle.life / particle.maxLife)),
        }))
        .filter(particle => particle.life < particle.maxLife)
      );
    };

    // Use requestAnimationFrame for smooth 60fps animation
    let animationId: number;
    const animationLoop = () => {
      animate();
      animationId = requestAnimationFrame(animationLoop);
    };
    animationId = requestAnimationFrame(animationLoop);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Ambient particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Mouse-following particles */}
      {mouseParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: 'hsl(180 100% 50%)',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px hsl(180 100% 50%)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

    </div>
  );
};

export default ParticleSystem;