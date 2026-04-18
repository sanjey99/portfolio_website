import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
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

export function HeroSection() {
  const [greetingIndex, setGreetingIndex] = useState(
    Math.floor(Math.random() * greetings.length)
  );

  const cycleGreeting = useCallback(() => {
    setGreetingIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * greetings.length);
      } while (next === prev);
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleGreeting, 3000);
    return () => clearInterval(interval);
  }, [cycleGreeting]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("hero")?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-start justify-center"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Sanjey"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Content - positioned at ~30% from top */}
      <div
        className="relative z-10 text-center px-6 max-w-[800px] mx-auto"
        style={{ marginTop: "28vh" }}
      >
        {/* Rotating greeting */}
        <div className="h-[50px] md:h-[65px] flex items-end justify-center overflow-hidden mb-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={greetingIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(20px, 3.5vw, 34px)",
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "-0.01em",
              }}
            >
              {greetings[greetingIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(52px, 10vw, 120px)",
            color: "#fff",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Sanjey<span style={{ color: "oklch(76% 0.155 65)" }}>.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-5"
          style={{
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Computer Engineering{" "}
          <span className="mx-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            |
          </span>{" "}
          Nanyang Technological University
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center justify-center gap-5 mt-10"
        >
          <a
            href="https://github.com/sanjey99"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/15"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Github size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjey99/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/15"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Linkedin size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>
          <a
            href="mailto:sanjeyan001@e.ntu.edu.sg"
            aria-label="Email"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/15"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Mail size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 300,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div className="w-5 h-9 rounded-full border border-white/25 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
