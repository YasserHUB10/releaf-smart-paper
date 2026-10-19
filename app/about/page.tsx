import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Trees, Recycle, Sparkles, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About RELEAF — Philosophy & Vision",
  description: "About RELEAF — the sustainable smart paper restoration and circular reuse concept for modern workplaces.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="lime-tag">OUR PHILOSOPHY</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Rethinking the Life of Paper
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              Paper is not a single-use consumable. It is a high-grade engineered cellulose matrix capable of circular reuse.
            </p>
          </div>

          {/* Problem Statement Card */}
          <section className="bg-[#FFFDF7] rounded-xs p-8 sm:p-10 border-2 border-[#123B2A] shadow-md mb-8 space-y-4">
            <div className="w-12 h-12 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
              <Trees className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-[#123B2A] tracking-tight">The Single-Use Paper Crisis</h2>
            <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">
              Over 40% of all wood harvested globally is channeled directly into industrial paper production. Despite decades of digital transformation, enterprise offices print billions of single-use drafts, agreements, agendas, and misprints every month — only to discard them into shredders within 24 hours.
            </p>
            <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">
              Standard paper recycling requires significant water, harsh bleaching agents, and chemical repulping that breaks down delicate cellulose fibres. RELEAF challenges this paradigm with <strong>micro-targeted in-situ restoration</strong>.
            </p>
          </section>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#123B2A]">1. Selective De-Inking</h3>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Rather than treating the whole page, RELEAF calculates exact coordinates for ink removal, leaving 90%+ of the sheet completely untouched.
              </p>
            </div>

            <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#123B2A]">2. AI-Powered Studio</h3>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Browser-native Canva-style editing lets you click and edit paragraphs directly before printing, catching misprints in-browser.
              </p>
            </div>

            <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#123B2A]">3. DocumentGuard</h3>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Built-in classification protects certificates, degrees, and financial invoices from deceptive alterations.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="p-8 rounded-xs bg-[#123B2A] text-[#FFFDF7] border-2 border-[#123B2A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-black text-xl text-[#FFFDF7]">Experience the Future of Paper</h3>
              <p className="text-xs text-[#DDE6D8]/80 mt-1">Try the interactive Canva-style studio and simulated de-inking chamber.</p>
            </div>
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#D6FF52] text-[#123B2A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#E5FF85] transition-all shrink-0"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
