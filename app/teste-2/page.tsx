"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

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

// --- Main Page Component ---
export default function Teste2Page() {
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize from -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Smooth springs for parallax
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Transforms for different layers
  const textX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const textY = useTransform(smoothY, [-1, 1], [-30, 30]);

  const badge1X = useTransform(smoothX, [-1, 1], [-50, 50]);
  const badge1Y = useTransform(smoothY, [-1, 1], [-50, 50]);

  const badge2X = useTransform(smoothX, [-1, 1], [40, -40]);
  const badge2Y = useTransform(smoothY, [-1, 1], [40, -40]);

  const badge3X = useTransform(smoothX, [-1, 1], [-60, 60]);
  const badge3Y = useTransform(smoothY, [-1, 1], [60, -60]);

  return (
    <main 
      className="relative min-h-screen w-full bg-bg text-white overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-accent selection:text-black"
      onMouseMove={handleMouseMove}
    >
      {/* --- Background Blobs --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "10%", "-10%", "0%"],
            y: ["0%", "15%", "-10%", "0%"],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-violet opacity-30 blur-[120px]"
        />
        <motion.div
          animate={{
            x: ["0%", "-15%", "10%", "0%"],
            y: ["0%", "-10%", "15%", "0%"],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-accent opacity-20 blur-[120px]"
        />
      </div>

      {/* --- Noise Overlay --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- Content Container --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full min-h-screen">
        
        {/* --- Kinetic Typography --- */}
        <motion.div 
          style={{ x: textX, y: textY }}
          className="flex flex-col items-center text-center z-20"
        >
          <h1 className="font-black tracking-tighter leading-[0.85] text-[15vw] md:text-[12vw] lg:text-[10vw] uppercase flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              O MOTOR
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-accent drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]"
            >
              DE VENDAS
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              DEFINITIVO.
            </motion.span>
          </h1>
        </motion.div>

        {/* --- Satellites (Badges) --- */}
        {/* Badge 1: Top Left */}
        <motion.div
          style={{ x: badge1X, y: badge1Y }}
          className="hidden md:flex absolute top-[20%] left-[10%] z-30"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <span className="text-sm font-medium tracking-wide text-white/90">🟢 Latência: 0.0ms</span>
          </motion.div>
        </motion.div>

        {/* Badge 2: Top Right */}
        <motion.div
          style={{ x: badge3X, y: badge3Y }}
          className="hidden md:flex absolute top-[30%] right-[10%] z-30"
        >
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <span className="text-sm font-medium tracking-wide text-white/90">🚀 +420% Demanda</span>
          </motion.div>
        </motion.div>

        {/* Badge 3: Bottom Right */}
        <motion.div
          style={{ x: badge2X, y: badge2Y }}
          className="hidden md:flex absolute bottom-[30%] right-[15%] z-30"
        >
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <span className="text-sm font-medium tracking-wide text-white/90">⚡ ROI Médio: 15x</span>
          </motion.div>
        </motion.div>

        {/* --- Magnetic CTA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 md:bottom-20 z-40"
        >
          <MagneticButton>
            <button className="group relative flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 bg-accent text-black rounded-full font-bold text-lg md:text-xl tracking-tight shadow-[0_0_40px_rgba(204,255,0,0.4)] hover:shadow-[0_0_60px_rgba(204,255,0,0.6)] transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Iniciar Consultoria de Escala</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            </button>
          </MagneticButton>
        </motion.div>

      </div>
    </main>
  );
}
