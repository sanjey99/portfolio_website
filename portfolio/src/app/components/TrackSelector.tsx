import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TRACKS, TrackId } from "../context/TrackContext";
import { PatternLayer } from "./TrackPatterns";

// ─── Starfield canvas ─────────────────────────────────────────────────────────

function StarfieldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const numStars = 200;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.4,
      opacity: 0.1 + Math.random() * 0.55,
      twinkleSpeed: 0.002 + Math.random() * 0.004,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const op = s.opacity * (0.7 + 0.3 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 225, 255, ${op})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

// ─── Slot reel ────────────────────────────────────────────────────────────────

function SlotReel({
  symbols, stopped, finalSymbol, color,
}: {
  symbols: string[];
  stopped: boolean;
  finalSymbol: string;
  color: string;
}) {
  const [current, setCurrent] = useState(symbols[0]);

  useEffect(() => {
    if (stopped) { setCurrent(finalSymbol); return; }
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % symbols.length; setCurrent(symbols[i]); }, 55);
    return () => clearInterval(id);
  }, [stopped, finalSymbol, symbols]);

  return (
    <div
      style={{
        width: 60,
        height: 60,
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
          initial={{ y: stopped ? 0 : -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: stopped ? 0.2 : 0.04 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: "20px",
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

interface Props {
  onComplete: (track: TrackId) => void;
}

export function TrackSelector({ onComplete }: Props) {
  const [flipIdx, setFlipIdx] = useState(0);
  const [chosen, setChosen] = useState<TrackId>("quant");
  const [phase, setPhase] = useState<"select" | "loading">("select");
  const [reelsStopped, setReelsStopped] = useState([false, false, false]);

  useEffect(() => {
    if (phase !== "select") return;
    const id = setInterval(() => setFlipIdx(p => (p + 1) % TRACKS.length), 1800);
    return () => clearInterval(id);
  }, [phase]);

  const handleGo = useCallback(() => {
    setPhase("loading");
    setReelsStopped([false, false, false]);

    // Faster stops: 550 / 850 / 1100ms
    [550, 850, 1100].forEach((delay, i) => {
      setTimeout(() => {
        setReelsStopped(prev => { const n = [...prev]; n[i] = true; return n; });
      }, delay);
    });

    setTimeout(() => onComplete(chosen), 1500);
  }, [chosen, onComplete]);

  const track = TRACKS.find(t => t.id === chosen)!;
  const flipTrack = TRACKS[flipIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(4.5% 0.008 240 / 0.95)",
      }}
    >
      {/* Starfield */}
      <StarfieldCanvas />

      {/* Subtle blue nebula vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(18% 0.06 240 / 0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Full-screen pattern preview */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.25, transition: "opacity 0.6s ease", pointerEvents: "none" }}>
        <PatternLayer track={chosen} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: -10 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "min(500px, 92vw)",
          background: "oklch(8.5% 0.012 240)",
          border: `1px solid ${track.color.replace(")", " / 0.22)")}`,
          borderRadius: 20,
          padding: "38px 34px 30px",
          overflow: "hidden",
          transition: "border-color 0.4s ease",
          zIndex: 1,
          boxShadow: `0 0 80px oklch(20% 0.06 240 / 0.4), 0 24px 64px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Card pattern overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.45, pointerEvents: "none" }}>
          <PatternLayer track={chosen} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {phase === "select" ? (
              <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <p style={{ fontSize: "10px", fontFamily: "'Epilogue', sans-serif", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "22px" }}>
                  What do you want to view?
                </p>

                {/* Flip display */}
                <div style={{ perspective: "600px", marginBottom: "6px", height: "52px", display: "flex", alignItems: "center" }}>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={flipIdx}
                      initial={{ rotateX: -80, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 80, opacity: 0 }}
                      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(20px, 4vw, 28px)",
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

                <p style={{ fontSize: "12px", fontFamily: "'Epilogue', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.28)", marginBottom: "28px", minHeight: "18px" }}>
                  {flipTrack.description}
                </p>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "22px" }} />

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
                        border: `1px solid ${track.color.replace(")", " / 0.22)")}`,
                        borderRadius: 8,
                        padding: "10px 36px 10px 14px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.75)",
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                      }}
                    >
                      {TRACKS.map(t => (
                        <option key={t.id} value={t.id} style={{ background: "#0a0c10", color: "#fff" }}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", fontSize: "10px", pointerEvents: "none" }}>▾</span>
                  </div>

                  <motion.button
                    onClick={handleGo}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 8,
                      border: "none",
                      background: track.color,
                      color: "oklch(10% 0.01 65)",
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
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
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "10px", fontFamily: "'Epilogue', sans-serif", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "28px" }}>
                  Loading
                </p>

                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "24px" }}>
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

                <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: "17px", color: track.color, letterSpacing: "-0.01em" }}>
                  {track.label}
                </p>

                <div style={{ marginTop: "18px", height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "1px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.35, ease: "linear" }}
                    style={{ height: "100%", background: track.color, transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
