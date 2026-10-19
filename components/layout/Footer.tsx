import Link from "next/link";
import { Leaf, ExternalLink } from "lucide-react";

const featureLinks = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/workspace", label: "Workspace" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/documentguard", label: "DocumentGuard" },
  { href: "/paper-compatibility", label: "Paper Compatibility" },
  { href: "/dashboard", label: "Dashboard" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-sage" role="contentinfo">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white hover:opacity-80 transition-opacity mb-4"
              aria-label="RELEAF — Home"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Leaf className="w-4 h-4 text-white" aria-hidden="true" />
              </span>
              <span>RELEAF</span>
            </Link>
            <p className="text-sm text-sage/80 leading-relaxed max-w-xs">
              A smart paper restoration and reuse concept combining document
              editing, AI assistance, intelligent printing, and paper-reuse
              workflows.
            </p>
            <p className="text-xs text-sage/50 mt-4 italic">
              Physical de-inking technology is under development. Features
              marked &#34;Simulation&#34; are illustrative demonstrations only.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2" role="list">
              {featureLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-sage/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Legal & Help
            </h3>
            <ul className="space-y-2" role="list">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-sage/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/releaf-smart-paper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-sage/70 hover:text-white transition-colors"
                  aria-label="GitHub repository (opens in new tab)"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sage/50">
            &copy; 2026 RELEAF. Concept product —
            presented for demonstration purposes.
          </p>
          <p className="text-xs text-sage/50">
            Print Smarter. Reuse More. Waste Less.
          </p>
        </div>
      </div>
    </footer>
  );
}
