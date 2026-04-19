import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Github } from "lucide-react";
import type { TrackId } from "../context/TrackContext";

interface Hackathon {
  title: string;
  event: string;
  result: string;
  stack: string;
  repo: string;
  highlights: string;
  accent: string;
  images: string[];
  tracks: TrackId[];
}

const hackathons: Hackathon[] = [
  {
    title: "Sentinel",
    event: "Deep Learning Week 2026, NTU",
    result: "3rd Place",
    stack: "React, Node/Express, FastAPI, Python, OpenClaw",
    repo: "https://github.com/sanjey99/dlweek",
    tracks: ["ml", "fullstack", "all"],
    highlights:
      "Policy-as-code gate, ML risk scoring + uncertainty output, human approval workflows, real-time governance feed, audit log, demo-ready UI.",
    accent: "oklch(76% 0.155 65)",
    images: [],
  },
  {
    title: "PRISM",
    event: "HacX 2025 (HTX + Microsoft)",
    result: "2nd Place",
    stack: "React, Node.js, Express, TypeScript, Socket.IO",
    repo: "https://github.com/sanjey99/PRISM-hacx",
    tracks: ["fullstack", "all"],
    highlights:
      "Prison transport management with real-time vehicle/inmate telemetry, 15+ API endpoints, edge-compute demo, audit logging.",
    accent: "oklch(70% 0.13 65)",
    images: ["/images/hacx-prize.jpg", "/images/hacx-presentation.jpg"],
  },
  {
    title: "HarvestChain",
    event: "APRU x Google Tech Policy Hackathon 2025",
    result: "Global Top 5",
    stack: "React, Tailwind, Flask, MongoDB, XRPL, Solidity, MetaMask",
    repo: "https://github.com/sanjey99/harvestchain",
    tracks: ["fullstack", "all"],
    highlights:
      "Self-Sovereign Identity for blockchain-backed credit, micro-futures smart contracts for fair fish pricing, Fisherfolk financial equity.",
    accent: "oklch(80% 0.16 65)",
    images: [
      "/images/harvestchain1.jpg",
      "/images/harvestchain-dashboard.jpg",
      "/images/harvestchain-google.jpg",
      "/images/harvestchain-audience.jpg",
      "/images/harvestchain-judges.jpg",
    ],
  },
  {
    title: "International Quant Championship",
    event: "WorldQuant 2025",
    result: "Gold Award",
    stack: "BRAIN platform, Alpha modeling, Backtesting",
    repo: "#",
    tracks: ["quant", "all"],
    highlights:
      "Ran 200+ backtests on BRAIN before submitting top-scoring alpha; Gold award for producing 10k points in the global ranking. Signals combined decay, neutralisation & risk constraints to improve Sharpe-style metrics.",
    accent: "oklch(64% 0.1 65)",
    images: ["/images/worldquant-1.png", "/images/worldquant2.png"],
  },
];

function ImageCarousel({ images, accent }: { images: string[]; accent: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [next, images.length]);

  if (images.length === 0) return null;

  const imageLoaded = !failedImages.has(currentIndex);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {imageLoaded ? (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Hackathon photo"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            onError={() => setFailedImages((prev) => new Set([...prev, currentIndex]))}
          />
        ) : (
          <motion.div
            key={`fallback-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.015), rgba(255,255,255,0.003))" }}
          >
            <span style={{ fontSize: "11px", fontFamily: "'Epilogue', sans-serif", color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em" }}>
              Photo unavailable
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Gradient overlay for polish */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
        }}
      />
      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  idx === currentIndex ? accent : "rgba(255,255,255,0.35)",
                transform: idx === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HackathonsSection({ track }: { track: TrackId }) {
  const visible = hackathons.filter(h => h.tracks.includes(track));
  if (visible.length === 0) return null;

  return (
    <section
      id="hackathons"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(8.5% 0.006 65)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Big statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p
            style={{
              fontSize: "11px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.13em",
              color: "oklch(76% 0.155 65 / 0.6)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Competitions & Wins
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "oklch(96% 0.008 65)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Built under
            <br />
            pressure<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-16"
          style={{
            fontSize: "13.5px",
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.35)",
            maxWidth: "480px",
          }}
        >
          Hackathons, competitions, and wins. Shipped for impact.
        </motion.p>

        {/* Sub-heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <Trophy size={14} style={{ color: "oklch(76% 0.155 65)" }} />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
            }}
          >
            Hackathons & Competitions
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </motion.div>

        {/* Hackathon cards - info left, images right */}
        <div className="space-y-6">
          {visible.map((hack, i) => (
            <motion.div
              key={hack.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group relative rounded-xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${hack.accent}55`;
                el.style.boxShadow = `0 8px 28px ${hack.accent}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Info */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "rgba(255,255,255,0.92)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {hack.title}
                    </h3>
                    <span
                      className="rounded-full"
                      style={{
                        fontSize: "10.5px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: hack.accent,
                        background: hack.accent.replace(")", " / 0.18)"),
                        border: `1px solid ${hack.accent.replace(")", " / 0.38)")}`,
                        padding: "3px 10px",
                      }}
                    >
                      {hack.result}
                    </span>
                  </div>

                  <p
                    className="mb-3"
                    style={{
                      fontSize: "12px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {hack.event}
                  </p>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "13.5px",
                      fontFamily: "'Epilogue', sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {hack.highlights}
                  </p>

                  <p
                    className="mb-3"
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    {hack.stack}
                  </p>

                  {hack.repo !== "#" && (
                    <a
                      href={hack.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors"
                      style={{
                        fontSize: "11px",
                        fontFamily: "'Epilogue', sans-serif",
                      }}
                    >
                      <Github size={13} />
                      View Repo
                    </a>
                  )}
                </div>

                {/* Right: Image carousel */}
                {hack.images.length > 0 && (
                  <div className="md:w-[380px] h-[240px] md:h-auto shrink-0 p-3">
                    <ImageCarousel images={hack.images} accent={hack.accent} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
