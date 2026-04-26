"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const LEFT_FAQS = [
    {
        id: "l1",
        question: "WHAT SERVICES DO YOU OFFER?",
        answer:
            "We offer a wide range of digital services including Web Development, UI/UX Design, Branding, Digital Marketing, SEO Optimization, and Creative Content solutions to help businesses grow online.",
    },
    {
        id: "l2",
        question: "HOW MUCH DOES A WEBSITE COST?",
        answer:
            "The cost depends on the project size, features, and design complexity. We provide a custom quote after discussing your needs to ensure the solution fits your goals, budget, and business requirements.",
    },
    {
        id: "l3",
        question: "WILL MY WEBSITE BE MOBILE-FRIENDLY?",
        answer:
            "Absolutely. Every project we build is fully responsive and optimized for all screen sizes — from mobile to desktop — ensuring a seamless experience for your users across all devices.",
    },
];

const RIGHT_FAQS = [
    {
        id: "r1",
        question: "DO YOU PROVIDE SEO SERVICES?",
        answer:
            "Yes, we offer SEO services to help improve your website's visibility and ranking on search engines through keyword optimization, technical SEO, and content strategies tailored to your business goals.",
    },
    {
        id: "r2",
        question: "DO YOU BUILD E-COMMERCE WEBSITES?",
        answer:
            "Yes, we build fully custom e-commerce solutions using platforms like Shopify, WooCommerce, or fully custom-coded stores — designed to convert visitors into loyal customers.",
    },
    {
        id: "r3",
        question: "DO YOU PROVIDE HOSTING SERVICES?",
        answer:
            "We can recommend and set up reliable hosting solutions for your project. We work with trusted providers to ensure speed, security, and 99.9% uptime for your website.",
    },
];

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
interface AccordionItemProps {
    id: string;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: (id: string) => void;
}

function AccordionItem({ id, question, answer, isOpen, onToggle }: AccordionItemProps) {
    const bodyRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const body = bodyRef.current;
        const inner = innerRef.current;
        if (!body || !inner) return;

        if (isOpen) {
            // Get natural height and animate to it
            gsap.fromTo(
                body,
                { height: 0, opacity: 0 },
                {
                    height: inner.offsetHeight,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power3.out",
                    onComplete: () => {
                        // Set to "auto" so it adapts if content changes
                        gsap.set(body, { height: "auto" });
                    },
                }
            );
        } else {
            gsap.to(body, {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

    return (
        <div className="faq-item border-b border-white/10 py-5">
            {/* Question row */}
            <button
                className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                onClick={() => onToggle(id)}
                aria-expanded={isOpen}
            >
                <span
                    className="text-base md:text-lg font-black uppercase text-white leading-tight tracking-wide transition-colors duration-200"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {question}
                </span>

                {/* +/− icon */}
                <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-red-500 transition-all duration-300">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    >
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            {/* Answer body — animated */}
            <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div ref={innerRef} className="pt-4 pb-1">
                    <p className="text-[#a0a8b8] text-sm md:text-base leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ═════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════ */
export default function FAQ() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const { scramble } = useScrambleText();

    // Track which item is open — only one at a time across both columns
    const [openId, setOpenId] = useState<string | null>("l1");

    const handleToggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

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
                            text: "✦ FAQ",
                            duration: 800,
                            revealDelay: 150,
                        });
                    },
                },
            });

            // ── Headline clip-mask reveal ───────────────
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".faq-headline",
                    start: "top 85%",
                    once: true,
                },
            }).from(".faq-title-word", {
                y: "105%",
                duration: 1,
                stagger: 0.07,
                ease: "power4.out",
            });

            // ── FAQ rows staggered slide-up ─────────────
            gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item, i) => {
                gsap.from(item, {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        once: true,
                    },
                });
            });

            // ── Bottom line slide-up ────────────────────
            gsap.from(".faq-footer", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".faq-footer",
                    start: "top 95%",
                    once: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [scramble]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#0d0f1a] px-6 md:px-16 pt-24 pb-20 overflow-x-clip"
        >
            {/* ── LABEL ────────────────────────────────── */}
            <p
                ref={labelRef}
                className="text-sm text-white/60 mb-10 tracking-widest uppercase font-medium text-center"
            />

            {/* ── HEADLINE ─────────────────────────────── */}
            <div className="faq-headline mb-16 text-center">
                <h2
                    className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase leading-[1.0] tracking-tight"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                >
                    {/* Line 1 — white */}
                    <div className="flex flex-wrap justify-center gap-x-4 mb-1">
                        {["FREQUENTLY", "ASKED"].map((word) => (
                            <span key={word} className="overflow-hidden inline-block">
                                <span className="faq-title-word inline-block text-white">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Line 2 — red */}
                    <div className="flex flex-wrap justify-center">
                        <span className="overflow-hidden inline-block">
                            <span className="faq-title-word inline-block text-red-500">
                                QUESTIONS
                            </span>
                        </span>
                    </div>
                </h2>
            </div>

            {/* ── 2-COLUMN ACCORDION GRID ──────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-6xl mx-auto">

                {/* Left column */}
                <div>
                    {LEFT_FAQS.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            id={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openId === faq.id}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>

                {/* Right column */}
                <div>
                    {RIGHT_FAQS.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            id={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openId === faq.id}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            </div>

            {/* ── FOOTER LINE ──────────────────────────── */}
            <p className="faq-footer text-center mt-16 text-white text-xl">
                Didn't find your answer?{" "}
                <a
                    href="/contact"
                    className="text-red-500 hover:text-red-400 transition-colors duration-200 underline underline-offset-2"
                >
                    Contact us here
                </a>
            </p>
        </section>
    );
}