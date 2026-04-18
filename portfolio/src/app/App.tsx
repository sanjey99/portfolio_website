import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { MarqueeSection } from "./components/MarqueeSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { HackathonsSection } from "./components/HackathonsSection";
import { SkillsLeadershipSection } from "./components/SkillsLeadershipSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#0a0a0a",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      <Navbar />
      <HeroSection />
      <ExperienceTimeline />
      <MarqueeSection />
      <ProjectsSection />
      <HackathonsSection />
      <SkillsLeadershipSection />
      <ContactSection />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
