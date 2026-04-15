"use client";

import { useReducedMotion } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

function useCursorDisabled(pathname: string | null): boolean {
  if (!pathname) return true;
  if (pathname.startsWith("/dashboard")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/login" || pathname === "/signup") return true;
  return false;
}

function isInteractiveTarget(el: Element | null): boolean {
  if (!el) return false;
  return Boolean(
    el.closest(
      "a, button, input, textarea, select, [role='button'], [data-cursor-hover]",
    ),
  );
}

export function CustomCursor(): ReactNode {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const disabledRoute = useCursorDisabled(pathname);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const ringX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 });
  const dotX = useSpring(mx, { stiffness: 420, damping: 32, mass: 0.25 });
  const dotY = useSpring(my, { stiffness: 420, damping: 32, mass: 0.25 });

  const enabledBase =
    pointerFine && !reduceMotion && !disabledRoute && active;

  useEffect(() => {
    if (!pointerFine || reduceMotion || disabledRoute) {
      document.documentElement.classList.remove("pv-custom-cursor");
      setActive(false);
      return;
    }

    const move = (e: MouseEvent) => {
      if (!document.documentElement.classList.contains("pv-custom-cursor")) {
        document.documentElement.classList.add("pv-custom-cursor");
      }
      setActive(true);
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(isInteractiveTarget(target));
    };

    const leave = () => {
      document.documentElement.classList.remove("pv-custom-cursor");
      setActive(false);
      setHovering(false);
      mx.set(-200);
      my.set(-200);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("pv-custom-cursor");
    };
  }, [pointerFine, reduceMotion, disabledRoute, mx, my]);

  if (!enabledBase) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10050]"
        style={{
          left: ringX,
          top: ringY,
          marginLeft: -20,
          marginTop: -20,
        }}
        animate={{ scale: hovering ? 1.45 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        aria-hidden
      >
        <div className="h-10 w-10 rounded-full border-2 border-accent/70 bg-transparent shadow-[0_0_24px_rgba(59,130,246,0.15)] dark:border-accent/80 dark:shadow-[0_0_28px_rgba(59,130,246,0.22)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10051]"
        style={{
          left: dotX,
          top: dotY,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{ scale: hovering ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        aria-hidden
      >
        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-sm ring-1 ring-accent/40" />
      </motion.div>
    </>
  );
}
