import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Client-Side Privacy Policy",
  description: "How RELEAF protects your documents through 100% browser-native client-side processing.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <span className="pill-badge mb-3">Data Governance</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/60 font-mono">
              Last Updated: Prototype Release 2026
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/5 shadow-xs space-y-8 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">Core Privacy Guarantee</p>
                <p className="text-xs text-green-900/80">
                  Documents uploaded to RELEAF are parsed, rendered, edited, and exported <strong>100% within your local web browser session</strong>. No document pixels or text bytes ever travel to external storage.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">1. Document Data Processing</h2>
              <p>
                When you drag and drop a PDF or image into the RELEAF Studio, the file is loaded into the browser memory using the Web File API and Object URLs. Parsing, vector conversion, element deletion, and PDF generation (via jsPDF) occur exclusively in your device RAM.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">2. DocumentGuard Client Security</h2>
              <p>
                DocumentGuard rule heuristics run client-side. Keyword analysis for academic credential forgery or financial invoice alterations happens in JavaScript memory without telemetry ingestion.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">3. No Persistent Cloud Storage</h2>
              <p>
                RELEAF does not require user accounts, passwords, or tracking cookies for this prototype demonstration. Refreshing or closing the tab completely clears the active document from browser memory.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">4. AI Assistant Ingestion</h2>
              <p>
                The AI Document Assistant runs in client-side demonstration mode with deterministic responses. If a real AI API key is configured by an enterprise in production, explicit confirmation is required before any prompt is dispatched to an AI model provider.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
