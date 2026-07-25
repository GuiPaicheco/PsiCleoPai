import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Total Revenue (Paid)
    const paidSum = await prisma.appointment.aggregate({
      _sum: { price: true },
      where: { paymentStatus: 'pago' },
    });
    const totalRevenue = paidSum._sum.price || 0;

    // 2. Pending Revenue
    const pendingSum = await prisma.appointment.aggregate({
      _sum: { price: true },
      where: { paymentStatus: 'pendente' },
    });
    const pendingRevenue = pendingSum._sum.price || 0;

    // 3. Active Patients Count
    const activePatientsCount = await prisma.patient.count({
      where: { isDeleted: false },
    });

    // 4. Scheduled Appointments Count
    const scheduledCount = await prisma.appointment.count({
      where: { status: 'agendado' },
    });

    // 5. Total Appointments Count
    const totalAppointmentsCount = await prisma.appointment.count();

    // 6. Dynamic Chart Aggregation (By Month)
    const allAppointments = await prisma.appointment.findMany({
      orderBy: { date: 'asc' },
    });

    const monthMap: { [key: string]: { receita: number; atendimentos: number } } = {};

    allAppointments.forEach((app) => {
      const dateObj = new Date(app.date);
      const monthLabel = dateObj.toLocaleString('pt-BR', { month: 'short' });
      const capitalMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

      if (!monthMap[capitalMonth]) {
        monthMap[capitalMonth] = { receita: 0, atendimentos: 0 };
      }
      monthMap[capitalMonth].atendimentos += 1;
      if (app.paymentStatus === 'pago') {
        monthMap[capitalMonth].receita += app.price;
      }
    });

    const chartData = Object.keys(monthMap).map((m) => ({
      month: m,
      receita: monthMap[m].receita,
      atendimentos: monthMap[m].atendimentos,
    }));

    // If empty DB, return initial clean structure
    const finalChartData = chartData.length > 0 ? chartData : [
      { month: 'Atual', receita: 0, atendimentos: 0 }
    ];

    return NextResponse.json({
      totalRevenue,
      pendingRevenue,
      activePatientsCount,
      scheduledCount,
      totalAppointmentsCount,
      chartData: finalChartData,
    });
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    return NextResponse.json({ error: 'Erro ao calcular métricas dinâmicas' }, { status: 500 });
  }
}
