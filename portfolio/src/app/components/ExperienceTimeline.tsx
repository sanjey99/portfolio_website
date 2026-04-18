import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Briefcase } from "lucide-react";

interface TimelineItem {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string[];
  skills: string[];
  accent: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2025",
    period: "May 2025 – Aug 2025",
    title: "Software Development Intern",
    org: "Rohde & Schwarz",
    description: [
      "Developed software solutions using Python and libraries such as Pandas and NumPy to streamline data analysis processes, improving efficiency by 30%.",
      "Collaborated with cross-functional teams to gather requirements and implement features that enhance user experience.",
      "Conducted data analysis to support decision-making, utilizing statistical methods and data visualization techniques.",
    ],
    skills: [
      "Python",
      "GitLab",
      "C#",
      "Software Development",
      "Problem Solving",
      "Microsoft Excel",
      "Git",
    ],
    accent: "oklch(76% 0.155 65)",
  },
  {
    year: "2024",
    period: "Mar 2024 – May 2025",
    title: "Coding Instructor",
    org: "Empire Code",
    description: [
      "Registered MOE Instructor. Developed and delivered engaging lessons in coding and robotics to a secondary school class of 38 students.",
      "Taught Minecraft Education Edition, enabling students to learn programming concepts through interactive gameplay and project-based learning.",
      "Introduced video editing techniques, enhancing students' digital literacy and creativity.",
      "Fostered a collaborative learning environment, encouraging teamwork and problem-solving skills among students.",
    ],
    skills: [
      "Microbit",
      "Roblox Studio",
      "Lego Robotics",
      "Tynker",
      "Python",
      "Minecraft Education",
      "Blender",
      "JavaScript",
      "Scratch",
    ],
    accent: "oklch(67% 0.12 65)",
  },
  {
    year: "2022",
    period: "Mar 2022 – Feb 2024",
    title: "3SG, Artillery Specialist (HIMARS)",
    org: "Singapore Armed Forces (23 SA)",
    description: [
      "Operated and maintained the High Mobility Artillery Rocket System (HIMARS) as part of 23rd Singapore Artillery.",
      "Achieved rank of 3rd Sergeant through demonstrated leadership and technical proficiency.",
      "Coordinated live-fire exercises requiring precision, discipline and real-time communication under pressure.",
      "Led small teams in field operations, logistics planning and equipment readiness checks.",
    ],
    skills: [
      "Leadership",
      "Team Management",
      "Operations Planning",
      "Communication",
      "Discipline",
    ],
    accent: "oklch(56% 0.085 65)",
  },
  {
    year: "2022",
    period: "Feb 2022 – Mar 2022",
    title: "Engineer Intern",
    org: "Grand Hyatt Singapore",
    description: [
      "Assisted in the development and maintenance of engineering systems within the hotel, ensuring optimal functionality and guest satisfaction.",
      "Collaborated with the engineering team to troubleshoot and resolve technical issues, enhancing operational efficiency.",
      "Participated in projects aimed at improving energy efficiency and sustainability within the hotel premises.",
      "Gained hands-on experience in problem-solving and critical thinking in a fast-paced environment.",
    ],
    skills: ["Problem Solving", "Teamwork", "Technical Support"],
    accent: "oklch(46% 0.06 65)",
  },
];

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(8.5% 0.006 65)" }}
    >
      <div className="max-w-[1200px] mx-auto" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
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
            Journey so far
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
            Work Experience
          </h2>
        </motion.div>

        {/* Mobile: vertical stacked cards */}
        <div className="md:hidden space-y-4">
          {timelineData.map((item, i) => (
            <motion.div
              key={`mobile-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${item.accent}15` }}
                >
                  <Briefcase size={13} style={{ color: item.accent }} />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item.title}
                </span>
              </div>
              <p style={{ fontSize: "11px", fontFamily: "'Epilogue', sans-serif", color: "rgba(255,255,255,0.3)", marginBottom: "2px" }}>
                {item.org}
              </p>
              <p style={{ fontSize: "11px", fontFamily: "'Epilogue', sans-serif", color: "rgba(255,255,255,0.38)", marginBottom: "12px" }}>
                {item.period}
              </p>
              <ul className="space-y-1.5 mb-3">
                {item.description.map((desc, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Epilogue', sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.45)",
                      paddingLeft: "10px",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: item.accent, opacity: 0.5 }}>·</span>
                    {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded"
                    style={{
                      fontSize: "10px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal drag timeline */}
        <div className="hidden md:block relative">
          {/* Right-edge fade — signals scrollable content */}
          <div
            className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, oklch(8.5% 0.006 65) 0%, transparent 100%)",
            }}
          />

          <div className="overflow-x-auto hide-scrollbar pb-6">
            {/* Timeline line */}
            <div
              className="absolute top-[88px] left-0 right-0 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            {/* Direction indicator */}
            <div className="flex items-center gap-3 mb-6">
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 500,
                  color: "oklch(76% 0.155 65 / 0.55)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Drag to explore →
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>

          <div className="flex gap-0 min-w-max">
            {timelineData.map((item, i) => (
              <motion.div
                key={item.title + item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative flex flex-col items-start"
                style={{ width: "340px", paddingRight: "20px" }}
              >
                {/* Year label */}
                <p
                  className="mb-4"
                  style={{
                    fontSize: "11px",
                    fontFamily: "'Epilogue', sans-serif",
                    color: item.accent,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.year}
                </p>

                {/* Dot on timeline */}
                <div className="relative mb-6">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: item.accent }}
                  />
                </div>

                {/* Card with hover effect */}
                <motion.div
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="p-5 rounded-xl w-full cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "oklch(76% 0.155 65 / 0.22)";
                    el.style.boxShadow = "0 8px 28px oklch(76% 0.155 65 / 0.07)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.accent}15` }}
                    >
                      <Briefcase size={13} style={{ color: item.accent }} />
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontFamily: "'Epilogue', sans-serif",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p
                    className="mb-1"
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.org}
                  </p>
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Epilogue', sans-serif",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {item.period}
                  </p>

                  <ul className="space-y-1.5 mb-3">
                    {item.description.map((desc, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: "13px",
                          fontFamily: "'Epilogue', sans-serif",
                          fontWeight: 300,
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.45)",
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: item.accent,
                            opacity: 0.5,
                          }}
                        >
                          ·
                        </span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded"
                        style={{
                          fontSize: "10px",
                          fontFamily: "'Epilogue', sans-serif",
                          color: "rgba(255,255,255,0.3)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        </div> {/* close desktop relative wrapper */}
      </div>
    </section>
  );
}
