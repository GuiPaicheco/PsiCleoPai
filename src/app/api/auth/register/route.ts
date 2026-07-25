import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, cpf } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Preencha nome, e-mail e senha' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role: 'CLIENTE',
        phone,
        cpf,
      },
    });

    // Auto-create patient record linked to user
    const newPatient = await prisma.patient.create({
      data: {
        userId: newUser.id,
        fullName: name,
        email: email.toLowerCase().trim(),
        phone: phone || '',
        cpf: cpf || '',
        status: 'em_avaliacao',
      },
    });

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: 'cliente',
        patientId: newPatient.id,
      },
    });
  } catch (error) {
    console.error('Error registering:', error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
