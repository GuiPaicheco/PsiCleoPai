import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        fullName: body.fullName,
        socialName: body.socialName,
        email: body.email,
        phone: body.phone,
        cpf: body.cpf,
        birthDate: body.birthDate,
        occupation: body.occupation,
        emergencyContact: body.emergencyContact,
        clinicalNotesSummary: body.clinicalNotesSummary,
        status: body.status,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error updating patient:', error);
    return NextResponse.json({ error: 'Erro ao atualizar paciente' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // Soft delete to preserve medical records
    await prisma.patient.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json({ error: 'Erro ao excluir paciente' }, { status: 500 });
  }
}
