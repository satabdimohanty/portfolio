"use client";

import { useState } from "react";

const WORK_STEPS = [
  {
    id: "define",
    num: "01",
    phase: "DEFINE",
    title: "Discover & Architect",
    desc: "Deconstruct requirements, map application states, select the optimal stack, and design visual flows before writing any code.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    badge: "Planning Phase",
    metrics: ["System Schema", "User Journey", "Tech Choice"]
  },
  {
    id: "layout",
    num: "02",
    phase: "STRUCTURE",
    title: "Component & Layout Specs",
    desc: "Translate mockups into modular component props, plan React hierarchies, configure Tailwind layout systems, and write types.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-2.235 2.236l-.075.298a1 1 0 01-1.94 0l-.075-.298a3 3 0 00-2.236-2.235l-.298-.075a1 1 0 010-1.94l.298-.075a3 3 0 002.235-2.236l.075-.298a1 1 0 011.94 0l.075.298a3 3 0 002.236 2.235l.298.075a1 1 0 010 1.94l-.298.075zM14.59 5.236a2 2 0 00-1.49 1.49l-.05.2a.667.667 0 01-1.294 0l-.05-.2a2 2 0 00-1.49-1.49l-.2-.05a.667.667 0 010-1.294l.2-.05a2 2 0 001.49-1.49l.05-.2a.667.667 0 011.294 0l.05.2a2 2 0 001.49 1.49l.2.05a.667.667 0 010 1.294l-.2.05zM21.25 9.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
      </svg>
    ),
    badge: "Layout Architecture",
    metrics: ["Component Props", "Tailwind Grids", "TS Type Definitions"]
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

function StepVisualizer({ activeIdx, accent }: { activeIdx: number; accent: string }) {
  if (activeIdx === 0) {
    return (
      <div className="flex flex-col w-full gap-4 font-mono text-[11px] text-zinc-400 animate-[fadeInUp_0.3s_ease_forwards]">
        <div className="border-b border-zinc-900 pb-2">
          <span className="text-[10px] text-emerald-400 block font-bold">[ARCHITECTURAL_SCHEMA.txt]</span>
          <span className="text-[9px] text-zinc-600">Generated Project Map</span>
        </div>
        <div className="space-y-1.5 leading-relaxed text-zinc-300 bg-zinc-950/50 p-4 rounded-lg border border-zinc-900/60 shadow-inner">
          <div className="flex gap-2"><span className="text-zinc-600">1</span> <span>project-root/</span></div>
          <div className="flex gap-2"><span className="text-zinc-600">2</span> <span>├── app/ <span className="text-zinc-600"># Next.js App Router (SSR, Metadata)</span></span></div>
          <div className="flex gap-2"><span className="text-zinc-600">3</span> <span>├── src/</span></div>
          <div className="flex gap-2"><span className="text-zinc-600">4</span> <span>│   ├── components/ <span className="text-zinc-600"># Pure React, reusable hooks</span></span></div>
          <div className="flex gap-2"><span className="text-zinc-600">5</span> <span>│   └── hooks/ <span className="text-zinc-600"># Custom state / event controllers</span></span></div>
          <div className="flex gap-2"><span className="text-zinc-600">6</span> <span>└── api/ <span className="text-zinc-600"># Decoupled REST routes for secure payloads</span></span></div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-zinc-900 border border-zinc-800 text-[10px] px-2 py-0.5 rounded text-zinc-500">System Schema</span>
          <span className="bg-zinc-900 border border-zinc-800 text-[10px] px-2 py-0.5 rounded text-zinc-500">User Journey Map</span>
          <span className="bg-zinc-900 border border-zinc-800 text-[10px] px-2 py-0.5 rounded text-zinc-500">Next.js App Router Setup</span>
        </div>
      </div>
    );
  }
  if (activeIdx === 1) {
    return (
      <div className="flex flex-col w-full gap-4 font-mono text-[11px] text-zinc-400 animate-[fadeInUp_0.3s_ease_forwards]">
        <div className="border-b border-zinc-900 pb-2">
          <span className="text-[10px] text-emerald-400 block font-bold">[CardComponent.types.ts]</span>
          <span className="text-[9px] text-zinc-600">TypeScript Interface & Layout Spec</span>
        </div>
        
        <div className="space-y-1 leading-relaxed text-zinc-300 bg-zinc-950/50 p-4 rounded-lg border border-zinc-900/60 shadow-inner">
          <div><span className="text-violet-400">interface</span> <span className="text-blue-400">CardProps</span> &#123;</div>
          <div className="pl-4">title: <span className="text-emerald-400">string</span>;</div>
          <div className="pl-4">variant: <span className="text-emerald-400">'default' | 'interactive'</span>;</div>
          <div className="pl-4">onSelect?: () =&gt; <span className="text-violet-400">void</span>;</div>
          <div>&#125;</div>
        </div>

        <div className="flex flex-col gap-1.5 mt-2 bg-zinc-950/20 p-2.5 rounded border border-zinc-900 font-sans text-xs">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Tailwind Spacing Spec</span>
          <div className="text-zinc-300 font-mono text-[10.5px]">
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;
          </div>
        </div>
      </div>
    );
  }
  if (activeIdx === 2) {
    return (
      <div className="flex flex-col w-full gap-4 font-mono text-[11px] text-zinc-400 animate-[fadeInUp_0.3s_ease_forwards]">
        <div className="border-b border-zinc-900 pb-2">
          <span className="text-[10px] text-emerald-400 block font-bold">[useOptimalState.ts]</span>
          <span className="text-[9px] text-zinc-600">Clean Decoupled Custom Hook</span>
        </div>
        <div className="space-y-1 leading-relaxed text-zinc-300 bg-zinc-950/50 p-4 rounded-lg border border-zinc-900/60 shadow-inner">
          <div><span className="text-violet-400">export function</span> <span className="text-blue-400">useOptimalState</span>&lt;<span className="text-sky-300">T</span>&gt;(initialVal: T) &#123;</div>
          <div className="pl-4"><span className="text-violet-400">const</span> [state, setState] = useState(initialVal);</div>
          <div className="text-zinc-500 pl-4">// Decouple side-effects from component tree</div>
          <div className="pl-4">useEffect(() =&gt; &#123;</div>
          <div className="pl-8"><span className="text-violet-400">const</span> logged = performAuditMetrics(state);</div>
          <div className="pl-8"><span className="text-violet-400">if</span> (logged.latency &gt; <span className="text-orange-400">16</span>) optimizeLayoutRef();</div>
          <div className="pl-4">&#125;, [state]);</div>
          <div className="pl-4"><span className="text-violet-400">return</span> [state, setState] <span className="text-violet-400">as const</span>;</div>
          <div>&#125;</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-4 font-mono text-[11px] text-zinc-400 animate-[fadeInUp_0.3s_ease_forwards]">
      <div className="border-b border-zinc-900 pb-2">
        <span className="text-[10px] text-emerald-400 block font-bold">[VERCEL_DEPLOYMENT_LOG.log]</span>
        <span className="text-[9px] text-zinc-600">Production Build Metrics</span>
      </div>
      
      <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-900/60 shadow-inner space-y-1">
        <div className="text-zinc-500">$ next build</div>
        <div className="text-zinc-300">✓ Creating an optimized production build</div>
        <div className="text-zinc-300">✓ Compiled client and server templates successfully</div>
        <div className="text-zinc-300">✓ First Load JS Shared: 72.4 kB</div>
        <div className="text-emerald-400 font-bold mt-2">✔ Deployment to Vercel production edge routing active</div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mt-1 text-[10px]">
        <div className="border border-emerald-950 bg-[#082a20]/10 text-emerald-400 rounded p-1">
          <div className="font-bold text-xs">99</div>
          <div className="text-[8px] text-zinc-500 mt-0.5">PERFORMANCE</div>
        </div>
        <div className="border border-emerald-950 bg-[#082a20]/10 text-emerald-400 rounded p-1">
          <div className="font-bold text-xs">100</div>
          <div className="text-[8px] text-zinc-500 mt-0.5">ACCESSIBILITY</div>
        </div>
        <div className="border border-emerald-950 bg-[#082a20]/10 text-emerald-400 rounded p-1">
          <div className="font-bold text-xs">100</div>
          <div className="text-[8px] text-zinc-500 mt-0.5">SEO</div>
        </div>
      </div>
    </div>
  );
}

export default function HowIWorkSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="workflow" className="relative mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0 scroll-mt-28">
      {/* Subtle Background Grid & Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }} 
        />
        <div 
          className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)" }} 
        />
      </div>

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

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-8 items-stretch">
        {/* Left Column: Vertical Steppers Wrapper Panel */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md p-5 md:p-6 shadow-xl flex flex-col gap-3">
          {WORK_STEPS.map((step, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex items-start gap-4 rounded-xl p-4 text-left transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-zinc-950/70 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.03)]"
                    : "bg-transparent border-transparent hover:bg-zinc-900/20 hover:border-zinc-800/40"
                }`}
              >
                {/* Active side highlighter bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-emerald-500 rounded-r" />
                )}

                <div className={`p-2 rounded-lg border transition-all duration-300 shrink-0 ${
                  isActive ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]" : "bg-zinc-950 border-zinc-900 text-zinc-500"
                }`}>
                  {step.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      PHASE {step.num}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 font-semibold">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className={`font-sans font-bold text-sm mt-2 transition-colors ${
                    isActive ? "text-white" : "text-zinc-450 group-hover:text-zinc-350"
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs mt-1.5 leading-relaxed transition-colors ${
                    isActive ? "text-zinc-350" : "text-zinc-500"
                  }`}>
                    {step.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Visual Showcase Panel */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md p-6 md:p-8 shadow-xl flex flex-col justify-center h-full min-h-[340px] relative">
          <StepVisualizer activeIdx={activeIdx} accent="#10b981" />
        </div>
      </div>
    </section>
  );
}
