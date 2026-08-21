import {
  ArrowUpRight,
  CaretDown,
  GithubLogo,
  LockSimple,
} from "@phosphor-icons/react";
import { WORK_VIEWS, useWorkView } from "../context/TrackContext";
import {
  projects,
  selectProjectsForView,
  type Project,
} from "../data/projects";

function ProjectLink({ project }: { project: Project }) {
  if (!project.repo) {
    return (
      <span className="private-evidence">
        <LockSimple size={15} aria-hidden="true" /> Private work context
      </span>
    );
  }

  return (
    <a
      className="project-link"
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open evidence for ${project.title}`}
    >
      <GithubLogo size={17} aria-hidden="true" />
      Open evidence
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  return (
    <article className="case-study" data-domain={project.domain}>
      <header className="case-study-header">
        <div className="case-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="case-heading">
          <div className="case-meta">
            <span>{project.evidenceType}</span>
            <span>{project.maturity}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="case-subtitle">{project.subtitle}</p>
        </div>
        <ProjectLink project={project} />
      </header>

      <div className="case-study-body">
        <p className="case-summary">{project.summary}</p>
        <dl className="metric-ledger">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="stack-line" aria-label="Technology stack">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <details className="evidence-drawer">
        <summary>
          <span>Open evidence ledger</span>
          <CaretDown size={17} aria-hidden="true" />
        </summary>
        <div className="evidence-grid">
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>Engineering decision</h4>
            <p>{project.decision}</p>
          </div>
          <div>
            <h4>Verification</h4>
            <p>{project.verification}</p>
          </div>
          <div className="evidence-boundary">
            <h4>Honest boundary</h4>
            <p>{project.boundary}</p>
          </div>
        </div>
      </details>
    </article>
  );
}

function ArchiveItem({ project }: { project: Project }) {
  return (
    <article className="archive-item">
      <div>
        <div className="archive-meta">
          <span>{project.evidenceType}</span>
          <span>{project.maturity}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="archive-proof">
        <span>{project.evidence}</span>
        <ProjectLink project={project} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { workView, setWorkView } = useWorkView();
  const visibleProjects = selectProjectsForView(projects, workView);
  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const archiveProjects = visibleProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="section work-section" aria-labelledby="work-title">
      <div className="section-heading work-heading">
        <div>
          <h2 id="work-title">Systems that survived contact with reality.</h2>
          <p>
            Three flagship case studies lead with the problem, the engineering decision,
            the verification, and the boundary—not just the stack.
          </p>
        </div>
        <div className="view-filter" role="group" aria-label="Filter work by domain">
          {WORK_VIEWS.map((view) => (
            <button
              key={view.id}
              type="button"
              aria-pressed={workView === view.id}
              title={view.description}
              onClick={() => setWorkView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {featuredProjects.length > 0 && (
        <div className="case-study-list">
          {featuredProjects.map((project, index) => (
            <CaseStudy key={`${workView}-${project.slug}`} project={project} index={index} />
          ))}
        </div>
      )}

      {archiveProjects.length > 0 && (
        <div className="archive-section">
          <div className="archive-heading">
            <h3>{workView === "archive" ? "Evidence archive" : "Additional evidence"}</h3>
            <p>Smaller signals, kept compact and explicit about personal scope.</p>
          </div>
          <div className="archive-list">
            {archiveProjects.map((project) => (
              <ArchiveItem key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
