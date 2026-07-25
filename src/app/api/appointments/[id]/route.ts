import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...(body.status ? { status: body.status } : {}),
        ...(body.paymentStatus ? { paymentStatus: body.paymentStatus } : {}),
        ...(body.date ? { date: body.date } : {}),
        ...(body.time ? { time: body.time } : {}),
        ...(body.notes ? { notes: body.notes } : {}),
      },
    });

    if (body.paymentStatus) {
      await prisma.payment.updateMany({
        where: { appointmentId: id },
        data: {
          status: body.paymentStatus,
          receiptIssued: body.paymentStatus === 'pago',
        },
      });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelado' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ error: 'Erro ao cancelar agendamento' }, { status: 500 });
  }
}
