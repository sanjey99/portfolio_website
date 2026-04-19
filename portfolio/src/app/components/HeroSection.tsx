import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ChevronDown, Download } from "lucide-react";
import heroImg from "@/assets/519e3075752b6c7f5afc08ea933955f297ac4d06.png";

const greetings = [
  { text: "Hello, I am", lang: "English" },
  { text: "Ciao! Sono", lang: "Italian" },
  { text: "Bonjour, je suis", lang: "French" },
  { text: "Hola, soy", lang: "Spanish" },
  { text: "Hallo, ich bin", lang: "German" },
  { text: "Namaste, main hoon", lang: "Hindi" },
  { text: "Vanakkam, naan", lang: "Tamil" },
  { text: "Annyeong, nan", lang: "Korean" },
  { text: "Merhaba, ben", lang: "Turkish" },
  { text: "Oi, eu sou", lang: "Portuguese" },
  { text: "Konnichiwa, watashi wa", lang: "Japanese" },
  { text: "Salam, man hastam", lang: "Farsi" },
];

const resumes = [
  { label: "Quantitative Finance", href: "/resumes/resume-quant.pdf", filename: "Sanjey_Resume_Quant.pdf" },
  { label: "Machine Learning & AI", href: "/resumes/resume-ml.pdf", filename: "Sanjey_Resume_ML.pdf" },
  { label: "Full Stack", href: "/resumes/resume-fullstack.pdf", filename: "Sanjey_Resume_FullStack.pdf" },
];

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  const [greetingIndex, setGreetingIndex] = useState(
    Math.floor(Math.random() * greetings.length)
  );
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const cycleGreeting = useCallback(() => {
    setGreetingIndex((prev) => {
      let next: number;
      do { next = Math.floor(Math.random() * greetings.length); } while (next === prev);
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleGreeting, 3000);
    return () => clearInterval(interval);
  }, [cycleGreeting]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src={heroImg} alt="Sanjey" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.72) 100%)",
          }}
        />
      </motion.div>

      {/* Top bar — name + subtitle (won't block face) */}
      <div className="relative z-10 px-8 pt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 900,
              fontSize: "28px",
              color: "#fff",
              letterSpacing: "-0.03em",
            }}
          >
            Sanjey<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
          </span>
          <div className="w-px h-5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }} />
          <span
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Computer Engineering · NTU
          </span>
        </motion.div>
      </div>

      {/* Bottom section — links + enter button */}
      <div className="relative z-10 mt-auto px-8 pb-12">
        {/* Rotating greeting */}
        <div className="h-10 flex items-center overflow-hidden mb-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={greetingIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {greetings[greetingIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Big name at bottom */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 11vw, 130px)",
            color: "#fff",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}
        >
          Sanjey<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: "12px",
            color: "oklch(76% 0.155 65 / 0.7)",
            letterSpacing: "0.04em",
            marginBottom: "28px",
          }}
        >
          Seeking SWE internship · May 2026
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex items-center gap-3 flex-wrap"
        >
          {/* Resume dropdown */}
          <div ref={resumeRef} className="relative">
            <button
              onClick={() => setResumeOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "12.5px",
                fontWeight: 500,
                letterSpacing: "0.03em",
                background: "oklch(76% 0.155 65)",
                color: "oklch(12% 0.02 65)",
              }}
            >
              <Download size={13} />
              Resume
              <ChevronDown
                size={12}
                style={{
                  transform: resumeOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden"
                  style={{
                    background: "oklch(11% 0.01 65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    minWidth: "200px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  {resumes.map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      download={r.filename}
                      onClick={() => setResumeOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 transition-colors duration-150"
                      style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.7)",
                        display: "flex",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      <Download size={11} style={{ opacity: 0.5, flexShrink: 0 }} />
                      {r.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-5 shrink-0" style={{ background: "rgba(255,255,255,0.15)" }} />

          {/* Social links */}
          <a
            href="https://github.com/sanjey99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Github size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjey99/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Linkedin size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>
          <a
            href="mailto:sanjeyan001@e.ntu.edu.sg"
            aria-label="Email"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Mail size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>

          <div className="flex-1" />

          {/* Enter CTA */}
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: "12.5px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              padding: "10px 22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Enter portfolio
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
