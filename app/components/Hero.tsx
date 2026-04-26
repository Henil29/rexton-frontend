"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Image from "next/image";
import AnimatedButton from "../hook/AnimatedButton";
import heroModel from "@/public/images/hero-model.png";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // TEXT (line by line only — remove hero-left animation)
            gsap.from(".line", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15,
            });

            // IMAGE ENTRY
            gsap.from(".hero-image", {
                x: 100,
                opacity: 0,
                duration: 1.4,
                ease: "power3.out",
                delay: 0.3,
            });

            // GLOW BREATHING
            gsap.to(".glow", {
                scale: 1.2,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // FLOATING IMAGE (adds life)
            gsap.to(".hero-image", {
                y: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            gsap.to(".bg-text", {
                y: -100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.from(".bg-text", {
                opacity: 0,
                y: 50,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.5,
            });
            // PARAGRAPH (comes after heading)
            gsap.from(".hero-sub", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.6,
            });

            // BUTTON (last — CTA emphasis)
            gsap.from(".hero-btn", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.9,
            });
        }, heroRef);

        // CURSOR PARALLAX
        const quickX = gsap.quickTo(".hero-image", "x", {
            duration: 0.6,
            ease: "power3.out",
        });

        const quickY = gsap.quickTo(".hero-image", "y", {
            duration: 0.6,
            ease: "power3.out",
        });

        return () => {
            ctx.revert();
        };

    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden bg-[#0b0b0b]"
        >
            {/* 🔴 Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black to-red-900/40" />

            {/* 🔴 Glow Circle */}
            <div className="glow absolute -right-50 top-1/2 -translate-y-1/2 w-150 h-150 bg-red-600/40 rounded-full blur-[120px]" />

            <div className="absolute right-[10%] bottom-[-10%] w-125 h-125 border border-[#ef0621] rounded-full z-0" />
            <div className="glow absolute right-[5%] top-1/2 -translate-y-1/2 w-150 h-150 bg-red-500/40 rounded-full blur-[140px] z-0" />
            {/* 🧩 Content */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-16">

                {/* LEFT SIDE */}
                <div className="hero-left relative max-w-xl -translate-y-16">
                    <h1 className="hero-text text-3xl md:text-4xl leading-tight">
                        <span className="line">We design and</span>
                        <span className="line">build high-</span>
                        <span className="line">performance digital</span>
                        <span className="line">experiences</span>
                    </h1>

                    <p className="hero-sub my-6 text-gray-400">
                        That help brands grow, connect, and stand out online.
                    </p>

                    {/* <button className="hero-btn cta group flex items-center gap-3 bg-red-600 px-6 py-3 rounded-lg text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.05]">
                        <span className="relative z-10">→ Start a project</span>
                        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition duration-300" />
                    </button> */}
                    <AnimatedButton text="Start a project" href="/contact" className="hero-btn max-w-[350px]" />
                </div>

                {/* RIGHT SIDE */}
                <div className="absolute right-0 bottom-0 hero-image">
                    <Image
                        src={heroModel}
                        alt="model"
                        className="w-150 h-auto object-contain"
                    />
                </div>
            </div>

            {/* 🧠 BIG BACKGROUND TEXT */}
            <h1 className="bg-text absolute -bottom-10 w-full left-0 text-[11vw] font-bold text-white text-center whitespace-nowrap z-10">
                REXTON STUDIO
                <span className="text-[0.25em] relative top-[-2.25em] ml-1">®</span>
            </h1>
        </section>
    );
}