'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User as UserIcon, ShieldCheck, Sparkles, Brain, Award, Clock } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import BookingModal from '@/components/client/BookingModal';
import { GLSLHills } from '@/components/ui/glsl-hills';

export default function Hero() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#09090B] bg-grid-pattern">
        {/* Animated 3D GLSL Hills Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
          <GLSLHills width="100%" height="100%" speed={0.4} cameraZ={110} />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#6D28D9]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#13131A] border border-[#8B5CF6]/30 text-xs font-medium text-[#A78BFA] shadow-glass">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Atendimento Presencial e Consulta Online Segura</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping" />
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Compreender a mente é o{' '}
                <span className="text-gradient-primary">
                  primeiro passo
                </span>{' '}
                para cuidar da vida.
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#B9B9C4] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Avaliação neuropsicológica, acompanhamento especializado e atendimento humanizado com tecnologia e precisão.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-semibold text-base shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Consulta
                </button>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#13131A] border border-[#8B5CF6]/30 hover:border-[#8B5CF6] text-white font-semibold text-base hover:bg-[#1A1A24] transition-all flex items-center justify-center gap-2.5 shadow-glass"
                >
                  <UserIcon className="w-5 h-5 text-[#8B5CF6]" />
                  Entrar na Área do Cliente
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                    +1.200
                  </span>
                  <span className="text-xs text-[#B9B9C4]">Avaliações Realizadas</span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                    100%
                  </span>
                  <span className="text-xs text-[#B9B9C4]">Sigilo & LGPD</span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                    CRP 06
                  </span>
                  <span className="text-xs text-[#B9B9C4]">Registro Oficial</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Presentation Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">Dra. Cleo Pai</h3>
                        <p className="text-xs text-[#A78BFA] font-medium">Especialista em Neuropsicologia</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Agenda Aberta
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#09090B]/60 border border-white/5 flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">Laudos Técnicos para Escolas e Médicos</p>
                        <p className="text-[11px] text-[#B9B9C4]">Baterias validadas (WISC, WASI, BPA, ASRS)</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#09090B]/60 border border-white/5 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">Reembolso com Plano de Saúde</p>
                        <p className="text-[11px] text-[#B9B9C4]">Recibos emitidos com CPF/CRM para reembolso total</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#09090B]/60 border border-white/5 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">Agendamento Online com Validação Real</p>
                        <p className="text-[11px] text-[#B9B9C4]">Escolha data, horário e pague via Pix instantâneo</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
                  >
                    Ver Disponibilidade de Horários
                  </button>
                </div>

                {/* Decorative floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#13131A] border border-[#8B5CF6]/40 p-4 rounded-2xl shadow-glass flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    4.9★
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Excelente Avaliação</p>
                    <p className="text-[11px] text-[#B9B9C4]">Pacientes e Familiares</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
