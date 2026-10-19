import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RELEAF privacy policy — how we handle your documents and data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow max-w-3xl">
          <h1 className="text-4xl font-bold text-forest mb-2">Privacy Policy</h1>
          <p className="text-charcoal/50 text-sm mb-10">
            Last updated: October 2026 — Prototype version
          </p>

          <div className="bg-white rounded-2xl border border-sage/40 p-8 space-y-8 text-sm text-charcoal/80 leading-relaxed">
            <section aria-labelledby="privacy-scope">
              <h2 id="privacy-scope" className="text-lg font-bold text-forest mb-3">
                1. Scope
              </h2>
              <p>
                This privacy notice applies to the RELEAF prototype web
                application. RELEAF is a concept product demonstrated for
                hackathon and investor purposes. This notice explains how
                documents and data are handled within the current version.
              </p>
            </section>

            <section aria-labelledby="privacy-documents">
              <h2 id="privacy-documents" className="text-lg font-bold text-forest mb-3">
                2. Document Handling
              </h2>
              <p className="mb-2">
                In the current prototype, documents uploaded to the RELEAF
                workspace are processed <strong>entirely within your browser</strong>. No document content is transmitted to any server.
              </p>
              <p>
                If you choose to use an AI feature with a configured API key,
                you will be informed before any document content is sent to an
                external AI provider. Consent is required before transmission.
                Document content will not be logged unnecessarily.
              </p>
            </section>

            <section aria-labelledby="privacy-data">
              <h2 id="privacy-data" className="text-lg font-bold text-forest mb-3">
                3. Usage Data
              </h2>
              <p>
                The prototype does not implement persistent user accounts or
                cloud storage. No usage analytics are collected in the current
                version. Session data exists only in your browser memory and is
                cleared when you close the tab.
              </p>
            </section>

            <section aria-labelledby="privacy-ai">
              <h2 id="privacy-ai" className="text-lg font-bold text-forest mb-3">
                4. AI Integration
              </h2>
              <p>
                When an AI API key is configured: requests are validated,
                document content is sent to the configured AI provider only with
                your consent, responses are presented as suggestions for your
                review, and API credentials are stored as server-side
                environment variables and never exposed to the browser.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2 id="privacy-security" className="text-lg font-bold text-forest mb-3">
                5. Security
              </h2>
              <p>
                DocumentGuard operates as a client-side demonstration in this
                prototype. For production deployments, security decisions must
                be enforced server-side. Sensitive document operations should
                not rely solely on client-side checks.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-lg font-bold text-forest mb-3">
                6. Contact
              </h2>
              <p>
                RELEAF is a concept prototype with no commercial release. No
                contact address is provided at this stage to avoid publishing
                fabricated information. For questions about this demonstration,
                refer to the project GitHub repository.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
