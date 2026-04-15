"use client";

import { cn } from "@/lib/utils";
import * as THREE from "three";
import { useEffect, useRef, type ReactNode } from "react";

export type ShaderCardProps = {
  children: ReactNode;
  className?: string;
  /** Animation speed multiplier; keep low (e.g. 0.12–0.25) for subtle motion. */
  speed?: number;
  /** Primary accent for the shader (hex). */
  color?: string;
  /** Deep base tone (hex); defaults to near PayVantage dark background. */
  deepColor?: string;
};

function hexToVec3(hex: string): THREE.Vector3 {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return new THREE.Vector3(0.15, 0.35, 0.95);
  const r = Number.parseInt(h.slice(0, 2), 16) / 255;
  const g = Number.parseInt(h.slice(2, 4), 16) / 255;
  const b = Number.parseInt(h.slice(4, 6), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uAccent;
  uniform vec3 uDeep;
  uniform float uSpeed;

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;
    vec2 c1 = vec2(0.42 + 0.07 * sin(t * 0.55), 0.48 + 0.06 * cos(t * 0.42));
    vec2 c2 = vec2(0.62 + 0.05 * cos(t * 0.38), 0.38 + 0.06 * sin(t * 0.5));
    float d1 = distance(uv, c1);
    float d2 = distance(uv, c2);
    float n = 0.5 + 0.5 * sin(uv.x * 9.0 + t * 0.6) * sin(uv.y * 8.0 - t * 0.45);
    float glow1 = exp(-d1 * 3.4) * (0.5 + 0.22 * n);
    float glow2 = exp(-d2 * 2.8) * (0.35 + 0.15 * n);
    float glow = glow1 + glow2 * 0.65;
    vec3 base = mix(uDeep, uAccent * 0.28, glow * 0.85);
    vec3 rim = uAccent * glow * 0.55;
    vec3 col = clamp(base + rim, 0.0, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ShaderCard({
  children,
  className,
  speed = 0.16,
  color = "#2563eb",
  deepColor = "#05050f",
}: ShaderCardProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const container = containerRef.current;
    if (!mount || !container) return;
    const sizeEl = container;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x05050f, 1);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uAccent: { value: hexToVec3(color) },
      uDeep: { value: hexToVec3(deepColor) },
      uSpeed: { value: speed },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    const start = performance.now();

    function resize() {
      const w = Math.max(1, sizeEl.clientWidth);
      const h = Math.max(1, sizeEl.clientHeight);
      const pr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
    }

    function animate() {
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    }

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(sizeEl);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [speed, color, deepColor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative isolate min-h-0 overflow-hidden rounded-2xl", className)}
    >
      <div
        ref={mountRef}
        className="pointer-events-none absolute inset-0 z-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-0 flex-col bg-background/55 p-6 backdrop-blur-md sm:p-8 dark:bg-background/45">
        {children}
      </div>
    </div>
  );
}
