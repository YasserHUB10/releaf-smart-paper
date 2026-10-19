import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "RELEAF terms of use for the prototype demonstration.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow max-w-3xl">
          <h1 className="text-4xl font-bold text-forest mb-2">Terms of Use</h1>
          <p className="text-charcoal/50 text-sm mb-10">
            Prototype version — October 2026
          </p>

          <div className="bg-white rounded-2xl border border-sage/40 p-8 space-y-8 text-sm text-charcoal/80 leading-relaxed">
            <section aria-labelledby="terms-scope">
              <h2 id="terms-scope" className="text-lg font-bold text-forest mb-3">
                1. Prototype Status
              </h2>
              <p>
                RELEAF is a concept prototype presented for hackathon and investor
                demonstration purposes. It is not a commercially released product.
                Features described as simulations do not represent operational
                hardware capabilities.
              </p>
            </section>

            <section aria-labelledby="terms-use">
              <h2 id="terms-use" className="text-lg font-bold text-forest mb-3">
                2. Permitted Use
              </h2>
              <p className="mb-2">
                You may use RELEAF to explore the demonstration features,
                understand the product concept, and evaluate the application for
                your own purposes.
              </p>
              <p>
                You must not use RELEAF to facilitate fraudulent document
                alterations, misrepresent simulated outputs as genuine hardware
                results, or claim that simulation outputs are official or
                verified documents.
              </p>
            </section>

            <section aria-labelledby="terms-limitations">
              <h2 id="terms-limitations" className="text-lg font-bold text-forest mb-3">
                3. Limitations of Liability
              </h2>
              <p>
                RELEAF is provided as-is for demonstration purposes. No
                warranties are made regarding the accuracy of AI suggestions,
                the effectiveness of simulated de-inking demonstrations, or the
                suitability of the application for any specific use case.
              </p>
            </section>

            <section aria-labelledby="terms-fraud">
              <h2 id="terms-fraud" className="text-lg font-bold text-forest mb-3">
                4. Anti-Fraud Commitment
              </h2>
              <p>
                DocumentGuard is designed to prevent fraudulent document
                alteration. Users must not attempt to circumvent security
                controls or use RELEAF to create misleading or fraudulent
                documents. Blocked operations are logged with the reason for
                blocking.
              </p>
            </section>

            <section aria-labelledby="terms-changes">
              <h2 id="terms-changes" className="text-lg font-bold text-forest mb-3">
                5. Changes
              </h2>
              <p>
                These terms apply to the current prototype version. Terms will
                be updated as the product matures toward a commercial release.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
