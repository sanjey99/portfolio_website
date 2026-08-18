import { useState } from "react";
import { CaretDown, DownloadSimple, Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import heroImg from "@/assets/519e3075752b6c7f5afc08ea933955f297ac4d06.png";
import { PortfolioImage } from "./PortfolioImage";

const resumes = [
  { label: "Quantitative Finance", href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume_Quant.pdf" },
  { label: "Machine Learning & AI", href: "/resumes/resume-ml.pdf", filename: "Sanjey_Resume_ML.pdf" },
  { label: "Full Stack", href: "/resumes/resume-fullstack.pdf", filename: "Sanjey_Resume_FullStack.pdf" },
];

export function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section id="hero" className="relative flex min-h-screen items-end overflow-hidden px-6 py-10 md:px-10">
      <div className="absolute inset-0"><PortfolioImage src={heroImg} alt="Sanjey" /></div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(36,39,34,0.32), rgba(36,39,34,0.84))" }} />
      <div className="relative z-10 grid w-full gap-8 md:grid-cols-2">
        <div className="max-w-[42rem]">
          <p className="eyebrow">Computer Engineering, NTU</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 600, lineHeight: 0.84, color: "var(--foreground)", margin: "16px 0" }}>Sanjey.</h1>
          <p style={{ maxWidth: "34ch", color: "rgba(244,239,223,0.78)" }}>Software, data, and quantitative systems built with evidence and care.</p>
        </div>
        <div className="hero-actions self-end md:justify-self-end">
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/sanjey99" aria-label="GitHub" className="icon-link"><GithubLogo size={18} /></a>
            <a href="https://www.linkedin.com/in/sanjey99/" aria-label="LinkedIn" className="icon-link"><LinkedinLogo size={18} /></a>
            <a href="mailto:sanjeyan001@e.ntu.edu.sg" aria-label="Email" className="icon-link"><Envelope size={18} /></a>
          </div>
          <div className="relative mt-5">
            <button className="text-link" type="button" onClick={() => setResumeOpen((open) => !open)}>Resumes <CaretDown size={14} /></button>
            {resumeOpen && <div className="resume-menu">{resumes.map((resume) => <a key={resume.label} href={resume.href} download={resume.filename}><DownloadSimple size={13} /> {resume.label}</a>)}</div>}
          </div>
          <button className="primary-action mt-6" type="button" onClick={onEnter}>Enter portfolio</button>
        </div>
      </div>
    </section>
  );
}
