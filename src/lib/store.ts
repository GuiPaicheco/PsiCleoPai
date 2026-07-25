'use client';

import { PatientRecord, Appointment, SessionEvolutionNote, PaymentRecord, ServiceItem, User } from '@/types';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS, INITIAL_EVOLUTION_NOTES, INITIAL_PAYMENTS, INITIAL_SERVICES } from './mockData';

const STORAGE_KEYS = {
  CURRENT_USER: 'psico_current_user',
  APPOINTMENTS: 'psico_appointments',
  PATIENTS: 'psico_patients',
  EVOLUTIONS: 'psico_evolutions',
  PAYMENTS: 'psico_payments',
  SERVICES: 'psico_services',
  BLOCKED_SLOTS: 'psico_blocked_slots',
};

// Default current user (can be patient or pro)
export const DEFAULT_PATIENT_USER: User = {
  id: 'pat-1',
  name: 'Lucas Gabriel Silveira',
  email: 'lucas.silveira@email.com',
  role: 'cliente',
  phone: '(11) 98765-4321',
  cpf: '345.678.901-22',
};

export const DEFAULT_PRO_USER: User = {
  id: 'pro-cleo',
  name: 'Dra. Cleo Pai',
  email: 'dra.cleopai@neuropsico.com.br',
  role: 'profissional',
  phone: '(11) 99999-8888',
};

export class StorageStore {
  // User Session
  static getCurrentUser(): User {
    if (typeof window === 'undefined') return DEFAULT_PATIENT_USER;
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) {
      this.setCurrentUser(DEFAULT_PATIENT_USER);
      return DEFAULT_PATIENT_USER;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_PATIENT_USER;
    }
  }

  static setCurrentUser(user: User) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('storage-user-changed'));
  }

  // Appointments
  static getAppointments(): Appointment[] {
    if (typeof window === 'undefined') return INITIAL_APPOINTMENTS;
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  }

  static addAppointment(newApp: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const apps = this.getAppointments();
    const created: Appointment = {
      ...newApp,
      id: `app-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...apps];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    
    // Auto-create pending or paid payment record
    this.addPaymentRecord({
      appointmentId: created.id,
      patientId: created.patientId,
      patientName: created.patientName,
      serviceTitle: created.serviceTitle,
      amount: created.price,
      date: created.date,
      method: created.paymentMethod || 'pix',
      status: created.paymentStatus === 'pago' ? 'pago' : 'pendente',
      txId: `PIX-${Math.floor(100000 + Math.random() * 900000)}`,
      receiptIssued: created.paymentStatus === 'pago',
    });

    window.dispatchEvent(new Event('storage-appointments-changed'));
    return created;
  }

  static updateAppointmentStatus(id: string, status: Appointment['status'], paymentStatus?: Appointment['paymentStatus']) {
    const apps = this.getAppointments();
    const updated = apps.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
        };
      }
      return a;
    });
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-appointments-changed'));
  }

  // Patients
  static getPatients(): PatientRecord[] {
    if (typeof window === 'undefined') return INITIAL_PATIENTS;
    const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PATIENTS;
    }
  }

  static addPatient(patient: Omit<PatientRecord, 'id' | 'createdAt' | 'totalSessions'>): PatientRecord {
    const patients = this.getPatients();
    const created: PatientRecord = {
      ...patient,
      id: `pat-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      totalSessions: 0,
    };
    const updated = [created, ...patients];
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-patients-changed'));
    return created;
  }

  static updatePatient(id: string, updates: Partial<PatientRecord>) {
    const patients = this.getPatients();
    const updated = patients.map(p => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-patients-changed'));
  }

  // Session Evolution Notes
  static getEvolutionNotes(patientId?: string): SessionEvolutionNote[] {
    if (typeof window === 'undefined') return INITIAL_EVOLUTION_NOTES;
    const data = localStorage.getItem(STORAGE_KEYS.EVOLUTIONS);
    let list: SessionEvolutionNote[] = INITIAL_EVOLUTION_NOTES;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = INITIAL_EVOLUTION_NOTES;
      }
    }
    if (patientId) {
      return list.filter(n => n.patientId === patientId);
    }
    return list;
  }

  static addEvolutionNote(note: Omit<SessionEvolutionNote, 'id' | 'createdAt'>): SessionEvolutionNote {
    const notes = this.getEvolutionNotes();
    const created: SessionEvolutionNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...notes];
    localStorage.setItem(STORAGE_KEYS.EVOLUTIONS, JSON.stringify(updated));
    
    // Update total sessions count for patient
    const patients = this.getPatients();
    const patient = patients.find(p => p.id === note.patientId);
    if (patient) {
      this.updatePatient(patient.id, { totalSessions: patient.totalSessions + 1 });
    }

    window.dispatchEvent(new Event('storage-evolutions-changed'));
    return created;
  }

  // Payments
  static getPayments(): PaymentRecord[] {
    if (typeof window === 'undefined') return INITIAL_PAYMENTS;
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
      return INITIAL_PAYMENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PAYMENTS;
    }
  }

  static addPaymentRecord(payment: Omit<PaymentRecord, 'id'>): PaymentRecord {
    const payments = this.getPayments();
    const created: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now()}`,
    };
    const updated = [created, ...payments];
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-payments-changed'));
    return created;
  }

  static updatePaymentStatus(paymentId: string, status: 'pago' | 'pendente' | 'estornado') {
    const payments = this.getPayments();
    const updated = payments.map(p => {
      if (p.id === paymentId) {
        return { ...p, status, receiptIssued: status === 'pago' };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-payments-changed'));
  }

  // Services
  static getServices(): ServiceItem[] {
    return INITIAL_SERVICES;
  }
}
