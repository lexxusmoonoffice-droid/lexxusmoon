"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface FloatingGalleryProps {
  images: { src: string; alt: string }[];
}

export default function FloatingGallery({ images }: FloatingGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [time, setTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Idle floating animation (desktop only)
  useEffect(() => {
    if (isMobile) return;
    let frame: number;
    const animate = () => {
      setTime((t) => t + 0.008);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const cardConfigs = [
    { moveX: 60, moveY: 40, rotate: 5, height: "h-[280px] md:h-[420px]", mt: "mt-0", phase: 0, offsetX: -40, offsetY: 0 },
    { moveX: -45, moveY: 55, rotate: -4, height: "h-[280px] md:h-[490px]", mt: "md:mt-10", phase: 1.2, offsetX: 0, offsetY: 0 },
    { moveX: 50, moveY: -35, rotate: 3.5, height: "h-[280px] md:h-[450px]", mt: "md:mt-5", phase: 2.4, offsetX: 40, offsetY: 0 },
    { moveX: -55, moveY: 45, rotate: -5, height: "h-[280px] md:h-[470px]", mt: "md:-mt-32", phase: 3.6, offsetX: -40, offsetY: -80 },
    { moveX: 40, moveY: -50, rotate: 4.5, height: "h-[280px] md:h-[430px]", mt: "md:-mt-28", phase: 4.8, offsetX: 0, offsetY: -60 },
    { moveX: -60, moveY: 35, rotate: -3.5, height: "h-[280px] md:h-[460px]", mt: "md:-mt-32", phase: 0.8, offsetX: 40, offsetY: -80 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => {
        setIsMouseInside(false);
        setMouse({ x: 0, y: 0 });
        setHoveredCard(null);
      }}
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 w-full" style={{ maxWidth: "1100px" }}>
        {images.map((img, i) => {
          const config = cardConfigs[i % 6];
          const isHovered = hoveredCard === i;
          const isBottomRow = i >= 3;

          // Idle floating motion (always active)
          const idleX = Math.sin(time + config.phase) * 15 + Math.cos(time * 0.7 + config.phase * 2) * 10;
          const idleY = Math.cos(time * 0.8 + config.phase) * 12 + Math.sin(time * 0.5 + config.phase * 1.5) * 8;
          const idleRotate = Math.sin(time * 0.6 + config.phase) * 2;

          // Mouse-driven motion - only bottom row cards follow cursor direction (desktop only)
          const mouseX = !isMobile && isMouseInside && isBottomRow ? mouse.x * 150 : 0;
          const mouseY = !isMobile && isMouseInside && isBottomRow ? mouse.y * 120 : 0;

          // Combine idle + mouse + static offset (for left/right card positioning) — desktop only
          const tx = isMobile ? 0 : (idleX + mouseX + config.offsetX);
          const ty = isMobile ? 0 : (idleY + mouseY + config.offsetY);
          const rz = isMobile ? 0 : idleRotate;

          return (
            <div
              key={i}
              className={`relative overflow-hidden ${config.height} ${config.mt}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rz}deg)`,
                transition: isMouseInside
                  ? "transform 0.3s ease-out, box-shadow 0.3s ease-out"
                  : "box-shadow 0.3s ease-out",
                boxShadow: isHovered
                  ? `0 20px 60px rgba(0,0,0,0.7), 0 0 20px rgba(224,34,34,0.15)`
                  : `0 10px 30px rgba(0,0,0,0.4)`,
                zIndex: isHovered ? 20 : (isBottomRow ? 5 : 1),
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isHovered
                    ? `linear-gradient(${120 + mouse.x * 60}deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)`
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
