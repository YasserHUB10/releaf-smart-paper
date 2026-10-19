import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Scan, Sparkles, Layers, Printer, ArrowRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Understand the RELEAF workflow from document import to paper restoration and reprinting.",
};

const steps = [
  {
    num: "01",
    icon: Scan,
    title: "Scan or Import Your Document",
    desc: "Upload a PDF, PNG, or JPG file directly from your device using the Workspace. RELEAF validates the file, displays a preview, and lets you navigate multi-page documents before processing begins.",
    notes: [],
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Edit and Restore with AI",
    desc: "The AI Document Restoration Assistant analyses your document and offers suggestions for spelling, grammar, readability, and damaged-text reconstruction. You review every suggestion before applying it. RELEAF clearly marks any AI-generated text as a suggestion and never silently modifies your document.",
    notes: [
      "In demo mode, sample interactions are shown when no API key is configured.",
      "Real AI integration reads credentials from server-side environment variables only.",
    ],
  },
  {
    num: "03",
    icon: Layers,
    title: "Simulate the De-Inking Process",
    desc: "Once your changes are confirmed, RELEAF identifies the physical regions on the printed page that would need to be de-inked. You can preview these regions and check paper compatibility before any physical operation is attempted. All physical steps are clearly labelled as simulations until compatible hardware is connected.",
    notes: [
      "Physical de-inking technology is under development.",
      "This step is a visual simulation only — no actual ink removal occurs.",
      "Compatible hardware will be required for real restoration.",
    ],
    sim: true,
  },
  {
    num: "04",
    icon: Printer,
    title: "Print and Reuse the Sheet",
    desc: "With the de-inked area prepared, RELEAF aligns the corrected document to the same sheet of paper and sends it to the printer. The reuse cycle counter increments for this sheet. A recommended maximum of 1–2 reuse cycles applies in the prototype phase.",
    notes: [
      "Compatible physical hardware is required for this step.",
      "Illustrated as a simulation in the current prototype.",
    ],
    sim: true,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-forest mb-4">How It Works</h1>
            <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
              From used document to freshly printed page — a step-by-step guide
              to the RELEAF workflow.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map(({ num, icon: Icon, title, desc, notes, sim }, i) => (
              <section
                key={num}
                className="bg-white rounded-2xl p-8 border border-sage/40"
                aria-labelledby={`step-${i}-heading`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
                  {/* Step number */}
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-primary/20 font-mono leading-none mb-2">
                      {num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2
                        id={`step-${i}-heading`}
                        className="text-2xl font-bold text-forest"
                      >
                        {title}
                      </h2>
                      {sim && <span className="sim-badge">SIMULATION</span>}
                    </div>
                    <p className="text-charcoal/70 leading-relaxed mb-4">{desc}</p>

                    {notes.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle
                            className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <ul className="space-y-1" role="list">
                            {notes.map((n) => (
                              <li key={n} className="text-sm text-amber-800">
                                {n}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-forest transition-colors text-lg"
            >
              Try the Workspace
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
