"use client";

import { useRef, useEffect, useState } from "react";
import MagicalGlowReveal from "./magical-glow-reveal";

interface Project {
  name: string;
  stack: string[];
  bullets: string[];
}

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  date: string;
  tag: string;
  status: string;
  projects: Project[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Associate",
    company: "Softree Technology Pvt. Ltd.",
    location: "Cuttack",
    date: "Jan 2024 — Present",
    tag: "v2.0",
    status: "current",
    projects: [
      {
        name: "Noteved Admin Portal",
        stack: ["React.js", "Next.js", "Tailwind CSS", "REST API"],
        bullets: [
          "Developed a scalable and responsive admin dashboard using React.js and Next.js, ensuring smooth navigation and efficient data handling across modules.",
          "Built reusable and modular UI components with Tailwind CSS, improving code maintainability and speeding up overall development workflow.",
          "Implemented robust API integrations, optimized Next.js Server-Side Rendering (SSR), and enhanced overall application performance, scalability, and SEO for improved user experience and faster load times.",
          "Collaborated with cross-functional teams and followed agile practices to deliver clean, maintainable, component-driven solutions."
        ]
      },
      {
        name: "Site Pages to PDF Converter",
        stack: ["React.js", "SPFx", "REST API", "TypeScript"],
        bullets: [
          "Built a React application within SharePoint Framework to enable conversion of SharePoint Site Pages into downloadable PDF documents.",
          "Leveraged React hooks for efficient state management, handling content rendering, and controlling the end-to-end PDF generation workflow.",
          "Utilized REST APIs within React components to fetch and process page data dynamically for accurate PDF generation.",
          "Designed a dynamic and responsive UI using React components, allowing users to trigger, preview, and download PDFs seamlessly."
        ]
      }
    ]
  },
  {
    role: "Frontend Developer Intern",
    company: "Juvenilia Technology Pvt. Limited",
    location: "Bhubaneswar",
    date: "July 2022 — Dec 2023",
    tag: "v1.0",
    status: "past",
    projects: [
      {
        name: "Responsive Interface Development",
        stack: ["React.js", "Figma", "CSS", "TypeScript"],
        bullets: [
          "Gained hands-on experience building clean, modular, and component-driven React layouts from high-fidelity Figma mockups.",
          "Translated complex designs into fully responsive and interactive frontend code using standard CSS and modern React hooks.",
          "Collaborated closely with cross-functional developer teams to integrate RESTful endpoints and debug system inconsistencies."
        ]
      }
    ]
  }
];

function getTechStyle(tech: string) {
  const name = tech.toLowerCase();
  if (name.includes("react")) {
    return "border-sky-500/20 bg-sky-500/5 text-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.06)] hover:border-sky-400/50 hover:bg-sky-500/10";
  }
  if (name.includes("next")) {
    return "border-zinc-300/25 bg-zinc-300/5 text-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.04)] hover:border-zinc-200 hover:bg-zinc-300/10";
  }
  if (name.includes("tailwind")) {
    return "border-teal-500/20 bg-teal-500/5 text-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.06)] hover:border-teal-400/50 hover:bg-teal-500/10";
  }
  if (name.includes("typescript") || name === "ts") {
    return "border-blue-500/20 bg-blue-500/5 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.06)] hover:border-blue-400/50 hover:bg-blue-500/10";
  }
  if (name.includes("spfx") || name.includes("sharepoint")) {
    return "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.06)] hover:border-emerald-400/50 hover:bg-emerald-500/10";
  }
  if (name.includes("api") || name.includes("rest")) {
    return "border-orange-500/20 bg-orange-500/5 text-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.06)] hover:border-orange-400/50 hover:bg-orange-500/10";
  }
  if (name.includes("figma")) {
    return "border-purple-500/20 bg-purple-500/5 text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.06)] hover:border-purple-400/50 hover:bg-purple-500/10";
  }
  return "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200";
}

function RoleBlock({ exp }: { exp: ExperienceItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pl-8 md:pl-12 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Glowing node positioned exactly on the container's left border */}
      <div className="absolute top-8 left-0 -translate-x-[33px] md:-translate-x-[49px] flex h-5 w-5 items-center justify-center z-10">
        <span className="absolute h-4 w-4 rounded-full bg-emerald-500/20 animate-ping" />
        <span className="h-2.5 w-2.5 rounded-full border border-emerald-400 bg-neutral-950 shadow-[0_0_8px_#10b981]" />
      </div>

      {/* Glassmorphic Experience Card */}
      <div className="relative group">
        {/* Glow backdrop effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
        
        <div className="relative flex flex-col h-full rounded-2xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-6 md:p-8 shadow-xl transition-all duration-500 group-hover:border-emerald-500/20 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
          {/* Card header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/50 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase block mb-1">
                {exp.status === "current" ? "active role" : "past role"}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                {exp.role}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 font-serif italic mt-0.5">
                {exp.company}
              </p>
            </div>
            <div className="flex flex-col md:items-end font-mono text-xs text-zinc-500 gap-1.5">
              <span className="px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 whitespace-nowrap">
                📅 {exp.date}
              </span>
              <span className="text-[11px] text-zinc-500 italic">
                📍 {exp.location}
              </span>
            </div>
          </div>

          {/* Projects inside the card */}
          <div className="flex flex-col gap-6">
            {exp.projects.map((proj, pIdx) => (
              <div key={pIdx} className="bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-5 hover:border-emerald-500/10 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h4 className="font-mono text-sm font-bold text-emerald-400 tracking-wide">
                    › {proj.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span key={tech} className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all duration-300 hover:-translate-y-0.5 ${getTechStyle(tech)}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-4 border-l border-zinc-800/60 pl-4">
                  {proj.bullets.map((bullet, bIdx) => (
                    <p key={bIdx} className="text-xs md:text-sm text-zinc-400 leading-relaxed flex items-start gap-2 group/bullet hover:text-zinc-200 transition-colors">
                      <span className="text-emerald-400/80 font-mono select-none mt-0.5">+</span>
                      <span>{bullet}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28 mx-auto mt-12 max-w-5xl px-6 md:mt-20 lg:px-0">
      {/* Header title */}
      <div className="flex items-baseline justify-between border-b border-white/10 pb-5 mb-12">
        <div>
          <div className="font-sans text-[11px] tracking-[0.18em] text-[#8e9bb4] font-semibold uppercase">
            Work Experience
          </div>
          <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-2">
            <span className="block text-white">
              <MagicalGlowReveal>My Career</MagicalGlowReveal>
            </span>
            <span className="block text-outline-orange mt-1">
              <MagicalGlowReveal delay={150}>Timeline</MagicalGlowReveal>
            </span>
          </h3>
        </div>
      </div>

      {/* Vertical timeline track */}
      <div className="relative border-l border-zinc-800/80 ml-4 md:ml-6 flex flex-col gap-12">
        {EXPERIENCE.map((exp, idx) => (
          <RoleBlock key={idx} exp={exp} />
        ))}
      </div>
    </section>
  );
}