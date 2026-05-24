"use client";

import { useEffect, useRef, useState } from "react";

const serviceCategories = [
  {
    title: "Modern and Classic Bedroom",
    description: (
      <>
        Bedrooms are personal sanctuaries,
        <br />
        and our interior rendering services
        <br />
        capture the essence of
        <br />
        both modern and classic bedroom designs
      </>
    ),
    side: "left" as const,
  },
  {
    title: "Restaurants",
    description: (
      <>
        Our team specializes in interior rendering,
        <br />
        delivering detailed textures and finishes,
        <br />
        ensuring every inch aligns with
        <br />
        your concept.
      </>
    ),
    side: "left" as const,
  },
  {
    title: "Modern and Classic Living Room",
    description: (
      <>
        Living rooms are where stories are shared
        <br />
        and memories are created.
        <br />
        Visuals that showcase modern
        <br />
        sophistication or classic charm
        <br />
        with attention to detail.
      </>
    ),
    side: "right" as const,
  },
  {
    title: "Kitchen",
    description: (
      <>
        Modern kitchens to classic culinary spaces,
        <br />
        Lexxusmoon's 3D rendering design
        <br />
        services focus on inspiring
        <br />
        visuals for your next project.
      </>
    ),
    side: "right" as const,
  },
];

export default function DesignsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [laptopHovered, setLaptopHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const left = serviceCategories.filter((c) => c.side === "left");
  const right = serviceCategories.filter((c) => c.side === "right");

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black md:min-h-screen flex flex-col items-center pt-32 pb-20 md:pt-32 md:pb-20 overflow-hidden"
      style={{ paddingLeft: "48px", paddingRight: "48px" }}
    >
      {/* Heading */}
      <h2
        className="text-4xl md:text-6xl font-bold text-[#171200] text-center transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        Let&apos;s Make Your 3D Designs
        <br />
        Unforgettable
      </h2>

      {/* 3-column layout */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-12 md:gap-8 items-center flex-1 mt-12 md:mt-0">
        {/* Left categories */}
        <div className="flex flex-col gap-8 md:gap-12 order-2 md:order-1">
          {left.map((cat, i) => (
            <div
              key={i}
              className="text-center cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-60px)",
                transition: `all 0.8s ease-out ${300 + i * 200}ms`,
              }}
            >
              <h3
                className="text-lg font-bold mb-10 text-[#171200] transition-all duration-300"
                style={{
                  marginBottom: "2rem",
                  transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                  color: hoveredIndex === i ? "#D4A843" : "#171200",
                }}
              >
                {cat.title}
              </h3>
              <p
                className="text-black text-sm leading-relaxed font-normal transition-all duration-300"
                style={{ opacity: 1 }}
              >
                {cat.description}
              </p>
              <div
                className="mx-auto mt-3 h-0.5 bg-[#D4A843] transition-all duration-500"
                style={{
                  width: hoveredIndex === i ? "60%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Center - Laptop Mockup */}
        <div
          className="flex items-center justify-center cursor-pointer order-1 md:order-2"
          onMouseEnter={() => { setLaptopHovered(true); videoRef.current?.pause(); }}
          onMouseLeave={() => { setLaptopHovered(false); videoRef.current?.play(); }}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? laptopHovered
                ? "scale(1.05) translateY(-8px)"
                : "scale(1)"
              : "scale(0.8)",
            transition: "all 0.6s ease-out",
          }}
        >
          <div className="relative w-full max-w-lg mx-auto">
            {/* Laptop screen */}
            <div
              className="relative bg-black rounded-2xl overflow-hidden border-[8px] border-gray-800 transition-shadow duration-500"
              style={{
                boxShadow: laptopHovered
                  ? "0 30px 60px -10px rgba(0,0,0,0.4), 0 0 40px rgba(212,168,67,0.2)"
                  : "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
                poster="https://static.wixstatic.com/media/5dbb31_e900147ec8f2441b82686eb1e048817af000.jpg"
              >
                <source
                  src="https://video.wixstatic.com/video/5dbb31_e900147ec8f2441b82686eb1e048817a/720p/mp4/file.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            {/* Laptop base */}
            <div className="relative mx-auto">
              <div className="h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-12" />
              <div className="h-2 bg-gray-800 rounded-b-xl mx-6" />
            </div>
            {/* Glow effect */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl -z-10 transition-all duration-500"
              style={{
                background: laptopHovered
                  ? "rgba(212,168,67,0.25)"
                  : "rgba(212,168,67,0.1)",
                transform: laptopHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>
        </div>

        {/* Right categories */}
        <div className="flex flex-col gap-8 md:gap-12 order-3 md:order-3">
          {right.map((cat, i) => (
            <div
              key={i}
              className="text-center cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i + 2)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(60px)",
                transition: `all 0.8s ease-out ${300 + i * 200}ms`,
              }}
            >
              <h3
                className="text-lg font-bold mb-10 text-[#171200] transition-all duration-300"
                style={{
                  marginBottom: "2rem",
                  transform: hoveredIndex === i + 2 ? "scale(1.05)" : "scale(1)",
                  color: hoveredIndex === i + 2 ? "#D4A843" : "#171200",
                }}
              >
                {cat.title}
              </h3>
              <p
                className="text-black text-sm leading-relaxed font-normal transition-all duration-300"
                style={{ opacity: 1 }}
              >
                {cat.description}
              </p>
              <div
                className="mx-auto mt-3 h-0.5 bg-[#D4A843] transition-all duration-500"
                style={{
                  width: hoveredIndex === i + 2 ? "60%" : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
