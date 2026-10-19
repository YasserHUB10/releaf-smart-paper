"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// High-fidelity paper substrate geometry with electric lime edit region and cobalt technical markers
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
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.22) * 0.04;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.16) * 0.025;
  });

  const paperColor =
    phase === "original"
      ? "#F4F0E6" // Paper cream
      : phase === "deinked"
      ? "#EBE7DC" // De-inked raw sheet
      : "#FFFDF7"; // Warm white restored

  // In de-inked phase, the printed ink is selectively lifted
  const inkOpacity = phase === "original" ? 0.88 : phase === "deinked" ? 0.08 : 0.85;

  return (
    <group position={position}>
      {/* Paper Substrate Body */}
      <mesh ref={meshRef} rotation={rotation} castShadow receiveShadow>
        <boxGeometry args={[2.6, 3.5, 0.016]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={0.88}
          metalness={0.02}
        />
      </mesh>

      {/* Typography Lines (Ink Black) */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            position[0] + (i % 2 === 0 ? 0.08 : -0.08),
            position[1] + 1.2 - i * 0.33,
            position[2] + 0.011,
          ]}
          rotation={rotation}
        >
          <boxGeometry args={[1.8 + (i % 3) * 0.22, 0.038, 0.001]} />
          <meshStandardMaterial
            color="#17201B"
            transparent
            opacity={i === 2 || i === 3 ? (phase === "deinked" ? 0.02 : inkOpacity) : inkOpacity}
          />
        </mesh>
      ))}

      {/* Electric Lime Highlight: Active Edited / De-Inked Coordinate Region */}
      {phase === "original" && (
        <mesh
          position={[position[0] - 0.05, position[1] + 0.38, position[2] + 0.013]}
          rotation={rotation}
        >
          <boxGeometry args={[2.0, 0.46, 0.001]} />
          <meshStandardMaterial
            color="#D6FF52"
            transparent
            opacity={0.45}
            roughness={0.3}
          />
        </mesh>
      )}

      {/* Cobalt Blue Precision Coordinate Corner Markers */}
      {phase === "original" && (
        <>
          {/* Top-left marker */}
          <mesh
            position={[position[0] - 1.05, position[1] + 0.61, position[2] + 0.015]}
            rotation={rotation}
          >
            <boxGeometry args={[0.08, 0.08, 0.002]} />
            <meshStandardMaterial color="#4F5BFF" />
          </mesh>
          {/* Top-right marker */}
          <mesh
            position={[position[0] + 0.95, position[1] + 0.61, position[2] + 0.015]}
            rotation={rotation}
          >
            <boxGeometry args={[0.08, 0.08, 0.002]} />
            <meshStandardMaterial color="#4F5BFF" />
          </mesh>
          {/* Bottom-left marker */}
          <mesh
            position={[position[0] - 1.05, position[1] + 0.15, position[2] + 0.015]}
            rotation={rotation}
          >
            <boxGeometry args={[0.08, 0.08, 0.002]} />
            <meshStandardMaterial color="#4F5BFF" />
          </mesh>
          {/* Bottom-right marker */}
          <mesh
            position={[position[0] + 0.95, position[1] + 0.15, position[2] + 0.015]}
            rotation={rotation}
          >
            <boxGeometry args={[0.08, 0.08, 0.002]} />
            <meshStandardMaterial color="#4F5BFF" />
          </mesh>
        </>
      )}

      {/* Restored State: Fresh Crisp Green Verification Accent */}
      {phase === "restored" && (
        <mesh
          position={[position[0] - 0.05, position[1] + 0.38, position[2] + 0.013]}
          rotation={rotation}
        >
          <boxGeometry args={[2.0, 0.46, 0.001]} />
          <meshStandardMaterial
            color="#287A50"
            transparent
            opacity={0.12}
          />
        </mesh>
      )}
    </group>
  );
}

function Scene({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6.6]} fov={40} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[512, 512]}
        color="#FFFDF7"
      />
      {/* Deep Forest under-shadow light for rich depth */}
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#123B2A" />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.25}>
        <PaperSheet
          phase={phase}
          position={[0, 0, 0]}
          rotation={[0.06, -0.12, 0.03]}
        />
      </Float>

      <Environment preset="studio" />
    </>
  );
}

// Accessible static fallback when WebGL is unavailable
function StaticFallback({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#DDE6D8]/50 rounded-xl p-8 border border-[#123B2A]/10">
      <div className="text-center">
        <div className="text-4xl mb-3 text-[#123B2A]" aria-hidden="true">
          {phase === "original" ? "📄" : phase === "deinked" ? "⬜" : "✨"}
        </div>
        <p className="text-xs text-[#123B2A] font-mono font-bold uppercase tracking-wider">
          {phase === "original"
            ? "Phase 1: Selected Misprint"
            : phase === "deinked"
            ? "Phase 2: Targeted De-Inking"
            : "Phase 3: Restored Substrate"}
        </p>
        <p className="text-[11px] text-[#626B63] mt-1 font-mono">
          WebGL disabled — Interactive simulation active
        </p>
      </div>
    </div>
  );
}

export default function PaperScene() {
  const [phase, setPhase] = useState<"original" | "deinked" | "restored">("original");
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-cycle through phases every 3.2s
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

  // WebGL support detector
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

  const phaseDetails = {
    original: {
      step: "01",
      title: "Target Region Flagged",
      desc: "Electric lime highlights the coordinate region selected in Studio",
    },
    deinked: {
      step: "02",
      title: "Selective De-Inking",
      desc: "Pigment lifted while 98%+ cellulose fiber bond remains intact",
    },
    restored: {
      step: "03",
      title: "Reprint-Ready Substrate",
      desc: "Same physical sheet refreshed for calibrated overprint",
    },
  };

  return (
    <div className="relative w-full h-full min-h-[420px] flex flex-col justify-between">
      {/* Top Status Bar: Electric Lime + Cobalt Technical Badges */}
      <div className="relative z-10 flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <span className="lime-tag">SIMULATION</span>
          <span className="cobalt-tag hidden sm:inline-flex">PHOTOTHERMAL V2</span>
        </div>
        <div className="text-[11px] font-mono text-[#123B2A] font-bold bg-[#FFFDF7]/85 backdrop-blur-xs px-2.5 py-1 rounded border border-[#123B2A]/10">
          STAGE {phaseDetails[phase].step} / 03
        </div>
      </div>

      {/* 3D WebGL Canvas or Fallback */}
      <div className="flex-1 w-full relative">
        {webglAvailable ? (
          <Canvas
            shadows
            className="w-full h-full"
            aria-label={`3D paper restoration visual simulation: ${phaseDetails[phase].title}`}
            role="img"
          >
            <Scene phase={phase} />
          </Canvas>
        ) : (
          <StaticFallback phase={phase} />
        )}
      </div>

      {/* Bottom Interactive Phase Controls */}
      <div className="relative z-10 p-3 pt-0 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-t from-[#F4F0E6]/90 to-transparent">
        <div className="flex items-center gap-1.5" role="group" aria-label="Simulation phase selection">
          {(["original", "deinked", "restored"] as const).map((p) => {
            const isCurrent = phase === p;
            return (
              <button
                key={p}
                onClick={() => {
                  setPhase(p);
                  setIsAnimating(false);
                }}
                aria-pressed={isCurrent}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all ${
                  isCurrent
                    ? "bg-[#123B2A] text-[#D6FF52] shadow-xs"
                    : "bg-[#FFFDF7]/70 text-[#626B63] hover:text-[#123B2A] hover:bg-[#FFFDF7]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-[#626B63]">
          <span className="hidden md:inline">{phaseDetails[phase].title}</span>
          <button
            onClick={() => setIsAnimating((v) => !v)}
            className="text-[10px] underline underline-offset-2 hover:text-[#123B2A] transition-colors"
            aria-label={isAnimating ? "Pause simulation animation" : "Resume simulation animation"}
          >
            {isAnimating ? "Pause" : "Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
