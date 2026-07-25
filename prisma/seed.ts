import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inicializando banco de dados limpo...');

  // 1. Criar Configurações Padrão da Clínica
  await prisma.clinicSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      proName: 'Dra. Cleo Pai',
      crp: 'CRP 06/189234',
      email: 'contato@neuropsicologia.com.br',
      phone: '(11) 99999-8888',
      address: 'Av. Paulista, 2000 - Bela Vista, São Paulo - SP',
      pixKey: '08836672663',
    },
  });

  // 2. Criar Usuário Profissional Mestre (Dra. Cleo Pai)
  const proPasswordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'dra.cleopai@neuropsico.com.br' },
    update: {},
    create: {
      name: 'Dra. Cleo Pai',
      email: 'dra.cleopai@neuropsico.com.br',
      passwordHash: proPasswordHash,
      role: 'PROFISSIONAL',
      phone: '(11) 99999-8888',
      cpf: '000.000.000-00',
    },
  });

  // 3. Cadastrar Serviços Disponíveis na Clínica
  const defaultServices = [
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

  for (const s of defaultServices) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }

  console.log('✅ Banco de dados zerado e pronto para uso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
