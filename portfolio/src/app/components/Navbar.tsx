import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
            <a
              href="/resume.pdf"
              download
              className="px-4 py-1.5 rounded-full transition-all duration-200 hover:opacity-90 hover:translate-y-[-1px]"
              style={{
                fontSize: "12px",
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 500,
                color: "oklch(8.5% 0.006 65)",
                background: "oklch(76% 0.155 65)",
                letterSpacing: "0.02em",
              }}
            >
              Resume
            </a>
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
                        ? "oklch(76% 0.155 65)"
                        : "oklch(96% 0.008 65 / 0.65)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.28 }}
                className="px-6 py-2 rounded-full mt-4"
                style={{
                  fontSize: "16px",
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 500,
                  color: "oklch(8.5% 0.006 65)",
                  background: "oklch(76% 0.155 65)",
                }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
