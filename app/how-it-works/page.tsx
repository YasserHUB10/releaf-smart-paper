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
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — RELEAF",
  description:
    "Understand the RELEAF lifecycle from document upload and Canva-style visual editing to selective de-inking and reprinting.",
};

const steps = [
  {
    num: "01",
    code: "SCAN",
    icon: Scan,
    title: "Upload Document to Studio",
    desc: "Import any PDF, PNG, or JPG file directly via drag-and-drop or file picker. RELEAF validates file integrity and parses document elements locally in your browser with zero cloud storage.",
    highlight: "Zero cloud exposure • Instant vector parsing",
    tagType: "lime",
  },
  {
    num: "02",
    code: "EDIT",
    icon: MousePointer2,
    title: "Canva-Style Visual Selection & Deletion",
    desc: "Interact with individual paragraphs, titles, and graphical elements directly on an A4 proportion canvas. Select elements, drag to reposition, edit typography inline, or press Delete/Backspace to permanently omit them.",
    highlight: "Keyboard shortcuts • Drag to reposition • Real vector deletions",
    tagType: "cobalt",
  },
  {
    num: "03",
    code: "RESTORE",
    icon: Sparkles,
    title: "AI Document Restoration & Corrections",
    desc: "The integrated AI Assistant analyzes your text for typos, readability flaws, and formatting inconsistencies. Review and apply proposed improvements with a single click before committing to print.",
    highlight: "Spelling radar • Grammar suggestions • Client-side demo mode",
    tagType: "lime",
  },
  {
    num: "04",
    code: "REVIEW",
    icon: ShieldCheck,
    title: "DocumentGuard Integrity Review",
    desc: "Every restoration passes through automated DocumentGuard verification. Educational certificates and official monetary transactions are evaluated with GREEN, AMBER, and RED security rules.",
    highlight: "Anti-fraud gate • Sensitive document classification",
    tagType: "cobalt",
  },
  {
    num: "05",
    code: "DE-INK",
    icon: Layers,
    title: "Simulate Selective Ink Removal",
    desc: "Preview the targeted physical de-inking coordinate mask. Rather than shredding or chemically re-pulping the paper, RELEAF targets only the exact micron coordinates that require ink dissolution.",
    highlight: "Micron coordinate masking • Fibre preservation • Illustrated simulation",
    tagType: "lime",
    sim: true,
  },
  {
    num: "06",
    code: "REPRINT",
    icon: Printer,
    title: "Print & Reuse the Physical Sheet",
    desc: "Align the refreshed page in your printer tray and print the corrected document on the exact same physical sheet. The session reuse ledger increments the sheet cycle counter.",
    highlight: "1–2 recommended reuse cycles • Fibre degradation < 2.5%",
    tagType: "cobalt",
    sim: true,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="lime-tag">ENGINEERING LIFECYCLE</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              The Paper Restoration Lifecycle
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              From document import and visual editing to selective ink release and circular printing.
            </p>
          </div>

          {/* Sequential Step Cards with Distinctive High-Contrast Framing */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {steps.map(({ num, code, icon: Icon, title, desc, highlight, tagType, sim }) => (
              <div
                key={num}
                className="bg-[#FFFDF7] rounded-xs p-8 border-2 border-[#123B2A] shadow-md flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black bg-[#123B2A] text-[#D6FF52] px-2 py-0.5 rounded-xs">
                      STEP {num}
                    </span>
                    <span className={tagType === "cobalt" ? "cobalt-tag" : "lime-tag"}>
                      {code}
                    </span>
                    <h2 className="text-xl font-black text-[#123B2A] tracking-tight">{title}</h2>
                    {sim && <span className="sim-badge">SIMULATION</span>}
                  </div>

                  <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">{desc}</p>

                  <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#287A50]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Prototype Notice Callout */}
          <div className="mt-12 max-w-4xl mx-auto p-6 rounded-xs bg-[#FFFDF7] border-2 border-[#123B2A] text-[#17201B] text-xs flex items-start gap-4 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-mono font-bold text-sm text-[#123B2A] uppercase tracking-wider">
                Prototype Hardware Transparency
              </p>
              <p className="leading-relaxed text-[#626B63]">
                Physical de-inking chambers and photothermal ink removal heads are currently undergoing research prototyping. All de-inking steps demonstrated on this website are interactive simulations. Real compatible hardware will be required for physical ink release.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] font-extrabold text-xs tracking-wider uppercase shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <span>Test the Workflow in Studio</span>
              <ArrowRight className="w-4 h-4 text-[#D6FF52] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
