"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Strengths", href: "#strengths" },
  { label: "Process", href: "#workflow" },
  { label: "AI Tools", href: "#ai-assisted" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#achievements" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ["skills", "strengths", "workflow", "ai-assisted", "projects", "experience", "achievements"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentActive = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    // Defer adding listener and initial run to prevent state updates during mount phase
    const startTimeout = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }, 50);

    return () => {
      clearTimeout(startTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-600 z-50 transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Floating Navbar Container */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
        <div className="mx-auto w-full max-w-5xl flex items-center justify-between magical-navbar-texture border border-zinc-800/80 py-2.5 px-5 shadow-[0_8px_32px_rgba(2,24,18,0.45),0_0_20px_rgba(16,185,129,0.15)] rounded-full backdrop-blur-md">
          {/* Logo with clean hover scaling */}
          <a
            href="#about"
            className="cursor-pointer block transition-transform duration-300 hover:scale-105 active:scale-95"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img
              src="/logo.svg"
              alt="Satabdi Mohanty - Portfolio"
              width="156"
              height="47"
              className="h-9 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-0.5 bg-zinc-900/30 border border-zinc-800/40 rounded-full p-0.5 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`cursor-pointer rounded-full px-3 py-1 text-[11px] lg:text-xs font-mono font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/35 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/40 border border-transparent"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Contact CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex group cursor-pointer rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-[1px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] active:scale-95"
            >
              <div className="flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-1.5 text-xs lg:text-sm font-mono font-medium tracking-wide text-white group-hover:bg-transparent transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-zinc-300 group-hover:text-white transition-colors duration-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Contact</span>
              </div>
            </a>

            {/* Mobile Hamburg menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full border border-brand-accent-light/30 bg-zinc-900/80 text-white md:hidden hover:border-brand-accent-light hover:text-brand-accent-light transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className={`flex flex-col items-center gap-6 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "translate-y-4"
          }`}
        >
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-2xl font-semibold tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isActive ? "text-emerald-500 scale-105" : "text-zinc-400 hover:text-white"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className={`group cursor-pointer rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-[1px] hover:scale-105 active:scale-95 transition-all duration-300 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-base font-mono font-medium tracking-wide text-white group-hover:bg-transparent transition-colors">
            <span>Get In Touch</span>
          </div>
        </a>
      </div>
    </>
  );
}
