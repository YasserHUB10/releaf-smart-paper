import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Prototype Terms of Use",
  description: "Terms of use and prototype demonstration guidelines for RELEAF.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <span className="pill-badge mb-3">Legal Guidelines</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-3">
              Terms of Use
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/60 font-mono">
              Hackathon Demonstration Edition • 2026
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/5 shadow-xs space-y-8 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">Research Prototype Notice</p>
                <p className="text-xs text-amber-900/80">
                  RELEAF is presented as an advanced technology demonstration for technology hackathons and investor evaluations. Hardware de-inking representations are interactive simulations.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">1. Acceptable Use</h2>
              <p>
                Users are encouraged to upload documents, test Canva-style visual editing, evaluate selective deletion, and experiment with paper matrix settings. You agree not to use the software to create deceptive, fraudulent, or counterfeit records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">2. Anti-Fraud & DocumentGuard Compliance</h2>
              <p>
                You acknowledge that DocumentGuard places restrictions on modifying educational diplomas, state credentials, and financial invoices. Any attempt to circumvent security rules to falsify records is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">3. Intellectual Property</h2>
              <p>
                All brand marks, logos, vector icons, Mol-Paper 3D shaders, and interface layouts are property of the RELEAF project team under the MIT demonstration license.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-forest">4. Disclaimer of Hardware Warranty</h2>
              <p>
                The digital studio simulates selective de-inking. RELEAF makes no representations that physical paper will be cleaned without compatible physical hardware chambers.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
