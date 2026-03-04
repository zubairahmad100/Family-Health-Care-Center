"use client";

import { useEffect, useRef } from "react";

/**
 * CursorEffect
 * Renders two layered circles that follow the mouse:
 *   - A small sharp dot (snaps instantly to cursor)
 *   - A larger aura ring (lags behind with spring-like easing)
 */
export default function CursorEffect() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on non-touch devices
        if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

        let rafId: number;
        let ringX = -100;
        let ringY = -100;
        let mouseX = -100;
        let mouseY = -100;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        };

        const animate = () => {
            // Spring-follow for ring
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            {/* Trailing aura ring */}
            <div
                ref={ringRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 36,
                    height: 36,
                    marginLeft: -18,
                    marginTop: -18,
                    borderRadius: "50%",
                    border: "2px solid var(--color-special-smiles-primary)",
                    opacity: 0.45,
                    pointerEvents: "none",
                    zIndex: 99999,
                    willChange: "transform",
                    transition: "opacity 0.2s",
                }}
            />
            {/* Sharp centre dot */}
            <div
                ref={dotRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    borderRadius: "50%",
                    background: "var(--color-special-smiles-primary)",
                    pointerEvents: "none",
                    zIndex: 100000,
                    willChange: "transform",
                }}
            />
        </>
    );
}
