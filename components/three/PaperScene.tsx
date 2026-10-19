"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A realistic paper sheet geometry with subtle minimal architectural details
function PaperSheet({
  phase,
  position,
  rotation,
}: {
  phase: "original" | "deinked" | "restored";
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.25) * 0.05;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.18) * 0.03;
  });

  const paperColor =
    phase === "original"
      ? "#FAF9F5"
      : phase === "deinked"
      ? "#F0EEE7"
      : "#FAF9F5";
  const inkOpacity = phase === "original" ? 0.85 : phase === "deinked" ? 0.04 : 0.8;

  return (
    <group position={position}>
      {/* Paper substrate body */}
      <mesh ref={meshRef} rotation={rotation} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.4, 0.015]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* Clean typographic lines representation */}
      {[...Array(7)].map((_, i) => (
        <mesh
          key={i}
          position={[
            position[0] + (i % 2 === 0 ? 0.1 : -0.1),
            position[1] + 1.1 - i * 0.35,
            position[2] + 0.01,
          ]}
          rotation={rotation}
        >
          <boxGeometry args={[1.7 + (i % 3) * 0.2, 0.035, 0.001]} />
          <meshStandardMaterial
            color="#20231F"
            transparent
            opacity={inkOpacity}
          />
        </mesh>
      ))}

      {/* Coordinate highlight region for de-inking simulation */}
      {phase === "original" && (
        <mesh
          position={[position[0] - 0.1, position[1] + 0.05, position[2] + 0.012]}
          rotation={rotation}
        >
          <boxGeometry args={[1.9, 0.38, 0.001]} />
          <meshStandardMaterial
            color="#777E62"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

function Scene({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6.8]} fov={42} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[512, 512]}
        color="#FAF9F5"
      />
      <directionalLight position={[-3, 2, -1]} intensity={0.25} color="#E4E1D8" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <PaperSheet
          phase={phase}
          position={[0, 0, 0]}
          rotation={[0.08, -0.15, 0.04]}
        />
      </Float>

      <Environment preset="studio" />
    </>
  );
}

// Static SVG fallback when WebGL is unavailable
function StaticFallback({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#E4E1D8]/40 rounded-xl p-8">
      <div className="text-center">
        <div className="text-4xl mb-3 text-[#20231F]" aria-hidden="true">
          {phase === "original" ? "📄" : phase === "deinked" ? "⬜" : "📑"}
        </div>
        <p className="text-xs text-[#20231F] font-mono uppercase tracking-wider">
          {phase === "original"
            ? "Original Document"
            : phase === "deinked"
            ? "De-inked Substrate"
            : "Restored Page"}
        </p>
      </div>
    </div>
  );
}

export default function PaperScene() {
  const [phase, setPhase] = useState<"original" | "deinked" | "restored">(
    "original"
  );
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-cycle through phases
  useEffect(() => {
    if (!isAnimating) return;
    const phases: Array<"original" | "deinked" | "restored"> = [
      "original",
      "deinked",
      "restored",
    ];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % phases.length;
      setPhase(phases[i]);
    }, 3200);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Detect WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  const phaseLabels = {
    original: "Phase 01: Scanned Document",
    deinked: "Phase 02: Selective Ink Removal",
    restored: "Phase 03: Precision Recycled Sheet",
  };

  return (
    <div className="relative w-full h-full min-h-[380px]">
      {/* 3D Canvas or fallback */}
      {webglAvailable ? (
        <Canvas
          shadows
          className="rounded-xl"
          aria-label={`3D paper restoration illustration showing ${phaseLabels[phase]}`}
          role="img"
        >
          <Scene phase={phase} />
        </Canvas>
      ) : (
        <StaticFallback phase={phase} />
      )}

      {/* Minimal Studio Controls Overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2.5">
        {/* Phase indicator badge */}
        <div
          className="bg-[#FAF9F5]/90 backdrop-blur-md rounded-md px-3 py-1 text-[11px] font-mono text-[#20231F] border border-[#20231F]/10 shadow-xs flex items-center gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#315D46]" />
          <span>{phaseLabels[phase]}</span>
        </div>

        {/* Phase selector tabs */}
        <div className="flex gap-1.5 bg-[#FAF9F5]/70 backdrop-blur-xs p-1 rounded-md border border-[#20231F]/5" role="group" aria-label="Paper phase selection">
          {(["original", "deinked", "restored"] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPhase(p);
                setIsAnimating(false);
              }}
              aria-pressed={phase === p}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all ${
                phase === p
                  ? "bg-[#20231F] text-[#FAF9F5] font-semibold"
                  : "text-[#575C53] hover:text-[#20231F]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
