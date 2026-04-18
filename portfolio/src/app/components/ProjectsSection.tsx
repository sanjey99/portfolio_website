import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Lock } from "lucide-react";

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
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  const allFailed = images.every((_, i) => failedImages.has(i));

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {allFailed || failedImages.has(currentIndex) ? (
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
              Preview unavailable
            </span>
          </motion.div>
        ) : (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Project screenshot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            onError={() => setFailedImages((prev) => new Set([...prev, currentIndex]))}
          />
        )}
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: idx === currentIndex ? "oklch(76% 0.155 65)" : "rgba(255,255,255,0.3)",
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
      style={{ background: "oklch(9.5% 0.007 65)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "oklch(76% 0.155 65 / 0.65)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Projects
          </h2>
        </motion.div>

        {/* Featured first + 2-column grid for the rest */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className={`group relative rounded-2xl overflow-hidden cursor-default${i === 0 ? " md:col-span-2" : ""}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "oklch(76% 0.155 65 / 0.25)";
                el.style.boxShadow = "0 8px 32px oklch(76% 0.155 65 / 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              {i === 0 ? (
                /* Featured: horizontal layout */
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-7 flex flex-col justify-between gap-5">
                    <div>
                      <span
                        className="inline-block px-3 py-1 rounded-full mb-5"
                        style={{
                          fontSize: "10px",
                          fontFamily: "'Epilogue', sans-serif",
                          letterSpacing: "0.06em",
                          color: "oklch(76% 0.155 65)",
                          background: "oklch(76% 0.155 65 / 0.1)",
                          border: "1px solid oklch(76% 0.155 65 / 0.2)",
                        }}
                      >
                        {project.type}
                      </span>
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                            fontSize: "22px",
                            color: "rgba(255,255,255,0.92)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {project.title}
                        </h3>
                        {project.repo && project.repo !== "#" ? (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/30 hover:text-white/60 shrink-0 ml-3"
                          >
                            <Github size={14} />
                          </a>
                        ) : !project.repo ? (
                          <span
                            className="inline-flex items-center gap-1 shrink-0 ml-3"
                            style={{
                              fontSize: "10px",
                              fontFamily: "'Epilogue', sans-serif",
                              color: "rgba(255,255,255,0.2)",
                              letterSpacing: "0.04em",
                            }}
                          >
                            <Lock size={10} />
                            Academic
                          </span>
                        ) : null}
                      </div>
                      <p
                        className="mb-4"
                        style={{
                          fontSize: "14px",
                          fontFamily: "'Epilogue', sans-serif",
                          fontWeight: 300,
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.5)",
                          maxWidth: "55ch",
                        }}
                      >
                        {project.highlights}
                      </p>
                    </div>
                    <div>
                      <p
                        className="mb-3"
                        style={{
                          fontSize: "11px",
                          fontFamily: "'Epilogue', sans-serif",
                          color: "rgba(255,255,255,0.22)",
                          lineHeight: 1.5,
                        }}
                      >
                        {project.stack}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-1 rounded-md"
                            style={{
                              fontSize: "10px",
                              fontFamily: "'Epilogue', sans-serif",
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
                  </div>
                  {/* Visual: large dim title */}
                  <div
                    className="md:w-[260px] h-[120px] md:h-auto shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.015), rgba(255,255,255,0.003))" }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(44px, 5vw, 72px)",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        color: "oklch(76% 0.155 65 / 0.08)",
                        letterSpacing: "-0.04em",
                        userSelect: "none",
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                </div>
              ) : (
                /* Regular: stacked layout */
                <>
                  {project.images ? (
                    <div className="relative w-full h-[170px] overflow-hidden">
                      <ProjectImageCarousel images={project.images} />
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-[130px] flex items-center justify-center"
                      style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.015), rgba(255,255,255,0.003))" }}
                    >
                      <span
                        style={{
                          fontSize: "clamp(28px, 4vw, 42px)",
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 800,
                          color: "oklch(76% 0.155 65 / 0.07)",
                          letterSpacing: "-0.03em",
                          userSelect: "none",
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full mb-4"
                      style={{
                        fontSize: "10px",
                        fontFamily: "'Epilogue', sans-serif",
                        letterSpacing: "0.06em",
                        color:
                          project.type === "Personal"
                            ? "oklch(76% 0.155 65)"
                            : "oklch(62% 0.1 65)",
                        background: "oklch(76% 0.155 65 / 0.1)",
                        border: "1px solid oklch(76% 0.155 65 / 0.2)",
                      }}
                    >
                      {project.type}
                    </span>
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontWeight: 600,
                          fontSize: "17px",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {project.title}
                      </h3>
                      {project.repo && project.repo !== "#" ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/30 hover:text-white/60 shrink-0 ml-3"
                        >
                          <Github size={14} />
                        </a>
                      ) : !project.repo ? (
                        <span
                          className="inline-flex items-center gap-1 shrink-0 ml-3"
                          style={{
                            fontSize: "10px",
                            fontFamily: "'Epilogue', sans-serif",
                            color: "rgba(255,255,255,0.2)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          <Lock size={10} />
                          Academic
                        </span>
                      ) : null}
                    </div>
                    <p
                      className="mb-2"
                      style={{
                        fontSize: "11px",
                        fontFamily: "'Epilogue', sans-serif",
                        color: "rgba(255,255,255,0.22)",
                        lineHeight: 1.5,
                      }}
                    >
                      {project.stack}
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: "13px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.48)",
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
                            fontFamily: "'Epilogue', sans-serif",
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
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}