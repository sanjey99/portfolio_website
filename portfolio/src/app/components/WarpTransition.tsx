import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface WarpTransitionProps {
  onComplete: () => void;
}

export function WarpTransition({ onComplete }: WarpTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const numStreaks = 120;

    // Each streak: angle, base length, speed multiplier, width, color variant
    const streaks = Array.from({ length: numStreaks }, (_, i) => ({
      angle: (i / numStreaks) * Math.PI * 2 + (Math.random() - 0.5) * 0.12,
      length: 20 + Math.random() * 60,
      speed: 3.5 + Math.random() * 4,
      width: 0.4 + Math.random() * 1.2,
      hue: 195 + Math.random() * 50, // blue spectrum
      startRadius: 40 + Math.random() * 80,
    }));

    let raf = 0;
    let t = 0;
    const duration = 700; // ms
    const start = performance.now();

    const draw = (now: number) => {
      t = Math.min((now - start) / duration, 1);

      ctx.fillStyle = `rgba(7, 8, 12, ${t < 0.85 ? 0.18 : 0.35})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ease = t < 0.7 ? t * t * (3 - 2 * t) : 1; // smoothstep then hold

      for (const s of streaks) {
        const innerR = s.startRadius + ease * s.speed * 180;
        const outerR = innerR + s.length * (1 + ease * 5);

        if (innerR > Math.max(canvas.width, canvas.height)) continue;

        const opacity = t < 0.75 ? 0.55 + ease * 0.35 : Math.max(0, 1 - (t - 0.75) * 4);

        const x1 = cx + Math.cos(s.angle) * innerR;
        const y1 = cy + Math.sin(s.angle) * innerR;
        const x2 = cx + Math.cos(s.angle) * Math.min(outerR, Math.max(canvas.width, canvas.height) * 1.5);
        const y2 = cy + Math.sin(s.angle) * Math.min(outerR, Math.max(canvas.width, canvas.height) * 1.5);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `hsla(${s.hue}, 90%, 72%, 0)`);
        grad.addColorStop(0.2, `hsla(${s.hue}, 90%, 72%, ${opacity})`);
        grad.addColorStop(1, `hsla(${s.hue}, 95%, 90%, ${opacity * 0.3})`);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width * (1 + ease * 2);
        ctx.stroke();
      }

      // Central flash at peak
      if (t > 0.55 && t < 0.85) {
        const flashOpacity = Math.sin((t - 0.55) / 0.3 * Math.PI) * 0.15;
        const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);
        radial.addColorStop(0, `rgba(120, 190, 255, ${flashOpacity})`);
        radial.addColorStop(1, `rgba(40, 100, 255, 0)`);
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (t < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "oklch(4% 0.008 240)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </motion.div>
  );
}
