"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const { scramble } = useScrambleText();

    useEffect(() => {
        let cleanupScramble: (() => void) | undefined;

        const ctx = gsap.context(() => {

            // ── LABEL + TITLE: one-shot on enter (no scrub) ──
            const entryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                    onEnter: () => {
                        cleanupScramble = scramble(labelRef.current, {
                            text: "✦ About Us",
                            duration: 1000,
                            revealDelay: 200,
                        });
                    },
                }
            });

            entryTl.from(".title-word", {
                y: "100%",          // slides up from below the clip boundary
                duration: 1,
                stagger: 0.15,      // each word staggers after the previous
                ease: "power4.out",
            });

            // ── TEXT PARAGRAPHS: scrub-driven fade+slide ──
            gsap.from(".about-text", {
                opacity: 0,
                y: 50,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-text-group",
                    start: "top 75%",
                    end: "bottom 60%",
                    scrub: 1.2,
                }
            });

            // ── LEFT IMAGE: scrub slide up from below ──
            gsap.from(".img-left", {
                y: 120,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-images-row",
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 1,
                }
            });

            // ── RIGHT IMAGE: scrub slide up from below (same speed as left) ──
            gsap.from(".img-right", {
                y: 120,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-images-row",
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 1,
                }
            });

            // ── CENTER IMAGE: scrub slide up, slightly delayed (starts later) ──
            gsap.from(".img-center", {
                y: 160,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-images-row",
                    start: "top 75%",   // starts later than left/right
                    end: "top 20%",
                    scrub: 1.4,
                }
            });

        }, sectionRef);

        return () => {
            cleanupScramble?.();
            ctx.revert();
        };
    }, [scramble]);

    return (
        <section
            ref={sectionRef}
            className="py-40 px-6 md:px-16 bg-[#0b0b0b]"
        >
            {/* LABEL */}
            <p
                ref={labelRef}
                className="about-label text-center text-gray-400 mb-6"
            />

            {/* TITLE */}
            <h2 className="about-title text-center text-5xl md:text-7xl font-bold tracking-tight flex justify-center gap-4">
                <span className="title-clip">
                    <span className="title-word text-white">IDEAS</span>
                </span>
                <span className="title-clip">
                    <span className="title-word text-red-500">INTO</span>
                </span>
                <span className="title-clip">
                    <span className="title-word text-white">IMPACT</span>
                </span>
            </h2>

            {/* IMAGES ROW — trigger anchor for image scrub */}
            <div className="about-images-row mt-20 grid grid-cols-1 md:grid-cols-3 items-start gap-10">

                {/* LEFT IMAGE */}
                <div className="img-left flex justify-center md:justify-start">
                    <img
                        src="/images/about1.png"
                        className="w-65 md:w-75 rounded-xl object-cover grayscale"
                    />
                </div>

                {/* CENTER COLUMN: text + center image */}
                <div className="about-text-group flex flex-col items-center text-center space-y-5">
                    <p className="about-text text-gray-400">
                        No more guesswork. No more generic campaigns.
                    </p>
                    <p className="about-text text-gray-400">
                        Every brand is different, so we build marketing strategies around your goals.
                    </p>
                    <p className="about-text text-gray-400">
                        Your data shows us where to focus, and our team turns insight into action.
                    </p>

                    <img
                        src="/images/about3.png"
                        className="img-center mt-6 w-55 md:w-65 rounded-xl object-cover grayscale opacity-90"
                    />
                </div>

                {/* RIGHT IMAGE */}
                <div className="img-right flex justify-center md:justify-end">
                    <img
                        src="/images/about2.png"
                        className="w-65 md:w-75 rounded-xl object-cover grayscale"
                    />
                </div>

            </div>
        </section>
    );
}