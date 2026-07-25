# PsiCleoPai - Sistema Profissional para Neuropsicóloga com Área do Cliente

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](#)

Plataforma Web completa, moderna e sofisticada para clínica de Neuropsicologia com duas frentes principais:
1. **Área Institucional / Pública**: Apresentação profissional de alta conversão para captação de pacientes.
2. **Área Logada do Paciente**: Portal exclusivo para agendamentos, pagamentos Pix com QR Code, emissão de recibos em PDF para reembolso e guias preparatórias.
3. **Painel Clínico da Neuropsicóloga**: Dashboard 360° com agenda inteligente, CRM de pacientes, prontuário com evolução clínica (SOAP) e métricas financeiras.

---

## 🎨 Identidade Visual & Design System

- **Tema Principal**: Dark Premium Sophisticated
- **Fundo Base**: `#09090B`
- **Cards & Containers**: `#13131A`
- **Destaques & Acentos**: `#8B5CF6` (Lilás / Violeta) & `#A78BFA`
- **Tipografia**: Google Fonts (`Outfit`, `Inter`, `Cormorant Garamond`)
- **Efeitos**: Glassmorphism refinado, sombras suaves, micro-animações e glows dinâmicos.

---

## ⚡ Principais Funcionalidades

### 1. Área Pública (Landing Page)
- **Hero Impactante**: Mensagem forte (*"Compreender a mente é o primeiro passo para cuidar da vida"*), badges de CRP e CTAs diretos.
- **Sobre a Profissional**: Apresentação técnica da Dra. Cleo Pai (CRP 06/189234), histórico acadêmico e abordagem científica humanizada.
- **Especialidades Clínicas**: Cards com Avaliação Neuropsicológica, Investigação de TDAH e Autismo, Reabilitação Cognitiva, Orientação Parental e Psicoterapia TCC.
- **Diferenciais Tecnológicos**: Rigor científico, sigilo LGPD, pagamento integrado e laudos claros.
- **FAQ Interativo**: Accordion abordando reembolso com planos de saúde (ANS/IRPF), modalidade online vs presencial.
- **Formulário de Pré-Agendamento**: Contato rápido e atalho direto para agenda digital.

### 2. Área do Cliente (Portal do Paciente)
- **Agendamento Online com Validação Real**: Seleção de modalidade (Presencial/Online), serviço, data e horários disponíveis em tempo real.
- **Fluxo de Pagamento Pix**: Gerador de QR Code interativo, código copia e cola e simulação de confirmação automática.
- **Recibo Oficial em PDF (`jspdf`)**: Emissão instantânea de recibo contendo CPF/CRM da profissional para reembolso com convênios e declaração de IRPF.
- **Histórico & Gestão**: Visualização de sessões agendadas, concluídas e opção de cancelamento dentro do regulamento.

### 3. Painel da Neuropsicóloga (Dashboard Clínico)
- **Métricas Executivas (360°)**: Faturamento confirmado, consultas agendadas, pacientes ativos no CRM e recebíveis pendentes.
- **Gráficos Financeiros (Recharts)**: Análise comparativa mensal de faturamento e volume de sessões.
- **Agenda Inteligente**: Visualização em grade por horário, botão para bloqueio manual de slots (férias, almoço, reuniões) e controle de status.
- **CRM & Prontuário de Pacientes**: Cadastro completo com nome social, CPF, contato de emergência e resumo de anamnese.
- **Evolução Clínica (SOAP)**: Módulo exclusivo para registrar Subjetivo, Objetivo (testes aplicados), Avaliação (hipóteses cognitivas), Plano e anotações privadas sigilosas.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js**: v18.0 ou superior
- **npm** ou **yarn** / **pnpm**

### Passo a Passo

```bash
# 1. Clonar o repositório no GitHub
git clone https://github.com/GuiPaicheco/PsiCleoPai.git

# 2. Entrar no diretório do projeto
cd PsiCleoPai

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

---

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS & CSS Modules
- **Componentes & Ícones**: Lucide Icons, Radix / Glassmorphism
- **Animações**: Framer Motion & canvas-confetti
- **Gráficos**: Recharts
- **Geração de PDF**: jsPDF
- **Notificações**: Sonner

---

## 🔒 Segurança & Privacidade (LGPD)

O sistema segue as diretrizes do **Código de Ética do Psicólogo** e as regulamentações da **LGPD (Lei Geral de Proteção de Dados)**:
- Registros clínicos privados e anotações sigilosas separadas de dados de cobrança.
- Camada de estado isolada pronta para integração com PostgreSQL / Supabase com Row Level Security (RLS).

---

## 📌 Repositório GitHub

- **URL**: [https://github.com/GuiPaicheco/PsiCleoPai.git](https://github.com/GuiPaicheco/PsiCleoPai.git)
