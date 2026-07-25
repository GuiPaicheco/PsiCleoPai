import jsPDF from 'jspdf';
import { Appointment } from '@/types';

export function generateAppointmentReceiptPDF(app: Appointment) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(19, 19, 26);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('DRA. CLEO PAI - NEUROPSICOLOGIA', 20, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('CRP 06/189234 | E-mail: contato@neuropsicologia.com.br', 20, 30);

  // Title
  doc.setTextColor(9, 9, 11);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('RECIBO DE ATENDIMENTO CLINICO', 20, 55);

  // Divider
  doc.setDrawColor(139, 92, 246);
  doc.setLineWidth(0.8);
  doc.line(20, 60, 190, 60);

  // Content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);

  const lines = [
    `Recebi de: ${app.patientName.toUpperCase()}`,
    `Referente a: ${app.serviceTitle}`,
    `Data da Realizacao: ${app.date} as ${app.time} (${app.modality.toUpperCase()})`,
    `Valor Pago: R$ ${app.price.toFixed(2)} (por extenso: ${app.price} reais)`,
    `Forma de Pagamento: PIX (ID: ${app.pixCode || 'PIX-CONFIRMED-OK'})`,
    `Status Financeiro: PAGO E QUITADO`,
  ];

  let yPos = 75;
  lines.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 10;
  });

  // Reimbursment Note
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Observacao: Este recibo e valido para fins de comprovacao de despesas medicas / psicologicas', 20, 145);
  doc.text('junto à Receita Federal (IRPF) e solicitação de Reembolso com Operadoras de Saúde (ANS).', 20, 152);

  // Signature Block
  doc.setDrawColor(150, 150, 150);
  doc.line(60, 190, 150, 190);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Dra. Cleo Pai', 105, 197, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Psicóloga Clínica & Neuropsicóloga', 105, 203, { align: 'center' });
  doc.text('CRP 06/189234', 105, 208, { align: 'center' });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Emitido via Plataforma PsicoSistema - Autenticidade Garantida', 105, 280, { align: 'center' });

  // Save File
  doc.save(`Recibo_Consulta_${app.date}_${app.patientName.replace(/\s+/g, '_')}.pdf`);
}
