"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F0EEE7]/92 backdrop-blur-md border-b border-[#20231F]/10 shadow-[0_1px_6px_rgba(23,26,23,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="container-narrow flex items-center justify-between h-20"
        aria-label="Main navigation"
      >
        {/* Brand Identity: Understated, Minimal, Architectural */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="RELEAF — Home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#20231F] text-[#F0EEE7] font-mono text-xs font-bold transition-transform group-hover:scale-95">
            RL
          </span>
          <div className="flex flex-col">
            <span className="tracking-tight text-base text-[#20231F] font-bold leading-tight flex items-center gap-1.5">
              RELEAF
              <span className="w-1.5 h-1.5 rounded-full bg-[#315D46]" />
            </span>
            <span className="text-[10px] font-mono text-[#777E62] uppercase tracking-wider">
              Circular Paper R&D
            </span>
          </div>
        </Link>

        {/* Desktop Links: Editorial text links with subtle stone hover */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs tracking-tight transition-colors py-1 ${
                  isActive
                    ? "font-bold text-[#20231F] border-b border-[#20231F]"
                    : "font-medium text-[#575C53] hover:text-[#20231F]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Primary CTA: Deep Charcoal solid button with warm ivory text */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#20231F] hover:bg-[#171A17] text-[#FAF9F5] text-xs font-semibold tracking-wide transition-all shadow-sm hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#20231F]"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A7B5A0]" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#20231F] text-[#FAF9F5] text-xs font-semibold"
          >
            Studio
          </Link>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-md bg-[#E4E1D8]/60 border border-[#20231F]/10 text-[#20231F] hover:bg-[#E4E1D8] transition-colors"
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

      {/* Mobile Menu Dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#F0EEE7] border-b border-[#20231F]/10 px-6 py-6 space-y-3"
        >
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#20231F]/10">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded text-xs transition-colors ${
                    isActive
                      ? "bg-[#20231F] text-[#FAF9F5] font-semibold"
                      : "text-[#575C53] hover:text-[#20231F] hover:bg-[#E4E1D8]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2">
            <Link
              href="/workspace"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-[#20231F] text-[#FAF9F5] font-semibold text-xs"
            >
              <span>Launch Studio Canvas</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A7B5A0]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
