import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Github } from "lucide-react";

interface Hackathon {
  title: string;
  event: string;
  result: string;
  stack: string;
  repo: string;
  highlights: string;
  accent: string;
  images: string[];
}

const hackathons: Hackathon[] = [
  {
    title: "Sentinel",
    event: "Deep Learning Week 2026, NTU",
    result: "Finalist (Judging)",
    stack: "React, Node/Express, FastAPI, Python, OpenClaw",
    repo: "https://github.com/sanjey99/dlweek",
    highlights:
      "Policy-as-code gate, ML risk scoring + uncertainty output, human approval workflows, real-time governance feed, audit log, demo-ready UI.",
    accent: "#60a5fa",
    images: [],
  },
  {
    title: "PRISM",
    event: "HacX 2025 (HTX + Microsoft)",
    result: "2nd Place",
    stack: "React, Node.js, Express, TypeScript, Socket.IO",
    repo: "https://github.com/sanjey99/PRISM-hacx",
    highlights:
      "Prison transport management with real-time vehicle/inmate telemetry, 15+ API endpoints, edge-compute demo, audit logging.",
    accent: "#f87171",
    images: ["/images/hacx-prize.jpg", "/images/hacx-presentation.jpg"],
  },
  {
    title: "HarvestChain",
    event: "APRU x Google Tech Policy Hackathon 2025",
    result: "Global Top 5",
    stack: "React, Tailwind, Flask, MongoDB, XRPL, Solidity, MetaMask",
    repo: "https://github.com/sanjey99/harvestchain",
    highlights:
      "Self-Sovereign Identity for blockchain-backed credit, micro-futures smart contracts for fair fish pricing, Fisherfolk financial equity.",
    accent: "#fbbf24",
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
    highlights:
      "Ran 200+ backtests on BRAIN before submitting top-scoring alpha; Gold award for producing 10k points in the global ranking. Signals combined decay, neutralisation & risk constraints to improve Sharpe-style metrics.",
    accent: "#c084fc",
    images: ["/images/worldquant-1.png", "/images/worldquant2.png"],
  },
];

function ImageCarousel({ images, accent }: { images: string[]; accent: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [next, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Hackathon photo"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />
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

export function HackathonsSection() {
  return (
    <section
      id="hackathons"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Big statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Built under
            <br />
            pressure<span style={{ color: "#4ade80" }}>.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-16"
          style={{
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.35)",
            maxWidth: "500px",
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
          <Trophy size={16} style={{ color: "#4ade80" }} />
          <span
            style={{
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.05em",
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
          {hackathons.map((hack, i) => (
            <motion.div
              key={hack.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.01,
                y: -3,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="group relative rounded-xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${hack.accent}30`;
                el.style.boxShadow = `0 8px 32px ${hack.accent}12`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ background: hack.accent }}
              />

              <div className="flex flex-col md:flex-row">
                {/* Left: Info */}
                <div className="flex-1 p-6 pl-7">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {hack.title}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full"
                      style={{
                        fontSize: "10px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: hack.accent,
                        background: `${hack.accent}12`,
                        border: `1px solid ${hack.accent}25`,
                      }}
                    >
                      {hack.result}
                    </span>
                  </div>

                  <p
                    className="mb-3"
                    style={{
                      fontSize: "12px",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {hack.event}
                  </p>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {hack.highlights}
                  </p>

                  <p
                    className="mb-3"
                    style={{
                      fontSize: "11px",
                      fontFamily: "'JetBrains Mono', monospace",
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
                        fontFamily: "'JetBrains Mono', monospace",
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
