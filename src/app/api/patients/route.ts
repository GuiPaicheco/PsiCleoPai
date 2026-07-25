import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status');

    const where: any = {
      isDeleted: false,
    };

    if (query) {
      where.OR = [
        { fullName: { contains: query } },
        { email: { contains: query } },
        { cpf: { contains: query } },
        { phone: { contains: query } },
      ];
    }

    if (status && status !== 'todos') {
      where.status = status;
    }

    const patients = await prisma.patient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { sessionEvolutions: true },
        },
      },
    });

    const formatted = patients.map((p) => ({
      id: p.id,
      fullName: p.fullName,
      socialName: p.socialName,
      email: p.email || '',
      phone: p.phone,
      cpf: p.cpf || '',
      birthDate: p.birthDate || '',
      occupation: p.occupation || '',
      emergencyContact: p.emergencyContact || '',
      clinicalNotesSummary: p.clinicalNotesSummary || '',
      status: p.status,
      createdAt: p.createdAt.toISOString().split('T')[0],
      totalSessions: p._count.sessionEvolutions,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Erro ao buscar pacientes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, socialName, email, phone, cpf, birthDate, occupation, emergencyContact, clinicalNotesSummary, status } = body;

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Nome completo e telefone são obrigatórios' }, { status: 400 });
    }

    const patient = await prisma.patient.create({
      data: {
        fullName,
        socialName,
        email: email || null,
        phone,
        cpf: cpf || null,
        birthDate: birthDate || null,
        occupation: occupation || null,
        emergencyContact: emergencyContact || null,
        clinicalNotesSummary: clinicalNotesSummary || null,
        status: status || 'em_avaliacao',
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar paciente' }, { status: 500 });
  }
}
