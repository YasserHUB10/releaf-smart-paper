"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/documentguard", label: "DocumentGuard" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-sage"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-narrow flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-forest hover:opacity-80 transition-opacity"
          aria-label="RELEAF — Home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Leaf className="w-4 h-4 text-white" aria-hidden="true" />
          </span>
          <span>RELEAF</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-2 rounded-md text-sm font-medium text-charcoal hover:text-primary hover:bg-sage/50 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Open Workspace
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-charcoal hover:bg-sage/50 transition-colors"
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
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-sage shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="container-narrow py-4 flex flex-col gap-1" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-charcoal hover:text-primary hover:bg-sage/50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-sage mt-2">
              <Link
                href="/workspace"
                className="block px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold text-center hover:bg-forest transition-colors"
                onClick={() => setOpen(false)}
              >
                Open Workspace
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
