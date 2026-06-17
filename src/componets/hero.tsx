"use client";

import { useEffect, useState } from "react";

const TYPED_TITLES = [
  "next.js App Router specialist",
  "React.js developer",
  "TypeScript engineer",
  "performance optimizer",
  "UI architect",
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPED_TITLES[titleIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }, 65);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(displayedText.substring(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % TYPED_TITLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titleIdx]);

  return (
    <div id="hero" className="relative min-h-[90vh] flex flex-col justify-center bg-[#0a0a0f] overflow-hidden pt-24 pb-12">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* violet blob top-left */}
        <div className="absolute top-[-60px] left-[10%] w-[420px] h-[420px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)" }} />
        {/* emerald blob bottom-right */}
        <div className="absolute bottom-[-40px] right-[5%] w-[320px] h-[320px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(110,231,183,0.08) 0%, transparent 70%)" }} />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(110,231,183,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — headline + bio + CTAs */}
          <div>
            {/* Overline */}
            <div className="flex items-center gap-2 mb-5 font-mono text-[11px] tracking-[0.16em] uppercase text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portfolio · 2026
            </div>

            {/* Name */}
            <h1 className="font-cursive text-5xl md:text-6xl font-normal text-slate-100 leading-[1.15] mb-2">
              Satabdi Mohanty
            </h1>

            {/* Role — solid green gradient */}
            <h2
              className="font-cursive text-4xl md:text-5xl font-normal leading-[1.15] mb-6"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Frontend Engineer
            </h2>

            {/* Typewriter terminal badge */}
            <div className="inline-flex items-center gap-2 bg-[#111118] border border-[#1e2d22] rounded-lg px-3.5 py-2 font-mono text-xs text-slate-500 mb-7">
              <span className="text-emerald-400">›</span>
              <span className="text-slate-200">{displayedText}</span>
              <span className="inline-block w-[7px] h-[13px] bg-emerald-400 animate-pulse" />
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-400 leading-[1.8] max-w-md mb-8">
              <span className="text-slate-200 font-medium">Software Engineer</span> with{" "}
              <span className="text-slate-200 font-medium">2.5+ years</span> building scalable,
              SEO-friendly, and high-performance web apps using{" "}
              <span className="text-slate-200 font-medium">Next.js, React, TypeScript</span> &{" "}
              <span className="text-slate-200 font-medium">Tailwind CSS</span>. Skilled in
              SSR, SSG, App Router, API integration & clean architecture.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-emerald-950 font-mono font-bold text-xs uppercase tracking-wide px-6 py-2.5 rounded-lg hover:opacity-90 hover:-translate-y-px transition-all"
              >
                View Projects
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="/resume/SATABDI_MOHANTY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-transparent border border-[#2d2d3a] text-slate-200 font-mono font-bold text-xs uppercase tracking-wide px-6 py-2.5 rounded-lg hover:border-emerald-400 hover:text-emerald-400 hover:-translate-y-px transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT — animated code card */}
          <div className="hidden lg:block bg-[#0f0f1a] border border-[#1e1e30] rounded-xl p-5 font-mono text-xs leading-[1.9] animate-[fadeInUp_0.6s_ease_forwards]">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[11px] text-[#3d3d5c] tracking-wider">stack.ts</span>
            </div>

            {/* Code lines */}
            {[
              { ln: "1",  content: <span className="text-slate-600">{"// core stack"}</span> },
              { ln: "2",  content: <><span className="text-violet-400">import</span> <span className="text-sky-300">Next</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">'next'</span><span className="text-slate-500">;</span></> },
              { ln: "3",  content: <><span className="text-violet-400">import</span> <span className="text-sky-300">React</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">'react'</span><span className="text-slate-500">;</span></> },
              { ln: "4",  content: <><span className="text-violet-400">import</span> <span className="text-sky-300">TypeScript</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">'typescript'</span><span className="text-slate-500">;</span></> },
              { ln: "5",  content: <><span className="text-violet-400">import</span> <span className="text-sky-300">Tailwind</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">'tailwindcss'</span><span className="text-slate-500">;</span></> },
              { ln: "6",  content: <>&nbsp;</> },
              { ln: "7",  content: <span className="text-slate-600">{"// rendering modes"}</span> },
              { ln: "8",  content: <><span className="text-violet-400">export const</span> <span className="text-sky-300">modes</span> <span className="text-slate-500">= [</span></> },
              { ln: "9",  content: <>&nbsp;&nbsp;<span className="text-emerald-400">'SSR'</span><span className="text-slate-500">,</span> <span className="text-emerald-400">'SSG'</span><span className="text-slate-500">,</span> <span className="text-emerald-400">'ISR'</span><span className="text-slate-500">,</span></> },
              { ln: "10", content: <>&nbsp;&nbsp;<span className="text-emerald-400">'App Router'</span><span className="text-slate-500">,</span></> },
              { ln: "11", content: <span className="text-slate-500">{"];"}</span> },
              { ln: "12", content: <>&nbsp;</> },
              { ln: "13", content: <span className="text-slate-600">{"// experience"}</span> },
              { ln: "14", content: <><span className="text-violet-400">export const</span> <span className="text-sky-300">exp</span> <span className="text-slate-500">=</span> <span className="text-emerald-400">'2.5+ years'</span><span className="text-slate-500">;</span></> },
            ].map(({ ln, content }, i) => (
              <div
                key={ln}
                className="flex gap-3 items-baseline opacity-0"
                style={{ animation: `fadeIn 0.3s ease ${0.1 + i * 0.12}s forwards` }}
              >
                <span className="text-[10px] text-[#2d2d48] min-w-[18px] text-right select-none">{ln}</span>
                <span>{content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}