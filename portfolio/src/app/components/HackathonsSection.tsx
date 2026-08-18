import { useState } from "react";
import { motion } from "motion/react";
import { GithubLogo, Trophy } from "@phosphor-icons/react";
import type { TrackId } from "../context/TrackContext";
import { PortfolioImage } from "./PortfolioImage";

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
    title: "BrainySG",
    event: "DSTA BrainHack 2026 (Open Category)",
    result: "Finalist",
    stack: "Go, Gin, Supabase, React, OpenAI GPT-4.1/5.4",
    repo: "https://github.com/sanjey99/BrainySG",
    tracks: ["fullstack", "all"],
    highlights:
      "AI crisis-response platform for Singapore: live cross-agency government feed ingestion (NEA weather/haze/dengue, LTA transport, PUB flood sensors), LLM-triaged resident alerts on a OneMap-based map, role-based volunteer coordination. Built the Go/Gin backend — JWT auth, crisis/task APIs, concurrent ingestion pipeline, thread-safe TTL cache — for a 6-person team.",
    accent: "oklch(73% 0.14 65)",
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
    stack: "React, Tailwind, Flask, MongoDB, Solidity, Hardhat",
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

  if (images.length === 0) return null;

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ border: `1px solid ${accent}55` }}>
      <PortfolioImage src={images[currentIndex]} alt="Hackathon photo" />
      {images.length > 1 && (
        <div className="absolute bottom-3 left-3 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className="carousel-control"
              style={{ background: idx === currentIndex ? accent : "rgba(36,39,34,0.76)" }}
            >{idx + 1}</button>
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
              fontFamily: "var(--font-body)",
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
              fontFamily: "var(--font-display)",
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
            fontFamily: "var(--font-body)",
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
              fontFamily: "var(--font-body)",
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
              className="group relative overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Info */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "rgba(255,255,255,0.92)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {hack.title}
                    </h3>
                    <span
                      className=""
                      style={{
                        fontSize: "10.5px",
                        fontFamily: "var(--font-body)",
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
                      fontFamily: "var(--font-body)",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {hack.event}
                  </p>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "13.5px",
                      fontFamily: "var(--font-body)",
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
                      fontFamily: "var(--font-body)",
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
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <GithubLogo size={13} />
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
