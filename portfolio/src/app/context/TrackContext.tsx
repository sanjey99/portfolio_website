import { createContext, useContext, useState, ReactNode } from "react";

export type TrackId = "quant" | "ml" | "fullstack" | "all";

export interface TrackConfig {
  id: TrackId;
  label: string;
  color: string;
  dim: string;
  symbols: string[];
  description: string;
}

export const TRACKS: TrackConfig[] = [
  {
    id: "quant",
    label: "Quantitative Finance",
    color: "oklch(76% 0.155 65)",
    dim: "oklch(76% 0.155 65 / 0.55)",
    symbols: ["Σ", "∂", "∫", "μ", "%", "σ", "$", "∇"],
    description: "Risk systems · Alpha research · Quant modeling",
  },
  {
    id: "ml",
    label: "Machine Learning & AI",
    color: "oklch(62% 0.11 158)",
    dim: "oklch(62% 0.11 158 / 0.55)",
    symbols: ["θ", "λ", "∇", "β", "∈", "≈", "∑", "⊕"],
    description: "LLMs · Fine-tuning · Multi-agent systems",
  },
  {
    id: "fullstack",
    label: "Full Stack",
    color: "oklch(65% 0.14 260)",
    dim: "oklch(65% 0.14 260 / 0.55)",
    symbols: ["{}", "<>", "fn", "//", "[]", "=>", "&&", "??"],
    description: "Real-time systems · APIs · Frontend",
  },
  {
    id: "all",
    label: "View Everything",
    color: "oklch(74% 0.04 65)",
    dim: "oklch(74% 0.04 65 / 0.55)",
    symbols: ["★", "◆", "■", "●", "▲", "✦", "◈", "⬡"],
    description: "The full picture across all disciplines",
  },
];

interface TrackContextValue {
  selectedTrack: TrackId;
  setSelectedTrack: (t: TrackId) => void;
}

const TrackContext = createContext<TrackContextValue>({
  selectedTrack: "all",
  setSelectedTrack: () => {},
});

export function TrackProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("all");
  return (
    <TrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack() {
  return useContext(TrackContext);
}
