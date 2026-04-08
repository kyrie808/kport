"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, animate } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { NoiseOverlay } from "./NoiseOverlay";

// --- Glitch Lines Component (Phase 1) ---
const GlitchLines = () => {
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
        const resolveFrame = Math.floor((globalIndex * 40) / 50) + 5;
        if (frame >= resolveFrame) {
          return { char: paddedNew[i], resolved: true };
        } else {
          allResolved = false;
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

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Desktop: Split Screen
  const cutPos = useMotionValue(50);
  const smoothCutPos = useSpring(cutPos, { damping: 40, stiffness: 200, mass: 1 });
  const wave1 = useMotionValue(0);
  const wave2 = useMotionValue(0);
  const wave3 = useMotionValue(0);
  const wave4 = useMotionValue(0);
  const wave5 = useMotionValue(0);

  // Mobile: Glitch Morphing
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === false) {
      animate(wave1, [0, 2, -2, 0], { repeat: Infinity, duration: 3, ease: "easeInOut" });
      animate(wave2, [0, -3, 3, 0], { repeat: Infinity, duration: 4, ease: "easeInOut" });
      animate(wave3, [0, 4, -4, 0], { repeat: Infinity, duration: 5, ease: "easeInOut" });
      animate(wave4, [0, -2, 2, 0], { repeat: Infinity, duration: 3.5, ease: "easeInOut" });
      animate(wave5, [0, 3, -3, 0], { repeat: Infinity, duration: 4.5, ease: "easeInOut" });
    } else if (isMobile === true) {
      const t1 = setTimeout(() => setPhase(1), 2000);
      const t2 = setTimeout(() => setPhase(2), 2300);
      const t3 = setTimeout(() => setPhase(3), 3100);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isMobile, wave1, wave2, wave3, wave4, wave5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      cutPos.set(percentage);
    }
  };

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

  if (isMobile === null) return null; // Prevent hydration mismatch

  return (
    <section 
      id="motor"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center touch-action-none"
      onMouseMove={handleMouseMove}
    >
      <NoiseOverlay />
      
      {/* Background Blobs */}
      <motion.div
        initial={{ opacity: isMobile ? 0 : 1, scale: isMobile ? 0.8 : 1 }}
        animate={{ opacity: (!isMobile || phase >= 3) ? 1 : 0, scale: (!isMobile || phase >= 3) ? 1 : 0.8 }}
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
      </motion.div>

      {/* Desktop: Split Screen Typography */}
      {!isMobile && (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
            <h1 className="relative z-20 text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center uppercase flex flex-col">
              <span className="text-[#CCFF00] drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">ECOSSISTEMA</span>
              <span className="text-white">DE VENDAS</span>
            </h1>
          </div>
          <motion.div 
            className="absolute inset-0 z-10 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
            style={{
              WebkitClipPath: clipPathDesktop,
              clipPath: clipPathDesktop,
            }}
          >
            <h1 className="text-[10vw] lg:text-[11vw] leading-[0.85] tracking-tighter font-black text-center text-neutral-700 uppercase flex flex-col">
              <span>MARKETING</span>
              <span>TRADICIONAL</span>
            </h1>
          </motion.div>
        </>
      )}

      {/* Mobile: Glitch Morphing Typography */}
      {isMobile && (
        <>
          {phase === 1 && <GlitchLines />}
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
            className="relative z-20 text-[15vw] leading-[0.85] tracking-tighter font-black text-center uppercase flex flex-col"
          >
            <ScrambleLine oldText="MARKETING" newText="ECOSSISTEMA" isMorphing={phase >= 2} delayOffset={0} />
            <ScrambleLine oldText="TRADICIONAL" newText="DE VENDAS" isMorphing={phase >= 2} delayOffset={11} />
          </motion.div>
        </>
      )}

      {/* Satellites (Badges) - Desktop Only */}
      {!isMobile && (
        <>
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
        </>
      )}

      {/* CTA */}
      <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm md:w-auto">
        <MagneticButton>
          <button aria-label="Iniciar consultoria de escala com a Kyrie" className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 md:px-12 md:py-6 bg-[#CCFF00] text-black rounded-full font-bold text-lg md:text-xl tracking-tight shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(204,255,0,0.6)] transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Ativar Motor Kyrie</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </button>
        </MagneticButton>
      </div>
    </section>
  );
};
