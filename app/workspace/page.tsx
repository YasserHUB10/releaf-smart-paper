import type { Metadata } from "next";
import WorkspaceClient from "@/components/workspace/WorkspaceClient";
import Link from "next/link";
import { Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "RELEAF document workspace — upload, edit, and simulate paper restoration.",
};

export default function WorkspacePage() {
  return (
    <>
      {/* Minimal workspace header with back link */}
      <div className="fixed top-0 left-0 z-40 p-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal/50 hover:text-primary transition-colors bg-white/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-sage"
          aria-label="Back to RELEAF home"
        >
          <Leaf className="w-3 h-3" aria-hidden="true" />
          RELEAF
        </Link>
      </div>
      <WorkspaceClient />
    </>
  );
}
