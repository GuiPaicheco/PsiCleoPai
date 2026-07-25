'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, MapPin, Phone, Mail, ShieldCheck, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-[#8B5CF6]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-glow">
                <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#8B5CF6]" />
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-tight">
                  Dra. Cleo Pai
                </span>
                <span className="block text-xs text-[#B9B9C4]">
                  Neuropsicóloga & Psicóloga Clínica
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#B9B9C4] leading-relaxed">
              Atendimento neuropsicológico humanizado com alto nível de rigor científico para crianças, adolescentes, adultos e idosos.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs text-[#A78BFA]">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              Conselho Regional de Psicologia: CRP 06/189234
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4 flex items-center gap-2">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B9B9C4]">
              <li>
                <Link href="/#sobre" className="hover:text-white transition-colors">
                  Sobre a Profissional
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Avaliação Neuropsicológica
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Investigação TDAH & Autismo
                </Link>
              </li>
              <li>
                <Link href="/#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais Tecnológicos
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Reembolso do Plano de Saúde
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Atendimentos
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B9B9C4]">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <span>Segunda a Sexta: 08:00 - 19:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <span>Sábados: 08:00 - 13:00 (Sob consulta)</span>
              </li>
              <li className="mt-4 text-xs text-[#71717A] leading-relaxed">
                Modalidades: Presencial no Consultório de São Paulo/SP ou Telemedicina / Atendimento Online Seguro.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Localização & Contato
            </h4>
            <ul className="space-y-3 text-sm text-[#B9B9C4]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>Av. Paulista, 2000 - Bela Vista, São Paulo - SP, 01310-200</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>(11) 99999-8888</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>contato@neuropsicologia.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} Dra. Cleo Pai - Todos os direitos reservados. Sistema PsicoSistema.</p>
          <div className="flex items-center gap-6">
            <span>Privacidade & LGPD em Conformidade</span>
            <span>Código de Ética do Psicólogo</span>
            <span className="flex items-center gap-1">
              Desenvolvido com <Heart className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]" /> para Neuropsicologia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
