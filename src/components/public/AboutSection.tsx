'use client';

import React from 'react';
import Image from 'next/image';
import { Award, BookOpen, CheckCircle, Heart, Sparkles, Brain, Stethoscope } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-[#09090B] relative overflow-hidden border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image / Graphic column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative box */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-[#8B5CF6]/40 via-transparent to-[#6D28D9]/40 shadow-glass">
                <div className="bg-[#13131A] rounded-[22px] p-6 space-y-6">
                  {/* Portrait Placeholder Graphic */}
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1A24] to-[#09090B] flex flex-col items-center justify-center text-center p-6 border border-white/10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-1 shadow-glow mb-4">
                      <div className="w-full h-full rounded-full bg-[#09090B] flex items-center justify-center">
                        <Brain className="w-12 h-12 text-[#8B5CF6]" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">Dra. Cleo Pai</h3>
                    <p className="text-sm text-[#A78BFA]">Neuropsicóloga Clínica (CRP 06/189234)</p>
                    <p className="text-xs text-[#B9B9C4] mt-2 max-w-xs">
                      Mestre em Neurociências e Especialista em Avaliação Cognitiva Infantojuvenil e Adulto.
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#09090B] border border-white/5 text-center">
                      <BookOpen className="w-5 h-5 text-[#8B5CF6] mx-auto mb-1" />
                      <span className="block text-xs font-bold text-white">Formação Acadêmica</span>
                      <span className="text-[10px] text-[#B9B9C4]">USP & EPM/UNIFESP</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#09090B] border border-white/5 text-center">
                      <Stethoscope className="w-5 h-5 text-[#8B5CF6] mx-auto mb-1" />
                      <span className="block text-xs font-bold text-white">Prática Clínica</span>
                      <span className="text-[10px] text-[#B9B9C4]">Mais de 10 Anos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conheça a Profissional</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ciência rigorosa aliada ao{' '}
              <span className="text-gradient-primary">acolhimento humano</span>{' '}
              e individualizado.
            </h2>

            <p className="text-[#B9B9C4] text-base leading-relaxed">
              A neuropsicologia é a ponte entre a estrutura do cérebro e o comportamento humano. Meu compromisso como especialista é oferecer uma escuta atenta, respaldada pelos mais modernos instrumentos de avaliação cognitiva e neuropsicológica do mercado.
            </p>

            <p className="text-[#B9B9C4] text-base leading-relaxed">
              Cada cérebro possui uma arquitetura única. Seja na investigação de hipóteses diagnósticas de TDAH, Transtorno do Espectro Autista (TEA), alteração de memória ou reabilitação cognitiva, trabalho com laudos completos que orientam equipes médicas, escolas e famílias.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Baterias Normatizadas</h4>
                  <p className="text-xs text-[#B9B9C4]">Testes validados pelo SATEPSI e literatura internacional.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Laudos Claros & Objetivos</h4>
                  <p className="text-xs text-[#B9B9C4]">Documento fundamentado pronto para médicos e pareceristas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Devolutiva Humanizada</h4>
                  <p className="text-xs text-[#B9B9C4]">Sessão dedicada a explicar os resultados com acolhimento.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Plataforma Digital Exclusiva</h4>
                  <p className="text-xs text-[#B9B9C4]">Área do cliente integrada para gestão de consultas e documentos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
