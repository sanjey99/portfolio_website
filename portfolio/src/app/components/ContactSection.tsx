import {
  ArrowUpRight,
  DownloadSimple,
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

const contactLinks = [
  {
    label: "Email",
    value: "sanjeyan001@e.ntu.edu.sg",
    href: "mailto:sanjeyan001@e.ntu.edu.sg",
    icon: Envelope,
  },
  {
    label: "GitHub",
    value: "github.com/sanjey99",
    href: "https://github.com/sanjey99",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sanjey99",
    href: "https://www.linkedin.com/in/sanjey99/",
    icon: LinkedinLogo,
  },
];

export function ContactSection() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-copy">
        <h2>Looking for the next hard system.</h2>
        <p>
          Seeking 2027 internships in applied ML, quantitative development, and software
          systems, especially teams where correctness and production behavior matter.
        </p>
        <a className="primary-action" href="mailto:sanjeyan001@e.ntu.edu.sg">
          Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>

      <div className="contact-links">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>
                <small>{link.label}</small>
                {link.value}
              </span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          );
        })}
        <a
          href="/resumes/resume.pdf"
          download="Sanjeyan_Chrysharnthan_Resume.pdf"
        >
          <DownloadSimple size={18} aria-hidden="true" />
          <span>
            <small>Resume</small>
            Download resume
          </span>
        </a>
      </div>

      <div className="footer-meta">
        <span>© 2026 Sanjeyan Chrysharnthan</span>
        <span>Singapore</span>
        <nav aria-label="Legal">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
