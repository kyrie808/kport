"use client";

import React from "react";
import { motion } from "motion/react";

const cards = [
  {
    id: "01",
    title: "EXPLORAÇÃO",
    description: "Mapeamento de dados e testes cirúrgicos de canais para encontrar a mina de ouro da sua operação.",
  },
  {
    id: "02",
    title: "LAPIDAÇÃO",
    description: "Otimização de processos comerciais e redução drástica do Custo de Aquisição (CAC).",
  },
  {
    id: "03",
    title: "ESCALA",
    description: "Injeção de tráfego pesado e automação com Agentes de IA sem quebrar a operação.",
  },
  {
    id: "04",
    title: "EXTRAÇÃO",
    description: "Retenção ativa, aumento de LTV e criação de previsibilidade financeira contínua.",
  },
];

export const MethodologySection = () => {
  return (
    <section id="sistema" className="relative w-full bg-bg text-white py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Column (Sticky) */}
        <div className="lg:w-1/2 relative mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-40 flex flex-col gap-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              A ENGENHARIA <br /> DO LUCRO.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Não fazemos marketing de esperança. Instalamos um ecossistema de 4 fases projetado para extrair o máximo de cada centavo investido.
            </p>
          </div>
        </div>

        {/* Right Column (Stacking Cards) */}
        <div className="lg:w-1/2 flex flex-col gap-12 pb-32">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="sticky flex flex-col gap-6 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl"
              style={{
                top: `calc(10rem + ${index * 2}rem)`, // Stacking effect
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-accent font-mono text-xl font-bold tracking-widest">
                [{card.id}]
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                {card.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
