"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  AlertTriangle,
  Lock,
  Zap,
  ArrowUpRight,
  HelpCircle,
  FileCheck2,
  ChevronRight,
  Eye,
  Trash2,
  Edit3,
} from "lucide-react";
import PaperSceneLoader from "@/components/three/PaperSceneLoader";

// ── SECTION A: HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-[#F4F0E6] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#123B2A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-narrow w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Editorial Typography & High-Contrast CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="lime-tag">HACKATHON 2026</span>
                <span className="cobalt-tag">CIRCULAR HARDWARE + AI</span>
                <span className="text-[11px] font-mono text-[#626B63] uppercase tracking-wider font-semibold">
                  Zero Cloud Data Storage
                </span>
              </div>

              {/* Oversized Headline with Electric Lime Accent */}
              <h1
                id="hero-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#17201B] tracking-tight leading-[0.98]"
              >
                Give Every Sheet <br />
                <span className="relative inline-block text-[#123B2A] mt-1">
                  <span className="relative z-10">Another Life.</span>
                  <span className="absolute bottom-1 left-0 right-0 h-4 bg-[#D6FF52] -z-0 transform -rotate-1 rounded-xs opacity-90" />
                </span>
              </h1>

              {/* Concise Supporting Text */}
              <p className="text-base sm:text-lg text-[#626B63] leading-relaxed max-w-xl font-normal pt-2">
                Edit smarter. Restore documents with AI. Give suitable paper another chance through intelligent printing and reuse.
              </p>
            </div>

            {/* CTAs: Deep Forest with Lime Details + Crisp Secondary Action */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] font-extrabold text-xs tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5 group focus-visible:ring-2 focus-visible:ring-[#D6FF52]"
              >
                <span>Open Workspace</span>
                <span className="w-5 h-5 rounded-xs bg-[#D6FF52] flex items-center justify-center text-[#123B2A] group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xs bg-[#FFFDF7] hover:bg-[#DDE6D8] text-[#123B2A] border border-[#123B2A]/20 font-bold text-xs tracking-wider uppercase transition-all shadow-2xs"
              >
                <span>See How It Works</span>
              </Link>
            </div>

            {/* Compact Proof Points with Cobalt & Lime Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#123B2A]/15 max-w-lg">
              <div>
                <p className="text-2xl font-black font-mono text-[#123B2A] flex items-center gap-1.5">
                  1–2<span className="text-[#D6FF52] text-lg bg-[#123B2A] px-1 rounded-xs">X</span>
                </p>
                <p className="text-[11px] font-mono text-[#626B63] uppercase tracking-wider mt-1">
                  Sheet Cycles
                </p>
              </div>
              <div>
                <p className="text-2xl font-black font-mono text-[#123B2A]">100%</p>
                <p className="text-[11px] font-mono text-[#626B63] uppercase tracking-wider mt-1">
                  Client-Side OCR
                </p>
              </div>
              <div>
                <p className="text-2xl font-black font-mono text-[#4F5BFF]">Vector</p>
                <p className="text-[11px] font-mono text-[#626B63] uppercase tracking-wider mt-1">
                  Canva Editing
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Paper Experience seamlessly integrated */}
          <div className="lg:col-span-5 h-[460px] lg:h-[540px] relative rounded-sm bg-[#FFFDF7] border-2 border-[#123B2A] shadow-xl overflow-hidden flex flex-col justify-between">
            <PaperSceneLoader />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION B: PRODUCT CAPABILITIES (VARIED EDITORIAL LAYOUT) ───────────────
function CapabilitiesSection() {
  return (
    <section className="py-24 bg-[#FFFDF7] border-y border-[#123B2A]/15" aria-labelledby="capabilities-heading">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="lime-tag">FIVE CORE CAPABILITIES</span>
            <h2 id="capabilities-heading" className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
              Hardware Innovation Meets <br />
              Browser-Native Precision.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#626B63] max-w-md leading-relaxed font-normal">
            RELEAF replaces single-use printing waste with an intelligent document lifecycle—from canvas element editing to physical ink removal.
          </p>
        </div>

        {/* Varied Editorial Layout: Asymmetrical Feature Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feature 1: Canva-Style Document Studio (Large Hero Card, 7 cols) */}
          <div className="lg:col-span-7 bg-[#F4F0E6] p-8 lg:p-10 rounded-xs border-2 border-[#123B2A] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="lime-tag">01 • CORE WORKSPACE</span>
                <span className="text-xs font-mono text-[#4F5BFF] font-bold">CANVA-GRADE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#123B2A] tracking-tight">
                Canva-Style Document Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed max-w-lg">
                Click any paragraph, heading, or figure directly on an uploaded PDF. Select elements, drag them across the page, edit typography, or hit Delete to permanently omit them. Re-export clean vector PDFs.
              </p>
            </div>

            {/* Visual Teaser inside Card */}
            <div className="bg-[#FFFDF7] p-5 rounded-xs border border-[#123B2A]/20 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-[#626B63] border-b border-[#123B2A]/10 pb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#123B2A]">
                  <MousePointer2 className="w-3.5 h-3.5 text-[#4F5BFF]" />
                  ELEMENT_SELECTOR.active
                </span>
                <span className="text-[#287A50]">X: 18% • Y: 44%</span>
              </div>
              <div className="p-3 bg-[#D6FF52]/20 border border-[#D6FF52] rounded-xs flex items-center justify-between text-[#123B2A]">
                <span>Selected: &ldquo;Quarterly Operations Summary&rdquo;</span>
                <span className="text-[10px] bg-[#123B2A] text-[#D6FF52] px-1.5 py-0.5 rounded-xs">EDITABLE</span>
              </div>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#123B2A] hover:text-[#287A50] uppercase tracking-wider transition-colors pt-2"
            >
              <span>Launch Studio Canvas</span>
              <ArrowRight className="w-4 h-4 text-[#D6FF52] bg-[#123B2A] p-0.5 rounded-xs" />
            </Link>
          </div>

          {/* Feature 2: Selective De-Inking (Dark Forest Contrast Card, 5 cols) */}
          <div className="lg:col-span-5 bg-[#123B2A] text-[#FFFDF7] p-8 lg:p-10 rounded-xs border-2 border-[#123B2A] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="lime-tag">02 • HARDWARE SIM</span>
                <span className="cobalt-tag">PATENT PENDING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#FFFDF7] tracking-tight">
                Intelligent Selective De-Inking
              </h3>
              <p className="text-xs text-[#DDE6D8]/80 leading-relaxed">
                Rather than throwing away sheets with small typos, RELEAF calculates exact micron coordinates to photothermally release ink pigmentation without pulp damage.
              </p>
            </div>

            <div className="p-4 bg-black/30 border border-white/10 rounded-xs space-y-2 text-xs font-mono text-[#DDE6D8]">
              <div className="flex justify-between">
                <span>Fibre Preservation:</span>
                <span className="text-[#D6FF52] font-bold">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Solvent Exposure:</span>
                <span className="text-[#4F5BFF] font-bold">Localized Bounding Box Only</span>
              </div>
            </div>

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D6FF52] hover:text-[#FFFDF7] uppercase tracking-wider transition-colors"
            >
              <span>Inspect De-Inking Math</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3: Smart Printing (4 cols) */}
          <div className="lg:col-span-4 bg-[#F4F0E6] p-7 rounded-xs border border-[#123B2A]/20 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#123B2A]">03 / SMART PRINTING</span>
              <h4 className="text-xl font-bold text-[#123B2A]">Precision Calibration Overprint</h4>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Feed treated sheets back into standard office trays. High-resolution sensors align new toner over the de-inked coordinates flawlessly.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#287A50] font-bold">AUTO-ALIGNMENT CALIBRATED</span>
          </div>

          {/* Feature 4: DocumentGuard (4 cols) */}
          <div className="lg:col-span-4 bg-[#F4F0E6] p-7 rounded-xs border border-[#123B2A]/20 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#123B2A]">04 / INTEGRITY</span>
              <h4 className="text-xl font-bold text-[#123B2A]">DocumentGuard Anti-Tampering</h4>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Prevent unauthorized alterations of academic certificates, financial balances, and legal deeds with automated classification gates.
              </p>
            </div>
            <Link
              href="/documentguard"
              className="text-[11px] font-mono text-[#4F5BFF] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>AUDIT SECURITY GATES</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Feature 5: Paper Matrix (4 cols) */}
          <div className="lg:col-span-4 bg-[#F4F0E6] p-7 rounded-xs border border-[#123B2A]/20 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#123B2A]">05 / SUBSTRATES</span>
              <h4 className="text-xl font-bold text-[#123B2A]">Substrate Compatibility Matrix</h4>
              <p className="text-xs text-[#626B63] leading-relaxed">
                Supports 70–120 GSM standard bond, recycled copy, and notebook paper. Automatically rejects unsuitable thermal receipts or coated gloss.
              </p>
            </div>
            <Link
              href="/paper-compatibility"
              className="text-[11px] font-mono text-[#123B2A] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>CHECK GSM MATRIX</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION C: HOW IT WORKS (SCAN → EDIT → REVIEW → RESTORE → REPRINT) ───────
function HowItWorksSection() {
  const steps = [
    {
      code: "SCAN",
      num: "01",
      title: "Document Ingestion",
      desc: "Drop any PDF or scan into Studio. The client-side engine breaks text blocks and headers into vector bounding boxes.",
      tag: "100% PRIVATE",
    },
    {
      code: "EDIT",
      num: "02",
      title: "Canva-Style Editing",
      desc: "Select obsolete paragraphs or misprinted figures. Re-type new text, format typography, or hit Delete key to purge.",
      tag: "DIRECT CANVAS",
    },
    {
      code: "REVIEW",
      num: "03",
      title: "Integrity Verification",
      desc: "DocumentGuard screens modifications against certificate forgery and financial fraud before authorizing reprint.",
      tag: "GREEN / AMBER / RED",
    },
    {
      code: "RESTORE",
      num: "04",
      title: "Simulate Selective De-Inking",
      desc: "The photothermal chamber applies localized energy to dissolve toner only on the edited coordinates.",
      tag: "FIBRE SAFE",
    },
    {
      code: "REPRINT",
      num: "05",
      title: "Intelligent Circular Reprint",
      desc: "The original sheet feeds into the output tray. Updated text prints onto the fresh coordinates seamlessly.",
      tag: "CYCLE TRACKED",
    },
  ];

  return (
    <section className="py-24 bg-[#F4F0E6]" aria-labelledby="process-heading">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="lime-tag">5-STEP WORKFLOW</span>
          <h2 id="process-heading" className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
            SCAN → EDIT → REVIEW → RESTORE → REPRINT
          </h2>
          <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">
            The closed-loop engineering cycle transforming paper from a single-use discard into a renewable multi-cycle substrate.
          </p>
        </div>

        {/* Chronological Sequence with High-Contrast Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map(({ code, num, title, desc, tag }) => (
            <div
              key={num}
              className="bg-[#FFFDF7] p-6 rounded-xs border-2 border-[#123B2A] flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#123B2A]/10 pb-3">
                  <span className="font-mono text-xs font-black bg-[#123B2A] text-[#D6FF52] px-2 py-0.5 rounded-xs">
                    {num}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#4F5BFF]">{code}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#123B2A] leading-snug">{title}</h3>
                <p className="text-xs text-[#626B63] leading-relaxed">{desc}</p>
              </div>

              <div className="pt-3 border-t border-[#123B2A]/10">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDE6D8] px-1.5 py-0.5 rounded-xs">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION D: INTERACTIVE DOCUMENT DEMONSTRATION ────────────────────────────
function InteractiveDemoSection() {
  const [selectedBox, setSelectedBox] = useState<"none" | "title" | "date" | "body">("date");
  const [isDeinked, setIsDeinked] = useState(false);

  return (
    <section className="py-24 bg-[#123B2A] text-[#FFFDF7]" aria-labelledby="demo-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="lime-tag">LIVE SIMULATOR</span>
                <span className="cobalt-tag">COORDINATE ABLATION</span>
              </div>
              <h2 id="demo-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFDF7]">
                Try Selecting & De-Inking in Real Time
              </h2>
              <p className="text-xs sm:text-sm text-[#DDE6D8]/80 leading-relaxed">
                Click elements on the simulated document sheet to inspect coordinates. Toggle selective de-inking to preview how ink dissolves without damaging surrounding fibers.
              </p>
            </div>

            {/* Selectable Element Buttons */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-mono text-[#D6FF52] uppercase tracking-wider font-bold">
                Click an element to target:
              </p>
              {[
                { id: "date", label: "Date Clause (Misprinted)", coord: "X:12% • Y:38%" },
                { id: "title", label: "Document Title", coord: "X:12% • Y:14%" },
                { id: "body", label: "Legal Paragraph", coord: "X:12% • Y:58%" },
              ].map(({ id, label, coord }) => (
                <button
                  key={id}
                  onClick={() => setSelectedBox(id as any)}
                  className={`w-full text-left p-3.5 rounded-xs border transition-all flex items-center justify-between ${
                    selectedBox === id
                      ? "bg-[#D6FF52] text-[#123B2A] border-[#D6FF52] font-bold shadow-md"
                      : "bg-black/20 text-[#DDE6D8] border-white/10 hover:bg-black/40"
                  }`}
                >
                  <span className="text-xs">{label}</span>
                  <span className="text-[10px] font-mono opacity-80">{coord}</span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsDeinked(!isDeinked)}
                className="px-5 py-3 rounded-xs bg-[#D6FF52] text-[#123B2A] font-extrabold text-xs tracking-wider uppercase hover:bg-[#E5FF85] transition-all shadow-sm"
              >
                {isDeinked ? "Reset Document State" : "Simulate Photothermal De-Inking"}
              </button>
              <Link
                href="/workspace"
                className="px-5 py-3 rounded-xs bg-white/10 text-[#FFFDF7] font-bold text-xs tracking-wider uppercase hover:bg-white/20 transition-all border border-white/15"
              >
                Open Studio with Your PDF
              </Link>
            </div>

            <p className="text-[10px] font-mono text-[#DDE6D8]/60 pt-2">
              *Honest Disclosure: Physical de-inking is an interactive simulation demonstrating coordinate ablation technology under active R&D.
            </p>
          </div>

          {/* Right Column: High-Precision Interactive Sheet */}
          <div className="lg:col-span-7 bg-[#17201B] border-2 border-[#D6FF52]/40 rounded-xs p-6 lg:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D6FF52] animate-pulse" />
                <span className="text-[#DDE6D8]">ABLATION_CHAMBER_PREVIEW.sim</span>
              </div>
              <span className="sim-badge">INTERACTIVE</span>
            </div>

            {/* The Document Canvas */}
            <div className="bg-[#FFFDF7] text-[#17201B] p-8 rounded-xs min-h-[380px] flex flex-col justify-between font-sans select-none shadow-sm relative overflow-hidden">
              <div className="space-y-5">
                {/* Header */}
                <div
                  onClick={() => setSelectedBox("title")}
                  className={`cursor-pointer p-2 rounded-xs transition-all border ${
                    selectedBox === "title"
                      ? "border-[#4F5BFF] bg-[#4F5BFF]/10 ring-2 ring-[#4F5BFF]"
                      : "border-transparent hover:border-[#123B2A]/20"
                  }`}
                >
                  <p className="text-base font-black text-[#123B2A] tracking-tight">
                    COMMERCIAL AGREEMENT ADDENDUM
                  </p>
                  <p className="text-[10px] font-mono text-[#626B63]">DOC_ID: RLF-2026-X • VERSION 1.0</p>
                </div>

                {/* Date Row (Target of misprint) */}
                <div
                  onClick={() => setSelectedBox("date")}
                  className={`cursor-pointer p-3.5 rounded-xs transition-all border ${
                    selectedBox === "date"
                      ? isDeinked
                        ? "border-[#287A50] bg-[#287A50]/15"
                        : "border-[#D6FF52] bg-[#D6FF52]/30 ring-2 ring-[#123B2A]"
                      : "border-[#123B2A]/15 hover:border-[#123B2A]/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1 font-bold">
                    <span className={isDeinked ? "text-[#287A50]" : "text-[#123B2A]"}>
                      {isDeinked ? "[INK ABLATED • CELLULOSE CLEAN]" : "[SELECTABLE REGION: TYPO DETECTED]"}
                    </span>
                    <span className="text-[#626B63]">X: 12% • Y: 38%</span>
                  </div>
                  <p className="text-xs font-semibold">
                    {isDeinked ? (
                      <span className="text-[#287A50]">
                        Corrected Overprint: Effective commencement date is finalized for November 12, 2026.
                      </span>
                    ) : (
                      <span className="line-through decoration-[#991B1B] decoration-2">
                        Draft Error: Effective commencement date is finalized for &ldquo;Novemeber 12, 2025&rdquo;.
                      </span>
                    )}
                  </p>
                </div>

                {/* Body paragraph */}
                <div
                  onClick={() => setSelectedBox("body")}
                  className={`cursor-pointer p-2 rounded-xs transition-all border ${
                    selectedBox === "body"
                      ? "border-[#4F5BFF] bg-[#4F5BFF]/10 ring-2 ring-[#4F5BFF]"
                      : "border-transparent hover:border-[#123B2A]/20"
                  }`}
                >
                  <p className="text-xs text-[#626B63] leading-relaxed">
                    All terms, covenants, and performance metrics specified in the primary schedule shall remain in full force and effect without modification or waiver.
                  </p>
                </div>
              </div>

              {/* Sheet Diagnostics Footer */}
              <div className="pt-4 border-t border-[#123B2A]/10 flex items-center justify-between text-[10px] font-mono text-[#626B63]">
                <span className="flex items-center gap-1.5 font-bold text-[#123B2A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#287A50]" />
                  A4 STANDARD (80 GSM)
                </span>
                <span className="text-[#287A50] font-bold">
                  {isDeinked ? "REPRINT INTEGRITY: 99.1%" : "FIBRE BOND: OPTIMAL"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION E: AI RESTORATION (BEFORE & AFTER SLIDER VISUAL) ─────────────────
function AIRestorationSection() {
  const [viewState, setViewState] = useState<"before" | "after">("after");

  return (
    <section className="py-24 bg-[#FFFDF7] border-b border-[#123B2A]/15" aria-labelledby="ai-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Before/After Card */}
          <div className="lg:col-span-7 bg-[#F4F0E6] p-6 lg:p-8 rounded-xs border-2 border-[#123B2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#123B2A]/15">
              <div className="flex items-center gap-2">
                <span className="lime-tag">COMPARISON ENGINE</span>
                <span className="text-xs font-mono text-[#626B63] font-bold">AI_RESTORATION.diff</span>
              </div>

              {/* Toggle Buttons */}
              <div className="flex gap-1 bg-[#FFFDF7] p-1 rounded-xs border border-[#123B2A]/20">
                <button
                  onClick={() => setViewState("before")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                    viewState === "before"
                      ? "bg-[#123B2A] text-[#FFFDF7]"
                      : "text-[#626B63] hover:text-[#123B2A]"
                  }`}
                >
                  Raw Draft
                </button>
                <button
                  onClick={() => setViewState("after")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                    viewState === "after"
                      ? "bg-[#D6FF52] text-[#123B2A]"
                      : "text-[#626B63] hover:text-[#123B2A]"
                  }`}
                >
                  AI Enhanced
                </button>
              </div>
            </div>

            {/* Simulated Content Box */}
            <div className="bg-[#FFFDF7] p-6 rounded-xs border border-[#123B2A]/20 min-h-[260px] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#626B63]">
                  <span>CATEGORY: EXECUTIVE BRIEF</span>
                  <span className={viewState === "after" ? "text-[#287A50] font-bold" : "text-[#991B1B] font-bold"}>
                    {viewState === "after" ? "POLISHED & CALIBRATED" : "3 DETECTED ANOMALIES"}
                  </span>
                </div>

                {viewState === "before" ? (
                  <div className="space-y-3 text-xs text-[#17201B] font-sans">
                    <p className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xs">
                      <span className="line-through text-[#991B1B] font-semibold">
                        The suply chain review was held on Modnay
                      </span>{" "}
                      with the team regarding warehouse emissions.
                    </p>
                    <p className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xs">
                      Re-printing of 500 sheets <span className="line-through text-[#991B1B] font-semibold">is required immidiately</span>.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs text-[#17201B] font-sans">
                    <p className="p-2.5 bg-[#EAF4EE] border border-[#B8DCBE] rounded-xs text-[#123B2A]">
                      <span className="font-bold text-[#287A50]">Restored:</span> The supply chain review was conducted on Monday with the team regarding warehouse emissions.
                    </p>
                    <p className="p-2.5 bg-[#EAF4EE] border border-[#B8DCBE] rounded-xs text-[#123B2A]">
                      <span className="font-bold text-[#287A50]">Restored:</span> Selective de-inking preserves 500 sheets without requiring full re-printing.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#123B2A]/10 text-[10px] font-mono text-[#626B63] flex justify-between">
                <span>Grammar & Typography Scan</span>
                <span className="text-[#123B2A] font-bold">100% Client-Side Evaluation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <span className="lime-tag">SMART CORRECTION</span>
            <h2 id="ai-heading" className="text-3xl sm:text-4xl font-black text-[#123B2A] tracking-tight">
              AI Document Restoration Without Overpromising.
            </h2>
            <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">
              RELEAF does not invent or hallucinate missing illegible text. Instead, it systematically detects typographic errors, spelling blunders, layout misalignments, and redundant phrases, giving you one-click fixes before paper touches ink.
            </p>

            <ul className="space-y-2.5 text-xs text-[#123B2A] font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs bg-[#D6FF52] flex items-center justify-center text-[#123B2A] text-[10px] font-bold">✓</span>
                <span>Spelling and syntax corrections</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs bg-[#D6FF52] flex items-center justify-center text-[#123B2A] text-[10px] font-bold">✓</span>
                <span>OCR anomaly cleanup for scanned forms</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-xs bg-[#D6FF52] flex items-center justify-center text-[#123B2A] text-[10px] font-bold">✓</span>
                <span>Direct sync with Canva canvas text layers</span>
              </li>
            </ul>

            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#123B2A] hover:text-[#4F5BFF] uppercase tracking-wider transition-colors pt-2"
            >
              <span>Explore AI Assistant Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION F: DOCUMENTGUARD (AUTHENTICITY & SECURITY GATES) ────────────────
function DocumentGuardSection() {
  return (
    <section className="py-24 bg-[#F4F0E6]" aria-labelledby="guard-heading">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="cobalt-tag">SECURITY INFRASTRUCTURE</span>
            <h2 id="guard-heading" className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
              DocumentGuard Integrity Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#626B63] max-w-md leading-relaxed font-normal">
            Paper reuse must not enable unauthorized document tampering. DocumentGuard applies a strict three-tier verification policy to protect certificates, legal agreements, and financial deeds.
          </p>
        </div>

        {/* 3 Status Columns: GREEN, AMBER, RED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GREEN GATE */}
          <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#287A50] space-y-5">
            <div className="flex items-center justify-between border-b border-[#287A50]/20 pb-3">
              <span className="text-xs font-mono font-black text-[#287A50] bg-[#EAF4EE] px-2 py-0.5 rounded-xs">
                GREEN GATE
              </span>
              <span className="text-[11px] font-mono text-[#287A50] font-bold">PERMITTED</span>
            </div>
            <h3 className="font-bold text-lg text-[#123B2A]">Routine Internal Prints</h3>
            <p className="text-xs text-[#626B63] leading-relaxed">
              Meeting agendas, internal drafts, shipping memos, slide printouts, and personal study notes. Full Canva element editing and de-inking permitted.
            </p>
            <div className="text-[10px] font-mono text-[#287A50] bg-[#EAF4EE] p-2 rounded-xs">
              STATUS: AUTO-CLEARED FOR REPRINT
            </div>
          </div>

          {/* AMBER GATE */}
          <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#FDE68A] space-y-5">
            <div className="flex items-center justify-between border-b border-[#FDE68A] pb-3">
              <span className="text-xs font-mono font-black text-[#92400E] bg-[#FFFBEB] px-2 py-0.5 rounded-xs">
                AMBER GATE
              </span>
              <span className="text-[11px] font-mono text-[#92400E] font-bold">FLAGGED</span>
            </div>
            <h3 className="font-bold text-lg text-[#123B2A]">Sensitive Financial Figures</h3>
            <p className="text-xs text-[#626B63] leading-relaxed">
              Invoices, purchase orders, salary ranges, and contract sums. Requires supervisor authorization code before ink removal coordinates execute.
            </p>
            <div className="text-[10px] font-mono text-[#92400E] bg-[#FFFBEB] p-2 rounded-xs">
              STATUS: SECONDARY AUTH REQUIRED
            </div>
          </div>

          {/* RED GATE */}
          <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#FECACA] space-y-5">
            <div className="flex items-center justify-between border-b border-[#FECACA] pb-3">
              <span className="text-xs font-mono font-black text-[#991B1B] bg-[#FEF2F2] px-2 py-0.5 rounded-xs">
                RED GATE
              </span>
              <span className="text-[11px] font-mono text-[#991B1B] font-bold">LOCKED</span>
            </div>
            <h3 className="font-bold text-lg text-[#123B2A]">Restricted Official Records</h3>
            <p className="text-xs text-[#626B63] leading-relaxed">
              University degrees, academic transcripts, government identity, notary seals, and medical prescriptions. Selective de-inking is permanently disabled.
            </p>
            <div className="text-[10px] font-mono text-[#991B1B] bg-[#FEF2F2] p-2 rounded-xs">
              STATUS: DE-INKING PROHIBITED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION G: PAPER COMPATIBILITY MATRIX ────────────────────────────────────
function PaperMatrixSection() {
  const substrates = [
    { type: "Standard Copy Paper", gsm: "75–80 GSM", cycles: "1–2 Cycles", fit: "Optimal", color: "text-[#287A50]" },
    { type: "Heavy Executive Bond", gsm: "90–120 GSM", cycles: "2 Cycles", fit: "Excellent", color: "text-[#287A50]" },
    { type: "Recycled Office Stock", gsm: "70–80 GSM", cycles: "1 Cycle", fit: "Calibrated", color: "text-[#123B2A]" },
    { type: "Glossy Coated Brochure", gsm: "130–250 GSM", cycles: "0 Cycles", fit: "Rejected", color: "text-[#991B1B]" },
    { type: "Thermal Receipt Paper", gsm: "50 GSM", cycles: "0 Cycles", fit: "Incompatible", color: "text-[#991B1B]" },
  ];

  return (
    <section className="py-24 bg-[#FFFDF7] border-y border-[#123B2A]/15" aria-labelledby="matrix-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="lime-tag">SUBSTRATE COMPATIBILITY</span>
            <h2 id="matrix-heading" className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
              Supported Paper Types & Weight Classes
            </h2>
            <p className="text-xs sm:text-sm text-[#626B63] leading-relaxed">
              Not all paper is equal. RELEAF enforces strict physical substrate rules to protect your printer mechanisms and maintain high visual contrast across cycles.
            </p>

            <Link
              href="/paper-compatibility"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xs bg-[#123B2A] text-[#D6FF52] font-bold text-xs uppercase tracking-wider hover:bg-[#1B4E38] transition-all shadow-sm"
            >
              <span>View Full Compatibility Database</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-7 bg-[#F4F0E6] p-6 rounded-xs border-2 border-[#123B2A] shadow-md">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-[#123B2A] text-[#123B2A]">
                  <th className="py-3 font-black">SUBSTRATE</th>
                  <th className="py-3 font-black">WEIGHT</th>
                  <th className="py-3 font-black">REUSE CYCLES</th>
                  <th className="py-3 font-black">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123B2A]/15 text-[#17201B]">
                {substrates.map((s) => (
                  <tr key={s.type} className="hover:bg-[#FFFDF7]/60 transition-colors">
                    <td className="py-3 font-bold">{s.type}</td>
                    <td className="py-3 text-[#626B63]">{s.gsm}</td>
                    <td className="py-3">{s.cycles}</td>
                    <td className={`py-3 font-bold ${s.color}`}>{s.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION H: ENVIRONMENTAL MISSION ─────────────────────────────────────────
function EnvironmentalMissionSection() {
  return (
    <section className="py-24 bg-[#F4F0E6]" aria-labelledby="mission-heading">
      <div className="container-narrow">
        <div className="bg-[#123B2A] text-[#FFFDF7] p-10 lg:p-14 rounded-xs border-2 border-[#123B2A] shadow-2xl relative overflow-hidden space-y-10">
          <div className="space-y-4 max-w-2xl">
            <span className="lime-tag">THE RELEAF MISSION</span>
            <h2 id="mission-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFDF7]">
              Over 40% of Office Prints Are Discarded Within 24 Hours.
            </h2>
            <p className="text-xs sm:text-sm text-[#DDE6D8]/85 leading-relaxed">
              Modern digital workplaces print billions of sheets annually for temporary reviews, proofreading, and meeting notes. By enabling just 1–2 reuse cycles per sheet, offices can reduce raw paper consumption by over 60%.
            </p>
          </div>

          {/* Environmental Proof Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/15">
            <div className="p-5 bg-black/20 rounded-xs border border-white/10 space-y-2">
              <p className="text-3xl font-black font-mono text-[#D6FF52]">62%</p>
              <h4 className="font-bold text-sm text-[#FFFDF7]">Reduction in Office Waste</h4>
              <p className="text-xs text-[#DDE6D8]/70">Calculated across simulated corporate campus print volumes.</p>
            </div>

            <div className="p-5 bg-black/20 rounded-xs border border-white/10 space-y-2">
              <p className="text-3xl font-black font-mono text-[#4F5BFF]">13 L</p>
              <h4 className="font-bold text-sm text-[#FFFDF7]">Water Spared per 500 Sheets</h4>
              <p className="text-xs text-[#DDE6D8]/70">Industrial wood pulping is water-intensive. Reusing sheets eliminates pulp cycles.</p>
            </div>

            <div className="p-5 bg-black/20 rounded-xs border border-white/10 space-y-2">
              <p className="text-3xl font-black font-mono text-[#D6FF52]">Zero</p>
              <h4 className="font-bold text-sm text-[#FFFDF7]">Cloud Data Transmission</h4>
              <p className="text-xs text-[#DDE6D8]/70">All OCR, parsing, and Canva editing runs locally in client browser memory.</p>
            </div>
          </div>

          <p className="text-[10px] font-mono text-[#DDE6D8]/50 pt-2">
            *Notice: Illustrative environmental metrics represent engineering estimates modeled on standard lifecycle analysis (LCA) data.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── SECTION I: FINAL CALL TO ACTION ──────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-24 bg-[#17201B] text-[#FFFDF7]" aria-labelledby="cta-heading">
      <div className="container-narrow text-center space-y-8 max-w-3xl mx-auto">
        <span className="lime-tag">START RESTORING DOCUMENTS</span>

        <h2 id="cta-heading" className="text-4xl sm:text-6xl font-black tracking-tight text-[#FFFDF7] leading-tight">
          Give Paper Another Life.
        </h2>

        <p className="text-sm sm:text-base text-[#DDE6D8]/80 max-w-xl mx-auto leading-relaxed">
          Open the Canva-grade visual document editor, import your PDF, and experience selective de-inking simulation right now.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xs bg-[#D6FF52] hover:bg-[#E5FF85] text-[#123B2A] font-black text-xs tracking-wider uppercase transition-all shadow-lg hover:-translate-y-0.5"
          >
            <span>Explore RELEAF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/paper-compatibility"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xs bg-white/10 hover:bg-white/20 text-[#FFFDF7] font-bold text-xs tracking-wider uppercase transition-all border border-white/15"
          >
            <span>Check Compatibility</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── EXPORT FULL HOMEPAGE ASSEMBLY ────────────────────────────────────────────
export default function HomeContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <InteractiveDemoSection />
      <AIRestorationSection />
      <DocumentGuardSection />
      <PaperMatrixSection />
      <EnvironmentalMissionSection />
      <FinalCTASection />
    </main>
  );
}
