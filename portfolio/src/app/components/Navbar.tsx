import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import type { TrackConfig } from "../context/TrackContext";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  activeTrack?: TrackConfig;
  onReopenSelector?: () => void;
}

const resumeByTrack: Record<string, { href: string; filename: string }> = {
  quant: { href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume_Quant.pdf" },
  ml: { href: "/resumes/resume-ml.pdf", filename: "Sanjey_Resume_ML.pdf" },
  fullstack: { href: "/resumes/resume-fullstack.pdf", filename: "Sanjey_Resume_FullStack.pdf" },
  all: { href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume.pdf" },
};

const allResumes = [
  { label: "Quantitative Finance", href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume_Quant.pdf" },
  { label: "Machine Learning & AI", href: "/resumes/resume-ml.pdf", filename: "Sanjey_Resume_ML.pdf" },
  { label: "Full Stack", href: "/resumes/resume-fullstack.pdf", filename: "Sanjey_Resume_FullStack.pdf" },
];

export function Navbar({ activeTrack, onReopenSelector }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getLinkColor = (href: string) =>
    activeSection === href.slice(1)
      ? "oklch(76% 0.155 65)"
      : "rgba(255,255,255,0.45)";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "oklch(8.5% 0.006 65 / 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? "1px solid oklch(96% 0.008 65 / 0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "oklch(96% 0.008 65)",
                letterSpacing: "-0.02em",
              }}
            >
              S<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
            </span>
          </a>

          {/* Active track badge — desktop */}
          <AnimatePresence>
            {activeTrack && (
              <motion.button
                key={activeTrack.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                onClick={onReopenSelector}
                className="hidden md:flex items-center gap-1.5"
                style={{
                  background: activeTrack.color.replace(")", " / 0.1)"),
                  border: `1px solid ${activeTrack.color.replace(")", " / 0.28)")}`,
                  borderRadius: "100px",
                  padding: "4px 10px 4px 8px",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = activeTrack.color.replace(")", " / 0.5)");
                  el.style.background = activeTrack.color.replace(")", " / 0.16)");
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = activeTrack.color.replace(")", " / 0.28)");
                  el.style.background = activeTrack.color.replace(")", " / 0.1)");
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: activeTrack.color,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 500,
                    color: activeTrack.color,
                    letterSpacing: "0.02em",
                    maxWidth: "130px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeTrack.label}
                </span>
                <span style={{ fontSize: "10px", color: activeTrack.color, opacity: 0.65, marginLeft: "2px" }}>
                  ↺
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative transition-colors duration-300"
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    color: getLinkColor(link.href),
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      getLinkColor(link.href);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            {/* Track-aware resume button */}
            {activeTrack?.id === "all" ? (
              <div ref={resumeRef} className="relative">
                <button
                  onClick={() => setResumeOpen(v => !v)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200 hover:opacity-90"
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 500,
                    color: "oklch(12% 0.02 65)",
                    background: activeTrack.color,
                    letterSpacing: "0.02em",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Resume
                  <ChevronDown size={11} style={{ transform: resumeOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }} />
                </button>
                <AnimatePresence>
                  {resumeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 3, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden"
                      style={{ background: "oklch(11% 0.01 65)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "190px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 50 }}
                    >
                      {allResumes.map((r) => (
                        <a
                          key={r.label}
                          href={r.href}
                          download={r.filename}
                          onClick={() => setResumeOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                          style={{ fontSize: "12px", fontFamily: "'Epilogue', sans-serif", color: "rgba(255,255,255,0.65)", display: "flex" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                        >
                          <Download size={10} style={{ opacity: 0.5 }} />
                          {r.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : activeTrack ? (
              <a
                href={resumeByTrack[activeTrack.id]?.href ?? "/resumes/resume-quant.pdf"}
                download={resumeByTrack[activeTrack.id]?.filename}
                className="px-4 py-1.5 rounded-full transition-all duration-200 hover:opacity-90 hover:translate-y-[-1px]"
                style={{
                  fontSize: "12px",
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 500,
                  color: "oklch(12% 0.02 65)",
                  background: activeTrack.color,
                  letterSpacing: "0.02em",
                }}
              >
                Resume
              </a>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={20} style={{ color: "oklch(96% 0.008 65 / 0.7)" }} />
            ) : (
              <Menu size={20} style={{ color: "oklch(96% 0.008 65 / 0.7)" }} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "oklch(8.5% 0.006 65 / 0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: "24px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    color:
                      activeSection === link.href.slice(1)
                        ? (activeTrack?.color ?? "oklch(76% 0.155 65)")
                        : "oklch(96% 0.008 65 / 0.65)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              {activeTrack && (
                <motion.a
                  href={resumeByTrack[activeTrack.id]?.href ?? "/resumes/resume-quant.pdf"}
                  download={resumeByTrack[activeTrack.id]?.filename}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.28 }}
                  className="px-6 py-2 rounded-full mt-4"
                  style={{
                    fontSize: "16px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 500,
                    color: "oklch(8.5% 0.006 65)",
                    background: activeTrack.color,
                  }}
                >
                  Resume
                </motion.a>
              )}

              {activeTrack && (
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.34 }}
                  onClick={() => { setMobileOpen(false); onReopenSelector?.(); }}
                  className="flex items-center gap-2 mt-2"
                  style={{
                    background: activeTrack.color.replace(")", " / 0.12)"),
                    border: `1px solid ${activeTrack.color.replace(")", " / 0.3)")}`,
                    borderRadius: "100px",
                    padding: "8px 18px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: activeTrack.color, display: "inline-block" }} />
                  <span style={{ fontSize: "14px", fontFamily: "'Epilogue', sans-serif", fontWeight: 500, color: activeTrack.color }}>
                    Switch track ↺
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
