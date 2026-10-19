"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PaperScene = dynamic(() => import("./PaperScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-sage/20 rounded-2xl">
      <div className="text-center">
        <div
          className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3"
          aria-hidden="true"
        />
        <p className="text-sm text-primary font-medium">Loading 3D scene…</p>
      </div>
    </div>
  ),
});

export default function PaperSceneLoader() {
  return (
    <Suspense fallback={null}>
      <PaperScene />
    </Suspense>
  );
}
