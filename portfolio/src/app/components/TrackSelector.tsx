import { useCallback, useState } from "react";
import { Check } from "@phosphor-icons/react";
import { TRACKS, type TrackId } from "../context/TrackContext";
import { PatternLayer } from "./TrackPatterns";

interface Props {
  onComplete: (track: TrackId) => void;
}

export function TrackSelector({ onComplete }: Props) {
  const [chosen, setChosen] = useState<TrackId>("quant");
  const track = TRACKS.find((item) => item.id === chosen)!;
  const handleSelect = useCallback(() => onComplete(chosen), [chosen, onComplete]);

  return (
    <main
      aria-label="Choose portfolio perspective"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "oklch(13% 0.012 65)",
      }}
    >
      <PatternLayer track={chosen} style={{ opacity: 0.25 }} />
      <section
        style={{
          position: "relative",
          width: "min(560px, 100%)",
          padding: "32px",
          background: "oklch(16% 0.012 65)",
          border: `1px solid ${track.color.replace(")", " / 0.35)")}`,
          borderRadius: "2px",
        }}
      >
        <p className="eyebrow">Portfolio perspective</p>
        <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: "clamp(34px, 5vw, 52px)", color: "#f4efdf", margin: "8px 0" }}>
          {track.label}
        </h1>
        <p style={{ color: "rgba(244,239,223,0.68)", marginBottom: "24px" }}>{track.description}</p>
        <div className="track-selector-grid">
          {TRACKS.map((item) => (
            <button
              className="track-choice"
              key={item.id}
              type="button"
              onClick={() => setChosen(item.id)}
              aria-pressed={item.id === chosen}
              style={{ borderColor: item.id === chosen ? item.color : "rgba(244,239,223,0.18)" }}
            >
              <span>{item.label}</span>
              {item.id === chosen && <Check size={16} weight="bold" style={{ color: item.color }} />}
            </button>
          ))}
        </div>
        <button className="primary-action" type="button" onClick={handleSelect}>
          View selected work
        </button>
      </section>
    </main>
  );
}
