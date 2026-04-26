"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "../lib/gsap";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface AnimatedButtonProps {
    /** Button label text */
    text: string;
    /** Link destination */
    href: string;
    /** Open in new tab */
    external?: boolean;
    /** Optional extra Tailwind classes on the outer element */
    className?: string;
}

/* ═════════════════════════════════════════════
   COMPONENT

   Animation (exact match to video):
   ─ Default  : white rounded box on the LEFT, arrow inside, label centred to the right
   ─ On hover : white box SLIDES (translateX) from left → horizontal centre of button
   ─ On leave : white box slides back to left
   ─ Label    : fades out as box travels over it, fades back in on leave
═════════════════════════════════════════════ */
export default function AnimatedButton({
    text,
    href,
    external = false,
    className = "",
}: AnimatedButtonProps) {
    const btnRef  = useRef<HTMLAnchorElement>(null);
    const boxRef  = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    /* ── Calculate the translateX needed to slide box to the RIGHT edge ── */
    const getRightOffset = () => {
        const btn = btnRef.current;
        const box = boxRef.current;
        if (!btn || !box) return 0;
        const btnW    = btn.offsetWidth;  // full button width
        const boxW    = box.offsetWidth;  // white square width
        const boxLeft = box.offsetLeft;   // current left inset (6px)
        const inset   = 6;                // mirrors top-[6px] / left-[6px]
        // x needed so box right edge == button right edge minus inset
        // boxLeft + x + boxW == btnW - inset
        return btnW - inset - boxLeft - boxW;
    };

    const handleMouseEnter = () => {
        const offset = getRightOffset();
        gsap.to(boxRef.current, {
            x: offset,
            duration: 0.55,
            ease: "power3.inOut",
        });
        gsap.timeline()
            .to(labelRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
            })
            .to(labelRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
            });
    };

    const handleMouseLeave = () => {
        gsap.to(boxRef.current, {
            x: 0,
            duration: 0.55,
            ease: "power3.inOut",
        });
        gsap.timeline()
            .to(labelRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
            })
            .to(labelRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
            });
    };

    return (
        <Link
            ref={btnRef}
            href={href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={[
                "group",
                "relative inline-flex items-center",
                "bg-red-500 rounded-xl overflow-hidden",
                "h-[60px] w-full max-w-[350px]",
                "cursor-pointer select-none",
                className,
            ].join(" ")}
        >
            {/* ── WHITE SQUARE BOX ── */}
            <span
                ref={boxRef}
                className={[
                    // Position — inset from edges so it doesn't touch the border
                    "absolute left-[6px] top-[6px]",
                    // Size — square
                    "w-[48px] h-[48px]",
                    // Visual
                    "bg-white rounded-lg",
                    "flex items-center justify-center shrink-0",
                    "z-10",
                ].join(" ")}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M3.5 9h11M10 4.5l4.5 4.5L10 13.5"
                        stroke="#0f0f0f"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>

            {/* ── LABEL ── */}
            <span
                ref={labelRef}
                className={[
                    "relative z-0",
                    "w-full text-center",

                    "text-white font-bold text-sm tracking-wide",
                    "pointer-events-none",
                ].join(" ")}
            >
                {text}
            </span>
        </Link>
    );
}