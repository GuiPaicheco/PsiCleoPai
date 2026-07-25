export type Role = 'cliente' | 'profissional' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  cpf?: string;
}

export type AppointmentStatus = 'agendado' | 'concluido' | 'cancelado' | 'remarcado' | 'pendente_pagamento';
export type ServiceType = 
  | 'avaliacao_neuropsicologica'
  | 'reabilitacao_cognitiva'
  | 'psicoterapia_cognitivo_comportamental'
  | 'psicoterapia_tcc'
  | 'orientacao_parental'
  | 'desenvolvimento_infantil'
  | 'investigacao_tdah_autismo';

export interface ServiceItem {
  id: ServiceType;
  title: string;
  description: string;
  durationMinutes: number;
  price: number;
  modality: 'presencial' | 'online' | 'hibrido';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: ServiceType;
  serviceTitle: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  modality: 'presencial' | 'online';
  status: AppointmentStatus;
  price: number;
  paymentStatus: 'pago' | 'pendente' | 'reembolsado';
  paymentMethod?: 'pix' | 'cartao';
  pixCode?: string;
  receiptUrl?: string;
  createdAt: string;
  notes?: string;
}

export interface PatientRecord {
  id: string;
  fullName: string;
  socialName?: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  occupation?: string;
  emergencyContact?: string;
  clinicalNotesSummary?: string;
  status: 'ativo' | 'em_avaliacao' | 'alta' | 'inativo';
  createdAt: string;
  totalSessions: number;
}

export interface SessionEvolutionNote {
  id: string;
  patientId: string;
  patientName?: string;
  appointmentId?: string;
  date: string;
  sessionNumber: number;
  subjective: string; // Observações trazidas pelo paciente
  objective: string; // Escalas aplicadas / testes neuropsicológicos
  assessment: string; // Hipótese diagnóstica / análise cognitiva
  plan: string; // Encaminhamentos e próxima etapa
  privateNotes: string; // Exclusivo para a Neuropsicóloga
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  serviceTitle: string;
  amount: number;
  date: string;
  method: 'pix' | 'cartao';
  status: 'pago' | 'pendente' | 'estornado';
  txId?: string;
  receiptIssued: boolean;
}

export interface AvailabilitySlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
  reasonForLock?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details: string;
}
