"use client";

import React, { useEffect, useRef, useState } from "react";

const lines = [
  ["We", "Specialize", "In", "Delivering"],
  ["International", "Standard,", "High-Quality"],
  ["Renders", "For", "Architects,", "And", "Interior"],
  ["Designers."],
];

export default function WhiteSpecializeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="relative bg-white overflow-hidden">
        {/* Grid pattern - only on edges, fades out in center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)",
          }}
        />

        <div
          ref={sectionRef}
          className="relative z-10 min-h-screen flex items-center justify-center px-6"
        >
          <p className="mx-auto text-center text-[clamp(1.5rem,4.5vw,4.5rem)] font-light leading-[1.15] tracking-tight md:whitespace-nowrap">
            {lines.map((line, lineIdx) => {
              const wordOffset = lines.slice(0, lineIdx).reduce((acc, l) => acc + l.length, 0);
              return (
                <span key={lineIdx} className="block">
                  {line.map((word, i) => {
                    const globalIdx = wordOffset + i;
                    return (
                      <span key={i} className="inline-block overflow-hidden">
                        <span
                          className="inline-block text-[#171200]"
                          style={{
                            opacity: triggered ? 1 : 0,
                            transform: triggered
                              ? "translateY(0) rotate(0deg)"
                              : "translateY(100%) rotate(3deg)",
                            filter: triggered ? "blur(0px)" : "blur(4px)",
                            transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${globalIdx * 60}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${globalIdx * 60}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${globalIdx * 60}ms`,
                          }}
                        >
                          {word}
                        </span>
                      </span>
                    );
                  }).reduce<React.ReactNode[]>((acc, el, idx) => {
                    if (idx > 0) acc.push(<span key={`space-${idx}`}>&nbsp;</span>);
                    acc.push(el);
                    return acc;
                  }, [])}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </>
  );
}
