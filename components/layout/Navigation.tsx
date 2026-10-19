"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf, ArrowRight, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/documentguard", label: "DocumentGuard" },
  { href: "/paper-compatibility", label: "Compatibility" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15);
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

  const isWorkspace = pathname === "/workspace";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F8F3]/90 backdrop-blur-md shadow-xs border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-narrow flex items-center justify-between h-20"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl text-forest hover:opacity-90 transition-opacity group"
          aria-label="RELEAF — Home"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest text-lime shadow-xs group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-lime" aria-hidden="true" />
          </span>
          <span className="tracking-tight text-lg text-forest font-extrabold">RELEAF</span>
          <span className="hidden sm:inline-block text-[10px] font-bold font-mono tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
            HACKATHON
          </span>
        </Link>

        {/* Desktop Links (Pill Bar) */}
        <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-black/5 shadow-2xs">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-forest text-white shadow-xs"
                    : "text-charcoal/70 hover:text-forest hover:bg-black/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Primary CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold"
          >
            Studio
          </Link>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 border border-black/10 text-charcoal hover:bg-white transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#F9F8F3] border-b border-black/10 shadow-xl animate-in slide-in-from-top-2 duration-150"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container-narrow py-5 space-y-1">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-forest text-white"
                      : "text-charcoal hover:bg-black/5"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-black/10 mt-3">
              <Link
                href="/workspace"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-sm"
                onClick={() => setOpen(false)}
              >
                <span>Launch Document Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
