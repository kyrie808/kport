"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, animate, useTransform } from "motion/react";
import { NavMenu } from "@/components/NavMenu";
import { MethodologySection } from "@/components/MethodologySection";
import { ResultsSection } from "@/components/ResultsSection";
import { TechSection } from "@/components/TechSection";
import { FinalCTA } from "@/components/FinalCTA";

import { MagneticButton } from "@/components/MagneticButton";
import { NoiseOverlay } from "@/components/NoiseOverlay";

export default function Teste3Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- LÓGICA MOBILE VS DESKTOP ---
  // Desktop: cutPos representa a porcentagem X (esquerda/direita)
  // Mobile: cutPos representa a porcentagem Y (cima/baixo)
  const cutPos = useMotionValue(50);
  
  // Configuração dinâmica do spring para alternar entre "bouncy" (auto/snap) e "responsivo" (touch)
  const [springConfig, setSpringConfig] = useState({ damping: 40, stiffness: 200, mass: 1 });
  
  // A CADEIA DE VALORES:
  // 1. rawValue (cutPos - useMotionValue) recebe os valores brutos (0 a 100)
  // 2. springValue (smoothCutPos - useSpring) interpola suavemente até o valor de cutPos usando a springConfig atual
  // 3. clipPathMobile/Desktop (useMotionTemplate) constrói a string do CSS usando o valor interpolado
  const smoothCutPos = useSpring(cutPos, springConfig);

  // Fade out da cortina quando está 100% aberta (cutPos próximo de 0) para não interferir nos toques
  const curtainOpacity = useTransform(smoothCutPos, [0, 5], [0, 1]);

  // Refs para controle de toque no Mobile
  const touchStartY = useRef(0);
  const touchStartPos = useRef(0);
  const hasInteracted = useRef(false);

  // Motion values for the organic waves (breathing effect)
  const wave1 = useMotionValue(0);
  const wave2 = useMotionValue(0);
  const wave3 = useMotionValue(0);
  const wave4 = useMotionValue(0);
  const wave5 = useMotionValue(0);

  useEffect(() => {
    // Start wave animations for the liquid edge
    animate(wave1, [0, 2, -2, 0], { repeat: Infinity, duration: 3, ease: "easeInOut" });
    animate(wave2, [0, -3, 3, 0], { repeat: Infinity, duration: 4, ease: "easeInOut" });
    animate(wave3, [0, 4, -4, 0], { repeat: Infinity, duration: 5, ease: "easeInOut" });
    animate(wave4, [0, -2, 2, 0], { repeat: Infinity, duration: 3.5, ease: "easeInOut" });
    animate(wave5, [0, 3, -3, 0], { repeat: Infinity, duration: 4.5, ease: "easeInOut" });

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        cutPos.set(100); // Mobile starts 100% closed (curtain at the bottom)
        setSpringConfig({ damping: 25, stiffness: 100, mass: 1 }); // Suave/bouncy para o auto-reveal
      } else {
        cutPos.set(50); // Desktop starts at 50% (curtain in the middle)
        setSpringConfig({ damping: 40, stiffness: 200, mass: 1 }); // Padrão desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [cutPos, wave1, wave2, wave3, wave4, wave5]);

  // Mobile auto-reveal timer (3 segundos)
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        if (!hasInteracted.current) {
          // Altera apenas o rawValue. O useSpring fará a transição suave com a config atual (damping 25)
          cutPos.set(30); // Sobe para 30% (revelando 70% da tela), garantindo que o texto fique 100% legível
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, cutPos]);

  // --- HANDLERS DESKTOP ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      cutPos.set(percentage);
    }
  };

  // --- HANDLERS MOBILE ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    hasInteracted.current = true;
    
    // Muda para spring responsivo/rápido durante o arraste para não ter delay
    setSpringConfig({ damping: 40, stiffness: 300, mass: 1 });
    
    touchStartY.current = e.touches[0].clientY;
    touchStartPos.current = cutPos.get();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    const deltaPercentage = (deltaY / window.innerHeight) * 100;
    let newPos = touchStartPos.current + deltaPercentage;
    newPos = Math.max(0, Math.min(100, newPos)); // Clamp 0-100
    cutPos.set(newPos);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    // Volta para spring suave/bouncy para o snap final
    setSpringConfig({ damping: 25, stiffness: 100, mass: 1 });
    
    const currentPos = cutPos.get();
    // Snap behavior:
    // Se arrastar mais de 40% da tela para cima (pos < 60), snap para 0 (100% aberto)
    // Se arrastar menos de 40% (pos >= 60), snap para 100 (fechado)
    if (currentPos < 60) {
      cutPos.set(0);
    } else {
      cutPos.set(100);
    }
  };

  // --- CLIP PATHS ---
  // Desktop: Corte Vertical (esquerda/direita)
  const clipPathDesktop = useMotionTemplate`polygon(
    0% 0%, 
    calc(${smoothCutPos}% + ${wave1}%) 0%, 
    calc(${smoothCutPos}% + ${wave2}%) 20%, 
    calc(${smoothCutPos}% + ${wave3}%) 40%, 
    calc(${smoothCutPos}% + ${wave4}%) 60%, 
    calc(${smoothCutPos}% + ${wave5}%) 80%, 
    calc(${smoothCutPos}% + ${wave1}%) 100%, 
    0% 100%
  )`;

  // Mobile: Corte Horizontal (cima/baixo)
  const clipPathMobile = useMotionTemplate`polygon(
    0% 0%, 
    100% 0%, 
    100% calc(${smoothCutPos}% + ${wave1}%), 
    80% calc(${smoothCutPos}% + ${wave2}%), 
    60% calc(${smoothCutPos}% + ${wave3}%), 
    40% calc(${smoothCutPos}% + ${wave4}%), 
    20% calc(${smoothCutPos}% + ${wave5}%), 
    0% calc(${smoothCutPos}% + ${wave1}%)
  )`;

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ========================================== */}
        {/* CAMADA DE FUNDO: A "REALIDADE KYRIE"       */}
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
          {/* Badge 1: Top Left */}
          <motion.div
            className="hidden md:block absolute top-[25%] left-[10%] md:left-[15%] z-30"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🟢 Latência: 0.0ms</span>
            </div>
          </motion.div>

          {/* Badge 2: Top Right */}
          <motion.div
            className="hidden md:block absolute top-[35%] right-[10%] md:right-[15%] z-30"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🚀 +420% Demanda</span>
            </div>
          </motion.div>

          {/* Badge 3: Bottom Right */}
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
        {/* CAMADA FRONTAL: A "CORTINA LÍQUIDA"        */}
        {/* ========================================== */}
        <motion.div 
          className="absolute inset-0 z-10 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
          style={{
            WebkitClipPath: isMobile ? clipPathMobile : clipPathDesktop,
            clipPath: isMobile ? clipPathMobile : clipPathDesktop,
            opacity: isMobile ? curtainOpacity : 1,
          }}
        >
          <h1 className="text-[15vw] md:text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center text-neutral-700 uppercase flex flex-col">
            <span>MARKETING</span>
            <span>TRADICIONAL</span>
          </h1>
        </motion.div>

        {/* ========================================== */}
        {/* CTA (Always visible, outside layers)       */}
        {/* ========================================== */}
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm md:w-auto">
          <MagneticButton>
            <button className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 md:px-12 md:py-6 bg-[#CCFF00] text-black rounded-full font-bold text-lg md:text-xl tracking-tight shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(204,255,0,0.6)] transition-all duration-300 overflow-hidden">
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
