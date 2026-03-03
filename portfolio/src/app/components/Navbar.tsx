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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
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
            className="flex items-center gap-2 group"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              S<span style={{ color: "#4ade80" }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative group"
                style={{
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.5)";
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="px-4 py-1.5 rounded-full transition-all duration-300 hover:translate-y-[-1px]"
              style={{
                fontSize: "12px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                color: "#0a0a0a",
                background: "#4ade80",
                letterSpacing: "0.02em",
              }}
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
            ) : (
              <Menu size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: "24px",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="px-6 py-2 rounded-full mt-4"
                style={{
                  fontSize: "16px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: "#0a0a0a",
                  background: "#4ade80",
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
