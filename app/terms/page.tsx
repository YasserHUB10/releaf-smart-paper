import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Prototype Terms of Use — RELEAF",
  description: "Terms of use and prototype demonstration guidelines for RELEAF.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12 space-y-3">
            <span className="lime-tag">LEGAL GUIDELINES</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Terms of Use
            </h1>
            <p className="text-xs sm:text-sm text-[#626B63] font-mono">
              Hackathon Demonstration Edition • 2026
            </p>
          </div>

          <div className="bg-[#FFFDF7] rounded-xs p-8 sm:p-10 border-2 border-[#123B2A] shadow-md space-y-8 text-xs sm:text-sm text-[#17201B] leading-relaxed">
            <div className="p-4 rounded-xs bg-[#FFFBEB] border-2 border-[#FDE68A] text-[#92400E] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase font-mono">Research Prototype Notice</p>
                <p className="text-xs text-[#92400E]">
                  RELEAF is presented as an advanced technology demonstration for technology hackathons and investor evaluations. Hardware de-inking representations are interactive simulations.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">1. Acceptable Use</h2>
              <p className="text-[#626B63]">
                Users are encouraged to upload documents, test Canva-style visual editing, evaluate selective deletion, and experiment with paper matrix settings. You agree not to use the software to create deceptive, fraudulent, or counterfeit records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">2. Anti-Fraud & DocumentGuard Compliance</h2>
              <p className="text-[#626B63]">
                You acknowledge that DocumentGuard places restrictions on modifying educational diplomas, state credentials, and financial invoices. Any attempt to circumvent security rules to falsify records is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">3. Intellectual Property</h2>
              <p className="text-[#626B63]">
                All brand marks, logos, vector icons, 3D paper substrate shaders, and interface layouts are property of the RELEAF project team under the MIT demonstration license.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-[#123B2A]">4. Disclaimer of Hardware Warranty</h2>
              <p className="text-[#626B63]">
                Selective photothermal de-inking is simulated within this web application. RELEAF makes no commercial warranty regarding physical chemical de-inking performance until physical certified hardware has been delivered.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
