'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import BookingModal from '@/components/client/BookingModal';

export default function ContactSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'avaliacao_neuropsicologica',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Por favor, informe seu nome e telefone.');
      return;
    }
    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', phone: '', message: '', service: 'avaliacao_neuropsicologica' });
  };

  return (
    <>
      <section id="contato" className="py-24 bg-[#09090B] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-medium text-[#A78BFA] mb-4">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Fale Conosco</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Inicie Seu Acompanhamento{' '}
                  <span className="text-gradient-primary">Com Agilidade</span>
                </h2>
                <p className="text-base text-[#B9B9C4] mt-3">
                  Preencha o formulário para tirar dúvidas ou agende sua primeira consulta diretamente pela plataforma.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#13131A] border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Consultório Presencial</h4>
                    <p className="text-xs text-[#B9B9C4] mt-0.5">Av. Paulista, 2000 - Bela Vista, São Paulo - SP</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#13131A] border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Telefone & WhatsApp</h4>
                    <p className="text-xs text-[#B9B9C4] mt-0.5">(11) 99999-8888</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#13131A] border border-white/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">E-mail Profissional</h4>
                    <p className="text-xs text-[#B9B9C4] mt-0.5">contato@neuropsicologia.com.br</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#6D28D9]/20 border border-[#8B5CF6]/30 text-center space-y-3">
                <h4 className="font-display text-lg font-bold text-white">Prefere agendar online agora?</h4>
                <p className="text-xs text-[#B9B9C4]">
                  Veja a grade de horários disponíveis em tempo real na nossa agenda digital.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-xs shadow-glow transition-all inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Abrir Agenda Digital
                </button>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-glass">
                <h3 className="font-display text-xl font-bold text-white border-b border-white/10 pb-4">
                  Envie uma Mensagem Direta
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Maria Oliveira"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-0000"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                      E-mail para Retorno
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                      Serviço de Interesse
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-[#13131A] text-white"
                    >
                      <option value="avaliacao_neuropsicologica">Avaliação Neuropsicológica Completa</option>
                      <option value="investigacao_tdah_autismo">Investigação de TDAH / Autismo</option>
                      <option value="reabilitacao_cognitiva">Reabilitação Cognitiva</option>
                      <option value="orientacao_parental">Orientação Parental</option>
                      <option value="psicoterapia">Psicoterapia TCC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                      Mensagem ou Detalhes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva brevemente o motivo do atendimento ou principal queixa..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
