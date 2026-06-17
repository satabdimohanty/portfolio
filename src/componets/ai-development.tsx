"use client";

import { useState, useEffect, useRef } from "react";

const TOOLS = [
  {
    id: "copilot",
    name: "GitHub Copilot",
    fileName: "copilot_autocomplete.ts",
    tag: "Autocomplete",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2a10 10 0 0 0-10 10c0 3.5.8 4.7 1.5 5.5v2.5a2 2 0 0 0 2 2h3v-2h-3v-1.5c-1-.7-1.5-1.5-1.5-4a8 8 0 1 1 16 0c0 2.5-.5 3.3-1.5 4v1.5h-3v2h3a2 2 0 0 0 2-2v-2.5c.7-.8 1.5-2 1.5-5.5A10 10 0 0 0 12 2zm-3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
      </svg>
    ),
    description: "Speeds up boilerplate code creation, completes repetitive functions, and matches syntax instantly.",
    howIUseIt: "I use Copilot to write repetitive JSX structures, map arrays, and generate clean boilerplate handlers directly inline.",
    keyBenefits: [
      "Eliminates repetitive manual typing for boilerplate elements",
      "Matches syntax patterns immediately for faster component mockups"
    ],
    impact: "+35% coding speed on standard frontend layouts"
  },
  {
    id: "cursor",
    name: "Cursor AI",
    fileName: "cursor_refactor.tsx",
    tag: "Semantic Editor",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.64 21.97l-3.23-7.54-5.38 5.38V2l15.07 15.07h-6.46l3.23 7.54-3.23 1.36z" />
      </svg>
    ),
    description: "Indexes the local workspace, handles multi-file refactoring instructions, and tracks active project context.",
    howIUseIt: "I leverage Cursor's codebase indexing to execute multi-file edits, automatically refactor layout imports, and navigate large files.",
    keyBenefits: [
      "Performs semantic search across the entire project structure",
      "Executes complex, code-wide refactoring loops safely"
    ],
    impact: "-50% time spent on global codebase refactoring tasks"
  },
  {
    id: "claude",
    name: "Claude AI",
    fileName: "architecture_review.md",
    tag: "Logic & Architecture",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.5,14a5.5,5.5,0,0,1-7.78,0,5.5,5.5,0,0,1,0-7.78,5.5,5.5,0,0,1,7.78,0c.2.2.3.4.1.6l-.8.8c-.1.1-.3.1-.4-.1a3.8,3.8,0,0,0-5.38,0,3.8,3.8,0,0,0,0,5.38,3.8,3.8,0,0,0,5.38,0c.1-.1.3-.1.4.1l.8.8C17.8,16.2,17.7,16.4,17.5,14Z" />
      </svg>
    ),
    description: "Acts as a technical architect to design code flows, formulate algorithms, and explain database routing loops.",
    howIUseIt: "I query Claude to draft structured layout loops, design clean API routing architecture, and perform thorough code standard reviews.",
    keyBenefits: [
      "Provides sound reasoning for complex state-sync challenges",
      "Identifies optimal performance cycles for API data loops"
    ],
    impact: "High standard compliance and zero logic design bottlenecks"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    fileName: "chatgpt_debugging.py",
    tag: "Chat Assistant",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21.3,10.06a3.7,3.7,0,0,0-.87-2.45,3.78,3.78,0,0,0-2.53-1.42A3.8,3.8,0,0,0,15,5.63a3.67,3.67,0,0,0-1-.13,3.79,3.79,0,0,0-3-1.5,3.72,3.72,0,0,0-2.62,1A3.76,3.76,0,0,0,7.1,7.44a3.79,3.79,0,0,0-3,1.5A3.75,3.75,0,0,0,3,11.56a3.7,3.7,0,0,0,.87,2.45,3.78,3.78,0,0,0,2.53,1.42A3.8,3.8,0,0,0,9,16.37a3.67,3.67,0,0,0,1,.13,3.79,3.79,0,0,0,3,1.5,3.72,3.72,0,0,0,2.62-1,3.76,3.76,0,0,0,1.28-2.44,3.79,3.79,0,0,0,3-1.5A3.75,3.75,0,0,0,21,10.44C21,10.31,21.3,10.06,21.3,10.06ZM12,18a1.64,1.64,0,0,1-.83-.22L8.52,16.14a.2.2,0,0,1-.1-.17V12.16a.2.2,0,0,1,.1-.17l2.65-1.53A1.64,1.64,0,0,1,12.83,12l2.65,1.53a.2.2,0,0,1,.1.17v3.81a.2.2,0,0,1-.1.17l-2.65,1.53A1.64,1.64,0,0,1,12,18ZM6.24,14.68a1.64,1.64,0,0,1,0-.86L7.91,10.9a.2.2,0,0,1,.17-.1h3.81a.2.2,0,0,1,.17.1L13.59,12.43a1.64,1.64,0,0,1-.83,2.18L10.11,16.14a.2.2,0,0,1-.17,0L7.07,14.68A1.64,1.64,0,0,1,6.24,14.68ZM9.11,7.86a1.64,1.64,0,0,1,.83-.64L12.59,6.07a.2.2,0,0,1,.17,0L15.41,7.22a.2.2,0,0,1,.1.17V11.2a.2.2,0,0,1-.1.17L12.77,12.9a1.64,1.64,0,0,1-1.54,0L8.58,11.37a.2.2,0,0,1-.1-.17V8.5A1.64,1.64,0,0,1,9.11,7.86ZM17.76,9.32a1.64,1.64,0,0,1,0,.86L16.09,13.1a.2.2,0,0,1-.17.1H12.11a.2.2,0,0,1-.17-.1L10.41,11.57a1.64,1.64,0,0,1,.83-2.18l2.65-1.53a.2.2,0,0,1,.17,0L16.93,9.32A1.64,1.64,0,0,1,17.76,9.32ZM14.89,16.14a1.64,1.64,0,0,1-.83.64L11.41,17.93a.2.2,0,0,1-.17,0L8.59,16.78a.2.2,0,0,1-.1-.17V12.8a.2.2,0,0,1,.1-.17L11.23,11.1a1.64,1.64,0,0,1,1.54,0l2.65,1.53a.2.2,0,0,1,.1.17v2.7a1.64,1.64,0,0,1-.63.64Z" />
      </svg>
    ),
    description: "Acts as a conversational paired debugging companion, helps draft unit tests, and explains trace errors.",
    howIUseIt: "I consult ChatGPT for explaining edge-case compilation errors, generating clean mock payloads, and building unit tests.",
    keyBenefits: [
      "Explains complex stack traces and browser compilation bugs instantly",
      "Creates robust mock data sets for local frontend testing layouts"
    ],
    impact: "-40% time spent looking up obscure framework error codes"
  },
  {
    id: "debug",
    name: "AI Debugging Tools",
    fileName: "debugger_terminal.log",
    tag: "Error Analysis",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
    description: "Deciphers visual stack traces, catches memory leak loops, and automates boundary fixes for responsive layouts.",
    howIUseIt: "I run terminal-based debugging tools to automatically trace layout overflows, catch memory leaks, and deploy fast responsive visual patches.",
    keyBenefits: [
      "Speeds up response testing cycles across varying viewport sizes",
      "Enforces a strict zero-bug visual layout policy on production routes"
    ],
    impact: "Zero layout overflow errors and clean visual alignment scores"
  }
];

const LINT_ERROR_TEXT = `[COMPILER WARN] e:/portfolio/project01/src/componets/navbar.tsx:75
Property 'onClick' does not exist on type 'ImageProps'.
Did you mean to wrap the image inside a clickable link container?

[STACK TRACE]
  ↳ renderNavbar (src/componets/navbar.tsx:75)
  ↳ Header (src/componets/navbar.tsx:15)`;

const PATCH_SUCCESS_TEXT = `[COMPILER PATCH] Auto-resolved onClick target binding:
- <img src="/logo.svg" onClick={handleClick} />
+ <a onClick={handleClick} className="cursor-pointer">
+   <img src="/logo.svg" alt="Logo" />
+ </a>

[SYSTEM BUILD] Production bundle successfully built (100% type-safe).`;

export default function AIDevelopmentSection() {
  const [activeTab, setActiveTab] = useState("copilot");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  // Trigger brief simulator loading animation when swapping tabs
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const activeTool = TOOLS.find((t) => t.id === activeTab) || TOOLS[0];

  return (
    <section id="ai-assisted" className="mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0">
      <div className="relative mb-12">
        {/* Sparkles Icon SVG */}
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-emerald-500 animate-[spin_10s_linear_infinite]"
        >
          <path d="M25 0L28 17L45 20L28 23L25 40L22 23L5 20L22 17L25 0Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-4">
          <span className="block text-white">AI-Assisted</span>
          <span className="block text-outline-orange mt-1">Development</span>
        </h3>
        <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Integrating next-generation artificial intelligence directly into the engineering workflow, replacing manual paired operations with dynamic code agents.
        </p>
      </div>

      {/* ── Paired-Programming IDE Simulator Frame ── */}
      <div className="w-full rounded-2xl border border-zinc-800 bg-[#05110c]/85 shadow-[0_15px_40px_rgba(2,24,18,0.5)] overflow-hidden flex flex-col md:grid md:grid-cols-[250px_1fr] h-[680px] md:h-[550px] lg:h-[520px]">
        
        {/* Left Side: Sidebar File Explorer */}
        <div className="border-b md:border-b-0 md:border-r border-zinc-800 bg-[#030d09]/95 p-4 flex flex-col justify-between select-none">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
              AI ASSISTANTS
            </div>
            
            <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0 scrollbar-none">
              {TOOLS.map((tool) => {
                const isActive = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500/30 text-white shadow-lg shadow-emerald-500/10"
                        : "bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                    }`}
                  >
                    <span className={`${isActive ? "text-white" : "text-emerald-500"}`}>
                      {tool.logo}
                    </span>
                    <div className="hidden md:block">
                      <div className="text-xs font-sans font-semibold tracking-tight leading-none">
                        {tool.name}
                      </div>
                      <div className="text-[8px] font-mono opacity-75 mt-0.5 leading-none">
                        {tool.tag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Tool Meta Summary */}
          <div className="hidden md:block border-t border-zinc-850 pt-4 mt-4 text-[11px]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-300 block mb-1">
              Paired Focus
            </span>
            <p className="text-zinc-300 leading-relaxed font-sans">
              {activeTool.description}
            </p>
          </div>
        </div>

        {/* Right Side: Code Editor & Info Inspector Workspace */}
        <div className="flex flex-col flex-grow bg-zinc-950/60 overflow-hidden relative">
          
          {/* Header tabs bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-[#030d09]/40 px-4 select-none">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pt-2">
              {TOOLS.map((tool) => {
                const isActive = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-lg border-t border-x transition-colors shrink-0 ${
                      isActive
                        ? "bg-zinc-950 border-zinc-800 text-white border-b-zinc-950"
                        : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="scale-75 text-zinc-500">{tool.logo}</span>
                    <span>{tool.fileName}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Mock Editor Window controls */}
            <div className="flex gap-1.5 py-3 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
          </div>

          {/* Workspace Area: Split into Interactive Code and Recruiter-friendly Info */}
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center gap-2 z-20">
                <div className="w-4 h-4 rounded-full border-2 border-brand-accent-light border-t-transparent animate-spin" />
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">Loading Session...</span>
              </div>
            )}

         {/* Left Pane: Code Simulator */}
<div className="flex-[6] p-5 border-b lg:border-b-0 lg:border-r border-zinc-800/80 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed scrollbar-none">
  <div className="animate-[fadeInUp_0.3s_ease_forwards]">

    {activeTab === "copilot" && (
      <div className="space-y-4">
        {/* User-friendly Explanation Box */}
        <div className="bg-[#031c12]/60 border border-brand-accent-light/15 p-3.5 rounded-xl flex items-start gap-3 font-sans select-none">
          <span className="text-base text-brand-accent-light shrink-0 leading-none">💡</span>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">How Copilot Helps:</strong>
            Automatically writes repetitive boilerplate structures and boilerplate functions inline as I type, speeding up raw coding.
          </div>
        </div>
        <span className="text-zinc-500 block font-sans">// Inline Autocomplete Suggestion</span>
        <div className="font-mono text-zinc-300 space-y-1">
          <div><span className="text-blue-400">function</span> <span className="text-emerald-400">calculateOptimalRoutes</span>(points: Point[]): Route[] &#123;</div>
          <div className="text-zinc-500 pl-4">// Copilot suggestions (Press Tab to Accept):</div>
          <div className="text-zinc-500 pl-4"><span className="text-blue-400/80">const</span> sorted = [...points].sort((a, b) =&gt; a.distance - b.distance);</div>
          <div className="text-zinc-500 pl-4"><span className="text-blue-400/80">return</span> sorted.reduce((acc, point, index) =&gt; &#123;</div>
          <div className="text-zinc-500 pl-8"><span className="text-blue-400/80">if</span> (index === <span className="text-orange-400/80">0</span>) <span className="text-blue-400/80">return</span> acc;</div>
          <div className="text-zinc-500 pl-8">acc.push(&#123;</div>
          <div className="text-zinc-500 pl-12">from: sorted[index - <span className="text-orange-400/80">1</span>],</div>
          <div className="text-zinc-500 pl-12">to: point,</div>
          <div className="text-zinc-500 pl-12">duration: calculateDuration(sorted[index - <span className="text-orange-400/80">1</span>], point)</div>
          <div className="text-zinc-500 pl-8">&#125;);</div>
          <div className="text-zinc-500 pl-8"><span className="text-blue-400/80">return</span> acc;</div>
          <div className="text-zinc-500 pl-4">&#125;, [] <span className="text-blue-400/80">as</span> Route[]);</div>
          <div>&#125;</div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 border-t border-zinc-900 pt-3 mt-4 font-sans">
          <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-semibold">Tab</span>
          <span>Accept Autocomplete</span>
          <span className="mx-2">•</span>
          <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-sans font-semibold">Esc</span>
          <span>Reject</span>
        </div>
      </div>
    )}

    {activeTab === "cursor" && (
      <div className="space-y-4">
        {/* User-friendly Explanation Box */}
        <div className="bg-[#031c12]/60 border border-brand-accent-light/15 p-3.5 rounded-xl flex items-start gap-3 font-sans select-none">
          <span className="text-base text-brand-accent-light shrink-0 leading-none">💡</span>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">How Cursor Helps:</strong>
            Indexes the local workspace so I can perform safe, multi-file code refactoring and navigate files using natural language.
          </div>
        </div>
        <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 flex items-start gap-2 font-sans">
          <span className="text-brand-accent-light mt-0.5 font-bold">✨</span>
          <div className="text-sm">
            <span className="text-zinc-400 font-semibold block mb-0.5">AI Prompt:</span>
            <p className="text-zinc-200 font-sans">"Refactor the fetching sequence to include automatic retry backoff."</p>
          </div>
        </div>

        <div className="space-y-1 font-mono text-xs leading-relaxed">
          <div className="text-zinc-500">// cursor_refactor.tsx — Refactoring diff</div>
          <div className="bg-red-950/20 text-red-350 px-2 py-0.5 rounded border-l-2 border-red-500">
            - const &#123; data, error &#125; = useFetch("/api/data");
          </div>
          <div className="bg-emerald-950/20 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-brand-accent-light">
            + const &#123; data, error, retry &#125; = useFetch("/api/data", &#123;
          </div>
          <div className="bg-emerald-950/20 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-brand-accent-light">
            +   maxRetries: 3,
          </div>
          <div className="bg-emerald-950/20 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-brand-accent-light">
            +   backoffMs: 1000
          </div>
          <div className="bg-emerald-950/20 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-brand-accent-light">
            + &#125;);
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 flex items-center gap-2 mt-4 pt-3 border-t border-zinc-900 font-sans">
          <span className="bg-[#082a20]/30 border border-brand-accent-light/30 text-emerald-300 px-1.5 py-0.5 rounded">Applied</span>
          <span>1 change refactored successfully</span>
        </div>
      </div>
    )}

    {activeTab === "claude" && (
      <div className="space-y-4 font-sans">
        {/* User-friendly Explanation Box */}
        <div className="bg-[#031c12]/60 border border-brand-accent-light/15 p-3.5 rounded-xl flex items-start gap-3 font-sans select-none">
          <span className="text-base text-brand-accent-light shrink-0 leading-none">💡</span>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">How Claude Helps:</strong>
            Acts as an architectural review companion to optimize page rendering, design cache strategies, and solve complex algorithms.
          </div>
        </div>
        <div className="border-b border-zinc-800 pb-2">
          <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider block">System Design Review</span>
          <h5 className="text-white text-sm font-semibold mt-0.5">Next.js App Router Cache Tuning</h5>
        </div>

        <div className="space-y-3.5 text-sm">
          <div className="space-y-1.5">
            <span className="text-zinc-400 font-mono text-[10px] uppercase block">Recommendation</span>
            <p className="text-zinc-200 leading-relaxed">
              Implement incremental static regeneration (ISR) and tag-based revalidation to reduce server workloads.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-zinc-400 font-mono text-[10px] uppercase block">Performance Impact</span>
            <div className="flex items-center gap-3">
              <div className="flex-grow bg-zinc-900 rounded-full h-2 overflow-hidden max-w-40 border border-zinc-800">
                <div className="bg-brand-accent-light h-full w-[90%]" />
              </div>
              <span className="text-emerald-300 font-semibold font-mono">-90% Server TTFB Latency</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-400 font-mono text-[10px] uppercase block">Routing Flow</span>
            <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 font-mono text-xs text-zinc-300 flex justify-between items-center gap-2 text-center">
              <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Client Request</span>
              <span className="text-zinc-500">➔</span>
              <span className="bg-[#051a12] text-brand-accent-light px-2 py-1 rounded border border-brand-accent-light/20">Edge Cache Hit</span>
              <span className="text-zinc-500">➔</span>
              <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Dynamic Origin</span>
            </div>
          </div>
        </div>
      </div>
    )}

    {activeTab === "chatgpt" && (
      <div className="space-y-4 font-sans">
        {/* User-friendly Explanation Box */}
        <div className="bg-[#031c12]/60 border border-brand-accent-light/15 p-3.5 rounded-xl flex items-start gap-3 font-sans select-none">
          <span className="text-base text-brand-accent-light shrink-0 leading-none">💡</span>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">How ChatGPT Helps:</strong>
            Acts as an interactive pairing buddy to write comprehensive unit test cases and generate realistic mock datasets.
          </div>
        </div>
        <div className="space-y-1 font-sans">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">ChatGPT suggestion:</span>
          <div className="bg-zinc-900/20 p-3 rounded-lg border border-zinc-900 text-sm text-zinc-300 leading-relaxed">
            I've drafted a React component unit test using Vitest and React Testing Library to validate navigation events:
          </div>
        </div>

        <div className="font-mono text-zinc-300 text-xs space-y-1 bg-zinc-950 p-3 rounded border border-zinc-900">
          <div><span className="text-blue-400">import</span> &#123; render, screen &#125; <span className="text-blue-400">from</span> <span className="text-orange-400">"@testing-library/react"</span>;</div>
          <div><span className="text-blue-400">import</span> Navbar <span className="text-blue-400">from</span> <span className="text-orange-400">"./navbar"</span>;</div>
          <br />
          <div><span className="text-blue-400">test</span>(<span className="text-orange-400">"renders navbar logo correctly"</span>, () =&gt; &#123;</div>
          <div className="pl-4">render(&lt;<span className="text-blue-400">Navbar</span> /&gt;);</div>
          <div className="text-zinc-500 pl-4">// Query element via AltText</div>
          <div className="pl-4"><span className="text-blue-400">const</span> logo = screen.getByAltText(<span className="text-orange-400">"Satabdi Mohanty - Portfolio"</span>);</div>
          <div className="text-zinc-500 pl-4">// Assert element is mounted</div>
          <div className="pl-4"><span className="text-blue-400">expect</span>(logo).toBeInTheDocument();</div>
          <div>&#125;);</div>
        </div>
      </div>
    )}

    {activeTab === "debug" && (
      <div className="space-y-4">
        {/* User-friendly Explanation Box */}
        <div className="bg-[#031c12]/60 border border-brand-accent-light/15 p-3.5 rounded-xl flex items-start gap-3 font-sans select-none">
          <span className="text-base text-brand-accent-light shrink-0 leading-none">💡</span>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="text-white block font-semibold mb-0.5">How Debugging Agents Help:</strong>
            Monitors compilation logs in real-time, translates stack traces into clean descriptions, and drafts immediate styling patches.
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-zinc-500 block font-sans">
            // Debugging Terminal (Monitoring traces)
          </span>

          <pre className="text-red-400 bg-red-950/10 p-3 rounded border border-red-900/30">
{LINT_ERROR_TEXT}
          </pre>
        </div>

        <pre className="text-emerald-300 bg-[#082a20]/10 p-3 rounded border border-brand-accent-light/20">
{PATCH_SUCCESS_TEXT}
        </pre>
      </div>
    )}

  </div>
</div>

          {/* Right Pane: Clear Portfolio Info Inspector */}
          <div className="flex-[4] p-5 bg-[#030e0a]/45 overflow-y-auto flex flex-col justify-between scrollbar-none animate-[fadeInUp_0.4s_ease_forwards] border-t lg:border-t-0 border-zinc-800">
            <div className="space-y-5">
              {/* Header */}
              <div>
                <span className="inline-block text-[9px] font-mono font-bold tracking-widest text-emerald-300 uppercase px-2 py-0.5 rounded bg-brand-accent-light/10 border border-brand-accent-light/20">
                  {activeTool.tag}
                </span>
                <h4 className="text-white font-sans text-lg font-bold tracking-tight mt-1.5 leading-none">
                  {activeTool.name}
                </h4>
              </div>

              {/* Usage Summary */}
              <div className="space-y-3.5">
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Why I Use
                  </span>
                  <p className="font-sans">{activeTool.howIUseIt}</p>
                </div>

                <div className="text-sm text-zinc-300">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                    How It Helps
                  </span>
                  <ul className="list-none space-y-1.5 font-sans">
                    {activeTool.keyBenefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-zinc-100">
                        <span className="text-brand-accent-light select-none font-bold">✔</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Impact Metric Badge (Footer alignment) */}
            <div className="mt-5 border-t border-zinc-800/80 pt-4 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider leading-none">
                Workflow Productivity Gain
              </span>
              <span className="text-sm sm:text-base font-sans font-bold text-emerald-300 leading-none mt-1">
                {activeTool.impact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
