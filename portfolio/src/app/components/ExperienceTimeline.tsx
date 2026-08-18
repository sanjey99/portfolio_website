import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Briefcase, CaretDown } from "@phosphor-icons/react";
import type { TrackId } from "../context/TrackContext";
import { TRACKS } from "../context/TrackContext";
import { timelineData } from "../data/timeline";
import type { TimelineItem } from "../data/timeline";

// ─── Mobile accordion card ────────────────────────────────────────────────────

function AccordionCard({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Header row — always visible, tap to toggle */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setOpen(v => !v)}
        style={{ cursor: "pointer", background: "transparent", border: "none" }}
      >
        <div
          className="w-7 h-7 flex items-center justify-center shrink-0"
          style={{ background: `${item.accent}15` }}
        >
          <Briefcase size={13} style={{ color: item.accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: "13.5px", fontFamily: "var(--font-body)", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "2px" }}>
            {item.title}
          </p>
          <p style={{ fontSize: "11px", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}>
            {item.org} · {item.period}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ flexShrink: 0 }}
        >
          <CaretDown size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </button>

      {/* Expandable body */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 pb-4">
          <ul className="space-y-1.5 mb-3">
            {item.description.map((desc, j) => (
              <li
                key={j}
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.45)",
                  paddingLeft: "10px",
                  position: "relative",
                }}
              >
                <span style={{ position: "absolute", left: 0, color: item.accent, opacity: 0.5 }}>·</span>
                {desc}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded"
                style={{
                  fontSize: "10px",
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ExperienceTimeline({ track }: { track: TrackId }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const trackColor = TRACKS.find(t => t.id === track)?.color ?? "oklch(76% 0.155 65)";

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6"
      style={{ background: "oklch(8.5% 0.006 65)" }}
    >
      <div className="max-w-[1200px] mx-auto" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "oklch(96% 0.008 65)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginBottom: "12px",
            }}
          >
            Work Experience
          </h2>
          <p
            style={{
              fontSize: "13.5px",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.35)",
              maxWidth: "480px",
            }}
          >
            Where I've built things that matter.
          </p>
        </motion.div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-2">
          {timelineData.map((item, i) => (
            <motion.div
              key={`mobile-${item.title}`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <AccordionCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal drag timeline */}
        <div className="hidden md:block relative">
          <div
            className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, oklch(8.5% 0.006 65) 0%, transparent 100%)" }}
          />

          <div className="overflow-x-auto hide-scrollbar pb-6">
            <div
              className="absolute top-[88px] left-0 right-0 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            <div className="flex items-center gap-3 mb-6">
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: `${trackColor.replace(")", " / 0.55)")}`,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Drag to explore
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>

            <div className="flex gap-0 min-w-max">
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.title + item.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative flex flex-col items-start"
                  style={{ width: "340px", paddingRight: "20px" }}
                >
                  <p className="mb-4" style={{ fontSize: "11px", fontFamily: "var(--font-body)", color: item.accent, letterSpacing: "0.05em" }}>
                    {item.year}
                  </p>

                  <div className="relative mb-6">
                    <div className="w-2.5 h-2.5" style={{ background: item.accent }} />
                  </div>

                  <motion.div
                    className="p-5 w-full cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${item.accent}55`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${item.accent}15` }}>
                        <Briefcase size={13} style={{ color: item.accent }} />
                      </div>
                      <span style={{ fontSize: "14px", fontFamily: "var(--font-body)", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                        {item.title}
                      </span>
                    </div>
                    <p className="mb-1" style={{ fontSize: "11px", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}>
                      {item.org}
                    </p>
                    <p className="mb-3" style={{ fontSize: "11px", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.38)" }}>
                      {item.period}
                    </p>

                    <ul className="space-y-1.5 mb-3">
                      {item.description.map((desc, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: "13px",
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.45)",
                            paddingLeft: "10px",
                            position: "relative",
                          }}
                        >
                          <span style={{ position: "absolute", left: 0, color: item.accent, opacity: 0.5 }}>·</span>
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded"
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-body)",
                            color: "rgba(255,255,255,0.3)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
