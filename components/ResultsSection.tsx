import React from "react";

export const ResultsSection = () => {
  return (
    <section id="cases" className="relative w-full bg-bg text-white py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            RESULTADOS BRUTAIS
          </h2>
          <p className="text-gray-400 text-xl font-light">
            Não vendemos promessas. Entregamos matemática.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { value: "15x", label: "ROI MÉDIO" },
            { value: "30k", label: "AD SPEND" },
            { value: "120k", label: "FATURAMENTO" },
          ].map((metric, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 relative pb-8">
              <span className="text-7xl md:text-8xl font-black text-accent tracking-tighter">
                {metric.value}
              </span>
              <span className="text-gray-400 font-mono tracking-widest uppercase">
                {metric.label}
              </span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-accent shadow-[0_0_10px_#CCFF00]" />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            {
              quote: "A operação que demorou anos para ser construída foi otimizada em semanas. O CAC caiu pela metade e a escala foi inevitável.",
            },
            {
              quote: "Nunca vi uma infraestrutura de dados tão precisa. Cada centavo investido agora tem um destino claro e um retorno previsível.",
            }
          ].map((testimonial, i) => (
            <div key={i} className="flex flex-col gap-8 p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px]">
              <p className="text-xl md:text-2xl font-light italic text-gray-300 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 w-fit">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase">
                  STATUS: OPERAÇÃO ESCALADA
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
