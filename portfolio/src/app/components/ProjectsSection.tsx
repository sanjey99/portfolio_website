import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BookOpen, Brain, GithubLogo, Lock, TrendUp } from "@phosphor-icons/react";
import type { TrackId } from "../context/TrackContext";
import {
  projects as projectData,
  selectProjectsByCategoryAndTrack,
} from "../data/projects";
import type { Category, Metric, Project } from "../data/projects";

const categoryConfig = {
  quant: {
    label: "Finance & Quant",
    Icon: TrendUp,
    accent: "oklch(76% 0.155 65)",
    border: "oklch(76% 0.155 65 / 0.18)",
    hoverBorder: "oklch(76% 0.155 65 / 0.38)",
    cardBg: "oklch(10.8% 0.014 65)",
    metricBg: "oklch(13% 0.018 65 / 0.6)",
    dim: "oklch(76% 0.155 65 / 0.5)",
  },
  ml: {
    label: "Machine Learning & AI",
    Icon: Brain,
    accent: "oklch(62% 0.11 158)",
    border: "oklch(62% 0.11 158 / 0.18)",
    hoverBorder: "oklch(62% 0.11 158 / 0.38)",
    cardBg: "oklch(10.8% 0.009 158)",
    metricBg: "oklch(13% 0.012 158 / 0.6)",
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
    dim: "oklch(52% 0.03 65 / 0.5)",
  },
};

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
          fontFamily: "var(--font-body)",
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
      className="flex flex-wrap gap-px mt-4 overflow-hidden"
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
              fontFamily: "var(--font-body)",
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
                  : "var(--font-body)",
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
}: {
  project: Project;
  index: number;
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
      className=""
      style={{
        background: cfg.cardBg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "2px",
        overflow: "hidden",
        padding: "22px",
        cursor: "default",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              style={{
                fontFamily: "var(--font-display)",
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
                fontFamily: "var(--font-body)",
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
                borderRadius: "2px",
                flexShrink: 0,
              }}
            >
              {project.badge}
            </span>
          </div>
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-body)",
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
            className="shrink-0 flex items-center justify-center transition-colors"
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
            <GithubLogo size={13} />
          </a>
        ) : !project.repo ? (
          <span
            className="shrink-0 flex items-center gap-1"
            style={{
              fontSize: "9.5px",
              fontFamily: "var(--font-body)",
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
              fontFamily: "var(--font-body)",
              color: cfg.dim,
              background: `${cfg.accent.replace(")", " / 0.06)")}`,
              border: `1px solid ${cfg.accent.replace(")", " / 0.12)")}`,
              padding: "2px 8px",
              borderRadius: "2px",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <p
        style={{
          fontSize: "13.5px",
          fontFamily: "var(--font-body)",
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
  const quantProjects = selectProjectsByCategoryAndTrack(projectData, "quant", track);
  const mlProjects = selectProjectsByCategoryAndTrack(projectData, "ml", track);
  const academicProjects = selectProjectsByCategoryAndTrack(projectData, "academic", track);

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
              fontFamily: "var(--font-body)",
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
              fontFamily: "var(--font-display)",
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
                <ProjectCard key={p.title} project={p} index={i} />
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
                <ProjectCard key={p.title} project={p} index={i} />
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
            <div className="grid md:grid-cols-2 gap-4">
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
