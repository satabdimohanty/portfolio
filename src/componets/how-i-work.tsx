"use client";

import { useState } from "react";

const WORK_STEPS = [
  {
    num: "01",
    phase: "DEFINE",
    title: "Discover & Architect",
    desc: "Deconstruct requirements, outline data architecture, select the optimal stack, and design visual flows before writing any code.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    badge: "Planning Phase",
    metrics: ["System Schema", "User Journey", "Tech Choice"]
  },
  {
    num: "02",
    phase: "DESIGN",
    title: "Prototype & Polish",
    desc: "Draft clean layout patterns, define harmonious HSL color scales, size premium typography, and design engaging micro-interactions.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-2.235 2.236l-.075.298a1 1 0 01-1.94 0l-.075-.298a3 3 0 00-2.236-2.235l-.298-.075a1 1 0 010-1.94l.298-.075a3 3 0 002.235-2.236l.075-.298a1 1 0 011.94 0l.075.298a3 3 0 002.236 2.235l.298.075a1 1 0 010 1.94l-.298.075zM14.59 5.236a2 2 0 00-1.49 1.49l-.05.2a.667.667 0 01-1.294 0l-.05-.2a2 2 0 00-1.49-1.49l-.2-.05a.667.667 0 010-1.294l.2-.05a2 2 0 001.49-1.49l.05-.2a.667.667 0 011.294 0l.05.2a2 2 0 001.49 1.49l.2.05a.667.667 0 010 1.294l-.2.05zM21.25 9.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
      </svg>
    ),
    badge: "Visual System",
    metrics: ["Figma Layouts", "HSL Palette", "60 FPS Prototypes"]
  },
  {
    num: "03",
    phase: "BUILD",
    title: "Code & Refine",
    desc: "Develop modular, type-safe structures using Next.js, React 19, and Tailwind. Decouple side effects to guarantee high performance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    badge: "Implementation",
    metrics: ["Clean TypeScript", "State Decoupling", "Reusable Core"]
  },
  {
    num: "04",
    phase: "LAUNCH",
    title: "Validate & Deploy",
    desc: "Profile builds, run automated typechecks, audit accessibility constraints, optimize SEO, and ship seamlessly on Vercel.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.64 8.38a14.98 14.98 0 00-3.48 9.42M15.59 14.37a14.98 14.98 0 01-9.43 3.43m0 0a14.98 14.98 0 01-6.16-12.12A14.98 14.98 0 019.64 2.24m-3.48 9.56A14.98 14.98 0 009.64 8.38m-3.48 3.42a14.99 14.99 0 01-3.48-9.56m0 0A14.98 14.98 0 019.64 2.24" />
      </svg>
    ),
    badge: "Delivery",
    metrics: ["Performance Audit", "Semantic SEO", "Vercel Deploy"]
  }
];

export default function HowIWorkSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="workflow" className="mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0 scroll-mt-28">
      <div>
        {/* Workflow Gear Icon SVG */}
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-emerald-500 animate-[spin_10s_linear_infinite]"
        >
          <path
            d="M25 15C19.48 15 15 19.48 15 25C15 30.52 19.48 35 25 35C30.52 35 35 30.52 35 25C35 19.48 30.52 15 25 15ZM25 32C21.13 32 18 28.87 18 25C18 21.13 21.13 18 25 18C28.87 18 32 21.13 32 25C32 28.87 28.87 32 25 32Z"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path
            d="M25 10C24.17 10 23.5 10.67 23.5 11.5V13.1C20.6 13.6 18.1 15.1 16.3 17.2L15.1 16C14.5 15.4 13.5 15.4 12.9 16C12.3 16.6 12.3 17.6 12.9 18.2L14.1 19.4C12.6 21.2 11.6 23.4 11.2 25.8H9.5C8.67 25.8 8 26.47 8 27.3C8 28.13 8.67 28.8 9.5 28.8H11.2C11.6 31.2 12.6 33.4 14.1 35.2L12.9 36.4C12.3 37 12.3 38 12.9 38.6C13.5 39.2 14.5 39.2 15.1 38.6L16.3 37.4C18.1 39.5 20.6 41 23.5 41.5V43.1C23.5 43.93 24.17 44.6 25 44.6C25.83 44.6 26.5 43.93 26.5 43.1V41.5C29.4 41 31.9 39.5 33.7 37.4L34.9 38.6C35.5 39.2 36.5 39.2 37.1 38.6C37.7 38 37.7 37 37.1 36.4L35.9 35.2C37.4 33.4 38.4 31.2 38.8 28.8H40.5C41.33 28.8 42 28.13 42 27.3C42 26.47 41.33 25.8 40.5 25.8H38.8C38.4 23.4 37.4 21.2 35.9 19.4L37.1 18.2C37.7 17.6 37.7 16.6 37.1 16C36.5 15.4 35.5 15.4 34.9 16L33.7 17.2C31.9 15.1 29.4 13.6 26.5 13.1V11.5C26.5 10.67 25.83 10 25 10Z"
            fill="currentColor"
          />
        </svg>
        <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-4">
          <span className="block text-white">How I</span>
          <span className="block text-outline-orange mt-1">Work</span>
        </h3>
        <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
          My software development lifecycle is structured around high standards of predictability, performance optimization, and refined typography.
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Glow Line Connector (Desktop only) */}
        <div className="absolute top-[35%] left-6 right-6 h-[1px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/30 to-emerald-500/10 pointer-events-none hidden lg:block -z-10" />

        {WORK_STEPS.map((step, idx) => {
          const isHovered = activeStep === idx;

          return (
            <div
              key={step.num}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(9,9,11,0.8) 0%, rgba(17,18,22,0.8) 100%)",
              }}
            >
              {/* Scanline pattern on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Radial glow focus */}
              <div
                className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 blur-[20px] rounded-full pointer-events-none transition-opacity duration-300"
                style={{ opacity: isHovered ? 1 : 0 }}
              />

              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    PHASE {step.num}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
                    {step.badge}
                  </span>
                </div>

                {/* Step Title & Icon */}
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-500 group-hover:border-emerald-500/30 transition-colors">
                    {step.icon}
                  </div>
                  <h4 className="text-white font-sans font-bold text-base leading-snug">
                    {step.title}
                  </h4>
                </div>

                {/* Step Description */}
                <p className="text-zinc-350 text-xs sm:text-[13px] leading-relaxed mt-4">
                  {step.desc}
                </p>
              </div>

              {/* Sub-Metrics Details */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-col gap-1.5">
                  {step.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400/70 transition-colors shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Outline Background Step Number */}
              <div className="absolute right-4 bottom-2 text-6xl font-black text-white/[0.02] select-none font-mono pointer-events-none group-hover:text-white/[0.04] transition-colors duration-300">
                {step.num}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
