import React from "react";
import { GlassButton } from "@/components/ui/glass-button";

export const NavMenu = () => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 w-auto max-w-[95vw] px-2 py-2 md:px-6 md:py-4 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
      <div className="hidden md:flex items-center gap-6 pl-4">
        <a href="#motor" className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
          01_MOTOR
        </a>
        <a href="#sistema" className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
          02_SISTEMA
        </a>
        <a href="#cases" className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
          03_CASES
        </a>
      </div>
      <GlassButton variant="primary" className="w-full md:w-auto" aria-label="Entrar em contato com a Kyrie">
        INICIAR_SISTEMA
      </GlassButton>
    </nav>
  );
};
