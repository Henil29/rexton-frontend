"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useScrambleText } from "../hook/useScrambleText";

const services = [
  {
    id: "film-production",
    title: "FILM PRODUCTION",
    description:
      "From concept to final cut, we craft cinematic films that move people. Whether it's a brand film, documentary, or narrative short — every frame is intentional, every story is yours.",
    tags: ["Brand Films", "Documentary", "Short Films", "Corporate Videos"],
    image: "/images/service-film.png",
  },
  {
    id: "commercial-photography",
    title: "COMMERCIAL PHOTOGRAPHY",
    description:
      "We capture images that stop the scroll and sell the story. Our commercial photography blends artistic direction with strategic intent — built for campaigns, products, and brands that demand attention.",
    tags: ["Product Photography", "Campaign Shoots", "Editorial", "E-commerce"],
    image: "/images/service-photography.png",
  },
  {
    id: "portrait-photography",
    title: "PORTRAIT & PEOPLE",
    description:
      "People are at the heart of every great visual. We photograph individuals, teams, and talent with authenticity — creating portraits that feel real, powerful, and memorable.",
    tags: ["Personal Branding", "Executive Portraits", "Team Photography", "Actor Headshots"],
    image: "/images/service-portrait.jpg",
  },
  {
    id: "event-coverage",
    title: "EVENT COVERAGE",
    description:
      "Live moments deserve to be preserved with intention. We cover events — from intimate gatherings to large productions — with both photo and film, so nothing worth remembering gets lost.",
    tags: ["Corporate Events", "Launches & Activations", "Conferences", "Behind the Scenes"],
    image: "/images/service-event.png",
  },
  {
    id: "social-content",
    title: "SOCIAL CONTENT",
    description:
      "Built for feeds, stories, and reels — our social content is designed to perform. Fast turnaround, platform-native formats, and a visual language your audience will recognize instantly.",
    tags: ["Reels & Short-Form Video", "Content Packages", "Story Templates", "Monthly Retainers"],
    image: "/images/service-social.png",
  },
  {
    id: "post-production",
    title: "POST PRODUCTION",
    description:
      "Great footage becomes great content in post. We handle color grading, editing, sound design, and motion graphics — delivering a polished final product that's ready to publish or broadcast.",
    tags: ["Color Grading", "Video Editing", "Sound Design", "Motion Graphics"],
    image: "/images/service-post.png",
  },
];

interface AccordionItemProps {
  service: (typeof services)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ service, isOpen, onToggle, index }: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const body = bodyRef.current;
    const image = imageRef.current;
    const icon = iconRef.current;
    if (!body || !image || !icon) return;

    // Skip animation on first render for the default open item
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isOpen) {
        gsap.set(body, { height: "auto", opacity: 1 });
        gsap.set(image, { x: 0, opacity: 1 });
        gsap.set(icon, { rotation: 45 }); // + rotated 45 = ×, visually —
      } else {
        gsap.set(body, { height: 0, opacity: 0 });
        gsap.set(image, { x: 80, opacity: 0 });
      }
      return;
    }

    if (isOpen) {
      // Expand
      gsap.set(body, { height: "auto", opacity: 1 });
      const fullHeight = body.offsetHeight;
      gsap.fromTo(body,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.55, ease: "power3.inOut" }
      );
      // Image slides in from right
      gsap.fromTo(image,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
      // Icon rotates to −
      gsap.to(icon, { rotation: 45, duration: 0.3, ease: "power2.out" });
    } else {
      // Collapse
      gsap.to(body, { height: 0, opacity: 0, duration: 0.45, ease: "power3.inOut" });
      gsap.to(image, { x: 80, opacity: 0, duration: 0.3, ease: "power2.in" });
      // Icon rotates back to +
      gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="service-item border-t border-[#d0cfc9]">
      {/* HEADER ROW */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3
          className="text-2xl md:text-4xl font-black tracking-tight text-[#0f0f0f] uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {service.title}
        </h3>
        <span
          ref={iconRef}
          className="text-red-500 text-3xl font-light leading-none select-none shrink-0 ml-4"
          style={{ display: "inline-block" }}
        >
          +
        </span>
      </button>

      {/* BODY — GSAP controls height */}
      <div
        ref={bodyRef}
        style={{ overflow: "hidden", height: 0, opacity: 0 }}
      >
        <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: description + tags */}
          <div>
            <p className="text-[#444] text-base leading-relaxed mb-6 max-w-md">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm border border-[#bbb] text-[#333] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="flex justify-end">
            <img
              ref={imageRef}
              src={service.image}
              alt={service.title}
              className="w-full max-w-70 md:max-w-85 rounded-2xl object-cover"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const { scramble } = useScrambleText();
  const [openIndex, setOpenIndex] = useState<number>(0); // first item open by default

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── LABEL: scramble on enter, once ──
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            scramble(labelRef.current, {
              text: "✦ What We Do",
              duration: 1000,
              revealDelay: 200,
            });
          },
        }
      });

      // ── HEADLINE: clip mask reveal, once ──
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-headline",
          start: "top 85%",
          once: true,
        }
      });

      headlineTl.from(".services-title-word", {
        y: "105%",
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      // ── ACCORDION ITEMS: stagger fade up on enter, once ──
      gsap.from(".service-item", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-accordion",
          start: "top 80%",
          once: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [scramble]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f4f0] rounded-t-[2.5rem] px-6 md:px-16 pt-20 pb-32"
    >
      {/* LABEL */}
      <p
        ref={labelRef}
        className="text-sm text-[#555] mb-8 tracking-wide"
      />

      {/* HEADLINE */}
      <div className="services-headline mb-16 overflow-hidden">
        <h2
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight text-[#0f0f0f]"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {/* Line 1 */}
          <div className="flex flex-wrap gap-x-4 overflow-hidden">
            {["YOUR", "STORY,"].map((word) => (
              <span key={word} className="overflow-hidden inline-block">
                <span className="services-title-word inline-block">{word}</span>
              </span>
            ))}
          </div>
          {/* Line 2 */}
          <div className="flex flex-wrap gap-x-4 overflow-hidden">
            {["TOLD"].map((word) => (
              <span key={word} className="overflow-hidden inline-block">
                <span className="services-title-word inline-block">{word}</span>
              </span>
            ))}
            <span className="overflow-hidden inline-block">
              <span className="services-title-word inline-block text-red-500">
                VISUALLY.
              </span>
            </span>
          </div>
        </h2>
      </div>

      {/* ACCORDION */}
      <div className="services-accordion">
        {services.map((service, index) => (
          <AccordionItem
            key={service.id}
            service={service}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
        {/* bottom border */}
        <div className="border-t border-[#d0cfc9]" />
      </div>
    </section>
  );
}