"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles,
  Shield,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
} from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";

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

// ── File Upload Zone ──────────────────────────────────────────────────────────
function UploadZone({
  onFile,
}: {
  onFile: (file: UploadedFile) => void;
}) {
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

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload document — drag and drop or click to browse"
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-sage hover:border-primary/60 bg-sage/20"
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
        <Upload
          className="w-10 h-10 text-primary/50 mx-auto mb-4"
          aria-hidden="true"
        />
        <p className="text-base font-semibold text-charcoal mb-1">
          Drop your document here
        </p>
        <p className="text-sm text-charcoal/50">
          or <span className="text-primary underline underline-offset-2">browse files</span>
        </p>
        <p className="text-xs text-charcoal/40 mt-3">
          PDF, PNG, JPG — up to 10 MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="sr-only"
          onChange={onChange}
          aria-hidden="true"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm max-w-lg w-full"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  );
}

// ── Document Viewer ───────────────────────────────────────────────────────────
function DocumentViewer({
  uploaded,
  onRemove,
}: {
  uploaded: UploadedFile;
  onRemove: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-sage bg-white rounded-t-xl flex-wrap">
        <FileText className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium text-charcoal truncate flex-1">
          {uploaded.file.name}
        </span>
        <span className="text-xs text-charcoal/40">
          {(uploaded.file.size / 1024).toFixed(0)} KB
        </span>

        <div className="flex items-center gap-1 ml-2" role="group" aria-label="View controls">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            className="p-1.5 rounded hover:bg-sage/50 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <span className="text-xs w-10 text-center" aria-label={`Zoom ${Math.round(zoom * 100)}%`}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="p-1.5 rounded hover:bg-sage/50 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="p-1.5 rounded hover:bg-sage/50 transition-colors"
            aria-label="Rotate 90 degrees"
          >
            <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 rounded hover:bg-red-50 text-charcoal hover:text-red-600 transition-colors"
            aria-label="Remove document"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-charcoal/5 rounded-b-xl flex items-center justify-center p-4">
        {uploaded.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={uploaded.url}
            alt={`Preview of ${uploaded.file.name}`}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center",
              transition: "transform 0.2s ease",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            className="object-contain rounded shadow-lg"
          />
        ) : (
          <iframe
            src={`${uploaded.url}#view=FitH`}
            title={`PDF preview: ${uploaded.file.name}`}
            className="w-full rounded shadow-lg"
            style={{
              height: "500px",
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ── DocumentGuard Panel ───────────────────────────────────────────────────────
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
      "No sensitive document patterns detected. The operation may proceed under the current rules.",
    action: "Continue with your document restoration workflow.",
  };
}

function DocumentGuardPanel({ filename }: { filename: string }) {
  const result = classifyDocument(filename);
  const statusClass = {
    green: "status-green",
    amber: "status-amber",
    red: "status-red",
  }[result.status];

  return (
    <div className={`rounded-xl border p-4 ${statusClass}`}>
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">DocumentGuard</span>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {result.label}
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-2">{result.reason}</p>
          <p className="text-xs font-medium">{result.action}</p>
        </div>
      </div>
    </div>
  );
}

// ── AI Assistant Panel ────────────────────────────────────────────────────────
const AI_DEMO_SUGGESTIONS = [
  {
    type: "spelling",
    original: 'The meeting is "schedueled" for Tuseday.',
    corrected: 'The meeting is "scheduled" for Tuesday.',
    confidence: "High",
  },
  {
    type: "readability",
    original: "The document contains information pertaining to the aforementioned matter.",
    corrected: "The document contains information about this matter.",
    confidence: "Medium",
  },
];

function AIAssistantPanel({ hasDocument }: { hasDocument: boolean }) {
  const [applied, setApplied] = useState<Set<number>>(new Set());

  if (!hasDocument) {
    return (
      <div className="text-center py-8 text-charcoal/40">
        <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
        <p className="text-sm">Upload a document to see AI suggestions</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold text-charcoal">AI Suggestions</span>
        <span className="ml-auto sim-badge">DEMO MODE</span>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-4">
        No AI API key configured. Showing sample interactions only.
      </div>

      <div className="space-y-3">
        {AI_DEMO_SUGGESTIONS.map((s, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3 text-xs transition-all ${
              applied.has(i)
                ? "bg-green-50 border-green-200 opacity-60"
                : "bg-white border-sage"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary capitalize">{s.type}</span>
              <span className="text-charcoal/40">Confidence: {s.confidence}</span>
            </div>
            <p className="line-through text-charcoal/40 mb-1 text-[11px] leading-relaxed">
              {s.original}
            </p>
            <p className="text-charcoal text-[11px] leading-relaxed">{s.corrected}</p>
            {!applied.has(i) && (
              <button
                onClick={() => setApplied((prev) => new Set([...prev, i]))}
                className="mt-2 px-3 py-1 rounded bg-primary/10 text-primary text-[11px] font-semibold hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Apply suggestion
              </button>
            )}
            {applied.has(i) && (
              <span className="flex items-center gap-1 mt-2 text-green-700 text-[11px]">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Applied
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-charcoal/40 mt-4 text-center">
        AI suggestions are for review only. Apply individually.
      </p>
    </div>
  );
}

// ── De-Inking Workflow ────────────────────────────────────────────────────────
const WORKFLOW_LABELS: Record<WorkflowState, string> = {
  idle: "No document",
  imported: "Document imported",
  analysed: "Document analysed",
  "changes-proposed": "Changes proposed",
  "security-review": "Security review",
  "paper-check": "Paper compatibility",
  "awaiting-confirm": "Awaiting confirmation",
  processing: "Processing…",
  completed: "Completed",
  failed: "Failed",
};

function WorkflowStepper({ state }: { state: WorkflowState }) {
  const states: WorkflowState[] = [
    "imported",
    "analysed",
    "changes-proposed",
    "security-review",
    "paper-check",
    "awaiting-confirm",
    "processing",
    "completed",
  ];

  const currentIdx = states.indexOf(state);

  return (
    <div aria-label="Restoration workflow progress" role="progressbar" aria-valuenow={currentIdx + 1} aria-valuemax={states.length} aria-valuetext={WORKFLOW_LABELS[state]}>
      <div className="flex gap-1">
        {states.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i <= currentIdx
                ? state === "failed"
                  ? "bg-red-400"
                  : "bg-primary"
                : "bg-sage"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-xs text-charcoal/50 mt-1 text-right" aria-live="polite">
        {WORKFLOW_LABELS[state]}
      </p>
    </div>
  );
}

// ── Main Workspace ────────────────────────────────────────────────────────────
export default function WorkspaceClient() {
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [workflowState, setWorkflowState] = useState<WorkflowState>("idle");
  const [activeTab, setActiveTab] = useState<"editor" | "guard" | "deinker">("editor");
  const [deinkRegion, setDeinkRegion] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFile = useCallback((f: UploadedFile) => {
    setUploaded(f);
    setWorkflowState("imported");
    setDeinkRegion(false);
    setConfirmed(false);
  }, []);

  const handleRemove = useCallback(() => {
    if (uploaded) URL.revokeObjectURL(uploaded.url);
    setUploaded(null);
    setWorkflowState("idle");
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

  const tabs = [
    { id: "editor" as const, label: "Editor", icon: FileText },
    { id: "guard" as const, label: "DocumentGuard", icon: Shield },
    { id: "deinker" as const, label: "De-Inking", icon: Layers },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-sage px-4 py-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 font-bold text-forest text-lg">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
            <Layers className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </span>
          RELEAF Workspace
        </div>
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {uploaded && (
            <WorkflowStepper state={workflowState} />
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden" aria-label="Document workspace">
        {/* Left panel — upload / thumbnail */}
        <aside
          className="w-full lg:w-56 bg-white border-b lg:border-b-0 lg:border-r border-sage p-4 flex flex-col gap-4"
          aria-label="Document panel"
        >
          <h2 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
            Document
          </h2>

          {!uploaded && (
            <p className="text-sm text-charcoal/40">
              No document yet. Upload to begin.
            </p>
          )}

          {uploaded && (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-sage/20 rounded-xl border border-sage">
                <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-charcoal truncate">
                    {uploaded.file.name}
                  </p>
                  <p className="text-xs text-charcoal/40 capitalize">
                    {uploaded.type} •{" "}
                    {(uploaded.file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>

              {/* Workflow advance */}
              {workflowState !== "completed" && workflowState !== "processing" && (
                <button
                  onClick={advance}
                  className="w-full py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-forest transition-colors"
                >
                  {workflowState === "awaiting-confirm" ? "Confirm & Simulate" : "Advance Workflow →"}
                </button>
              )}

              {workflowState === "processing" && (
                <div className="flex items-center gap-2 py-2 text-xs text-primary">
                  <Clock className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  Simulating…
                </div>
              )}

              {workflowState === "completed" && (
                <div className="flex items-center gap-2 py-2 text-xs text-green-700 bg-green-50 rounded-lg px-3 border border-green-200">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Simulation complete
                </div>
              )}

              <button
                onClick={handleRemove}
                className="w-full py-2 rounded-lg border border-sage text-charcoal text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors flex items-center gap-1.5 justify-center"
              >
                <X className="w-3 h-3" aria-hidden="true" /> Remove document
              </button>
            </div>
          )}

          <div className="mt-auto">
            <div className="flex items-start gap-2 p-3 bg-sage/20 rounded-xl text-xs text-charcoal/50">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              Documents are processed locally in your browser. Nothing is uploaded to a server.
            </div>
          </div>
        </aside>

        {/* Centre — viewer */}
        <section
          className="flex-1 flex flex-col p-4 min-h-[400px]"
          aria-label="Document viewer"
        >
          {!uploaded ? (
            <UploadZone onFile={handleFile} />
          ) : (
            <DocumentViewer uploaded={uploaded} onRemove={handleRemove} />
          )}
        </section>

        {/* Right panel — tabs */}
        <aside
          className="w-full lg:w-72 bg-white border-t lg:border-t-0 lg:border-l border-sage flex flex-col"
          aria-label="Tools panel"
        >
          {/* Tab bar */}
          <div className="flex border-b border-sage" role="tablist" aria-label="Tool panels">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors border-b-2 ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-charcoal/50 hover:text-charcoal"
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-label={`${activeTab} panel`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === "editor" && (
                  <AIAssistantPanel hasDocument={!!uploaded} />
                )}

                {activeTab === "guard" && (
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                      DocumentGuard
                    </h3>
                    {!uploaded ? (
                      <p className="text-sm text-charcoal/40">
                        Upload a document to run security checks.
                      </p>
                    ) : (
                      <DocumentGuardPanel filename={uploaded.file.name} />
                    )}
                  </div>
                )}

                {activeTab === "deinker" && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-charcoal">
                        De-Inking
                      </h3>
                      <span className="ml-auto sim-badge">SIMULATION</span>
                    </div>

                    {!uploaded ? (
                      <p className="text-sm text-charcoal/40">
                        Upload a document to see de-inking options.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
                          <AlertTriangle className="inline w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                          This is a simulation. Physical ink removal requires
                          compatible RELEAF hardware, which is currently under
                          development.
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-charcoal/60 block mb-2">
                            Paper type
                          </label>
                          <select className="w-full border border-sage rounded-lg px-3 py-2 text-sm bg-white text-charcoal focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>Standard office (80 gsm)</option>
                            <option>Recycled paper</option>
                            <option>Bond paper</option>
                            <option>Previously printed (for reuse)</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={deinkRegion}
                              onChange={(e) => setDeinkRegion(e.target.checked)}
                              className="rounded border-sage text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-charcoal">
                              Select region for de-inking
                            </span>
                          </label>
                        </div>

                        {deinkRegion && (
                          <div className="bg-lime/20 border border-lime/40 rounded-xl p-3 text-xs text-forest">
                            <CheckCircle2 className="inline w-3.5 h-3.5 mr-1.5 text-primary" aria-hidden="true" />
                            Region selected (simulation). Workflow will target
                            lines 3–5 of page 1 for ink removal.
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setWorkflowState("paper-check");
                            setConfirmed(true);
                          }}
                          disabled={!deinkRegion || workflowState === "completed"}
                          className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          Start Simulated Restoration
                        </button>

                        {confirmed && workflowState !== "idle" && (
                          <div className="text-xs text-charcoal/50 text-center">
                            Workflow state: <strong>{WORKFLOW_LABELS[workflowState]}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </main>
    </div>
  );
}
