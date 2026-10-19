"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Sparkles,
  Shield,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
  Sliders,
  Type,
  Plus,
  Trash2,
  Undo2,
  Redo2,
  Eraser,
  Printer,
  Download,
  Share2,
  Check,
  ChevronRight,
  RefreshCw,
  FileCheck,
  Zap,
  MousePointer2,
} from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";
import InteractiveDocumentCanvas, {
  DocElement,
} from "@/components/document/InteractiveDocumentCanvas";

// ── Types ──────────────────────────────────────────────────────────────────────
type WorkflowState =
  | "idle"
  | "imported"
  | "analysed"
  | "changes-proposed"
  | "security-review"
  | "paper-check"
  | "awaiting-confirm"
  | "processing"
  | "completed"
  | "failed";

interface UploadedFile {
  file: File;
  url: string;
  type: "pdf" | "image";
}

// Default initial smart document elements extracted by simulated OCR
const DEFAULT_INITIAL_ELEMENTS: DocElement[] = [
  {
    id: "el-header-title",
    type: "heading",
    content: "QUARTERLY SUSTAINABILITY REPORT",
    x: 8,
    y: 8,
    fontSize: 22,
    fontWeight: "700",
    color: "#123B2A",
  },
  {
    id: "el-header-sub",
    type: "subheading",
    content: "LEAF Technology Group • Document Ref: #RLF-2026-A4",
    x: 8,
    y: 13,
    fontSize: 12,
    fontWeight: "500",
    color: "#287A50",
  },
  {
    id: "el-body-p1",
    type: "text",
    content:
      "This document was printed on recycled standard 80 gsm bond paper. In accordance with zero-waste workplace targets, all misprinted paragraphs or superseded drafts must be flagged for digital correction.",
    x: 8,
    y: 20,
    fontSize: 13,
    fontWeight: "400",
    color: "#202821",
  },
  {
    id: "el-metric-box",
    type: "heading",
    content: "STATUS: PROTOTYPE HARDWARE RESTORATION SIMULATION",
    x: 8,
    y: 31,
    fontSize: 14,
    fontWeight: "600",
    color: "#287A50",
  },
  {
    id: "el-sample-error",
    type: "text",
    content:
      "Draft Note: The meeting is schedueled for Tuseday next week to discuss ink removal.",
    x: 8,
    y: 38,
    fontSize: 13,
    fontWeight: "400",
    color: "#B45309",
  },
  {
    id: "el-body-p2",
    type: "text",
    content:
      "RELEAF allows selective de-inking without re-pulping. Click any element on this page to select, edit content, or press Delete on your keyboard to instantly remove it.",
    x: 8,
    y: 47,
    fontSize: 13,
    fontWeight: "400",
    color: "#202821",
  },
  {
    id: "el-footer-auth",
    type: "subheading",
    content: "Authorized by RELEAF DocumentGuard Integrity Validation Module",
    x: 8,
    y: 88,
    fontSize: 11,
    fontWeight: "500",
    color: "#6B7280",
  },
];

// ── File Upload Zone ──────────────────────────────────────────────────────────
function UploadZone({ onFile }: { onFile: (file: UploadedFile) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ALLOWED = ["application/pdf", "image/png", "image/jpeg"];
  const MAX_MB = 10;

  const process = useCallback(
    (f: File) => {
      setError(null);
      if (!ALLOWED.includes(f.type)) {
        setError("Unsupported format. Please upload PDF, PNG, or JPG.");
        return;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_MB} MB.`);
        return;
      }
      const url = URL.createObjectURL(f);
      const type = f.type === "application/pdf" ? "pdf" : "image";
      onFile({ file: f, url, type });
    },
    [onFile]
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) process(f);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) process(f);
  };

  const handleDemoDoc = () => {
    // Generate simulated sample document
    const mockFile = new File(["RELEAF Demo Document"], "Sustainability_Report_2026.pdf", {
      type: "application/pdf",
    });
    onFile({
      file: mockFile,
      url: "",
      type: "pdf",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] p-8 text-center max-w-2xl mx-auto">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-forest/5 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
          <Upload className="w-8 h-8 animate-pulse text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-lime text-forest text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          AI OCR READY
        </div>
      </div>

      <h2 className="text-2xl font-bold text-forest mb-2">
        Upload Document to Interactive Studio
      </h2>
      <p className="text-sm text-charcoal/60 mb-6 max-w-md">
        Upload a PDF or scan to inspect, select, and delete individual document elements with Canva-grade interactive editing.
      </p>

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload document — drag and drop or click to browse"
        className={`w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-sage hover:border-primary/60 bg-white/60 hover:bg-white shadow-sm"
        }`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <FileText className="w-8 h-8 text-primary/40 mx-auto mb-2" />
        <p className="text-sm font-semibold text-charcoal mb-0.5">
          Drag & drop your PDF or image here
        </p>
        <p className="text-xs text-charcoal/50">
          or <span className="text-primary font-medium underline">browse from your computer</span>
        </p>
        <p className="text-[11px] text-charcoal/40 mt-3 font-mono">
          PDF, PNG, JPG • Up to 10 MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="sr-only"
          onChange={onChange}
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className="h-[1px] w-12 bg-sage" />
        <span className="text-xs text-charcoal/40 font-medium">OR TRY A DEMO DOCUMENT</span>
        <div className="h-[1px] w-12 bg-sage" />
      </div>

      <button
        onClick={handleDemoDoc}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-lime text-xs font-semibold hover:bg-forest/90 transition-all shadow-sm hover:shadow"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Load Interactive Demo Document (One-click)</span>
      </button>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs max-w-lg w-full mt-4"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

// ── DocumentGuard Realtime Classification ─────────────────────────────────────
type SecurityStatus = "green" | "amber" | "red";

interface SecurityResult {
  status: SecurityStatus;
  label: string;
  reason: string;
  action: string;
}

function classifyDocument(filename: string): SecurityResult {
  const name = filename.toLowerCase();
  if (
    name.includes("certificate") ||
    name.includes("transcript") ||
    name.includes("degree")
  ) {
    return {
      status: "red",
      label: "Blocked",
      reason:
        "This document appears to be an educational certificate or academic record. Editing these documents may constitute fraud. The operation has been blocked.",
      action:
        "If this is a legitimate correction request, contact your institution directly.",
    };
  }
  if (
    name.includes("invoice") ||
    name.includes("receipt") ||
    name.includes("contract") ||
    name.includes("financial")
  ) {
    return {
      status: "amber",
      label: "Review Required",
      reason:
        "This document may contain financial or contractual information. Modifications to sensitive fields (amounts, dates, names) require additional review.",
      action:
        "Review all proposed changes carefully. Editing amounts or parties in official financial documents may be restricted.",
    };
  }
  return {
    status: "green",
    label: "Permitted",
    reason:
      "No sensitive document patterns detected. Element-level editing is authorized under current rules.",
    action: "Continue with your selective editing or restoration workflow.",
  };
}

// ── Main Workspace Component ───────────────────────────────────────────────────
export default function WorkspaceClient() {
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [workflowState, setWorkflowState] = useState<WorkflowState>("idle");
  const [activeTab, setActiveTab] = useState<"editor" | "guard" | "deinker" | "elements">("editor");
  const [elements, setElements] = useState<DocElement[]>(DEFAULT_INITIAL_ELEMENTS);
  const [activeCanvasMode, setActiveCanvasMode] = useState<"select" | "deink-eraser" | "add-text">("select");
  const [selectedElement, setSelectedElement] = useState<DocElement | null>(null);
  const [appliedAI, setAppliedAI] = useState<Set<number>>(new Set());
  const [isSimulating, setIsSimulating] = useState(false);

  const handleFile = useCallback((f: UploadedFile) => {
    setUploaded(f);
    setWorkflowState("imported");
    setElements(DEFAULT_INITIAL_ELEMENTS);
  }, []);

  const handleRemove = useCallback(() => {
    if (uploaded?.url) URL.revokeObjectURL(uploaded.url);
    setUploaded(null);
    setWorkflowState("idle");
    setSelectedElement(null);
  }, [uploaded]);

  const advance = () => {
    setWorkflowState((s) => {
      const order: WorkflowState[] = [
        "imported",
        "analysed",
        "changes-proposed",
        "security-review",
        "paper-check",
        "awaiting-confirm",
        "processing",
        "completed",
      ];
      const idx = order.indexOf(s);
      if (idx < order.length - 1) return order[idx + 1];
      return s;
    });
  };

  const applyAISuggestion = (index: number) => {
    if (index === 0) {
      // Correct typo in elements
      const updated = elements.map((el) =>
        el.id === "el-sample-error"
          ? {
              ...el,
              content:
                "Corrected Note: The meeting is scheduled for Tuesday next week to discuss ink removal.",
              color: "#287A50",
              fontWeight: "500",
            }
          : el
      );
      setElements(updated);
      setAppliedAI((prev) => new Set([...prev, 0]));
    }
  };

  const runDeinkingSimulation = () => {
    setIsSimulating(true);
    setWorkflowState("processing");
    setTimeout(() => {
      setIsSimulating(false);
      setWorkflowState("completed");
    }, 2000);
  };

  const securityInfo = uploaded ? classifyDocument(uploaded.file.name) : null;
  const deletedCount = elements.filter((e) => e.isDeleted).length;

  return (
    <div className="flex flex-col h-screen bg-[#F4F1E8] text-charcoal overflow-hidden font-sans">
      {/* ── Top Header Navigation Bar ── */}
      <header className="h-14 bg-white/95 backdrop-blur border-b border-sage/60 px-5 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-forest flex items-center justify-center shadow-sm">
            <Layers className="w-4 h-4 text-lime" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-forest text-sm tracking-tight">RELEAF Studio</span>
              <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full border border-primary/20">
                PROTOTYPE v2.4
              </span>
            </div>
            {uploaded && (
              <p className="text-[11px] text-charcoal/50 truncate max-w-[220px]">
                {uploaded.file.name}
              </p>
            )}
          </div>
        </div>

        {/* Center: Stage Pills */}
        {uploaded && (
          <div className="hidden md:flex items-center gap-1 bg-sage/30 px-3 py-1.5 rounded-full border border-sage/50 text-xs">
            <span className="text-forest font-semibold flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              <span>Canvas Elements: {elements.length}</span>
            </span>
            <span className="text-charcoal/30">•</span>
            <span className="text-charcoal/60">
              {deletedCount > 0 ? (
                <span className="text-amber-700 font-medium">
                  {deletedCount} flagged for ink removal
                </span>
              ) : (
                "Select element to delete"
              )}
            </span>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {uploaded && (
            <>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(elements, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `releaf-modified-${uploaded.file.name}.json`;
                  a.click();
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-sage text-xs font-semibold text-charcoal hover:bg-sage/20 transition-colors"
                title="Export edited document layout"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={runDeinkingSimulation}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-forest text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Simulating De-inking…</span>
                  </>
                ) : (
                  <>
                    <Printer className="w-3.5 h-3.5 text-lime" />
                    <span>Send to RELEAF</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── Main Workspace Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar Strip (Canva-style) */}
        {uploaded && (
          <aside className="w-16 bg-white border-r border-sage/50 flex flex-col items-center py-4 gap-4 shrink-0 z-20">
            <button
              onClick={() => setActiveTab("editor")}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "editor"
                  ? "bg-forest text-lime shadow-md"
                  : "text-charcoal/60 hover:bg-sage/30 hover:text-charcoal"
              }`}
              title="Canvas & Elements"
            >
              <MousePointer2 className="w-4 h-4" />
              <span>Canvas</span>
            </button>

            <button
              onClick={() => setActiveTab("elements")}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "elements"
                  ? "bg-forest text-lime shadow-md"
                  : "text-charcoal/60 hover:bg-sage/30 hover:text-charcoal"
              }`}
              title="Element Layer Tree"
            >
              <Layers className="w-4 h-4" />
              <span>Layers</span>
            </button>

            <button
              onClick={() => setActiveTab("guard")}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "guard"
                  ? "bg-forest text-lime shadow-md"
                  : "text-charcoal/60 hover:bg-sage/30 hover:text-charcoal"
              }`}
              title="DocumentGuard Integrity"
            >
              <Shield className="w-4 h-4" />
              <span>Guard</span>
            </button>

            <button
              onClick={() => setActiveTab("deinker")}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "deinker"
                  ? "bg-forest text-lime shadow-md"
                  : "text-charcoal/60 hover:bg-sage/30 hover:text-charcoal"
              }`}
              title="De-inking Physical Simulator"
            >
              <Eraser className="w-4 h-4" />
              <span>De-ink</span>
            </button>

            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={handleRemove}
                className="w-10 h-10 rounded-xl text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                title="Remove current document"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

        {/* Center: Canvas Studio */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0B0E0D]">
          {!uploaded ? (
            <div className="flex-1 bg-cream overflow-auto">
              <UploadZone onFile={handleFile} />
            </div>
          ) : (
            <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
              <InteractiveDocumentCanvas
                fileName={uploaded.file.name}
                fileType={uploaded.type}
                fileUrl={uploaded.url}
                elements={elements}
                onElementsChange={setElements}
                activeMode={activeCanvasMode}
                onModeChange={setActiveCanvasMode}
                onSelectElement={setSelectedElement}
              />
            </div>
          )}
        </main>

        {/* Right Drawer Panel (Properties & AI Assistant) */}
        {uploaded && (
          <aside className="w-80 bg-white border-l border-sage/60 flex flex-col overflow-y-auto shrink-0 z-20">
            {/* Panel Tabs Header */}
            <div className="p-4 border-b border-sage/40 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-forest">
                {activeTab === "editor" && "AI Assistant & Editing"}
                {activeTab === "elements" && `Document Layers (${elements.length})`}
                {activeTab === "guard" && "DocumentGuard Security"}
                {activeTab === "deinker" && "Selective De-Inking Matrix"}
              </span>
              <span className="sim-badge">ACTIVE</span>
            </div>

            {/* TAB: Canvas & AI */}
            {activeTab === "editor" && (
              <div className="p-4 space-y-5">
                {/* Selected Element Quick Inspector */}
                {selectedElement ? (
                  <div className="bg-sage/20 rounded-2xl p-4 border border-sage/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-primary uppercase">
                        Selected Element
                      </span>
                      <span className="text-[10px] text-charcoal/50 font-mono">
                        ID: {selectedElement.id.slice(0, 10)}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-charcoal mb-2 line-clamp-2">
                      &ldquo;{selectedElement.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-sage/30">
                      <button
                        onClick={() => {
                          const updated = elements.filter((e) => e.id !== selectedElement.id);
                          setElements(updated);
                          setSelectedElement(null);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Element</span>
                      </button>

                      <button
                        onClick={() => {
                          const updated = elements.map((e) =>
                            e.id === selectedElement.id ? { ...e, isDeleted: !e.isDeleted } : e
                          );
                          setElements(updated);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eraser className="w-3.5 h-3.5" />
                        <span>{selectedElement.isDeleted ? "Unmark" : "Mark De-ink"}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 px-4 border-2 border-dashed border-sage/40 rounded-2xl text-charcoal/40 text-xs">
                    <MousePointer2 className="w-5 h-5 mx-auto mb-2 opacity-50 text-primary" />
                    Click any text element on the document to select, edit or delete it.
                  </div>
                )}

                {/* AI Document Restoration Suggestions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-bold text-forest uppercase tracking-wider">
                      AI Corrections
                    </h3>
                    <span className="ml-auto sim-badge">DEMO OCR</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-xl border border-sage/60 p-3 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-primary">Spelling Fix</span>
                        <span className="text-[10px] text-charcoal/40">Confidence: 98%</span>
                      </div>
                      <p className="text-[11px] line-through text-charcoal/40 mb-1">
                        &ldquo;schedueled for Tuseday&rdquo;
                      </p>
                      <p className="text-[11px] text-charcoal font-medium mb-2">
                        &rarr; &ldquo;scheduled for Tuesday&rdquo;
                      </p>
                      <button
                        onClick={() => applyAISuggestion(0)}
                        disabled={appliedAI.has(0)}
                        className={`w-full py-1 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                          appliedAI.has(0)
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-primary text-white hover:bg-forest"
                        }`}
                      >
                        {appliedAI.has(0) ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Applied to Canvas</span>
                          </>
                        ) : (
                          "Apply Correction"
                        )}
                      </button>
                    </div>

                    <div className="bg-white rounded-xl border border-sage/60 p-3 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-forest">Readability Suggestion</span>
                        <span className="text-[10px] text-charcoal/40">Suggested edit</span>
                      </div>
                      <p className="text-[11px] text-charcoal/70 mb-2">
                        Replace obsolete draft notes with updated quarterly sustainability goals.
                      </p>
                      <button
                        onClick={() => {
                          const updated = elements.map((el) =>
                            el.id === "el-metric-box"
                              ? {
                                  ...el,
                                  content: "TARGET REACHED: 100% RECYCLED PAPER REUSE ADOPTED",
                                  color: "#123B2A",
                                }
                              : el
                          );
                          setElements(updated);
                        }}
                        className="w-full py-1 rounded-lg bg-sage/30 hover:bg-sage/50 text-forest text-xs font-semibold transition-all"
                      >
                        Update Target Banner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
                  <div className="font-semibold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>How Selective Editing Works</span>
                  </div>
                  <p>
                    1. Click an element on the paper sheet to highlight it.
                  </p>
                  <p>
                    2. Press <kbd className="px-1 py-0.2 rounded bg-amber-200 font-mono text-[10px]">Delete</kbd> or click the trash can to remove it.
                  </p>
                  <p>
                    3. Double-click to edit text directly inline.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: Layers Tree */}
            {activeTab === "elements" && (
              <div className="p-4 space-y-2">
                <p className="text-xs text-charcoal/60 mb-2">
                  All interactive elements detected in this document:
                </p>
                {elements.map((el, i) => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElement(el)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedElement?.id === el.id
                        ? "bg-primary/10 border-primary"
                        : "bg-white border-sage hover:border-primary/40"
                    } ${el.isDeleted ? "opacity-40 line-through" : ""}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-charcoal/40">#{i + 1}</span>
                      <span className="truncate max-w-[170px] font-medium text-charcoal">
                        {el.content}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const updated = elements.filter((item) => item.id !== el.id);
                          setElements(updated);
                          if (selectedElement?.id === el.id) setSelectedElement(null);
                        }}
                        className="p-1 text-charcoal/40 hover:text-red-500 rounded"
                        title="Delete element"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: DocumentGuard Security */}
            {activeTab === "guard" && securityInfo && (
              <div className="p-4 space-y-4">
                <div
                  className={`rounded-2xl p-4 border ${
                    securityInfo.status === "green"
                      ? "status-green"
                      : securityInfo.status === "amber"
                      ? "status-amber"
                      : "status-red"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    <span>Decision: {securityInfo.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3">{securityInfo.reason}</p>
                  <p className="text-xs font-semibold">{securityInfo.action}</p>
                </div>

                <div className="bg-sage/20 rounded-2xl p-4 border border-sage/40 space-y-2 text-xs">
                  <h4 className="font-bold text-forest">Integrity Checklist</h4>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Non-academic certificate validated</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Financial value field not altered</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Element audit record attached</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: De-Inking Physical Simulator */}
            {activeTab === "deinker" && (
              <div className="p-4 space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Physical Simulation Mode</span>
                  </div>
                  <p>
                    Physical ink removal chamber is simulated for this hackathon build. RELEAF calculates precise micron coordinate masks for de-inking lasers or bio-solvents.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-sage/60 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-forest">Simulation Metrics</h4>
                  <div className="flex justify-between text-xs py-1 border-b border-sage/20">
                    <span className="text-charcoal/60">Paper Substrate:</span>
                    <span className="font-semibold">Standard 80 gsm</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-sage/20">
                    <span className="text-charcoal/60">De-inking Targets:</span>
                    <span className="font-semibold text-amber-700">{deletedCount} elements</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-sage/20">
                    <span className="text-charcoal/60">Cycle Count:</span>
                    <span className="font-semibold">Cycle 1 of 2</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-charcoal/60">Fibre Degradation:</span>
                    <span className="font-semibold text-green-700">&lt; 2.5%</span>
                  </div>
                </div>

                <button
                  onClick={runDeinkingSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 rounded-xl bg-forest hover:bg-primary text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                  <span>{isSimulating ? "Processing Chamber…" : "Trigger Simulated Ink Removal"}</span>
                </button>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
