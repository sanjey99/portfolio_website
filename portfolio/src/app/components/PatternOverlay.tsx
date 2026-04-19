import { motion } from "motion/react";
import { PatternLayer } from "./TrackPatterns";
import type { TrackId } from "../context/TrackContext";

export function PatternOverlay({ track, visible }: { track: TrackId; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 2.4, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <PatternLayer track={track} />
    </motion.div>
  );
}
