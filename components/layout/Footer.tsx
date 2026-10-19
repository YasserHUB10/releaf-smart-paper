import Link from "next/link";
import { Leaf, ExternalLink, ShieldCheck, Sparkles, Layers, ArrowUpRight } from "lucide-react";

const productLinks = [
  { href: "/workspace", label: "Interactive Studio" },
  { href: "/features", label: "Core Capabilities" },
  { href: "/how-it-works", label: "De-Inking Lifecycle" },
  { href: "/assistant", label: "AI Document Assistant" },
  { href: "/documentguard", label: "DocumentGuard Integrity" },
  { href: "/paper-compatibility", label: "Paper Matrix & Sizes" },
  { href: "/dashboard", label: "Environmental Dashboard" },
];

const companyLinks = [
  { href: "/about", label: "Vision & Problem" },
  { href: "/help", label: "FAQ & Hardware Support" },
  { href: "/privacy", label: "Client-Side Privacy" },
  { href: "/terms", label: "Prototype Terms of Use" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1E14] text-white border-t border-white/10" role="contentinfo">
      {/* Upper brand banner */}
      <div className="border-b border-white/10 py-12 bg-radial-[at_top_right] from-forest to-[#0A1E14]">
        <div className="container-narrow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-lime">
                <Leaf className="w-4 h-4 text-lime" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">RELEAF</span>
              <span className="text-[10px] font-mono uppercase bg-lime/20 text-lime px-2 py-0.5 rounded-full border border-lime/30">
                PROTOTYPE R&D
              </span>
            </div>
            <p className="text-sage/70 text-sm max-w-lg leading-relaxed">
              Print Smarter. Reuse More. Waste Less. A sustainable technology breakthrough combining AI document editing and selective ink removal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-sm"
            >
              <span>Try Studio Live</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1 & 2: Mission & Disclaimers */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest text-lime">
              Environmental Engineering Mission
            </h3>
            <p className="text-sm text-sage/80 leading-relaxed max-w-md">
              Over 40% of office prints are discarded within 24 hours. RELEAF reimagines paper as an intelligent reusable substrate rather than a disposable single-use consumable.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-sage/70 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-lime" />
                <span>Honest Engineering Disclosure</span>
              </p>
              <p>
                Physical de-inking chambers and photothermal ink release modules are under active hardware prototyping. All de-inking steps on this site are interactive software simulations.
              </p>
            </div>
          </div>

          {/* Col 3: Product Navigation */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 text-lime">
              Product Suite
            </h3>
            <ul className="space-y-2.5" role="list">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-sage/70 hover:text-lime transition-colors block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Code */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 text-lime">
              Governance & Code
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-sage/70 hover:text-lime transition-colors block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://github.com/YasserHUB10/releaf-smart-paper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-lime hover:underline font-semibold"
                  aria-label="GitHub repository"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sage/50">
          <p>&copy; 2026 RELEAF Technology Inc. Built for Tech Hackathons.</p>
          <p className="font-mono text-[11px] text-sage/40">Next.js 16 • Tailwind CSS v4 • WebGL Mol* Mol-Paper</p>
        </div>
      </div>
    </footer>
  );
}
