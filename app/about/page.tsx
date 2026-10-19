import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Leaf, Printer, Sparkles, Shield, ArrowRight, CheckCircle2, Trees, Recycle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About RELEAF",
  description: "About RELEAF — the sustainable smart paper restoration and circular reuse concept for modern workplaces.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill-badge mb-3">Our Mission</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Rethinking the Life of Paper
            </h1>
            <p className="text-charcoal/70 text-base leading-relaxed">
              Paper is not a single-use consumable. It is a high-grade engineered cellulose matrix capable of circular reuse.
            </p>
          </div>

          {/* Problem Statement Card */}
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-black/5 shadow-xs mb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest text-lime flex items-center justify-center">
              <Trees className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-forest">The Single-Use Paper Crisis</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Over 40% of all wood harvested globally is channeled directly into industrial paper production. Despite decades of digital transformation, enterprise offices print billions of single-use drafts, agreements, agendas, and misprints every month — only to discard them into shredders within 24 hours.
            </p>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Standard paper recycling requires significant water, harsh bleaching agents, and chemical repulping that breaks down delicate cellulose fibres. RELEAF challenges this paradigm with <strong>micro-targeted in-situ restoration</strong>.
            </p>
          </section>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest text-lime flex items-center justify-center">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest">1. Selective De-Inking</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Rather than treating the whole page, RELEAF calculates exact coordinates for ink removal, leaving 90%+ of the sheet completely untouched.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest text-lime flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest">2. AI-Powered Studio</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Canva-grade browser visual editing allows anyone to click, drag, delete, or correct text elements before committing to print.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest text-lime flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-forest">3. DocumentGuard</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                A non-negotiable security gate prevents fraudulent alteration of sensitive credentials, certificates, and financial balances.
              </p>
            </div>
          </div>

          {/* Prototype Disclosure Card */}
          <section className="bg-forest text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4 mb-12">
            <span className="text-[10px] font-mono uppercase bg-lime/20 text-lime px-2.5 py-1 rounded-full border border-lime/30 w-fit block">
              ENGINEERING TRANSPARENCY
            </span>
            <h2 className="text-2xl font-black text-white">Prototype Status & Hardware Roadmap</h2>
            <p className="text-sm text-sage/80 leading-relaxed">
              Physical photothermal de-inking chambers and specialized ink release lasers are under active hardware development. All ink-removal processes on this website operate as interactive simulations to demonstrate the end-to-end user workflow.
            </p>
            <p className="text-sm text-sage/80 leading-relaxed">
              We never fabricate environmental statistics or pretend that software alone cleans physical paper. We believe in open, verifiable environmental engineering.
            </p>

            <div className="pt-4">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-md"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
