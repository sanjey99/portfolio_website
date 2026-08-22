import {
  ArrowDown,
  ArrowUpRight,
  DownloadSimple,
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { PortfolioImage } from "./PortfolioImage";

const proofPoints = [
  { value: "10", label: "merged PRs at Vertex Labs" },
  { value: "712", label: "tests in the backtester" },
  { value: "204", label: "tests in the risk lab" },
  { value: "3rd", label: "NTU Deep Learning Week" },
];

export function HeroSection() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Sanjeyan Chrysharnthan.</h1>
        <p className="hero-context">Computer Engineering at NTU · Singapore</p>
        <p className="hero-thesis">
          Applied ML systems, quantitative research infrastructure, and production software.
        </p>
        <p className="hero-intro">
          I build systems where the difficult part is not the demo; it is data integrity,
          model behavior, reliability, and evidence that the result actually works.
        </p>

        <div className="hero-actions">
          <a className="primary-action" href="#projects">
            See selected work <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a
            className="secondary-action"
            href="/resumes/resume.pdf"
            download="Sanjeyan_Chrysharnthan_Resume.pdf"
          >
            Resume <DownloadSimple size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="hero-links" aria-label="Profile links">
          <a href="https://github.com/sanjey99" target="_blank" rel="noreferrer">
            <GithubLogo size={18} aria-hidden="true" /> GitHub
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/sanjey99/" target="_blank" rel="noreferrer">
            <LinkedinLogo size={18} aria-hidden="true" /> LinkedIn
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href="mailto:sanjeyan001@e.ntu.edu.sg">
            <Envelope size={18} aria-hidden="true" /> Email
          </a>
        </div>
      </div>

      <figure className="hero-portrait">
        <PortfolioImage
          src="/images/sanjeyan-portfolio-hero.webp"
          alt="Portrait of Sanjeyan Chrysharnthan"
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>
          <span>Building across model and production boundaries</span>
          <span>2026</span>
        </figcaption>
      </figure>

      <div className="proof-rail" aria-label="Selected proof points">
        {proofPoints.map((point) => (
          <div className="proof-point" key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
