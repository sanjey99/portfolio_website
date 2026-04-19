import { motion } from "motion/react";
import type { TrackId } from "../context/TrackContext";
import { TRACKS } from "../context/TrackContext";

const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "C#", "SQL"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Socket.IO"],
  "Backend / APIs": [
    "Node.js + Express",
    "FastAPI",
    "Flask",
    "Java Spring Boot",
    "REST API design",
    "WebSockets",
  ],
  "ML & AI": [
    "PyTorch",
    "LoRA / QLoRA",
    "GRPO / DPO alignment",
    "LangGraph",
    "vLLM",
    "CLIP",
    "Triton kernels",
    "RAGAS",
    "LightGBM",
    "FAISS",
    "scikit-learn",
  ],
  "Quant / Finance": [
    "VaR / CVaR",
    "Monte Carlo simulation",
    "Fama-French 3-Factor",
    "Efficient Frontier (SLSQP)",
    "CCAR stress testing",
    "PSI + KS drift detection",
  ],
  "Data & Infrastructure": [
    "Kafka KRaft",
    "TimescaleDB",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "Qdrant",
    "Pandas",
    "NumPy",
    "Docker",
    "Prometheus + Grafana",
  ],
};

const leadership = [
  {
    title: "NTU Hall 10 TOP — Financial Controller",
    period: "AY 26/27",
    desc: "$10k budget, 200 participants. Real-time spend tracking, compliance, reimbursements.",
  },
  {
    title: "NTU ODAC — Special Projects Officer",
    period: "2025–26",
    desc: "Led 18-person team for overseas expeditions. 40+ participant camp: risk, routing, budget.",
  },
  {
    title: "Hall X — Orientation Group Leader",
    period: "2026",
    desc: "Guided new residents through orientation programming and hall culture.",
  },
  {
    title: "ODAC FOOT — Treasurer",
    period: "2024–25",
    desc: "Subcommittee finances and vendor coordination for outdoor expeditions.",
  },
  {
    title: "OCIP Programme — Treasurer",
    period: "2025",
    desc: "Budget management for overseas community involvement programme.",
  },
  {
    title: "SAJC — Honour Roll & Ultimate Frisbee Captain",
    period: "2020",
    desc: "Team strategy, training, leadership. Physical Education Representative.",
  },
];

const TRACK_SKILL_CATEGORIES: Record<TrackId, string[]> = {
  quant: ["Languages", "Quant / Finance", "Data & Infrastructure"],
  ml: ["Languages", "ML & AI", "Data & Infrastructure"],
  fullstack: ["Languages", "Frontend", "Backend / APIs", "Data & Infrastructure"],
  all: Object.keys({
    Languages: [], Frontend: [], "Backend / APIs": [], "ML & AI": [],
    "Quant / Finance": [], "Data & Infrastructure": [],
  }),
};

export function SkillsLeadershipSection({ track }: { track: TrackId }) {
  const visibleCategories = TRACK_SKILL_CATEGORIES[track];
  const filteredSkills = Object.fromEntries(
    Object.entries(skills).filter(([cat]) => visibleCategories.includes(cat))
  );
  const trackColor = TRACKS.find(t => t.id === track)?.color ?? "oklch(76% 0.155 65)";
  const trackColorDim = trackColor.replace(")", " / 0.6)");
  const trackColorFaint = trackColor.replace(")", " / 0.08)");

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(8.5% 0.006 65)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            style={{
              fontSize: "11px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: trackColorDim,
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Capabilities
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(30px, 5vw, 52px)",
              color: "oklch(96% 0.008 65)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            Skills & Leadership
          </h2>
        </motion.div>

        {/* Asymmetric layout: Skills 3/5, Leadership 2/5 */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Left: Skills (wider) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className="space-y-8">
              {Object.entries(filteredSkills).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-3">
                    <p
                      style={{
                        fontSize: "10px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 600,
                        color: trackColorDim,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {category}
                    </p>
                    <div
                      className="flex-1 h-px"
                      style={{ background: trackColorFaint }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "11.5px",
                          fontFamily: "'Epilogue', sans-serif",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.5)",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          padding: "4px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Leadership (narrower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 600,
                  color: trackColorDim,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Leadership
              </p>
              <div
                className="flex-1 h-px"
                style={{ background: trackColorFaint }}
              />
            </div>

            <div>
              {leadership.map((item, i) => (
                <div
                  key={item.title}
                  className="py-4"
                  style={{
                    borderBottom:
                      i < leadership.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p
                      style={{
                        fontSize: "13px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.72)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.title}
                    </p>
                    <span
                      style={{
                        fontSize: "10px",
                        fontFamily: "'Epilogue', sans-serif",
                        color: "rgba(255,255,255,0.22)",
                        flexShrink: 0,
                        paddingTop: "2px",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "'Epilogue', sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
