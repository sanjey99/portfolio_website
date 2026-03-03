const words = [
  "Python",
  "React",
  "TypeScript",
  "FastAPI",
  "TensorFlow",
  "Monte Carlo",
  "AI Governance",
  "Node.js",
  "Java",
  "Docker",
  "PostgreSQL",
  "WebSocket",
  "Solidity",
  "C++",
  "Next.js",
  "Socket.IO",
  "Flask",
  "MongoDB",
  "NumPy",
  "Pandas",
  "Risk Modeling",
  "Blockchain",
  "Arbitrage",
  "Embedded Systems",
];

export function MarqueeSection() {
  const doubled = [...words, ...words];

  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mx-6 md:mx-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "rgba(255,255,255,0.04)",
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
