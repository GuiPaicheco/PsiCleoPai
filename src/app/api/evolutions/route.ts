import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    const where: any = {};
    if (patientId) {
      where.patientId = patientId;
    }

    const evolutions = await prisma.sessionEvolution.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        patient: {
          select: { fullName: true },
        },
      },
    });

    const formatted = evolutions.map((e) => ({
      id: e.id,
      patientId: e.patientId,
      patientName: e.patient.fullName,
      appointmentId: e.appointmentId || undefined,
      date: e.date,
      sessionNumber: e.sessionNumber,
      subjective: e.subjective || '',
      objective: e.objective || '',
      assessment: e.assessment || '',
      plan: e.plan || '',
      privateNotes: e.privateNotes || '',
      createdAt: e.createdAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching evolutions:', error);
    return NextResponse.json({ error: 'Erro ao buscar evoluções' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, appointmentId, date, sessionNumber, subjective, objective, assessment, plan, privateNotes } = body;

    if (!patientId || !date) {
      return NextResponse.json({ error: 'Identificação do paciente e data são obrigatórios' }, { status: 400 });
    }

    const evolution = await prisma.sessionEvolution.create({
      data: {
        patientId,
        appointmentId: appointmentId || null,
        date,
        sessionNumber: Number(sessionNumber) || 1,
        subjective,
        objective,
        assessment,
        plan,
        privateNotes,
      },
    });

    return NextResponse.json(evolution);
  } catch (error) {
    console.error('Error creating evolution note:', error);
    return NextResponse.json({ error: 'Erro ao registrar evolução clínica' }, { status: 500 });
  }
}
