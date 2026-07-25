'use client';

import React, { useState } from 'react';
import { Brain, Sparkles, Activity, Users, BookOpen, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import BookingModal from '@/components/client/BookingModal';
import { INITIAL_SERVICES } from '@/lib/mockData';

export default function ServicesSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const servicesData = [
    {
      id: 'avaliacao_neuropsicologica',
      title: 'Avaliação Neuropsicológica Completa',
      category: 'Diagnóstico Cognitivo',
      description: 'Mapeamento detalhado das funções cerebrais: atenção, memória de trabalho, QI, linguagem, raciocínio lógico, funções executivas e perfil emocional.',
      features: ['Bateria WASI/WISC-IV', 'Relatório Técnico Fundamentado', 'Devolutiva presencial/online'],
      icon: Brain,
      popular: true,
      price: 'R$ 450,00',
    },
    {
      id: 'investigacao_tdah_autismo',
      title: 'Investigação de TDAH e Autismo (TEA)',
      category: 'Neurodivergência',
      description: 'Protocolo especializado para diagnóstico diferencial em adultos, adolescentes e crianças. Identificação de mascaramento (camouflaging) e hiperfoco.',
      features: ['Escalas ASRS-18 & SRS-2', 'Entrevista de Anamnese Estruturada', 'Guia de Acomodações Escolares/Profissionais'],
      icon: Activity,
      popular: true,
      price: 'R$ 480,00',
    },
    {
      id: 'reabilitacao_cognitiva',
      title: 'Reabilitação Cognitiva & Treino Executivo',
      description: 'Treinamento neuropsicológico direcionado para reestruturar funções deficitárias ou compensar perdas de atenção, planejamento e organização.',
      features: ['Exercícios Neurocognitivos Customizados', 'Estratégias de Rotina e Foco', 'Acompanhamento de Evolução'],
      icon: Sparkles,
      popular: false,
      price: 'R$ 280,00',
    },
    {
      id: 'desenvolvimento_infantil',
      title: 'Desenvolvimento Infantil & Dificuldades de Aprendizagem',
      description: 'Investigação de dislexia, discalculia, atrasos de linguagem e alterações comportamentais que impactam o rendimento escolar.',
      features: ['Avaliação Psicomotora e Linguística', 'Contato com a Equipe Pedagógica', 'Orientações para Adaptar Materiais'],
      icon: BookOpen,
      popular: false,
      price: 'R$ 450,00',
    },
    {
      id: 'orientacao_parental',
      title: 'Orientação a Pais e Familiares',
      description: 'Suporte humanizado para famílias de crianças e jovens neurodivergentes. Manejo de crises, birras, rotina de estudos e limites afetivos.',
      features: ['Sessões de 60 minutos', 'Plano Prático de Ação Familiar', 'Material de Apoio Digital'],
      icon: Users,
      popular: false,
      price: 'R$ 300,00',
    },
    {
      id: 'psicoterapia_tcc',
      title: 'Psicoterapia Cognitivo-Comportamental (TCC)',
      description: 'Acompanhamento clínico individual focado no tratamento de ansiedade, regulação emocional, episódios depressivos e síndrome de burnout.',
      features: ['Técnicas de Reestruturação Cognitiva', 'Treino de Habilidades Sociais', 'Modalidade Online Conveniente'],
      icon: ShieldCheck,
      popular: false,
      price: 'R$ 250,00',
    },
  ];

  return (
    <>
      <section id="servicos" className="py-24 bg-[#09090B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA]">
              <Brain className="w-3.5 h-3.5" />
              <span>Especialidades Clínicas</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Serviços Neuropsicológicos de{' '}
              <span className="text-gradient-primary">Alta Precisão</span>
            </h2>
            <p className="text-base sm:text-lg text-[#B9B9C4]">
              Protocolos validados e atendimento adaptado às necessidades individuais de cada fase da vida.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((serv) => {
              const IconComponent = serv.icon;
              return (
                <div
                  key={serv.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
                >
                  {serv.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-[10px] font-bold tracking-wider uppercase shadow-glow">
                      Mais Solicitado
                    </div>
                  )}

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-5 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider block mb-1">
                      {serv.category}
                    </span>

                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {serv.title}
                    </h3>

                    <p className="text-sm text-[#B9B9C4] leading-relaxed mb-6">
                      {serv.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {serv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#B9B9C4]">
                          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#71717A] block">Investimento</span>
                      <span className="font-display text-lg font-bold text-white">
                        {serv.price}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white font-medium text-xs hover:bg-[#8B5CF6] transition-all flex items-center gap-1.5 group-hover:shadow-glow"
                    >
                      Agendar
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
