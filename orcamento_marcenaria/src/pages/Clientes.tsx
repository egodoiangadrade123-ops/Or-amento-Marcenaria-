import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { useAppStore } from '../stores/appStore';
import toast from 'react-hot-toast';
import { Cliente } from '../types';
import { ModalCliente } from '../components/ModalCliente';

export const Clientes: React.FC = () => {
  const { clientes, adicionarCliente, removerCliente } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpfCnpj.includes(searchTerm)
  );

  const handleNovoCliente = () => {
    setClienteEditando(null);
    setShowModal(true);
  };

  const handleEditar = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setShowModal(true);
  };

  const handleDeletar = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      removerCliente(id);
      toast.success('Cliente deletado com sucesso');
    }
  };

  const handleSalvarCliente = (cliente: Cliente) => {
    adicionarCliente(cliente);
    toast.success(
      clienteEditando ? 'Cliente atualizado com sucesso' : 'Cliente adicionado com sucesso'
    );
    setShowModal(false);
    setClienteEditando(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie a base de clientes</p>
        </div>
        <button
          onClick={handleNovoCliente}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabela de Clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  CPF/CNPJ
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {cliente.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.cpfCnpj}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.telefone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditar(cliente)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletar(cliente.id)}
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
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {clientes.length === 0
                      ? 'Nenhum cliente cadastrado'
                      : 'Nenhum cliente encontrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalCliente
          cliente={clienteEditando}
          onSave={handleSalvarCliente}
          onClose={() => {
            setShowModal(false);
            setClienteEditando(null);
          }}
        />
      )}
    </div>
  );
};
