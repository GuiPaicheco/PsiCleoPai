'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona o processo de Avaliação Neuropsicológica?',
      a: 'A avaliação ocorre em etapas: 1) Anamnese inicial (entrevista clínica de histórico); 2) Sessões de aplicação de baterias de testes padronizados (memória, atenção, QI, linguagem); 3) Análise quantitativa e qualitativa dos dados; 4) Sessão de Devolutiva com entrega do Laudo Técnico completo.',
    },
    {
      q: 'Posso solicitar reembolso pelo meu Plano de Saúde?',
      a: 'Sim! Fornecemos recibos e notas fiscais detalhadas contendo o CPF/CRM da Neuropsicóloga, código de procedimento e diagnósticos necessários para dar entrada no reembolso integral ou parcial junto à sua operadora de saúde (conforme diretrizes da ANS).',
    },
    {
      q: 'Os atendimentos podem ser realizados na modalidade Online?',
      a: 'Sim. Sessões de psicoterapia (TCC), anamneses de adultos, orientação a pais e treinos de reabilitação cognitiva funcionam perfeitamente na modalidade online através de nossa plataforma segura. Apenas determinadas etapas de testagem infantil exigem presença física.',
    },
    {
      q: 'Qual a diferença entre avaliação psicológica e neuropsicológica?',
      a: 'A avaliação neuropsicológica foca na relação entre o funcionamento cerebral e as funções cognitivas (memória, foco, planejamento) com baterias de testes normatizados para respaldar diagnósticos como TDAH, autismo e demências.',
    },
    {
      q: 'Como é realizado o agendamento e a confirmação do horário?',
      a: 'Você escolhe o dia e horário diretamente pela nossa plataforma digital. O agendamento gera um código Pix para pagamento imediato ou confirmação na clínica, garantindo a reserva automática da sua sessão no calendário.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#09090B] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-base text-[#B9B9C4]">
            Respostas transparentes sobre o atendimento, laudos e reembolso.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-200 border border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#8B5CF6] text-white' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-[#B9B9C4] leading-relaxed border-t border-white/5 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
