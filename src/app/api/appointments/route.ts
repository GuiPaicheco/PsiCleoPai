import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');
    const patientEmail = searchParams.get('patientEmail');

    const where: any = {};
    if (patientId) {
      where.patientId = patientId;
    } else if (patientEmail) {
      where.patientEmail = patientEmail;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [
        { date: 'asc' },
        { time: 'asc' },
      ],
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      serviceId,
      serviceTitle,
      date,
      time,
      durationMinutes,
      modality,
      price,
      paymentMethod,
      notes,
    } = body;

    if (!patientName || !date || !time || !price) {
      return NextResponse.json({ error: 'Preencha todos os campos obrigatórios' }, { status: 400 });
    }

    // 1. Conflict check: Check if date and time is already booked or locked
    const existingConflict = await prisma.appointment.findFirst({
      where: {
        date,
        time,
        status: { in: ['agendado', 'concluido', 'pendente_pagamento'] },
      },
    });

    if (existingConflict) {
      return NextResponse.json(
        { error: 'Horário indisponível! Já existe uma consulta ou bloqueio agendado para este dia e horário.' },
        { status: 409 }
      );
    }

    // 2. Also check manual availability locks
    const slotLock = await prisma.availabilitySlot.findFirst({
      where: {
        date,
        time,
        isAvailable: false,
      },
    });

    if (slotLock) {
      return NextResponse.json(
        { error: `Horário bloqueado na agenda: ${slotLock.reason || 'Indisponível'}` },
        { status: 409 }
      );
    }

    const pixPayload = `00020126580014br.gov.bcb.pix0136088366726635204000053039865405${Number(price).toFixed(2)}5802BR5915DRA CLEO PAI6009SAO PAULO62070503***6304A9C1`;

    // 3. Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patientId || null,
        patientName,
        patientEmail: patientEmail || null,
        patientPhone,
        serviceId: serviceId || null,
        serviceTitle,
        date,
        time,
        durationMinutes: durationMinutes || 50,
        modality: modality || 'presencial',
        status: 'agendado',
        price: Number(price),
        paymentStatus: 'pago', // Simulated instant pix validation for demo
        paymentMethod: paymentMethod || 'pix',
        pixCode: pixPayload,
        notes: notes || null,
      },
    });

    // 4. Create corresponding payment record in database
    await prisma.payment.create({
      data: {
        appointmentId: appointment.id,
        patientId: patientId || null,
        patientName,
        serviceTitle,
        amount: Number(price),
        date,
        method: paymentMethod || 'pix',
        status: 'pago',
        txId: `PIX-${Math.floor(100000 + Math.random() * 900000)}`,
        receiptIssued: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}
