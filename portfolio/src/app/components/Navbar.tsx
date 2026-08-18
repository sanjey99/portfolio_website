import { useState } from "react";
import { CaretDown, DownloadSimple, List, X } from "@phosphor-icons/react";
import type { TrackConfig } from "../context/TrackContext";

const links = [
  ["Experience", "#experience"], ["Projects", "#projects"], ["Hackathons", "#hackathons"], ["Skills", "#skills"], ["Contact", "#contact"],
] as const;
const resumes = [
  { label: "Quantitative Finance", href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume_Quant.pdf" },
  { label: "Machine Learning & AI", href: "/resumes/resume-ml.pdf", filename: "Sanjey_Resume_ML.pdf" },
  { label: "Full Stack", href: "/resumes/resume-fullstack.pdf", filename: "Sanjey_Resume_FullStack.pdf" },
];

export function Navbar({ activeTrack, onReopenSelector }: { activeTrack?: TrackConfig; onReopenSelector?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const scrollTo = (href: string) => { setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className="site-nav">
      <a href="#hero" onClick={(event) => { event.preventDefault(); scrollTo("#hero"); }} className="wordmark">S.</a>
      <nav className="desktop-nav" aria-label="Primary">
        {links.map(([label, href]) => <a key={href} href={href} onClick={(event) => { event.preventDefault(); scrollTo(href); }}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        {activeTrack && <button className="track-switch" type="button" onClick={onReopenSelector}>{activeTrack.label}</button>}
        <div className="relative hidden md:block">
          <button className="text-link" type="button" onClick={() => setResumeOpen((open) => !open)}>Resume <CaretDown size={14} /></button>
          {resumeOpen && <div className="resume-menu">{resumes.map((resume) => <a key={resume.label} href={resume.href} download={resume.filename}><DownloadSimple size={13} /> {resume.label}</a>)}</div>}
        </div>
        <button className="menu-button md:hidden" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <List size={20} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile primary">{links.map(([label, href]) => <a key={href} href={href} onClick={(event) => { event.preventDefault(); scrollTo(href); }}>{label}</a>)}<a href={resumes[0].href} download={resumes[0].filename}>Resume</a></nav>}
    </header>
  );
}
