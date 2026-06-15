import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Orcamento, Contrato, Empresa, Cliente } from '../types';
import { formatarMoeda, formatarCPFCNPJ } from './calculos';

/**
 * Gera PDF de orçamento
 */
export const gerarPDFOrcamento = async (
  orcamento: Orcamento,
  empresa: Empresa,
  cliente: Cliente,
  logoUrl?: string
): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Cores
  const corCinzaEscuro = [44, 62, 80];
  const corCinzaMedio = [127, 140, 141];
  const corCinzaClaro = [236, 240, 241];
  const corBranco = [255, 255, 255];

  // Header com logo e dados da empresa
  if (logoUrl) {
    try {
      doc.addImage(logoUrl, 'PNG', margin, yPosition, 30, 30);
    } catch (e) {
      console.error('Erro ao adicionar logo:', e);
    }
  }

  // Dados da empresa
  doc.setTextColor(...corCinzaEscuro);
  doc.setFontSize(18);
  doc.text(empresa.nome, margin + 35, yPosition + 5);

  doc.setFontSize(10);
  doc.setTextColor(...corCinzaMedio);
  doc.text(`CNPJ: ${empresa.cnpj}`, margin + 35, yPosition + 12);
  doc.text(`Tel: ${empresa.telefone}`, margin + 35, yPosition + 17);
  doc.text(`Email: ${empresa.email}`, margin + 35, yPosition + 22);

  yPosition += 40;

  // Título
  doc.setFontSize(16);
  doc.setTextColor(...corCinzaEscuro);
  doc.text('PROPOSTA COMERCIAL', margin, yPosition);

  yPosition += 10;

  // Informações do orçamento
  doc.setFontSize(10);
  doc.setTextColor(...corCinzaMedio);
  doc.text(`Proposta nº: ${orcamento.numero}`, margin, yPosition);
  doc.text(`Data: ${new Date(orcamento.dataPropostas).toLocaleDateString('pt-BR')}`, pageWidth - margin - 50, yPosition);

  yPosition += 12;

  // Seção de cliente
  doc.setFillColor(...corCinzaClaro);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  doc.setTextColor(...corCinzaEscuro);
  doc.setFontSize(11);
  doc.text('CLIENTE', margin + 3, yPosition + 6);

  yPosition += 10;

  doc.setFontSize(9);
  doc.setTextColor(...corCinzaEscuro);
  doc.text(`Nome: ${cliente.nome}`, margin, yPosition);
  yPosition += 5;
  doc.text(`CPF/CNPJ: ${cliente.cpfCnpj}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Endereço: ${cliente.endereco}, ${cliente.numero} - ${cliente.cidade}, ${cliente.estado}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Telefone: ${cliente.telefone}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Email: ${cliente.email}`, margin, yPosition);

  yPosition += 10;

  // Seção de itens
  doc.setFillColor(...corCinzaClaro);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  doc.setTextColor(...corCinzaEscuro);
  doc.setFontSize(11);
  doc.text('ITENS', margin + 3, yPosition + 6);

  yPosition += 10;

  // Headers da tabela
  doc.setFontSize(9);
  doc.setTextColor(...corCinzaEscuro);
  doc.text('Nº', margin, yPosition);
  doc.text('Descrição', margin + 10, yPosition);
  doc.text('Valor Unit.', pageWidth - margin - 60, yPosition);
  doc.text('Qtd.', pageWidth - margin - 35, yPosition);
  doc.text('Total', pageWidth - margin - 15, yPosition);

  yPosition += 5;
  doc.setDrawColor(...corCinzaMedio);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 3;

  // Itens
  orcamento.itens.forEach((item, index) => {
    doc.setTextColor(...corCinzaEscuro);
    doc.setFontSize(9);
    doc.text((index + 1).toString(), margin, yPosition);
    doc.text(item.descricao.substring(0, 40), margin + 10, yPosition);
    doc.text(formatarMoeda(item.valor), pageWidth - margin - 60, yPosition);
    doc.text(item.quantidade.toString(), pageWidth - margin - 35, yPosition);
    doc.text(formatarMoeda(item.total), pageWidth - margin - 15, yPosition);
    yPosition += 6;
  });

  yPosition += 5;

  // Totalizadores
  doc.setDrawColor(...corCinzaMedio);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setTextColor(...corCinzaEscuro);

  doc.text('Subtotal:', pageWidth - margin - 40, yPosition);
  doc.text(formatarMoeda(orcamento.subtotal), pageWidth - margin - 15, yPosition);
  yPosition += 6;

  if (orcamento.desconto > 0) {
    doc.text(`Desconto (${orcamento.tipoDesconto === 'percentual' ? orcamento.desconto + '%' : formatarMoeda(orcamento.desconto)}):`, pageWidth - margin - 40, yPosition);
    doc.text(`-${formatarMoeda(orcamento.desconto)}`, pageWidth - margin - 15, yPosition);
    yPosition += 6;
  }

  if (orcamento.acrescimo > 0) {
    doc.text(`Acréscimo (${orcamento.tipoAcrescimo === 'percentual' ? orcamento.acrescimo + '%' : formatarMoeda(orcamento.acrescimo)}):`, pageWidth - margin - 40, yPosition);
    doc.text(`+${formatarMoeda(orcamento.acrescimo)}`, pageWidth - margin - 15, yPosition);
    yPosition += 6;
  }

  doc.setFillColor(...corCinzaClaro);
  doc.rect(pageWidth - margin - 45, yPosition - 3, 45, 8, 'F');
  doc.setFontSize(11);
  doc.setTextColor(...corCinzaEscuro);
  doc.text('TOTAL:', pageWidth - margin - 40, yPosition + 2);
  doc.text(formatarMoeda(orcamento.total), pageWidth - margin - 15, yPosition + 2);

  yPosition += 10;

  // Formas de pagamento
  if (orcamento.formaPagamento === 'vista') {
    doc.setFontSize(9);
    doc.setTextColor(...corCinzaEscuro);
    doc.text('Forma de Pagamento: À Vista', margin, yPosition);
  } else {
    doc.setFontSize(9);
    doc.setTextColor(...corCinzaEscuro);
    doc.text(`Forma de Pagamento: ${orcamento.numeroParcelas} Parcelas`, margin, yPosition);
    const valorParcela = orcamento.total / (orcamento.numeroParcelas || 1);
    doc.text(`Valor da Parcela: ${formatarMoeda(valorParcela)}`, margin, yPosition + 5);
  }

  yPosition += 12;

  // Observações
  if (orcamento.observacoes) {
    doc.setFillColor(...corCinzaClaro);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(...corCinzaEscuro);
    doc.setFontSize(11);
    doc.text('OBSERVAÇÕES', margin + 3, yPosition + 6);

    yPosition += 10;
    doc.setFontSize(9);
    doc.setTextColor(...corCinzaEscuro);
    const linhas = doc.splitTextToSize(orcamento.observacoes, pageWidth - 2 * margin - 5);
    doc.text(linhas, margin + 2, yPosition);
  }

  // Salvar PDF
  doc.save(`orcamento_${orcamento.numero}.pdf`);
};

/**
 * Gera PDF de contrato
 */
export const gerarPDFContrato = async (
  contrato: Contrato,
  empresa: Empresa,
  cliente: Cliente,
  logoUrl?: string
): Promise<void> => {
  // Implementação similar ao orçamento, mas com layout de contrato
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // TODO: Implementar geração de PDF de contrato com todos os campos específicos

  doc.save(`contrato_${contrato.numero}.pdf`);
};
