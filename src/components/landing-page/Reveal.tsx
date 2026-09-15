"use client";

import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  return (
    <div ref={ref} className={`${className} scroll-animate ${inView ? "animate" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
