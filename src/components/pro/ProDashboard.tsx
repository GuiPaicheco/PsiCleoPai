'use client';

import React, { useState, useEffect } from 'react';
import { StorageStore } from '@/lib/store';
import { Appointment, PatientRecord, SessionEvolutionNote, User } from '@/types';
import {
  Calendar, Users, DollarSign, Brain, Plus, Lock, Search,
  CheckCircle2, Clock, FileText, Download, ShieldCheck,
  TrendingUp, Activity, UserPlus, Stethoscope
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import PatientModal from './PatientModal';
import EvolutionModal from './EvolutionModal';
import LockSlotModal from './LockSlotModal';
import { generateAppointmentReceiptPDF } from '@/components/client/ReceiptPDF';

export default function ProDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [evolutions, setEvolutions] = useState<SessionEvolutionNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Metrics State from SQL
  const [stats, setStats] = useState<{
    totalRevenue: number;
    pendingRevenue: number;
    activePatientsCount: number;
    scheduledCount: number;
    totalAppointmentsCount: number;
    chartData: { month: string; receita: number; atendimentos: number }[];
  }>({
    totalRevenue: 0,
    pendingRevenue: 0,
    activePatientsCount: 0,
    scheduledCount: 0,
    totalAppointmentsCount: 0,
    chartData: [{ month: 'Atual', receita: 0, atendimentos: 0 }],
  });

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'agenda' | 'pacientes' | 'evolucoes' | 'financeiro'>('visao_geral');
  
  // Modals state
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<PatientRecord | null>(null);
  
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = useState(false);
  const [selectedPatientForEvolution, setSelectedPatientForEvolution] = useState<{ id: string; name: string } | null>(null);

  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    setCurrentUser(StorageStore.getCurrentUser());

    const [appsData, patientsData, evosData, statsData] = await Promise.all([
      StorageStore.fetchAppointments(),
      StorageStore.fetchPatients(),
      StorageStore.fetchEvolutions(),
      StorageStore.fetchDashboardStats(),
    ]);

    setAppointments(appsData);
    setPatients(patientsData);
    setEvolutions(evosData);

    if (statsData) {
      setStats(statsData);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('storage-appointments-changed', handleUpdate);
    window.addEventListener('storage-patients-changed', handleUpdate);
    window.addEventListener('storage-evolutions-changed', handleUpdate);
    window.addEventListener('storage-payments-changed', handleUpdate);
    window.addEventListener('storage-user-changed', handleUpdate);
    return () => {
      window.removeEventListener('storage-appointments-changed', handleUpdate);
      window.removeEventListener('storage-patients-changed', handleUpdate);
      window.removeEventListener('storage-evolutions-changed', handleUpdate);
      window.removeEventListener('storage-payments-changed', handleUpdate);
      window.removeEventListener('storage-user-changed', handleUpdate);
    };
  }, []);

  const handleUpdateAppointmentStatus = async (id: string, status: string, paymentStatus?: string) => {
    const ok = await StorageStore.updateAppointmentStatus(id, status, paymentStatus);
    if (ok) {
      toast.success(`Status da consulta atualizado.`);
      loadData();
    }
  };

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Header Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-[#8B5CF6]/30 shadow-glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[110px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-glow">
                <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center text-[#8B5CF6]">
                  <Brain className="w-8 h-8" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Painel Clínico - Dra. Cleo Pai
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] text-xs font-semibold">
                    CRP 06/189234
                  </span>
                </div>
                <p className="text-sm text-[#B9B9C4] mt-1">
                  Gestão completa da clínica neuropsicológica (Dados Persistidos via PostgreSQL/Prisma DB)
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setSelectedPatientForEdit(null);
                  setIsPatientModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white hover:bg-[#8B5CF6] text-xs font-semibold transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Novo Paciente
              </button>

              <button
                onClick={() => setIsLockModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#13131A] border border-white/10 text-white hover:border-[#8B5CF6] text-xs font-semibold transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#8B5CF6]" />
                Bloquear Horário
              </button>
            </div>
          </div>
        </div>

        {/* Executive Metrics Overview Grid (Dinamically Calculated from DB) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider block">
                Faturamento Confirmado
              </span>
              <h3 className="font-display text-2xl font-extrabold text-white mt-1">
                R$ {stats.totalRevenue.toFixed(2)}
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> Calculado via SQL
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider block">
                Consultas Agendadas
              </span>
              <h3 className="font-display text-2xl font-extrabold text-white mt-1">
                {stats.scheduledCount}
              </h3>
              <span className="text-[11px] text-[#A78BFA] font-medium mt-1 block">
                Horários na grade
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider block">
                Pacientes Ativos (CRM)
              </span>
              <h3 className="font-display text-2xl font-extrabold text-white mt-1">
                {stats.activePatientsCount}
              </h3>
              <span className="text-[11px] text-[#B9B9C4] font-medium mt-1 block">
                Com prontuário ativo
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#B9B9C4] uppercase tracking-wider block">
                Pix Pendente
              </span>
              <h3 className="font-display text-2xl font-extrabold text-amber-400 mt-1">
                R$ {stats.pendingRevenue.toFixed(2)}
              </h3>
              <span className="text-[11px] text-amber-300/80 font-medium mt-1 block">
                Aguardando banco
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('visao_geral')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'visao_geral'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            Visão Geral 360°
          </button>

          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'agenda'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agenda Profissional ({appointments.length})
          </button>

          <button
            onClick={() => setActiveTab('pacientes')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pacientes'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            Prontuário & Pacientes ({patients.length})
          </button>

          <button
            onClick={() => setActiveTab('evolucoes')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'evolucoes'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Evoluções Clínicas ({evolutions.length})
          </button>

          <button
            onClick={() => setActiveTab('financeiro')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'financeiro'
                ? 'bg-[#8B5CF6] text-white shadow-glow'
                : 'text-[#B9B9C4] hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Financeiro & Pix
          </button>
        </div>

        {/* Tab 1: Overview 360 */}
        {activeTab === 'visao_geral' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recharts Financial Chart */}
            <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-white/10">
              <h3 className="font-display text-lg font-bold text-white mb-1">
                Evolução do Faturamento & Sessões (Banco Real)
              </h3>
              <p className="text-xs text-[#B9B9C4] mb-6">Gráfico dinâmico gerado por consultas SQL no Prisma DB</p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.chartData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#B9B9C4" fontSize={12} />
                    <YAxis stroke="#B9B9C4" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#13131A', borderColor: '#8B5CF6', borderRadius: '12px', color: '#FFF' }} />
                    <Area type="monotone" dataKey="receita" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorReceita)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Daily Feed */}
            <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center justify-between">
                Fluxo da Agenda
                <span className="text-xs text-[#A78BFA] font-medium">Recente</span>
              </h3>

              {appointments.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#B9B9C4]">
                  Nenhum agendamento gravado no banco de dados ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 4).map((app) => (
                    <div key={app.id} className="p-3.5 rounded-xl bg-[#09090B] border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#8B5CF6]">{app.date} às {app.time}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          app.paymentStatus === 'pago' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {app.paymentStatus === 'pago' ? 'Pix Pago' : 'Pendente'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{app.patientName}</h4>
                      <p className="text-xs text-[#B9B9C4]">{app.serviceTitle}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Professional Agenda */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white">
                Grade de Consultas (Armazenada no Banco)
              </h3>
              <button
                onClick={() => setIsLockModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#13131A] border border-[#8B5CF6]/30 text-white text-xs font-semibold hover:border-[#8B5CF6] transition-all flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Bloquear Slot
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-[#B9B9C4]">
                A agenda está zerada. Novos agendamentos realizados pelos pacientes ou pela profissional aparecerão aqui instantaneamente.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {appointments.map((app) => (
                  <div
                    key={app.id}
                    className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] text-xs font-bold">
                          {app.date} às {app.time}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          app.status === 'agendado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <h4 className="font-display text-lg font-bold text-white">{app.patientName}</h4>
                      <p className="text-xs text-[#B9B9C4]">
                        {app.serviceTitle} • {app.durationMinutes} min • Modalidade: {app.modality.toUpperCase()}
                      </p>
                      {app.notes && (
                        <p className="text-xs text-[#71717A] italic">Nota: {app.notes}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {app.status === 'agendado' && (
                        <>
                          <button
                            onClick={() => handleUpdateAppointmentStatus(app.id, 'concluido', 'pago')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Concluir Sessão
                          </button>
                          <button
                            onClick={() => handleUpdateAppointmentStatus(app.id, 'cancelado')}
                            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold"
                          >
                            Cancelar
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          setSelectedPatientForEvolution({ id: app.patientId || '', name: app.patientName });
                          setIsEvolutionModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white hover:bg-[#8B5CF6] text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        Evoluir Prontuário
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Patients CRM */}
        {activeTab === 'pacientes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#B9B9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar paciente no banco de dados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <button
                onClick={() => {
                  setSelectedPatientForEdit(null);
                  setIsPatientModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Cadastrar Novo Paciente
              </button>
            </div>

            {filteredPatients.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-[#B9B9C4]">
                Nenhum paciente cadastrado no banco de dados. Clique em "Cadastrar Novo Paciente" para começar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((pat) => (
                  <div key={pat.id} className="glass-card glass-card-hover rounded-2xl p-6 space-y-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        pat.status === 'em_avaliacao'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {pat.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-[#B9B9C4]">{pat.totalSessions} sessões</span>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-white">{pat.fullName}</h4>
                      {pat.socialName && <p className="text-xs text-[#A78BFA]">Nome Social: {pat.socialName}</p>}
                      <p className="text-xs text-[#B9B9C4] mt-1">CPF: {pat.cpf || 'Não informado'}</p>
                      <p className="text-xs text-[#B9B9C4]">Contato: {pat.phone}</p>
                    </div>

                    {pat.clinicalNotesSummary && (
                      <div className="p-3 rounded-xl bg-[#09090B] text-xs text-[#B9B9C4] italic border border-white/5">
                        "{pat.clinicalNotesSummary}"
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedPatientForEdit(pat);
                          setIsPatientModalOpen(true);
                        }}
                        className="text-xs text-[#A78BFA] hover:text-white font-semibold flex items-center gap-1"
                      >
                        Editar Registro
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPatientForEvolution({ id: pat.id, name: pat.fullName });
                          setIsEvolutionModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] text-white text-xs font-semibold hover:bg-[#7C3AED] transition-all shadow-glow"
                      >
                        Nova Evolução
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Session Evolutions */}
        {activeTab === 'evolucoes' && (
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-white">
              Histórico de Evolução Clínica Neuropsicológica
            </h3>

            {evolutions.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-[#B9B9C4]">
                Nenhum registro de evolução clínica cadastrado ainda.
              </div>
            ) : (
              <div className="space-y-4">
                {evolutions.map((evo) => (
                  <div key={evo.id} className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] text-xs font-bold">
                          Sessão #{evo.sessionNumber} - {evo.patientName || 'Paciente'}
                        </span>
                        <span className="text-xs text-[#B9B9C4]">Data: {evo.date}</span>
                      </div>
                      <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Prontuário Sigiloso (LGPD)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-[#09090B] border border-white/5">
                        <span className="font-bold text-[#A78BFA] block mb-1">Subjetivo:</span>
                        <p className="text-[#B9B9C4]">{evo.subjective || 'Não registrado'}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#09090B] border border-white/5">
                        <span className="font-bold text-[#A78BFA] block mb-1">Objetivo (Testes Neuropsicológicos):</span>
                        <p className="text-[#B9B9C4]">{evo.objective || 'Não registrado'}</p>
                      </div>
                    </div>

                    {evo.privateNotes && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                        <span className="font-bold block mb-1">Anotação Privada da Profissional:</span>
                        <p>{evo.privateNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Financial */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-white">
              Controle Financeiro & Emissão de Comprovantes Pix
            </h3>

            {appointments.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-[#B9B9C4]">
                Nenhum registro financeiro no banco de dados.
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                {appointments.map((app) => (
                  <div key={app.id} className="p-4 rounded-xl bg-[#09090B] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{app.patientName}</h4>
                      <p className="text-xs text-[#B9B9C4]">{app.serviceTitle} • R$ {app.price.toFixed(2)}</p>
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
                          Recibo PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => {
          setIsPatientModalOpen(false);
          loadData();
        }}
        patientToEdit={selectedPatientForEdit}
      />

      {selectedPatientForEvolution && (
        <EvolutionModal
          isOpen={isEvolutionModalOpen}
          onClose={() => {
            setIsEvolutionModalOpen(false);
            loadData();
          }}
          patientId={selectedPatientForEvolution.id}
          patientName={selectedPatientForEvolution.name}
        />
      )}

      <LockSlotModal
        isOpen={isLockModalOpen}
        onClose={() => {
          setIsLockModalOpen(false);
          loadData();
        }}
      />
    </div>
  );
}
