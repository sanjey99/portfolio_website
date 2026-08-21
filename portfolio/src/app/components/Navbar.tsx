import { useState } from "react";
import { CaretDown, DownloadSimple, List, X } from "@phosphor-icons/react";

const links = [
  ["Experience", "#experience"],
  ["Selected work", "#projects"],
  ["Capabilities", "#capabilities"],
  ["Contact", "#contact"],
] as const;

const resumes = [
  {
    label: "Quantitative Finance",
    href: "/resumes/resume-quant.pdf",
    filename: "Sanjey_Resume_Quant.pdf",
  },
  {
    label: "Machine Learning & AI",
    href: "/resumes/resume-ml.pdf",
    filename: "Sanjey_Resume_ML.pdf",
  },
  {
    label: "Software Systems",
    href: "/resumes/resume-fullstack.pdf",
    filename: "Sanjey_Resume_Software.pdf",
  },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-nav">
      <a href="#hero" className="wordmark" aria-label="Sanjeyan Chrysharnthan, top of page">
        SC
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <details className="resume-disclosure desktop-resume">
          <summary>
            Resumes <CaretDown size={14} aria-hidden="true" />
          </summary>
          <div className="resume-menu">
            {resumes.map((resume) => (
              <a key={resume.label} href={resume.href} download={resume.filename}>
                <DownloadSimple size={15} aria-hidden="true" />
                {resume.label}
              </a>
            ))}
          </div>
        </details>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href={resumes[1].href} download={resumes[1].filename}>
            Download ML resume
          </a>
        </nav>
      )}
    </header>
  );
}
