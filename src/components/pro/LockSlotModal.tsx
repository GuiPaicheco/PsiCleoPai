'use client';

import React, { useState } from 'react';
import { X, Lock, Save } from 'lucide-react';
import { toast } from 'sonner';
import { StorageStore } from '@/lib/store';

interface LockSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LockSlotModal({ isOpen, onClose }: LockSlotModalProps) {
  const [date, setDate] = useState('2026-07-28');
  const [time, setTime] = useState('12:00');
  const [reason, setReason] = useState('Pausa para Almoço / Reunião Clínica');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await StorageStore.lockSlot(date, time, reason);
    setSaving(false);

    if (ok) {
      toast.success(`Horário ${date} às ${time} bloqueado no banco de dados!`);
      onClose();
    } else {
      toast.error('Erro ao bloquear horário no banco de dados.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#13131A] border border-[#8B5CF6]/30 rounded-3xl shadow-glass overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#09090B]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Bloquear Horário na Agenda
              </h3>
              <p className="text-xs text-[#B9B9C4]">Impedir novos agendamentos online</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#B9B9C4] hover:text-white rounded-xl hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Data do Bloqueio</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Horário</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Motivo do Bloqueio</label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Férias, Almoço, Reunião Pedagógica..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {saving ? 'Gravando Bloqueio...' : 'Confirmar Bloqueio no Banco'}
          </button>
        </form>
      </div>
    </div>
  );
}
