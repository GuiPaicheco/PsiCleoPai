import { PatientRecord, Appointment, SessionEvolutionNote, PaymentRecord, ServiceItem } from '@/types';

// Zero mock data - Database initialized completely clean!
export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'avaliacao_neuropsicologica',
    title: 'Avaliação Neuropsicológica Completa',
    description: 'Mapeamento detalhado das funções cerebrais: atenção, memória de trabalho, QI, linguagem, raciocínio lógico, funções executivas e perfil emocional.',
    durationMinutes: 90,
    price: 450.00,
    modality: 'presencial',
  },
  {
    id: 'investigacao_tdah_autismo',
    title: 'Investigação de TDAH e Autismo (TEA)',
    description: 'Protocolo especializado para diagnóstico diferencial em adultos, adolescentes e crianças. Identificação de mascaramento e hiperfoco.',
    durationMinutes: 90,
    price: 480.00,
    modality: 'presencial',
  },
  {
    id: 'reabilitacao_cognitiva',
    title: 'Reabilitação Cognitiva & Treino Executivo',
    description: 'Treinamento neuropsicológico direcionado para reestruturar funções deficitárias ou compensar perdas de atenção e organização.',
    durationMinutes: 50,
    price: 280.00,
    modality: 'hibrido',
  },
  {
    id: 'desenvolvimento_infantil',
    title: 'Desenvolvimento Infantil & Dificuldades de Aprendizagem',
    description: 'Investigação de dislexia, discalculia, atrasos de linguagem e alterações comportamentais que impactam o rendimento escolar.',
    durationMinutes: 90,
    price: 450.00,
    modality: 'presencial',
  },
  {
    id: 'orientacao_parental',
    title: 'Orientação a Pais e Familiares',
    description: 'Suporte humanizado para famílias de crianças e jovens neurodivergentes. Manejo de crises, rotina de estudos e limites afetivos.',
    durationMinutes: 60,
    price: 300.00,
    modality: 'online',
  },
  {
    id: 'psicoterapia_tcc',
    title: 'Psicoterapia Cognitivo-Comportamental (TCC)',
    description: 'Acompanhamento clínico individual focado no tratamento de ansiedade, regulação emocional, episódios depressivos e burnout.',
    durationMinutes: 50,
    price: 250.00,
    modality: 'online',
  },
];

export const INITIAL_PATIENTS: PatientRecord[] = [];
export const INITIAL_APPOINTMENTS: Appointment[] = [];
export const INITIAL_EVOLUTION_NOTES: SessionEvolutionNote[] = [];
export const INITIAL_PAYMENTS: PaymentRecord[] = [];
