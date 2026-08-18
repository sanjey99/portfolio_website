import type { CSSProperties } from "react";
import type { TrackId } from "../context/TrackContext";

const quantCandlesticks = `url("data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="144" height="96" viewBox="0 0 144 96">
    <g stroke="#9a7a3a" stroke-width="1" opacity="0.18"><path d="M18 18v46M54 28v50M90 12v44M126 36v46" /></g>
    <g fill="#9a7a3a" opacity="0.12"><rect x="14" y="30" width="8" height="20" /><rect x="50" y="40" width="8" height="20" /><rect x="86" y="22" width="8" height="20" /><rect x="122" y="48" width="8" height="18" /></g>
  </svg>
`) }")`;

export function PatternLayer({ track, style }: { track: TrackId; style?: CSSProperties }) {
  if (track !== "quant") return null;
  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: quantCandlesticks, backgroundRepeat: "repeat", opacity: 0.32, ...style }} />;
}
