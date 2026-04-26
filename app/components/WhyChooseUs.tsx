"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
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
                            text: "✦ Why Choose Us",
                            duration: 1000,
                            revealDelay: 200,
                        });
                    },
                },
            });

            // ── HEADLINE: clip mask reveal ──
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".wcus-headline",
                    start: "top 85%",
                    once: true,
                },
            }).from(".wcus-title-word", {
                y: "105%",
                duration: 1,
                stagger: 0.08,
                ease: "power4.out",
            });

            // ── BENTO CARDS: each triggers itself ──
            gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
                gsap.from(card, {
                    y: 80,
                    opacity: 0,
                    duration: 0.9,
                    delay: i * 0.05,
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

    return (
        <section
            ref={sectionRef}
            className="bg-[#f5f4f0] px-6 md:px-16 pt-24 pb-24 overflow-x-clip"
        >
            {/* LABEL */}
            <p
                ref={labelRef}
                className="text-sm text-[#555] mb-10 tracking-wide"
            />

            {/* HEADLINE */}
            <div className="wcus-headline mb-16">
                <h2
                    className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {/* Line 1 — dark */}
                    <div className="flex flex-wrap gap-x-3">
                        {["WE'RE", "NOT", "JUST", "A", "STUDIO—"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="wcus-title-word inline-block text-[#0f0f0f]">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Line 2 — red */}
                    <div className="flex flex-wrap gap-x-3">
                        {["WE'RE", "YOUR", "VISUAL", "PARTNERS"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="wcus-title-word inline-block text-red-500">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </div>
                </h2>
            </div>

            {/* BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ── LEFT COLUMN ── */}
                <div className="flex flex-col gap-4">

                    {/* Card 1 — light: features list + 3D image */}
                    <div className="bento-card bg-[#e8e7e2] rounded-3xl p-8 overflow-hidden relative min-h-85 flex flex-col justify-between">
                        <div>
                            <h3
                                className="text-xl md:text-2xl font-black uppercase text-[#0f0f0f] mb-6 leading-tight"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                CINEMATIC QUALITY<br />FOR EVERY PROJECT
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                {[
                                    "Story-First Approach",
                                    "4K & Cinema Cameras",
                                    "Natural Light Mastery",
                                    "On-Location Shoots",
                                    "Fast Turnaround",
                                    "Colour Graded Delivery",
                                ].map((item) => (
                                    <p key={item} className="text-[#444] text-sm flex items-start gap-2">
                                        <span className="text-red-500 mt-0.5">✦</span>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                        {/* 3D decorative image — camera/lens */}
                        {/* <video
                            src="/videos/why-camera-3d.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label="Cinema camera"
                            title="Cinema camera"
                            className="w-48 self-end mt-6 opacity-80"
                        /> */}
                    </div>

                    {/* Card 2 — dark: results driven */}
                    <div className="bento-card bg-[#0f0f0f] rounded-3xl p-8 overflow-hidden relative min-h-65 flex flex-col justify-between">
                        {/* Wavy line decoration */}
                        <svg
                            className="absolute bottom-0 left-0 w-full opacity-10"
                            viewBox="0 0 400 80"
                            fill="none"
                        >
                            <path
                                d="M0 40 Q50 10 100 40 Q150 70 200 40 Q250 10 300 40 Q350 70 400 40"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                            />
                            <path
                                d="M0 55 Q50 25 100 55 Q150 85 200 55 Q250 25 300 55 Q350 85 400 55"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>

                        <h3
                            className="text-2xl md:text-3xl font-black uppercase text-white leading-tight"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            RESULTS-DRIVEN<br />STORYTELLING
                        </h3>

                        {/* Mini dashboard mockup */}
                        <div className="mt-4 bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4">
                            <div className="w-14 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                                <div className="w-6 h-6 bg-red-500 rounded" />
                            </div>
                            <div className="flex-1">
                                <div className="h-2 bg-[#333] rounded-full w-3/4 mb-2" />
                                <div className="h-2 bg-[#333] rounded-full w-1/2" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="flex flex-col gap-4">

                    {/* Card 3 — dark: rating + studio name */}
                    <div className="bento-card bg-[#0f0f0f] rounded-3xl p-8 overflow-hidden relative">
                        {/* Stars + rating */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#ef4444">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="text-right">
                                <p className="text-white font-black text-xl">4.9/5.0</p>
                                <p className="text-gray-400 text-xs">average rating</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-8">Trusted by clients worldwide</p>

                        {/* Avatar ring + studio name */}
                        <div className="relative flex items-center justify-center py-6">
                            {/* Floating avatars */}
                            {[
                                { top: "0%", left: "20%", size: "w-10 h-10" },
                                { top: "10%", left: "60%", size: "w-12 h-12" },
                                { top: "55%", left: "5%", size: "w-10 h-10" },
                                { top: "60%", left: "75%", size: "w-10 h-10" },
                            ].map((pos, i) => (
                                <div
                                    key={i}
                                    className={`absolute ${pos.size} rounded-full bg-[#2a2a2a] border-2 border-[#333] overflow-hidden`}
                                    style={{ top: pos.top, left: pos.left }}
                                >
                                    <img
                                        src={`/images/client-avatar-${i + 1}.png`}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Studio name */}
                            <h4
                                className="text-4xl md:text-5xl font-black text-white z-10 py-8"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                REXTON
                            </h4>
                        </div>
                    </div>

                    {/* Card 4 — light: clear communication */}
                    <div className="bento-card bg-[#e8e7e2] rounded-3xl p-8 overflow-hidden relative min-h-70">
                        {/* 3D chat bubbles image */}
                        {/* <img
                            src="/images/why-communication-3d.png"
                            alt="Communication"
                            className="w-40 mb-6 opacity-90"
                        /> */}
                        <h3
                            className="text-2xl md:text-3xl font-black uppercase text-[#0f0f0f] leading-tight mb-3"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            CLEAR<br />COMMUNICATION
                        </h3>
                        <p className="text-[#555] text-sm leading-relaxed max-w-xs">
                            We keep you informed at every stage — from brief to final delivery — with honest feedback and no surprises.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}