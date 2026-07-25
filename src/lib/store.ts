'use client';

import { PatientRecord, Appointment, SessionEvolutionNote, PaymentRecord, ServiceItem, User } from '@/types';

const STORAGE_KEYS = {
  CURRENT_USER: 'psico_current_user',
};

export const DEFAULT_PRO_USER: User = {
  id: 'pro-cleo',
  name: 'Dra. Cleo Pai',
  email: 'dra.cleopai@neuropsico.com.br',
  role: 'profissional',
  phone: '(11) 99999-8888',
};

export const GUEST_USER: User = {
  id: 'guest',
  name: 'Visitante',
  email: '',
  role: 'cliente',
};

export class StorageStore {
  // User Session Management
  static getCurrentUser(): User {
    if (typeof window === 'undefined') return GUEST_USER;
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) return GUEST_USER;
    try {
      return JSON.parse(data);
    } catch {
      return GUEST_USER;
    }
  }

  static setCurrentUser(user: User) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('storage-user-changed'));
  }

  // Persistent Async API Endpoints

  // Fetch Patients from Database
  static async fetchPatients(query = ''): Promise<PatientRecord[]> {
    try {
      const res = await fetch(`/api/patients?q=${encodeURIComponent(query)}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error('Error fetching patients API:', e);
      return [];
    }
  }

  static async savePatient(patientData: Partial<PatientRecord>): Promise<PatientRecord | null> {
    try {
      const isEdit = Boolean(patientData.id);
      const url = isEdit ? `/api/patients/${patientData.id}` : '/api/patients';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });

      if (!res.ok) return null;
      const data = await res.json();
      window.dispatchEvent(new Event('storage-patients-changed'));
      return data;
    } catch (e) {
      console.error('Error saving patient API:', e);
      return null;
    }
  }

  // Fetch Appointments from Database
  static async fetchAppointments(patientId?: string, patientEmail?: string): Promise<Appointment[]> {
    try {
      let url = '/api/appointments';
      const params = new URLSearchParams();
      if (patientId) params.append('patientId', patientId);
      if (patientEmail) params.append('patientEmail', patientEmail);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error('Error fetching appointments API:', e);
      return [];
    }
  }

  static async createAppointment(appointmentData: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao agendar consulta' };
      }

      window.dispatchEvent(new Event('storage-appointments-changed'));
      window.dispatchEvent(new Event('storage-payments-changed'));
      return { success: true, data };
    } catch (e) {
      console.error('Error creating appointment API:', e);
      return { success: false, error: 'Erro de conexão com o servidor' };
    }
  }

  static async updateAppointmentStatus(id: string, status: string, paymentStatus?: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, paymentStatus }),
      });

      if (!res.ok) return false;
      window.dispatchEvent(new Event('storage-appointments-changed'));
      window.dispatchEvent(new Event('storage-payments-changed'));
      return true;
    } catch (e) {
      console.error('Error updating appointment status API:', e);
      return false;
    }
  }

  // Fetch Evolution Notes from Database
  static async fetchEvolutions(patientId?: string): Promise<SessionEvolutionNote[]> {
    try {
      const url = patientId ? `/api/evolutions?patientId=${patientId}` : '/api/evolutions';
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error('Error fetching evolutions API:', e);
      return [];
    }
  }

  static async saveEvolution(evolutionData: Partial<SessionEvolutionNote>): Promise<boolean> {
    try {
      const res = await fetch('/api/evolutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evolutionData),
      });

      if (!res.ok) return false;
      window.dispatchEvent(new Event('storage-evolutions-changed'));
      window.dispatchEvent(new Event('storage-patients-changed'));
      return true;
    } catch (e) {
      console.error('Error saving evolution API:', e);
      return false;
    }
  }

  // Fetch Dynamic Dashboard Metrics
  static async fetchDashboardStats() {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error('Error fetching dashboard stats API:', e);
      return null;
    }
  }

  // Manual Lock Slot
  static async lockSlot(date: string, time: string, reason: string): Promise<boolean> {
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, reason }),
      });

      if (!res.ok) return false;
      window.dispatchEvent(new Event('storage-appointments-changed'));
      return true;
    } catch (e) {
      console.error('Error locking slot API:', e);
      return false;
    }
  }
}
