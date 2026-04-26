"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);

    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!navRef.current) return;

        const ctx = gsap.context(() => {
            // ENTRY ANIMATION
            gsap.from(".nav-item", {
                y: -30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
            });

            gsap.from(".nav-logo", {
                y: -20,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.to(navRef.current, {
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(10px)",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "+=200",
                    scrub: true,
                },
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    const navItems = [
        { label: "About", id: "about" },
        { label: "Services", id: "services" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <div
            ref={navRef}
            className="navbar-bg fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 md:px-16 z-50"
        >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent blur-sm" />
            {/* LOGO */}
            <button
                onClick={() => handleNavClick("home")}
                className="nav-logo text-red-500 text-3xl font-extrabold cursor-pointer hover:text-red-400 transition-colors"
            >
                REXTON
            </button>

            {/* MENU */}
            <div className="hidden md:flex gap-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="nav-item relative px-5 py-2 text-sm text-white/80 backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden group cursor-pointer"
                    >
                        <span className="relative z-10">{item.label}</span>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition duration-300" />

                        {/* Border Animation */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-red-500/40 transition duration-300 rounded-xl" />
                    </button>
                ))}
            </div>
        </div>
    );
}