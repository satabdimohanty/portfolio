"use client";

const STRENGTHS = [
  { name: "COMMUNICATION", val: 90 },
  { name: "CONFIDENT", val: 92 },
  { name: "COMMITMENT", val: 98 },
  { name: "CREATIVE", val: 88 },
  { name: "COOPERATIVE", val: 82 }
];

export default function StrengthsSection() {
  return (
    <section id="strengths" className="mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0">
      <div>
        {/* Graph/Chart Icon SVG */}
        <svg
          width="60"
          height="50"
          viewBox="0 0 60 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-emerald-500 animate-pulse"
        >
          <rect x="4" y="30" width="8" height="16" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="18" y="18" width="8" height="28" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="32" y="6" width="8" height="40" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          <rect x="46" y="24" width="8" height="22" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-4">
          <span className="block text-white">My</span>
          <span className="block text-outline-orange mt-1">Strengths</span>
        </h3>
        <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Facing challenges with strength, determination and confidence is what matters to me.
        </p>
      </div>

      <div className="mt-12 flex items-stretch h-[320px] md:h-[380px] relative">
        {/* Left 'ME' Bracket */}
        <div className="flex items-center gap-3 pr-4 md:pr-8 border-r border-white/5">
          <div className="h-[90%] w-3 border-y-2 border-l-2 border-zinc-800 rounded-l" />
          <span className="font-mono text-xs md:text-sm tracking-widest text-zinc-500 font-bold uppercase [writing-mode:vertical-lr] rotate-180">
            ME
          </span>
        </div>

        {/* Chart Area */}
        <div className="flex-grow relative px-6 md:px-12 flex justify-between items-end">
          {/* Horizontal dotted grid lines */}
          <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between py-8 pointer-events-none">
            <div className="w-full flex items-center justify-between border-t border-dashed border-zinc-800/80 relative">
              <span className="absolute right-0 translate-x-[calc(100%+8px)] text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Best</span>
            </div>
            <div className="w-full flex items-center justify-between border-t border-dashed border-zinc-800/80 relative">
              <span className="absolute right-0 translate-x-[calc(100%+8px)] text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Better</span>
            </div>
            <div className="w-full flex items-center justify-between border-t border-dashed border-zinc-800/80 relative">
              <span className="absolute right-0 translate-x-[calc(100%+8px)] text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Pretty Good</span>
            </div>
            <div className="w-full flex items-center justify-between border-t border-dashed border-zinc-800/80 relative">
              <span className="absolute right-0 translate-x-[calc(100%+8px)] text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Good</span>
            </div>
          </div>

          {/* Bar columns */}
          <div className="w-full h-full flex justify-around items-end z-10 pt-4 pr-16 md:pr-24">
            {STRENGTHS.map((s) => (
              <div key={s.name} className="flex flex-col justify-end items-center h-full w-10 sm:w-14 md:w-16">
                {/* Vertical Bar */}
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:brightness-110 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                  style={{ height: `${s.val}%` }}
                >
                  {/* Rotating visual texture scanline overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

                  {/* Rotated text label inside bar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans text-[8px] sm:text-[10px] md:text-xs font-black tracking-widest text-zinc-950 uppercase -rotate-90 origin-center whitespace-nowrap select-none">
                      {s.name}
                    </span>
                  </div>
                </div>

                {/* Percentage base label */}
                <div className="w-full bg-badge-bg border border-t-0 border-zinc-800 py-1.5 text-center font-mono text-[9px] sm:text-[10px] md:text-xs font-bold text-white rounded-b-md shadow-inner">
                  {s.val}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
