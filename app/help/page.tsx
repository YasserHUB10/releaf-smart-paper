import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { HelpCircle, ArrowRight, AlertTriangle, FileText, Shield, Layers, Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description: "Frequently asked questions and guides for the RELEAF smart paper restoration platform.",
};

const faqs = [
  {
    q: "How does Canva-style editing work in the RELEAF Studio?",
    a: "When you upload a document or use our demo document, RELEAF parses it into editable text and shape elements. You can click any element to inspect, drag to reposition, reformat text, or hit Delete on your keyboard to permanently remove it.",
  },
  {
    q: "Why is the de-inking feature labelled as a SIMULATION?",
    a: "The physical photothermal laser and bio-solvent chambers are under active prototyping. The simulation demonstrates the micron coordinate mapping and sheet reuse logic until physical hardware is commercially deployed.",
  },
  {
    q: "Are deleted elements genuinely removed when I export to PDF?",
    a: "Yes! Unlike cosmetic redaction that places white rectangles over text, RELEAF's vector PDF generator permanently excludes deleted elements from the exported document's content stream.",
  },
  {
    q: "Are my uploaded documents sent to external cloud servers?",
    a: "No. All document uploads, visual editing, element parsing, and PDF exports run 100% locally in your web browser. Nothing is uploaded or stored on external servers.",
  },
  {
    q: "Why does DocumentGuard block certain modifications?",
    a: "DocumentGuard protects document integrity and prevents fraud. Modifying monetary numbers on invoices or recipient names on university degrees/transcripts triggers automatic RED security halts.",
  },
  {
    q: "Which paper types can be reused?",
    a: "Standard office bond (80 gsm), recycled paper, and notebook paper are compatible in simulation mode. Glossy photo paper and ultra-thin paper (< 60 gsm) are not suitable.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill-badge mb-3">Knowledge Base</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Help & Frequently Asked Questions
            </h1>
            <p className="text-charcoal/70 text-base leading-relaxed">
              Find answers about Canva editing, selective de-inking, DocumentGuard, and privacy.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 mb-16">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 shadow-xs space-y-2 card-hover"
              >
                <h3 className="font-bold text-base text-forest flex items-start gap-2.5">
                  <span className="text-primary font-mono text-sm mt-0.5">Q.</span>
                  <span>{q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 pl-6 leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>

          {/* Need help banner */}
          <div className="bg-forest text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-bold text-xl">Ready to test the studio yourself?</h3>
              <p className="text-xs text-sage/80">Experience real-time element selection, deletion, and vector export.</p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-md shrink-0"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
