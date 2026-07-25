'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, QrCode, Copy, ArrowRight, ShieldCheck, User, Phone, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { StorageStore } from '@/lib/store';
import { INITIAL_SERVICES } from '@/lib/mockData';
import { ServiceType } from '@/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('avaliacao_neuropsicologica');
  const [selectedDate, setSelectedDate] = useState('2026-07-30');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [modality, setModality] = useState<'presencial' | 'online'>('presencial');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  // Generated appointment state
  const [generatedPixPayload, setGeneratedPixPayload] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentService = INITIAL_SERVICES.find(s => s.id === selectedServiceId) || INITIAL_SERVICES[0];

  const availableTimeSlots = [
    '08:00', '09:30', '11:00', '14:00', '15:30', '17:00', '18:30'
  ];

  const handleGoToPayment = () => {
    if (!patientName || !patientPhone) {
      toast.error('Preencha os dados do paciente para continuar.');
      return;
    }
    const rawPixPayload = `00020126580014br.gov.bcb.pix0136088366726635204000053039865405${currentService.price.toFixed(2)}5802BR5915DRA CLEO PAI6009SAO PAULO62070503***6304A9C1`;
    setGeneratedPixPayload(rawPixPayload);
    setStep(2);
  };

  const handleSimulatePixPayment = async () => {
    setSubmitting(true);
    const currentUser = StorageStore.getCurrentUser();

    const result = await StorageStore.createAppointment({
      patientId: currentUser.id !== 'guest' ? currentUser.id : undefined,
      patientName: patientName,
      patientEmail: patientEmail,
      patientPhone: patientPhone,
      serviceId: selectedServiceId,
      serviceTitle: currentService.title,
      date: selectedDate,
      time: selectedTime,
      durationMinutes: currentService.durationMinutes,
      modality: modality,
      price: currentService.price,
      paymentMethod: 'pix',
      notes: `Agendado via site (${modality}).`,
    });

    setSubmitting(false);

    if (!result.success) {
      toast.error(result.error || 'Não foi possível confirmar o agendamento.');
      return;
    }

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    toast.success(`Agendamento confirmado no banco de dados para ${selectedDate} às ${selectedTime}!`);
    setStep(3);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(generatedPixPayload);
    toast.success('Código PIX Copia e Cola copiado!');
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#13131A] border border-[#8B5CF6]/30 rounded-3xl shadow-glass overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#09090B]/60">
          <div>
            <span className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
              Etapa {step} de 3
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              {step === 1 && 'Escolha o Serviço e Horário'}
              {step === 2 && 'Pagamento Instantâneo via Pix'}
              {step === 3 && 'Agendamento Concluído com Sucesso!'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#B9B9C4] hover:text-white rounded-xl hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Select Service & Time */}
        {step === 1 && (
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Service selector */}
            <div>
              <label className="block text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider mb-2">
                1. Selecione a Especialidade
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {INITIAL_SERVICES.map((serv) => (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(serv.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                      selectedServiceId === serv.id
                        ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-glow'
                        : 'bg-[#09090B]/50 border-white/5 text-[#B9B9C4] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{serv.title}</h4>
                      <p className="text-xs text-[#B9B9C4]">{serv.durationMinutes} minutos • R$ {serv.price.toFixed(2)}</p>
                    </div>
                    {selectedServiceId === serv.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Modality & Date / Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider mb-2">
                  2. Modalidade
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#09090B] border border-white/10 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setModality('presencial')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                      modality === 'presencial' ? 'bg-[#8B5CF6] text-white' : 'text-[#B9B9C4]'
                    }`}
                  >
                    Presencial
                  </button>
                  <button
                    type="button"
                    onClick={() => setModality('online')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                      modality === 'online' ? 'bg-[#8B5CF6] text-white' : 'text-[#B9B9C4]'
                    }`}
                  >
                    Online
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider mb-2">
                  3. Data da Consulta
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-07-26"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider mb-2">
                4. Horários Disponíveis em Tempo Real
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableTimeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTime === t
                        ? 'bg-[#8B5CF6] text-white shadow-glow'
                        : 'bg-[#09090B] border border-white/10 text-[#B9B9C4] hover:border-[#8B5CF6]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Info Inputs */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label className="block text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider">
                5. Seus Dados de Contato
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl glass-input text-sm"
                />
                <input
                  type="tel"
                  placeholder="Telefone / WhatsApp"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
              <input
                type="email"
                placeholder="E-mail para confirmação"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleGoToPayment}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2"
            >
              Ir para Pagamento Pix (R$ {currentService.price.toFixed(2)})
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Pix QR Code Payment */}
        {step === 2 && (
          <div className="p-6 space-y-6 text-center">
            <div className="p-4 rounded-2xl bg-[#09090B] border border-[#8B5CF6]/30 inline-block mx-auto shadow-glow">
              <QRCodeSVG value={generatedPixPayload} size={180} bgColor="#09090B" fgColor="#FFFFFF" />
            </div>

            <div>
              <p className="text-xs text-[#A78BFA] font-medium uppercase tracking-wider">Total a Pagar</p>
              <h4 className="font-display text-3xl font-extrabold text-white mt-1">
                R$ {currentService.price.toFixed(2)}
              </h4>
              <p className="text-xs text-[#B9B9C4] mt-1">
                Chave Pix: <strong className="text-white">08836672663</strong> • Escaneie o QR Code ou copie a chave abaixo.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedPixPayload}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-white/10 text-xs text-[#B9B9C4] font-mono truncate"
              />
              <button
                type="button"
                onClick={handleCopyPix}
                className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white hover:bg-[#8B5CF6] text-xs font-semibold shrink-0 transition-all flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={handleSimulatePixPayment}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {submitting ? 'Gravando no Banco...' : 'Confirmar Pix e Gravar no Banco'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-4 py-3 text-xs text-[#B9B9C4] hover:text-white"
              >
                Voltar e alterar horário
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Consulta Gravada no Banco de Dados!
              </h3>
              <p className="text-sm text-[#B9B9C4] mt-2 max-w-md mx-auto">
                Seu agendamento para <strong className="text-white">{currentService.title}</strong> foi persistido para o dia <strong className="text-white">{selectedDate}</strong> às <strong className="text-white">{selectedTime}</strong> ({modality}).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#09090B] border border-white/10 text-left text-xs text-[#B9B9C4] space-y-2">
              <p className="flex items-center justify-between">
                <span>Status de Pagamento:</span>
                <span className="font-mono text-emerald-400 font-bold">PAGO E GRAVADO NO BANCO</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Profissional:</span>
                <span className="text-white">Dra. Cleo Pai (CRP 06/189234)</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Local / Link:</span>
                <span className="text-white">{modality === 'presencial' ? 'Av. Paulista, 2000' : 'Telemedicina / Online'}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm shadow-glow"
            >
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
