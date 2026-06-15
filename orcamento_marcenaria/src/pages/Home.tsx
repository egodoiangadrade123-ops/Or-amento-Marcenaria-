import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiFileText, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useAppStore } from '../stores/appStore';

export const Home: React.FC = () => {
  const { orcamentos, clientes, empresa } = useAppStore();

  const totalOrcamentos = orcamentos.length;
  const totalClientes = clientes.length;
  const totalValor = orcamentos.reduce((sum, o) => sum + o.total, 0);

  const orcamentosRecentes = orcamentos.slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo, {empresa?.nome || 'Usuário'}!
        </h1>
        <p className="text-blue-100">
          Gerencie seus orçamentos e contratos de forma profissional
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/orcamentos/novo"
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-600"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Novo Orçamento</h3>
            <p className="text-sm text-gray-600">Criar uma proposta comercial</p>
          </div>
          <FiPlus className="w-8 h-8 text-blue-600" />
        </Link>

        <Link
          to="/clientes/novo"
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-green-600"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Novo Cliente</h3>
            <p className="text-sm text-gray-600">Adicionar cliente à base de dados</p>
          </div>
          <FiPlus className="w-8 h-8 text-green-600" />
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Orçamentos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalOrcamentos}</p>
            </div>
            <FiFileText className="w-12 h-12 text-blue-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Clientes</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalClientes}</p>
            </div>
            <FiUsers className="w-12 h-12 text-green-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Valor Total em Propostas</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                R$ {(totalValor / 1000).toFixed(1)}k
              </p>
            </div>
            <FiDollarSign className="w-12 h-12 text-purple-100" />
          </div>
        </div>
      </div>

      {/* Recent Budgets */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Orçamentos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Nº Proposta
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
              </tr>
            </thead>
            <tbody>
              {orcamentosRecentes.length > 0 ? (
                orcamentosRecentes.map((orcamento) => (
                  <tr key={orcamento.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      {orcamento.numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {/* TODO: Buscar nome do cliente */}
                      Cliente
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        orcamento.status === 'aprovado'
                          ? 'bg-green-100 text-green-800'
                          : orcamento.status === 'rejeitado'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {orcamento.status.charAt(0).toUpperCase() + orcamento.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Nenhum orçamento criado ainda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
