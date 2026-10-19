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
} from "lucide-react";
import PaperSceneLoader from "@/components/three/PaperSceneLoader";

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-cream via-white to-sage/30"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-sage/30 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-lime/20 blur-3xl" />
      </div>

      <div className="container-narrow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
                <Leaf className="w-3 h-3" aria-hidden="true" />
                Smart Paper Restoration
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-forest leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Give Every Sheet{" "}
              <span className="text-gradient">Another Life.</span>
            </motion.h1>

            <motion.p
              className="text-lg text-charcoal/70 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet RELEAF — an intelligent printing and document restoration
              system designed to help you edit, restore, and reuse paper with
              the power of AI.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Explore RELEAF
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Benefit indicators */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: Sparkles, label: "Intelligent Document Editing" },
                { icon: Recycle, label: "AI-Powered Restoration" },
                { icon: Leaf, label: "Paper Reuse Technology" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-charcoal/70"
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Scene */}
          <motion.div
            className="order-1 lg:order-2 h-[420px] lg:h-[560px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            aria-hidden="false"
          >
            <PaperSceneLoader />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: Scan,
      title: "Scan your document",
      desc: "Import an existing document or scan a printed sheet into the RELEAF workspace.",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "Edit with AI",
      desc: "Correct text, improve readability, and review AI-suggested changes to your document.",
    },
    {
      num: "03",
      icon: Layers,
      title: "Restore the paper",
      desc: "Check paper suitability and preview the de-inking process. Hardware required for physical restoration.",
      sim: true,
    },
    {
      num: "04",
      icon: Printer,
      title: "Print and reuse",
      desc: "Prepare the corrected document for printing on the same sheet when supported hardware is connected.",
      sim: true,
    },
  ];

  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="how-it-works-heading"
      id="how-it-works"
    >
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2
            id="how-it-works-heading"
            className="text-4xl font-bold text-forest mb-4"
          >
            How RELEAF Works
          </h2>
          <p className="text-charcoal/60 max-w-lg mx-auto">
            A four-step workflow from used paper to freshly printed, reused
            document.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ num, icon: Icon, title, desc, sim }, i) => (
            <motion.div
              key={num}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-8 h-px bg-sage -translate-y-0.5 z-10"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-primary/40 font-mono">
                    {num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-forest mb-2">
                  {title}
                  {sim && (
                    <span className="ml-2 sim-badge">SIM</span>
                  )}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features Grid ─────────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: Printer,
      title: "Smart Printing",
      desc: "Configure paper size, type, orientation, quality, and margins for precise printing results.",
      wide: true,
      accent: "bg-forest text-white",
    },
    {
      icon: Layers,
      title: "Intelligent De-Inking",
      desc: "Preview and simulate the selective ink removal process that enables paper reuse.",
      wide: false,
      accent: "bg-lime text-forest",
      sim: true,
    },
    {
      icon: Sparkles,
      title: "AI Document Restoration",
      desc: "Automatically correct spelling, grammar, and damaged content using AI suggestions.",
      wide: false,
      accent: "bg-sage text-forest",
    },
    {
      icon: Shield,
      title: "DocumentGuard",
      desc: "Protect document integrity, detect sensitive content, and prevent fraudulent alterations.",
      wide: false,
      accent: "bg-primary text-white",
    },
    {
      icon: Recycle,
      title: "Paper Reuse Tracking",
      desc: "Track sheets through their reuse lifecycle and monitor compatibility across cycles.",
      wide: false,
      accent: "bg-sage text-forest",
    },
    {
      icon: BarChart3,
      title: "Environmental Dashboard",
      desc: "View estimated impact data and reuse statistics. Labelled as estimates until hardware data is available.",
      wide: true,
      accent: "bg-white border-2 border-sage text-forest",
    },
  ];

  return (
    <section
      className="py-24 bg-cream"
      aria-labelledby="features-heading"
    >
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2
            id="features-heading"
            className="text-4xl font-bold text-forest mb-4"
          >
            Core Capabilities
          </h2>
          <p className="text-charcoal/60 max-w-lg mx-auto">
            Every tool you need to intelligently manage, restore, and reuse
            paper documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, wide, accent, sim }, i) => (
            <motion.div
              key={title}
              className={`${wide ? "md:col-span-2" : ""} ${accent} rounded-2xl p-7 flex flex-col gap-4`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Icon className="w-7 h-7 opacity-80" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {title}
                  {sim && <span className="ml-2 sim-badge">SIMULATION</span>}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">{desc}</p>
              </div>
              <Link
                href={`/features#${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity self-start"
              >
                Learn more
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Interactive Demo ──────────────────────────────────────────────────────────
const DEMO_STEPS = [
  {
    id: "original",
    label: "Original Document",
    content: (
      <>
        <p className="text-sm text-charcoal/50 mb-3 font-mono">SAMPLE-DOC-001.pdf</p>
        <div className="space-y-2">
          <div className="h-3 bg-charcoal/20 rounded w-full" />
          <div className="h-3 bg-charcoal/20 rounded w-5/6" />
          <div className="h-8 bg-primary/10 border border-primary/30 rounded flex items-center px-3 gap-2">
            <span className="text-xs text-charcoal">
              The meeting is schedueled for Tuseday.
            </span>
          </div>
          <div className="h-3 bg-charcoal/20 rounded w-4/6" />
          <div className="h-3 bg-charcoal/20 rounded w-full" />
        </div>
      </>
    ),
    note: "Select text to edit",
  },
  {
    id: "selected",
    label: "Text Selected",
    content: (
      <>
        <p className="text-sm text-charcoal/50 mb-3 font-mono">SAMPLE-DOC-001.pdf</p>
        <div className="space-y-2">
          <div className="h-3 bg-charcoal/20 rounded w-full" />
          <div className="h-3 bg-charcoal/20 rounded w-5/6" />
          <div className="h-8 bg-lime/40 border-2 border-lime rounded flex items-center px-3 gap-2">
            <span className="text-xs text-charcoal font-semibold bg-lime/60 px-1 rounded">
              schedueled for Tuseday
            </span>
            <span className="text-xs text-charcoal/50">→ selected</span>
          </div>
          <div className="h-3 bg-charcoal/20 rounded w-4/6" />
          <div className="h-3 bg-charcoal/20 rounded w-full" />
        </div>
      </>
    ),
    note: "AI suggests correction",
  },
  {
    id: "corrected",
    label: "Correction Applied",
    content: (
      <>
        <p className="text-sm text-charcoal/50 mb-3 font-mono">SAMPLE-DOC-001.pdf — EDITED</p>
        <div className="space-y-2">
          <div className="h-3 bg-charcoal/20 rounded w-full" />
          <div className="h-3 bg-charcoal/20 rounded w-5/6" />
          <div className="h-8 bg-green-50 border border-green-300 rounded flex items-center px-3 gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-charcoal">
              The meeting is{" "}
              <span className="font-semibold text-green-700 underline">
                scheduled for Tuesday.
              </span>
            </span>
          </div>
          <div className="h-3 bg-charcoal/20 rounded w-4/6" />
          <div className="h-3 bg-charcoal/20 rounded w-full" />
        </div>
      </>
    ),
    note: "De-inking region identified",
  },
  {
    id: "deinked",
    label: "De-Inking Region",
    content: (
      <>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm text-charcoal/50 font-mono">SAMPLE-DOC-001.pdf</p>
          <span className="sim-badge">SIMULATION</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-charcoal/20 rounded w-full" />
          <div className="h-3 bg-charcoal/20 rounded w-5/6" />
          <div className="h-16 bg-amber-50 border-2 border-amber-400 rounded flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden="true" />
            <span className="text-xs text-amber-800 font-medium">
              Physical de-inking region — compatible hardware required
            </span>
          </div>
          <div className="h-3 bg-charcoal/20 rounded w-4/6" />
          <div className="h-3 bg-charcoal/20 rounded w-full" />
        </div>
      </>
    ),
    note: "Simulation complete",
  },
];

function DemoSection() {
  const [step, setStep] = useState(0);

  const current = DEMO_STEPS[step];

  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="demo-heading"
    >
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Explanation */}
          <div>
            <h2 id="demo-heading" className="text-4xl font-bold text-forest mb-4">
              See RELEAF in Action
            </h2>
            <p className="text-charcoal/60 leading-relaxed mb-8">
              This interactive demonstration shows how RELEAF processes a
              document. The content is fictional and clearly labelled. Physical
              ink removal requires compatible hardware.
            </p>

            {/* Step nav */}
            <div className="space-y-3">
              {DEMO_STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
                    step === i
                      ? "border-primary bg-primary/5"
                      : "border-sage bg-white hover:border-primary/40"
                  }`}
                  aria-current={step === i ? "step" : undefined}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      step === i
                        ? "bg-primary text-white"
                        : i < step
                        ? "bg-green-500 text-white"
                        : "bg-sage text-charcoal/50"
                    }`}
                    aria-hidden="true"
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${step === i ? "text-primary" : "text-charcoal"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-charcoal/50">{s.note}</p>
                  </div>
                  {step === i && (
                    <ChevronRight className="w-4 h-4 text-primary ml-auto" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep((s) => Math.min(s + 1, DEMO_STEPS.length - 1))}
                disabled={step === DEMO_STEPS.length - 1}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {step === DEMO_STEPS.length - 1 ? "Complete" : "Next Step →"}
              </button>
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-sage text-charcoal text-sm hover:bg-sage/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Restart
              </button>
            </div>
          </div>

          {/* Document preview */}
          <div className="bg-sage/20 rounded-2xl p-6 border border-sage">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-amber-400" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-green-400" aria-hidden="true" />
              <span className="ml-2 text-xs text-charcoal/40 font-mono">
                RELEAF Document Viewer
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl p-5 shadow-sm min-h-[200px]"
              >
                {current.content}
              </motion.div>
            </AnimatePresence>
            <p className="text-center text-xs text-charcoal/40 mt-4">
              Sample content — not a real document
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Environmental Mission ─────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section
      className="py-24 bg-forest text-white"
      aria-labelledby="mission-heading"
    >
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="mission-heading" className="text-4xl font-bold mb-6">
              Why Paper Reuse Matters
            </h2>
            <p className="text-sage/80 leading-relaxed mb-6">
              Paper production is resource-intensive. Many printed documents are
              used briefly and discarded, even when the paper itself remains
              perfectly intact. RELEAF explores a smarter workflow: identify
              what needs to change, change it digitally, and return the same
              sheet to use.
            </p>
            <p className="text-sage/80 leading-relaxed mb-8">
              The physical de-inking technology is under development. Impact
              figures will be measured once hardware enters testing. Until then,
              we build the software infrastructure that will make reuse seamless.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-lime font-semibold hover:opacity-80 transition-opacity underline-offset-4 hover:underline"
            >
              Learn about our mission
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Paper lifecycle visual */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Cycle ring */}
              <div className="w-64 h-64 rounded-full border-4 border-primary/40 border-dashed flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-lime" aria-hidden="true" />
                </div>
              </div>

              {/* Cycle labels */}
              {[
                { label: "Print", angle: -60, icon: Printer },
                { label: "Use", angle: 60, icon: CheckCircle2 },
                { label: "Scan", angle: 180, icon: Scan },
                { label: "Edit", angle: 300, icon: Sparkles },
                { label: "Restore", angle: 420, icon: Recycle },
              ].map(({ label, angle, icon: Icon }, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 140;
                const y = Math.sin(rad) * 140;
                return (
                  <div
                    key={label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-lime" aria-hidden="true" />
                    </div>
                    <span className="text-xs text-sage font-medium whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-cream" aria-labelledby="cta-heading">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="cta-heading" className="text-5xl font-bold text-forest mb-4">
            Ready to Rethink Printing?
          </h2>
          <p className="text-charcoal/60 max-w-lg mx-auto mb-10 text-lg">
            Explore a smarter approach to document editing, restoration, and
            paper reuse.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-forest transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Open RELEAF Workspace
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Learn How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DemoSection />
      <MissionSection />
      <CTASection />
    </main>
  );
}
