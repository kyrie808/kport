import React from "react";

export const FinalCTA = () => {
  return (
    <div className="relative w-full z-10 flex flex-col">
      {/* CTA Section */}
      <section className="relative w-full bg-accent text-bg py-32 md:py-48 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center overflow-hidden">
        <h2 className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase max-w-[100vw] break-words">
          QUERO ESCALAR <br /> MINHA OPERAÇÃO
        </h2>
        
        <button aria-label="Iniciar projeto de escala" className="mt-16 bg-bg text-white rounded-full px-10 py-6 text-xl md:text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300 shadow-2xl">
          INICIAR DEPLOY AGORA
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full bg-bg border-t border-white/10 py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-mono">
        <p>© {new Date().getFullYear()} KYRIE. TODOS OS DIREITOS RESERVADOS.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-300 transition-colors">TERMOS DE USO</a>
          <a href="#" className="hover:text-gray-300 transition-colors">POLÍTICA DE PRIVACIDADE</a>
        </div>
      </footer>
    </div>
  );
};
