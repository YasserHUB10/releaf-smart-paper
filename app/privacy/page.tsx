import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Client-Side Privacy Policy — RELEAF",
  description: "How RELEAF protects your documents through 100% browser-native client-side processing.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12 space-y-3">
            <span className="lime-tag">DATA GOVERNANCE</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#626B63] font-mono">
              Last Updated: Prototype Release 2026
            </p>
          </div>

          <div className="bg-[#FFFDF7] rounded-xs p-8 sm:p-10 border-2 border-[#123B2A] shadow-md space-y-8 text-xs sm:text-sm text-[#17201B] leading-relaxed">
            <div className="p-4 rounded-xs bg-[#EAF4EE] border-2 border-[#287A50] text-[#123B2A] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#287A50] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase font-mono">Core Privacy Guarantee</p>
                <p className="text-xs text-[#287A50]">
                  Documents uploaded to RELEAF are parsed, rendered, edited, and exported <strong>100% within your local web browser session</strong>. No document pixels or text bytes ever travel to external storage.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">1. Document Data Processing</h2>
              <p className="text-[#626B63]">
                When you drag and drop a PDF or image into the RELEAF Studio, the file is loaded into the browser memory using the Web File API and Object URLs. Parsing, vector conversion, element deletion, and PDF generation (via jsPDF) occur exclusively in your device RAM.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">2. DocumentGuard Client Security</h2>
              <p className="text-[#626B63]">
                DocumentGuard rule heuristics run client-side. Keyword analysis for academic credential forgery or financial invoice alterations happens in JavaScript memory without telemetry ingestion.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">3. No Persistent Cloud Storage</h2>
              <p className="text-[#626B63]">
                RELEAF does not require user accounts, passwords, or tracking cookies for this prototype demonstration. Refreshing or closing the tab completely clears the active document from browser memory.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">4. AI Assistant Ingestion</h2>
              <p className="text-[#626B63]">
                The AI Assistant operates in client-side demonstration mode with mocked responses. No user document contents are sent to external LLM providers during demo execution.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
