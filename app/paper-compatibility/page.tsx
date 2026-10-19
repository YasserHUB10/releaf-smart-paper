"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const PAPER_SIZES = [
  { id: "a3", label: "A3", dims: "297 × 420 mm" },
  { id: "a4", label: "A4", dims: "210 × 297 mm" },
  { id: "a5", label: "A5", dims: "148 × 210 mm" },
  { id: "a6", label: "A6", dims: "105 × 148 mm" },
  { id: "b4", label: "B4", dims: "250 × 353 mm" },
  { id: "b5", label: "B5", dims: "176 × 250 mm" },
  { id: "letter", label: "Letter", dims: "215.9 × 279.4 mm" },
  { id: "legal", label: "Legal", dims: "215.9 × 355.6 mm" },
  { id: "executive", label: "Executive", dims: "184.1 × 266.7 mm" },
  { id: "custom", label: "Custom", dims: "" },
];

const PAPER_TYPES = [
  { id: "standard", label: "Standard office (80 gsm)", deink: true },
  { id: "notebook", label: "Notebook paper", deink: true },
  { id: "ruled", label: "Ruled paper", deink: true },
  { id: "unruled", label: "Unruled paper", deink: true },
  { id: "bond", label: "Bond paper", deink: true },
  { id: "recycled", label: "Recycled paper", deink: true },
  { id: "coloured", label: "Coloured paper", deink: false },
  { id: "letterhead", label: "Letterhead paper", deink: false },
  { id: "thin", label: "Thin paper (< 60 gsm)", deink: false },
  { id: "thick", label: "Thick / card paper (> 120 gsm)", deink: false },
  { id: "cardstock", label: "Cardstock", deink: false },
  { id: "glossy", label: "Glossy paper", deink: false },
  { id: "matte", label: "Matte photo paper", deink: false },
  { id: "reuse", label: "Previously printed (for reuse)", deink: true },
];

export default function PaperCompatibilityPage() {
  const [size, setSize] = useState("a4");
  const [type, setType] = useState("standard");
  const [orientation, setOrientation] = useState("portrait");
  const [colour, setColour] = useState("colour");
  const [quality, setQuality] = useState("normal");
  const [duplex, setDuplex] = useState("single");
  const [copies, setCopies] = useState(1);
  const [pageRange, setPageRange] = useState("all");
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);

  const selectedType = PAPER_TYPES.find((t) => t.id === type);
  const deinkCompatible = selectedType?.deink ?? false;

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow max-w-3xl">
          <h1 className="text-4xl font-bold text-forest mb-2">
            Paper Compatibility
          </h1>
          <p className="text-charcoal/60 mb-10">
            Configure paper settings for printing. Note that print compatibility
            and de-inking compatibility are separate checks.
          </p>

          <form
            aria-label="Paper settings form"
            onSubmit={(e) => e.preventDefault()}
            className="space-y-8"
          >
            {/* Size */}
            <fieldset className="bg-white rounded-2xl p-6 border border-sage/40">
              <legend className="text-base font-semibold text-forest mb-4 block">
                Paper Size
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {PAPER_SIZES.map((s) => (
                  <label key={s.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="size"
                      value={s.id}
                      checked={size === s.id}
                      onChange={() => setSize(s.id)}
                      className="sr-only"
                    />
                    <div
                      className={`rounded-xl border text-center p-3 transition-all ${
                        size === s.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-sage hover:border-primary/40"
                      }`}
                    >
                      <p className="font-semibold text-sm text-charcoal">{s.label}</p>
                      {s.dims && (
                        <p className="text-[10px] text-charcoal/40 mt-0.5">{s.dims}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {size === "custom" && (
                <div className="flex gap-4 mt-4 flex-wrap">
                  <div>
                    <label htmlFor="custom-width" className="text-xs text-charcoal/60 block mb-1">
                      Width (mm)
                    </label>
                    <input
                      id="custom-width"
                      type="number"
                      min={50}
                      max={900}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="border border-sage rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="custom-height" className="text-xs text-charcoal/60 block mb-1">
                      Height (mm)
                    </label>
                    <input
                      id="custom-height"
                      type="number"
                      min={50}
                      max={1200}
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="border border-sage rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </fieldset>

            {/* Type */}
            <fieldset className="bg-white rounded-2xl p-6 border border-sage/40">
              <legend className="text-base font-semibold text-forest mb-4 block">
                Paper Type
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PAPER_TYPES.map((t) => (
                  <label key={t.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="paper-type"
                      value={t.id}
                      checked={type === t.id}
                      onChange={() => setType(t.id)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                        type === t.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-sage hover:border-primary/40"
                      }`}
                    >
                      <span className="text-sm text-charcoal">{t.label}</span>
                      {t.deink ? (
                        <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                          De-ink compatible
                        </span>
                      ) : (
                        <span className="text-[10px] text-charcoal/40 bg-charcoal/5 rounded-full px-2 py-0.5">
                          Print only
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* De-ink compatibility result */}
              <div className={`mt-4 rounded-xl border p-4 flex items-start gap-3 ${deinkCompatible ? "status-green" : "status-amber"}`}>
                {deinkCompatible ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <p className="font-semibold text-sm">
                    {deinkCompatible
                      ? "Compatible for de-inking (simulation)"
                      : "Not compatible for de-inking"}
                  </p>
                  <p className="text-xs mt-0.5 opacity-80">
                    {deinkCompatible
                      ? "This paper type is provisionally compatible with the RELEAF de-inking process in simulation mode. Physical compatibility must be verified with real hardware."
                      : "This paper type is not suitable for physical de-inking due to coating, thickness, or colour. It can still be used for standard printing."}
                  </p>
                </div>
              </div>
            </fieldset>

            {/* Settings */}
            <fieldset className="bg-white rounded-2xl p-6 border border-sage/40">
              <legend className="text-base font-semibold text-forest mb-4 block">
                Print Settings
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Orientation */}
                <div>
                  <label htmlFor="orientation" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Orientation
                  </label>
                  <select
                    id="orientation"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                {/* Colour */}
                <div>
                  <label htmlFor="colour" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Colour
                  </label>
                  <select
                    id="colour"
                    value={colour}
                    onChange={(e) => setColour(e.target.value)}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="colour">Colour</option>
                    <option value="grayscale">Greyscale</option>
                  </select>
                </div>

                {/* Quality */}
                <div>
                  <label htmlFor="quality" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Print Quality
                  </label>
                  <select
                    id="quality"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Duplex */}
                <div>
                  <label htmlFor="duplex" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Sides
                  </label>
                  <select
                    id="duplex"
                    value={duplex}
                    onChange={(e) => setDuplex(e.target.value)}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="single">Single-sided</option>
                    <option value="duplex-long">Double-sided (long edge)</option>
                    <option value="duplex-short">Double-sided (short edge)</option>
                  </select>
                </div>

                {/* Copies */}
                <div>
                  <label htmlFor="copies" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Number of Copies
                  </label>
                  <input
                    id="copies"
                    type="number"
                    min={1}
                    max={999}
                    value={copies}
                    onChange={(e) => setCopies(Number(e.target.value))}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Page range */}
                <div>
                  <label htmlFor="page-range" className="text-xs text-charcoal/60 block mb-1 font-medium">
                    Page Range
                  </label>
                  <select
                    id="page-range"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All pages</option>
                    <option value="current">Current page</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Summary */}
            <div className="bg-forest text-white rounded-2xl p-6">
              <h2 className="font-semibold mb-3">Current Configuration</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  ["Size", PAPER_SIZES.find((s) => s.id === size)?.label ?? size],
                  ["Type", PAPER_TYPES.find((t) => t.id === type)?.label ?? type],
                  ["Orientation", orientation],
                  ["Colour mode", colour],
                  ["Quality", quality],
                  ["Sides", duplex],
                  ["Copies", copies],
                  ["Pages", pageRange],
                  ["De-ink compatible", deinkCompatible ? "Yes (simulation)" : "No"],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex justify-between gap-2">
                    <dt className="text-sage/60">{k}</dt>
                    <dd className="font-medium text-right">{String(v)}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-sage/50 mt-4">
                ⚠ De-inking compatibility shown as simulation only. Physical compatibility requires RELEAF hardware.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
