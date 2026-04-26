"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";
import AnimatedButton from "../hook/AnimatedButton";

/* ─────────────────────────────────────────────
   CHECK ICON
───────────────────────────────────────────── */
const CheckIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="shrink-0 mt-0.5"
    >
        <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.5" />
        <path
            d="M6 10.5l2.5 2.5L14 7.5"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/* ─────────────────────────────────────────────
   ARROW BUTTON ICON
───────────────────────────────────────────── */
const ArrowIcon = () => (
    <span className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

/* ─────────────────────────────────────────────
   PLAN DATA — adapted for visual studio
───────────────────────────────────────────── */
const STARTER_FEATURES = [
    "1 Dedicated Cinematographer",
    "Half-day shoot (up to 4 hrs)",
    "1 active project at a time",
    "3-day delivery turnaround",
    "Up to 3 edited video deliverables",
    "Basic colour grading & sound mix",
];

const GROWTH_FEATURES = [
    "2 Cinematographers + Photographer",
    "Full-day shoot (up to 8 hrs)",
    "Two concurrent active projects",
    "48-hour priority delivery",
    "Unlimited revisions per project",
    "Cinema-grade grade & sound design",
];

/* ═════════════════════════════════════════════
   COMPONENT
═════════════════════════════════════════════ */
export default function Pricing() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const { scramble } = useScrambleText();

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Label scramble ──────────────────────────
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                    onEnter: () => {
                        scramble(labelRef.current, {
                            text: "✦ Pricing",
                            duration: 800,
                            revealDelay: 150,
                        });
                    },
                },
            });

            // ── "PRICING" title slide up ────────────────
            gsap.from(".pricing-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".pricing-title",
                    start: "top 85%",
                    once: true,
                },
            });

            // ── Left col text ───────────────────────────
            gsap.from(".pricing-left-text", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pricing-left-text",
                    start: "top 88%",
                    once: true,
                },
            });

            // ── Cards staggered slide-up ────────────────
            gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card, i) => {
                gsap.from(card, {
                    y: 70,
                    opacity: 0,
                    duration: 0.9,
                    delay: i * 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        once: true,
                    },
                });
            });

            // ── Custom plan block ───────────────────────
            gsap.from(".pricing-custom", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pricing-custom",
                    start: "top 92%",
                    once: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [scramble]);

    return (
        <section
            ref={sectionRef}
            /* Rounded top corners — sits below dark FAQ section */
            className="bg-[#f0eeea] rounded-t-[2.5rem] px-6 md:px-16 pt-20 pb-24 overflow-x-clip -mt-6 relative z-10"
        >
            {/* ── LABEL (hidden until scramble) ──────── */}
            <p
                ref={labelRef}
                className="text-sm text-[#555] mb-10 tracking-widest uppercase font-medium"
            />

            {/* ── MAIN GRID ────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1.15fr] gap-6 items-start">

                {/* ════ LEFT — Title + tagline + custom plan ════ */}
                <div className="flex flex-col gap-10">

                    {/* Title */}
                    <div>
                        <h2
                            className="pricing-title text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-black uppercase text-[#0f0f0f] leading-[0.9] tracking-tight"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            PRICING
                        </h2>
                        <p className="pricing-left-text text-[#555] text-base leading-relaxed mt-4 max-w-[240px]">
                            From a single shoot to an ongoing visual partnership — we have a plan for every stage.
                        </p>
                    </div>

                    {/* Custom plan block */}
                    <div className="pricing-custom">
                        <p
                            className="text-[#0f0f0f] text-xl md:text-2xl font-black uppercase mb-3 leading-tight"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            CUSTOM PLAN
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors duration-200 mb-4"
                        >
                            Contact us
                        </a>
                        <p className="text-[#777] text-sm leading-relaxed max-w-[220px]">
                            Designed for production houses & brands with custom shoot requirements.
                        </p>
                    </div>
                </div>

                {/* ════ STARTER PLAN ════ */}
                <div className="pricing-card bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm">

                    {/* Header */}
                    <div>
                        <h3
                            className="text-xl font-black uppercase text-[#0f0f0f] leading-tight mb-2"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            STARTER PLAN
                        </h3>
                        <p className="text-[#666] text-sm">
                            Ideal for creators & early-stage brands
                        </p>
                        <div className="mt-4 h-px bg-[#e8e8e4]" />
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-3">
                        {STARTER_FEATURES.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm text-[#333]">
                                <CheckIcon />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Price */}
                    <div className="mt-auto">
                        <p className="text-[#0f0f0f]">
                            <span
                                className="text-5xl font-black"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                $499
                            </span>
                            <span className="text-sm text-[#888] font-medium ml-1 uppercase tracking-wide">
                                / project
                            </span>
                        </p>
                    </div>

                    {/* CTA */}
                    <AnimatedButton text="Get started" href="/contact" />
                </div>

                {/* ════ GROWTH PLAN ════ */}
                <div className="pricing-card bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm">
                    {/* Red top accent border */}
                    <div className="h-[3px] bg-red-500 w-full" />

                    <div className="p-8 flex flex-col gap-6 flex-1">
                        {/* Header */}
                        <div>
                            <h3
                                className="text-xl font-black uppercase text-[#0f0f0f] leading-tight mb-2"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                GROWTH PLAN
                            </h3>
                            <p className="text-[#666] text-sm">
                                Best for brands scaling their visual presence
                            </p>
                            <div className="mt-4 h-px bg-[#e8e8e4]" />
                        </div>

                        {/* Features */}
                        <ul className="flex flex-col gap-3">
                            {GROWTH_FEATURES.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-[#333]">
                                    <CheckIcon />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* Price */}
                        <div className="mt-auto">
                            <p className="text-[#0f0f0f]">
                                <span
                                    className="text-5xl font-black"
                                    style={{ fontFamily: "'Anton', sans-serif" }}
                                >
                                    $999
                                </span>
                                <span className="text-sm text-[#888] font-medium ml-1 uppercase tracking-wide">
                                    / project
                                </span>
                            </p>
                        </div>

                        {/* CTA */}
                        <AnimatedButton
                            text="Get started"
                            href="/contact"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}