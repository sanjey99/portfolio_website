export interface TimelineItem {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string[];
  skills: string[];
}

export const timelineData: TimelineItem[] = [
  {
    year: "2026",
    period: "Jul 2026 – Present",
    title: "Data Scientist Intern, Rhombus Platform (Labs Team)",
    org: "Vertex Holdings",
    description: [
      "Enabled LLM-driven meeting-note queries through a Django engine; hardened schema-aware retrieval, added 15 tests, passed 3,422 tests, and earned manager praise for clearer production table output.",
      "Resolved a silent PDF clipping bug and a separate table-layout crash, then added a mutation-verified regression test against the physical page frame.",
      "Removed a CI ordering failure caused by process-global factory state at digit-width boundaries; the boundary-invariant fix passed 2,030 tests.",
      "Delivered 10 merged PRs across Django and Next.js, spanning retrieval, reliability, responsive UI, and report rendering.",
    ],
    skills: ["Python", "Django", "PostgreSQL", "Next.js", "LangSmith", "GCP"],
  },
  {
    year: "2026",
    period: "May 2026 – Jul 2026",
    title: "Machine Learning & GenAI Engineer (Intern)",
    org: "Panasonic R&D Centre Singapore",
    description: [
      "Built an interactive SAM3 video-segmentation application with multi-object prompting, full-video mask propagation, and live SSE frame previews on a 24GB GPU server.",
      "Hardened mixed-precision, object-ID, and GPU concurrency paths; added mocked-GPU tests and instrumented development with MLflow, Prometheus, and Grafana.",
      "Delivered chunk-wise streaming previews and migrated the application to an NVIDIA GB10 system for supervisor handoff.",
    ],
    skills: ["PyTorch", "FastAPI", "React", "SSE", "Docker", "Observability"],
  },
  {
    year: "2025",
    period: "May 2025 – Jul 2025",
    title: "Software Development Engineer (Intern)",
    org: "Rohde & Schwarz Asia",
    description: [
      "Translated a manual RF CSV-comparison workflow into filtering, validation, reporting, and packaging requirements with a supervisor and RF test engineer.",
      "Built a Python/Pandas tool that reconciled inconsistent schemas, surfaced missing and duplicate records, and generated Excel comparisons plus device and calibration breakdowns.",
      "Presented the approved workflow to RF engineers and packaged it as a standalone executable for handoff without a Python environment.",
    ],
    skills: ["Python", "Pandas", "NumPy", "Excel automation", "Requirements"],
  },
];
