"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { NavMenu } from "@/components/NavMenu";
import { MethodologySection } from "@/components/MethodologySection";
import { ResultsSection } from "@/components/ResultsSection";
import { TechSection } from "@/components/TechSection";
import { FinalCTA } from "@/components/FinalCTA";

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Glitch Lines Component (Phase 1) ---
const GlitchLines = () => {
  // Generate random positions once so they don't jump around on re-renders
  const [lines] = useState(() => [...Array(3)].map(() => ({
    top: Math.random() * 80 + 10 + '%',
    height: Math.random() * 2 + 2 + 'px',
    delay: Math.random() * 0.1
  })));

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden mix-blend-screen">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute w-full bg-[#CCFF00]"
          style={{ top: line.top, height: line.height }}
          animate={{ opacity: [0, 0.8, 0, 0.8, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror", delay: line.delay }}
        />
      ))}
    </div>
  );
};

// --- Scramble Text Component (Phase 2) ---
const ScrambleLine = ({ oldText, newText, isMorphing, delayOffset }: { oldText: string, newText: string, isMorphing: boolean, delayOffset: number }) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
  const maxLength = Math.max(oldText.length, newText.length);
  
  // Pad strings to max length so we can morph them smoothly without layout jumps
  const paddedOld = oldText.padEnd(maxLength, ' ');
  const paddedNew = newText.padEnd(maxLength, ' ');

  const [displayChars, setDisplayChars] = useState(
    paddedOld.split('').map(c => ({ char: c, resolved: false }))
  );

  useEffect(() => {
    if (!isMorphing) return;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      let allResolved = true;

      setDisplayChars(prev => prev.map((item, i) => {
        const globalIndex = delayOffset + i;
        // Stagger: resolve character i after (globalIndex * 40ms) / 50ms frames + 5 initial frames
        const resolveFrame = Math.floor((globalIndex * 40) / 50) + 5;
        
        if (frame >= resolveFrame) {
          return { char: paddedNew[i], resolved: true };
        } else {
          allResolved = false;
          // Don't scramble if both are spaces (preserves layout gaps)
          if (paddedNew[i] === ' ' && paddedOld[i] === ' ') {
            return { char: ' ', resolved: false };
          }
          return { char: chars[Math.floor(Math.random() * chars.length)], resolved: false };
        }
      }));

      if (allResolved) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [isMorphing, paddedNew, paddedOld, delayOffset]);

  return (
    <span className="flex justify-center">
      {displayChars.map((item, i) => (
        <span 
          key={i} 
          className={item.resolved && item.char !== ' ' 
            ? "text-[#CCFF00] drop-shadow-[0_0_20px_rgba(204,255,0,0.8)] transition-colors duration-300" 
            : "text-neutral-700"}
          style={{ whiteSpace: 'pre' }}
        >
          {item.char}
        </span>
      ))}
    </span>
  );
};

export default function Teste4Page() {
  // Phase 0: Initial (Marketing Tradicional)
  // Phase 1: Glitch (0.3s)
  // Phase 2: Morphing (0.8s)
  // Phase 3: Reveal Environment (0.5s)
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Sequence Timers
    const t1 = setTimeout(() => setPhase(1), 2000); // Start glitch
    const t2 = setTimeout(() => setPhase(2), 2300); // Start morphing (2000 + 300)
    const t3 = setTimeout(() => setPhase(3), 3100); // Start reveal (2300 + 800)
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#030303] text-white font-sans selection:bg-[#CCFF00] selection:text-black cursor-default">
      {/* --- Floating Nav Menu --- */}
      <NavMenu />

      {/* --- Noise Overlay (Global) --- */}
      {/* Mantido o noise premium hiper-fino conforme ajuste anterior */}
      <div
        className="fixed inset-0 z-50 opacity-20 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px"
        }}
      />

      {/* ========================================== */}
      {/* HERO SECTION                               */}
      {/* ========================================== */}
      <section 
        id="motor"
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {/* ========================================== */}
        {/* BACKGROUND BLOBS (Revealed in Phase 3)     */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
          <motion.div
            animate={{
              x: ["-25%", "25%", "-15%", "-25%"],
              y: ["-10%", "20%", "-20%", "-10%"],
              scale: [1, 1.4, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#8A2BE2] opacity-80 blur-[90px]"
          />
          <motion.div
            animate={{
              x: ["25%", "-25%", "15%", "25%"],
              y: ["20%", "-10%", "20%", "20%"],
              scale: [1.4, 1, 1.4, 1.4],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#CCFF00] opacity-80 blur-[90px]"
          />
        </motion.div>

        {/* ========================================== */}
        {/* GLITCH LINES (Only in Phase 1)             */}
        {/* ========================================== */}
        {phase === 1 && <GlitchLines />}

        {/* ========================================== */}
        {/* TYPOGRAPHY (Glitch -> Morph -> Pulse)      */}
        {/* ========================================== */}
        <motion.div
          animate={
            phase === 1 ? { x: [-3, 3, -3, 3, -2, 2, 0] } :
            phase === 3 ? { scale: [1, 1.02, 1] } : 
            { scale: 1, x: 0 }
          }
          transition={
            phase === 1 ? { duration: 0.05, repeat: Infinity } :
            phase === 3 ? { duration: 0.5, ease: "easeInOut" } :
            { duration: 0 }
          }
          className="relative z-20 text-[15vw] md:text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center uppercase flex flex-col"
        >
          {/* Linha 1: MARKETING -> ECOSSISTEMA */}
          <ScrambleLine 
            oldText="MARKETING" 
            newText="ECOSSISTEMA" 
            isMorphing={phase >= 2} 
            delayOffset={0} 
          />
          {/* Linha 2: TRADICIONAL -> DE VENDAS */}
          <ScrambleLine 
            oldText="TRADICIONAL" 
            newText="DE VENDAS" 
            isMorphing={phase >= 2} 
            delayOffset={11} // Offset para continuar o stagger após a primeira linha
          />
        </motion.div>

        {/* ========================================== */}
        {/* SATELLITES (Badges) - Revealed in Phase 3  */}
        {/* ========================================== */}
        {/* Badge 1: Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.1 }}
          className="hidden md:block absolute top-[25%] left-[10%] md:left-[15%] z-30"
        >
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🟢 Latência: 0.0ms</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Badge 2: Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.3 }}
          className="hidden md:block absolute top-[35%] right-[10%] md:right-[15%] z-30"
        >
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">🚀 +420% Demanda</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Badge 3: Bottom Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.5 }}
          className="hidden md:block absolute bottom-[35%] right-[15%] md:right-[20%] z-30"
        >
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">⚡ ROI Médio: 15x</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ========================================== */}
        {/* CTA (Always visible)                       */}
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
