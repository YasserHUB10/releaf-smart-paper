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
  Minus,
  Move,
  Eraser,
  Download,
  Eye,
  Check,
  AlertCircle,
  FileCheck2,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
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
  fontStyle?: "normal" | "italic";
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
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
  selectedId: string | null;
  onSelectElement: (el: DocElement | null) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export default function InteractiveDocumentCanvas({
  fileName,
  fileType,
  fileUrl,
  elements,
  onElementsChange,
  activeMode,
  onModeChange,
  selectedId,
  onSelectElement,
  zoom,
  onZoomChange,
}: InteractiveDocumentCanvasProps) {
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
      onSelectElement(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onElementsChange(next);
      onSelectElement(null);
    }
  };

  // Keyboard shortcuts (Delete, Backspace, Ctrl+Z, Escape, Arrow keys for nudging)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if currently editing text inside an input or textarea
      if (editingId) return;
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

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
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d" && selectedId) {
        e.preventDefault();
        duplicateSelected();
      } else if (e.key === "Escape") {
        onSelectElement(null);
        setEditingId(null);
      } else if (selectedId && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const delta = e.shiftKey ? 2 : 0.5;
        const dx = e.key === "ArrowLeft" ? -delta : e.key === "ArrowRight" ? delta : 0;
        const dy = e.key === "ArrowUp" ? -delta : e.key === "ArrowDown" ? delta : 0;
        const updated = elements.map((el) =>
          el.id === selectedId
            ? {
                ...el,
                x: Math.max(0, Math.min(95, el.x + dx)),
                y: Math.max(0, Math.min(95, el.y + dy)),
              }
            : el
        );
        pushState(updated);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, editingId, historyIndex, history, elements]);

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
    onSelectElement(null);
    showToast(`Element deleted from document`);
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
      y: Math.min(target.y + 3, 90),
    };

    const updated = [...elements, newEl];
    pushState(updated);
    onSelectElement(newEl);
    showToast("Duplicated element");
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
          : "Click to edit this text paragraph with your notes or updates.",
      x: 15,
      y: 20 + (elements.length % 8) * 6,
      width: type === "box" ? 70 : type === "divider" ? 80 : undefined,
      height: type === "box" ? 8 : type === "divider" ? 1 : undefined,
      fontSize: type === "heading" ? 22 : type === "subheading" ? 15 : 13,
      fontWeight: type === "heading" ? "bold" : type === "subheading" ? "600" : "normal",
      color: "#202821",
      bgColor: type === "box" ? "#DDE9D9" : undefined,
    };
    const updated = [...elements, newEl];
    pushState(updated);
    onSelectElement(newEl);
    onModeChange("select");
    showToast(`Added ${type} element`);
  };

  // Dragging logic
  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (activeMode === "deink-eraser") {
      markForDeinking(id);
      return;
    }
    e.stopPropagation();
    const target = elements.find((el) => el.id === id);
    onSelectElement(target || null);

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

  const handlePointerUp = () => {
    if (draggingId) {
      setDraggingId(null);
      pushState(elements);
    }
  };

  const selectedElement = elements.find((el) => el.id === selectedId);
  const deletedElements = elements.filter((el) => el.isDeleted);

  // Text formatting toggle helpers for selected element
  const toggleBold = () => {
    if (!selectedId) return;
    const updated = elements.map((el) =>
      el.id === selectedId
        ? { ...el, fontWeight: el.fontWeight === "bold" || el.fontWeight === "700" ? "normal" : "bold" }
        : el
    );
    pushState(updated);
  };

  const toggleItalic = () => {
    if (!selectedId) return;
    const updated = elements.map((el) =>
      el.id === selectedId
        ? { ...el, fontStyle: (el.fontStyle === "italic" ? "normal" : "italic") as "normal" | "italic" }
        : el
    );
    pushState(updated);
  };

  const setAlign = (align: "left" | "center" | "right") => {
    if (!selectedId) return;
    const updated = elements.map((el) => (el.id === selectedId ? { ...el, textAlign: align } : el));
    pushState(updated);
  };

  const setFontSize = (delta: number) => {
    if (!selectedId) return;
    const updated = elements.map((el) =>
      el.id === selectedId
        ? { ...el, fontSize: Math.max(8, Math.min(64, (el.fontSize || 14) + delta)) }
        : el
    );
    pushState(updated);
  };

  return (
    <div className="flex flex-col h-full bg-[#123B2A] rounded-xs border-2 border-[#123B2A] shadow-2xl overflow-hidden select-none">
      {/* ── Studio Top Toolbar (Canva/Figma style) ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#17201B] border-b border-white/10 text-white flex-wrap gap-2 z-20 shrink-0">
        {/* Left: Mode Switchers & Tools */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onModeChange("select")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold transition-all ${
              activeMode === "select"
                ? "bg-[#D6FF52] text-[#123B2A] shadow-sm ring-2 ring-[#D6FF52]"
                : "text-[#DDE6D8]/70 hover:bg-white/10 hover:text-white"
            }`}
            title="Select & Move elements (V)"
          >
            <MousePointer2 className="w-3.5 h-3.5" />
            <span>Select</span>
          </button>

          <button
            onClick={() => onModeChange("deink-eraser")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
            onClick={() => addElement("heading")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sage/80 hover:bg-white/10 hover:text-white transition-all"
            title="Add heading element"
          >
            <Heading1 className="w-3.5 h-3.5 text-lime" />
            <span>Heading</span>
          </button>
          <button
            onClick={() => addElement("text")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sage/80 hover:bg-white/10 hover:text-white transition-all"
            title="Add text paragraph"
          >
            <Type className="w-3.5 h-3.5 text-lime" />
            <span>Text</span>
          </button>
          <button
            onClick={() => addElement("box")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-sage/80 hover:bg-white/10 hover:text-white transition-all"
            title="Add highlight container box"
          >
            <Square className="w-3.5 h-3.5 text-lime" />
            <span>Shape</span>
          </button>
        </div>

        {/* Center: Selected Element Rich Formatting Bar (Shows when element selected) */}
        <div className="flex items-center gap-1">
          {selectedElement ? (
            <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-xl border border-white/15 animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[11px] text-lime font-mono px-1 truncate max-w-[110px]">
                {selectedElement.content ? `"${selectedElement.content.slice(0, 14)}..."` : selectedElement.type}
              </span>

              <div className="h-3.5 w-[1px] bg-white/20 mx-0.5" />

              {/* Font size +/- */}
              {selectedElement.fontSize && (
                <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 text-[11px]">
                  <button onClick={() => setFontSize(-1)} className="hover:text-lime px-1">
                    -
                  </button>
                  <span className="font-mono w-5 text-center">{selectedElement.fontSize}</span>
                  <button onClick={() => setFontSize(1)} className="hover:text-lime px-1">
                    +
                  </button>
                </div>
              )}

              {/* Bold / Italic */}
              <button
                onClick={toggleBold}
                className={`p-1 rounded transition-colors ${
                  selectedElement.fontWeight === "bold" || selectedElement.fontWeight === "700"
                    ? "bg-primary text-white"
                    : "text-sage/70 hover:text-white hover:bg-white/10"
                }`}
                title="Bold"
              >
                <Bold className="w-3 h-3" />
              </button>

              <button
                onClick={toggleItalic}
                className={`p-1 rounded transition-colors ${
                  selectedElement.fontStyle === "italic"
                    ? "bg-primary text-white"
                    : "text-sage/70 hover:text-white hover:bg-white/10"
                }`}
                title="Italic"
              >
                <Italic className="w-3 h-3" />
              </button>

              {/* Alignments */}
              <button
                onClick={() => setAlign("left")}
                className={`p-1 rounded ${
                  selectedElement.textAlign === "left" || !selectedElement.textAlign
                    ? "text-lime bg-white/10"
                    : "text-sage/70 hover:text-white"
                }`}
                title="Align Left"
              >
                <AlignLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => setAlign("center")}
                className={`p-1 rounded ${
                  selectedElement.textAlign === "center" ? "text-lime bg-white/10" : "text-sage/70 hover:text-white"
                }`}
                title="Align Center"
              >
                <AlignCenter className="w-3 h-3" />
              </button>

              <div className="h-3.5 w-[1px] bg-white/20 mx-0.5" />

              {/* Duplicate */}
              <button
                onClick={duplicateSelected}
                className="p-1 text-sage/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Duplicate (Ctrl+D)"
              >
                <Copy className="w-3 h-3" />
              </button>

              {/* De-ink toggle */}
              <button
                onClick={() => markForDeinking(selectedElement.id)}
                className={`p-1 rounded transition-colors ${
                  selectedElement.isDeleted
                    ? "text-amber-400 bg-amber-500/20"
                    : "text-sage/70 hover:text-amber-300 hover:bg-white/10"
                }`}
                title={selectedElement.isDeleted ? "Unmark de-inking" : "Mark for de-inking removal"}
              >
                <Eraser className="w-3 h-3" />
              </button>

              {/* Delete */}
              <button
                onClick={deleteSelected}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
                title="Delete element (Del / Backspace)"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-white/40 hidden lg:inline-block">
              Click any element on canvas to select, move, or delete
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
            onClick={() => onZoomChange(Math.max(0.5, zoom - 0.15))}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-sage/80 w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(1.8, zoom + 0.15))}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onZoomChange(1)}
            className="p-1.5 rounded-lg text-sage/70 hover:text-white hover:bg-white/5"
            title="Fit / Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-white/15 mx-1" />

          {/* De-inking heatmap preview toggle */}
          <button
            onClick={() => setShowDeinkHeatmap(!showDeinkHeatmap)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
              showDeinkHeatmap
                ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
                : "text-sage/70 hover:text-white hover:bg-white/5"
            }`}
            title="Toggle simulated physical de-inking targets"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Heatmap</span>
          </button>
        </div>
      </div>

      {/* ── Sub-bar: Document metadata & quick status ── */}
      <div className="bg-[#123B2A] px-4 py-1.5 border-b border-white/10 flex items-center justify-between text-[11px] text-[#DDE6D8]/70 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#D6FF52] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Vector Canvas</span>
          </span>
          <span>•</span>
          <span>{elements.length} document items</span>
          {deletedElements.length > 0 && (
            <>
              <span>•</span>
              <span className="text-[#D6FF52] font-bold">
                {deletedElements.length} marked for de-inking
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 hidden sm:inline">
            Nudge: <kbd className="px-1 py-0.2 rounded bg-white/10 text-white font-mono text-[10px]">Arrow keys</kbd> • Delete: <kbd className="px-1 py-0.2 rounded bg-white/10 text-white font-mono text-[10px]">Del</kbd>
          </span>
        </div>
      </div>

      {/* ── Canvas Workspace with Ambient Studio Grid ── */}
      <div
        ref={containerRef}
        onClick={() => onSelectElement(null)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex-1 relative overflow-auto p-8 flex items-center justify-center bg-[radial-gradient(#287a501a_1px,transparent_1px)] [background-size:24px_24px]"
      >
        {/* Floating Toast Notification */}
        {notification && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-forest text-lime border border-lime/30 px-4 py-1.5 rounded-full text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}

        {/* ── The Physical Paper Sheet (A4 Proportion: 595 x 842 pt) ── */}
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
          className="relative bg-[#FCFBF7] text-[#202821] rounded-xs shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.12)] p-12 overflow-hidden select-none transition-shadow"
        >
          {/* Subtle paper grain & watermark motif */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#123B2A_1px,transparent_1px)] [background-size:8px_8px]" />

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

            // Box / Shape element
            if (el.type === "box") {
              return (
                <div
                  key={el.id}
                  onPointerDown={(e) => handlePointerDown(e, el.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement(el);
                  }}
                  style={{
                    position: "absolute",
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    width: `${el.width || 70}%`,
                    height: `${el.height || 8}%`,
                    backgroundColor: el.bgColor || "#DDE9D9",
                    borderRadius: "8px",
                  }}
                  className={`group cursor-grab active:cursor-grabbing transition-all ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-white shadow-md z-30"
                      : "hover:ring-1 hover:ring-primary/40 z-10"
                  } ${isDeleted ? "opacity-30 line-through border-2 border-dashed border-red-400" : ""}`}
                >
                  {isSelected && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-forest text-white px-2 py-0.5 rounded shadow text-[10px] flex items-center gap-1">
                      <button onClick={deleteSelected} className="hover:text-red-400">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            // Divider element
            if (el.type === "divider") {
              return (
                <div
                  key={el.id}
                  onPointerDown={(e) => handlePointerDown(e, el.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement(el);
                  }}
                  style={{
                    position: "absolute",
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    width: `${el.width || 80}%`,
                  }}
                  className={`group cursor-grab active:cursor-grabbing py-1 ${
                    isSelected ? "ring-2 ring-primary ring-offset-2 z-30" : "hover:opacity-75 z-10"
                  }`}
                >
                  <div className="h-[1.5px] bg-charcoal/20 w-full" />
                </div>
              );
            }

            // Standard Text / Heading / Subheading elements
            return (
              <div
                key={el.id}
                onPointerDown={(e) => handlePointerDown(e, el.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement(el);
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
                  fontStyle: el.fontStyle || "normal",
                  textAlign: el.textAlign || "left",
                  color: isDeleted ? "#9ca3af" : el.color || "#202821",
                  backgroundColor: isSelected
                    ? "rgba(79, 91, 255, 0.08)"
                    : isDeleted
                    ? "rgba(239, 68, 68, 0.08)"
                    : "transparent",
                }}
                className={`group cursor-grab active:cursor-grabbing px-2 py-1 rounded-xs transition-all duration-100 ${
                  isSelected
                    ? "ring-2 ring-[#4F5BFF] ring-offset-2 ring-offset-white shadow-md z-30"
                    : "hover:ring-1 hover:ring-[#4F5BFF]/40 z-10"
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

                {/* Canva-style Corner Selection Handles (Electric Lime & Ink Black) */}
                {isSelected && (
                  <>
                    <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#D6FF52] border-2 border-[#123B2A] rounded-xs shadow cursor-nwse-resize" />
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#D6FF52] border-2 border-[#123B2A] rounded-xs shadow cursor-nesw-resize" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#D6FF52] border-2 border-[#123B2A] rounded-xs shadow cursor-nesw-resize" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#D6FF52] border-2 border-[#123B2A] rounded-xs shadow cursor-nwse-resize" />

                    {/* Quick Action Floating Pill (Canva style directly above element) */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#123B2A] text-[#FFFDF7] px-2.5 py-1 rounded-xs shadow-lg flex items-center gap-2 text-[11px] whitespace-nowrap z-40 border border-[#D6FF52]/30">
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
                    className="bg-white border border-primary px-1.5 py-0.5 rounded outline-none text-[#202821] font-inherit min-w-[200px]"
                  />
                ) : (
                  <span className="leading-snug block select-none whitespace-pre-wrap">
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
              <div className="text-[10px] text-amber-900 bg-amber-100/90 p-2.5 rounded border border-amber-300">
                Red highlighted regions will receive targeted solvent/photothermal ink release in the physical RELEAF chamber.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
