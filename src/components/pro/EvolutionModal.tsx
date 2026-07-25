'use client';

import React, { useState } from 'react';
import { X, Save, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { StorageStore } from '@/lib/store';

interface EvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
}

export default function EvolutionModal({ isOpen, onClose, patientId, patientName }: EvolutionModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjective && !objective) {
      toast.error('Preencha os dados da sessão antes de salvar.');
      return;
    }

    setSaving(true);
    const ok = await StorageStore.saveEvolution({
      patientId,
      date,
      sessionNumber: Number(sessionNumber),
      subjective,
      objective,
      assessment,
      plan,
      privateNotes,
    });
    setSaving(false);

    if (ok) {
      toast.success(`Evolução clínica da sessão ${sessionNumber} salva no banco de dados!`);
      onClose();
    } else {
      toast.error('Erro ao registrar evolução no banco.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#13131A] border border-[#8B5CF6]/30 rounded-3xl shadow-glass overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#09090B]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Registro de Evolução Neuropsicológica
              </h3>
              <p className="text-xs text-[#A78BFA]">Paciente: {patientName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#B9B9C4] hover:text-white rounded-xl hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Data da Sessão</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1">Número da Sessão</label>
              <input
                type="number"
                min="1"
                required
                value={sessionNumber}
                onChange={(e) => setSessionNumber(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">
              Subjetivo (Relato do Paciente / Queixas)
            </label>
            <textarea
              rows={2}
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              placeholder="Descreva as queixas e relatos trazidos pelo paciente nesta sessão..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">
              Objetivo (Baterias Aplicadas & Resultados)
            </label>
            <textarea
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="Testes aplicados, escalas e dados quantitativos/qualitativos observados..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">
              Avaliação (Análise Cognitiva & Hipótese)
            </label>
            <textarea
              rows={2}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Hipótese diagnóstica e raciocínio neuropsicológico..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">
              Plano (Próximos Passos & Encaminhamentos)
            </label>
            <textarea
              rows={2}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Próximos passos e orientações para a sessão seguinte..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="pt-2 border-t border-white/10">
            <label className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
              Anotações Sigilosas Privadas (Apenas Neuropsicóloga)
            </label>
            <textarea
              rows={2}
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Observações comportamentais internas sigilosas..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm border-rose-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Gravando no Prontuário...' : 'Salvar Evolução no Prontuário'}
          </button>
        </form>
      </div>
    </div>
  );
}
