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
  phaseRef.current = phase;
  const rafRef = useRef<number>(0);
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
    if (reduceMotion) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("gone");
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase("gone");
        return;
      }
    } catch {
      /* ignore */
    }
    setPhase("run");
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
    const durationMs = 1500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) * (1 - t);
      setProgress(Math.min(100, Math.floor(eased * 100)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        window.setTimeout(finish, 220);
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
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (phaseRef.current === "exit") setPhase("gone");
      }}
      aria-busy={phase === "run"}
      aria-live="polite"
      aria-label="Loading PayVantage"
    >
      <div className="mb-10 flex items-center gap-2.5">
        <span className="h-9 w-9 rounded-full bg-foreground" aria-hidden />
        <span className="text-lg font-semibold tracking-tight text-foreground">
          PayVantage
        </span>
      </div>

      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Loading
      </p>
      <motion.span
        className="font-serif text-6xl font-medium tabular-nums tracking-tight text-foreground sm:text-7xl md:text-8xl"
        key={progress}
        initial={{ opacity: 0.65, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12 }}
      >
        {progress}
        <span className="text-foreground/40">%</span>
      </motion.span>

      <div className="mt-10 h-1 w-[min(18rem,85vw)] overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", duration: 0.08 }}
        />
      </div>
    </motion.div>
  );
}
