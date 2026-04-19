const words = [
  "Python",
  "React",
  "TypeScript",
  "FastAPI",
  "LangGraph",
  "Monte Carlo",
  "AI Governance",
  "Node.js",
  "PyTorch",
  "Docker",
  "TimescaleDB",
  "Kafka",
  "LoRA / GRPO",
  "C++",
  "Next.js",
  "CLIP",
  "FAISS",
  "LightGBM",
  "vLLM",
  "PostgreSQL",
  "VaR · CVaR",
  "Triton kernels",
  "Qdrant",
  "Fama-French",
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MarqueeSection({ track: _track }: { track?: string }) {
  const doubled = [...words, ...words];

  return (
    <section
      role="presentation"
      aria-hidden="true"
      className="relative py-9 overflow-hidden"
      style={{
        background: "oklch(8.5% 0.006 65)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mx-8 md:mx-12"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 38px)",
              color: "rgba(255,255,255,0.05)",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
