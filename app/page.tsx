"use client";

import Navbar from "../src/componets/navbar";
import HeroSection from "../src/componets/hero";
import AboutSection from "../src/componets/about-me";
import StrengthsSection from "../src/componets/strengths";
import HowIWorkSection from "../src/componets/how-i-work";
import AIDevelopmentSection from "../src/componets/ai-development";
import LanguagesSection from "../src/componets/languages";
import ProjectsSection from "../src/componets/projects";
import ExperienceSection from "../src/componets/experience";
import AchievementsSection from "../src/componets/achievements";
import ContactSection from "../src/componets/contact";
import ScrollReveal from "../src/componets/scroll";
import MagicalScrollEffects from "../src/componets/magical-scroll-effects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-zinc-300">
      <MagicalScrollEffects />

      {/* Navbar stays outside ScrollReveal — it must be visible immediately,
          not fade in on load */}
      <Navbar />

      {/* Landing Page Sections Flow */}

      {/* Hero loads with the page, so fade only (no slide-up jump) and no delay */}
      <ScrollReveal direction="fade" duration={900}>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <StrengthsSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <HowIWorkSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <AIDevelopmentSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <LanguagesSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ProjectsSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ExperienceSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <AchievementsSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ContactSection />
      </ScrollReveal>
    </main>
  );
}