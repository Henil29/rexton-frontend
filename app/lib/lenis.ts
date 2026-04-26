"use client";

import Lenis from "@studio-freight/lenis";

export function initLenis() {
  const lenis = new Lenis({
    lerp: 0.08, // smoothness
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}