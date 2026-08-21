import { Analytics } from "@vercel/analytics/react";
import { ContactSection } from "./components/ContactSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { HeroSection } from "./components/HeroSection";
import { LegalPage } from "./components/LegalPage";
import { Navbar } from "./components/Navbar";
import { PatternOverlay } from "./components/PatternOverlay";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsLeadershipSection } from "./components/SkillsLeadershipSection";
import { WorkViewProvider } from "./context/TrackContext";
import { privacy, terms } from "./data/legal";

function PortfolioApp() {
  return (
    <div className="site-shell">
      <PatternOverlay />
      <div className="site-content">
        <Navbar />
        <main>
          <HeroSection />
          <ExperienceTimeline />
          <ProjectsSection />
          <SkillsLeadershipSection />
        </main>
        <ContactSection />
      </div>
      <Analytics />
    </div>
  );
}

export default function App() {
  const pathname = window.location.pathname;
  if (pathname === "/terms") return <LegalPage document={terms} />;
  if (pathname === "/privacy") return <LegalPage document={privacy} />;

  return (
    <WorkViewProvider>
      <PortfolioApp />
    </WorkViewProvider>
  );
}
