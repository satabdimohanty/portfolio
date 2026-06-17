"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface MagicalGlowRevealProps {
  children: string;
  className?: string;
  delay?: number; // Base delay in ms
  letterDelay?: number; // Delay between characters in ms
  once?: boolean;
}

export default function MagicalGlowReveal({
  children,
  className = "",
  delay = 0,
  letterDelay = 30,
  once = true,
}: MagicalGlowRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  // Split string into letters
  const letters = children.split("");

  return (
    <span
      ref={containerRef}
      className={`inline-block select-none ${className}`}
      aria-label={children}
    >
      {letters.map((char, index) => {
        // Spaces shouldn't be animated individually as empty elements (might cause layout issues)
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }

        const charDelay = delay + index * letterDelay;

        return (
          <span
            key={index}
            className="inline-block transition-all"
            style={{
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? "blur(0px)" : "blur(4px)",
              transform: isVisible ? "translateY(0)" : "translateY(6px)",
              textShadow: isVisible
                ? "none"
                : "0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(167, 139, 250, 0.4)",
              transitionProperty: isVisible ? "opacity, filter, transform" : "none",
              transitionDuration: isVisible ? "600ms" : "0ms",
              transitionTimingFunction: isVisible ? "cubic-bezier(0.16, 1, 0.3, 1)" : "ease",
              transitionDelay: `${charDelay}ms`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
