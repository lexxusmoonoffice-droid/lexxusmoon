"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ClientsSectionProps {
  logos: string[];
}

export default function ClientsSection({ logos }: ClientsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-20 pb-24 px-6 md:pt-40 md:pb-56 md:px-10 overflow-x-clip">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2
          className="text-3xl md:text-[56px]"
          style={{
            fontWeight: 700,
            color: '#171200',
            letterSpacing: '0.2em',
            marginBottom: 16,
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          OUR CLIENTS
        </h2>
        <p
          className="text-sm md:text-base mb-10 md:mb-16"
          style={{
            color: '#999',
            fontWeight: 300,
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          We believe every client is a valuable long-term partner.
        </p>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-6 md:gap-0 w-full">
          {logos.slice(0, 5).map((logo, i) => (
            <div
              key={i}
              className="grayscale hover:grayscale-0 transition-all duration-500 w-[40%] md:w-[16%] h-[120px] md:h-[200px] flex-shrink-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
                transition: `opacity 0.6s ease-out ${0.3 + i * 0.15}s, transform 0.6s ease-out ${0.3 + i * 0.15}s`,
              }}
            >
              <Image
                src={logo}
                alt={`Client ${i + 1}`}
                width={600}
                height={600}
                quality={90}
                sizes="(max-width: 768px) 75vw, 28vw"
                style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.8)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
