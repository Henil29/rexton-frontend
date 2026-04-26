import { useCallback } from "react";

const CHARS = "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleOptions {
    text: string;
    duration?: number;       // total ms
    revealDelay?: number;    // ms before characters start locking in
    chars?: string;
    onComplete?: () => void;
}

export function useScrambleText() {
    const scramble = useCallback((
        el: HTMLElement | null,
        { text, duration = 1200, revealDelay = 400, chars = CHARS, onComplete }: ScrambleOptions
    ) => {
        if (!el) return;

        const totalFrames = Math.round(duration / 1000 * 60); // ~60fps
        const revealStart = Math.round(revealDelay / 1000 * 60);
        let frame = 0;
        let raf: number;

        const tick = () => {
            const progress = Math.max(0, frame - revealStart) / (totalFrames - revealStart);
            const revealedCount = Math.floor(progress * text.length);

            el.innerHTML = text
                .split("")
                .map((char, i) => {
                    if (char === " ") return " ";
                    if (i < revealedCount) return char;
                    const scrambledChar = chars[Math.floor(Math.random() * chars.length)];
                    return `<span style="color: #ef4444;">${scrambledChar}</span>`;
                })
                .join("");

            frame++;

            if (frame <= totalFrames) {
                raf = requestAnimationFrame(tick);
            } else {
                el.innerHTML = text; // ensure final state is clean
                onComplete?.();
            }
        };

        raf = requestAnimationFrame(tick);

        // return cleanup so GSAP context can kill it if needed
        return () => cancelAnimationFrame(raf);
    }, []);

    return { scramble };
}