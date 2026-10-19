import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Leaf, Printer, Sparkles, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About RELEAF — the smart paper restoration and reuse concept.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-forest mb-4">About RELEAF</h1>
            <p className="text-xl text-charcoal/70 leading-relaxed">
              A smart paper restoration and reuse concept — combining intelligent
              document editing, AI assistance, and paper-reuse workflows.
            </p>
          </div>

          <section className="bg-white rounded-2xl p-8 border border-sage/40 mb-8" aria-labelledby="vision-heading">
            <h2 id="vision-heading" className="text-2xl font-bold text-forest mb-4">
              Product Vision
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              RELEAF combines the capabilities of a printer, photocopier,
              scanner, AI document editor, document restoration assistant, and
              paper reuse management system. Its primary purpose is to help users
              reuse suitable printed paper by editing existing documents
              digitally, identifying the physical regions that require ink
              removal, and preparing the paper for corrected printing.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              The product has three defining capabilities: smart printing,
              scanning, and photocopying; intelligent selective de-inking and
              reprinting; and AI-powered document restoration and editing.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-sage/40 mb-8" aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-2xl font-bold text-forest mb-4">
              Why We Build RELEAF
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              Paper production is one of the most resource-intensive
              manufacturing processes. Many documents are printed for brief
              single-use purposes and discarded, even when the paper itself
              remains in perfect condition. RELEAF explores a fundamentally
              different approach: rather than treating paper as a single-use
              substrate, treat it as a reusable material that can be intelligently
              managed.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              This prototype builds the software infrastructure that would make
              paper reuse seamless — document editing, AI restoration, security
              validation, and print management — in preparation for physical
              de-inking hardware.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-sage/40 mb-8" aria-labelledby="limitations-heading">
            <h2 id="limitations-heading" className="text-2xl font-bold text-forest mb-4">
              Honest Limitations
            </h2>
            <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
              <p>
                <strong className="text-charcoal">Physical de-inking technology</strong> is under active development. No commercially available RELEAF hardware currently exists. All features labelled &#34;SIMULATION&#34; are software demonstrations only — no actual ink removal occurs.
              </p>
              <p>
                <strong className="text-charcoal">Environmental impact figures</strong> are not fabricated. The dashboard shows zero values and clearly labels them as demo data until real hardware measurements are available.
              </p>
              <p>
                <strong className="text-charcoal">AI integration</strong> requires a server-side API key. Without one, the assistant provides clearly labelled sample interactions. No AI model is called when credentials are absent.
              </p>
              <p>
                <strong className="text-charcoal">Documents</strong> are processed locally in the browser. Nothing is uploaded to a server in the current prototype unless a real AI API is configured with explicit user consent.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5" aria-labelledby="pillars-heading">
            <h2 id="pillars-heading" className="sr-only">Core pillars</h2>
            {[
              {
                icon: Printer,
                title: "Smart Printing",
                desc: "Precision printing with full paper configuration and compatibility checking.",
              },
              {
                icon: Leaf,
                title: "De-Inking (R&D)",
                desc: "Selective ink removal to enable paper reuse — hardware under development.",
              },
              {
                icon: Sparkles,
                title: "AI Restoration",
                desc: "Intelligent document correction and content reconstruction with AI.",
              },
              {
                icon: Shield,
                title: "DocumentGuard",
                desc: "Security layer preventing fraud and protecting document integrity.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-forest text-white rounded-2xl p-6">
                <Icon className="w-6 h-6 text-lime mb-3" aria-hidden="true" />
                <h3 className="font-bold text-base mb-1">{title}</h3>
                <p className="text-sm text-sage/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
