"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A realistic paper sheet geometry with subtle details
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
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.08;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.2) * 0.04;
  });

  const paperColor =
    phase === "original"
      ? "#F0EBD8"
      : phase === "deinked"
      ? "#FAF8F2"
      : "#FDFCF8";
  const inkOpacity = phase === "original" ? 0.9 : phase === "deinked" ? 0.05 : 0.85;

  return (
    <group position={position}>
      {/* Paper body */}
      <mesh ref={meshRef} rotation={rotation} castShadow receiveShadow>
        <boxGeometry args={[2.4, 3.2, 0.02]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>
      {/* Text lines representation */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            position[0] + (Math.random() * 0.4 - 0.2),
            position[1] + 1.2 - i * 0.32,
            position[2] + 0.012,
          ]}
          rotation={rotation}
        >
          <boxGeometry args={[1.6 + Math.random() * 0.4, 0.04, 0.001]} />
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={inkOpacity}
          />
        </mesh>
      ))}
      {/* Highlight region for de-inking (only on original) */}
      {phase === "original" && (
        <mesh
          position={[position[0], position[1] + 0.3, position[2] + 0.013]}
          rotation={rotation}
        >
          <boxGeometry args={[1.8, 0.42, 0.001]} />
          <meshStandardMaterial
            color="#C5E86C"
            transparent
            opacity={0.35}
          />
        </mesh>
      )}
    </group>
  );
}

// Animated leaf particle
function Leaf3D({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + delay;
    ref.current.position.y = Math.sin(t * 0.5) * 0.3 - 1.5;
    ref.current.position.x = Math.cos(t * 0.3) * 0.8 + 2;
    ref.current.rotation.z = t * 0.5;
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={ref} scale={0.15}>
      <tetrahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#287A50" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Scene({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#DDE9D9" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <PaperSheet
          phase={phase}
          position={[0, 0, 0]}
          rotation={[0.1, -0.2, 0.05]}
        />
      </Float>

      <Leaf3D delay={0} />
      <Leaf3D delay={2} />
      <Leaf3D delay={4} />

      <Environment preset="studio" />
    </>
  );
}

// Static SVG fallback when WebGL is unavailable
function StaticFallback({ phase }: { phase: "original" | "deinked" | "restored" }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-sage/30 rounded-2xl p-8">
      <div className="text-center">
        <div className="text-6xl mb-4" aria-hidden="true">
          {phase === "original" ? "📄" : phase === "deinked" ? "⬜" : "✅"}
        </div>
        <p className="text-sm text-primary font-medium capitalize">
          {phase === "original"
            ? "Original Document"
            : phase === "deinked"
            ? "De-inked Paper"
            : "Restored Document"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          3D view unavailable in this browser
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
    }, 3000);
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
    original: "Original Document",
    deinked: "De-Inking Process",
    restored: "Restored Document",
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* 3D Canvas or fallback */}
      {webglAvailable ? (
        <Canvas
          shadows
          className="rounded-2xl"
          aria-label={`3D paper restoration illustration showing ${phaseLabels[phase]}`}
          role="img"
        >
          <Scene phase={phase} />
        </Canvas>
      ) : (
        <StaticFallback phase={phase} />
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3">
        {/* Phase indicator */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-forest border border-sage shadow-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sim-badge mr-2">SIMULATION</span>
          {phaseLabels[phase]}
        </div>

        {/* Phase buttons */}
        <div className="flex gap-2" role="group" aria-label="Paper phase selection">
          {(["original", "deinked", "restored"] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPhase(p);
                setIsAnimating(false);
              }}
              aria-pressed={phase === p}
              className={`w-2.5 h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                phase === p ? "bg-primary scale-125" : "bg-sage border border-primary/30"
              }`}
              aria-label={
                p === "original"
                  ? "Show original document"
                  : p === "deinked"
                  ? "Show de-inking process"
                  : "Show restored document"
              }
            />
          ))}
        </div>

        {/* Pause/Resume */}
        <button
          onClick={() => setIsAnimating((v) => !v)}
          className="text-xs text-forest/60 hover:text-forest underline underline-offset-2 transition-colors"
          aria-label={isAnimating ? "Pause animation" : "Resume animation"}
        >
          {isAnimating ? "Pause" : "Resume"} animation
        </button>
      </div>
    </div>
  );
}
