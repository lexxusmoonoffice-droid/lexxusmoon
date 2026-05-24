"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface WhyChooseUsItem {
  num: string;
  title: string;
  desc: string;
  img: string;
  bg: string;
}

interface StickyWhyChooseUsProps {
  items: WhyChooseUsItem[];
}

function AnimatedCard({ item, isLast, index, scrollProgress }: { item: WhyChooseUsItem; isLast: boolean; index: number; scrollProgress: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const descTranslateY = isLast ? 0 : -scrollProgress * 250;


  return (
    <section ref={ref} className="flex flex-col md:flex-row border-t-2 border-white min-h-[calc(100vh-88px)] md:h-[calc(100vh-88px)]">
      {/* Image */}
      <div
        className={`relative w-full md:w-[48%] ${item.bg} flex flex-col h-[40vh] md:h-auto`}
        style={{ padding: "80px 20px 0 0" }}
      >
        <div className="relative overflow-hidden flex-1 rounded-sm">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Vertical line separator */}
      <div className={`hidden md:block w-[1px] shrink-0 ${index === 1 ? 'bg-[#E02222]' : 'bg-white'}`} />
      {/* Content — colored right panel */}
      <div
        className={`${item.bg} text-white flex flex-col justify-between relative md:flex-1 overflow-hidden`}
        style={{ padding: '40px 64px 40px 48px' }}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
              }}
            >
              {item.title}
            </h3>
            <span
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
              }}
            >
              {item.num}
            </span>
          </div>

          <p
            className="text-white font-extralight leading-relaxed text-base md:text-lg max-w-md"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? `translateY(${descTranslateY}px)` : "translateY(30px)",
              transition: visible ? "none" : "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 500ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function StickyWhyChooseUs({ items }: StickyWhyChooseUsProps) {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progresses, setProgresses] = useState<number[]>(() => items.map(() => 0));

  const handleScroll = useCallback(() => {
    const newProgresses = items.map((_, i) => {
      if (i >= items.length - 1) return 0;
      const nextEl = wrapperRefs.current[i + 1];
      if (!nextEl) return 0;
      const nextRect = nextEl.getBoundingClientRect();
      const cardHeight = window.innerHeight - 88;
      // Start animating when next card is within one card-height of the sticky position
      if (nextRect.top < 88 + cardHeight) {
        return Math.min(1, Math.max(0, (88 + cardHeight - nextRect.top) / (cardHeight * 0.4)));
      }
      return 0;
    });
    setProgresses(newProgresses);
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative bg-white pt-10">
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => { wrapperRefs.current[i] = el; }}
          className={i === items.length - 1 ? "relative" : "sticky top-[88px]"}
          style={{
            zIndex: i + 1,
            paddingBottom: i === items.length - 1 ? undefined : "40vh",
          }}
        >
          <AnimatedCard
            item={item}
            isLast={i === items.length - 1}
            index={i}
            scrollProgress={progresses[i]}
          />
        </div>
      ))}
    </div>
  );
}
