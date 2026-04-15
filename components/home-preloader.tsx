"use client";

import { useReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SESSION_KEY = "pv_home_preloader_done";

export function HomePreloader(): ReactNode {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "run" | "exit" | "gone">("idle");
  const phaseRef = useRef(phase);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("exit");
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const go = (next: "gone" | "run") => {
      queueMicrotask(() => setPhase(next));
    };
    if (reduceMotion) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      go("gone");
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        go("gone");
        return;
      }
    } catch {
      /* ignore */
    }
    go("run");
  }, [reduceMotion]);

  useEffect(() => {
    if (phase === "run" || phase === "exit") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "run") return;
    const start = performance.now();
    const durationMs = 1280;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = t * t * (3 - 2 * t);
      setProgress(Math.min(100, Math.round(eased * 100)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        window.setTimeout(finish, 180);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase, finish]);

  if (phase === "gone" || phase === "idle") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10070] flex flex-col items-center justify-center bg-background px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onAnimationComplete={() => {
        if (phaseRef.current === "exit") setPhase("gone");
      }}
      aria-busy={phase === "run"}
      aria-live="polite"
      aria-label="Loading PayVantage"
    >
      <div className="mb-12 flex items-center gap-3">
        <span className="h-10 w-10 shrink-0 rounded-md bg-foreground" aria-hidden />
        <span className="font-sans text-xl font-black uppercase tracking-[0.12em] text-foreground">
          PayVantage
        </span>
      </div>

      <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
        Loading
      </p>

      <div className="flex items-baseline gap-1 font-sans text-[clamp(4.5rem,14vw,9rem)] font-black tabular-nums leading-none tracking-tighter text-foreground">
        <span>{progress}</span>
        <span className="text-[0.45em] font-black text-muted-foreground">%</span>
      </div>

      <div className="mt-12 h-1.5 w-[min(20rem,88vw)] overflow-hidden rounded-sm bg-muted">
        <div
          className="h-full rounded-sm bg-accent transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
