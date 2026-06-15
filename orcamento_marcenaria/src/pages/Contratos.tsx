import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiSearch } from 'react-icons/fi';
import { useAppStore } from '../stores/appStore';
import toast from 'react-hot-toast';
import { Contrato } from '../types';
import { ModalContrato } from '../components/ModalContrato';

export const Contratos: React.FC = () => {
  const { contratos, clientes, removerContrato, atualizarContrato } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contratoEditando, setContratoEditando] = useState<Contrato | null>(null);

  const contratosFiltrados = contratos.filter((contrato) =>
    contrato.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoContrato = () => {
    setContratoEditando(null);
    setShowModal(true);
  };

  const handleEditar = (contrato: Contrato) => {
    setContratoEditando(contrato);
    setShowModal(true);
  };

  const handleDeletar = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este contrato?')) {
      removerContrato(id);
      toast.success('Contrato deletado com sucesso');
    }
  };

  const handleSalvarContrato = (contrato: Contrato) => {
    if (contratoEditando) {
      atualizarContrato(contratoEditando.id, contrato);
      toast.success('Contrato atualizado com sucesso');
    } else {
      toast.success('Contrato criado com sucesso');
    }
    setShowModal(false);
    setContratoEditando(null);
  };

  const getClienteNome = (clienteId: string) => {
    return clientes.find((c) => c.id === clienteId)?.nome || 'Cliente desconhecido';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assinado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
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
          <h1 className="text-3xl font-bold text-gray-800">Contratos</h1>
          <p className="text-gray-600 mt-1">Gerencie contratos de prestação de serviço</p>
        </div>
        <button
          onClick={handleNovoContrato}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Novo Contrato
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por número de contrato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabela de Contratos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Contrato
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
              {contratosFiltrados.length > 0 ? (
                contratosFiltrados.map((contrato) => (
                  <tr key={contrato.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {contrato.numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {getClienteNome(contrato.clienteId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(contrato.dataContrato).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 text-right">
                      R$ {contrato.total.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contrato.status)}`}>
                        {contrato.status.charAt(0).toUpperCase() + contrato.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditar(contrato)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Exportar PDF"
                        >
                          <FiDownload className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletar(contrato.id)}
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
                    {contratos.length === 0
                      ? 'Nenhum contrato criado'
                      : 'Nenhum contrato encontrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalContrato
          contrato={contratoEditando}
          onSave={handleSalvarContrato}
          onClose={() => {
            setShowModal(false);
            setContratoEditando(null);
          }}
        />
      )}
    </div>
  );
};
