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
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="lime-tag">HARDWARE MATRIX</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              Paper Substrate & Size Compatibility
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              Differentiating standard print capability from physical de-inking chamber tolerance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Size & Substrate Selector */}
            <div className="lg:col-span-8 space-y-8">
              {/* Paper Sizes */}
              <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-md">
                <h2 className="text-base font-black text-[#123B2A] mb-4 flex items-center justify-between">
                  <span>1. Select Paper Size</span>
                  <span className="text-xs font-mono text-[#626B63]">ISO 216 & ANSI</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {PAPER_SIZES.map((s) => {
                    const isSelected = size === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSize(s.id)}
                        className={`p-3 rounded-xs border-2 text-center transition-all ${
                          isSelected
                            ? "bg-[#123B2A] text-[#FFFDF7] border-[#123B2A] shadow-sm ring-2 ring-[#D6FF52]"
                            : "bg-[#F4F0E6] hover:bg-[#FFFDF7] border-[#123B2A]/15 text-[#123B2A]"
                        }`}
                      >
                        <p className="font-extrabold text-sm">{s.label}</p>
                        <p className={`text-[10px] font-mono mt-0.5 ${isSelected ? "text-[#D6FF52]" : "text-[#626B63]"}`}>
                          {s.dims}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Substrate Types */}
              <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-md">
                <h2 className="text-base font-black text-[#123B2A] mb-4">
                  2. Select Paper Material Substrate
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAPER_TYPES.map((t) => {
                    const isSelected = type === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`p-4 rounded-xs border-2 text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#123B2A] text-[#FFFDF7] border-[#123B2A] shadow-sm ring-2 ring-[#D6FF52]"
                            : "bg-[#F4F0E6] hover:bg-[#FFFDF7] border-[#123B2A]/15 text-[#123B2A]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-extrabold text-xs sm:text-sm">{t.label}</span>
                          {t.deink ? (
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#287A50] text-[#FFFDF7]">
                              DE-INK READY
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#991B1B] text-[#FFFDF7]">
                              PRINT ONLY
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-tight ${isSelected ? "text-[#DDE6D8]" : "text-[#626B63]"}`}>
                          {t.note}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Print Preferences */}
              <div className="bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-md">
                <h2 className="text-base font-black text-[#123B2A] mb-4">
                  3. Print & Restoration Preferences
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#626B63] block mb-1">
                      Orientation
                    </label>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value)}
                      className="w-full bg-[#F4F0E6] border border-[#123B2A]/20 rounded-xs p-2.5 font-bold text-[#123B2A] outline-none"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#626B63] block mb-1">
                      Quality Profile
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-[#F4F0E6] border border-[#123B2A]/20 rounded-xs p-2.5 font-bold text-[#123B2A] outline-none"
                    >
                      <option value="draft">Draft (Fast, low toner)</option>
                      <option value="normal">Normal (Standard office)</option>
                      <option value="high">High (Presentation quality)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#626B63] block mb-1">
                      Duplex Handling
                    </label>
                    <select
                      value={duplex}
                      onChange={(e) => setDuplex(e.target.value)}
                      className="w-full bg-[#F4F0E6] border border-[#123B2A]/20 rounded-xs p-2.5 font-bold text-[#123B2A] outline-none"
                    >
                      <option value="single">Single-sided</option>
                      <option value="duplex-long">Duplex (Flip Long Edge)</option>
                      <option value="duplex-short">Duplex (Flip Short Edge)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Compatibility Diagnostic Card */}
            <div className="lg:col-span-4 bg-[#FFFDF7] p-7 rounded-xs border-2 border-[#123B2A] shadow-md space-y-6 sticky top-28">
              <h3 className="text-lg font-black text-[#123B2A] border-b border-[#123B2A]/15 pb-3">
                Compatibility Diagnosis
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-[#123B2A]/10">
                  <span className="text-[#626B63]">Selected Sheet:</span>
                  <span className="font-bold text-[#123B2A]">{selectedSize?.label} ({selectedSize?.dims})</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-[#123B2A]/10">
                  <span className="text-[#626B63]">Material Class:</span>
                  <span className="font-bold text-[#123B2A]">{selectedType?.label}</span>
                </div>

                <div className="p-4 rounded-xs border-2 space-y-2">
                  <div className="flex items-center gap-2">
                    {deinkCompatible ? (
                      <CheckCircle2 className="w-5 h-5 text-[#287A50]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#991B1B]" />
                    )}
                    <span className="font-black text-sm uppercase">
                      {deinkCompatible ? "De-Inking Permitted" : "De-Inking Incompatible"}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans leading-relaxed text-[#626B63]">
                    {deinkCompatible
                      ? "This substrate has verified cellulose bond strength capable of surviving targeted photothermal ink dissolution."
                      : "Coated or ultra-thin stocks risk solvent bleeding or mechanical tear. This sheet will be handled for standard printing only."}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/workspace"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>Apply Matrix to Studio</span>
                  <ArrowRight className="w-4 h-4 text-[#D6FF52]" />
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
