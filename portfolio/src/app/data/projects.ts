import type { TrackId } from "../context/TrackContext";
export type Category = "quant" | "ml" | "academic";
export interface Metric {
  label: string;
  value: string;
}
export interface Project {
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
export const projects: Project[] = [
  {
    title: "Algorithmic Trading Backtester",
    subtitle: "Event-driven research with reproducible data and analytics",
    category: "quant",
    tracks: ["quant", "all"],
    stack: ["Python", "pandas", "NumPy", "SciPy", "SQLite", "PyArrow"],
    repo: "https://github.com/sanjey99/algo-backtesting",
    description:
      "Event-driven trading backtester with walk-forward analysis and Monte Carlo permutation testing. The current local branch " +
      "adds quality-gated market-data acquisition, immutable cache generations, redacted evidence manifests, and a direct-SQL " +
      "analytics layer for reproducible comparisons and integrity audits.",
    metrics: [
      { label: "Verification", value: "579 tests" },
      { label: "Analysis", value: "Walk-forward + MC" },
      { label: "Data boundary", value: "Quality-gated" },
    ],
    badge: "Personal",
    featured: true,
  },
  {
    title: "FinancePy — OSS Contribution",
    subtitle: "Merged Python 3.10/3.11 compatibility fix",
    category: "quant",
    tracks: ["quant", "all"],
    stack: ["Python", "FinancePy", "pytest", "pylint"],
    repo: "https://github.com/domokane/FinancePy/pull/249",
    description:
      "Merged upstream fix for a Python 3.10/3.11 SyntaxError that prevented FinancePy's bonds package from importing. " +
      "Identified and corrected a second latent instance in the YTM/OAS pricing warnings beyond the original issue report.",
    metrics: [
      { label: "Status", value: "Merged" },
      { label: "PR", value: "#249" },
      { label: "Python", value: "3.10 / 3.11" },
    ],
    badge: "Open Source",
  },
  {
    title: "FinSentinel",
    subtitle: "Finance AI dashboard prototype",
    category: "quant",
    tracks: ["quant", "fullstack", "all"],
    stack: ["React", "Node.js", "FastAPI", "PyTorch", "Docker"],
    repo: "https://github.com/sanjey99/hackathon-fin-ai",
    description:
      "Weekend finance-track prototype that combines portfolio and transaction-style inputs with synthetic risk inference, " +
      "confidence scores, and hedge/hold/rebalance suggestions in a terminal-style dashboard. The ML path is " +
      "heuristic/synthetic, not a validated production model.",
    metrics: [
      { label: "Status", value: "Prototype" },
      { label: "Architecture", value: "React + API + ML" },
      { label: "Inference", value: "Synthetic" },
    ],
    badge: "Hackathon",
  },
  {
    title: "WorldQuant International Quant Championship",
    subtitle: "Volatility mean-reversion alpha research",
    category: "quant",
    tracks: ["quant", "all"],
    stack: ["WorldQuant BRAIN", "Time-series alpha research"],
    repo: "",
    description:
      "Built a TOP3000 USA equities volatility mean-reversion alpha using time-series ranking, exponential decay, subindustry " +
      "neutralisation, single-stock truncation, and a one-day execution delay to avoid look-ahead bias.",
    metrics: [
      { label: "Award", value: "Gold" },
      { label: "Global rank", value: "Top 20%" },
      { label: "Sharpe", value: "2.27" },
    ],
    badge: "Competition",
  },
  {
    title: "QSVM Fraud Detection",
    subtitle: "DBS Fraud Detection Track · QAI Quantum Computing Hackathon",
    category: "ml",
    tracks: ["quant", "ml", "all"],
    stack: ["Qiskit", "scikit-learn", "Python", "Spring Boot", "Java"],
    repo: "https://github.com/sanjey99/quantum_hackathon",
    description:
      "Quantum-enhanced fraud-detection system built in a 36-hour hackathon: a Qiskit quantum-kernel SVM over the Kaggle " +
      "credit-card fraud dataset, exposed through a Java Spring Boot REST service and QCentroid-compatible solver entry point.",
    metrics: [
      { label: "Format", value: "36-hour hackathon" },
      { label: "Model", value: "QSVM" },
      { label: "Serving", value: "Spring Boot" },
    ],
    badge: "Hackathon",
  },
  {
    title: "NAISC 2026 — Adaptive Drift Detection",
    subtitle: "National AI Singapore Challenge · Singtel Track",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["LightGBM", "PSI", "KS tests", "scikit-learn", "Python"],
    repo: "https://github.com/swisshackersorg/singtel_naisc",
    description:
      "Four-person team submission for Singtel's model-integrity challenge: Detect → Quantify → Adapt → Automate churn-drift " +
      "pipeline using PSI, KS tests, adversarial validation, and a fixed-hyperparameter LightGBM blend under CPU-only challenge " +
      "constraints.",
    metrics: [
      { label: "Public-test AU-PRC", value: "0.787" },
      { label: "Holdout blend", value: "0.8993" },
      { label: "Team", value: "4 people" },
    ],
    badge: "Competition",
  },
  {
    title: "Multimodal Video Recommendation",
    subtitle: "Short-video understanding and ranking pipeline",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["CLIP ViT-L/14", "C++/pybind11", "Whisper", "DeepFM", "FAISS"],
    repo: "https://github.com/sanjey99/multimodal-video-recommendation",
    description:
      "TikTok/Monolith-inspired pipeline from C++ frame extraction through CLIP and Whisper embeddings, fusion classification, " +
      "two-tower retrieval, DeepFM/MMoE ranking, and FastAPI/Celery serving. All four models train and serve from " +
      "synthetic-data checkpoints; real video extraction remains unverified.",
    metrics: [
      { label: "Models", value: "4 trained" },
      { label: "Retrieval", value: "Two-tower + FAISS" },
      { label: "Data", value: "Synthetic" },
    ],
    badge: "Personal",
  },
  {
    title: "Travel Video Intelligence",
    subtitle: "Local-first TikTok evidence and recommendation pipeline",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["Python", "yt-dlp", "Whisper", "EasyOCR"],
    repo: "https://github.com/sanjey99/travel-video-intel",
    description:
      "Local-first pipeline that discovers and ranks destination-specific TikTok videos, extracts speech and on-screen text, " +
      "and produces creator-attributed manifests for agent-assisted travel recommendations. Records liked recommendations and " +
      "followed creators for subsequent runs.",
    metrics: [
      { label: "Tests", value: "41 mocked" },
      { label: "Speech", value: "Whisper" },
      { label: "Text", value: "EasyOCR" },
    ],
    badge: "Personal",
  },
  {
    title: "BrainySG",
    subtitle: "AI crisis-response platform · BrainHack 2026 finalist",
    category: "ml",
    tracks: ["ml", "all"],
    stack: ["Go", "Gin", "React", "Supabase", "Leaflet", "OneMap"],
    repo: "https://github.com/sanjey99/BrainySG",
    description:
      "Team crisis-response platform that ingests live Singapore government feeds, maps incidents, generates resident-facing AI " +
      "summaries and volunteer tasks, and coordinates role-based workflows with task matching and group chats. Built the Go/Gin " +
      "backend and live-feed ingestion pipeline.",
    metrics: [
      { label: "Result", value: "Finalist" },
      { label: "Backend", value: "Go + Gin" },
      { label: "Data", value: "Live gov feeds" },
    ],
    badge: "Hackathon",
  },
  {
    title: "Sentinel",
    subtitle: "AI governance · 3rd place, NTU Deep Learning Week 2026",
    category: "ml",
    tracks: ["ml", "fullstack", "all"],
    stack: ["React", "Node.js", "FastAPI", "PyTorch", "OpenAI"],
    repo: "https://github.com/sanjey99/dlweek",
    description:
      "Five-person AI-agent governance platform that intercepts high-risk coding-agent actions, fuses ML risk scoring with " +
      "deterministic policy rules, and routes decisions to a human review queue. Led architecture/orchestration and built the " +
      "fusion decision backbone.",
    metrics: [
      { label: "Placement", value: "3rd place" },
      { label: "Track", value: "OpenAI" },
      { label: "Team", value: "5 people" },
    ],
    badge: "3rd Place",
  },
  {
    title: "PRISM",
    subtitle: "Prison transport safety system · Hacx! 2025",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["React", "Node.js", "TypeScript", "Express", "Socket.IO"],
    repo: "https://github.com/sanjey99/PRISM-hacx",
    description:
      "Team prison-transport management system with pre-trip vehicle inspection, RFID inmate scanning and seat assignment, " +
      "handover workflows, simulated real-time vitals/telematics alerts, and post-trip completion.",
    metrics: [
      { label: "Placement", value: "2nd place" },
      { label: "Event", value: "HTX × Microsoft" },
      { label: "API", value: "OpenAPI 3" },
    ],
    badge: "2nd Place",
  },
  {
    title: "HarvestChain",
    subtitle: "Financial inclusion for Filipino fisherfolk · APRU 2025",
    category: "academic",
    tracks: ["quant", "fullstack", "all"],
    stack: ["React", "Flask", "MongoDB", "Solidity", "Hardhat"],
    repo: "https://github.com/sanjey99/harvestchain",
    description:
      "Five-person team platform for financial inclusion: micro-futures smart contracts, self-sovereign identity, AI credit " +
      "scoring and pricing support, plus pooled lending and insurance for marginalised Filipino fisherfolk.",
    metrics: [
      { label: "Result", value: "Global 5th" },
      { label: "Contracts", value: "Solidity" },
      { label: "Team", value: "5 people" },
    ],
    badge: "Global 5th",
  },
  {
    title: "Interview Station",
    subtitle: "Pre-launch medical-school interview preparation startup",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    repo: "https://github.com/sanjey99/mmi",
    description:
      "Co-founded, pre-launch interview-preparation product for UK medical-school applicants. Supports authenticated " +
      "onboarding, timed practice, AI scoring across five dimensions, feedback visualisations, progress tracking, and " +
      "admin-configured questions/providers from one React Native and web codebase.",
    metrics: [
      { label: "Stage", value: "Pre-launch" },
      { label: "Platforms", value: "Mobile + web" },
      { label: "Role", value: "Co-founder" },
    ],
    badge: "Startup",
  },
  {
    title: "Nika AI Agent",
    subtitle: "Local-first Singapore location assistant",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["Tauri", "Rust", "React", "Ollama", "MapLibre"],
    repo: "https://github.com/sanjey99/nika_aiagent",
    description:
      "Tauri desktop AI agent for finding Singapore hangout spots. A locally running Ollama model calls a location-search tool " +
      "and pins results on a MapLibre map, avoiding cloud API keys.",
    metrics: [
      { label: "LLM", value: "Local Ollama" },
      { label: "Desktop", value: "Tauri 2" },
      { label: "Maps", value: "MapLibre" },
    ],
    badge: "Personal",
  },
  {
    title: "HomeCast",
    subtitle: "SC2006 team real-estate platform",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["Next.js", "React", "TypeScript", "MySQL", "Leaflet"],
    repo: "",
    description:
      "Eight-person coursework team project: a Singapore property platform with interactive map clustering, preference-based " +
      "matching, and nearby amenities from data.gov.sg APIs. Presented as team work; no individual code attribution is claimed.",
    badge: "Academic team",
  },
  {
    title: "SC2002 Team Documentation",
    subtitle:
      "Sequence diagrams for a Java internship-management coursework project",
    category: "academic",
    tracks: ["fullstack", "all"],
    stack: ["UML", "Sequence diagrams", "Java coursework"],
    repo: "",
    description:
      "Team coursework; contributed sequence-diagram documentation for four core workflows. The Java CLI implementation, " +
      "authentication, matching, and approval logic were authored by teammates and are not presented as personal code.",
    badge: "Academic team",
  },
];
export function selectProjectsByCategoryAndTrack(
  source: readonly Project[],
  category: Category,
  track: TrackId,
) {
  return source.filter(
    (project) =>
      project.category === category && project.tracks.includes(track),
  );
}
