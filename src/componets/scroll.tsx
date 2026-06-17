"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

/**
 * Wraps any section, card, or element to fade/slide it in once it enters
 * the viewport while scrolling. Pairs with SmoothScrollProvider but works
 * fine standalone too (uses native IntersectionObserver either way).
 *
 * USAGE — wrap an existing section's return value:
 *
 *   import ScrollReveal from "../src/componets/ScrollReveal";
 *
 *   export default function ContactSection() {
 *     return (
 *       <ScrollReveal>
 *         <section id="contact">...</section>
 *       </ScrollReveal>
 *     );
 *   }
 *
 * For staggered children (e.g. a row of cards), wrap each card and pass
 * an increasing `delay`:
 *
 *   {items.map((item, i) => (
 *     <ScrollReveal key={item.id} delay={i * 80}>
 *       <Card {...item} />
 *     </ScrollReveal>
 *   ))}
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 24,
  once = true,
  className = ""
}: {
  children: ReactNode;
  direction?: RevealDirection;
  /** Stagger delay in ms, e.g. i * 80 for list items */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Travel distance in px for up/down/left/right */
  distance?: number;
  /** If false, re-triggers every time it re-enters the viewport */
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      setIsVisible(true);
      return;
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
      { threshold: 0.05, rootMargin: "0px 0px -10px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, reducedMotion]);

  const offset: Record<RevealDirection, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    fade: "none"
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "none"
          : `${offset[direction]} scale(0.975)`,
        transitionProperty: reducedMotion ? "none" : "opacity, transform",
        transitionDuration: reducedMotion ? "none" : `${duration}ms`,
        transitionTimingFunction: reducedMotion ? "none" : "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: reducedMotion ? "none" : `${delay}ms`,
        willChange: "opacity, transform"
      }}
    >
      {children}
    </div>
  );
}