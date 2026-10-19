"use client";

import { useState, useRef, useEffect } from "react";
import {
  Type,
  Heading1,
  Heading2,
  Trash2,
  Copy,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles,
  Layers,
  MousePointer2,
  Square,
  Move,
  Eraser,
  Download,
  Eye,
  Check,
  AlertCircle,
  FileCheck2,
} from "lucide-react";

export interface DocElement {
  id: string;
  type: "text" | "heading" | "subheading" | "badge" | "box" | "divider";
  content: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  width?: number; // percentage
  height?: number; // percentage
  fontSize?: number; // px
  fontWeight?: string;
  color?: string;
  bgColor?: string;
  border?: string;
  isDeleted?: boolean; // if marked for de-inking
  isRestored?: boolean; // corrected new element
  confidence?: number;
}

interface InteractiveDocumentCanvasProps {
  fileName: string;
  fileType: "pdf" | "image";
  fileUrl: string;
  elements: DocElement[];
  onElementsChange: (elements: DocElement[]) => void;
  activeMode: "select" | "deink-eraser" | "add-text";
  onModeChange: (mode: "select" | "deink-eraser" | "add-text") => void;
  onSelectElement?: (el: DocElement | null) => void;
}

export default function InteractiveDocumentCanvas({
  fileName,
  fileType,
  fileUrl,
  elements,
  onElementsChange,
  activeMode,
  onModeChange,
  onSelectElement,
}: InteractiveDocumentCanvasProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<DocElement[][]>([elements]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeinkHeatmap, setShowDeinkHeatmap] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Push history state
  const pushState = (newElements: DocElement[]) => {
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newElements);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
    onElementsChange(newElements);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onElementsChange(prev);
      setSelectedId(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onElementsChange(next);
      setSelectedId(null);
    }
  };

  // Keyboard shortcuts (Delete, Backspace, Ctrl+Z, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if currently editing text inside an input/contenteditable
      if (editingId) return;

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        deleteSelected();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (e.key === "Escape") {
        setSelectedId(null);
        setEditingId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, editingId, historyIndex, history]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    const target = elements.find((el) => el.id === selectedId);
    if (!target) return;

    const updated = elements.filter((el) => el.id !== selectedId);
    pushState(updated);
    setSelectedId(null);
    showToast(`Element "${target.content.slice(0, 18)}..." deleted`);
  };

  const markForDeinking = (id: string) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, isDeleted: !el.isDeleted } : el
    );
    pushState(updated);
    const target = updated.find((e) => e.id === id);
    showToast(
      target?.isDeleted
        ? "Element marked for physical de-inking"
        : "Element de-inking mark removed"
    );
  };

  const duplicateSelected = () => {
    if (!selectedId) return;
    const target = elements.find((el) => el.id === selectedId);
    if (!target) return;

    const newEl: DocElement = {
      ...target,
      id: "el-" + Date.now(),
      x: Math.min(target.x + 3, 85),
      y: Math.min(target.y + 4, 90),
    };

    const updated = [...elements, newEl];
    pushState(updated);
    setSelectedId(newEl.id);
    showToast("Duplicated element");
  };

  const addTextElement = (type: "heading" | "text" | "subheading") => {
    const newEl: DocElement = {
      id: "el-" + Date.now(),
      type,
      content:
        type === "heading"
          ? "New Section Heading"
          : type === "subheading"
          ? "Subheading Description"
          : "Click to edit this text paragraph with corrections or notes.",
      x: 18,
      y: 20 + elements.length * 4,
      fontSize: type === "heading" ? 22 : type === "subheading" ? 16 : 13,
      fontWeight: type === "heading" ? "bold" : type === "subheading" ? "600" : "normal",
      color: "#202821",
    };
    const updated = [...elements, newEl];
    pushState(updated);
    setSelectedId(newEl.id);
    onModeChange("select");
    showToast("Added new editable element");
  };

  // Dragging logic
  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (activeMode === "deink-eraser") {
      markForDeinking(id);
      return;
    }
    e.stopPropagation();
    setSelectedId(id);
    const target = elements.find((el) => el.id === id);
    if (onSelectElement) onSelectElement(target || null);

    if (sheetRef.current) {
      const rect = sheetRef.current.getBoundingClientRect();
      const clientX = (e.clientX - rect.left) / zoom;
      const clientY = (e.clientY - rect.top) / zoom;
      const elementLeft = (target?.x || 0) * (rect.width / zoom / 100);
      const elementTop = (target?.y || 0) * (rect.height / zoom / 100);
      setDragOffset({ x: clientX - elementLeft, y: clientY - elementTop });
      setDraggingId(id);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !sheetRef.current) return;
    const rect = sheetRef.current.getBoundingClientRect();
    const sheetWidth = rect.width / zoom;
    const sheetHeight = rect.height / zoom;

    const clientX = (e.clientX - rect.left) / zoom;
    const clientY = (e.clientY - rect.top) / zoom;

    const newX = Math.max(0, Math.min(95, ((clientX - dragOffset.x) / sheetWidth) * 100));
    const newY = Math.max(0, Math.min(95, ((clientY - dragOffset.y) / sheetHeight) * 100));

    const updated = elements.map((el) =>
      el.id === draggingId ? { ...el, x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 } : el
    );
    onElementsChange(updated);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      setDraggingId(null);
      pushState(elements);
    }
  };

  const selectedElement = elements.find((el) => el.id === selectedId);
  const deletedElements = elements.filter((el) => el.isDeleted);

  return (
    <div className="flex flex-col h-full bg-[#0F1412] rounded-2xl border border-white/10 shadow-2xl overflow-hidden select-none">
      {/* ── Studio Top Toolbar (Canva/Figma style) ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#17211B] border-b border-white/10 text-white flex-wrap gap-2 z-20">
        {/* Left: Mode Switchers & Tools */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onModeChange("select")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "select"
                ? "bg-primary text-white shadow-sm ring-1 ring-lime/40"
                : "text-sage/70 hover:bg-white/5 hover:text-white"
            }`}
            title="Select & Move elements (Click or drag)"
          >
            <MousePointer2 className="w-3.5 h-3.5" />
            <span>Select</span>
          </button>

          <button
            onClick={() => onModeChange("deink-eraser")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "deink-eraser"
                ? "bg-amber-600 text-white shadow-sm ring-1 ring-amber-300"
                : "text-sage/70 hover:bg-white/5 hover:text-white"
            }`}
            title="Click an element to mark for de-inking removal"
          >
            <Eraser className="w-3.5 h-3.5 text-amber-300" />
            <span>Selective De-Inker</span>
          </button>

          <div className="h-4 w-[1px] bg-white/15 mx-1" />

          {/* Quick Add items */}
          <button
            onClick={() => addTextElement("heading")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sage/80 hover:bg-white/5 hover:text-white transition-all"
            title="Add heading element"
          >
            <Heading1 className="w-3.5 h-3.5 text-lime" />
            <span>Heading</span>
          </button>
          <button
            onClick={() => addTextElement("text")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sage/80 hover:bg-white/5 hover:text-white transition-all"
            title="Add text paragraph"
          >
            <Type className="w-3.5 h-3.5 text-lime" />
            <span>Text</span>
          </button>
        </div>

        {/* Center: Selected Element Operations */}
        <div className="flex items-center gap-1">
          {selectedElement ? (
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/10 animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[11px] text-lime font-mono px-1 truncate max-w-[120px]">
                {selectedElement.content.slice(0, 16)}...
              </span>

              <button
                onClick={duplicateSelected}
                className="p-1.5 text-sage/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Duplicate (Ctrl+D)"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => markForDeinking(selectedElement.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  selectedElement.isDeleted
                    ? "text-amber-400 bg-amber-500/20"
                    : "text-sage/70 hover:text-amber-300 hover:bg-white/10"
                }`}
                title={selectedElement.isDeleted ? "Unmark de-inking" : "Mark region for ink removal"}
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={deleteSelected}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Delete element (Del or Backspace)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-white/40 hidden sm:inline-block">
              Click any element on sheet to select & delete
            </span>
          )}
        </div>

        {/* Right: Undo/Redo & Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={historyIndex === 0}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-white/15 mx-1" />

          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-sage/80 w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-white/15 mx-1" />

          {/* De-inking preview toggle */}
          <button
            onClick={() => setShowDeinkHeatmap(!showDeinkHeatmap)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              showDeinkHeatmap
                ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
                : "text-sage/70 hover:text-white hover:bg-white/5"
            }`}
            title="Show de-inking removal areas"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">De-ink Heatmap</span>
          </button>
        </div>
      </div>

      {/* ── Sub-bar banner / hints ── */}
      <div className="bg-[#121915] px-4 py-1.5 border-b border-white/5 flex items-center justify-between text-[11px] text-sage/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-lime font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Paper Mode</span>
          </span>
          <span>•</span>
          <span>{elements.length} elements detected</span>
          {deletedElements.length > 0 && (
            <>
              <span>•</span>
              <span className="text-amber-400 font-medium">
                {deletedElements.length} marked for de-inking
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40">Shortcut: Select + Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Delete</kbd></span>
        </div>
      </div>

      {/* ── Canvas Workspace with Grid Background ── */}
      <div
        ref={containerRef}
        onClick={() => setSelectedId(null)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex-1 relative overflow-auto p-8 flex items-center justify-center bg-[radial-gradient(#287a5015_1px,transparent_1px)] [background-size:20px_20px]"
      >
        {/* Floating Notification */}
        {notification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-forest text-lime border border-lime/30 px-3.5 py-1.5 rounded-full text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}

        {/* ── The Physical Paper Sheet (A4 Proportion Canvas) ── */}
        <div
          ref={sheetRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            transition: draggingId ? "none" : "transform 0.15s ease-out",
            width: "595px",
            minHeight: "842px",
          }}
          className="relative bg-[#FCFBF7] text-[#202821] rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.08)] p-12 overflow-hidden select-none transition-shadow"
        >
          {/* Subtle paper grain & watermark motif */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#123B2A_1px,transparent_1px)] [background-size:8px_8px]" />
          
          {/* Header watermark brand */}
          <div className="absolute top-4 right-6 flex items-center gap-1 opacity-25 text-[10px] tracking-widest font-mono uppercase text-forest">
            <span>RELEAF REUSABLE SHEET</span>
          </div>

          {/* If the user uploaded an image/PDF as background preview */}
          {fileType === "image" && fileUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fileUrl}
              alt={fileName}
              className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
            />
          )}

          {/* ── Render Interactive Canva-like Elements ── */}
          {elements.map((el) => {
            const isSelected = selectedId === el.id;
            const isDeleted = el.isDeleted;

            return (
              <div
                key={el.id}
                onPointerDown={(e) => handlePointerDown(e, el.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(el.id);
                  if (onSelectElement) onSelectElement(el);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditingId(el.id);
                }}
                style={{
                  position: "absolute",
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  fontSize: `${el.fontSize || 14}px`,
                  fontWeight: el.fontWeight || "normal",
                  color: isDeleted ? "#9ca3af" : el.color || "#202821",
                  backgroundColor: isSelected
                    ? "rgba(40, 122, 80, 0.08)"
                    : isDeleted
                    ? "rgba(239, 68, 68, 0.08)"
                    : "transparent",
                }}
                className={`group cursor-grab active:cursor-grabbing px-2 py-1 rounded transition-all duration-100 ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-white shadow-md z-30"
                    : "hover:ring-1 hover:ring-primary/40 z-10"
                } ${
                  isDeleted
                    ? "line-through opacity-50 border border-dashed border-red-400 bg-red-50/50"
                    : ""
                }`}
              >
                {/* De-inking Removal overlay badge */}
                {isDeleted && (
                  <span className="absolute -top-3 -right-2 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow">
                    DE-INK
                  </span>
                )}

                {/* Canva-style Selection Handles */}
                {isSelected && (
                  <>
                    <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow cursor-nwse-resize" />
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow cursor-nesw-resize" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow cursor-nesw-resize" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow cursor-nwse-resize" />
                    
                    {/* Quick Action Floating Pill (Canva style directly above element) */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-forest text-white px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-1.5 text-[11px] whitespace-nowrap z-40 border border-white/20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSelected();
                        }}
                        className="text-red-300 hover:text-white p-1 rounded hover:bg-white/10"
                        title="Delete element"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSelected();
                        }}
                        className="text-sage hover:text-white p-1 rounded hover:bg-white/10"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markForDeinking(el.id);
                        }}
                        className={`p-1 rounded text-amber-300 hover:bg-white/10`}
                        title="Toggle de-inking mark"
                      >
                        <Eraser className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {/* Content: Either editable text input or styled text */}
                {editingId === el.id ? (
                  <input
                    type="text"
                    value={el.content}
                    autoFocus
                    onChange={(e) => {
                      const updated = elements.map((item) =>
                        item.id === el.id ? { ...item, content: e.target.value } : item
                      );
                      onElementsChange(updated);
                    }}
                    onBlur={() => {
                      setEditingId(null);
                      pushState(elements);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditingId(null);
                        pushState(elements);
                      }
                    }}
                    className="bg-white border border-primary px-1 py-0.5 rounded outline-none text-[#202821] font-inherit"
                  />
                ) : (
                  <span className="leading-snug block select-none">
                    {el.content}
                  </span>
                )}
              </div>
            );
          })}

          {/* ── Simulated Selective De-Inking Heatmap Overlay ── */}
          {showDeinkHeatmap && (
            <div className="absolute inset-0 bg-amber-500/10 pointer-events-none z-20 flex flex-col justify-between p-6">
              <div className="bg-amber-500/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit shadow-md flex items-center gap-1.5">
                <Eraser className="w-3.5 h-3.5" />
                <span>Simulated De-inking Targeting Overlay Active</span>
              </div>
              <div className="text-[10px] text-amber-900 bg-amber-100/90 p-2 rounded border border-amber-300">
                Red highlighted regions will receive targeted solvent/photothermal ink release in the physical RELEAF chamber.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
