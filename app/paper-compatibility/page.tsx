"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, AlertTriangle, Layers, Printer, Sliders, ArrowRight } from "lucide-react";
import Link from "next/link";

const PAPER_SIZES = [
  { id: "a4", label: "A4", dims: "210 × 297 mm", popular: true },
  { id: "a3", label: "A3", dims: "297 × 420 mm" },
  { id: "a5", label: "A5", dims: "148 × 210 mm" },
  { id: "a6", label: "A6", dims: "105 × 148 mm" },
  { id: "letter", label: "US Letter", dims: "215.9 × 279.4 mm", popular: true },
  { id: "legal", label: "US Legal", dims: "215.9 × 355.6 mm" },
  { id: "executive", label: "Executive", dims: "184.1 × 266.7 mm" },
  { id: "b4", label: "B4 JIS", dims: "250 × 353 mm" },
  { id: "b5", label: "B5 JIS", dims: "176 × 250 mm" },
  { id: "custom", label: "Custom", dims: "Custom mm" },
];

const PAPER_TYPES = [
  { id: "standard", label: "Standard Office (80 gsm)", deink: true, note: "Ideal fibre density for 1–2 cycles" },
  { id: "recycled", label: "100% Recycled Bond", deink: true, note: "Porous matrix compatible with bio-solvents" },
  { id: "notebook", label: "Notebook / Ruled Paper", deink: true, note: "Woodfree pulp, high laser responsiveness" },
  { id: "bond", label: "Heavy Bond Paper (100 gsm)", deink: true, note: "Premium paper with sturdy cellulose" },
  { id: "reuse", label: "Previously De-Inked (Cycle 1)", deink: true, note: "Ready for final reprinting cycle" },
  { id: "coloured", label: "Coloured Paper Stock", deink: false, note: "Base dye risks leaching with solvents" },
  { id: "glossy", label: "Glossy Photo Paper", deink: false, note: "Polymer coating impenetrable by de-inker" },
  { id: "thin", label: "Ultra-Thin (< 60 gsm)", deink: false, note: "Tear risk during mechanical feed" },
];

export default function PaperCompatibilityPage() {
  const [size, setSize] = useState("a4");
  const [type, setType] = useState("standard");
  const [orientation, setOrientation] = useState("portrait");
  const [quality, setQuality] = useState("normal");
  const [duplex, setDuplex] = useState("single");
  const [copies, setCopies] = useState(1);

  const selectedType = PAPER_TYPES.find((t) => t.id === type);
  const selectedSize = PAPER_SIZES.find((s) => s.id === size);
  const deinkCompatible = selectedType?.deink ?? false;

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="pill-badge mb-3">Hardware Matrix</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              Paper Substrate & Size Compatibility
            </h1>
            <p className="text-charcoal/70 text-base leading-relaxed">
              Differentiating standard print capability from physical de-inking chamber tolerance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Size & Substrate Selector */}
            <div className="lg:col-span-8 space-y-8">
              {/* Paper Sizes */}
              <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs">
                <h2 className="text-base font-extrabold text-forest mb-4 flex items-center justify-between">
                  <span>1. Select Paper Size</span>
                  <span className="text-xs font-mono text-charcoal/50">ISO 216 & ANSI</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {PAPER_SIZES.map((s) => {
                    const isSelected = size === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSize(s.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-forest text-white border-forest shadow-sm ring-2 ring-lime/40"
                            : "bg-[#F9F8F3] hover:bg-white border-black/5 text-charcoal"
                        }`}
                      >
                        <p className="font-extrabold text-sm">{s.label}</p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? "text-sage" : "text-charcoal/50"}`}>
                          {s.dims}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Substrate Types */}
              <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs">
                <h2 className="text-base font-extrabold text-forest mb-4">
                  2. Select Paper Material Substrate
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAPER_TYPES.map((t) => {
                    const isSelected = type === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-forest text-white border-forest shadow-sm ring-2 ring-lime/40"
                            : "bg-[#F9F8F3] hover:bg-white border-black/5 text-charcoal"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs sm:text-sm">{t.label}</span>
                          {t.deink ? (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300">
                              DE-INK READY
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                              PRINT ONLY
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-tight ${isSelected ? "text-sage/80" : "text-charcoal/60"}`}>
                          {t.note}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Print Preferences */}
              <div className="bg-white p-7 rounded-3xl border border-black/5 shadow-xs">
                <h2 className="text-base font-extrabold text-forest mb-4">
                  3. Print & Restoration Preferences
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-charcoal/60 block mb-1">
                      Orientation
                    </label>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value)}
                      className="w-full bg-[#F9F8F3] border border-black/10 rounded-xl p-2.5 font-semibold text-charcoal outline-none focus:border-primary"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-charcoal/60 block mb-1">
                      Duplex Feed
                    </label>
                    <select
                      value={duplex}
                      onChange={(e) => setDuplex(e.target.value)}
                      className="w-full bg-[#F9F8F3] border border-black/10 rounded-xl p-2.5 font-semibold text-charcoal outline-none focus:border-primary"
                    >
                      <option value="single">Single Sided</option>
                      <option value="duplex">Double Sided (Long Edge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-charcoal/60 block mb-1">
                      Print Resolution
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-[#F9F8F3] border border-black/10 rounded-xl p-2.5 font-semibold text-charcoal outline-none focus:border-primary"
                    >
                      <option value="draft">Eco Draft (Fast)</option>
                      <option value="normal">Standard 600 DPI</option>
                      <option value="high">High Definition 1200 DPI</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Compatibility Assessment Card */}
            <div className="lg:col-span-4 bg-forest text-white p-7 rounded-3xl shadow-lg space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-lime">Active Configuration</span>
                <h3 className="text-xl font-black mt-1">Matrix Evaluation</h3>
              </div>

              {/* Status Badge */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  deinkCompatible
                    ? "bg-green-950/60 border-green-500/50 text-green-200"
                    : "bg-amber-950/60 border-amber-500/50 text-amber-200"
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                  {deinkCompatible ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-lime" />
                      <span className="text-lime">De-inking Compatible</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">Print Only Substrate</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] opacity-90">
                  {deinkCompatible
                    ? `${selectedType?.label} supports photothermal laser dissolution without cellulose fibre breakdown.`
                    : `${selectedType?.label} contains protective synthetic coats or chemical dyes incompatible with selective ink release.`}
                </p>
              </div>

              {/* Specifications table */}
              <div className="space-y-2.5 text-xs text-sage/80 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Selected Size:</span>
                  <span className="font-bold text-white">{selectedSize?.label} ({selectedSize?.dims})</span>
                </div>
                <div className="flex justify-between">
                  <span>Substrate Profile:</span>
                  <span className="font-bold text-white">{selectedType?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Orientation:</span>
                  <span className="font-bold text-white capitalize">{orientation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recommended Max Cycles:</span>
                  <span className="font-bold text-lime">{deinkCompatible ? "1–2 Cycles" : "0 Cycles (Disposable)"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/workspace"
                  className="w-full py-3 rounded-xl bg-lime hover:bg-white text-forest text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Apply Settings in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
