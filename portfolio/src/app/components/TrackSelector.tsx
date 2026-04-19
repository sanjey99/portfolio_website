import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TRACKS, TrackId } from "../context/TrackContext";
import { PatternLayer } from "./TrackPatterns";

interface Props {
  onComplete: (track: TrackId) => void;
}

// ─── Slot reel ────────────────────────────────────────────────────────────────

function SlotReel({
  symbols,
  stopped,
  finalSymbol,
  color,
}: {
  symbols: string[];
  stopped: boolean;
  finalSymbol: string;
  color: string;
}) {
  const [current, setCurrent] = useState(symbols[0]);

  useEffect(() => {
    if (stopped) {
      setCurrent(finalSymbol);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % symbols.length;
      setCurrent(symbols[i]);
    }, 75);
    return () => clearInterval(id);
  }, [stopped, finalSymbol, symbols]);

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 10,
        border: `1px solid ${color.replace(")", " / 0.3)")}`,
        background: color.replace(")", " / 0.08)"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: stopped ? 0 : -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 18, opacity: 0 }}
          transition={{ duration: stopped ? 0.25 : 0.06 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color,
            position: "absolute",
          }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TrackSelector({ onComplete }: Props) {
  const [flipIdx, setFlipIdx] = useState(0);
  const [chosen, setChosen] = useState<TrackId>("quant");
  const [phase, setPhase] = useState<"select" | "loading">("select");
  const [reelsStopped, setReelsStopped] = useState([false, false, false]);

  // Auto-cycle flip display
  useEffect(() => {
    if (phase !== "select") return;
    const id = setInterval(() => setFlipIdx(p => (p + 1) % TRACKS.length), 1800);
    return () => clearInterval(id);
  }, [phase]);

  const handleGo = useCallback(() => {
    setPhase("loading");
    setReelsStopped([false, false, false]);

    const stops = [1400, 2100, 2750];
    stops.forEach((delay, i) => {
      setTimeout(() => {
        setReelsStopped(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay);
    });

    // Dismiss after last reel + brief pause
    setTimeout(() => onComplete(chosen), 3400);
  }, [chosen, onComplete]);

  const track = TRACKS.find(t => t.id === chosen)!;
  const flipTrack = TRACKS[flipIdx];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(5% 0.005 65 / 0.88)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* Full-screen pattern preview — shifts as chosen track changes */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, transition: "opacity 0.6s ease" }}>
        <PatternLayer track={chosen} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "min(520px, 92vw)",
          background: "oklch(9% 0.008 65)",
          border: `1px solid ${track.color.replace(")", " / 0.2)")}`,
          borderRadius: 18,
          padding: "40px 36px 32px",
          overflow: "hidden",
          transition: "border-color 0.4s ease",
          zIndex: 1,
        }}
      >
        {/* Card-level pattern (more opaque) */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }}>
          <PatternLayer track={chosen} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {phase === "select" ? (
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Label */}
                <p
                  style={{
                    fontSize: "10px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "24px",
                  }}
                >
                  What do you want to view?
                </p>

                {/* Flip word display */}
                <div style={{ perspective: "600px", marginBottom: "8px", height: "56px", display: "flex", alignItems: "center" }}>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={flipIdx}
                      initial={{ rotateX: -80, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 80, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(22px, 4vw, 30px)",
                        color: flipTrack.color,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        margin: 0,
                        transformOrigin: "center bottom",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {flipTrack.label}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "32px",
                    minHeight: "18px",
                    transition: "color 0.3s",
                  }}
                >
                  {flipTrack.description}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                    marginBottom: "24px",
                  }}
                />

                {/* Selector row */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <select
                      value={chosen}
                      onChange={e => {
                        setChosen(e.target.value as TrackId);
                        setFlipIdx(TRACKS.findIndex(t => t.id === e.target.value));
                      }}
                      style={{
                        width: "100%",
                        appearance: "none",
                        WebkitAppearance: "none",
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${track.color.replace(")", " / 0.25)")}`,
                        borderRadius: 8,
                        padding: "10px 36px 10px 14px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.75)",
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                      }}
                    >
                      {TRACKS.map(t => (
                        <option key={t.id} value={t.id} style={{ background: "#111", color: "#fff" }}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <span
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "10px",
                        pointerEvents: "none",
                      }}
                    >
                      ▾
                    </span>
                  </div>

                  <motion.button
                    onClick={handleGo}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 8,
                      border: "none",
                      background: track.color,
                      color: "oklch(10% 0.01 65)",
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Go →
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Loading / slot machine phase */
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: "32px",
                  }}
                >
                  Loading
                </p>

                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "28px" }}>
                  {[0, 1, 2].map(i => (
                    <SlotReel
                      key={i}
                      symbols={track.symbols}
                      stopped={reelsStopped[i]}
                      finalSymbol={track.symbols[i * 2]}
                      color={track.color}
                    />
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: track.color,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {track.label}
                </p>

                {/* Loading bar */}
                <div
                  style={{
                    marginTop: "20px",
                    height: "2px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "1px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3.2, ease: "linear" }}
                    style={{
                      height: "100%",
                      background: track.color,
                      transformOrigin: "left",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
