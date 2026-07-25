'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, User, Stethoscope, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StorageStore, DEFAULT_PRO_USER } from '@/lib/store';
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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleProMasterLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'dra.cleopai@neuropsico.com.br',
          password: 'admin123',
          role: 'profissional',
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.error || 'Erro ao entrar como profissional');
        return;
      }

      StorageStore.setCurrentUser(data.user);
      toast.success('Autenticado como Neuropsicóloga (Dra. Cleo Pai)');
      onClose();
      router.push('/profissional');
    } catch (e) {
      setLoading(false);
      toast.error('Erro ao comunicar com o servidor');
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegisterMode) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
          }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          toast.error(data.error || 'Erro ao registrar conta');
          return;
        }

        StorageStore.setCurrentUser(data.user);
        toast.success('Conta criada com sucesso e salva no banco de dados!');
        onClose();
        router.push('/cliente');
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            role: selectedRole,
          }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          toast.error(data.error || 'Credenciais inválidas');
          return;
        }

        StorageStore.setCurrentUser(data.user);
        toast.success(`Bem-vindo(a), ${data.user.name}!`);
        onClose();
        if (data.user.role === 'profissional') {
          router.push('/profissional');
        } else {
          router.push('/cliente');
        }
      }
    } catch (e) {
      setLoading(false);
      toast.error('Erro de conexão com o banco de dados');
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
              {isRegisterMode ? 'Cadastro do Paciente' : 'Acesso à Plataforma'}
            </h3>
            <p className="text-sm text-[#B9B9C4] mt-1">
              {isRegisterMode ? 'Crie sua conta de paciente para agendar consultas' : 'Autenticação real via banco de dados'}
            </p>
          </div>

          {/* Role selector */}
          {!isRegisterMode && (
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
          )}

          {/* Master pro button */}
          {selectedRole === 'profissional' && !isRegisterMode && (
            <div className="p-4 mb-6 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
                  Acesso Profissional Mestre
                </span>
                <p className="text-xs text-[#B9B9C4] mt-0.5">
                  Dra. Cleo Pai (Acesso Admin Mestre)
                </p>
              </div>
              <button
                type="button"
                onClick={handleProMasterLogin}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-glow transition-all shrink-0"
              >
                Entrar Mestre
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Form Credentials */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Andrade"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-[#B9B9C4] mb-1.5">
                E-mail Cadastrado
              </label>
              <input
                type="email"
                required
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-95 text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {loading ? 'Autenticando...' : isRegisterMode ? 'Criar Minha Conta' : 'Entrar no Sistema'}
            </button>
          </form>

          {/* Toggle between register and login */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs text-[#A78BFA] hover:text-white font-medium"
            >
              {isRegisterMode ? 'Já possui conta? Clique para entrar' : 'Não tem conta? Cadastre-se como paciente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
