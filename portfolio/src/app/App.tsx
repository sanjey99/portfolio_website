import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectsSection } from "./components/ProjectsSection";
import { HackathonsSection } from "./components/HackathonsSection";
import { SkillsLeadershipSection } from "./components/SkillsLeadershipSection";
import { ContactSection } from "./components/ContactSection";
import { TrackSelector } from "./components/TrackSelector";
import { PatternOverlay } from "./components/PatternOverlay";
import { LegalPage } from "./components/LegalPage";
import { privacy, terms } from "./data/legal";
import { TrackProvider, TrackId, TRACKS } from "./context/TrackContext";

type Stage = "hero" | "selecting" | "portfolio";

function PortfolioApp() {
  const [stage, setStage] = useState<Stage>("hero");
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("all");
  const [patternVisible, setPatternVisible] = useState(false);

  const handleEnter = () => setStage("selecting");

  const handleTrackComplete = (track: TrackId) => {
    setSelectedTrack(track);
    setPatternVisible(true);
    setStage("portfolio");
  };

  const handleReopen = () => {
    setPatternVisible(false);
    setStage("selecting");
  };

  const activeTrack = stage === "portfolio"
    ? TRACKS.find((t) => t.id === selectedTrack)
    : undefined;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "var(--background)",
        fontFamily: "var(--font-body)",
        color: "var(--foreground)",
        position: "relative",
      }}
    >
      {stage === "selecting" && <TrackSelector onComplete={handleTrackComplete} />}

      {/* Full-page pattern layer — fades in after track chosen */}
      <PatternOverlay track={selectedTrack} visible={patternVisible} />

      {/* Portfolio content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {stage === "hero" && (
          <HeroSection onEnter={handleEnter} />
        )}

        {stage === "portfolio" && (
          <>
            <Navbar activeTrack={activeTrack} onReopenSelector={handleReopen} />
            <MarqueeSection track={selectedTrack} />
            <ExperienceTimeline track={selectedTrack} />
            <ProjectsSection track={selectedTrack} />
            <HackathonsSection track={selectedTrack} />
            <SkillsLeadershipSection track={selectedTrack} />
            <ContactSection track={selectedTrack} />
          </>
        )}
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
    <TrackProvider>
      <PortfolioApp />
    </TrackProvider>
  );
}
