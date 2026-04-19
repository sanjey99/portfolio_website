import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectsSection } from "./components/ProjectsSection";
import { HackathonsSection } from "./components/HackathonsSection";
import { SkillsLeadershipSection } from "./components/SkillsLeadershipSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "oklch(8.5% 0.006 65)",
        fontFamily: "'Epilogue', sans-serif",
        color: "oklch(96% 0.008 65)",
      }}
    >
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <HackathonsSection />
      <SkillsLeadershipSection />
      <ContactSection />
      <Analytics />
    </div>
  );
}
