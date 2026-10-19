import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Help & FAQ — RELEAF",
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
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="lime-tag">KNOWLEDGE BASE</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Help & Frequently Asked Questions
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              Find answers about Canva editing, selective de-inking, DocumentGuard, and privacy.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 mb-16">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-[#FFFDF7] rounded-xs p-6 border-2 border-[#123B2A] shadow-sm space-y-2"
              >
                <h3 className="font-black text-base text-[#123B2A]">{q}</h3>
                <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          {/* Bottom Card */}
          <div className="p-8 rounded-xs bg-[#123B2A] text-[#FFFDF7] border-2 border-[#123B2A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-black text-xl text-[#FFFDF7]">Have questions about your document?</h3>
              <p className="text-xs text-[#DDE6D8]/80 mt-1">Try our AI Assistant in client demo mode.</p>
            </div>
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#D6FF52] text-[#123B2A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#E5FF85] transition-all shrink-0"
            >
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
