"use client";

import { useState, useMemo } from "react";

const LANGUAGES = [
  {
    id: "english",
    name: "English",
    code: "EN",
    level: "Professional",
    percentage: 95,
    tagline: "Global Tech & Business",
    desc: "Primary language for designing codebases, collaborating in professional environments, writing API documentation, and daily client communication."
  },
  {
    id: "hindi",
    name: "Hindi",
    code: "HI",
    level: "Conversational",
    percentage: 80,
    tagline: "Team Collaboration",
    desc: "Provides strong conversational fluency for collaborative brainstorming, cross-department alignment, and daily peer coordination."
  },
  {
    id: "odia",
    name: "Odia",
    code: "OD",
    level: "Native",
    percentage: 100,
    tagline: "Native Connection",
    desc: "Mother tongue, enabling native-level communication, local client support, and natural expressive coordination."
  }
];

// Deterministic pseudo-random generator so each language gets a stable,
// unique waveform shape instead of Math.random() (which would reshuffle
// on every render).
function seededWave(seed: number, bars: number, density: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: bars }, (_, i) => {
    const envelope = Math.sin((i / bars) * Math.PI); // taper at both ends
    const noise = 0.35 + rand() * 0.65;
    const active = rand() < density;
    return active ? Math.max(0.08, envelope * noise) : 0.04;
  });
}

export default function LanguagesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeLang = LANGUAGES[activeIdx];

  const waves = useMemo(
    () =>
      LANGUAGES.map((lang, i) =>
        seededWave(lang.percentage + i * 17, 48, lang.percentage / 100)
      ),
    []
  );

  return (
    <section
      id="languages"
      className="mx-auto mt-12 max-w-5xl px-6 py-8 md:mt-20 lg:px-0 relative"
    >
      {/* Title block */}
      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold">
            Interpersonal Skills
          </span>
        </div>
        <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-3">
          <span className="block text-white">Languages &</span>
          <span className="block text-outline-orange mt-1">Communication</span>
        </h3>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
        {/* Left: Signal list */}
        <div className="flex flex-col gap-4">
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-2 max-w-xl">
            A multilingual foundation enables seamless execution, logical alignment, and expressive cooperation within cross-functional teams and international environments.
          </p>

          <div className="flex flex-col">
            {LANGUAGES.map((lang, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={lang.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  aria-pressed={isActive}
                  className={`w-full text-left py-5 transition-colors duration-300 relative group ${
                    idx !== 0 ? "border-t border-zinc-900" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Language code chip */}
                    <span
                      className={`font-mono text-[11px] font-bold tracking-widest w-9 h-9 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "border-teal-300/50 text-teal-300 bg-teal-300/5"
                          : "border-zinc-800 text-zinc-500"
                      }`}
                    >
                      {lang.code}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4
                          className={`font-sans font-bold text-base transition-colors duration-300 ${
                            isActive ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          {lang.name}
                        </h4>
                        <span
                          className={`font-mono text-[11px] tabular-nums shrink-0 transition-colors duration-300 ${
                            isActive ? "text-teal-300" : "text-zinc-600"
                          }`}
                        >
                          {lang.percentage}%
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {lang.level} &middot; {lang.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Inline mini-waveform, fills the bar at native resolution */}
                  <div className="mt-3 ml-[52px] flex items-end gap-[2px] h-6">
                    {waves[idx].slice(0, 28).map((v, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-[1px] transition-all duration-500 ${
                          isActive ? "bg-teal-300" : "bg-zinc-800"
                        }`}
                        style={{
                          height: `${Math.max(8, v * 100)}%`,
                          transitionDelay: isActive ? `${i * 6}ms` : "0ms",
                          opacity: isActive ? 0.5 + v * 0.5 : 1
                        }}
                      />
                    ))}
                  </div>

                  {/* Expandable detail */}
                  <div
                    className={`ml-[52px] text-xs text-zinc-500 leading-relaxed font-sans transition-all duration-300 overflow-hidden ${
                      isActive ? "opacity-100 max-h-16 mt-3" : "opacity-0 max-h-0 mt-0"
                    }`}
                  >
                    {lang.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Large signal readout */}
        <div className="relative">
          <div className="rounded-2xl border border-zinc-900 bg-gradient-to-b from-zinc-950/80 to-transparent p-6 md:p-8">
            {/* Readout header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 block mb-1">
                  Signal &middot; Live
                </span>
                <h4 className="font-syne text-2xl font-extrabold text-white tracking-tight">
                  {activeLang.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 block mb-1">
                  Fluency
                </span>
                <span className="font-mono text-2xl font-bold text-teal-300 tabular-nums">
                  {activeLang.percentage}
                  <span className="text-sm text-zinc-500">%</span>
                </span>
              </div>
            </div>

            {/* Main waveform display */}
            <div className="relative h-40 md:h-48 rounded-lg border border-zinc-900 bg-black/40 px-4 py-4 overflow-hidden">
              {/* Baseline grid */}
              <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-zinc-900" />

              <div className="relative h-full flex items-center gap-[3px]">
                {waves[activeIdx].map((v, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-teal-400/80 to-teal-200 transition-all duration-500 ease-out"
                    style={{
                      height: `${Math.max(4, v * 100)}%`,
                      transitionDelay: `${i * 8}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Caption row */}
            <p className="mt-6 text-xs md:text-[13px] text-zinc-500 leading-relaxed">
              {activeLang.desc}
            </p>

            {/* Selector tabs */}
            <div className="mt-6 flex gap-2 border-t border-zinc-900 pt-5">
              {LANGUAGES.map((lang, idx) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Show ${lang.name} signal`}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? "bg-teal-300" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}