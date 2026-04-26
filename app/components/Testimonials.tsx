"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
const Stars = () => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.77l-3.09 1.685.59-3.41L2 4.635l3.455-.545L7 1z"
                    fill="#ef4444"
                    stroke="#ef4444"
                    strokeWidth="0.5"
                />
            </svg>
        ))}
    </div>
);

/* ─────────────────────────────────────────────
   QUOTE MARK DECORATION
───────────────────────────────────────────── */
const QuoteMark = ({ dark = false }: { dark?: boolean }) => (
    <span
        className="absolute bottom-5 right-7 text-[8rem] leading-none font-black select-none pointer-events-none"
        style={{
            fontFamily: "'Anton', sans-serif",
            color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            lineHeight: 1,
        }}
    >
        "
    </span>
);

/* ─────────────────────────────────────────────
   TESTIMONIAL DATA
───────────────────────────────────────────── */
const TESTIMONIALS = [
    {
        dark: true,
        title: "Transformed our brand identity overnight",
        body: "Working with this team was a game-changer. The cinematography elevated our product launches to a level we never thought possible for a startup our size.",
        name: "Sophia Reeves",
        role: "CEO, Lumine Brand Co.",
        initials: "SR",
    },
    {
        dark: false,
        title: "Worth every single penny",
        body: "I was sceptical about the investment at first, but the final deliverables blew us away. The colour grading alone made our social content perform 3× better.",
        name: "Marcus T. Lloyd",
        role: "Head of Content, Apex Media",
        initials: "ML",
    },
    {
        dark: true,
        title: "Storytelling at its absolute finest",
        body: "They don't just film — they craft narratives. Every frame felt intentional. Our campaign film has won two industry awards since launch and it's only been three months.",
        name: "Anika Sharma",
        role: "Creative Director, Solara Studio",
        initials: "AS",
    },
    {
        dark: false,
        title: "Reliable, fast and outrageously talented",
        body: "The 48-hour turnaround felt impossible until they delivered. The whole crew was professional from the first call to the final export. We've signed on for six more projects.",
        name: "James O'Brien",
        role: "Founder, Crestline Films",
        initials: "JO",
    },
];

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function TestimonialCard({
    dark,
    title,
    body,
    name,
    role,
    initials,
}: (typeof TESTIMONIALS)[0]) {
    return (
        <div
            className={`testimonial-card relative rounded-2xl p-8 flex flex-col gap-5 overflow-hidden ${
                dark ? "bg-[#0f0f0f] text-white" : "bg-white text-[#0f0f0f]"
            }`}
            style={{ boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.07)" }}
        >
            <Stars />

            <div className="flex flex-col gap-3 flex-1">
                <h4
                    className={`text-xl font-black uppercase leading-tight ${
                        dark ? "text-white" : "text-[#0f0f0f]"
                    }`}
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {title}
                </h4>
                <p
                    className={`text-sm leading-relaxed ${
                        dark ? "text-white/60" : "text-[#555]"
                    }`}
                >
                    {body}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-2">
                <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        dark ? "bg-white/10 text-white" : "bg-[#0f0f0f] text-white"
                    }`}
                >
                    {initials}
                </div>
                <div>
                    <p
                        className={`text-sm font-bold leading-tight ${
                            dark ? "text-white" : "text-[#0f0f0f]"
                        }`}
                    >
                        {name}
                    </p>
                    <p className={`text-xs ${dark ? "text-white/50" : "text-[#888]"}`}>
                        {role}
                    </p>
                </div>
            </div>

            <QuoteMark dark={dark} />
        </div>
    );
}

/* ═════════════════════════════════════════════
   COMPONENT
═════════════════════════════════════════════ */
export default function Testimonials() {
    const sectionRef    = useRef<HTMLDivElement>(null);
    const labelRef      = useRef<HTMLParagraphElement>(null);
    const headlineRef   = useRef<HTMLDivElement>(null);
    const { scramble }  = useScrambleText();

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
                            text: "✦ Testimonials",
                            duration: 800,
                            revealDelay: 150,
                        });
                    },
                },
            });

            // ── Pin headline ────────────────────────────
            // KEY FIX: pinSpacing: false only removes the EXTRA padding
            // GSAP inserts — the label is a sibling OUTSIDE the pinned
            // element, so it never moves. The headline is pinned inside
            // its flex container column, which is already sized by the
            // label column, so there is no layout jump.
            ScrollTrigger.create({
                trigger: headlineRef.current,
                start: "top 15%",
                endTrigger: ".testimonials-grid",
                end: "bottom 50%",
                pin: true,
                pinSpacing: false,
            });

            // ── Headline fades as cards scroll over it ──
            gsap.to(headlineRef.current, {
                opacity: 0,
                scale: 0.94,
                ease: "none",
                scrollTrigger: {
                    trigger: ".testimonials-grid",
                    start: "top 60%",
                    end: "top 5%",
                    scrub: true,
                },
            });

            // ── Cards staggered slide-up ────────────────
            gsap.utils
                .toArray<HTMLElement>(".testimonial-card")
                .forEach((card, i) => {
                    gsap.from(card, {
                        y: 80,
                        opacity: 0,
                        duration: 1,
                        delay: (i % 2) * 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            once: true,
                        },
                    });
                });

        }, sectionRef);

        return () => ctx.revert();
    }, [scramble]);

    const leftCards  = TESTIMONIALS.filter((_, i) => i % 2 === 0);
    const rightCards = TESTIMONIALS.filter((_, i) => i % 2 === 1);

    return (
        <section
            ref={sectionRef}
            className="bg-[#f5f4f0] px-6 md:px-16 pt-20 pb-32 overflow-x-clip relative"
        >
            {/*
             * ── HEADER ROW ──────────────────────────────────────────
             * Matches your screenshots exactly:
             *
             *   ✦ TESTIMONIALS    WHAT CLIENTS
             *   (small label)     SAY / ABOUT US
             *
             * The label is a plain in-flow element — it NEVER moves.
             * The headline column is what gets pinned by GSAP.
             * Because the label is a flex sibling (not a child of the
             * pinned element), pinSpacing:false causes zero layout shift
             * on the label side.
             * ────────────────────────────────────────────────────────
             */}
            <div className="flex items-start gap-10 md:gap-16">

                {/* Label — stays in normal document flow, never pinned */}
                <p
                    ref={labelRef}
                    className="text-sm text-[#555] tracking-widest uppercase font-medium shrink-0 mt-5 md:mt-6 lg:mt-8 min-w-[120px]"
                />

                {/* Headline — this block gets pinned */}
                <div ref={headlineRef} className="pointer-events-none">
                    <h2
                        className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-black uppercase text-[#0f0f0f] leading-[0.88] tracking-tight"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                        WHAT CLIENTS
                        <br />
                        <span className="text-red-500">SAY /</span> ABOUT US
                    </h2>
                </div>
            </div>

            {/* ── 2-COLUMN MASONRY GRID ──────────────────────────── */}
            {/* z-20 so cards visually scroll over the pinned headline */}
            <div className="testimonials-grid relative z-20 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-24">

                {/* Left col — dark cards */}
                <div className="flex flex-col gap-5">
                    {leftCards.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </div>

                {/* Right col — light cards, offset for staggered masonry */}
                <div className="flex flex-col gap-5 md:mt-16">
                    {rightCards.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </div>

            </div>
        </section>
    );
}
