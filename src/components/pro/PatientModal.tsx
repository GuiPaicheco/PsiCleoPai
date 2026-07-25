'use client';

import React, { useState } from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { toast } from 'sonner';
import { StorageStore } from '@/lib/store';
import { PatientRecord } from '@/types';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientToEdit?: PatientRecord | null;
}

export default function PatientModal({ isOpen, onClose, patientToEdit }: PatientModalProps) {
  const [fullName, setFullName] = useState(patientToEdit?.fullName || '');
  const [socialName, setSocialName] = useState(patientToEdit?.socialName || '');
  const [email, setEmail] = useState(patientToEdit?.email || '');
  const [phone, setPhone] = useState(patientToEdit?.phone || '');
  const [cpf, setCpf] = useState(patientToEdit?.cpf || '');
  const [birthDate, setBirthDate] = useState(patientToEdit?.birthDate || '1995-01-01');
  const [occupation, setOccupation] = useState(patientToEdit?.occupation || '');
  const [emergencyContact, setEmergencyContact] = useState(patientToEdit?.emergencyContact || '');
  const [clinicalNotesSummary, setClinicalNotesSummary] = useState(patientToEdit?.clinicalNotesSummary || '');
  const [status, setStatus] = useState<'ativo' | 'em_avaliacao' | 'alta' | 'inativo'>(patientToEdit?.status || 'em_avaliacao');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      toast.error('Preencha pelo menos o Nome Completo e o Telefone.');
      return;
    }

    setSaving(true);
    const result = await StorageStore.savePatient({
      ...(patientToEdit ? { id: patientToEdit.id } : {}),
      fullName,
      socialName,
      email,
      phone,
      cpf,
      birthDate,
      occupation,
      emergencyContact,
      clinicalNotesSummary,
      status,
    });
    setSaving(false);

    if (result) {
      toast.success(patientToEdit ? 'Prontuário atualizado no banco de dados!' : 'Paciente cadastrado com sucesso!');
      onClose();
    } else {
      toast.error('Erro ao salvar paciente no banco de dados.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#13131A] border border-[#8B5CF6]/30 rounded-3xl shadow-glass overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#09090B]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                {patientToEdit ? 'Editar Prontuário do Paciente' : 'Novo Paciente Clínico'}
              </h3>
              <p className="text-xs text-[#B9B9C4]">Persistência real no banco relacional SQL</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#B9B9C4] hover:text-white rounded-xl hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Nome Completo *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Nome Social (opcional)</label>
              <input
                type="text"
                value={socialName}
                onChange={(e) => setSocialName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">CPF</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Telefone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Data de Nascimento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Profissão / Ocupação</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Contato de Emergência</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Ex: Nome (Grau de Parente) - (11) 99999-0000"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Status Atendimento</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-[#13131A] text-white"
            >
              <option value="em_avaliacao">Em Avaliação Neuropsicológica</option>
              <option value="ativo">Ativo (Em Reabilitação/TCC)</option>
              <option value="alta">Alta Clínica</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Resumo Anamnese / Observações Sigilosas</label>
            <textarea
              rows={3}
              value={clinicalNotesSummary}
              onChange={(e) => setClinicalNotesSummary(e.target.value)}
              placeholder="Principais queixas cognitivas, encaminhamento médico, suspeita de TDAH/TEA..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Gravando no Banco de Dados...' : 'Salvar Registro do Paciente'}
          </button>
        </form>
      </div>
    </div>
  );
}
