import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const productLinks = [
  { href: "/workspace", label: "Interactive Studio" },
  { href: "/features", label: "Core Capabilities" },
  { href: "/how-it-works", label: "De-Inking Lifecycle" },
  { href: "/assistant", label: "AI Document Assistant" },
  { href: "/documentguard", label: "DocumentGuard Integrity" },
  { href: "/paper-compatibility", label: "Substrate Matrix" },
  { href: "/dashboard", label: "Environmental Ledger" },
];

const companyLinks = [
  { href: "/about", label: "Design Philosophy" },
  { href: "/help", label: "Hardware FAQ" },
  { href: "/privacy", label: "Client-Side Privacy" },
  { href: "/terms", label: "Prototype Disclosures" },
];

export default function Footer() {
  return (
    <footer className="bg-[#123B2A] text-[#FFFDF7] border-t border-[#17201B]" role="contentinfo">
      {/* Upper Brand Statement Bar */}
      <div className="border-b border-white/10 py-12">
        <div className="container-narrow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#D6FF52] text-[#123B2A] font-mono text-xs font-black">
                RL
              </span>
              <span className="text-xl font-black tracking-tight text-[#FFFDF7]">RELEAF</span>
              <span className="lime-tag">PROTOTYPE R&D</span>
              <span className="cobalt-tag hidden sm:inline-flex">CIRCULAR OS</span>
            </div>
            <p className="text-[#DDE6D8]/80 text-xs max-w-lg leading-relaxed">
              Print Smarter. Reuse More. Waste Less. A sustainable technology breakthrough combining browser-native document editing and selective photothermal ink removal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#D6FF52] text-[#123B2A] font-extrabold text-xs hover:bg-[#E5FF85] transition-all shadow-sm hover:-translate-y-0.5"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Grid */}
      <div className="container-narrow py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Mission & Honest Disclosure */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-[#D6FF52] text-xs font-mono font-bold uppercase tracking-widest">
              Environmental Engineering Mission
            </h3>
            <p className="text-xs text-[#DDE6D8]/85 leading-relaxed max-w-md">
              Over 40% of standard office prints are discarded within 24 hours of printing. RELEAF treats paper as a reusable substrate rather than a disposable single-use medium.
            </p>
            <div className="p-4 rounded-sm bg-black/20 border border-white/10 text-xs text-[#DDE6D8]/80 space-y-1.5">
              <p className="font-bold text-[#FFFDF7] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D6FF52]" />
                <span>Honest Engineering Disclosure</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Physical de-inking chambers and photothermal ink release modules are under active hardware prototyping. All de-inking steps on this platform are interactive software simulations demonstrating coordinate-targeted ablation.
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-[#FFFDF7] text-xs font-mono font-bold uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5" role="list">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#DDE6D8]/75 hover:text-[#D6FF52] transition-colors block py-0.5 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance Links */}
          <div>
            <h3 className="text-[#FFFDF7] text-xs font-mono font-bold uppercase tracking-widest mb-4">
              Governance
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#DDE6D8]/75 hover:text-[#D6FF52] transition-colors block py-0.5 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower Copyright & Build Info */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#DDE6D8]/60 font-mono">
          <p>© 2026 RELEAF Technologies. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D6FF52]" />
            <span>RELEAF V2.5 • HACKATHON BUILD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
