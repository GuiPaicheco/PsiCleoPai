'use client';

import React from 'react';
import { Star, Quote, Shield } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Mariana S.',
      role: 'Mãe de paciente (10 anos)',
      tag: 'Avaliação Infantil',
      text: 'O laudo da Dra. Cleo mudou completamente a trajetória escolar do meu filho. A equipe pedagógica finalmente entendeu as acomodações que ele precisava para o TDAH.',
      stars: 5,
    },
    {
      name: 'Dr. Roberto Mendes',
      role: 'Neurologista Parceiro',
      tag: 'Encaminhamento Médico',
      text: 'Encaminho meus pacientes com total tranquilidade. O rigor técnico das baterias neuropsicológicas e a clareza do relatório simplificam o diagnóstico clínico final.',
      stars: 5,
    },
    {
      name: 'Lucas G.',
      role: 'Paciente Adulto',
      tag: 'Investigação TDAH Adulto',
      text: 'Descobrir meu diagnóstico aos 30 anos foi libertador. Todo o processo de avaliação foi conduzi com extrema sensibilidade e clareza nas devolutivas.',
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#09090B] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA]">
            <Quote className="w-3.5 h-3.5" />
            <span>Depoimentos & Impacto Clínico</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            O Que Dizem Nossos{' '}
            <span className="text-gradient-primary">Pacientes e Parceiros</span>
          </h2>
          <p className="text-base text-[#B9B9C4]">
            Histórias reais de transformação, alívio e clareza após o processo neuropsicológico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-[#A78BFA] px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm text-[#B9B9C4] italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-[#71717A]">{item.role}</p>
                </div>
                <Shield className="w-4 h-4 text-[#8B5CF6]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
