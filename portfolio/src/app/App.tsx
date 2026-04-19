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
import { WarpTransition } from "./components/WarpTransition";
import { TrackProvider, TrackId, TRACKS } from "./context/TrackContext";

type Stage = "hero" | "warping" | "selecting" | "portfolio";

function PortfolioApp() {
  const [stage, setStage] = useState<Stage>("hero");
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("all");
  const [patternVisible, setPatternVisible] = useState(false);

  const handleEnter = () => setStage("warping");
  const handleWarpDone = () => setStage("selecting");

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
        background: "oklch(8.5% 0.006 65)",
        fontFamily: "'Epilogue', sans-serif",
        color: "oklch(96% 0.008 65)",
        position: "relative",
      }}
    >
      {/* Warp animation — plays between hero and selector */}
      <AnimatePresence>
        {stage === "warping" && (
          <WarpTransition onComplete={handleWarpDone} />
        )}
      </AnimatePresence>

      {/* Track selector popup — shown after warp */}
      <AnimatePresence>
        {stage === "selecting" && (
          <TrackSelector onComplete={handleTrackComplete} />
        )}
      </AnimatePresence>

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
  return (
    <TrackProvider>
      <PortfolioApp />
    </TrackProvider>
  );
}
