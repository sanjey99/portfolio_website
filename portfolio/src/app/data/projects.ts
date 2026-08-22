import type { WorkView } from "../context/TrackContext";

export type Domain = "quant" | "ml" | "product";
export type EvidenceType =
  | "Public repository"
  | "Work case study"
  | "Open-source contribution"
  | "Competition result"
  | "Team build";

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  domain: Domain;
  views: WorkView[];
  featured: boolean;
  evidenceType: EvidenceType;
  maturity: string;
  stack: string[];
  repo?: string;
  evidence: string;
  problem: string;
  decision: string;
  verification: string;
  boundary: string;
  metrics: Metric[];
}

export const projects: Project[] = [
  {
    slug: "algorithmic-trading-backtester",
    title: "Algorithmic Trading Backtester",
    subtitle: "Reproducible event-driven research infrastructure",
    summary:
      "A research platform built around data provenance, deterministic event flow, and analytics that can be audited instead of merely plotted.",
    domain: "quant",
    views: ["selected", "quant"],
    featured: true,
    evidenceType: "Public repository",
    maturity: "Public · verified",
    stack: ["Python", "pandas", "NumPy", "SciPy", "SQLite", "PyArrow"],
    repo: "https://github.com/sanjey99/algo-backtesting",
    evidence: "Public repository · 64 source modules · automated quality gates",
    problem:
      "Quant research becomes unreliable when data lineage, cache state, execution order, and comparison logic are implicit.",
    decision:
      "Built a typed event pipeline with quality-gated acquisition, immutable cache generations, redacted evidence manifests, walk-forward analysis, Monte Carlo testing, and direct-SQL analytics.",
    verification:
      "712 tests, Ruff, and strict mypy currently pass across the repository.",
    boundary:
      "This is research infrastructure, not a live-trading deployment or a claim of investment returns.",
    metrics: [
      { label: "Verification", value: "712 tests" },
      { label: "Codebase", value: "64 modules" },
      { label: "Quality", value: "Ruff + strict mypy" },
    ],
  },
  {
    slug: "market-risk-forecasting-lab",
    title: "Market Risk Forecasting Lab",
    subtitle: "Multi-model forecasting, VaR/ES, and monitored serving",
    summary:
      "An end-to-end risk system that compares statistical and learned volatility models, turns forecasts into VaR/ES, and carries the result through reproducible training and observable serving.",
    domain: "quant",
    views: ["selected", "quant", "ml"],
    featured: true,
    evidenceType: "Public repository",
    maturity: "Public · empirical boundary",
    stack: ["Python", "PyTorch", "DVC", "MLflow", "FastAPI", "Prometheus"],
    repo: "https://github.com/sanjey99/market-risk-forecasting-lab",
    evidence: "Public repository · 74 source modules · reproducible pipeline",
    problem:
      "A model notebook cannot answer whether data, training, backtesting, serving, and monitoring agree on the same risk definition.",
    decision:
      "Designed one pipeline spanning HAR/GARCH, gradient boosting and LSTM forecasts; VaR/ES backtesting; DVC and MLflow lineage; FastAPI serving; and Prometheus instrumentation.",
    verification:
      "204 tests plus Ruff and mypy validate the current system across 74 source modules.",
    boundary:
      "The current evaluation is synthetic-only; no empirical market-performance or forecasting-superiority claim is made.",
    metrics: [
      { label: "Verification", value: "204 tests" },
      { label: "Models", value: "HAR · GARCH · GBM · LSTM" },
      { label: "Boundary", value: "Synthetic-only" },
    ],
  },
  {
    slug: "panasonic-sam3-systems-work",
    title: "Panasonic SAM3 Systems Work",
    subtitle: "Interactive video segmentation on constrained GPU infrastructure",
    summary:
      "A work case study in turning a research-grade vision model into an interactive application with multi-object prompting, full-video propagation, and live progress feedback.",
    domain: "ml",
    views: ["selected", "ml", "product"],
    featured: true,
    evidenceType: "Work case study",
    maturity: "Internship · delivered",
    stack: ["Python", "PyTorch", "FastAPI", "React", "SSE", "Docker"],
    evidence:
      "Selected as one of four AI technologies for Panasonic AIMX Singapore × TechInnovation 2026.",
    problem:
      "Long-running GPU segmentation needed to remain interactive while mixed precision, object identity, and concurrent jobs could fail in non-obvious ways.",
    decision:
      "Implemented chunk-wise SSE previews, multi-object state handling, full-video mask propagation, mocked-GPU tests, and serving safeguards before migration to an NVIDIA GB10 system.",
    verification:
      "Delivered on a 24GB GPU server, exercised with MLflow, Prometheus, and Grafana during development, and handed off to the supervising team.",
    boundary:
      "This is a first-person work case study. Public event material does not name individual contributors, and Sanjeyan was not the public presenter.",
    metrics: [
      { label: "Compute", value: "24GB GPU" },
      { label: "Interaction", value: "Chunk-wise SSE" },
      { label: "Programme", value: "1 of 4 technologies" },
    ],
  },
  {
    slug: "financepy-oss",
    title: "FinancePy OSS Contribution",
    subtitle: "Merged Python 3.10/3.11 compatibility fix",
    summary: "Removed two bonds-package SyntaxError paths and restored imports on current Python versions.",
    domain: "quant",
    views: ["archive", "quant"],
    featured: false,
    evidenceType: "Open-source contribution",
    maturity: "Merged upstream",
    stack: ["Python", "pytest", "pylint"],
    repo: "https://github.com/domokane/FinancePy/pull/249",
    evidence: "Merged FinancePy pull request #249",
    problem: "The bonds package failed to import on Python 3.10 and 3.11.",
    decision: "Fixed the reported warning syntax and a second latent instance discovered during review.",
    verification: "Maintainer-reviewed and merged upstream as PR #249.",
    boundary: "A focused compatibility contribution, not ownership of the wider library.",
    metrics: [
      { label: "Status", value: "Merged" },
      { label: "Pull request", value: "#249" },
    ],
  },
  {
    slug: "worldquant-iqc",
    title: "WorldQuant International Quant Championship",
    subtitle: "Volatility mean-reversion alpha research",
    summary: "Built and evaluated a delayed, neutralised volatility mean-reversion signal for US equities.",
    domain: "quant",
    views: ["archive", "quant"],
    featured: false,
    evidenceType: "Competition result",
    maturity: "Gold · top 20%",
    stack: ["WorldQuant BRAIN", "Time-series research"],
    evidence: "Gold level · global top 20% · reported Sharpe 2.27",
    problem: "Develop an alpha signal while controlling look-ahead and concentration risk.",
    decision: "Combined time-series ranking, decay, subindustry neutralisation, truncation, and a one-day delay.",
    verification: "Competition platform recorded Gold level, global top 20%, and Sharpe 2.27.",
    boundary: "Competition research result; not a personally operated live strategy.",
    metrics: [
      { label: "Award", value: "Gold" },
      { label: "Rank", value: "Top 20%" },
      { label: "Sharpe", value: "2.27" },
    ],
  },
  {
    slug: "brainysg",
    title: "BrainySG",
    subtitle: "Crisis-response platform · BrainHack 2026 finalist",
    summary: "Built the Go/Gin backend and live Singapore government-feed ingestion for a team crisis-response product.",
    domain: "product",
    views: ["archive", "ml", "product"],
    featured: false,
    evidenceType: "Team build",
    maturity: "Hackathon finalist",
    stack: ["Go", "Gin", "React", "Supabase", "OneMap"],
    repo: "https://github.com/sanjey99/BrainySG",
    evidence: "Finalist · attributable backend and ingestion ownership",
    problem: "Turn fragmented live incident data into coordinated resident and volunteer workflows.",
    decision: "Owned the Go API and feed-ingestion path within the wider team platform.",
    verification: "Finalist result and public repository.",
    boundary: "Team project; claims are limited to the backend and ingestion work personally owned.",
    metrics: [
      { label: "Result", value: "Finalist" },
      { label: "Ownership", value: "Go backend" },
    ],
  },
  {
    slug: "sentinel",
    title: "Sentinel",
    subtitle: "Coding-agent governance · NTU Deep Learning Week 2026",
    summary: "Led architecture and built the fusion decision path for human review of high-risk agent actions.",
    domain: "ml",
    views: ["archive", "ml", "product"],
    featured: false,
    evidenceType: "Team build",
    maturity: "3rd place",
    stack: ["React", "Node.js", "FastAPI", "PyTorch", "OpenAI"],
    repo: "https://github.com/sanjey99/dlweek",
    evidence: "3rd place · architecture and orchestration ownership",
    problem: "Autonomous coding actions need deterministic policy and human escalation around uncertain ML scores.",
    decision: "Combined ML risk scoring with rules and routed contested decisions into a review queue.",
    verification: "Placed 3rd in the OpenAI track at NTU Deep Learning Week 2026.",
    boundary: "Five-person team build; architecture/orchestration and fusion-decision claims are personal scope.",
    metrics: [
      { label: "Placement", value: "3rd" },
      { label: "Team", value: "5 people" },
    ],
  },
  {
    slug: "prism",
    title: "PRISM",
    subtitle: "Prison transport safety system · Hacx! 2025",
    summary: "A team workflow system spanning inspections, RFID handover, assignment, alerts, and trip completion.",
    domain: "product",
    views: ["archive", "product"],
    featured: false,
    evidenceType: "Team build",
    maturity: "2nd place",
    stack: ["React", "Node.js", "TypeScript", "Socket.IO"],
    repo: "https://github.com/sanjey99/PRISM-hacx",
    evidence: "2nd place · HTX × Microsoft Hacx! 2025",
    problem: "Transport handovers and safety checks were fragmented across a high-stakes operational flow.",
    decision: "Represented the full trip lifecycle in one real-time web workflow.",
    verification: "Second-place competition result and public repository.",
    boundary: "Team prototype; not a deployed prison operations system.",
    metrics: [
      { label: "Placement", value: "2nd" },
      { label: "Interface", value: "OpenAPI 3" },
    ],
  },
  {
    slug: "harvestchain",
    title: "HarvestChain",
    subtitle: "Financial inclusion platform · APRU 2025",
    summary: "A five-person team prototype for micro-futures, identity, credit support, pooled lending, and insurance.",
    domain: "product",
    views: ["archive", "quant", "product"],
    featured: false,
    evidenceType: "Team build",
    maturity: "Global 5th",
    stack: ["React", "Flask", "MongoDB", "Solidity"],
    repo: "https://github.com/sanjey99/harvestchain",
    evidence: "Global 5th · five-person APRU team",
    problem: "Small fishing communities face fragmented access to price stability, credit, and insurance.",
    decision: "Prototyped a linked set of financial and identity workflows around micro-futures contracts.",
    verification: "Global fifth-place competition result and public repository.",
    boundary: "Team competition prototype; no claim of real-world financial deployment.",
    metrics: [
      { label: "Result", value: "Global 5th" },
      { label: "Team", value: "5 people" },
    ],
  },
];

export function selectProjectsForView(
  source: readonly Project[],
  view: WorkView,
) {
  if (view === "selected") return source.filter((project) => project.featured);
  if (view === "archive") return source.filter((project) => !project.featured);
  return source.filter((project) => project.views.includes(view));
}
