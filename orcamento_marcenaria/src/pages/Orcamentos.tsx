import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiSearch, FiEye } from 'react-icons/fi';
import { useAppStore } from '../stores/appStore';
import toast from 'react-hot-toast';
import { Orcamento } from '../types';
import { ModalOrcamento } from '../components/ModalOrcamento';
import { gerarPDFOrcamento } from '../utils/pdfGenerator';

export const Orcamentos: React.FC = () => {
  const { orcamentos, clientes, empresa, removerOrcamento, atualizarOrcamento } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [orcamentoEditando, setOrcamentoEditando] = useState<Orcamento | null>(null);

  const orcamentosFiltrados = orcamentos.filter((orcamento) =>
    orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoOrcamento = () => {
    setOrcamentoEditando(null);
    setShowModal(true);
  };

  const handleEditar = (orcamento: Orcamento) => {
    setOrcamentoEditando(orcamento);
    setShowModal(true);
  };

  const handleDeletar = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este orçamento?')) {
      removerOrcamento(id);
      toast.success('Orçamento deletado com sucesso');
    }
  };

  const handleExportarPDF = async (orcamento: Orcamento) => {
    try {
      const cliente = clientes.find((c) => c.id === orcamento.clienteId);
      if (!cliente || !empresa) {
        toast.error('Dados incompletos para gerar PDF');
        return;
      }
      await gerarPDFOrcamento(orcamento, empresa, cliente, empresa.logo);
      toast.success('PDF gerado com sucesso');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF');
    }
  };

  const handleSalvarOrcamento = (orcamento: Orcamento) => {
    if (orcamentoEditando) {
      atualizarOrcamento(orcamentoEditando.id, orcamento);
      toast.success('Orçamento atualizado com sucesso');
    } else {
      // Adicionar novo orçamento
      toast.success('Orçamento criado com sucesso');
    }
    setShowModal(false);
    setOrcamentoEditando(null);
  };

  const getClienteNome = (clienteId: string) => {
    return clientes.find((c) => c.id === clienteId)?.nome || 'Cliente desconhecido';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'rejeitado':
        return 'bg-red-100 text-red-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orçamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie propostas comerciais</p>
        </div>
        <button
          onClick={handleNovoOrcamento}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Novo Orçamento
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por número de proposta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabela de Orçamentos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Proposta
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Valor
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {orcamentosFiltrados.length > 0 ? (
                orcamentosFiltrados.map((orcamento) => (
                  <tr key={orcamento.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {orcamento.numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {getClienteNome(orcamento.clienteId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(orcamento.dataPropostas).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                      R$ {orcamento.total.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(orcamento.status)}`}>
                        {orcamento.status.charAt(0).toUpperCase() + orcamento.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditar(orcamento)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleExportarPDF(orcamento)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Exportar PDF"
                        >
                          <FiDownload className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletar(orcamento.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {orcamentos.length === 0
                      ? 'Nenhum orçamento criado'
                      : 'Nenhum orçamento encontrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalOrcamento
          orcamento={orcamentoEditando}
          onSave={handleSalvarOrcamento}
          onClose={() => {
            setShowModal(false);
            setOrcamentoEditando(null);
          }}
        />
      )}
    </div>
  );
};
