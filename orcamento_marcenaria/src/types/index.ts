// Tipos para Empresa
export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  logo?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  chavePixe?: string;
  observacoesPadrao?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

// Tipos para Cliente
export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  rgIe?: string;
  endereco: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  contatoPessoa?: string;
  empresaId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

// Tipos para Serviço
export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  categoria?: string;
  empresaId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

// Tipos para Item de Orçamento
export interface ItemOrcamento {
  id: string;
  descricao: string;
  valor: number;
  quantidade: number;
  total: number;
}

// Tipos para Orçamento
export interface Orcamento {
  id: string;
  numero: string;
  clienteId: string;
  empresaId: string;
  dataPropostas: Date;
  formaPagamento: 'vista' | 'parcelado';
  numeroParcelas?: number;
  portador?: string;
  itens: ItemOrcamento[];
  subtotal: number;
  desconto: number;
  tipoDesconto: 'percentual' | 'fixo';
  acrescimo: number;
  tipoAcrescimo: 'percentual' | 'fixo';
  total: number;
  observacoes?: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado';
  criadoEm: Date;
  atualizadoEm: Date;
}

// Tipos para Contrato
export interface Contrato {
  id: string;
  numero: string;
  orcamentoId?: string;
  clienteId: string;
  empresaId: string;
  dataContrato: Date;
  prazoDentrega: number; // em dias
  garantiaLegal: number; // em dias
  garantiaContratual: number; // em dias
  garantiaTotal: number; // em dias
  responsabilidadesContratante: string;
  responsabilidadesContratada: string;
  itens: ItemOrcamento[];
  subtotal: number;
  desconto: number;
  tipoDesconto: 'percentual' | 'fixo';
  acrescimo: number;
  tipoAcrescimo: 'percentual' | 'fixo';
  total: number;
  observacoes?: string;
  status: 'rascunho' | 'enviado' | 'assinado' | 'cancelado';
  criadoEm: Date;
  atualizadoEm: Date;
}

// Tipos para Pagamento
export interface Pagamento {
  id: string;
  orcamentoId?: string;
  contratoId?: string;
  parcela: number;
  valor: number;
  dataPagamento: Date;
  dataVencimento: Date;
  status: 'pendente' | 'pago' | 'atrasado';
}

// Tipos para Resposta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
