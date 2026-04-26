"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

const projects = [
    // LEFT COLUMN
    {
        id: "brand-film-reel",
        title: "BRAND FILM REEL",
        category: "Film Production",
        image: "/images/project-brand-film.png",
        href: "/projects/brand-film-reel",
        column: "left",
    },
    {
        id: "product-campaign-shoot",
        title: "PRODUCT CAMPAIGN SHOOT",
        category: "Commercial Photography",
        image: "/images/project-campaign.png",
        href: "/projects/product-campaign-shoot",
        column: "left",
    },
    {
        id: "corporate-event-coverage",
        title: "CORPORATE EVENT COVERAGE",
        category: "Event Coverage",
        image: "/images/project-event.png",
        href: "/projects/corporate-event-coverage",
        column: "left",
    },

    // RIGHT COLUMN
    {
        id: "executive-portrait-series",
        title: "EXECUTIVE PORTRAIT SERIES",
        category: "Portrait & People",
        image: "/images/project-portrait.png",
        href: "/projects/executive-portrait-series",
        column: "right",
    },
    {
        id: "social-content-package",
        title: "SOCIAL CONTENT PACKAGE",
        category: "Social Content",
        image: "/images/project-social.png",
        href: "/projects/social-content-package",
        column: "right",
    },
    {
        id: "documentary-short",
        title: "DOCUMENTARY SHORT FILM",
        category: "Film Production",
        image: "/images/project-documentary.png",
        href: "/projects/documentary-short",
        column: "right",
    },
];

const leftProjects = projects.filter((p) => p.column === "left");
const rightProjects = projects.filter((p) => p.column === "right");

interface ProjectCardProps {
    project: (typeof projects)[0];
    className?: string;
}

function ProjectCard({ project, className = "" }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    // ADD alongside existing refs:
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(btnRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
        });
        gsap.to(imgRef.current, {
            scale: 1.05,
            opacity: 0.4,        // dims the image
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 1,          // dark overlay fades in
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
        });
        gsap.to(imgRef.current, {
            scale: 1,
            opacity: 1,          // restore image
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 0,          // dark overlay fades out
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={cardRef}
            className={`project-card ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href={project.href} className="block group">
                {/* IMAGE WRAPPER */}
                <div className="relative overflow-hidden rounded-2xl">
                    <img
                        ref={imgRef}
                        src={project.image}
                        alt={project.title}
                        className="w-full object-cover aspect-[16/9]"
                        style={{ transformOrigin: "center center" }}
                    />

                    {/* DARK OVERLAY */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            opacity: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)",
                        }}
                    />

                    {/* RED ARROW BUTTON */}
                    <div
                        ref={btnRef}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ opacity: 0, scale: "0.8" }}
                    >
                        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* TEXT BELOW IMAGE */}
                <div className="mt-4">
                    <h3
                        className="text-white text-xl md:text-2xl font-black uppercase tracking-tight"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                </div>
            </a>
        </div>
    );
}

export default function Projects() {
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
                            text: "✦ Selected Projects",
                            duration: 1100,
                            revealDelay: 250,
                        });
                    },
                },
            });

            // ── HEADLINE: clip mask word reveal ──
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".projects-headline",
                    start: "top 85%",
                    once: true,
                },
            }).from(".projects-title-word", {
                y: "105%",
                duration: 1.1,
                stagger: 0.1,
                ease: "power4.out",
            });


            // LEFT COLUMN — each card triggers itself
            gsap.utils.toArray<HTMLElement>(".project-card-left").forEach((card) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,          // each card is its own trigger
                        start: "top 90%",
                        end: "top 40%",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    },
                });
            });

            // RIGHT COLUMN — each card triggers itself, starts lower
            gsap.utils.toArray<HTMLElement>(".project-card-right").forEach((card) => {
                gsap.from(card, {
                    y: 130,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,          // each card is its own trigger
                        start: "top 95%",       // slightly later than left
                        end: "top 45%",
                        scrub: 1.8,
                        invalidateOnRefresh: true,
                    },
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [scramble]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#0b0b0b] py-32 px-6 md:px-16 overflow-x-clip"
        >
            {/* LABEL */}
            <p
                ref={labelRef}
                className="text-sm text-gray-400 mb-8 tracking-wide text-center"
            />

            {/* HEADLINE */}
            <div className="projects-headline mb-20 overflow-hidden text-center">
                <h2
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.05] tracking-tight"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {/* Line 1 */}
                    <div className="flex flex-wrap justify-center gap-x-5 overflow-hidden">
                        {["WHERE", "VISION"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="projects-title-word inline-block text-white">
                                    {word}
                                </span>
                            </span>
                        ))}
                        <span className="overflow-hidden inline-block">
                            <span className="projects-title-word inline-block text-red-500">
                                MEET
                            </span>
                        </span>
                    </div>
                    {/* Line 2 */}
                    <div className="flex flex-wrap justify-center gap-x-5 overflow-hidden">
                        <span className="overflow-hidden inline-block">
                            <span className="projects-title-word inline-block text-red-500">
                                STORY
                            </span>
                        </span>
                        <span className="overflow-hidden inline-block">
                            <span className="projects-title-word inline-block text-white">
                                TELLING
                            </span>
                        </span>
                    </div>
                </h2>
            </div>

            {/* 2-COLUMN STAGGERED GRID */}
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-16 items-start overflow-hidden">

                {/* LEFT COLUMN — starts at top */}
                <div className="flex flex-col gap-28">
                    {leftProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            className="project-card-left"
                        />
                    ))}
                </div>

                {/* RIGHT COLUMN — offset down to create stagger feel */}
                <div className="flex flex-col gap-28 md:mt-28 overflow-hidden">
                    {rightProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            className="project-card-right"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}