import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Printer,
  Layers,
  Sparkles,
  Shield,
  Recycle,
  BarChart3,
  Scan,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Core Capabilities — RELEAF",
  description:
    "Explore all RELEAF capabilities: smart printing, Canva-style document studio, selective de-inking, AI document restoration, and DocumentGuard.",
};

const capabilities = [
  {
    id: "document-studio",
    icon: Scan,
    title: "Canva-Style Document Studio",
    tag: "LIVE STUDIO",
    tagType: "lime",
    description:
      "Click any paragraph or text element on an uploaded PDF or image to select, drag to reposition, edit inline, or permanently delete with the Delete key. Real vector PDF export.",
    details: [
      "Select & move individual document elements",
      "Inline text editing with typography formatting",
      "Instant deletion using keyboard shortcuts (Delete / Backspace)",
      "Real vector PDF download with deleted items excluded",
      "Full Undo / Redo history state stack",
    ],
    cta: { label: "Open Document Studio", href: "/workspace" },
  },
  {
    id: "selective-deinking",
    icon: Layers,
    title: "Intelligent Selective De-Inking",
    tag: "SIMULATION",
    tagType: "cobalt",
    description:
      "Preview and simulate the selective ink removal process that enables paper reuse. RELEAF identifies which physical regions on a printed sheet need ink removal before reprinting.",
    details: [
      "Micron-targeted region coordinate calculations",
      "Interactive de-inking heatmap overlay",
      "Pre-processing fibre integrity checks (>98% retention)",
      "Cycle counter tracking (1–2 recommended prototype cycles)",
      "Rejection safeguard for unsuitable coated papers",
    ],
    cta: { label: "Try De-Inking Simulator", href: "/workspace" },
  },
  {
    id: "ai-restoration",
    icon: Sparkles,
    title: "AI Document Restoration",
    tag: "INTEGRATED",
    tagType: "lime",
    description:
      "Apply AI suggestions to correct spelling, grammar, and readability issues. The AI assistant provides suggestions that you review before applying. AI text is always marked as a suggestion.",
    details: [
      "Contextual spelling and grammar radar",
      "Readability and executive summarisation",
      "One-click application to the live canvas",
      "Damaged text reconstruction with confidence ratings",
      "Client-side processing preserves document privacy",
    ],
    cta: { label: "Open AI Assistant", href: "/assistant" },
  },
  {
    id: "documentguard",
    icon: Shield,
    title: "DocumentGuard Integrity Engine",
    tag: "SECURITY",
    tagType: "cobalt",
    description:
      "A built-in security layer that classifies sensitive documents, flags risky edits, and prevents fraudulent alterations with GREEN / AMBER / RED validation gates.",
    details: [
      "Sensitive document classification (academic, financial, legal)",
      "Strict blocks against modifying financial transaction values",
      "Audit-ready decision records and warnings",
      "Deceptive document manipulation prevention",
      "Watermark tagging for exported modifications",
    ],
    cta: { label: "Inspect DocumentGuard", href: "/documentguard" },
  },
  {
    id: "smart-printing",
    icon: Printer,
    title: "Smart Printing & Paper Matrix",
    tag: "CALIBRATED",
    tagType: "lime",
    description:
      "Configure paper size, type, orientation, print quality, margins, and scaling with full precision. RELEAF supports A3 through A6, Letter, Legal, Executive, and custom dimensions.",
    details: [
      "A3, A4, A5, A6, B4, B5, Letter, Legal & Custom sizing",
      "Separate print compatibility vs de-inking compatibility",
      "Duplex long/short edge orientation options",
      "Draft, normal, and high print quality profiles",
      "Bond, notebook, ruled, unruled, and recycled paper settings",
    ],
    cta: { label: "Configure Paper Matrix", href: "/paper-compatibility" },
  },
  {
    id: "environmental-ledger",
    icon: BarChart3,
    title: "Environmental Impact Dashboard",
    tag: "METRICS",
    tagType: "cobalt",
    description:
      "See at-a-glance data on sheets reused, operations completed, and estimated impact. All figures are clearly labelled as estimates or demo data until real hardware measurements are available.",
    details: [
      "Sheets reused counter per facility/session",
      "Fibre degradation monitoring (< 2.5% per cycle)",
      "Estimated paper sheets and pulp avoided",
      "Real-time printer connection state indicator",
      "Transparent prototype disclosure on all data",
    ],
    cta: { label: "View Impact Dashboard", href: "/dashboard" },
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="lime-tag">SYSTEM SPECIFICATION</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Platform Capabilities
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              From Canva-grade vector document editing to selective ink removal algorithms and anti-fraud integrity gates.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map(({ id, icon: Icon, title, tag, tagType, description, details, cta }) => (
              <section
                key={id}
                id={id}
                className="bg-[#FFFDF7] rounded-xs p-8 lg:p-10 border-2 border-[#123B2A] shadow-md flex flex-col justify-between space-y-8 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    {tag && (
                      <span className={tagType === "cobalt" ? "cobalt-tag" : "lime-tag"}>
                        {tag}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-black text-[#123B2A] tracking-tight mb-3">{title}</h2>
                  <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed mb-6 font-normal">
                    {description}
                  </p>

                  <div className="space-y-2.5 mb-6 bg-[#F4F0E6] p-5 rounded-xs border border-[#123B2A]/15 font-sans">
                    <p className="text-[11px] font-mono font-bold text-[#123B2A] uppercase tracking-wider mb-2">
                      Included Capabilities
                    </p>
                    {details.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-[#17201B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#287A50] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#123B2A]/15">
                  <Link
                    href={cta.href}
                    className="inline-flex items-center justify-between w-full py-3 px-5 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] text-xs font-bold tracking-wider uppercase transition-all shadow-sm group"
                  >
                    <span>{cta.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#D6FF52] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
