import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Scan,
  Sparkles,
  Layers,
  Printer,
  ArrowRight,
  AlertTriangle,
  MousePointer2,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Understand the RELEAF lifecycle from document upload and Canva-style visual editing to selective de-inking and reprinting.",
};

const steps = [
  {
    num: "01",
    icon: Scan,
    title: "1. Upload Document to Studio",
    desc: "Import any PDF, PNG, or JPG file directly via drag-and-drop or file picker. RELEAF validates file integrity and parses document elements locally in your browser with zero cloud storage.",
    highlight: "Zero cloud exposure • Instant vector rendering",
  },
  {
    num: "02",
    icon: MousePointer2,
    title: "2. Canva-Style Visual Selection & Deletion",
    desc: "Interact with individual paragraphs, titles, and graphical elements directly on an A4 proportion canvas. Select elements, drag to reposition, edit typography inline, or press Delete/Backspace to permanently omit them.",
    highlight: "Keyboard shortcuts • Drag to reposition • Real vector deletions",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "3. AI Document Restoration & Corrections",
    desc: "The integrated AI Assistant analyzes your text for typos, readability flaws, and formatting inconsistencies. Review and apply proposed improvements with a single click before committing to print.",
    highlight: "Spelling radar • Grammar suggestions • Client-side demo mode",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "4. DocumentGuard Integrity Review",
    desc: "Every restoration passes through automated DocumentGuard verification. Educational certificates and official monetary transactions are evaluated with GREEN, AMBER, and RED security rules.",
    highlight: "Anti-fraud gate • Sensitive document classification",
  },
  {
    num: "05",
    icon: Layers,
    title: "5. Simulate Selective Ink Removal",
    desc: "Preview the targeted physical de-inking coordinate mask. Rather than shredding or chemically re-pulping the paper, RELEAF targets only the exact micron coordinates that require ink dissolution.",
    highlight: "Micron coordinate masking • Fibre preservation • Illustrated simulation",
    sim: true,
  },
  {
    num: "06",
    icon: Printer,
    title: "6. Print & Reuse the Physical Sheet",
    desc: "Align the refreshed page in your printer tray and print the corrected document on the exact same physical sheet. The session reuse ledger increments the sheet cycle counter.",
    highlight: "1–2 recommended reuse cycles • Fibre degradation < 2.5%",
    sim: true,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill-badge mb-3">System Architecture</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              The Paper Restoration Lifecycle
            </h1>
            <p className="text-charcoal/70 text-base leading-relaxed">
              From document import and visual editing to selective ink release and circular printing.
            </p>
          </div>

          {/* Sequential Step Cards */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {steps.map(({ num, icon: Icon, title, desc, highlight, sim }) => (
              <div
                key={num}
                className="bg-white rounded-3xl p-8 border border-black/5 shadow-xs card-hover flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      STEP {num}
                    </span>
                    <h2 className="text-xl font-bold text-forest">{title}</h2>
                    {sim && <span className="sim-badge">SIMULATION</span>}
                  </div>

                  <p className="text-sm text-charcoal/70 leading-relaxed">{desc}</p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-primary">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Prototype Notice Callout */}
          <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-amber-950">Prototype Hardware Transparency</p>
              <p className="leading-relaxed text-amber-900/80">
                Physical de-inking chambers and photothermal ink removal heads are currently undergoing research prototyping. All de-inking steps demonstrated on this website are interactive simulations. Real compatible hardware will be required for physical ink release.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>Test the Workflow in Studio</span>
              <ArrowRight className="w-4 h-4 text-lime" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
