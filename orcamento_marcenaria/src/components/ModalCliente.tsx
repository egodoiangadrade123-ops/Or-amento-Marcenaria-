import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Cliente } from '../types';

interface ModalClienteProps {
  cliente: Cliente | null;
  onSave: (cliente: Cliente) => void;
  onClose: () => void;
}

export const ModalCliente: React.FC<ModalClienteProps> = ({ cliente, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>(
    cliente || {
      nome: '',
      cpfCnpj: '',
      rgIe: '',
      endereco: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      contatoPessoa: '',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.cpfCnpj || !formData.email) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const novoCliente: Cliente = {
      id: cliente?.id || `cli_${Date.now()}`,
      nome: formData.nome,
      cpfCnpj: formData.cpfCnpj,
      rgIe: formData.rgIe,
      endereco: formData.endereco || '',
      numero: formData.numero || '',
      complemento: formData.complemento,
      cidade: formData.cidade || '',
      estado: formData.estado || '',
      cep: formData.cep || '',
      telefone: formData.telefone || '',
      email: formData.email,
      contatoPessoa: formData.contatoPessoa,
      empresaId: cliente?.empresaId || 'default',
      criadoEm: cliente?.criadoEm || new Date(),
      atualizadoEm: new Date(),
    };

    onSave(novoCliente);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {cliente ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome e CPF/CNPJ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input-field"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF/CNPJ *
              </label>
              <input
                type="text"
                name="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={handleChange}
                className="input-field"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
              />
            </div>
          </div>

          {/* RG/IE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              RG/IE
            </label>
            <input
              type="text"
              name="rgIe"
              value={formData.rgIe}
              onChange={handleChange}
              className="input-field"
              placeholder="RG ou Inscrição Estadual"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="input-field"
              placeholder="Rua, avenida, etc"
            />
          </div>

          {/* Número, Complemento, CEP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número
              </label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="input-field"
                placeholder="123"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Complemento
              </label>
              <input
                type="text"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                className="input-field"
                placeholder="Apto, sala, etc"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="input-field"
                placeholder="00000-000"
              />
            </div>
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="input-field"
                placeholder="São Paulo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="input-field"
                placeholder="SP"
                maxLength={2}
              />
            </div>
          </div>

          {/* Telefone e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="input-field"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="cliente@email.com"
              />
            </div>
          </div>

          {/* Pessoa de Contato */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pessoa de Contato
            </label>
            <input
              type="text"
              name="contatoPessoa"
              value={formData.contatoPessoa}
              onChange={handleChange}
              className="input-field"
              placeholder="Nome da pessoa responsável"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {cliente ? 'Atualizar' : 'Criar'} Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
