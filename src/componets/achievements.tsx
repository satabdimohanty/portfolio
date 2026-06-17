"use client";

const ACHIEVEMENTS = [
  {
    year: "2022",
    label: "MCA",
    role: "Master of Computer Applications (MCA)",
    organization: "Biju Patnaik University of Technology (BPUT)",
    date: "Graduated 2022",
    bullets: [
      "Acquired advanced specialization in Software Engineering principles, database design architectures, and enterprise web application loops.",
      "Engineered a dynamic Academic Portal as a capstone project using React.js to streamline user workflows and state handling.",
      "Graduated with a strong academic standing, achieving a final cumulative GPA score of 8.54."
    ]
  },
  {
    year: "2020",
    label: "BSC",
    role: "Bachelor of Science (B.Sc)",
    organization: "Utkal University (Odisha, India)",
    date: "Graduated 2020",
    bullets: [
      "Completed core scientific foundation courses with major focus on computer systems, mathematical modeling, and basic data structures.",
      "Developed modular algorithms and code utilities during lab courses to master fundamental debugging and design concepts.",
      "Completed undergraduate thesis research, graduating with a final cumulative GPA score of 7.72."
    ]
  }
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0">
      <div className="relative mb-12 md:mb-16">
        {/* Triangles SVG Icon */}
        <svg
          width="69"
          height="55"
          viewBox="0 0 69 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brand-accent-light"
        >
          <path d="M12 45L34.5 10L57 45H12Z" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M22 35L44.5 2L67 35H22Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-4">
          <span className="block text-white">Academic</span>
          <span className="block text-outline-orange mt-1">Credentials</span>
        </h3>
      </div>

      {/* Alternating Timeline Layout */}
      <div className="relative mt-8 md:mt-12">
        {/* Central timeline track line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-[1px]" />

        {ACHIEVEMENTS.map((item, idx) => {
          const years = item.year;
          const label = item.label;

          return (
            <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 last:mb-0">
              {/* Timeline circle node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                <div className="w-12 h-12 md:w-15 md:h-15 rounded-full border border-zinc-800 bg-card-bg flex flex-col items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-brand-accent-light/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 select-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-5.5 md:h-5.5 text-brand-accent-light">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                  </svg>
                  <span className="text-[7px] md:text-[8px] font-mono tracking-wider text-zinc-400 mt-1 font-semibold">
                    {years}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className={`w-full md:w-[calc(50%-2.5rem)] ml-16 md:ml-0 ${idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <div
                  className="relative rounded-xl border border-zinc-800/80 magical-card-texture p-5 md:p-6 shadow-xl hover:border-brand-accent-light/40 transition-all duration-300 group text-left"
                >
                  {/* Triangle pointer (desktop) */}
                  <div className={`absolute top-6 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent hidden md:block
                    ${idx % 2 === 0 
                      ? "-right-[6px] border-l-6 border-l-zinc-800 group-hover:border-l-brand-accent-light/40 transition-colors" 
                      : "-left-[6px] border-r-6 border-r-zinc-800 group-hover:border-r-brand-accent-light/40 transition-colors"}`} 
                  />
                  {/* Triangle pointer (mobile) */}
                  <div className="absolute top-6 -left-[6px] w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-zinc-800 group-hover:border-r-brand-accent-light/40 transition-colors md:hidden" />

                  {/* Date Metadata */}
                  <span className="text-[10px] font-mono text-emerald-200 tracking-wider font-semibold uppercase">{item.date}</span>

                  {/* Title */}
                  <h4 className="font-sans text-base font-bold tracking-tight text-white leading-snug mt-1.5 transition-colors duration-200">
                    {item.role}
                  </h4>

                  {/* Organization */}
                  <div className="font-serif font-normal italic text-emerald-100/80 mt-1 text-xs md:text-sm">
                    {item.organization}
                  </div>

                  {/* Bullets */}
                  <ul className="mt-4 flex flex-col gap-2.5 text-zinc-100 text-xs md:text-sm leading-relaxed">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="font-mono text-emerald-200 font-semibold shrink-0 mt-0.5 select-none">&gt;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


