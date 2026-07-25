'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, User as UserIcon, Calendar, Stethoscope, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { StorageStore } from '@/lib/store';
import { User } from '@/types';
import AuthModal from '@/components/auth/AuthModal';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCurrentUser(StorageStore.getCurrentUser());

    const handleUserChange = () => {
      setCurrentUser(StorageStore.getCurrentUser());
    };

    window.addEventListener('storage-user-changed', handleUserChange);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('storage-user-changed', handleUserChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    StorageStore.setCurrentUser({
      id: 'guest',
      name: 'Visitante',
      email: '',
      role: 'cliente',
    });
    window.location.href = '/';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090B]/90 backdrop-blur-md border-b border-[#8B5CF6]/20 py-3 shadow-glass'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-glow transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#8B5CF6]" />
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                Dra. Cleo Pai
                <span className="text-[#8B5CF6] text-xs font-normal px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 hidden sm:inline-block">
                  CRP 06/189234
                </span>
              </span>
              <span className="block text-xs text-[#B9B9C4] font-medium tracking-wide">
                Neuropsicologia & Saúde Mental
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#sobre" className="text-sm font-medium text-[#B9B9C4] hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/#servicos" className="text-sm font-medium text-[#B9B9C4] hover:text-white transition-colors">
              Especialidades
            </Link>
            <Link href="/#diferenciais" className="text-sm font-medium text-[#B9B9C4] hover:text-white transition-colors">
              Diferenciais
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-[#B9B9C4] hover:text-white transition-colors">
              Dúvidas (FAQ)
            </Link>
            <Link href="/#contato" className="text-sm font-medium text-[#B9B9C4] hover:text-white transition-colors">
              Contato
            </Link>
          </nav>

          {/* Action CTAs & Auth Switcher */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser && currentUser.id !== 'guest' ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'profissional' ? (
                  <Link
                    href="/profissional"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white font-medium text-sm hover:bg-[#8B5CF6]/30 transition-all shadow-glow"
                  >
                    <Stethoscope className="w-4 h-4 text-[#8B5CF6]" />
                    Painel Clínico (Dra. Cleo)
                  </Link>
                ) : (
                  <Link
                    href="/cliente"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6] text-white font-medium text-sm hover:bg-[#7C3AED] transition-all shadow-glow"
                  >
                    <UserIcon className="w-4 h-4" />
                    Área do Paciente
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  title="Sair da Conta"
                  className="p-2 rounded-xl bg-[#13131A] border border-white/10 text-[#B9B9C4] hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13131A] border border-[#8B5CF6]/30 text-white font-medium text-sm hover:border-[#8B5CF6] hover:bg-[#1A1A24] transition-all"
                >
                  <UserIcon className="w-4 h-4 text-[#8B5CF6]" />
                  Área Restrita / Login
                </button>
                <Link
                  href="/#contato"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-sm hover:opacity-95 transition-all shadow-glow group"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Consulta
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#13131A] border border-white/10 text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#09090B] border-b border-[#8B5CF6]/20 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#sobre"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B9B9C4] hover:text-white py-2 border-b border-white/5"
              >
                Sobre
              </Link>
              <Link
                href="/#servicos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B9B9C4] hover:text-white py-2 border-b border-white/5"
              >
                Especialidades
              </Link>
              <Link
                href="/#diferenciais"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B9B9C4] hover:text-white py-2 border-b border-white/5"
              >
                Diferenciais
              </Link>
              <Link
                href="/#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B9B9C4] hover:text-white py-2 border-b border-white/5"
              >
                Dúvidas (FAQ)
              </Link>
              <Link
                href="/#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#B9B9C4] hover:text-white py-2 border-b border-white/5"
              >
                Contato
              </Link>
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              {currentUser && currentUser.id !== 'guest' ? (
                <>
                  {currentUser.role === 'profissional' ? (
                    <Link
                      href="/profissional"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-3 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white font-semibold text-sm"
                    >
                      Acessar Painel Clínico
                    </Link>
                  ) : (
                    <Link
                      href="/cliente"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-3 rounded-xl bg-[#8B5CF6] text-white font-semibold text-sm"
                    >
                      Acessar Área do Paciente
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-sm text-red-400"
                  >
                    Sair da Conta
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsAuthOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-[#13131A] border border-[#8B5CF6]/30 text-white font-medium text-sm"
                  >
                    Entrar na Conta / Demo Login
                  </button>
                  <Link
                    href="/#contato"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-semibold text-sm"
                  >
                    Agendar Consulta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Selector Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
