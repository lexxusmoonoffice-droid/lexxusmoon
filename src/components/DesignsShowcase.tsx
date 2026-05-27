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
        Our team specializes in interior
        <br />
        rendering, delivering detailed and
        <br />
        textures, ensuring every inch aligns
        <br />
        with your concept.
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
        Modern kitchens to classic culinary
        <br />
        spaces, Lexxusmoon&apos;s 3D rendering
        <br />
        design services focus on inspiring
        <br />
        visuals.
      </>
    ),
    side: "right" as const,
  },
];

export default function DesignsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [laptopHovered, setLaptopHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
              className="text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-60px)",
                transition: `all 0.8s ease-out ${300 + i * 200}ms`,
              }}
            >
              <h3
                className="text-lg font-bold text-[#171200]"
                style={{ marginBottom: "2rem" }}
              >
                {cat.title}
              </h3>
              <p className="text-black text-sm leading-relaxed font-normal">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Center - Laptop Mockup */}
        <div
          className="flex items-center justify-center order-1 md:order-2 cursor-pointer"
          onMouseEnter={() => setLaptopHovered(true)}
          onMouseLeave={() => setLaptopHovered(false)}
          onClick={toggleVideo}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.85)",
            transition: "all 0.6s ease-out",
          }}
        >
          <div className="relative w-full max-w-lg mx-auto">
            {/* Laptop screen - black bezel on top/left/right, no bottom bezel */}
            <div
              className="relative bg-black overflow-hidden"
              style={{
                borderRadius: "20px 20px 0 0",
                padding: "16px 16px 0 16px",
                boxShadow: laptopHovered
                  ? "0 30px 60px -10px rgba(0,0,0,0.45)"
                  : "0 22px 45px -12px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.4s ease",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
                style={{ borderRadius: "4px 4px 0 0", display: "block" }}
                poster="https://static.wixstatic.com/media/5dbb31_e900147ec8f2441b82686eb1e048817af000.jpg"
              >
                <source
                  src="https://video.wixstatic.com/video/5dbb31_e900147ec8f2441b82686eb1e048817a/720p/mp4/file.mp4"
                  type="video/mp4"
                />
              </video>
              {/* Play/Pause icon overlay */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.85)",
                  opacity: !isPlaying || laptopHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#171200">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#171200">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
            {/* Wider bottom base strip - extends out, curved/circular ends */}
            <div
              className="bg-black mx-auto"
              style={{
                width: "122%",
                marginLeft: "-11%",
                height: "15px",
                borderRadius: "0 0 15px 15px",
              }}
            />
          </div>
        </div>

        {/* Right categories */}
        <div className="flex flex-col gap-8 md:gap-12 order-3 md:order-3">
          {right.map((cat, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(60px)",
                transition: `all 0.8s ease-out ${300 + i * 200}ms`,
              }}
            >
              <h3
                className="text-lg font-bold text-[#171200]"
                style={{ marginBottom: "2rem" }}
              >
                {cat.title}
              </h3>
              <p className="text-black text-sm leading-relaxed font-normal">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
