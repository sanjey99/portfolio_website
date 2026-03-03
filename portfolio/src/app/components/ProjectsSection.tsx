import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github } from "lucide-react";

interface Project {
  title: string;
  type: "Personal" | "Academic";
  stack: string;
  repo: string;
  highlights: string;
  keywords: string[];
  images?: string[];
}

const projects: Project[] = [
  {
    title: "FIN.IQ",
    type: "Personal",
    stack: "Python, FastAPI, Monte Carlo engines, fraud detection ML",
    repo: "https://github.com/sanjey99/hackathon-fin-ai",
    highlights:
      "Portfolio optimization via Monte Carlo VaR/CVaR, credit-card fraud detection models, API-first risk scoring dashboard.",
    keywords: ["Python", "FastAPI", "ML", "Monte Carlo"],
  },
  {
    title: "Polymarket Arbitrage Bot",
    type: "Personal",
    stack: "Python, event-market data, Telegram command surface",
    repo: "https://github.com/sanjey99/polymarket-arbitrage-bot",
    highlights:
      "Backtested trading logic, canary execution gates, shadow mode, telemetry pipeline, compliance-first approach.",
    keywords: ["Python", "WebSocket", "Trading", "Telegram"],
  },
  {
    title: "SC2002 OOP Internship System",
    type: "Academic",
    stack: "Java 17, OOP architecture, CSV data store, role-based ACL",
    repo: "",
    highlights:
      "Role-based CLI for students/staff/company reps; CSV-backed persistence; auth/password flows; internship matching & approvals.",
    keywords: ["Java", "OOP", "CLI", "Architecture"],
  },
  {
    title: "HomeCast — SC2006",
    type: "Academic",
    stack: "React, REST APIs, data.gov.sg, Agile SE",
    repo: "",
    highlights:
      "Full-stack web app using Singapore data.gov APIs for HDB livability insights. Property matching, survey-based recommendations, nearest amenities mapping.",
    keywords: ["React", "REST", "Agile", "data.gov"],
    images: ["/images/homecast-home.jpg", "/images/homecast-detail.jpg", "/images/homecast-results.jpg"],
  },
];

function ProjectImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Project screenshot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: idx === currentIndex ? "#4ade80" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Projects
          </h2>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                const accentColor =
                  project.type === "Personal" ? "#4ade80" : "#60a5fa";
                el.style.borderColor = `${accentColor}30`;
                el.style.boxShadow = `0 8px 32px ${accentColor}12`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Image area */}
              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  height: "200px",
                  background:
                    project.images
                      ? "transparent"
                      : "linear-gradient(145deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
                }}
              >
                {project.images ? (
                  <ProjectImageCarousel images={project.images} />
                ) : (
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.06)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.title}
                  </span>
                )}

                {/* Type badge */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full z-10"
                  style={{
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color:
                      project.type === "Personal"
                        ? "#4ade80"
                        : "#60a5fa",
                    background:
                      project.type === "Personal"
                        ? "rgba(74,222,128,0.15)"
                        : "rgba(96,165,250,0.15)",
                    border: `1px solid ${
                      project.type === "Personal"
                        ? "rgba(74,222,128,0.2)"
                        : "rgba(96,165,250,0.2)"
                    }`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {project.type}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.repo && project.repo !== "#" && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/30 hover:text-white/60 shrink-0 ml-3"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>

                <p
                  className="mb-2"
                  style={{
                    fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "rgba(255,255,255,0.25)",
                    lineHeight: 1.5,
                  }}
                >
                  {project.stack}
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
                  {project.highlights}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-md"
                      style={{
                        fontSize: "10px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "rgba(255,255,255,0.3)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </s