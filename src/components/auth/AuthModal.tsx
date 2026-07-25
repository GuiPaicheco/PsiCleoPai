'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, User, Stethoscope, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StorageStore, DEFAULT_PATIENT_USER, DEFAULT_PRO_USER } from '@/lib/store';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'cliente' | 'profissional'>('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = (role: 'cliente' | 'profissional') => {
    if (role === 'profissional') {
      StorageStore.setCurrentUser(DEFAULT_PRO_USER);
      toast.success('Autenticado com sucesso como Neuropsicóloga (Dra. Cleo Pai)');
      onClose();
      router.push('/profissional');
    } else {
      StorageStore.setCurrentUser(DEFAULT_PATIENT_USER);
      toast.success('Autenticado com sucesso como Paciente (Lucas Silveira)');
      onClose();
      router.push('/cliente');
    }
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'profissional') {
      StorageStore.setCurrentUser({
        id: 'pro-custom',
        name: 'Dra. Cleo Pai',
        email: email || 'dra.cleopai@neuropsico.com.br',
        role: 'profissional',
      });
      toast.success('Acesso liberado para o Painel Clínico');
      onClose();
      router.push('/profissional');
    } else {
      StorageStore.setCurrentUser({
        id: 'pat-custom',
        name: email ? email.split('@')[0] : 'Paciente',
        email: email || 'paciente@email.com',
        role: 'cliente',
      });
      toast.success('Acesso liberado para a Área do Paciente');
      onClose();
      router.push('/cliente');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#13131A] border border-[#8B5CF6]/30 rounded-2xl shadow-glass overflow-hidden">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#6D28D9]" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#B9B9C4] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Acesso à Plataforma
            </h3>
            <p className="text-sm text-[#B9B9C4] mt-1">
              Selecione o perfil desejado para acessar o portal seguro
            </p>
          </div>

          {/* Quick Demo Switcher Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-1.5 bg-[#09090B] border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedRole('cliente')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedRole === 'cliente'
                  ? 'bg-[#8B5CF6] text-white shadow-glow'
                  : 'text-[#B9B9C4] hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              Área do Paciente
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('profissional')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedRole === 'profissional'
                  ? 'bg-[#8B5CF6] text-white shadow-glow'
                  : 'text-[#B9B9C4] hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Neuropsicóloga (Admin)
            </button>
          </div>

          {/* Preset One-Click Demo Box */}
          <div className="p-4 mb-6 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
                  Modo de Demonstração Rápida
                </span>
                <p className="text-xs text-[#B9B9C4] mt-0.5">
                  {selectedRole === 'profissional'
                    ? 'Acessar como Dra. Cleo Pai com acesso total ao CRM e Agenda'
                    : 'Acessar como Paciente cadastrado (Lucas Silveira)'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDemoLogin(selectedRole)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-glow transition-all shrink-0"
              >
                Entrar Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form Credentials */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                E-mail Cadastrado
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'profissional' ? 'dra.cleopai@neuropsico.com.br' : 'paciente@email.com'}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
