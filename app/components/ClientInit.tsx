"use client";

import { useEffect } from "react";
import { initLenis } from "../lib/lenis";

export default function ClientInit() {
  useEffect(() => {
    initLenis();
  }, []);

  return null;
}
