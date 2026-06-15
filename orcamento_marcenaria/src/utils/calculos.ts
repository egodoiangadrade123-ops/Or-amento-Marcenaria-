import { ItemOrcamento } from '../types';

/**
 * Calcula o subtotal de um array de itens
 */
export const calcularSubtotal = (itens: ItemOrcamento[]): number => {
  return itens.reduce((total, item) => total + item.total, 0);
};

/**
 * Calcula o valor do desconto
 */
export const calcularDesconto = (
  subtotal: number,
  desconto: number,
  tipoDesconto: 'percentual' | 'fixo'
): number => {
  if (tipoDesconto === 'percentual') {
    return (subtotal * desconto) / 100;
  }
  return desconto;
};

/**
 * Calcula o valor do acréscimo
 */
export const calcularAcrescimo = (
  subtotal: number,
  acrescimo: number,
  tipoAcrescimo: 'percentual' | 'fixo'
): number => {
  if (tipoAcrescimo === 'percentual') {
    return (subtotal * acrescimo) / 100;
  }
  return acrescimo;
};

/**
 * Calcula o total do orçamento
 */
export const calcularTotal = (
  subtotal: number,
  desconto: number,
  tipoDesconto: 'percentual' | 'fixo',
  acrescimo: number,
  tipoAcrescimo: 'percentual' | 'fixo'
): number => {
  const descontoValor = calcularDesconto(subtotal, desconto, tipoDesconto);
  const acrescimoValor = calcularAcrescimo(subtotal, acrescimo, tipoAcrescimo);
  return subtotal - descontoValor + acrescimoValor;
};

/**
 * Calcula o valor de cada parcela
 */
export const calcularParcelas = (
  total: number,
  numeroParcelas: number
): number => {
  if (numeroParcelas <= 0) return 0;
  return total / numeroParcelas;
};

/**
 * Formata um valor em moeda brasileira
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

/**
 * Formata um número com 2 casas decimais
 */
export const formatarNumero = (valor: number): string => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Valida se um CPF/CNPJ é válido (validação básica)
 */
export const validarCPFCNPJ = (valor: string): boolean => {
  const apenasNumeros = valor.replace(/\D/g, '');
  
  if (apenasNumeros.length === 11) {
    // Validação básica de CPF
    return apenasNumeros.length === 11 && apenasNumeros !== '00000000000';
  } else if (apenasNumeros.length === 14) {
    // Validação básica de CNPJ
    return apenasNumeros.length === 14 && apenasNumeros !== '00000000000000';
  }
  
  return false;
};

/**
 * Formata CPF
 */
export const formatarCPF = (valor: string): string => {
  const apenasNumeros = valor.replace(/\D/g, '');
  return apenasNumeros
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata CNPJ
 */
export const formatarCNPJ = (valor: string): string => {
  const apenasNumeros = valor.replace(/\D/g, '');
  return apenasNumeros
    .slice(0, 14)
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Formata telefone
 */
export const formatarTelefone = (valor: string): string => {
  const apenasNumeros = valor.replace(/\D/g, '');
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

/**
 * Formata CEP
 */
export const formatarCEP = (valor: string): string => {
  const apenasNumeros = valor.replace(/\D/g, '');
  return apenasNumeros.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
};
