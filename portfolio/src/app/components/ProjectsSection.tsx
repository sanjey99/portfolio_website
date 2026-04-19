import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Github, Lock, TrendingUp, BrainCircuit, BookOpen } from "lucide-react";
import type { TrackId } from "../context/TrackContext";

type Category = "quant" | "ml" | "academic";

interface Metric {
  label: string;
  value: string;
}

interface Project {
  title: string;
  subtitle: string;
  category: Category;
  tracks: TrackId[];
  stack: string[];
  repo: string;
  description: string;
  metrics?: Metric[];
  badge: string;
  featured?: boolean;
}

const categoryConfig = {
  quant: {
    label: "Finance & Quant",
    Icon: TrendingUp,
    accent: "oklch(76% 0.155 65)",
    border: "oklch(76% 0.155 65 / 0.18)",
    hoverBorder: "oklch(76% 0.155 65 / 0.38)",
    cardBg: "oklch(10.8% 0.014 65)",
    metricBg: "oklch(13% 0.018 65 / 0.6)",
    shadow: "0 10px 40px oklch(76% 0.155 65 / 0.1)",
    dim: "oklch(76% 0.155 65 / 0.5)",
  },
  ml: {
    label: "Machine Learning & AI",
    Icon: BrainCircuit,
    accent: "oklch(62% 0.11 158)",
    border: "oklch(62% 0.11 158 / 0.18)",
    hoverBorder: "oklch(62% 0.11 158 / 0.38)",
    cardBg: "oklch(10.8% 0.009 158)",
    metricBg: "oklch(13% 0.012 158 / 0.6)",
    shadow: "0 10px 40px oklch(62% 0.11 158 / 0.1)",
    dim: "oklch(62% 0.11 158 / 0.5)",
  },
  academic: {
    label: "Academic & Systems",
    Icon: BookOpen,
    accent: "oklch(52% 0.03 65)",
    border: "oklch(52% 0.03 65 / 0.18)",
    hoverBorder: "oklch(52% 0.03 65 / 0.32)",
    cardBg: "oklch(9.8% 0.006 65)",
    metricBg: "oklch(11.5% 0.008 65 / 0.6)",
    shadow: "0 6px 24px rgba(255,255,255,0.04)",
    dim: "oklch(52% 0.03 65 / 0.5)",
  },
};

const projects: Project[] = [
  {
    title: "Portfolio Risk Analytics",
    subtitle: "Real-time quant risk infrastructure",
    category: "quant",
    tracks: ["quant", "all"],
    stack: ["Python", "FastAPI", "Kafka KRaft", "TimescaleDB", "Redis"],
    repo: "https://github.com/sanjey99/PortfolioRisk",
    description:
      "Production-grade risk platform: VaR (parametric, historical, Monte Carlo 10k paths), CVaR/Expected Shortfall, Markowitz Efficient Frontier (SLSQP), Fama-French 3-Factor OLS regression, CCAR stress tests. Kafka KRaft event-driven pipeline + Redis 300s TTL cache.",
    metrics: [
      { label: "VaR methods", value: "3" },
      { label: "Stress scenarios", value: "4 CCAR" },
      { label: "Cache latency", value: "<5ms hit" },
      { label: "Factor model", value: "Fama-French 3F" },
    ],
    badge: "Personal",
    featured: true,
  },
  {
    title: "Algorithmic Arbitrage Trading Bot",
    subtitle: "Cross-exchange statistical arbitrage engine",
    category: "quant",
    tracks: ["quant", "all"],
    stack: ["Python", "CCXT", "Pandas", "NumPy", "asyncio"],
    repo: "https://github.com/sanjey99/algo-trading",
    description:
      "Automated arbitrage bot exploiting price discrepancies across exchanges using statistical mean-reversion signals. Asynchronous order execution, real-time spread monitoring, configurable risk limits, and PnL tracking.",
    metrics: [
      { label: "Strategy", value: "Stat. arbitrage" },
      { label: "Execution", value: "Async / asyncio" },
      { label: "Risk", value: "Configurable limits" },
    ],
    badge: "Personal",
  },
  {
    title: "FIN.IQ",
    subtitle: "Finance AI microservices platform",
    category: "quant",
    tracks: ["quant", "fullstack", "all"],
    stack: ["Python", "FastAPI", "PyTorch", "React", "Docker"],
    repo: "https://github.com/sanjey99/hackathon-fin-ai",
    description:
      "Microservices finance AI: Monte Carlo VaR/CVaR portfolio optimization, deep-learning credit-card fraud detection, API-first risk scoring dashboard. React frontend, FastAPI + Node.js backend, PyTorch ML service.",
    metrics: [
      { label: "Simulation", value: "Monte Carlo" },
      { label: "Risk measures", value: "VaR + CVaR" },
      { label: "Architecture", value: "4 microservices" },
    ],
    badge: "Personal",
  },
  {
    title: "LLM Fine-Tuning & Alignment Lab",
    subtitle: "LoRA from scratch → GRPO → Triton",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["PyTorch", "vLLM", "Triton", "HuggingFace TRL", "W&B"],
    repo: "https://github.com/sanjey99/llm-fine-tuning-rag-lab",
    description:
      "Full LLM pipeline: LoRA implemented from NumPy → PyTorch (paper-level math, not peft.get_peft_model()); QLoRA SFT 4-bit NF4; GRPO vs DPO alignment head-to-head; Triton fused softmax kernel (2 HBM passes vs 3 naive). Production serving: FastAPI + vLLM + Prometheus/Grafana.",
    metrics: [
      { label: "Backbone", value: "Qwen-2.5-7B" },
      { label: "Hardware", value: "RTX 4060 Ti 8GB" },
      { label: "Alignment", value: "GRPO vs DPO" },
      { label: "Kernel", value: "Triton fused softmax" },
    ],
    badge: "Personal",
    featured: true,
  },
  {
    title: "Multi-Agent Reasoning System",
    subtitle: "LangGraph · RAGAS · production serving",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["LangGraph", "vLLM", "Qdrant", "Celery", "FastAPI", "Grafana"],
    repo: "https://github.com/sanjey99/multi-agent-reasoning-system",
    description:
      "Autonomous research generator: 5-agent pipeline (Orchestrator, Search, Reader, Analysis, Memory, Synthesis). A/B tested zero-shot vs CoT vs few-shot across 20 benchmark queries. FastAPI + Celery + Redis async job queue; Prometheus/Grafana per-agent P95 latency monitoring.",
    metrics: [
      { label: "Faithfulness (CoT)", value: "0.83" },
      { label: "Answer relevance", value: "0.79" },
      { label: "Success rate", value: "95%" },
      { label: "Strategy delta", value: "+0.12 vs zero-shot" },
    ],
    badge: "Personal",
  },
  {
    title: "Multimodal Video Recommendation",
    subtitle: "TikTok Monolith architecture replica",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["CLIP ViT-L/14", "C++/pybind11", "Whisper", "DeepFM", "FAISS"],
    repo: "https://github.com/sanjey99/multimodal-video-recommendation",
    description:
      "End-to-end pipeline mirroring TikTok For You feed. C++ frame extractor (3× faster via pybind11), CLIP visual + Whisper audio → multimodal fusion MLP, Two-Tower contrastive retrieval (InfoNCE), DeepFM CTR ranking, MMoE multi-objective (watch-time, like, share), FAISS cold-start.",
    metrics: [
      { label: "Topic mAP", value: "0.67" },
      { label: "Safety F1", value: "0.74 macro" },
      { label: "Frame extract", value: "3× C++ speedup" },
      { label: "Objectives", value: "Watch · Like · Share" },
    ],
    badge: "Personal",
  },
  {
    title: "Sentinel",
    subtitle: "AI Governance · 3rd Place NTU Deep Learning Week 2026",
    category: "ml",
    tracks: ["fullstack", "all"],
    stack: ["React", "Node.js", "FastAPI", "OpenAI", "Python", "Docker"],
    repo: "https://github.com/sanjey99/dlweek",
    description:
      "Centralised safety monitor for autonomous coding agents in CI/CD pipelines. Intercepts high-risk actions, ML risk scoring with uncertainty output, human-in-the-loop review queue, real-time governance feed, comprehensive audit log.",
    metrics: [
      { label: "Placement", value: "3rd Place" },
      { label: "Event", value: "NTU DL Week 2026" },
      { label: "Track", value: "OpenAI" },
    ],
    badge: "3rd Place",
  },
  {
    title: "NAISC 2026 — Adaptive Drift Detection",
    subtitle: "National AI Singapore Challenge · Singtel Track",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["LightGBM", "PSI", "KS tests", "scikit-learn", "Python"],
    repo: "https://github.com/sanjey99/singtel_naisc",
    description:
      "Adaptive data drift pipeline: Detect → Quantify → Adapt → Automate. Per-feature PSI + KS tests, adversarial validation (domain classifier AUC), density-ratio + temporal sample reweighting, two-stage LightGBM blend with fixed hyperparameters per challenge rules.",
    metrics: [
      { label: "Status", value: "Awaiting results" },
      { label: "Drift detection", value: "PSI + KS + Adversarial" },
      { label: "Output", value: "prediction.csv + report.docx" },
    ],
    badge: "Competition",
  },
  {
    title: "HomeCast",
    subtitle: "SC2006 · Full-stack Singapore real estate platform",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["Next.js 14", "React", "TypeScript", "MySQL 8", "Node.js", "Leaflet"],
    repo: "",
    description:
      "10,000+ Singapore properties with interactive map clustering, property matching by user preference survey, nearest amenities (MRT, parks, hawkers) via data.gov.sg APIs. Agile SE methodology, 8-person team.",
    badge: "Academic",
  },
  {
    title: "SC2002 OOP Internship System",
    subtitle: "SC2002 · Role-based CLI in Java",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["Java 17", "OOP Architecture", "CSV persistence", "Role-based ACL"],
    repo: "",
    description:
      "CLI system for students, staff, and company representatives with layered role-based access control. CSV-backed persistence, auth/password flows, internship matching, approval workflows, and comprehensive domain modelling.",
    badge: "Academic",
  },
  {
    title: "PRISM",
    subtitle: "HacX 2025 · Prison Transport Management",
    category: "academic",
    tracks: ["all"],
    stack: ["React", "Node.js", "TypeScript", "Express", "Socket.IO"],
    repo: "https://github.com/sanjey99/PRISM-hacx",
    description:
      "Real-time prison transport management for Singapore Prison Service. 15+ API endpoints, vehicle and inmate telemetry via Socket.IO, pre/post-trip inspection workflows, audit logging, edge-compute demo.",
    metrics: [
      { label: "Placement", value: "2nd Place" },
      { label: "Event", value: "HacX 2025 (HTX + Microsoft)" },
    ],
    badge: "2nd Place",
  },
];

function CategoryDivider({ category }: { category: Category }) {
  const cfg = categoryConfig[category];
  const { Icon } = cfg;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="flex items-center gap-3 mb-6">
      <Icon size={15} style={{ color: cfg.accent, flexShrink: 0 }} />
      <span
        style={{
          fontSize: "11px",
          fontFamily: "'Epilogue', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: cfg.accent,
        }}
      >
        {cfg.label}
      </span>
      <div style={{ flex: 1, height: "1px", overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            width: "100%",
            background: cfg.border,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

function MetricStrip({
  metrics,
  category,
}: {
  metrics: Metric[];
  category: Category;
}) {
  const cfg = categoryConfig[category];
  return (
    <div
      className="flex flex-wrap gap-px mt-4 rounded-lg overflow-hidden"
      style={{ border: `1px solid ${cfg.border}` }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="flex-1 min-w-[90px] px-3 py-2"
          style={{
            background: cfg.metricBg,
            borderRight:
              i < metrics.length - 1 ? `1px solid ${cfg.border}` : "none",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: cfg.dim,
              marginBottom: "3px",
            }}
          >
            {m.label}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily:
                category === "quant"
                  ? "ui-monospace, 'Cascadia Code', monospace"
                  : "'Epilogue', sans-serif",
              fontWeight: category === "quant" ? 400 : 500,
              fontVariantNumeric: "tabular-nums",
              color:
                category === "quant"
                  ? cfg.accent
                  : "rgba(255,255,255,0.82)",
              letterSpacing: category === "quant" ? "0.02em" : "0",
            }}
          >
            {m.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  span2,
}: {
  project: Project;
  index: number;
  span2?: boolean;
}) {
  const cfg = categoryConfig[project.category];

  const badgeIsWin =
    project.badge.includes("Place") ||
    project.badge === "Competition" ||
    project.badge === "Hackathon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
      className={span2 ? "md:col-span-2" : ""}
      style={{
        background: cfg.cardBg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "14px",
        overflow: "hidden",
        padding: "22px",
        cursor: "default",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = cfg.hoverBorder;
        el.style.boxShadow = cfg.shadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = cfg.border;
        el.style.boxShadow = "none";
      }}
    >
      {project.featured && (
        <div
          style={{
            margin: "-22px -22px 20px -22px",
            height: "2px",
            background: `linear-gradient(to right, ${cfg.accent.replace(")", " / 0.55)")}, transparent 80%)`,
          }}
        />
      )}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontSize: badgeIsWin ? "10px" : "9.5px",
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: badgeIsWin ? 600 : 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: badgeIsWin ? cfg.accent : "rgba(255,255,255,0.28)",
                background: badgeIsWin
                  ? `${cfg.accent.replace(")", " / 0.18)")}`
                  : "rgba(255,255,255,0.04)",
                border: badgeIsWin
                  ? `1px solid ${cfg.accent.replace(")", " / 0.38)")}`
                  : "1px solid rgba(255,255,255,0.07)",
                padding: badgeIsWin ? "3px 10px" : "2px 8px",
                borderRadius: "100px",
                flexShrink: 0,
              }}
            >
              {project.badge}
            </span>
          </div>
          <p
            style={{
              fontSize: "12px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              color: cfg.dim,
              letterSpacing: "0.02em",
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {project.repo && project.repo !== "#" ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center justify-center rounded-lg transition-colors"
            style={{
              width: "30px",
              height: "30px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.3)";
            }}
          >
            <Github size={13} />
          </a>
        ) : !project.repo ? (
          <span
            className="shrink-0 flex items-center gap-1"
            style={{
              fontSize: "9.5px",
              fontFamily: "'Epilogue', sans-serif",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            <Lock size={10} />
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              fontSize: "10px",
              fontFamily: "'Epilogue', sans-serif",
              color: cfg.dim,
              background: `${cfg.accent.replace(")", " / 0.06)")}`,
              border: `1px solid ${cfg.accent.replace(")", " / 0.12)")}`,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <p
        style={{
          fontSize: "13.5px",
          fontFamily: "'Epilogue', sans-serif",
          fontWeight: 300,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.48)",
        }}
      >
        {project.description}
      </p>

      {project.metrics && (
        <MetricStrip metrics={project.metrics} category={project.category} />
      )}
    </motion.div>
  );
}

export function ProjectsSection({ track }: { track: TrackId }) {
  const quantProjects = projects.filter(
    (p) => p.category === "quant" && p.tracks.includes(track)
  );
  const mlProjects = projects.filter(
    (p) => p.category === "ml" && p.tracks.includes(track)
  );
  const academicProjects = projects.filter(
    (p) => p.category === "academic" && p.tracks.includes(track)
  );

  const hasQuant = quantProjects.length > 0;
  const hasMl = mlProjects.length > 0;
  const hasAcademic = academicProjects.length > 0;

  if (!hasQuant && !hasMl && !hasAcademic) return null;
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(9.5% 0.007 65)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p
            style={{
              fontSize: "11px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "oklch(76% 0.155 65 / 0.6)",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "oklch(96% 0.008 65)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            Projects
          </h2>
        </motion.div>

        {hasQuant && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <CategoryDivider category="quant" />
            <div className="grid md:grid-cols-2 gap-4">
              {quantProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} span2={p.featured} />
              ))}
            </div>
          </motion.div>
        )}

        {hasMl && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <CategoryDivider category="ml" />
            <div className="grid md:grid-cols-2 gap-4">
              {mlProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} span2={p.featured} />
              ))}
            </div>
          </motion.div>
        )}

        {hasAcademic && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <CategoryDivider category="academic" />
            <div className="grid md:grid-cols-3 gap-4">
              {academicProjects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
