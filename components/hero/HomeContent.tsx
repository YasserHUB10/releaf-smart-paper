"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Scan,
  Layers,
  Printer,
  Shield,
  BarChart3,
  Sliders,
  Sparkles,
  MousePointer2,
  FileText,
  RotateCcw,
} from "lucide-react";
import PaperSceneLoader from "@/components/three/PaperSceneLoader";

// ── Hero Section (Minimal, Warm Ivory & Charcoal, 2-Column Asymmetrical) ─────
function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center pt-24 pb-16 bg-[#F0EEE7]"
      aria-labelledby="hero-heading"
    >
      <div className="container-narrow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement & Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E4E1D8] border border-[#20231F]/10 text-xs font-mono text-[#575C53]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#315D46]" />
                <span>CIRCULAR PAPER R&D • 2026</span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#20231F] tracking-tight leading-[1.06]"
              >
                Give Every Sheet <br />
                <span className="font-normal italic text-[#777E62]">Another Life.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#575C53] leading-relaxed max-w-xl font-normal">
                RELEAF reimagines office paper as a reusable substrate. Combine Canva-style interactive document correction, AI restoration, and precision selective de-inking without pulp destruction.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#20231F] hover:bg-[#171A17] text-[#FAF9F5] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#20231F]"
              >
                <span>Open Workspace Studio</span>
                <ArrowRight className="w-4 h-4 text-[#A7B5A0]" aria-hidden="true" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#FAF9F5] hover:bg-[#E4E1D8] text-[#20231F] border border-[#20231F]/15 font-semibold text-xs tracking-wider uppercase transition-all"
              >
                <span>View Process</span>
              </Link>
            </div>

            {/* Architectural Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#20231F]/10 max-w-lg">
              <div>
                <p className="text-xl font-bold font-mono text-[#20231F]">1–2 Cycles</p>
                <p className="text-[11px] text-[#575C53] mt-0.5">Recommended Sheet Reuse</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-[#20231F]">100% Client</p>
                <p className="text-[11px] text-[#575C53] mt-0.5">Browser-Native Privacy</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-[#315D46]">Vector-Level</p>
                <p className="text-[11px] text-[#575C53] mt-0.5">Canva Document Editor</p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Studio 3D Scene */}
          <div className="lg:col-span-5 h-[420px] lg:h-[500px] relative rounded-2xl bg-[#E4E1D8]/60 border border-[#20231F]/10 p-3 overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#575C53] px-2 py-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#315D46]" />
                SUBSTRATE ENGINE
              </span>
              <span className="text-[10px] uppercase">R&D PROTOTYPE</span>
            </div>

            <div className="flex-1 w-full relative">
              <PaperSceneLoader />
            </div>

            <div className="px-3 py-2 bg-[#FAF9F5]/80 backdrop-blur-xs rounded border border-[#20231F]/5 flex items-center justify-between text-[11px] text-[#575C53]">
              <span>Simulated substrate de-inking transformation</span>
              <span className="sim-badge">SIMULATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Three Core Value Props (Horizontal Editorial Row) ──────────────────────────
function ValuePropsSection() {
  const items = [
    {
      num: "01",
      title: "Interactive Document Studio",
      desc: "Upload any PDF, select misprinted or outdated paragraphs, reword or delete them directly on a Canva-style canvas, and re-export.",
    },
    {
      num: "02",
      title: "Targeted Ink Ablation",
      desc: "Simulate micron-precise photothermal ink release on exact error coordinates while preserving the underlying cellulose fiber matrix.",
    },
    {
      num: "03",
      title: "Substrate & Integrity Guard",
      desc: "Validate sheet compatibility across weight categories and safeguard against unauthorized tampering with DocumentGuard verification.",
    },
  ];

  return (
    <section className="py-16 bg-[#FAF9F5] border-y border-[#20231F]/10">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#20231F]/10">
          {items.map(({ num, title, desc }, idx) => (
            <div key={num} className={`space-y-3 ${idx > 0 ? "pt-6 md:pt-0 md:pl-10" : ""}`}>
              <span className="font-mono text-xs font-bold text-[#777E62]">{num}</span>
              <h3 className="text-base font-bold text-[#20231F] tracking-tight">{title}</h3>
              <p className="text-xs text-[#575C53] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works Section (Minimal, Typographic, Editorial Flow) ───────────────
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Ingest & Vectorize Document",
      desc: "Drag and drop any PDF, PNG, or JPG file. RELEAF parses vector elements and typography locally in your browser with zero cloud storage.",
      tag: "CLIENT-SIDE",
    },
    {
      step: "02",
      title: "Direct Visual Correction",
      desc: "Click any paragraph or bounding box to select, drag, edit typography, or delete superseded text with the Delete or Backspace key.",
      tag: "CANVA-STYLE",
    },
    {
      step: "03",
      title: "Selective De-Inking Calculation",
      desc: "The system generates an ablation mask targeting only modified coordinates, preventing full-sheet chemical soaking or fiber damage.",
      tag: "SIMULATION",
    },
    {
      step: "04",
      title: "Reprint on the Same Sheet",
      desc: "Load the treated sheet back into standard tray feeds. RELEAF tracks lifecycle counts to maintain safe print quality.",
      tag: "CIRCULAR",
    },
  ];

  return (
    <section className="py-24 bg-[#F0EEE7]" aria-labelledby="how-heading">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase text-[#777E62] tracking-wider">
              Lifecycle Engineering
            </span>
            <h2 id="how-heading" className="text-3xl sm:text-4xl font-black text-[#20231F] tracking-tight">
              From Print Defect to Restored Substrate
            </h2>
          </div>
          <p className="text-xs text-[#575C53] max-w-sm leading-relaxed">
            Eliminating unnecessary re-prints by bridging browser document editing with physical de-inking chamber simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, desc, tag }) => (
            <div
              key={step}
              className="p-6 rounded-lg bg-[#FAF9F5] border border-[#20231F]/10 flex flex-col justify-between space-y-6 hover:border-[#315D46]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#20231F] bg-[#E4E1D8] px-2 py-0.5 rounded">
                    {step}
                  </span>
                  <span className="text-[10px] font-mono text-[#777E62] uppercase tracking-wider">
                    {tag}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#20231F] leading-snug">{title}</h3>
                <p className="text-xs text-[#575C53] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Interactive De-Inking Demonstration (Deep Charcoal Contrast Section) ─────
function InteractiveDemoSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-[#171A17] text-[#FAF9F5]" aria-labelledby="demo-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#A7B5A0] tracking-wider">
                Hardware Chamber Emulation
              </span>
              <h2 id="demo-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-[#FAF9F5]">
                Coordinate-Targeted De-Inking Chamber
              </h2>
              <p className="text-xs text-[#A7B5A0] leading-relaxed">
                Rather than pulping entire sheets or dumping them into recycling bins, RELEAF calculates precise bounding coordinates to dissolve ink without destroying cellulose bonding.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { step: 1, label: "01. Scan & Map Coordinates", detail: "Identify misprinted text or outdated legal clauses" },
                { step: 2, label: "02. Apply Photothermal Release", detail: "Targeted wavelength lifts surface ink pigment" },
                { step: 3, label: "03. Calibrated Fresh Substrate", detail: "Original paper sheet restored for corrected printing" },
              ].map(({ step, label, detail }) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`w-full text-left p-4 rounded-md border transition-all ${
                    activeStep === step
                      ? "bg-[#20231F] border-[#A7B5A0] text-[#FAF9F5] shadow-xs"
                      : "bg-[#20231F]/40 border-[#20231F] text-[#A7B5A0] hover:bg-[#20231F]/70"
                  }`}
                >
                  <p className="font-mono text-xs font-bold text-[#FAF9F5]">{label}</p>
                  <p className="text-[11px] text-[#A7B5A0] mt-0.5">{detail}</p>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#FAF9F5] text-[#171A17] font-semibold text-xs tracking-wider uppercase hover:bg-[#E4E1D8] transition-all"
              >
                <span>Test With Your Own Document</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#315D46]" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Precision Simulated Paper Canvas */}
          <div className="lg:col-span-7 bg-[#20231F] border border-[#FAF9F5]/10 rounded-xl p-6 lg:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF9F5]/10 text-xs font-mono">
              <span className="text-[#A7B5A0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#315D46]" />
                CHAMBER_EMULATOR_V2.log
              </span>
              <span className="sim-badge">STEP {activeStep} / 3</span>
            </div>

            {/* Simulated Paper Sheet */}
            <div className="bg-[#FAF9F5] text-[#20231F] p-7 rounded-lg min-h-[320px] flex flex-col justify-between select-none shadow-sm font-sans">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-[#20231F]/10 pb-3">
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider text-[#20231F]">
                      Internal Operations Directive
                    </p>
                    <p className="text-[10px] font-mono text-[#575C53]">DOC_REF: #RLF-2026-X • CYCLE 1</p>
                  </div>
                  <span className="text-[10px] font-mono bg-[#E4E1D8] text-[#20231F] px-2 py-0.5 rounded">
                    80 GSM BOND
                  </span>
                </div>

                <p className="text-xs text-[#575C53] leading-relaxed">
                  Notice: All regional dispatch facilities must verify shipment packaging standards prior to quarterly inventory distribution.
                </p>

                {/* Target Editable Box */}
                <div
                  className={`p-3 rounded border transition-all ${
                    activeStep === 1
                      ? "bg-[#FFFBEB] border-[#FDE68A] text-[#78350F]"
                      : activeStep === 2
                      ? "bg-[#EBF2EC] border-[#CADBCF] text-[#315D46] border-dashed animate-pulse"
                      : "bg-[#FAF9F5] border-[#20231F]/20 text-[#20231F]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold">
                      {activeStep === 1
                        ? "[FLAGGED FOR INK REMOVAL]"
                        : activeStep === 2
                        ? "[DE-INKING CHAMBER ACTIVE]"
                        : "[CORRECTED REPRINTED TEXT]"}
                    </span>
                    <span className="text-[#575C53]">Coord: X:14mm, Y:62mm</span>
                  </div>
                  <p className="text-xs font-medium">
                    {activeStep === 3
                      ? "Corrected: The mandatory compliance audit takes place on November 14."
                      : 'Draft Error: The mandatory "complaince" audit takes place on "Novemeber 14".'}
                  </p>
                </div>

                <p className="text-xs text-[#575C53] leading-relaxed">
                  Only the targeted bounding box underwent pigment removal. Surrounding header lines, signatures, and paper fibers remain 100% intact.
                </p>
              </div>

              <div className="pt-4 border-t border-[#20231F]/10 flex items-center justify-between text-[10px] font-mono text-[#575C53]">
                <span>Photothermal Laser Simulation</span>
                <span className="text-[#315D46] font-bold">FIBER RETENTION: 98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Capabilities Grid (Clean Soft Stone & Warm Neutral) ────────────────────────
function CapabilitiesSection() {
  const capabilities = [
    {
      icon: MousePointer2,
      title: "Canva-Style Canvas Studio",
      desc: "Click any paragraph or image element on an uploaded document to select, drag, edit typography, or delete directly.",
      badge: "UPDATED",
    },
    {
      icon: Layers,
      title: "Selective De-Inking Calculation",
      desc: "Simulate micron-targeted ink removal for text corrections without needing to pulp or discard the paper sheet.",
      badge: "SIMULATION",
    },
    {
      icon: Sparkles,
      title: "AI Document Restoration",
      desc: "Grammar correction, tone polish, and automated layout repairs prior to output or reprint.",
      badge: null,
    },
    {
      icon: Shield,
      title: "DocumentGuard Integrity",
      desc: "Multi-factor authenticity verification preventing unauthorized tampering with legal or financial documents.",
      badge: "GOVERNANCE",
    },
    {
      icon: Sliders,
      title: "Paper Compatibility Matrix",
      desc: "Curated mechanical database analyzing GSM weights, coating types, and reuse thresholds.",
      badge: null,
    },
    {
      icon: BarChart3,
      title: "Environmental Ledger",
      desc: "Live tracking of cellulose conserved, water spared, and carbon offsets per workspace session.",
      badge: "METRICS",
    },
  ];

  return (
    <section className="py-24 bg-[#E4E1D8]/40" aria-labelledby="capabilities-heading">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase text-[#777E62] tracking-wider">
              System Architecture
            </span>
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-black text-[#20231F] tracking-tight">
              Designed for Paper Circularity
            </h2>
          </div>
          <p className="text-xs text-[#575C53] max-w-sm leading-relaxed">
            Every layer—from browser DOM element selection to physical substrate lifecycle calculation—is built for effortless sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map(({ icon: Icon, title, desc, badge }) => (
            <div
              key={title}
              className="p-7 rounded-lg bg-[#FAF9F5] border border-[#20231F]/10 flex flex-col justify-between space-y-6 hover:border-[#315D46]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#E4E1D8] text-[#20231F] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#315D46]" />
                  </div>
                  {badge && <span className="sim-badge">{badge}</span>}
                </div>
                <h3 className="font-bold text-base text-[#20231F]">{title}</h3>
                <p className="text-xs text-[#575C53] leading-relaxed">{desc}</p>
              </div>

              <div className="pt-4 border-t border-[#20231F]/10">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#20231F] hover:text-[#315D46] transition-colors"
                >
                  <span>Read specification</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#777E62]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA Section (Architectural Deep Charcoal) ───────────────────────────
function FinalCTASection() {
  return (
    <section className="py-24 bg-[#F0EEE7]" aria-labelledby="cta-heading">
      <div className="container-narrow">
        <div className="rounded-xl bg-[#171A17] text-[#FAF9F5] p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase text-[#A7B5A0] tracking-widest">
            EXPERIENCE THE WORKSPACE
          </span>

          <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-[#FAF9F5] max-w-2xl mx-auto">
            Edit Documents Visually. Test Selective De-Inking.
          </h2>

          <p className="text-xs sm:text-sm text-[#A7B5A0] max-w-xl mx-auto leading-relaxed">
            Drag and drop your own PDF or sample memo into RELEAF Studio. Select, edit, or delete misprinted elements with Canva-grade ease.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#FAF9F5] hover:bg-[#E4E1D8] text-[#171A17] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:-translate-y-0.5"
            >
              <span>Launch Studio Canvas</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#315D46]" />
            </Link>
            <Link
              href="/paper-compatibility"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-transparent hover:bg-[#20231F] text-[#FAF9F5] border border-[#FAF9F5]/20 font-semibold text-xs tracking-wider uppercase transition-all"
            >
              <span>Explore Substrates</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Export Unified Homepage ──────────────────────────────────────────────────
export default function HomeContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <InteractiveDemoSection />
      <CapabilitiesSection />
      <FinalCTASection />
    </main>
  );
}
