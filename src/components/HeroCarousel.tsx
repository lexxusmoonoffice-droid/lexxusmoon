"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface HeroCarouselProps {
  fallbackImages?: string[];
  intervalMs?: number;
}

export default function HeroCarousel({ fallbackImages = [], intervalMs: defaultInterval = 5000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [intervalMs, setIntervalMs] = useState(defaultInterval);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await api.get("/hero");
        const heroData = response.data;

        // Use mobile images if available on mobile devices
        if (isMobile && heroData.mobileImages && heroData.mobileImages.length > 0) {
          setImages(heroData.mobileImages);
          setIntervalMs(heroData.mobileIntervalMs || heroData.intervalMs || defaultInterval);
        } else {
          setImages(heroData.images);
          setIntervalMs(heroData.intervalMs || defaultInterval);
        }
      } catch (error) {
        console.error("Failed to fetch hero section:", error);
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, [fallbackImages, defaultInterval, isMobile]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => {
        const imageUrl = src.startsWith("http") ? src : src;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: i === index ? 1 : 0,
            }}
          />
        );
      })}

      {/* Dark overlay for text contrast - stronger on mobile */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/35 md:bg-black/35" />

      {/* Dots - responsive positioning */}
      <div className="absolute bottom-[12%] sm:bottom-[16%] md:bottom-[22%] left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-6 sm:w-8 bg-white" : "w-2 sm:w-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
