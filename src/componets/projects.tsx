"use client";

import { useState, useEffect, useRef } from "react";
import MagicalGlowReveal from "./magical-glow-reveal";

const PROJECTS = [
  {
    id: 1,
    address: "01",
    title: "AI Dev Assistant",
    description:
      "Built an AI-powered developer tool to explain, debug, and generate code, with integrated history storage for tracking past interactions. Integrated REST API routes in Next.js for secure AI communication. Implemented prompt-based actions (Explain, Debug, Generate) with real-time responses.",
    live: "request-demo",
    code: "request-details",
    isPrivate: true,
    metrics: [
      { value: "Groq API", label: "LLM integration" },
      { value: "Next.js REST", label: "Secure API routes" },
      { value: "React/Next", label: "Framework stack" },
    ],
    signal: "ai",
    accent: "#10b981", // brand accent light (emerald)
    bootLines: [
      "$ connecting to Groq API inference route...",
      "$ session restored from local history cache",
      "$ awaiting action (Explain / Debug / Generate)",
    ],
  },
  {
    id: 2,
    address: "02",
    title: "Client Admin Portal",
    description:
      "Developed a scalable and responsive admin dashboard using React.js and Next.js, ensuring smooth navigation and efficient data handling across modules. Built reusable and modular UI components with Tailwind CSS.",
    live: "request-walkthrough",
    code: "request-architecture",
    isProprietary: true,
    metrics: [
      { value: "Next.js", label: "Framework" },
      { value: "React.js", label: "Library" },
      { value: "Tailwind CSS", label: "Styling" },
    ],
    signal: "dashboard",
    accent: "#059669", // brand accent dark (emerald)
    bootLines: [
      "$ polling system metrics...",
      "$ server load nominal",
      "$ rendering live readout",
    ],
  },
  {
    id: 3,
    address: "03",
    title: "Banking Management System",
    description:
      "Designed and developed a secure core banking web application. Features multi-account support, real-time transaction ledger, transfer validation, and interactive financial dashboard analytics.",
    live: "request-demo",
    code: "request-details",
    isPrivate: true,
    metrics: [
      { value: "Next.js", label: "Framework" },
      { value: "React.js", label: "Library" },
      { value: "Tailwind CSS", label: "Styling" },
    ],
    signal: "banking",
    accent: "#10b981", // emerald green
    bootLines: [
      "$ initializing secure ledger connection...",
      "$ session authenticated via JWT token",
      "$ syncing transaction databases...",
    ],
  },
];

/* ---------- live readout sub-components ---------- */

function TypedBoot({ lines, accent }: { lines: string[]; accent: string }) {
  const [display, setDisplay] = useState<string[]>([]);

  useEffect(() => {
    setDisplay([]);
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let current = "";
    const built: string[] = [];

    function tick() {
      if (cancelled) return;
      if (lineIdx >= lines.length) return;
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        current = line.slice(0, charIdx);
        setDisplay([...built, current]);
        charIdx++;
        setTimeout(tick, 15 + Math.random() * 15);
      } else {
        built.push(line);
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 200);
      }
    }
    
    const startTimeout = setTimeout(tick, 50);
    
    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
    };
  }, [lines]);

  return (
    <div className="font-mono text-[11px] leading-relaxed text-[#8e9bb4] min-h-[54px] flex flex-col justify-end">
      {display.map((l, i) => (
        <div key={i} className="flex items-center gap-1">
          <span style={{ color: accent }}>{i === display.length - 1 ? "▸ " : "✓ "}</span>
          <span>{l}</span>
          {i === display.length - 1 && i < lines.length - 1 && (
            <span className="h-3 w-1.5 animate-pulse" style={{ backgroundColor: accent }} />
          )}
        </div>
      ))}
      {display.length === lines.length && (
        <div className="flex items-center gap-1">
          <span style={{ color: accent }}>▸</span>
          <span className="h-3 w-1.5 animate-pulse" style={{ backgroundColor: accent }} />
        </div>
      )}
    </div>
  );
}

function SignalTrace({ accent, seed }: { accent: string; seed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = seed * 13.7;
    let isIntersecting = false;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();

    function draw() {
      if (!isIntersecting || !canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Draw oscilloscope grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      
      const gridSpacing = 24;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Horizontal center reference axis line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      const points = 160;

      // Draw secondary out-of-phase wave (background glow)
      ctx.beginPath();
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * w;
        const n =
          Math.sin(i * 0.15 + t * 0.8) * 0.45 +
          Math.sin(i * 0.08 + t * 0.3) * 0.25;
        const y = h / 2 + n * (h * 0.28);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw primary analyzer wave
      ctx.beginPath();
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * w;
        const n =
          Math.sin(i * 0.18 + t) * 0.55 +
          Math.sin(i * 0.05 + t * 0.6) * 0.35 +
          Math.sin(i * 0.4 + t * 1.4) * 0.18;
        const y = h / 2 + n * (h * 0.32);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.globalAlpha = 1;
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
    };
  }, [accent, seed]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function AiReadout({ accent }: { accent: string }) {
  const codeLines = [
    "const Assistant = {",
    "  analyze: (code) => explain(code),",
    "  debug: (err) => resolve(err)",
    "};"
  ];
  
  const [typedLines, setTypedLines] = useState<string[]>([""]);
  
  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    const built = [""];
    
    function tick() {
      if (cancelled) return;
      if (lineIdx >= codeLines.length) return;
      const target = codeLines[lineIdx];
      
      if (charIdx <= target.length) {
        built[lineIdx] = target.slice(0, charIdx);
        setTypedLines([...built]);
        charIdx++;
        setTimeout(tick, 18);
      } else {
        built.push("");
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 120);
      }
    }
    
    const startDelay = setTimeout(tick, 700);
    
    return () => {
      cancelled = true;
      clearTimeout(startDelay);
    };
  }, []);

  return (
    <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6 sm:px-8">
      <div className="font-mono text-[10px] text-zinc-600">user.prompt</div>
      <div className="font-mono text-xs text-zinc-300">
        &gt; How do I optimize rendering performance in React?
      </div>
      
      <div className="font-mono text-[10px] text-zinc-600 mt-2">response.stream</div>
      <div className="rounded-lg border bg-zinc-950/60 p-3 font-mono text-[11px] text-zinc-300" style={{ borderColor: `${accent}25` }}>
        {typedLines.map((line, idx) => (
          <div key={idx} className="whitespace-pre">
            {line}
            {idx === typedLines.length - 1 && typedLines.length <= codeLines.length && (
              <span className="animate-pulse" style={{ color: accent }}>_</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardReadout({ accent }: { accent: string }) {
  const [heights, setHeights] = useState<number[]>([4, 6, 8, 5, 9, 12, 7, 10, 14, 11, 9, 13]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev =>
        prev.map(h => {
          const delta = (Math.random() - 0.5) * 2.2;
          const next = h + delta;
          return Math.max(3, Math.min(14, next));
        })
      );
    }, 110);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex h-full items-end gap-1.5 px-6 pb-8 sm:px-8 justify-between">
      {heights.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-100"
          style={{
            height: `${(v / 14) * 60}%`,
            background: `linear-gradient(to top, ${accent}15, ${accent})`,
            boxShadow: `0 0 8px ${accent}20`,
          }}
        />
      ))}
    </div>
  );
}

function PdfReadout({ accent }: { accent: string }) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 sm:px-8">
      <div className="relative h-24 w-16 rounded-sm border bg-zinc-950/50" style={{ borderColor: `${accent}33` }}>
        <div className="absolute inset-2 flex flex-col gap-1.5">
          <div className="h-1 w-3/4 rounded bg-zinc-800" />
          <div className="h-1 w-full rounded bg-zinc-800/60" />
          <div className="h-1 w-2/3 rounded bg-zinc-800/60" />
        </div>
        
        {/* Glowing sweep scanner */}
        <div
          className="absolute left-0 right-0 h-0.5 animate-[scan_2.5s_ease-in-out_infinite]"
          style={{ 
            background: accent, 
            boxShadow: `0 0 6px ${accent}, 0 0 10px ${accent}`
          }}
        />
      </div>
      <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: accent }}>
        injecting_page_breaks.pdf
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { top: 5%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
}

function BankingReadout({ accent }: { accent: string }) {
  const transactionTemplates = [
    { desc: "Stripe Payout", amount: "+$1,250.00", type: "credit" },
    { desc: "AWS Infrastructure", amount: "-$84.20", type: "debit" },
    { desc: "GitHub Sponsorship", amount: "+$50.00", type: "credit" },
    { desc: "Vercel Deployment", amount: "-$20.00", type: "debit" },
    { desc: "Figma Professional", amount: "-$15.00", type: "debit" },
    { desc: "Client Retainer", amount: "+$2,800.00", type: "credit" },
    { desc: "Google Cloud APIs", amount: "-$42.10", type: "debit" },
  ];

  const [txs, setTxs] = useState([
    { desc: "Client Retainer", amount: "+$2,800.00", type: "credit", id: 1 },
    { desc: "AWS Infrastructure", amount: "-$84.20", type: "debit", id: 2 },
    { desc: "GitHub Sponsorship", amount: "+$50.00", type: "credit", id: 3 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxs((prev) => {
        const nextId = Math.max(...prev.map((t) => t.id)) + 1;
        const template = transactionTemplates[Math.floor(Math.random() * transactionTemplates.length)];
        const newTx = { ...template, id: nextId };
        return [newTx, prev[0], prev[1]];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[9px] text-zinc-500 uppercase">Vault Balance</div>
          <div className="font-mono text-lg font-bold text-white tracking-tight mt-0.5">$18,452.12</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9px] text-zinc-500 uppercase">Ledger Status</div>
          <div className="font-mono text-[10px] font-semibold text-emerald-400 mt-0.5 animate-pulse">● SECURED</div>
        </div>
      </div>

      <div className="font-mono text-[9px] text-zinc-500 uppercase border-b border-zinc-800/60 pb-1">Real-time Activity</div>
      
      <div className="flex flex-col gap-1.5 overflow-hidden h-[120px]">
        {txs.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg border border-zinc-900 bg-zinc-950/60 p-2 font-mono text-[11px] transition-all duration-500 transform translate-y-0 opacity-100"
            style={{ borderColor: `${accent}15` }}
          >
            <div className="flex items-center gap-2">
              <span className={`text-[10px] ${tx.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
                {tx.type === "credit" ? "↓" : "↑"}
              </span>
              <span className="text-zinc-300 truncate max-w-[120px]">{tx.desc}</span>
            </div>
            <span className={`font-semibold ${tx.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadoutBody({
  type,
  accent,
}: {
  type: string;
  accent: string;
}) {
  if (type === "ai") {
    return <AiReadout accent={accent} />;
  }
  if (type === "dashboard") {
    return <DashboardReadout accent={accent} />;
  }
  if (type === "banking") {
    return <BankingReadout accent={accent} />;
  }
  return <PdfReadout accent={accent} />;
}

/* ---------- main section ---------- */

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  // Dispatches prefill events for form mapping
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, actionType: string) => {
    e.preventDefault();
    
    let message = "";
    if (project.isProprietary) {
      if (actionType === "live") {
        message = `Hi Satabdi, I'd like to request a demo/walkthrough of the "${project.title}" system.`;
      } else {
        message = `Hi Satabdi, I'm interested in the underlying technical architecture and design of your "${project.title}" project.`;
      }
    } else if (project.isPrivate) {
      if (actionType === "live") {
        message = `Hi Satabdi, I'd like to see a live demo of the "${project.title}" tool.`;
      } else {
        message = `Hi Satabdi, I am interested in requesting private codebase access or code details of the "${project.title}" repository.`;
      }
    }

    // Dispatch custom React event
    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: { message }
      })
    );

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0"
    >
      <div className="py-12 sm:py-16">
        {/* Header Title Row */}
        <div className="flex items-baseline justify-between border-b border-white/10 pb-5 mb-10">
          <div>
            <div className="font-sans text-[11px] tracking-[0.18em] text-[#8e9bb4] font-semibold uppercase">
              My Projects
            </div>
            <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-2">
              <span className="block text-white">
                <MagicalGlowReveal>Things I've</MagicalGlowReveal>
              </span>
              <span className="block text-outline-orange mt-1">
                <MagicalGlowReveal delay={150}>Built</MagicalGlowReveal>
              </span>
            </h3>
          </div>
        </div>

        {/* Project Tabs Grid (Full Width) */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {PROJECTS.map((p, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActive(idx)}
                className="group relative flex-1 overflow-hidden rounded-lg border px-4 py-3 text-left transition-all hover:scale-[1.01]"
                style={{
                  borderColor: isActive ? p.accent : "rgba(255,255,255,0.06)",
                  background: isActive ? `${p.accent}12` : "rgba(255,255,255,0.01)",
                  boxShadow: isActive ? `0 0 15px ${p.accent}10` : "none"
                }}
              >
                <div
                  className="font-sans text-[9px] tracking-wide uppercase font-semibold"
                  style={{ color: isActive ? p.accent : "#8e9bb4" }}
                >
                  Project {p.address}
                </div>
                <div
                  className="mt-0.5 truncate text-xs sm:text-[13px] font-semibold transition-colors"
                  style={{ color: isActive ? "#ffffff" : "#8e9bb4" }}
                >
                  {p.title}
                </div>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 h-[2px] w-full"
                    style={{ background: p.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[9fr_11fr] gap-10 items-start">
          
          {/* Left Column: Project Details */}
          <div className="flex flex-col gap-8">
            {/* Active Project Info */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-brand-accent-light font-semibold">
                  Project {project.address}
                </span>
                <h4 className="font-serif text-2xl font-semibold italic text-white md:text-3xl">
                  {project.title}
                </h4>
              </div>

              {/* Description copy */}
              <p className="text-sm leading-relaxed text-[#8e9bb4] sm:text-[15px]">
                {project.description}
              </p>

              {/* Highlights metrics readout grid */}
              <div className="mt-2 grid grid-cols-3 gap-3 w-full max-w-md">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-800 bg-badge-bg p-3 flex flex-col justify-between"
                    style={{
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = project.accent + "50";
                      e.currentTarget.style.boxShadow = `0 2px 10px ${project.accent}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans truncate">
                      {m.label}
                    </span>
                    <span
                      className="font-mono text-xs sm:text-sm font-bold mt-2"
                      style={{ color: project.accent }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA links (Gradient bordered & filled styles matching top menu / buttons) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Button */}
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, "live")}
                className="group cursor-pointer rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-0.5 hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-xs font-mono font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-emerald-600 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                  <span>{project.isProprietary ? "Request Walkthrough" : "Request Demo"}</span>
                </div>
              </a>

              {/* Secondary Button */}
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, "code")}
                className="group cursor-pointer rounded-lg bg-zinc-800 p-0.5 hover:scale-[1.02] hover:bg-zinc-700 transition-all"
              >
                <div className="flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-xs font-mono font-semibold text-[#8e9bb4] group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span>{project.isProprietary ? "Request Architecture" : "Request Source"}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Scope Panel */}
          <div className="overflow-hidden rounded-xl border border-white/10 magical-card-texture backdrop-blur-md w-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-neutral-950/60">
              <span className="font-mono text-[11px] text-[#8e9bb4]">
                {project.title.toLowerCase().replace(/\s+/g, "_")}.scope
              </span>
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] font-semibold"
                style={{ color: project.accent }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: project.accent, boxShadow: `0 0 6px ${project.accent}` }}
                />
                LIVE READOUT
              </span>
            </div>

            {/* Scope Graph + Readout content */}
            <div className="relative h-60 sm:h-72 bg-zinc-950/30 flex overflow-hidden">
              {/* Interactive Readout content panel */}
              <div className="relative z-10 h-full w-full sm:w-[60%] flex flex-col justify-center order-1">
                <ReadoutBody type={project.signal} accent={project.accent} />
              </div>

              {/* Oscilloscope Visualizer */}
              <div className="absolute inset-0 sm:relative sm:flex-1 h-full w-full sm:w-auto overflow-hidden opacity-10 sm:opacity-100 sm:border-l sm:border-white/10 bg-zinc-950/10 order-2">
                <SignalTrace accent={project.accent} seed={active} />
              </div>
            </div>

            {/* Boot log console */}
            <div className="border-t border-white/10 px-5 py-4 bg-neutral-950/40">
              <TypedBoot lines={project.bootLines} accent={project.accent} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

