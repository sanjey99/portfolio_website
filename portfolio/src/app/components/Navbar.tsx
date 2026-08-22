import { useState } from "react";
import { DownloadSimple, List, X } from "@phosphor-icons/react";

const links = [
  ["Experience", "#experience"],
  ["Selected work", "#projects"],
  ["Capabilities", "#capabilities"],
  ["Contact", "#contact"],
] as const;

const resume = {
  href: "/resumes/resume.pdf",
  filename: "Sanjeyan_Chrysharnthan_Resume.pdf",
} as const;

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
        <a
          className="desktop-resume"
          href={resume.href}
          download={resume.filename}
        >
          Resume <DownloadSimple size={15} aria-hidden="true" />
        </a>

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
          <a href={resume.href} download={resume.filename}>
            Download resume
          </a>
        </nav>
      )}
    </header>
  );
}
