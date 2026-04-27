import React from "react";
import { Zap, Bot, Crosshair, Activity } from "lucide-react";

export const TechSection = () => {
  return (
    <section className="relative w-full bg-bg text-white py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            INFRAESTRUTURA DE ALTA PRECISÃO
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Large */}
          <div className="md:col-span-2 flex flex-col justify-between p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/10 transition-colors group">
            <Bot className="w-12 h-12 text-accent mb-6" />
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-2">Automação com IA (Agentes)</h3>
              <p className="text-gray-400 text-lg">Sistemas autônomos que qualificam, nutrem e convertem leads 24/7 sem intervenção humana.</p>
            </div>
          </div>

          {/* Card 2: Small */}
          <div className="flex flex-col justify-between p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/10 transition-colors">
            <Zap className="w-12 h-12 text-accent mb-6" />
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Latência Zero</h3>
              <p className="text-gray-400">Resposta imediata em cada ponto de contato.</p>
            </div>
          </div>

          {/* Card 3: Small */}
          <div className="flex flex-col justify-between p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/10 transition-colors">
            <Crosshair className="w-12 h-12 text-accent mb-6" />
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Tracking Cirúrgico</h3>
              <p className="text-gray-400">Atribuição perfeita de cada conversão.</p>
            </div>
          </div>

          {/* Card 4: Large */}
          <div className="md:col-span-2 flex flex-col justify-between p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] hover:bg-white/10 transition-colors">
            <Activity className="w-12 h-12 text-accent mb-6" />
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-2">Dashboard de Elite</h3>
              <p className="text-gray-400 text-lg">Visibilidade total da operação em tempo real. Decisões baseadas em dados, não em intuição.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
