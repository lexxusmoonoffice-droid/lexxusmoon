"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/", color: "#D4A843" },
  { label: "SERVICES", href: "/services", color: "#4CAF50" },
  { label: "GALLERY", href: "/gallery", color: "#FFFFFF" },
  { label: "BLOGS", href: "/blogs", color: "#D4A843" },
  { label: "FAQs", href: "/faqs", color: "#D4A843" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (pathname === "/faqs" || pathname === "/gallery") {
        if (currentY > 108) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        if (currentY > lastScrollY.current && currentY > 108) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black text-white transition-transform duration-300"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="relative w-full h-[103px] flex items-center justify-between" style={{ paddingLeft: "12px", paddingRight: "clamp(40px, 5vw, 120px)" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 z-10" style={{ marginTop: "8px" }}>
          <Image
            src="https://static.wixstatic.com/media/5dbb31_9f4af6ed7b9945189e6873256cb309c4~mv2.png/v1/fill/w_214,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png"
            alt="Lexxusmoon Logo"
            width={214}
            height={78}
            priority
            className="h-[90px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav - centered in full header width */}
        <nav className="hidden md:flex items-center gap-16 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-[0.2em] hover:opacity-80 transition-all text-white pb-1 ${
                  isActive ? "border-b-2 border-white" : "border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link
          href="/get-a-quote"
          className="group hidden md:flex bg-[#C62828] text-white justify-center text-[13px] font-medium tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300 items-center gap-3 shrink-0 z-10 w-[160px] h-[40px] rounded-md"
        >
          CONTACT US
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:rotate-[315deg]"
          >
            <path d="M7 7L17 17M17 17H7M17 17V7" />
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block py-4 text-base font-semibold tracking-[0.2em] border-b border-gray-800 text-white text-center" onClick={() => setMobileOpen(false)}>{item.label}</Link>
          ))}
          <Link
            href="/get-a-quote"
            className="block mt-6 bg-[#E02222] text-white text-center px-5 py-4 text-base font-semibold tracking-[0.15em]"
            onClick={() => setMobileOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </header>
  );
}
