"use client";

import { useReducedMotion } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const MORPH_SELECTOR =
  "a, button, [role='button'], input[type='submit'], input[type='button'], input[type='reset']";

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

function readBorderRadius(el: HTMLElement): string {
  const r = getComputedStyle(el).borderRadius;
  if (r && r !== "0px") return r.split(" ")[0] ?? r;
  const h = el.getBoundingClientRect().height;
  return `${Math.min(9999, h / 2)}px`;
}

type MorphState = {
  el: HTMLElement;
  rect: DOMRect;
  radius: string;
};

export function CustomCursor(): ReactNode {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const disabledRoute = useCursorDisabled(pathname);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [morph, setMorph] = useState<MorphState | null>(null);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const dotX = useSpring(mx, { stiffness: 520, damping: 34, mass: 0.22 });
  const dotY = useSpring(my, { stiffness: 520, damping: 34, mass: 0.22 });

  const syncMorphRect = useCallback(() => {
    setMorph((prev) => {
      if (!prev) return prev;
      try {
        const rect = prev.el.getBoundingClientRect();
        return { ...prev, rect, radius: readBorderRadius(prev.el) };
      } catch {
        return null;
      }
    });
  }, []);

  const enabledBase =
    pointerFine && !reduceMotion && !disabledRoute && active;

  useEffect(() => {
    if (!morph) return;
    const onScrollOrResize = () => syncMorphRect();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [morph, syncMorphRect]);

  useEffect(() => {
    if (!pointerFine || reduceMotion || disabledRoute) {
      document.documentElement.classList.remove("pv-custom-cursor");
      queueMicrotask(() => {
        setActive(false);
        setMorph(null);
        mx.set(-200);
        my.set(-200);
      });
      return;
    }

    const move = (e: MouseEvent) => {
      if (!document.documentElement.classList.contains("pv-custom-cursor")) {
        document.documentElement.classList.add("pv-custom-cursor");
      }
      setActive(true);
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      mx.set(x);
      my.set(y);

      const hit = document.elementFromPoint(x, y);
      const target = hit?.closest(MORPH_SELECTOR) as HTMLElement | null;

      if (target && document.contains(target)) {
        const rect = target.getBoundingClientRect();
        const radius = readBorderRadius(target);
        setMorph((prev) =>
          prev?.el === target
            ? { ...prev, rect, radius }
            : { el: target, rect, radius },
        );
      } else {
        setMorph(null);
      }
    };

    const leave = () => {
      document.documentElement.classList.remove("pv-custom-cursor");
      setActive(false);
      setMorph(null);
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

  const ringSpring = {
    type: "spring" as const,
    stiffness: 520,
    damping: 38,
    mass: 0.35,
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10050] box-border border-2 border-accent/75 bg-transparent shadow-[0_0_20px_rgba(59,130,246,0.12)] dark:border-accent/85 dark:shadow-[0_0_26px_rgba(59,130,246,0.2)]"
        initial={false}
        animate={
          morph
            ? {
                left: morph.rect.left,
                top: morph.rect.top,
                width: Math.max(1, morph.rect.width),
                height: Math.max(1, morph.rect.height),
                borderRadius: morph.radius,
              }
            : {
                left: pos.x - 20,
                top: pos.y - 20,
                width: 40,
                height: 40,
                borderRadius: 9999,
              }
        }
        transition={ringSpring}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10051]"
        style={{
          left: dotX,
          top: dotY,
          marginLeft: -3,
          marginTop: -3,
        }}
        aria-hidden
      >
        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-sm ring-1 ring-accent/40" />
      </motion.div>
    </>
  );
}
