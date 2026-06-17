"use client";

import { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText("satabdimohanty24@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("9348821278");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    };
    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    // Constellation Grid Nodes
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 1,
    }));

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, width, height);

      const mouse = gridRef.current
        ? {
            x: parseFloat(gridRef.current.style.getPropertyValue("--mx-raw") || "-1000"),
            y: parseFloat(gridRef.current.style.getPropertyValue("--my-raw") || "-1000"),
          }
        : { x: -1000, y: -1000 };

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Magnet attraction
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            node.vx += (dx / dist) * force * 0.015;
            node.vy += (dy / dist) * force * 0.015;
          }
        }

        // Damp velocity
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.6) {
          node.vx = (node.vx / speed) * 0.6;
          node.vy = (node.vy / speed) * 0.6;
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const next = nodes[j];
          const dx = node.x - next.x;
          const dy = node.y - next.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse lightning links
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = ((160 - dist) / 160) * 0.22;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    el.style.setProperty("--mx", `${xp}%`);
    el.style.setProperty("--my", `${yp}%`);
    el.style.setProperty("--mx-raw", `${x}`);
    el.style.setProperty("--my-raw", `${y}`);
  };

  const handleMouseLeave = () => {
    const el = gridRef.current;
    if (el) {
      el.style.setProperty("--mx-raw", "-1000");
      el.style.setProperty("--my-raw", "-1000");
    }
  };

  return (
    <div className="bg-neutral-950 text-zinc-300">
      <section
        id="contact"
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="animating-gradient-border-wrapper mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_25px_rgba(16,185,129,0.08)]"
      >
        <div className="animating-gradient-border-inner rounded-[inherit] px-5 py-8 md:py-10 lg:px-8">
          {/* Interactive Constellation Node Grid */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

          {/* Breathing ambient glow bg */}
          <div className="animating-ambient-glow -z-10" />

          <div className="absolute inset-0 bg-[#020a07] -z-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,255,140,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,255,140,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,140,0.08),transparent_70%)]" />
          </div>

          {/* Hover-reactive glow grid, masked to a radius around the cursor */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(249,115,22,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,115,22,0.25) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              WebkitMaskImage:
                "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), black, transparent)",
              maskImage:
                "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), black, transparent)",
            }}
          />

          {/* Soft ambient glow that follows the cursor */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"
            style={{
              background:
                "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(249,115,22,0.06), transparent 70%)",
            }}
          />

          {/* Edge fade so the grid doesn't hard-cut at the section bounds */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.9) 100%)",
            }}
          />

          {/* Content wrapper, constrained narrower than the 5xl bg for readability */}
          <div className="relative mx-auto max-w-4xl text-center flex flex-col items-center z-20">
          {/* Top diagonal arrow SVG */}
          <div className="mb-3 animate-bounce">
            <svg
              width="36"
              height="36"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand-accent-light"
            >
              <path d="M10 31L31 10M31 10H14M31 10V27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Heading & Subtitle */}
          <h3 className="font-syne text-3xl font-extrabold leading-none tracking-tight md:text-4xl uppercase">
            <span className="block text-white">It's time to talk!</span>
            <span className="block text-outline-orange mt-1.5">Contact me</span>
          </h3>

          <p className="mt-2.5 text-zinc-400 max-w-md text-xs md:text-sm leading-relaxed">
            I'm always open to discussing frontend engineering opportunities, web layout designs, or project collaborations. Drop me a line!
          </p>

          {/* Connection Hub Cards Layout */}
          <div className="mt-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Email Connection Hub Card */}
            <div
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/65 backdrop-blur-md p-4 md:p-5 shadow-xl relative overflow-hidden flex flex-col sm:flex-row md:flex-col items-center justify-between md:justify-between gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
            >
              {/* Radial glow focus */}
              <div className="absolute -left-10 -top-10 w-28 h-28 bg-brand-accent-light/5 blur-[25px] rounded-full pointer-events-none" />

              {/* Email link with envelope icon */}
              <div className="flex items-center md:flex-col gap-3 md:gap-2.5 w-full sm:w-auto md:w-full relative z-10">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left md:text-center w-full">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent-light font-bold block mb-1">
                    [EMAIL CHANNEL] • ACTIVE
                  </span>
                  <a
                    href="mailto:satabdimohanty24@gmail.com"
                    className="font-mono text-xs lg:text-sm tracking-wide text-zinc-100 hover:text-emerald-400 transition-colors break-all"
                  >
                    satabdimohanty24@gmail.com
                  </a>
                </div>
              </div>

              {/* Clipboard copy button */}
              <button
                onClick={copyEmail}
                className={`relative z-10 w-full sm:w-auto md:w-full flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-all select-none cursor-pointer ${
                  copied
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-105"
                    : "bg-neutral-950 border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                }`}
              >
                {copied ? (
                  <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
                <span>{copied ? "Copied! ✦" : "Copy Email"}</span>
              </button>
            </div>

            {/* Phone Connection Hub Card */}
            <div
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/65 backdrop-blur-md p-4 md:p-5 shadow-xl relative overflow-hidden flex flex-col sm:flex-row md:flex-col items-center justify-between md:justify-between gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
            >
              {/* Radial glow focus */}
              <div className="absolute -left-10 -top-10 w-28 h-28 bg-brand-accent-light/5 blur-[25px] rounded-full pointer-events-none" />

              {/* Phone link with telephone receiver icon */}
              <div className="flex items-center md:flex-col gap-3 md:gap-2.5 w-full sm:w-auto md:w-full relative z-10">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left md:text-center w-full">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent-light font-bold block mb-1">
                    [VOICE CHANNEL] • AVAILABLE
                  </span>
                  <a
                    href="tel:+919348821278"
                    className="font-mono text-xs lg:text-sm tracking-wide text-zinc-100 hover:text-emerald-400 transition-colors break-all"
                  >
                    +91 93488 21278
                  </a>
                </div>
              </div>

              {/* Clipboard copy button */}
              <button
                onClick={copyPhone}
                className={`relative z-10 w-full sm:w-auto md:w-full flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-all select-none cursor-pointer ${
                  copiedPhone
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-105"
                    : "bg-neutral-950 border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                }`}
              >
                {copiedPhone ? (
                  <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
                <span>{copiedPhone ? "Copied! ✦" : "Copy Number"}</span>
              </button>
            </div>

            {/* Resume Connection Hub Card */}
            <div
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/65 backdrop-blur-md p-4 md:p-5 shadow-xl relative overflow-hidden flex flex-col sm:flex-row md:flex-col items-center justify-between md:justify-between gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
            >
              {/* Radial glow focus */}
              <div className="absolute -left-10 -top-10 w-28 h-28 bg-brand-accent-light/5 blur-[25px] rounded-full pointer-events-none" />

              {/* Resume link with document icon */}
              <div className="flex items-center md:flex-col gap-3 md:gap-2.5 w-full sm:w-auto md:w-full relative z-10">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left md:text-center w-full">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent-light font-bold block mb-1">
                    [RESUME CHANNEL] • VERIFIED PDF
                  </span>
                  <a
                    href="/resume/SATABDI_MOHANTY.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs lg:text-sm tracking-wide text-zinc-100 hover:text-emerald-400 transition-colors break-all"
                  >
                    SATABDI_MOHANTY_CV.pdf
                  </a>
                </div>
              </div>

              {/* Download button */}
              <a
                href="/resume/SATABDI_MOHANTY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full sm:w-auto md:w-full flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-mono font-semibold bg-neutral-950 border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all select-none"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Social Buttons Section */}
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {[
              {
                title: "GitHub",
                href: "https://github.com/satabdimohanty",
                icon: (
                  <svg className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "LinkedIn",
                href: "https://www.linkedin.com/in/satabdi-mohanty-561649218/",
                icon: (
                  <svg className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                )
              }
            ].map((social) => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-emerald-500/30 hover:bg-zinc-900/40 p-[1px] hover:scale-[1.03] transition-all"
              >
                <div className="flex items-center justify-center gap-2 rounded-xl bg-badge-bg/40 px-5 py-2.5 text-xs font-mono font-semibold text-zinc-300 group-hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.04)] transition-all">
                  {social.icon}
                  <span>{social.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        </div> {/* closes animating-gradient-border-inner */}
      </section>

      {/* Styled Portfolio Footer */}
      <footer className="mx-auto mt-12 max-w-5xl px-6 pb-20 md:mt-20 lg:px-0 border-t border-zinc-800 pt-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:gap-12">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Crafted By</span>
              <a href="https://github.com/satabdimohanty" className="font-serif text-lg font-normal italic text-white hover:text-brand-accent-light transition-colors">
                Satabdi Mohanty
              </a>
            </div>

            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Crafted Using</span>
              <div className="font-serif text-lg font-normal italic text-zinc-300">
                <a href="https://nextjs.org" className="text-white hover:text-brand-accent-light transition-colors" target="_blank" rel="noreferrer">Next.js</a>,{" "}
                <a href="https://typescriptlang.org" className="text-white hover:text-brand-accent-light transition-colors" target="_blank" rel="noreferrer">TypeScript</a>,{" "}
                <a href="https://tailwindcss.com" className="text-white hover:text-brand-accent-light transition-colors" target="_blank" rel="noreferrer">Tailwind CSS</a>
              </div>
            </div>
          </div>

          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-850 px-4 py-2 hover:bg-zinc-800 transition-colors text-xs text-zinc-300"
          >
            <span>Proudly Hosted on Vercel</span>
            <svg width="12" height="12" viewBox="0 0 116 100" fill="currentColor" className="text-white">
              <path d="M57.5 0L115 100H0L57.5 0Z" />
            </svg>
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-zinc-900 pt-6 text-xs text-zinc-400">
          <p className="font-mono">
            © 2026 Satabdi Mohanty. All rights reserved.
          </p>
          <p className="text-zinc-500">
            This site and its content is licensed under{" "}
            <a href="http://creativecommons.org/licenses/by-nc-nd/4.0" target="_blank" rel="license noopener noreferrer" className="underline hover:text-zinc-350 transition-colors">
              CC BY-NC-ND 4.0
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}