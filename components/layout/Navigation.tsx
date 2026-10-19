"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/features", label: "Capabilities" },
  { href: "/how-it-works", label: "Process" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/documentguard", label: "DocumentGuard" },
  { href: "/paper-compatibility", label: "Substrates" },
  { href: "/dashboard", label: "Metrics" },
  { href: "/about", label: "Philosophy" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F4F0E6]/95 backdrop-blur-md border-b border-[#123B2A]/15 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="container-narrow flex items-center justify-between h-20"
        aria-label="Main navigation"
      >
        {/* Brand Mark: Deep Forest Badge with Electric Lime Monogram */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="RELEAF — Home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#123B2A] text-[#D6FF52] font-mono text-xs font-black tracking-wider transition-transform group-hover:scale-95">
            RL
          </span>
          <div className="flex flex-col">
            <span className="tracking-tight text-base text-[#123B2A] font-black leading-tight flex items-center gap-1.5">
              RELEAF
              <span className="w-2 h-2 rounded-full bg-[#D6FF52] border border-[#123B2A]" />
            </span>
            <span className="text-[10px] font-mono text-[#626B63] uppercase tracking-wider">
              Circular Paper R&D
            </span>
          </div>
        </Link>

        {/* Desktop Links: Clean Editorial Typography with Electric Lime Underline */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-xs tracking-tight transition-colors py-1 ${
                  isActive
                    ? "font-extrabold text-[#123B2A]"
                    : "font-semibold text-[#626B63] hover:text-[#123B2A]"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6FF52] shadow-xs" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Primary CTA: High-Contrast Deep Forest with Electric Lime Accent */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] text-xs font-bold tracking-wide transition-all shadow-sm hover:-translate-y-0.5 group focus-visible:ring-2 focus-visible:ring-[#D6FF52]"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D6FF52] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#123B2A] text-[#D6FF52] text-xs font-bold"
          >
            Studio
          </Link>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-sm bg-[#FFFDF7] border border-[#123B2A]/20 text-[#123B2A] hover:bg-[#DDE6D8] transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#F4F0E6] border-b border-[#123B2A]/20 px-6 py-6 space-y-4 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#123B2A]/10">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded text-xs transition-colors ${
                    isActive
                      ? "bg-[#123B2A] text-[#D6FF52] font-bold"
                      : "text-[#626B63] hover:text-[#123B2A] hover:bg-[#DDE6D8]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div>
            <Link
              href="/workspace"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#123B2A] text-[#D6FF52] font-bold text-xs shadow-sm"
            >
              <span>Launch Studio Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
