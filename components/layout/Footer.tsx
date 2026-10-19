import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const productLinks = [
  { href: "/workspace", label: "Interactive Studio" },
  { href: "/features", label: "Core Capabilities" },
  { href: "/how-it-works", label: "De-Inking Process" },
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
    <footer className="bg-[#171A17] text-[#FAF9F5] border-t border-[#20231F]" role="contentinfo">
      {/* Upper brand banner */}
      <div className="border-b border-[#20231F] py-14">
        <div className="container-narrow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-sm bg-[#FAF9F5] text-[#171A17] font-mono text-xs font-bold">
                RL
              </span>
              <span className="text-lg font-bold tracking-tight text-[#FAF9F5]">RELEAF</span>
              <span className="text-[10px] font-mono uppercase bg-[#20231F] text-[#A7B5A0] px-2 py-0.5 rounded border border-[#A7B5A0]/20">
                PROTOTYPE R&D
              </span>
            </div>
            <p className="text-[#A7B5A0] text-xs max-w-lg leading-relaxed">
              Print Smarter. Reuse More. Waste Less. A sustainable technology breakthrough combining browser-native document editing and selective photothermal ink removal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FAF9F5] text-[#171A17] font-semibold text-xs hover:bg-[#E4E1D8] transition-all shadow-sm"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#315D46]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="container-narrow py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1 & 2: Mission & Disclaimers */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-[#FAF9F5] text-xs font-mono font-semibold uppercase tracking-widest">
              Environmental Engineering
            </h3>
            <p className="text-xs text-[#A7B5A0] leading-relaxed max-w-md">
              Over 40% of standard office prints are discarded within 24 hours of printing. RELEAF treats paper as a reusable substrate rather than a disposable single-use medium.
            </p>
            <div className="p-4 rounded-md bg-[#20231F]/60 border border-[#20231F] text-xs text-[#A7B5A0] space-y-1.5">
              <p className="font-semibold text-[#FAF9F5] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#315D46]" />
                <span>Honest Engineering Disclosure</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Physical de-inking chambers and photothermal ink release modules are under active engineering development. All de-inking steps on this platform are interactive software simulations demonstrating targeted coordinate ablation.
              </p>
            </div>
          </div>

          {/* Col 3: Product Navigation */}
          <div>
            <h3 className="text-[#FAF9F5] text-xs font-mono font-semibold uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2" role="list">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#A7B5A0] hover:text-[#FAF9F5] transition-colors block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Documentation */}
          <div>
            <h3 className="text-[#FAF9F5] text-xs font-mono font-semibold uppercase tracking-widest mb-4">
              Governance
            </h3>
            <ul className="space-y-2" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-[#A7B5A0] hover:text-[#FAF9F5] transition-colors block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="pt-10 mt-10 border-t border-[#20231F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#777E62]">
          <p>© 2026 RELEAF Technologies. All rights reserved.</p>
          <p className="font-mono">RELEAF V2.4 • HACKATHON BUILD</p>
        </div>
      </div>
    </footer>
  );
}
