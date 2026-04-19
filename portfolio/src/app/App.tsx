import { useState } from "react";
import { AnimatePresence } from "motion/react";
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
import { TrackProvider, TrackId, TRACKS } from "./context/TrackContext";

function PortfolioApp() {
  const [showSelector, setShowSelector] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("all");
  const [patternVisible, setPatternVisible] = useState(false);

  const handleTrackComplete = (track: TrackId) => {
    setSelectedTrack(track);
    setPatternVisible(true);
    setShowSelector(false);
  };

  const handleReopen = () => {
    setPatternVisible(false);
    setShowSelector(true);
  };

  const activeTrack = patternVisible
    ? TRACKS.find((t) => t.id === selectedTrack)
    : undefined;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "oklch(8.5% 0.006 65)",
        fontFamily: "'Epilogue', sans-serif",
        color: "oklch(96% 0.008 65)",
        position: "relative",
      }}
    >
      {/* Full-page pattern layer — fades in during slot machine */}
      <PatternOverlay track={selectedTrack} visible={patternVisible} />

      {/* Track selector popup */}
      <AnimatePresence>
        {showSelector && (
          <TrackSelector onComplete={handleTrackComplete} />
        )}
      </AnimatePresence>

      {/* Portfolio content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar activeTrack={activeTrack} onReopenSelector={handleReopen} />
        <HeroSection />
        <MarqueeSection />
        <ExperienceTimeline track={selectedTrack} />
        <ProjectsSection track={selectedTrack} />
        <HackathonsSection track={selectedTrack} />
        <SkillsLeadershipSection track={selectedTrack} />
        <ContactSection />
      </div>

      <Analytics />
    </div>
  );
}

export default function App() {
  return (
    <TrackProvider>
      <PortfolioApp />
    </TrackProvider>
  );
}
