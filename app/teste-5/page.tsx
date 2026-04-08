"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { NavMenu } from "@/components/NavMenu";
import { MethodologySection } from "@/components/MethodologySection";
import { ResultsSection } from "@/components/ResultsSection";
import { TechSection } from "@/components/TechSection";
import { FinalCTA } from "@/components/FinalCTA";

import { MagneticButton } from "@/components/MagneticButton";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export default function Teste5Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for the mask position and radii
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radiusSolid = useMotionValue(0);
  const radiusBlur = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothSolid = useSpring(radiusSolid, springConfig);
  const smoothBlur = useSpring(radiusBlur, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- HANDLERS ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      radiusSolid.set(180);
      radiusBlur.set(400);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    radiusSolid.set(0);
    radiusBlur.set(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.touches[0].clientX - rect.left);
      mouseY.set(e.touches[0].clientY - rect.top);
      radiusSolid.set(120);
      radiusBlur.set(200);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.touches[0].clientX - rect.left);
      mouseY.set(e.touches[0].clientY - rect.top);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    radiusSolid.set(0);
    radiusBlur.set(0);
  };

  // The inverted mask: reveals the dark layer where the mouse/touch is
  const maskImage = useMotionTemplate`radial-gradient(circle at ${smoothX}px ${smoothY}px, black 0%, black ${smoothSolid}px, transparent ${smoothBlur}px)`;

  return (
    <main className="relative w-full bg-[#030303] text-white font-sans selection:bg-[#CCFF00] selection:text-black cursor-default">
      {/* --- Floating Nav Menu --- */}
      <NavMenu />

      {/* --- Noise Overlay (Global) --- */}
      <NoiseOverlay />

      {/* ========================================== */}
      {/* HERO SECTION                               */}
      {/* ========================================== */}
      <section 
        id="motor"
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden touch-action-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ========================================== */}
        {/* BASE LAYER: VIBRANT "KYRIE" WORLD (z-0)    */}
        {/* ========================================== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-[#030303]">
          {/* --- Background Blobs --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                x: ["-25%", "25%", "-15%", "-25%"],
                y: ["-10%", "20%", "-20%", "-10%"],
                scale: [1, 1.4, 0.9, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#8A2BE2] opacity-80 blur-[50px] md:blur-[90px]"
            />
            <motion.div
              animate={{
                x: ["25%", "-25%", "15%", "25%"],
                y: ["20%", "-10%", "20%", "20%"],
                scale: [1.4, 1, 1.4, 1.4],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#CCFF00] opacity-80 blur-[50px] md:blur-[90px]"
            />
          </div>

          {/* --- Typography --- */}
          <h1 className="relative z-20 text-[15vw] md:text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center uppercase flex flex-col">
            <span className="text-[#CCFF00] drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">ECOSSISTEMA</span>
            <span className="text-white">DE VENDAS</span>
          </h1>

          {/* --- Satellites (Badges) --- */}
          <motion.div
            className="hidden md:block absolute top-[25%] left-[10%] md:left-[15%] z-30"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🟢 Latência: 0.0ms</span>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute top-[35%] right-[10%] md:right-[15%] z-30"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🚀 +420% Demanda</span>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute bottom-[35%] right-[15%] md:right-[20%] z-30"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">⚡ ROI Médio: 15x</span>
            </div>
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* DARK LAYER: "MARKETING TRADICIONAL" (z-10) */}
        {/* ========================================== */}
        <motion.div 
          className="absolute inset-0 z-10 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        >
          <h1 className="relative z-20 text-[15vw] md:text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center text-neutral-700 uppercase flex flex-col">
            <span>MARKETING</span>
            <span>TRADICIONAL</span>
          </h1>

          {/* ZONA DE RISCO Badge (follows the mouse inside the mask) */}
          <motion.div
            className="absolute flex items-center justify-center px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 z-30"
            style={{ 
              left: smoothX, 
              top: smoothY, 
              x: "-50%", 
              y: "-50%" 
            }}
          >
            <span className="text-red-400 text-xs font-mono font-bold tracking-wider">⚠ ZONA DE RISCO</span>
          </motion.div>
        </motion.div>

        {/* ========================================== */}
        {/* CTA (Always visible, outside layers)       */}
        {/* ========================================== */}
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm md:w-auto">
          <MagneticButton>
            <button className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 md:px-12 md:py-6 bg-[#CCFF00] text-black rounded-full font-bold text-lg md:text-xl tracking-tight shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(204,255,0,0.6)] transition-all duration-300 overflow-hidden pointer-events-auto">
              <span className="relative z-10">Ativar Motor Kyrie</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* ========================================== */}
      {/* METHODOLOGY SECTION                        */}
      {/* ========================================== */}
      <MethodologySection />

      {/* ========================================== */}
      {/* RESULTS SECTION                            */}
      {/* ========================================== */}
      <ResultsSection />

      {/* ========================================== */}
      {/* TECH SECTION                               */}
      {/* ========================================== */}
      <TechSection />

      {/* ========================================== */}
      {/* FINAL CTA & FOOTER                         */}
      {/* ========================================== */}
      <FinalCTA />

    </main>
  );
}
