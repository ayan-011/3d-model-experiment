"use client";

import { useEffect, useState } from "react";

function Corner({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-8 h-8 border-brass/50 ${className}`}
      aria-hidden
    />
  );
}

export function Hud() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = document.getElementById("content-track");
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(
          Math.max(-rect.top, 0),
          Math.max(total, 1)
        );
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const rotationDeg = Math.round(progress * 1008); // matches ~5.6rad sweep
  const zoomPct = Math.round(40 + Math.sin(progress * Math.PI) * 90 + 40);
  const depthM = (1.2 + progress * 3.4).toFixed(2);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none">
      <Corner className="top-6 left-6 border-t border-l" />
      <Corner className="top-6 right-6 border-t border-r" />
      <Corner className="bottom-6 left-6 border-b border-l" />
      <Corner className="bottom-6 right-6 border-b border-r" />

      <div className="absolute top-6 left-6 mt-10 ml-1 font-mono text-[10px] tracking-[0.2em] text-muted hud-flicker">
        {/* <p className="text-brass">UNIT // SC0RN-R3V</p>
        <p>STATUS: INSPECTION</p> */}
      </div>

      {/* <div className="absolute top-6 right-6 mt-10 mr-1 text-right font-mono text-[10px] tracking-[0.2em] text-muted hud-flicker">
        <p className="tabular text-brass">
          ROT&nbsp;{String(rotationDeg % 360).padStart(3, "0")}&deg;
        </p>
        <p className="tabular">ZOOM&nbsp;{zoomPct}%</p>
        <p className="tabular">DEPTH&nbsp;{depthM}M</p>
      </div> */}

      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-[2px] bg-steel-line">
        <div
          className="h-full bg-brass transition-[width] duration-75 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div> */}
    </div>
  );
}
