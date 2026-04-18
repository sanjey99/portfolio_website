import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Code, Users } from "lucide-react";

const skills = {
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
  "Data & ML": [
    "Monte Carlo simulations",
    "VaR/CVaR risk scoring",
    "Fraud detection (scikit-learn)",
    "AI governance scoring",
    "Event-market backtesting",
  ],
  Databases: ["PostgreSQL", "MongoDB", "SQL Server"],
  "Data Tools": ["Pandas", "NumPy", "Plotly"],
};

const leadership = [
  {
    title: "NTU Hall 10 TOP (Main Committee 26/27)",
    desc: "Financial Controller for $10k budget (200 participants); real-time spend tracking, compliance, reimbursements.",
  },
  {
    title: "NTU ODAC — Special Projects Officer",
    desc: "Led 18-person team for overseas hiking expeditions. Organizing 40+ participant camp. Risk assessments, route planning, budgeting.",
  },
  {
    title: "Hall X — Orientation Group Leader (2026)",
    desc: "Guided new residents through orientation programming and hall culture integration.",
  },
  {
    title: "Treasurer — ODAC FOOT Subcommittee (2024-25)",
    desc: "Managed subcommittee finances and vendor coordination for outdoor expeditions.",
  },
  {
    title: "Treasurer — OCIP Programme (2025)",
    desc: "Budget management for overseas community involvement programme.",
  },
  {
    title: "Block 52 Representative (2024-25)",
    desc: "Liaison between residents and hall administration.",
  },
  {
    title: "SAJC — Honour Roll 2020, Ultimate Frisbee Captain",
    desc: "Team strategy, training, leadership. Physical Education Rep.",
  },
];

export function SkillsLeadershipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollScale, setScrollScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Start scaling when section enters view from bottom
      const progress = Math.max(
        0,
        Math.min(1, (viewH - rect.top) / (viewH + rect.height * 0.3))
      );
      // Scale from 0.92 to 1
      setScrollScale(0.92 + progress * 0.08);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(8.5% 0.006 65)" }}
    >
      <div
        className="max-w-[1200px] mx-auto"
        style={{
          transform: `scale(${scrollScale})`,
          transformOrigin: "center top",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Asymmetric layout: Skills wider, Leadership narrower */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Skills & Technical (wider) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 rounded-2xl p-7 md:p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(76% 0.155 65 / 0.1)" }}
              >
                <Code size={16} style={{ color: "oklch(76% 0.155 65)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#fff",
                }}
              >
                Skills & Technical
              </h3>
            </div>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "oklch(76% 0.155 65)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md"
                        style={{
                          fontSize: "11px",
                          fontFamily: "'Epilogue', sans-serif",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.45)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
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

          {/* Right: Leadership & Extracurriculars (narrower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 rounded-2xl p-7 md:p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(76% 0.155 65 / 0.1)" }}
              >
                <Users size={16} style={{ color: "oklch(76% 0.155 65)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#fff",
                }}
              >
                Leadership & Extracurriculars
              </h3>
            </div>

            <div className="space-y-0">
              {leadership.map((item, i) => (
                <div
                  key={item.title}
                  className="py-4"
                  style={{
                    borderBottom:
                      i < leadership.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Epilogue', sans-serif",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </p>
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
