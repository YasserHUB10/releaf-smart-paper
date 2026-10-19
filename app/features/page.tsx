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
  Settings,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore all RELEAF capabilities: smart printing, intelligent de-inking, AI document restoration, DocumentGuard, and paper reuse tracking.",
};

const features = [
  {
    id: "smart-printing",
    icon: Printer,
    title: "Smart Printing",
    tag: null,
    description:
      "Configure paper size, type, orientation, print quality, margins, and scaling with full precision. RELEAF supports A3 through A6, Letter, Legal, Executive, and custom sizes.",
    details: [
      "Portrait and landscape orientation",
      "Colour and greyscale modes",
      "Single and double-sided printing",
      "Page range and copy count",
      "Margin and scaling controls",
      "Multiple paper type profiles",
    ],
    cta: { label: "Configure paper", href: "/paper-compatibility" },
  },
  {
    id: "intelligent-de-inking",
    icon: Layers,
    title: "Intelligent De-Inking",
    tag: "SIMULATION",
    description:
      "Preview and simulate the selective ink removal process that enables paper reuse. RELEAF identifies which physical regions on a printed sheet need to be de-inked before reprinting.",
    details: [
      "Region-based ink removal targeting",
      "Compatibility check before processing",
      "Before-and-after visual preview",
      "Reuse cycle counter",
      "Rejection for unsuitable sheets",
    ],
    cta: { label: "Try simulation", href: "/workspace" },
  },
  {
    id: "ai-document-restoration",
    icon: Sparkles,
    title: "AI Document Restoration",
    tag: null,
    description:
      "Apply AI suggestions to correct spelling, grammar, and readability issues. The AI assistant provides suggestions that you review before applying. AI-generated text is always marked as a suggestion.",
    details: [
      "Spelling and grammar correction",
      "Readability improvements",
      "Document summarisation",
      "Translation assistance",
      "Damaged text reconstruction (marked uncertain)",
      "Print-ready preparation guidance",
    ],
    cta: { label: "Open AI Assistant", href: "/assistant" },
  },
  {
    id: "documentguard",
    icon: Shield,
    title: "DocumentGuard",
    tag: null,
    description:
      "A built-in security layer that detects sensitive documents, flags risky edits, and prevents fraudulent alterations. Every restoration operation passes through a security review.",
    details: [
      "Sensitive document classification",
      "GREEN / AMBER / RED decision display",
      "Blocked operations with clear reasons",
      "Anti-fraud edit restrictions",
      "Watermarking for edited exports",
      "Audit-ready decision records",
    ],
    cta: { label: "Explore DocumentGuard", href: "/documentguard" },
  },
  {
    id: "paper-reuse-tracking",
    icon: Recycle,
    title: "Paper Reuse Tracking",
    tag: null,
    description:
      "Track sheets through their reuse lifecycle. RELEAF maintains a configurable reuse-cycle limit (recommended: 1–2 cycles in prototype phase) to protect quality and prevent overuse.",
    details: [
      "Per-sheet reuse cycle counter",
      "Configurable maximum reuse limit",
      "Rejection logic for exceeded cycles",
      "Session-based tracking (no cloud required)",
    ],
    cta: { label: "View Dashboard", href: "/dashboard" },
  },
  {
    id: "environmental-impact",
    icon: BarChart3,
    title: "Environmental Dashboard",
    tag: "ESTIMATES",
    description:
      "See at-a-glance data on sheets reused, operations completed, and estimated impact. All figures are clearly labelled as estimates or demo data until real hardware measurements are available.",
    details: [
      "Sheets reused counter",
      "Successful / failed operation counts",
      "Sheets rejected for reuse",
      "Estimated sheets avoided",
      "Demo data clearly labelled",
    ],
    cta: { label: "Open Dashboard", href: "/dashboard" },
  },
  {
    id: "paper-compatibility",
    icon: Settings,
    title: "Paper Compatibility",
    tag: null,
    description:
      "Not all paper that can be printed on is suitable for physical ink removal. RELEAF provides a dedicated compatibility interface to check paper type, thickness, and previous print history.",
    details: [
      "Standard, bond, recycled, glossy, matte profiles",
      "Thickness and coating checks",
      "De-inking compatibility separate from print compatibility",
      "Demonstration mode for hardware-unavailable checks",
    ],
    cta: { label: "Check compatibility", href: "/paper-compatibility" },
  },
  {
    id: "scanning",
    icon: Scan,
    title: "Document Import & Scanning",
    tag: null,
    description:
      "Import PDF, PNG, JPG, and JPEG documents directly. Preview multi-page PDFs, navigate between pages, and use the in-browser viewer before sending to the AI workflow.",
    details: [
      "Drag-and-drop or file picker",
      "File validation and size limits",
      "Multi-page PDF navigation",
      "Clear document preview",
      "Remove / replace document action",
    ],
    cta: { label: "Open Workspace", href: "/workspace" },
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-forest mb-4">
              All Capabilities
            </h1>
            <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
              A complete overview of every feature in RELEAF, from smart
              printing to AI document restoration.
            </p>
          </div>

          <div className="space-y-8">
            {features.map(({ id, icon: Icon, title, tag, description, details, cta }) => (
              <section
                key={id}
                id={id}
                className="bg-white rounded-2xl p-8 border border-sage/40 scroll-mt-24"
                aria-labelledby={`feature-${id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 id={`feature-${id}`} className="text-xl font-bold text-forest">
                          {title}
                        </h2>
                        {tag && <span className="sim-badge">{tag}</span>}
                      </div>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed mb-6">
                      {description}
                    </p>
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {cta.label}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                      What it includes
                    </h3>
                    <ul className="space-y-2" role="list">
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-charcoal/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
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
