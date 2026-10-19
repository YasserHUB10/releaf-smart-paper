import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { HelpCircle, ArrowRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Help",
  description: "RELEAF help and troubleshooting guide.",
};

const faqs = [
  {
    q: "Why does the de-inking feature say SIMULATION?",
    a: "The physical de-inking hardware is currently under development. The simulation demonstrates the workflow so you can understand the full RELEAF experience before compatible hardware is available.",
  },
  {
    q: "What file formats does RELEAF support?",
    a: "The workspace accepts PDF, PNG, JPG, and JPEG files up to 10 MB. DOCX support may be added in future versions.",
  },
  {
    q: "Are my documents sent to a server?",
    a: "No. In the current prototype, documents are processed entirely in your browser. If a real AI API key is configured, you will be prompted for consent before any document content is sent to an external service.",
  },
  {
    q: "Why is DocumentGuard blocking my operation?",
    a: "DocumentGuard is designed to prevent fraudulent document alterations. If your operation is blocked, a reason is shown alongside a suggested legitimate alternative. Editing financial amounts, certificate names, or identification numbers triggers a block.",
  },
  {
    q: "What paper types are compatible with de-inking?",
    a: "Standard office paper, bond paper, recycled paper, notebook paper, and previously printed paper are provisionally compatible in simulation mode. Glossy, coated, thin, and coloured paper are not suitable. Visit the Paper Compatibility page for a full list.",
  },
  {
    q: "How many times can I reuse a sheet?",
    a: "RELEAF recommends a maximum of 1–2 reuse cycles in the prototype phase. The reuse counter is tracked per session. A sheet should not be processed indefinitely.",
  },
  {
    q: "The AI assistant shows demo responses — how do I enable real AI?",
    a: "Configure the RELEAF_AI_KEY environment variable on the server. Without it, the assistant shows clearly labelled sample interactions. The API key must never be placed in client-side code.",
  },
  {
    q: "The 3D scene on the homepage is not loading.",
    a: "The 3D scene requires WebGL support. If WebGL is unavailable in your browser, a static alternative is shown automatically. The homepage content, navigation, and all core features remain fully accessible without the 3D scene.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest">Help & FAQ</h1>
              <p className="text-charcoal/60 mt-1">
                Common questions and troubleshooting for RELEAF.
              </p>
            </div>
          </div>

          <section className="space-y-4" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="sr-only">Frequently asked questions</h2>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-sage/40 p-6"
              >
                <h3 className="font-semibold text-charcoal mb-2 flex items-start gap-2">
                  <span className="text-primary text-sm font-bold mt-0.5">Q.</span>
                  {f.q}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed pl-5">{f.a}</p>
              </div>
            ))}
          </section>

          <div className="mt-10 bg-forest text-white rounded-2xl p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="font-bold mb-2">Still having trouble?</h2>
                <p className="text-sage/80 text-sm leading-relaxed mb-4">
                  RELEAF is a prototype presented for hackathon demonstration. No live customer support exists at this stage. Please refer to the documentation for technical issues.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-lime text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  Learn more about limitations
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
