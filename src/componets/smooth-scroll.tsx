"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Mounts Lenis smooth/inertia scrolling for the whole app.
 *
 * USAGE — wrap your root layout's children once:
 *
 *   // app/layout.tsx
 *   import SmoothScrollProvider from "../src/componets/SmoothScrollProvider";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <SmoothScrollProvider>{children}</SmoothScrollProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * Do NOT add this inside individual page/section components — it must
 * wrap the whole scrollable document exactly once, or you'll get
 * competing scroll listeners.
 */
export default function SmoothScrollProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect users who've asked for reduced motion at the OS level.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}