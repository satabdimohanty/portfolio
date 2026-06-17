"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  angle: number;
  speed: number;
  type: "star" | "dust";
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  char: string;
}

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "strengths", label: "Strengths" },
  { id: "workflow", label: "Process" },
  { id: "ai-assisted", label: "AI Dev" },
  { id: "languages", label: "Languages" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function MagicalScrollEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  // DOM Refs for scroll tracking to prevent React render thrashing on scroll
  const progressFillRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Keep track of cursor state
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0, lastTime: 0 });
  // Keep track of scroll speed
  const scrollRef = useRef({ y: 0, velocity: 0, lastY: 0, lastTime: 0 });

  // Navigation handlers
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // 1. Detect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];
    let sparkles: Sparkle[] = [];
    const maxParticles = 45;

    // Initialize Canvas Dimensions
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize Particles
    const colors = ["#10b981", "#34d399", "#a78bfa", "#c084fc", "#ffffff"];
    particles = Array.from({ length: maxParticles }).map(() => {
      const size = Math.random() * 2 + 0.5;
      const baseAlpha = Math.random() * 0.4 + 0.1;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.4 - 0.1, // Drift upwards
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        type: Math.random() > 0.8 ? "star" : "dust",
      };
    });

    // Handle Mouse Events
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const mouse = mouseRef.current;
      
      if (mouse.lastTime > 0) {
        const dt = now - mouse.lastTime;
        if (dt > 0) {
          mouse.vx = (e.clientX - mouse.lastX) / dt;
          mouse.vy = (e.clientY - mouse.lastY) / dt;
        }
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.lastTime = now;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Calculate Scroll Velocity & Progress directly
    const tickScroll = () => {
      const now = performance.now();
      const scroll = scrollRef.current;
      const currentY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? currentY / totalHeight : 0;

      // Update DOM styles directly for high performance
      if (progressFillRef.current) {
        progressFillRef.current.style.height = `${progress * 100}%`;
      }
      if (orbRef.current) {
        orbRef.current.style.top = `${progress * 100}%`;
      }
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translateY(${-progress * 200}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translateY(${progress * 150}px)`;
      }

      const dt = now - scroll.lastTime;
      if (dt > 0) {
        scroll.velocity = (currentY - scroll.lastY) / dt;
      }
      scroll.y = currentY;
      scroll.lastY = currentY;
      scroll.lastTime = now;

      // Highlight active section on scroll
      let currentSection = "hero";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
    };

    // Defer scroll listener and initial progress styling to prevent state updates during mount phase
    const startTimeout = setTimeout(() => {
      window.addEventListener("scroll", tickScroll, { passive: true });
      tickScroll();
    }, 50);

    // Spawn Sparkles at target coordinates (Syntax/Code symbols)
    const spawnSparkles = (x: number, y: number, count: number, forceMultiplier: number) => {
      const sparkleColors = ["#10b981", "#34d399", "#a78bfa", "#e879f9", "#ffffff"];
      const codeSymbols = ["{ }", "( )", "< />", "[ ]", "=>", ";", "const", "fn", "</>", "&&", "||", "++"];
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.0 * forceMultiplier + 0.5;
        const maxLife = Math.random() * 40 + 20;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          size: Math.floor(Math.random() * 5 + 9), // Font size in px (9px to 14px)
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          alpha: 1,
          rotation: (Math.random() - 0.5) * 0.8,
          rotationSpeed: (Math.random() - 0.5) * 0.06,
          life: maxLife,
          maxLife,
          char: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        });
      }
    };

    // Main Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mouse = mouseRef.current;
      const scroll = scrollRef.current;

      // Scroll speed dampener
      scroll.velocity *= 0.95;
      const scrollVelAbs = Math.abs(scroll.velocity);

      // ── A. DRAW CANVAS PARTICLES ──
      particles.forEach((p) => {
        p.y -= scroll.velocity * 0.95 * p.size;
        p.y += p.vy;
        p.x += p.vx;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const swirlAngle = Math.atan2(dy, dx) + Math.PI / 2;
            const force = (maxDist - dist) / maxDist;
            
            p.vx += Math.cos(swirlAngle) * force * 0.15;
            p.vy += Math.sin(swirlAngle) * force * 0.15;

            if (dist < 40) {
              const pushAngle = Math.atan2(dy, dx);
              p.vx += Math.cos(pushAngle) * 0.5;
              p.vy += Math.sin(pushAngle) * 0.5;
            }

            p.alpha = Math.min(1, p.baseAlpha + force * 0.6);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.1;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.1;
        }

        p.vx *= 0.96;
        p.vy = p.vy * 0.98 + (-Math.random() * 0.1 - 0.05) * 0.02;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) {
          p.y = window.innerHeight;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.y > window.innerHeight) {
          p.y = 0;
          p.x = Math.random() * window.innerWidth;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.type === "star") {
          ctx.beginPath();
          const r = p.size * 2;
          ctx.moveTo(p.x, p.y - r);
          ctx.quadraticCurveTo(p.x, p.y, p.x + r, p.y);
          ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + r);
          ctx.quadraticCurveTo(p.x, p.y, p.x - r, p.y);
          ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - r);
          ctx.fill();
          
          // Fast star glow overlay
          ctx.globalAlpha = p.alpha * 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Core particle circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Soft outer glow overlay (faster than shadowBlur)
          ctx.globalAlpha = p.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // ── B. SPAWN SPARKLES ON MOUSE MOVEMENT AND SCROLLING ──
      const mouseMoveVel = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      
      if (mouse.active) {
        let spawnChance = 0.08 + mouseMoveVel * 0.15;
        if (scrollVelAbs > 0.1) {
          spawnChance += scrollVelAbs * 0.4;
        }

        if (Math.random() < spawnChance) {
          const spawnCount = Math.min(3, Math.ceil(scrollVelAbs * 5 + mouseMoveVel * 2));
          const force = 0.5 + scrollVelAbs * 2 + mouseMoveVel * 1.5;
          spawnSparkles(mouse.x, mouse.y, spawnCount, force);
        }
      } else if (scrollVelAbs > 0.3) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        
        if (Math.random() < scrollVelAbs * 0.3) {
          const wandX = window.innerWidth - 28;
          const wandY = window.innerHeight * 0.1 + (window.innerHeight * 0.8) * currentProgress;
          spawnSparkles(wandX, wandY, 1, scrollVelAbs * 0.8);
        }
      }

      // ── C. RENDER SPARKLES ──
      sparkles.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.rotation += s.rotationSpeed;
        s.life -= 1;
        s.alpha = Math.max(0, s.life / s.maxLife);

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        // Draw coding syntax text
        ctx.font = `bold ${s.size}px JetBrains Mono, var(--font-mono), monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.char, 0, 0);

        // Soft outer glowing duplicate text (very fast)
        ctx.globalAlpha = s.alpha * 0.25;
        ctx.font = `bold ${s.size + 3}px JetBrains Mono, var(--font-mono), monospace`;
        ctx.fillText(s.char, 0, 0);

        ctx.restore();
      });

      sparkles = sparkles.filter((s) => s.life > 0);

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(startTimeout);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", tickScroll);
    };
  }, []); // Empty dependency array -> canvas loop is persistent and never thrashes

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-40 select-none">
      {/* Canvas for Particles & Sparkle Trail */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* ── BACKGROUND PARALLAX BLOBS (Z-INDEX SHIFTED BEHIND CONTENT) ── */}
      <div className="absolute inset-0 -z-50 overflow-hidden pointer-events-none opacity-40">
        {/* Soft floating emerald blob */}
        <div
          ref={blob1Ref}
          className="absolute rounded-full w-[45vw] h-[45vw] blur-[140px] bg-emerald-500/5 transition-transform duration-300 ease-out"
          style={{
            top: "15%",
            left: "5%",
            transform: "translateY(0px)",
          }}
        />
        {/* Soft floating violet blob */}
        <div
          ref={blob2Ref}
          className="absolute rounded-full w-[40vw] h-[40vw] blur-[150px] bg-violet-500/5 transition-transform duration-300 ease-out"
          style={{
            bottom: "10%",
            right: "5%",
            transform: "translateY(0px)",
          }}
        />
      </div>

      {/* ── RIGHT-SIDE SCROLL PROGRESS INDICATOR (MAGICAL WAND) ── */}
      <div className="pointer-events-auto fixed right-4 top-[50%] z-50 flex -translate-y-[50%] flex-col items-center gap-1.5 md:right-7 max-sm:hidden">
        {/* Wand Top Tip */}
        <div className="h-1.5 w-1.5 rotate-45 border border-emerald-400 bg-neutral-950 opacity-40" />

        {/* Vertical track line */}
        <div className="relative h-[65vh] w-[1px] bg-white/5">
          {/* Active Progress fill line */}
          <div
            ref={progressFillRef}
            className="absolute top-0 w-[1px] bg-gradient-to-b from-violet-500 to-emerald-400"
            style={{ height: "0%" }}
          />

          {/* Magical Floating Orb / Crystal */}
          <div
            ref={orbRef}
            className="absolute left-1/2 h-3.5 w-3.5 -translate-x-[50%] -translate-y-[50%] rounded-full border border-emerald-400 bg-neutral-950 shadow-[0_0_12px_rgba(16,185,129,0.7)] transition-all duration-75"
            style={{
              top: "0%",
              background: `radial-gradient(circle at 35% 35%, #fff 0%, #10b981 60%, #064e3b 100%)`,
            }}
          />

          {/* Hover points for each section */}
          {SECTIONS.map((section, idx) => {
            const fraction = idx / (SECTIONS.length - 1);
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleScrollTo(section.id)}
                className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-1"
                style={{ top: `${fraction * 100}%` }}
              >
                {/* Dot */}
                <div
                  className={`h-1.5 w-1.5 rounded-full border border-transparent transition-all duration-300 group-hover:scale-125 group-hover:border-emerald-400 group-hover:bg-emerald-400 ${
                    isActive
                      ? "scale-110 border-emerald-400 bg-emerald-400 shadow-[0_0_8px_#10b981]"
                      : "bg-white/20"
                  }`}
                />

                {/* Section title hover badge (Slide in left) */}
                <div className="absolute right-6 scale-90 opacity-0 bg-[#0c0c14]/90 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider text-slate-300 pointer-events-none transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <span className="text-emerald-400 mr-1.5">✦</span>
                  {section.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Wand Bottom Tip */}
        <div className="h-1.5 w-1.5 rotate-45 border border-violet-400 bg-neutral-950 opacity-40" />
      </div>
    </div>
  );
}
