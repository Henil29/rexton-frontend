"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

const steps = [
    {
        number: "01",
        title: "BRIEF & DISCOVERY",
        description:
            "We start by understanding your vision, goals, and audience — so every frame we shoot has purpose and direction.",
    },
    {
        number: "02",
        title: "PRE-PRODUCTION",
        description:
            "From mood boards and shot lists to location scouting and casting — we plan every detail before a single camera rolls.",
    },
    {
        number: "03",
        title: "SHOOT & CAPTURE",
        description:
            "Our crew brings your story to life on set — with cinematic precision, natural light mastery, and an eye for the unexpected.",
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scramble } = useScrambleText();

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── LABEL: scramble once ──
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                    onEnter: () => {
                        scramble(labelRef.current, {
                            text: "✦ Our work process",
                            duration: 1000,
                            revealDelay: 200,
                        });
                    },
                },
            });

            // ── HEADLINE: clip mask word reveal ──
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".process-headline",
                    start: "top 85%",
                    once: true,
                },
            }).from(".process-title-word", {
                y: "105%",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            });

            // ── STEP NUMBERS: fade in staggered, scrub ──
            gsap.from(".step-number", {
                opacity: 0,
                y: 40,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-steps",
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

            // ── STEP TITLES + TEXT: fade in after numbers ──
            gsap.from(".step-content", {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-steps",
                    start: "top 75%",
                    end: "top 35%",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

            // ── FULL WIDTH IMAGE: slides up from below, scrub ──
            gsap.from(imageRef.current, {
                y: 120,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 95%",
                    end: "top 30%",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [scramble]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 } // plays when 30% of video is visible
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);
    return (
        <section
            ref={sectionRef}
            className="bg-[#f5f4f0] rounded-t-[2.5rem] px-6 md:px-16 pt-20 pb-0 overflow-x-clip overflow-y-clip"
        >
            {/* LABEL */}
            <p
                ref={labelRef}
                className="text-sm text-[#555] mb-10 tracking-wide"
            />

            {/* HEADLINE */}
            <div className="process-headline mb-20">
                <h2
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.05] tracking-tight"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {/* Line 1 — dark */}
                    <div className="flex flex-wrap gap-x-4">
                        {["A", "SIMPLE", "PROCESS", "FOR"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="process-title-word inline-block text-[#0f0f0f]">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Line 2 — red */}
                    <div className="flex flex-wrap gap-x-4">
                        {["VISUAL", "STORIES"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="process-title-word inline-block text-red-500">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </div>
                </h2>
            </div>

            {/* 3-COLUMN STEPS */}
            <div className="process-steps grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                {steps.map((step) => (
                    <div key={step.number}>
                        {/* NUMBER */}
                        <p
                            className="step-number text-7xl md:text-8xl font-black text-[#0f0f0f] opacity-10 leading-none mb-4 select-none"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            {step.number}
                        </p>

                        {/* TITLE + DESCRIPTION */}
                        <div className="step-content">
                            <h3
                                className="text-lg md:text-xl font-black uppercase tracking-tight text-[#0f0f0f] mb-3"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-[#555] text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* FULL WIDTH IMAGE — slides up from below */}
            <div className="w-full overflow-clip">
                <div
                    ref={imageRef}
                    className="w-full overflow-hidden rounded-t-2xl"
                >
                    <video
                        ref={videoRef}
                        src="/videos/process-behind-scenes.mp4"
                        loop
                        muted
                        playsInline        // required on iOS, prevents fullscreen takeover
                        preload="metadata" // loads enough to show first frame, saves bandwidth
                        className="w-full max-h-[560px] object-cover"
                    />
                </div>
            </div>

        </section>
    );
}