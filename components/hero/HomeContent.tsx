"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Scan,
  Sparkles,
  Layers,
  Printer,
  Shield,
  Recycle,
  BarChart3,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  MoveUpRight,
  Sliders,
  Check,
  Zap,
  MousePointer2,
} from "lucide-react";
import PaperSceneLoader from "@/components/three/PaperSceneLoader";

// ── Hero Section ───────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-dot-pattern"
      aria-labelledby="hero-heading"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-lime/10 blur-[140px]" />
      </div>

      <div className="container-narrow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-2xs mb-6 text-xs font-semibold text-forest"
            >
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span>Smart Paper Restoration & AI Editing</span>
              <span className="text-black/20">•</span>
              <span className="text-primary font-bold">Hackathon 2026</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-forest tracking-tight leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Give Every Sheet{" "}
              <span className="relative inline-block text-primary">
                Another Life.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-lime opacity-80"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="6" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-charcoal/70 leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet RELEAF — an intelligent paper-restoration and document-editing experience designed to help you correct documents, explore paper reuse, and print smarter.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Open Workspace Studio</span>
                <ArrowRight className="w-4 h-4 text-lime" aria-hidden="true" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-sage-light text-forest border border-black/10 font-bold text-sm shadow-2xs hover:shadow-xs transition-all"
              >
                <span>See How It Works</span>
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <p className="text-xl font-black text-forest">1–2 Cycles</p>
                <p className="text-[11px] text-charcoal/60">Recommended Reuse</p>
              </div>
              <div>
                <p className="text-xl font-black text-forest">100% Client</p>
                <p className="text-[11px] text-charcoal/60">Zero Cloud Upload</p>
              </div>
              <div>
                <p className="text-xl font-black text-primary">Canva-Grade</p>
                <p className="text-[11px] text-charcoal/60">Interactive Editor</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Paper Restoration Scene */}
          <motion.div
            className="lg:col-span-5 h-[420px] lg:h-[520px] relative rounded-3xl bg-radial from-white to-sage/30 border border-black/10 shadow-lg p-2 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-black/10 text-[11px] font-semibold text-forest shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>3D Paper Substrate Engine</span>
            </div>

            <div className="flex-1 w-full h-full relative">
              <PaperSceneLoader />
            </div>

            <div className="p-3 bg-white/90 backdrop-blur-xs border-t border-black/5 rounded-b-2xl flex items-center justify-between text-[11px] text-charcoal/60">
              <span>Interactive paper transformation simulation</span>
              <span className="sim-badge">SIMULATION</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section ───────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: Scan,
      title: "Import Your Document",
      desc: "Drag and drop any PDF, PNG, or JPG file into the Studio. RELEAF parses vector elements and typography locally in your browser.",
    },
    {
      num: "02",
      icon: MousePointer2,
      title: "Canva-Style Visual Editing",
      desc: "Select, move, format, or delete unwanted paragraphs and misprinted sections with simple mouse clicks and keyboard shortcuts.",
    },
    {
      num: "03",
      icon: Layers,
      title: "Simulate Selective De-Inking",
      desc: "Preview the targeted physical ink removal mask calculated to lift only the modified coordinates, preserving paper fibres.",
      sim: true,
    },
    {
      num: "04",
      icon: Printer,
      title: "Reprint on the Same Sheet",
      desc: "Feed the refreshed page back into the printer. RELEAF automatically tracks sheet reuse cycles to protect quality.",
      sim: true,
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-black/5" aria-labelledby="how-heading">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="pill-badge mb-3">Workflow Lifecycle</span>
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight mb-4">
            Four Steps from Waste to Reuse
          </h2>
          <p className="text-sm sm:text-base text-charcoal/60">
            A seamless bridge between digital document correction and sustainable paper lifecycle management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, icon: Icon, title, desc, sim }, i) => (
            <div
              key={num}
              className="p-6 rounded-2xl bg-[#F9F8F3] border border-black/5 card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {num}
                  </span>
                  {sim && <span className="sim-badge">SIM</span>}
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-forest mb-4 shadow-2xs">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base text-forest mb-2">{title}</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Capabilities Grid ────────────────────────────────────────────────
function FeaturesSection() {
  const capabilities = [
    {
      icon: MousePointer2,
      title: "Canva-Style Document Studio",
      desc: "Click any paragraph or text block on an uploaded document to select, edit, reformat, or delete it with Delete key.",
      badge: "UPDATED",
    },
    {
      icon: Layers,
      title: "Selective De-Inking Matrix",
      desc: "Simulate micron-targeted ink removal for text corrections without needing to pulp or discard the paper sheet.",
      badge: "SIMULATION",
    },
    {
      icon: Sparkles,
      title: "AI Document Restoration",
      desc: "Automatic spelling, grammatical readability, and draft notes repair before sending documents to print.",
    },
    {
      icon: Shield,
      title: "DocumentGuard Integrity",
      desc: "Classifies documents against certificate/academic forgery and financial alterations with GREEN/AMBER/RED gates.",
    },
    {
      icon: Sliders,
      title: "Paper Matrix Selector",
      desc: "Full compatibility database across A3–A6, Letter, Legal, Bond, Notebook, and Recycled substrates.",
    },
    {
      icon: BarChart3,
      title: "Environmental Ledger",
      desc: "Session analytics tracking sheets saved, cycle degradation metrics, and zero-waste office impact.",
    },
  ];

  return (
    <section className="py-24 bg-[#F9F8F3]" aria-labelledby="features-heading">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="pill-badge mb-3">Core Innovations</span>
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight mb-4">
            Engineering a Smarter Paper Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-charcoal/60">
            Hardware innovation paired with browser-native visual editing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map(({ icon: Icon, title, desc, badge }) => (
            <div
              key={title}
              className="p-7 rounded-2xl bg-white border border-black/5 card-hover shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-forest text-lime flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  {badge && <span className="sim-badge">{badge}</span>}
                </div>
                <h3 className="font-bold text-lg text-forest mb-2">{title}</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">{desc}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-black/5">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-forest transition-colors"
                >
                  <span>Explore capability</span>
                  <MoveUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Interactive Demo Section ──────────────────────────────────────────────────
function InteractiveDemoSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-forest text-white" aria-labelledby="demo-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-lime text-xs font-semibold mb-4 border border-white/15">
              <Zap className="w-3 h-3" />
              <span>Interactive Simulator</span>
            </span>

            <h2 id="demo-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Watch Selective De-Inking in Real Time
            </h2>
            <p className="text-sage/70 text-sm leading-relaxed mb-6">
              Experience how RELEAF identifies ink coordinates, releases pigmentation without pulp damage, and preps the paper for fresh printing.
            </p>

            <div className="space-y-3">
              {[
                { step: 1, title: "1. Identify Error Region", desc: "Select unwanted typo or superseded paragraph" },
                { step: 2, title: "2. Targeted Laser/Solvent", desc: "Simulate ink dissolution on selected coordinates" },
                { step: 3, title: "3. Clean Sheet Restored", desc: "Sheet ready for reprint on the exact same physical page" },
              ].map(({ step, title, desc }) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeStep === step
                      ? "bg-white/10 border-lime text-white shadow-md"
                      : "bg-white/5 border-white/5 text-sage/70 hover:bg-white/10"
                  }`}
                >
                  <p className="font-bold text-sm text-lime">{title}</p>
                  <p className="text-xs text-sage/60 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-md"
              >
                <span>Try Studio on Your Own PDF</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Demonstration Graphic */}
          <div className="lg:col-span-7 bg-[#0A1E14] border border-white/15 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="font-mono text-sage/60 ml-2">RELEAF-Chamber-Preview.sim</span>
              </div>
              <span className="sim-badge">STEP {activeStep} OF 3</span>
            </div>

            {/* Simulated Paper Sheet */}
            <div className="bg-[#FCFBF7] text-[#202821] p-8 rounded-xl shadow-lg relative min-h-[340px] flex flex-col justify-between select-none">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-black/10 pb-3">
                  <div>
                    <p className="font-bold text-sm text-forest uppercase">Corporate Sustainability Memo</p>
                    <p className="text-[10px] text-charcoal/50">Doc ID: #RLF-8921 • Page 1 of 1</p>
                  </div>
                  <span className="text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">A4 BOND</span>
                </div>

                <p className="text-xs text-charcoal/70">
                  This report summarizes office paper conservation goals. All regional facilities are transitioning to smart circular printing workflows.
                </p>

                {/* Targeted Error Line */}
                <div
                  className={`p-3 rounded-lg border transition-all ${
                    activeStep === 1
                      ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-300"
                      : activeStep === 2
                      ? "bg-amber-500/20 border-dashed border-amber-600 animate-pulse text-amber-900"
                      : "bg-green-50 border-green-300 text-green-900"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold">
                      {activeStep === 1
                        ? "MARKED FOR DE-INKING"
                        : activeStep === 2
                        ? "SOLVENT CHAMBER ACTIVE"
                        : "REPRINTED FRESH TEXT"}
                    </span>
                    <span className="text-charcoal/50">Coordinates: [X:14%, Y:42%]</span>
                  </div>
                  <p className="text-xs font-semibold">
                    {activeStep === 3
                      ? "Corrected: The regional review is scheduled for Tuesday."
                      : 'Draft: The meeting is "schedueled" for Tuseday next week.'}
                  </p>
                </div>

                <p className="text-xs text-charcoal/70">
                  By isolating ink dissolution to this single bounding box, 95% of the sheet remains structurally unaltered and immediately reprintable.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between text-[10px] text-charcoal/40">
                <span>RELEAF Photothermal Hardware Prototype</span>
                <span className="text-green-700 font-semibold font-mono">FIBRE INTEGRITY: 98.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA Section ─────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-24 bg-white border-t border-black/5" aria-labelledby="cta-heading">
      <div className="container-narrow">
        <div className="rounded-3xl bg-radial from-forest to-[#0D281C] text-white p-12 lg:p-16 relative overflow-hidden shadow-xl text-center max-w-4xl mx-auto">
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-lime text-xs font-semibold border border-white/15">
              <Leaf className="w-3.5 h-3.5" />
              <span>Sustainable Innovation</span>
            </span>

            <h2 id="cta-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Give Your Documents Another Life?
            </h2>

            <p className="text-sage/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Experience the Canva-grade interactive document editor and simulate selective de-inking directly in your browser.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-lime text-forest font-bold text-sm shadow-md hover:bg-white transition-all hover:-translate-y-0.5"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/paper-compatibility"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-all"
              >
                <span>Check Paper Compatibility</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Export Home Content Assembly ──────────────────────────────────────────────
export default function HomeContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <FinalCTASection />
    </main>
  );
}
