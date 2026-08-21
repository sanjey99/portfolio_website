import { motion } from "motion/react";
import { PatternLayer } from "./TrackPatterns";

export function PatternOverlay() {
  return (
    <motion.div
      className="pattern-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <PatternLayer />
    </motion.div>
  );
}
