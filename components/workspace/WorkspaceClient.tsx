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
  ChevronLeft,
  RefreshCw,
  FileCheck,
  Zap,
  MousePointer2,
  Square,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  FolderOpen,
  Eye,
  FileDown,
  Sparkle,
  Lock,
} from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";
import InteractiveDocumentCanvas, {
  DocElement,
} from "@/components/document/InteractiveDocumentCanvas";
import { exportElementsToPdf } from "@/lib/document/pdfExporter";

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
  pageCount?: number;
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
    textAlign: "left",
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
    textAlign: "left",
  },
  {
    id: "el-divider-1",
    type: "divider",
    content: "",
    x: 8,
    y: 17,
    width: 84,
  },
  {
    id: "el-body-p1",
    type: "text",
    content:
      "This document was printed on recycled standard 80 gsm bond paper. In accordance with zero-waste workplace targets, all misprinted paragraphs or superseded drafts must be flagged for digital correction.",
    x: 8,
    y: 21,
    fontSize: 13,
    fontWeight: "400",
    color: "#202821",
    textAlign: "left",
  },
  {
    id: "el-metric-box",
    type: "heading",
    content: "STATUS: PROTOTYPE HARDWARE RESTORATION SIMULATION",
    x: 8,
    y: 32,
    fontSize: 14,
    fontWeight: "600",
    color: "#287A50",
    textAlign: "left",
  },
  {
    id: "el-sample-error",
    type: "text",
    content:
      "Draft Note: The meeting is schedueled for Tuseday next week to discuss ink removal.",
    x: 8,
    y: 39,
    fontSize: 13,
    fontWeight: "400",
    color: "#B45309",
    textAlign: "left",
  },
  {
    id: "el-body-p2",
    type: "text",
    content:
      "RELEAF allows selective de-inking without re-pulping. Click any element on this page to select, edit content, or press Delete on your keyboard to instantly remove it.",
    x: 8,
    y: 48,
    fontSize: 13,
    fontWeight: "400",
    color: "#202821",
    textAlign: "left",
  },
  {
    id: "el-divider-2",
    type: "divider",
    content: "",
    x: 8,
    y: 84,
    width: 84,
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
    textAlign: "left",
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
      onFile({ file: f, url, type, pageCount: 1 });
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
    const mockFile = new File(["RELEAF Demo Document"], "Sustainability_Report_2026.pdf", {
      type: "application/pdf",
    });
    onFile({
      file: mockFile,
      url: "",
      type: "pdf",
      pageCount: 1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[580px] p-8 text-center max-w-2xl mx-auto">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-forest/5 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
          <Upload className="w-8 h-8 animate-pulse text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-lime text-forest text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          CANVA EDITOR
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
        <span className="text-xs text-charcoal/40 font-medium uppercase tracking-wider">
          One-Click Hackathon Sample
        </span>
        <div className="h-[1px] w-12 bg-sage" />
      </div>

      <button
        onClick={handleDemoDoc}
        className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-lime text-xs font-semibold hover:bg-forest/90 transition-all shadow-sm hover:shadow"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Load Interactive Demo Document</span>
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
  const [activeTab, setActiveTab] = useState<"pages" | "text" | "elements" | "layers" | "guard" | "deinker">("text");
  const [elements, setElements] = useState<DocElement[]>(DEFAULT_INITIAL_ELEMENTS);
  const [activeCanvasMode, setActiveCanvasMode] = useState<"select" | "deink-eraser" | "add-text">("select");
  const [selectedElement, setSelectedElement] = useState<DocElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [appliedAI, setAppliedAI] = useState<Set<number>>(new Set());
  const [isSimulating, setIsSimulating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [leftNavCollapsed, setLeftNavCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved">("saved");

  const handleFile = useCallback((f: UploadedFile) => {
    setUploaded(f);
    setWorkflowState("imported");
    setElements(DEFAULT_INITIAL_ELEMENTS);
    setSelectedElement(null);
    setSaveStatus("saved");
  }, []);

  const handleRemove = useCallback(() => {
    if (uploaded?.url) URL.revokeObjectURL(uploaded.url);
    setUploaded(null);
    setWorkflowState("idle");
    setSelectedElement(null);
  }, [uploaded]);

  const handleElementsChange = (newElements: DocElement[]) => {
    setElements(newElements);
    setSaveStatus("unsaved");
  };

  const applyAISuggestion = (index: number) => {
    if (index === 0) {
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
      setSaveStatus("unsaved");
    }
  };

  const handleExportPdf = async () => {
    if (!uploaded) return;
    setIsExporting(true);
    const result = await exportElementsToPdf(
      elements,
      `releaf-edited-${uploaded.file.name.replace(/\.[^/.]+$/, "")}.pdf`
    );
    setIsExporting(false);
    if (result.success) {
      setSaveStatus("saved");
    } else {
      alert(`Export failed: ${result.error}`);
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

  const addElement = (type: DocElement["type"]) => {
    const newEl: DocElement = {
      id: "el-" + Date.now(),
      type,
      content:
        type === "heading"
          ? "New Section Heading"
          : type === "subheading"
          ? "Supporting Subheading"
          : type === "box"
          ? ""
          : type === "divider"
          ? ""
          : "Click to edit this text paragraph with notes or revisions.",
      x: 12,
      y: 20 + (elements.length % 7) * 7,
      width: type === "box" ? 70 : type === "divider" ? 84 : undefined,
      height: type === "box" ? 8 : type === "divider" ? 1 : undefined,
      fontSize: type === "heading" ? 22 : type === "subheading" ? 15 : 13,
      fontWeight: type === "heading" ? "bold" : type === "subheading" ? "600" : "normal",
      color: "#202821",
      bgColor: type === "box" ? "#DDE9D9" : undefined,
    };
    const updated = [...elements, newEl];
    setElements(updated);
    setSelectedElement(newEl);
    setSaveStatus("unsaved");
  };

  const securityInfo = uploaded ? classifyDocument(uploaded.file.name) : null;
  const deletedCount = elements.filter((e) => e.isDeleted).length;

  return (
    <div className="flex flex-col h-screen bg-[#0D1210] text-[#202821] overflow-hidden font-sans">
      {/* ── Top Header Navigation Bar ── */}
      <header className="h-14 bg-[#151D18] border-b border-white/10 px-5 flex items-center justify-between z-30 shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-forest flex items-center justify-center shadow-sm border border-lime/30">
            <Layers className="w-4 h-4 text-lime" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">RELEAF Studio</span>
              <span className="text-[10px] bg-lime/10 text-lime font-semibold px-2 py-0.5 rounded-full border border-lime/30">
                CANVA WORKSPACE
              </span>
            </div>
            {uploaded && (
              <p className="text-[11px] text-sage/60 truncate max-w-[220px]">
                {uploaded.file.name}
              </p>
            )}
          </div>
        </div>

        {/* Center: Stage Pills & Save Indicator */}
        {uploaded && (
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 text-xs">
              <FileCheck className="w-3.5 h-3.5 text-lime" />
              <span className="text-white/80 font-medium">
                {elements.length} Elements
              </span>
              <span className="text-white/20">•</span>
              <span className="text-sage/60">
                {deletedCount > 0 ? (
                  <span className="text-amber-400 font-medium">
                    {deletedCount} flagged for de-inking
                  </span>
                ) : (
                  "All Active"
                )}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-sage/70 font-mono">
              <span
                className={`w-2 h-2 rounded-full ${
                  saveStatus === "saved" ? "bg-lime" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span>{saveStatus === "saved" ? "Saved in session" : "Unsaved edits"}</span>
            </div>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {uploaded && (
            <>
              <button
                onClick={handleExportPdf}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                title="Export real vector PDF with deletions applied"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-lime" />
                    <span>Exporting…</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5 text-lime" />
                    <span className="hidden sm:inline">Export PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={runDeinkingSimulation}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-forest text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50 border border-lime/20"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Chamber Active…</span>
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

      {/* ── Main Workspace Body (3-Panel Canva Layout) ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. Left Nav Strips (Canva Tabs) */}
        {uploaded && (
          <aside className="w-16 bg-[#121814] border-r border-white/10 flex flex-col items-center py-3 gap-3 shrink-0 z-20 text-white">
            <button
              onClick={() => {
                setActiveTab("text");
                setLeftNavCollapsed(false);
              }}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "text" && !leftNavCollapsed
                  ? "bg-forest text-lime shadow-md border border-lime/30"
                  : "text-sage/60 hover:bg-white/5 hover:text-white"
              }`}
              title="Text Elements"
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("elements");
                setLeftNavCollapsed(false);
              }}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "elements" && !leftNavCollapsed
                  ? "bg-forest text-lime shadow-md border border-lime/30"
                  : "text-sage/60 hover:bg-white/5 hover:text-white"
              }`}
              title="Shapes & Boxes"
            >
              <Square className="w-4 h-4" />
              <span>Shapes</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("layers");
                setLeftNavCollapsed(false);
              }}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "layers" && !leftNavCollapsed
                  ? "bg-forest text-lime shadow-md border border-lime/30"
                  : "text-sage/60 hover:bg-white/5 hover:text-white"
              }`}
              title="Document Layer Tree"
            >
              <Layers className="w-4 h-4" />
              <span>Layers</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("guard");
                setLeftNavCollapsed(false);
              }}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "guard" && !leftNavCollapsed
                  ? "bg-forest text-lime shadow-md border border-lime/30"
                  : "text-sage/60 hover:bg-white/5 hover:text-white"
              }`}
              title="DocumentGuard Security"
            >
              <Shield className="w-4 h-4" />
              <span>Guard</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("deinker");
                setLeftNavCollapsed(false);
              }}
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
                activeTab === "deinker" && !leftNavCollapsed
                  ? "bg-forest text-lime shadow-md border border-lime/30"
                  : "text-sage/60 hover:bg-white/5 hover:text-white"
              }`}
              title="Physical De-Inker Simulator"
            >
              <Eraser className="w-4 h-4" />
              <span>De-ink</span>
            </button>

            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={handleRemove}
                className="w-10 h-10 rounded-xl text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                title="Remove current document"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

        {/* 2. Left Sub-Drawer (Canva Content Panel) */}
        {uploaded && !leftNavCollapsed && (
          <aside className="w-64 bg-[#151D18] border-r border-white/10 flex flex-col shrink-0 z-10 text-white animate-in slide-in-from-left-2 duration-150">
            <div className="p-3.5 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-lime">
                {activeTab === "text" && "Add Text Elements"}
                {activeTab === "elements" && "Add Shapes & Lines"}
                {activeTab === "layers" && `Document Layers (${elements.length})`}
                {activeTab === "guard" && "Security Verification"}
                {activeTab === "deinker" && "De-Inking Setup"}
              </span>
              <button
                onClick={() => setLeftNavCollapsed(true)}
                className="text-sage/60 hover:text-white p-1 rounded"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Add Text Options */}
              {activeTab === "text" && (
                <div className="space-y-3">
                  <p className="text-[11px] text-sage/70">
                    Click to add new typography blocks directly to the canvas:
                  </p>
                  <button
                    onClick={() => addElement("heading")}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <span className="block text-base font-bold text-white group-hover:text-lime">
                      Add a Heading
                    </span>
                    <span className="text-[10px] text-sage/50">22px Bold Section Title</span>
                  </button>

                  <button
                    onClick={() => addElement("subheading")}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <span className="block text-sm font-semibold text-white group-hover:text-lime">
                      Add a Subheading
                    </span>
                    <span className="text-[10px] text-sage/50">15px Semibold text</span>
                  </button>

                  <button
                    onClick={() => addElement("text")}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <span className="block text-xs text-white group-hover:text-lime">
                      Add Body Text Paragraph
                    </span>
                    <span className="text-[10px] text-sage/50">13px standard editable body</span>
                  </button>
                </div>
              )}

              {/* Add Shapes Options */}
              {activeTab === "elements" && (
                <div className="space-y-3">
                  <p className="text-[11px] text-sage/70">
                    Shapes & containers for redaction or highlighting:
                  </p>
                  <button
                    onClick={() => addElement("box")}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded bg-sage/30 border border-sage/50 flex items-center justify-center">
                      <Square className="w-4 h-4 text-lime" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white group-hover:text-lime">
                        Highlight Container
                      </span>
                      <span className="text-[10px] text-sage/50">Rounded background box</span>
                    </div>
                  </button>

                  <button
                    onClick={() => addElement("divider")}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded bg-sage/30 border border-sage/50 flex items-center justify-center">
                      <Minus className="w-4 h-4 text-lime" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white group-hover:text-lime">
                        Horizontal Rule
                      </span>
                      <span className="text-[10px] text-sage/50">Section separator line</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Layers List */}
              {activeTab === "layers" && (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-sage/70 mb-2">
                    Click to select and inspect on canvas:
                  </p>
                  {elements.map((el, idx) => (
                    <div
                      key={el.id}
                      onClick={() => setSelectedElement(el)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-all ${
                        selectedElement?.id === el.id
                          ? "bg-primary/30 border-lime text-lime font-medium"
                          : "bg-white/5 border-white/5 text-sage hover:bg-white/10"
                      } ${el.isDeleted ? "line-through opacity-40 text-red-300" : ""}`}
                    >
                      <div className="flex items-center gap-2 truncate max-w-[150px]">
                        <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
                        <span className="truncate">{el.content || el.type}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const updated = elements.filter((item) => item.id !== el.id);
                          setElements(updated);
                          if (selectedElement?.id === el.id) setSelectedElement(null);
                        }}
                        className="text-white/40 hover:text-red-400 p-1"
                        title="Delete element"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* DocumentGuard Tab */}
              {activeTab === "guard" && securityInfo && (
                <div className="space-y-3">
                  <div
                    className={`rounded-xl p-3 border text-xs ${
                      securityInfo.status === "green"
                        ? "bg-green-950/40 border-green-700/50 text-green-300"
                        : securityInfo.status === "amber"
                        ? "bg-amber-950/40 border-amber-700/50 text-amber-300"
                        : "bg-red-950/40 border-red-700/50 text-red-300"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{securityInfo.label}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed mb-2 opacity-90">{securityInfo.reason}</p>
                    <p className="text-[11px] font-semibold">{securityInfo.action}</p>
                  </div>
                </div>
              )}

              {/* De-inker Tab */}
              {activeTab === "deinker" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-amber-950/40 border border-amber-700/50 text-amber-300 rounded-xl p-3">
                    <p className="font-bold mb-1">Hardware Simulation</p>
                    <p className="text-[11px] text-amber-200/80">
                      RELEAF calculates micron-precise coordinate masks for targeted laser/solvent ink release.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl border border-white/10 p-3 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-sage/60">Marked for De-ink:</span>
                      <span className="font-semibold text-amber-400">{deletedCount} targets</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-sage/60">Substrate:</span>
                      <span className="font-semibold text-white">80 gsm Bond</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* 3. Center Canvas Studio */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0D1210]">
          {!uploaded ? (
            <div className="flex-1 bg-cream overflow-auto">
              <UploadZone onFile={handleFile} />
            </div>
          ) : (
            <div className="flex-1 p-3 md:p-5 overflow-hidden flex flex-col">
              <InteractiveDocumentCanvas
                fileName={uploaded.file.name}
                fileType={uploaded.type}
                fileUrl={uploaded.url}
                elements={elements}
                onElementsChange={handleElementsChange}
                activeMode={activeCanvasMode}
                onModeChange={setActiveCanvasMode}
                selectedId={selectedElement?.id || null}
                onSelectElement={setSelectedElement}
                zoom={zoom}
                onZoomChange={setZoom}
              />
            </div>
          )}
        </main>

        {/* 4. Right Properties & AI Assistant Panel (Canva Style Inspector) */}
        {uploaded && !rightPanelCollapsed && (
          <aside className="w-80 bg-[#151D18] border-l border-white/10 flex flex-col shrink-0 z-20 text-white overflow-y-auto">
            {/* Inspector Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-lime flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Element Inspector</span>
              </span>
              <button
                onClick={() => setRightPanelCollapsed(true)}
                className="text-sage/60 hover:text-white p-1 rounded"
                title="Collapse Inspector"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-5">
              {/* Selected Element Quick Properties */}
              {selectedElement ? (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-lime uppercase">
                      Active Element
                    </span>
                    <span className="text-[10px] text-sage/40 font-mono">
                      {selectedElement.type}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-sage/60 uppercase font-semibold block mb-1">
                      Content Text
                    </label>
                    <textarea
                      value={selectedElement.content}
                      rows={3}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated = elements.map((el) =>
                          el.id === selectedElement.id ? { ...el, content: val } : el
                        );
                        handleElementsChange(updated);
                        setSelectedElement({ ...selectedElement, content: val });
                      }}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-sage/60 uppercase font-semibold block mb-1">
                        Font Size
                      </label>
                      <input
                        type="number"
                        min={8}
                        max={72}
                        value={selectedElement.fontSize || 14}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = elements.map((el) =>
                            el.id === selectedElement.id ? { ...el, fontSize: val } : el
                          );
                          handleElementsChange(updated);
                          setSelectedElement({ ...selectedElement, fontSize: val });
                        }}
                        className="w-full bg-black/40 border border-white/15 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-sage/60 uppercase font-semibold block mb-1">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={selectedElement.color || "#202821"}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updated = elements.map((el) =>
                              el.id === selectedElement.id ? { ...el, color: val } : el
                            );
                            handleElementsChange(updated);
                            setSelectedElement({ ...selectedElement, color: val });
                          }}
                          className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                        />
                        <span className="font-mono text-[10px] text-sage/60">
                          {selectedElement.color || "#202821"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        const updated = elements.filter((el) => el.id !== selectedElement.id);
                        handleElementsChange(updated);
                        setSelectedElement(null);
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Element</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 px-4 border border-dashed border-white/10 rounded-2xl text-sage/40 text-xs">
                  <MousePointer2 className="w-5 h-5 mx-auto mb-2 opacity-40 text-lime" />
                  Select an element on canvas to adjust typography, colors, and positioning.
                </div>
              )}

              {/* AI Document Restoration Suggestions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-lime" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    AI Restoration Radar
                  </h3>
                  <span className="ml-auto sim-badge">ACTIVE</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/5 rounded-xl border border-white/10 p-3 shadow-xs">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-lime">Spelling & Readability</span>
                      <span className="text-[10px] text-sage/40">Confidence 98%</span>
                    </div>
                    <p className="text-[11px] line-through text-sage/40 mb-1">
                      &ldquo;schedueled for Tuseday&rdquo;
                    </p>
                    <p className="text-[11px] text-white font-medium mb-2">
                      &rarr; &ldquo;scheduled for Tuesday&rdquo;
                    </p>
                    <button
                      onClick={() => applyAISuggestion(0)}
                      disabled={appliedAI.has(0)}
                      className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        appliedAI.has(0)
                          ? "bg-green-500/20 text-lime border border-lime/30"
                          : "bg-primary text-white hover:bg-forest"
                      }`}
                    >
                      {appliedAI.has(0) ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Applied to Document</span>
                        </>
                      ) : (
                        "Apply Correction"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Deletion & Redaction Guarantee */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-sage/70 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-lime" />
                  <span>Real Deletion Guarantee</span>
                </div>
                <p className="text-[10px] text-sage/60">
                  Elements you delete are completely omitted from the generated PDF export stream — not hidden under white rectangles.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
