export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string[];
  skills: string[];
  accent: string;
}
export const timelineData: TimelineItem[] = [
  {
    year: "2026",
    period: "Jul 2026 – Present",
    title: "Data Scientist Intern, Rhombus Platform (Labs Team)",
    org: "Vertex Holdings",
    description: [
      "Enabled LLM-driven meeting-note queries through a Django engine; hardened schema-aware retrieval, added 15 tests, " +
        "passed 3,422 tests, and earned manager praise for cleaner production table output.",
      "Resolved a silent PDF clipping bug and a separate table-layout crash; added a mutation-verified regression test " +
        "that checks the rendered CSS frame fits the physical page.",
      "Removed a CI ordering failure by tracing process-global factory state across digit-width boundaries; shipped a " +
        "boundary-invariant zero-padding fix and passed 2,030 tests.",
      "Delivered seven reviewed Django and Next.js changes in the first month, spanning LLM retrieval, reliability, " +
        "responsive UI, and report rendering.",
    ],
    skills: [
      "Python",
      "Django",
      "Django-Ninja",
      "PostgreSQL",
      "Next.js",
      "LangSmith",
      "GCP",
      "Testing",
    ],
    accent: "oklch(62% 0.11 158)",
  },
  {
    year: "2026",
    period: "May 2026 – Jul 2026",
    title: "Machine Learning & GenAI Engineer (Intern)",
    org: "Panasonic R&D Centre Singapore",
    description: [
      "Built and deployed an interactive SAM3 video-segmentation web app with multi-object prompting, full-video mask " +
        "propagation, and live SSE frame previews on a 24GB GPU server.",
      "Hardened the serving stack against mixed-precision, object-ID, and GPU race-condition failures; added mocked-GPU " +
        "tests and ran MLflow, Prometheus, and Grafana during development.",
      "Delivered a final chunk-wise streaming preview and migrated the application to an NVIDIA GB10 system for supervisor " +
        "handoff.",
    ],
    skills: [
      "Python",
      "FastAPI",
      "PyTorch",
      "React",
      "SAM3",
      "Docker",
      "Observability",
    ],
    accent: "oklch(65% 0.14 260)",
  },
  {
    year: "2025",
    period: "May 2025 – Jul 2025",
    title: "Software Development Engineer (Intern)",
    org: "Rohde & Schwarz Asia",
    description: [
      "Partnered with a supervisor and RF test engineer to turn a manual CSV-comparison workflow into filtering, " +
        "validation, and packaging requirements.",
      "Built a Python/Pandas tool that reconciles inconsistent schemas, surfaces missing and duplicate records, and " +
        "auto-populates Excel comparison reports plus device/calibration breakdowns.",
      "Presented the output to RF engineers and packaged the approved tool as a standalone executable for handover without " +
        "a Python setup.",
    ],
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "CSV processing",
      "Excel automation",
      "Requirements gathering",
    ],
    accent: "oklch(76% 0.155 65)",
  },
  {
    year: "2024",
    period: "Mar 2024 – May 2025",
    title: "Coding Instructor",
    org: "Empire Code",
    description: [
      "Registered MOE Instructor. Developed and delivered engaging lessons in coding and robotics to a secondary school " +
        "class of 38 students.",
      "Taught Minecraft Education Edition, enabling students to learn programming concepts through interactive gameplay " +
        "and project-based learning.",
      "Introduced video editing techniques, enhancing students' digital literacy and creativity. " +
        "Fostered a collaborative learning environment, encouraging teamwork and problem-solving skills among students. ",
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
      "Operated and maintained the High Mobility Artillery Rocket System (HIMARS) as part of 23rd Singapore Artillery. " +
        "Achieved rank of 3rd Sergeant through demonstrated leadership and technical proficiency. " +
        "Coordinated live-fire exercises requiring precision, discipline and real-time communication under pressure. " +
        "Led small teams in field operations, logistics planning and equipment readiness checks. ",
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
      "Assisted in the development and maintenance of engineering systems within the hotel, ensuring optimal functionality " +
        "and guest satisfaction.",
      "Collaborated with the engineering team to troubleshoot and resolve technical issues, enhancing operational " +
        "efficiency.",
      "Participated in projects aimed at improving energy efficiency and sustainability within the hotel premises. " +
        "Gained hands-on experience in problem-solving and critical thinking in a fast-paced environment. ",
    ],
    skills: ["Problem Solving", "Teamwork", "Technical Support"],
    accent: "oklch(46% 0.06 65)",
  },
];
