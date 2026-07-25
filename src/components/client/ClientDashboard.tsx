'use client';

import React, { useState, useEffect } from 'react';
import { StorageStore } from '@/lib/store';
import { Appointment, User } from '@/types';
import { Calendar, Clock, Download, FileText, Plus, User as UserIcon, CheckCircle2, AlertCircle, RefreshCw, LogOut, ArrowRight, ShieldCheck, MapPin, Video } from 'lucide-react';
import { toast } from 'sonner';
import BookingModal from './BookingModal';
import { generateAppointmentReceiptPDF } from './ReceiptPDF';

export default function ClientDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'pagamentos' | 'documentos' | 'perfil'>('agendamentos');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const loadData = () => {
    const user = StorageStore.getCurrentUser();
    setCurrentUser(user);
    const apps = StorageStore.getAppointments();
    // Filter for current patient if role is cliente
    if (user && user.role === 'cliente') {
      setAppointments(apps.filter(a => a.patientId === user.id || a.patientEmail === user.email));
    } else {
      setAppointments(apps);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('storage-appointments-changed', handleUpdate);
    window.addEventListener('storage-user-changed', handleUpdate);
    return () => {
      window.removeEventListener('storage-appointments-changed', handleUpdate);
      window.removeEventListener('storage-user-changed', handleUpdate);
    };
  }, []);

  const handleCancelAppointment = (appId: string) => {
    if (confirm('Deseja realmente solicitar o cancelamento da consulta?')) {
      StorageStore.updateAppointmentStatus(appId, 'cancelado');
      toast.success('Solicitação de cancelamento registrada.');
    }
  };

  const filteredAppointments = appointments.filter(a => {
    if (filterStatus === 'todos') return true;
    return a.status === filterStatus;
  });

  const nextAppointment = appointments.find(a => a.status === 'agendado');

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Patient Portal Header Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-[#8B5CF6]/30 shadow-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-glow">
                <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center text-white font-bold text-xl">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Bem-vindo(a), {currentUser?.name || 'Paciente'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] text-xs font-semibold">
                    Área do Paciente
                  </span>
                </div>
                <p className="text-sm text-[#B9B9C4] mt-1">
                  Gerencie suas consultas neuropsicológicas, recibos e documentos clínicos
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Novo Agendamento
            </button>
          </div>
        </div>

        {/* Next Appointment Card Highlight */}
        {nextAppointment && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/20 via-[#13131A] to-[#13131A] border border-[#8B5CF6]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-glow shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider block">
                  Próxima Consulta Confirmada
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {nextAppointment.serviceTitle}
                </h3>
                <p className="text-xs text-[#B9B9C4] mt-0.5 flex items-center gap-2">
                  <span>📅 {nextAppointment.date} às {nextAppointment.time} ({nextAppointment.durationMinutes} min)</span>
                  •
                  <span className="flex items-center gap-1">
                    {nextAppointment.modality === 'presencial' ? <MapPin className="w-3 h-3 text-[#8B5CF6]" /> : <Video className="w-3 h-3 text-[#8B5CF6]" />}
                    {nextAppointment.modality === 'presencial' ? 'Av. Paulista, 2000' : 'Telemedicina / Online'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {nextAppointment.modality === 'online' && (
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  Entrar na Sala Telemedicina
                </a>
              )}
              {nextAppointment.paymentStatus === 'pago' && (
                <button
                  onClick={() => generateAppointmentReceiptPDF(nextAppointment)}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white hover:bg-[#8B5CF6] text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar Recibo PDF
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'agendamentos'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Minhas Consultas ({appointments.length})
          </button>

          <button
            onClick={() => setActiveTab('pagamentos')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pagamentos'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            Pagamentos & Recibos
          </button>

          <button
            onClick={() => setActiveTab('documentos')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'documentos'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Documentos & Guias
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            Meu Perfil
          </button>
        </div>

        {/* Tab 1: Appointments List */}
        {activeTab === 'agendamentos' && (
          <div className="space-y-6">
            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {['todos', 'agendado', 'concluido', 'cancelado'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    filterStatus === st
                      ? 'bg-[#8B5CF6]/30 border border-[#8B5CF6] text-white'
                      : 'bg-[#13131A] text-[#B9B9C4] hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-[#B9B9C4] space-y-3">
                <Calendar className="w-12 h-12 text-[#8B5CF6] mx-auto opacity-50" />
                <h4 className="font-display font-bold text-lg text-white">Nenhum agendamento encontrado</h4>
                <p className="text-xs">Você não possui consultas com esse filtro no histórico.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          app.status === 'agendado'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : app.status === 'concluido'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-[#B9B9C4]">ID: {app.id}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white">{app.serviceTitle}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#B9B9C4]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          {app.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          {app.time} ({app.durationMinutes} min)
                        </span>
                        <span className="text-white font-semibold">
                          R$ {app.price.toFixed(2)} ({app.paymentStatus})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {app.paymentStatus === 'pago' && (
                        <button
                          onClick={() => generateAppointmentReceiptPDF(app)}
                          className="px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white hover:bg-[#8B5CF6] text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Recibo
                        </button>
                      )}
                      {app.status === 'agendado' && (
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-all"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Payments */}
        {activeTab === 'pagamentos' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Histórico Financeiro & Emissão de Recibos
              </h3>
              <div className="space-y-3">
                {appointments.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl bg-[#09090B] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white">{app.serviceTitle}</h4>
                      <p className="text-xs text-[#B9B9C4]">Data: {app.date} • Valor: R$ {app.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        app.paymentStatus === 'pago' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {app.paymentStatus === 'pago' ? 'PAGO VIA PIX' : 'PENDENTE'}
                      </span>

                      {app.paymentStatus === 'pago' && (
                        <button
                          onClick={() => generateAppointmentReceiptPDF(app)}
                          className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] text-white text-xs font-semibold hover:bg-[#7C3AED] transition-all flex items-center gap-1 shadow-glow"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Baixar PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Documents */}
        {activeTab === 'documentos' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                Guias Práticas & Orientações Pré-Consulta
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#09090B] border border-white/10 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Guia de Preparação para Avaliação Neuropsicológica</h4>
                    <p className="text-xs text-[#B9B9C4] mt-1">Orientações de sono, alimentação e medicamentos para a testagem.</p>
                  </div>
                  <button
                    onClick={() => toast.info('Download do Guia de Preparação iniciado.')}
                    className="p-2 rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all shrink-0"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#09090B] border border-white/10 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Formulário de Anamnese Inicial (Preenchimento)</h4>
                    <p className="text-xs text-[#B9B9C4] mt-1">Questionário de histórico do desenvolvimento e rotina.</p>
                  </div>
                  <button
                    onClick={() => toast.info('Formulário de Anamnese aberto.')}
                    className="p-2 rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all shrink-0"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Profile */}
        {activeTab === 'perfil' && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 max-w-2xl space-y-4">
            <h3 className="font-display text-xl font-bold text-white">Seus Dados Pessoais</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#B9B9C4] mb-1">Nome Completo</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser?.name || ''}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B9B9C4] mb-1">E-mail Cadastrado</label>
                <input
                  type="email"
                  readOnly
                  value={currentUser?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B9B9C4] mb-1">CPF (para Emissão de Recibos)</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser?.cpf || '345.678.901-22'}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
