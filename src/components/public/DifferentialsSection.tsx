'use client';

import React from 'react';
import { HeartHandshake, Microchip, CalendarCheck, ShieldCheck, FileSpreadsheet, MessageSquareQuote, Check } from 'lucide-react';

export default function DifferentialsSection() {
  const differentials = [
    {
      title: 'Atendimento Humanizado & Acolhedor',
      description: 'Espaço seguro e livre de julgamentos, onde a dor emocional e as angústias do paciente ou da família são tratadas com empatia genuína.',
      icon: HeartHandshake,
    },
    {
      title: 'Embasamento Científico Atualizado',
      description: 'Uso de baterias normatizadas com validação internacional e atualização constante com os mais recentes avanços das Neurociências.',
      icon: Microchip,
    },
    {
      title: 'Agenda Digital com Validação Real',
      description: 'Escolha de horários em tempo real com confirmação imediata, sem necessidade de troca exaustiva de mensagens.',
      icon: CalendarCheck,
    },
    {
      title: 'Pagamentos Integrados via Pix',
      description: 'Confirmação automática de agendamento com emissão instantânea de comprovantes e recibos prontos para o Imposto de Renda.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Histórico Clínico e Prontuário Digital',
      description: 'Registros organizados sob estrito sigilo de dados (LGPD) e criptografia de ponta a ponta para acompanhamento longitudinal.',
      icon: ShieldCheck,
    },
    {
      title: 'Comunicação Clara & Suporte Contínuo',
      description: 'Explicações acessíveis sem jargões excessivos durante a devolutiva, com suporte aos encaminhamentos médicos e escolares.',
      icon: MessageSquareQuote,
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-[#09090B] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA]">
            <Check className="w-3.5 h-3.5" />
            <span>Por Que Escolher Nossa Clínica</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Padrão Profissional de{' '}
            <span className="text-gradient-primary">Excelência Clínica</span>
          </h2>
          <p className="text-base text-[#B9B9C4]">
            Unimos a tradição do acolhimento terapêutico com a eficiência de uma plataforma clínica moderna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-5 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#B9B9C4] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
