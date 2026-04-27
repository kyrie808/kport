"use client";
import React from "react";
import { motion } from "motion/react";

export const GlassCardInteractive = () => {
  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Moving Border Glow */}
      <div className="absolute -inset-[1px] rounded-[48px] bg-gradient-to-r from-transparent via-[#CCFF00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
      
      {/* Moving Border Animation */}
      <div className="absolute -inset-[1px] rounded-[48px] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#CCFF00_360deg)] opacity-40"
        />
      </div>

      {/* Glass Container */}
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[48px] p-8 md:p-10 flex flex-col gap-8 shadow-2xl">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-white tracking-tight text-center">
            O Fim da Ineficiência Comercial
          </h2>
          <p className="text-sm text-gray-400 text-center font-light leading-relaxed">
            Acesse nossa infraestrutura tech e transforme tráfego em receita com latência zero.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Metric 1 */}
          <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl px-5 py-4 shadow-inner">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Demanda Gerada</span>
            <span className="text-lg font-mono text-accent drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]">+420%</span>
          </div>
          
          {/* Metric 2 */}
          <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl px-5 py-4 shadow-inner">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Eficiência Operacional</span>
            <span className="text-lg font-mono text-accent drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]">99%</span>
          </div>
          
          {/* Metric 3 */}
          <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl px-5 py-4 shadow-inner">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Retorno (ROI)</span>
            <span className="text-lg font-mono text-accent drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]">12.4x</span>
          </div>
        </div>

        <motion.a
          href="#especialista"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full flex items-center justify-center bg-accent text-black font-semibold rounded-full px-6 py-4 text-sm shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] transition-shadow"
        >
          Falar com um Especialista
        </motion.a>
      </div>
    </div>
  );
};
