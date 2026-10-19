import { jsPDF } from "jspdf";
import { DocElement } from "@/components/document/InteractiveDocumentCanvas";

/**
 * Exports the active document elements into a true vector/raster PDF file
 * where deleted elements are genuinely excluded from rendering and text stream.
 */
export async function exportElementsToPdf(
  elements: DocElement[],
  fileName: string = "releaf-restored-document.pdf"
): Promise<{ success: boolean; error?: string }> {
  try {
    // Create A4 portrait document (210 x 297 mm)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210
    const pageHeight = doc.internal.pageSize.getHeight(); // 297

    // 1. Draw subtle background sheet base
    doc.setFillColor(252, 251, 247); // #FCFBF7 soft cream paper
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // 2. Subtle top header brand watermark
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(18, 59, 42); // #123B2A
    doc.text("RELEAF DIGITAL RESTORATION • A4 REUSABLE SHEET", pageWidth - 15, 12, {
      align: "right",
    });

    // 3. Render all active (non-deleted) document elements
    // Elements marked as isDeleted are permanently omitted from the output.
    for (const el of elements) {
      if (el.isDeleted) continue; // Real deletion!

      // Compute coordinate positions in mm
      // el.x and el.y are in percentages (0 to 100)
      const posX = (el.x / 100) * pageWidth;
      const posY = (el.y / 100) * pageHeight;

      if (el.type === "box") {
        const widthMm = ((el.width || 40) / 100) * pageWidth;
        const heightMm = ((el.height || 10) / 100) * pageHeight;
        
        // Convert hex color to rgb
        const hex = (el.bgColor || "#DDE9D9").replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16) || 221;
        const g = parseInt(hex.substring(2, 4), 16) || 233;
        const b = parseInt(hex.substring(4, 6), 16) || 217;

        doc.setFillColor(r, g, b);
        doc.roundedRect(posX, posY, widthMm, heightMm, 2, 2, "F");
        continue;
      }

      if (el.type === "divider") {
        doc.setDrawColor(200, 210, 200);
        doc.setLineWidth(0.5);
        doc.line(posX, posY, posX + 160, posY);
        continue;
      }

      // Text, Heading, Subheading, Badge rendering
      let fontSizePt = 10;
      let fontStyle: "normal" | "bold" | "italic" = "normal";

      if (el.type === "heading") {
        fontSizePt = Math.max(14, (el.fontSize || 22) * 0.75);
        fontStyle = "bold";
      } else if (el.type === "subheading") {
        fontSizePt = Math.max(11, (el.fontSize || 16) * 0.75);
        fontStyle = el.fontWeight === "bold" ? "bold" : "normal";
      } else {
        fontSizePt = Math.max(9, (el.fontSize || 13) * 0.75);
        if (el.fontWeight === "bold" || el.fontWeight === "700") {
          fontStyle = "bold";
        } else if (el.fontStyle === "italic") {
          fontStyle = "italic";
        }
      }

      doc.setFont(el.fontFamily || "helvetica", fontStyle);
      doc.setFontSize(fontSizePt);

      // Parse text color
      const hex = (el.color || "#202821").replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) || 32;
      const g = parseInt(hex.substring(2, 4), 16) || 40;
      const b = parseInt(hex.substring(4, 6), 16) || 33;
      doc.setTextColor(r, g, b);

      // Multi-line text wrapping within printable bounds
      const maxTextWidthMm = Math.max(40, pageWidth - posX - 15);
      const splitLines = doc.splitTextToSize(el.content, maxTextWidthMm);

      const align = el.textAlign === "center" ? "center" : el.textAlign === "right" ? "right" : "left";
      const targetX = align === "center" ? posX + maxTextWidthMm / 2 : align === "right" ? posX + maxTextWidthMm : posX;

      doc.text(splitLines, targetX, posY + 3, {
        align,
      });
    }

    // 4. Save and trigger download
    doc.save(fileName);
    return { success: true };
  } catch (err: any) {
    console.error("PDF generation failed:", err);
    return { success: false, error: err?.message || "Unknown error generating PDF" };
  }
}
