"use client";

import { useRef, useEffect, useState } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

interface StickyTextWithImagesProps {
  images: ImageItem[];
}

// Horizontal alignment:
// Image 1, 3 -> touch RIGHT edge (self-end)
// Image 2     -> touch LEFT edge (self-start)
// Image 4     -> left side with slight inset
// Image 5     -> right side with slight inset
const ALIGNMENTS = ["self-end", "self-start", "self-end", "self-start", "self-end"];
// Zero offset for edge-touching images (1, 2, 3). Small inset for 4, 5.
const OFFSETS_X = ["0%", "0%", "0%", "6%", "-6%"];
// Heights kept (1.3x), widths slightly reduced. Image 2 made smaller.
const SIZES = [
  "w-[230px] h-[365px] md:w-[325px] md:h-[480px]",
  "w-[190px] h-[300px] md:w-[270px] md:h-[400px]",
  "w-[215px] h-[350px] md:w-[310px] md:h-[470px]",
  "w-[210px] h-[315px] md:w-[285px] md:h-[415px]",
  "w-[215px] h-[350px] md:w-[310px] md:h-[470px]",
];

export default function StickyTextWithImages({ images }: StickyTextWithImagesProps) {
  const [isMobile, setIsMobile] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-driven 3D rotateY: image face points left when below viewport,
  // rotates to face user (rotateY 0) at viewport center,
  // continues turning slightly past as it scrolls up.
  useEffect(() => {
    const applyTransforms = () => {
      const viewportH = window.innerHeight;
      const viewportCenter = viewportH / 2;
      imageRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        // normalized distance from viewport center: +1 fully below, 0 centered, -1 fully above
        const raw = (elCenter - viewportCenter) / viewportH;
        const t = Math.max(-1.2, Math.min(1.2, raw));

        // rotateY: angled face-left when below (positive), flat when centered,
        // slightly turned the other way as it leaves upward
        const rotateY = t > 0 ? t * 38 : t * 22;
        // Subtle Z translation so it appears to come toward the user
        const translateZ = -Math.abs(t) * 80;
        // small Y drift for organic feel
        const translateY = t * 12;

        const offsetX = isMobile
          ? "0px"
          : (ref.dataset.offsetX || "0%");

        ref.style.transform = `translateX(${offsetX}) translateZ(${translateZ}px) translateY(${translateY}px) rotateY(${rotateY}deg)`;

        // Opacity: dim when far away (below or far above), full at center
        const opacity = Math.max(0.35, 1 - Math.abs(t) * 0.5);
        ref.style.opacity = String(opacity);
      });
    };

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        applyTransforms();
        rafId.current = null;
      });
    };

    applyTransforms();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  const Heading = (
    <h2
      className={`text-[#e50914] leading-[1.05] text-center ${
        isMobile ? "text-[10vw]" : "text-[8vw]"
      }`}
    >
      <span
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        className="font-extralight"
      >
        Transform your
      </span>
      <br />
      <span
        className={`font-serif-italic font-bold text-[#e50914] ${
          isMobile ? "text-[12vw]" : "text-[9.5vw]"
        }`}
      >
        Architectural
      </span>{" "}
      <span
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        className="font-extralight"
      >
        ideas
      </span>
      <br />
      <span
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        className="font-extralight"
      >
        into Stunning
      </span>
      <br />
      <span
        className={`font-serif-italic font-bold text-[#e50914] ${
          isMobile ? "text-[12vw]" : "text-[9.5vw]"
        }`}
      >
        Visuals
      </span>
    </h2>
  );

  return (
    <section
      className="relative bg-black overflow-x-clip"
      style={{
        perspective: "1500px",
        paddingTop: isMobile ? "100px" : "175px",
        paddingBottom: isMobile ? "96px" : "128px",
      }}
    >
      {/* Heading at top */}
      <div
        className="px-4 md:px-8"
        style={{ marginBottom: isMobile ? "120px" : "220px" }}
      >
        {Heading}
      </div>

      {/* Scattered 3D-tilted images below */}
      <div
        className="relative px-4 md:px-0 flex flex-col gap-32 md:gap-52"
        style={{ transformStyle: "preserve-3d" }}
      >
        {images.map((img, i) => {
          const align = ALIGNMENTS[i % ALIGNMENTS.length];
          const offsetX = OFFSETS_X[i % OFFSETS_X.length];
          const size = SIZES[i % SIZES.length];

          // Anchor rotateY pivot to whichever edge the image should touch,
          // so 3D foreshortening doesn't pull the visible image off the edge.
          const pivot = align === "self-end"
            ? "right center"
            : align === "self-start"
            ? "left center"
            : "center center";

          return (
            // Outer wrapper handles flex alignment + load-time zoom-in.
            // Inner div is what the scroll handler transforms in 3D.
            <div
              key={i}
              className={align}
              style={{
                opacity: 0,
                animation: "imageZoomIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                animationDelay: `${0.15 + i * 0.12}s`,
              }}
            >
              <div
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                data-offset-x={offsetX}
                className={`${size} relative overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]`}
                style={{
                  transformOrigin: pivot,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                  transform: "rotateY(38deg)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
