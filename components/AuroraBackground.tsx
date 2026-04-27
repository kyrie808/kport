"use client";
import { motion } from "motion/react";
import React, { ReactNode } from "react";

export const AuroraBackground = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative flex flex-col min-h-screen items-center justify-center bg-bg text-slate-950 transition-bg overflow-hidden ${
        className || ""
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blobs */}
        <motion.div
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "20%", "-20%", "0%"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-violet opacity-30 blur-[60px] md:blur-[120px]"
        />
        <motion.div
          animate={{
            x: ["0%", "-20%", "20%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent opacity-20 blur-[50px] md:blur-[100px]"
        />
        <motion.div
          animate={{
            x: ["0%", "30%", "-10%", "0%"],
            y: ["0%", "-10%", "30%", "0%"],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-violet opacity-20 blur-[70px] md:blur-[150px]"
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
