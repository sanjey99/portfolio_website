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
    accent: "#34d399",
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
    accent: "#fbbf24",
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
    accent: "#f87171",
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
    accent: "#c084fc",
  },
];

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "#0a0a0a" }}
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
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Journey so far
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
            Work Experience
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative overflow-x-auto hide-scrollbar pb-6">
          {/* Timeline line */}
          <div
            className="absolute top-[52px] left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Direction indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span
              style={{
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Recent → Past
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
                    fontFamily: "'JetBrains Mono', monospace",
                    color: item.accent,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.year}
                </p>

                {/* Dot on timeline */}
                <div className="relative mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: item.accent,
                      boxShadow: `0 0 12px ${item.accent}40`,
                    }}
                  />
                </div>

                {/* Card with hover effect */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="p-5 rounded-xl w-full cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${item.accent}30`;
                    el.style.boxShadow = `0 8px 32px ${item.accent}12`;
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
                        fontFamily: "'Inter', sans-serif",
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
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.org}
                  </p>
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "10px",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "rgba(255,255,255,0.18)",
                    }}
                  >
                    {item.period}
                  </p>

                  <ul className="space-y-1.5 mb-3">
                    {item.description.map((desc, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: "11.5px",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: "rgba(255,255,255,0.35)",
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
                          fontSize: "9px",
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "rgba(255,255,255,0.25)",
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
      </div>
    </section>
  );
}
