-- ============================================================
-- SCHEMAS E ESTRUTURA PARA BANCO DE DADOS POSTGRESQL / SUPABASE
-- Sistema PsiCleoPai - Dra. Cleo Pai (Neuropsicologia)
-- ============================================================

-- 1. Tabela de Perfis de Usuários (Auth Sync)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('cliente', 'profissional', 'admin')),
    phone TEXT,
    cpf TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Prontuário de Pacientes (CRM Clínico)
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    social_name TEXT,
    email TEXT,
    phone TEXT NOT NULL,
    cpf TEXT,
    birth_date DATE,
    occupation TEXT,
    emergency_contact TEXT,
    clinical_notes_summary TEXT,
    status TEXT NOT NULL DEFAULT 'em_avaliacao' CHECK (status IN ('ativo', 'em_avaliacao', 'alta', 'inativo')),
    total_sessions INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Agendamentos & Consultas
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_email TEXT,
    patient_phone TEXT NOT NULL,
    service_id TEXT NOT NULL,
    service_title TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 50,
    modality TEXT NOT NULL CHECK (modality IN ('presencial', 'online')),
    status TEXT NOT NULL DEFAULT 'agendado' CHECK (status IN ('agendado', 'concluido', 'cancelado', 'remarcado', 'pendente_pagamento')),
    price DECIMAL(10,2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pendente' CHECK (payment_status IN ('pago', 'pendente', 'reembolsado')),
    payment_method TEXT DEFAULT 'pix',
    pix_code TEXT,
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Evolução Clínica Neuropsicológica (SOAP)
CREATE TABLE IF NOT EXISTS public.session_evolutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    session_date DATE NOT NULL,
    session_number INT NOT NULL,
    subjective TEXT, -- Relato do paciente / queixa
    objective TEXT,  -- Baterias aplicadas / escores de testes
    assessment TEXT, -- Análise cognitiva & hipótese diagnóstica
    plan TEXT,       -- Próximas etapas & encaminhamentos
    private_notes TEXT, -- Observações sigilosas da Neuropsicóloga
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de Registros de Pagamento & Cobrança Pix
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    service_title TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    method TEXT NOT NULL DEFAULT 'pix',
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pago', 'pendente', 'estornado')),
    tx_id TEXT,
    receipt_issued BOOLEAN DEFAULT FALSE
);

-- ============================================================
-- POLÍTICAS DE SEGURANÇA E PRIVACIDADE (ROW LEVEL SECURITY - RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_evolutions ENABLE ROW LEVEL SECURITY;

-- Dra. Cleo Pai (Profissional/Admin) possui acesso total
CREATE POLICY pro_full_access ON public.patients FOR ALL USING (auth.jwt() ->> 'role' = 'profissional');
CREATE POLICY pro_evolutions_access ON public.session_evolutions FOR ALL USING (auth.jwt() ->> 'role' = 'profissional');

-- Pacientes podem visualizar apenas os próprios agendamentos
CREATE POLICY patient_own_appointments ON public.appointments FOR SELECT USING (patient_email = auth.jwt() ->> 'email');
