"use client";

import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function MassingGroup() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
    if (ring.current) ring.current.rotation.z = t * 0.2;
  });

  // useMemo: jangan alokasi material + GC setiap render
  const mats = useMemo(
    () => ({
      brass: new THREE.MeshStandardMaterial({
        color: "#c9a86a",
        metalness: 0.85,
        roughness: 0.28,
      }),
      concrete: new THREE.MeshStandardMaterial({
        color: "#e7e3da",
        metalness: 0.05,
        roughness: 0.85,
      }),
      // MeshStandardMaterial ganti Physical+transmission:
      // transmission butuh transmission pass (mahal). Opacity biasa jauh lebih murah.
      glass: new THREE.MeshStandardMaterial({
        color: "#93d2f5",
        metalness: 0.1,
        roughness: 0.15,
        transparent: true,
        opacity: 0.55,
      }),
      basalt: new THREE.MeshStandardMaterial({
        color: "#1e2933",
        metalness: 0.35,
        roughness: 0.6,
      }),
      wire: new THREE.MeshBasicMaterial({
        color: "#5fb6ea",
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    }),
    []
  );

  useEffect(() => {
    // Dispose saat unmount (ganti halaman / HMR)
    return () => {
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [mats]);

  const { brass, concrete, glass, basalt, wire } = mats;

  return (
    <group ref={group}>
      {/* podium — travertine plinth */}
      <mesh position={[0, -0.9, 0]} material={concrete}>
        <cylinderGeometry args={[3.2, 3.45, 0.5, 8]} />
      </mesh>
      {/* basalt base */}
      <mesh position={[0, -0.55, 0]} material={basalt}>
        <cylinderGeometry args={[2.9, 3.05, 0.28, 8]} />
      </mesh>

      {/* main bar tower */}
      <mesh position={[-0.9, 0.7, 0.2]} material={concrete}>
        <boxGeometry args={[1.1, 2.7, 1.1]} />
      </mesh>
      <mesh position={[-0.9, 0.7, 0.2]} material={wire} scale={1.015}>
        <boxGeometry args={[1.1, 2.7, 1.1]} />
      </mesh>

      {/* glass slab */}
      <mesh position={[0.55, 0.45, -0.25]} material={glass}>
        <boxGeometry args={[1.25, 2.1, 0.7]} />
      </mesh>

      {/* brass fin tower */}
      <mesh position={[1.55, 0.95, 0.55]} material={brass}>
        <boxGeometry args={[0.32, 3.1, 0.32]} />
      </mesh>
      <mesh position={[1.15, 1.35, 0.55]} material={brass}>
        <boxGeometry args={[0.16, 2.2, 0.16]} />
      </mesh>

      {/* cantilever vault — half cylinder (24→16 segmen) */}
      <mesh position={[-0.1, -0.15, 1.05]} rotation={[0, 0.35, 0]} material={concrete}>
        <cylinderGeometry args={[0.72, 0.72, 1.9, 16, 1, false, 0, Math.PI]} />
      </mesh>

      {/* colonnade — 5 pilasters (12→8 segmen) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-1.7 + i * 0.72, -0.28, 1.75]} material={brass}>
          <cylinderGeometry args={[0.09, 0.11, 0.75, 8]} />
        </mesh>
      ))}
      <mesh position={[-0.26, 0.14, 1.75]} material={concrete}>
        <boxGeometry args={[3.3, 0.12, 0.42]} />
      </mesh>

      {/* arch — torus (42→24 segmen) */}
      <mesh position={[0.55, 1.62, -0.25]} material={brass}>
        <torusGeometry args={[0.62, 0.06, 10, 24, Math.PI]} />
      </mesh>

      {/* rotating survey ring (72→48 segmen) */}
      <mesh ref={ring} position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.55, 3.62, 48]} />
        <meshBasicMaterial color="#c9a86a" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Environment preset="city" DIHAPUS: sebelumnya download HDR eksternal
          (~MB) saat runtime. Lampu statis ini gratis dan terlihat sama. */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 7, 4]} intensity={1.6} color="#fff4dd" />
      <directionalLight position={[-6, 3, -4]} intensity={0.7} color="#93d2f5" />
      <pointLight position={[0, 2.5, 3]} intensity={12} color="#e8cf95" distance={12} />
      <hemisphereLight args={["#bfe4fa", "#0b1926", 0.35]} />
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.7}>
        <MassingGroup />
      </Float>
      <Grid
        position={[0, -1.2, 0]}
        args={[14, 14]}
        cellSize={0.42}
        cellThickness={0.6}
        cellColor="#2f8fd0"
        sectionSize={2.1}
        sectionThickness={1.1}
        sectionColor="#c9a86a"
        fadeDistance={13}
        fadeStrength={2.2}
        infiniteGrid
      />
      <ContactShadows position={[0, -1.18, 0]} opacity={0.62} scale={11} blur={2.4} far={4} color="#04090f" />
    </>
  );
}

export default function MassingModel({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Jangan render GPU saat canvas di luar viewport (ada 2 canvas per halaman).
    // rootMargin 400px: mulai siapkan sedikit sebelum masuk layar.
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {inView ? (
        <Canvas
          // DPR 1.8→1.5: hemat fill-rate ~30% di layar retina, visual sama
          dpr={[1, 1.5]}
          camera={{ position: [6.2, 3.4, 7.2], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          // Hentikan loop saat tab hidden / reduced-motion
          frameloop={reducedMotion ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      ) : (
        // Placeholder murah selagi offscreen — jaga layout, tanpa biaya WebGL
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-[11px] tracking-[0.3em] text-brass-300/50">
            MASSING · IN VIEWPORT TO RENDER
          </span>
        </div>
      )}
      {/* corner registration for the viewport */}
      <div aria-hidden className="pointer-events-none absolute inset-4 hidden sm:block">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-brass-400/70" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-brass-400/70" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-brass-400/70" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-brass-400/70" />
      </div>
    </div>
  );
}
