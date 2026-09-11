"use client";

import { useMemo } from "react";

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        type: `particle-${(i % 3) + 1}`,
        top: `${(i * 37) % 100}%`,
        left: `${(i * 61) % 100}%`,
        delay: `${(i * 0.73) % 10}s`,
        duration: `${10 + ((i * 1.37) % 10)}s`,
      })),
    []
  );

  return (
    <div id="particleSystem" className="pointer-events-none fixed inset-0 z-0">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`particle ${particle.type}`}
          style={{ top: particle.top, left: particle.left, animationDelay: particle.delay, animationDuration: particle.duration }}
        />
      ))}
    </div>
  );
}
