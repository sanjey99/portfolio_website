import { useRef, useEffect, CSSProperties } from "react";
import type { TrackId } from "../context/TrackContext";

// ─── SVG helpers ─────────────────────────────────────────────────────────────

function svgUri(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function quantSvg(): string {
  const c = "#c9922f";
  const o = 0.045;
  // Five OHLC candlesticks of varying height in a 100×80 tile
  return svgUri(
    `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='80'>
      <line x1='10' y1='4' x2='10' y2='13' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <rect x='7' y='13' width='6' height='27' fill='none' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='10' y1='40' x2='10' y2='54' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='30' y1='21' x2='30' y2='27' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <rect x='27' y='27' width='6' height='12' fill='none' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='30' y1='39' x2='30' y2='47' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='50' y1='9' x2='50' y2='17' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <rect x='47' y='17' width='6' height='20' fill='none' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='50' y1='37' x2='50' y2='50' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='70' y1='3' x2='70' y2='11' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <rect x='67' y='11' width='6' height='31' fill='none' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='70' y1='42' x2='70' y2='57' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='90' y1='24' x2='90' y2='29' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <rect x='87' y='29' width='6' height='9' fill='none' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
      <line x1='90' y1='38' x2='90' y2='44' stroke='${c}' stroke-width='0.8' opacity='${o}'/>
    </svg>`
  );
}

function mlSvg(): string {
  const c = "#2da89a";
  // 6×6 grid of squares at dithered opacities — attention heatmap feel
  const ops = [0.015,0.03,0.01,0.025,0.02,0.035, 0.025,0.015,0.03,0.02,0.01,0.04, 0.02,0.025,0.015,0.035,0.03,0.01, 0.035,0.02,0.04,0.015,0.025,0.03, 0.01,0.03,0.02,0.04,0.015,0.025, 0.03,0.01,0.025,0.02,0.035,0.015];
  const step = 10; const sz = 7;
  let rects = "";
  for (let r = 0; r < 6; r++) {
    for (let c2 = 0; c2 < 6; c2++) {
      rects += `<rect x='${c2*step+1}' y='${r*step+1}' width='${sz}' height='${sz}' fill='${c}' opacity='${ops[r*6+c2]}'/>`;
    }
  }
  return svgUri(`<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>${rects}</svg>`);
}

// ─── Canvas patterns (animated / complex) ────────────────────────────────────

export function TerminalDriftCanvas({ style }: { style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = ["{", "}", "/", ">", "_", "0", "1", "(", ")", "=", "&", "<", ">", "fn", "[]"];
    const colW = 30;
    const numCols = Math.ceil(canvas.offsetWidth / colW) + 2;

    const cols = Array.from({ length: numCols }, (_, i) => ({
      x: i * colW + Math.random() * colW * 0.5,
      y: Math.random() * (canvas.offsetHeight || 800),
      speed: 0.25 + Math.random() * 0.4,
      ci: Math.floor(Math.random() * chars.length),
      timer: 0,
      interval: 50 + Math.random() * 100,
    }));

    let raf = 0;
    let prev = 0;

    const draw = (t: number) => {
      const dt = Math.min(t - prev, 50);
      prev = t;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `10px ui-monospace, 'Cascadia Code', monospace`;
      ctx.fillStyle = "rgba(80,115,255,0.022)";

      for (const col of cols) {
        col.y += col.speed * (dt / 16);
        col.timer += dt;
        if (col.timer > col.interval) { col.timer = 0; col.ci = Math.floor(Math.random() * chars.length); }
        if (col.y > h) col.y = -16;
        ctx.fillText(chars[col.ci], col.x, col.y);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}

export function ConstellationCanvas({ style }: { style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;

    // seeded rng for consistent layout
    const rng = (seed: number) => { const x = Math.sin(seed) * 10000; return x - Math.floor(x); };

    const trackColors = ["201,146,47", "45,168,154", "80,115,255", "200,190,170"];
    const pts = Array.from({ length: 90 }, (_, i) => ({
      x: rng(i * 3 + 1) * w,
      y: rng(i * 3 + 2) * h,
      r: 0.8 + rng(i * 3 + 3) * 1.6,
      col: trackColors[Math.floor(rng(i * 7) * 4)],
    }));

    ctx.clearRect(0, 0, w, h);

    // connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.strokeStyle = `rgba(${pts[i].col},${0.018 * (1 - d/110)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    for (const p of pts) {
      ctx.fillStyle = `rgba(${p.col},0.03)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    }; // end draw()

    // ResizeObserver fires when the canvas first gets real dimensions and on resize
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    draw(); // attempt immediately in case dimensions are already known

    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", ...style }}
    />
  );
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function PatternLayer({ track, style }: { track: TrackId; style?: CSSProperties }) {
  const base: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    ...style,
  };

  if (track === "quant") {
    return (
      <div
        style={{
          ...base,
          backgroundImage: quantSvg(),
          backgroundSize: "100px 80px",
          backgroundRepeat: "repeat",
        }}
      />
    );
  }

  if (track === "ml") {
    return (
      <div
        style={{
          ...base,
          backgroundImage: mlSvg(),
          backgroundSize: "60px 60px",
          backgroundRepeat: "repeat",
        }}
      />
    );
  }

  if (track === "fullstack") {
    return <TerminalDriftCanvas style={base} />;
  }

  // "all" — constellation
  return <ConstellationCanvas style={base} />;
}
