import { create } from 'zustand';
import { Empresa, Cliente, Servico, Orcamento, Contrato } from '../types';

interface AppState {
  // Empresa
  empresa: Empresa | null;
  setEmpresa: (empresa: Empresa) => void;
  
  // Clientes
  clientes: Cliente[];
  setClientes: (clientes: Cliente[]) => void;
  adicionarCliente: (cliente: Cliente) => void;
  removerCliente: (id: string) => void;
  
  // Serviços
  servicos: Servico[];
  setServicos: (servicos: Servico[]) => void;
  adicionarServico: (servico: Servico) => void;
  removerServico: (id: string) => void;
  
  // Orçamentos
  orcamentos: Orcamento[];
  setOrcamentos: (orcamentos: Orcamento[]) => void;
  adicionarOrcamento: (orcamento: Orcamento) => void;
  atualizarOrcamento: (id: string, orcamento: Orcamento) => void;
  removerOrcamento: (id: string) => void;
  
  // Contratos
  contratos: Contrato[];
  setContratos: (contratos: Contrato[]) => void;
  adicionarContrato: (contrato: Contrato) => void;
  atualizarContrato: (id: string, contrato: Contrato) => void;
  removerContrato: (id: string) => void;
  
  // UI State
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
  erro: string | null;
  setErro: (erro: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Empresa
  empresa: null,
  setEmpresa: (empresa) => set({ empresa }),
  
  // Clientes
  clientes: [],
  setClientes: (clientes) => set({ clientes }),
  adicionarCliente: (cliente) => set((state) => ({
    clientes: [...state.clientes, cliente],
  })),
  removerCliente: (id) => set((state) => ({
    clientes: state.clientes.filter((c) => c.id !== id),
  })),
  
  // Serviços
  servicos: [],
  setServicos: (servicos) => set({ servicos }),
  adicionarServico: (servico) => set((state) => ({
    servicos: [...state.servicos, servico],
  })),
  removerServico: (id) => set((state) => ({
    servicos: state.servicos.filter((s) => s.id !== id),
  })),
  
  // Orçamentos
  orcamentos: [],
  setOrcamentos: (orcamentos) => set({ orcamentos }),
  adicionarOrcamento: (orcamento) => set((state) => ({
    orcamentos: [...state.orcamentos, orcamento],
  })),
  atualizarOrcamento: (id, orcamento) => set((state) => ({
    orcamentos: state.orcamentos.map((o) => (o.id === id ? orcamento : o)),
  })),
  removerOrcamento: (id) => set((state) => ({
    orcamentos: state.orcamentos.filter((o) => o.id !== id),
  })),
  
  // Contratos
  contratos: [],
  setContratos: (contratos) => set({ contratos }),
  adicionarContrato: (contrato) => set((state) => ({
    contratos: [...state.contratos, contrato],
  })),
  atualizarContrato: (id, contrato) => set((state) => ({
    contratos: state.contratos.map((c) => (c.id === id ? contrato : c)),
  })),
  removerContrato: (id) => set((state) => ({
    contratos: state.contratos.filter((c) => c.id !== id),
  })),
  
  // UI State
  carregando: false,
  setCarregando: (carregando) => set({ carregando }),
  erro: null,
  setErro: (erro) => set({ erro }),
}));
