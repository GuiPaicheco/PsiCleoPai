import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const where: any = {};
    if (date) {
      where.date = date;
    }

    const slots = await prisma.availabilitySlot.findMany({
      where,
      orderBy: { time: 'asc' },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Erro ao buscar disponibilidade' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, reason } = body;

    if (!date || !time) {
      return NextResponse.json({ error: 'Data e horário são obrigatórios' }, { status: 400 });
    }

    const slot = await prisma.availabilitySlot.create({
      data: {
        date,
        time,
        isAvailable: false,
        reason: reason || 'Bloqueio de Agenda / Ausência Profissional',
      },
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error('Error locking slot:', error);
    return NextResponse.json({ error: 'Erro ao bloquear horário' }, { status: 500 });
  }
}
