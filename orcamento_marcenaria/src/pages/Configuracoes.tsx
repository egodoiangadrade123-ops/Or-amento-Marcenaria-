import React, { useState } from 'react';
import { FiSave, FiUpload } from 'react-icons/fi';
import { useAppStore } from '../stores/appStore';
import toast from 'react-hot-toast';
import { Empresa } from '../types';

export const Configuracoes: React.FC = () => {
  const { empresa, setEmpresa } = useAppStore();
  const [formData, setFormData] = useState<Partial<Empresa>>(
    empresa || {
      nome: '',
      cnpj: '',
      endereco: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      banco: '',
      agencia: '',
      conta: '',
      chavePixe: '',
      observacoesPadrao: '',
    }
  );

  const [logoPreview, setLogoPreview] = useState<string | undefined>(empresa?.logo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData((prev) => ({
          ...prev,
          logo: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.cnpj || !formData.email) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const novaEmpresa: Empresa = {
      id: empresa?.id || `emp_${Date.now()}`,
      nome: formData.nome,
      cnpj: formData.cnpj,
      endereco: formData.endereco || '',
      numero: formData.numero || '',
      complemento: formData.complemento,
      cidade: formData.cidade || '',
      estado: formData.estado || '',
      cep: formData.cep || '',
      telefone: formData.telefone || '',
      email: formData.email,
      logo: formData.logo,
      banco: formData.banco,
      agencia: formData.agencia,
      conta: formData.conta,
      chavePixe: formData.chavePixe,
      observacoesPadrao: formData.observacoesPadrao,
      criadoEm: empresa?.criadoEm || new Date(),
      atualizadoEm: new Date(),
    };

    setEmpresa(novaEmpresa);
    toast.success('Dados da empresa salvos com sucesso!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Configurações da Empresa</h2>
          <p className="text-gray-600 text-sm mt-1">
            Gerencie os dados da sua empresa que aparecerão nos orçamentos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Logo da Empresa
            </label>
            <div className="flex items-center space-x-4">
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-24 w-24 object-contain border border-gray-200 rounded-lg p-2"
                />
              )}
              <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <FiUpload className="w-5 h-5 mr-2" />
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Marcenaria XYZ"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CNPJ *
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                className="input-field"
                placeholder="00.000.000/0000-00"
              />
            </div>
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

          {/* Contato */}
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
                placeholder="contato@empresa.com"
              />
            </div>
          </div>

          {/* Dados Bancários */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-800">Dados Bancários</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banco
                </label>
                <input
                  type="text"
                  name="banco"
                  value={formData.banco}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Ex: Banco do Brasil"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agência
                </label>
                <input
                  type="text"
                  name="agencia"
                  value={formData.agencia}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0001"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Conta
                </label>
                <input
                  type="text"
                  name="conta"
                  value={formData.conta}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="123456-7"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chave PIX
                </label>
                <input
                  type="text"
                  name="chavePixe"
                  value={formData.chavePixe}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="CPF, email ou chave aleatória"
                />
              </div>
            </div>
          </div>

          {/* Observações Padrão */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações Padrão
            </label>
            <textarea
              name="observacoesPadrao"
              value={formData.observacoesPadrao}
              onChange={handleChange}
              rows={4}
              className="input-field"
              placeholder="Observações que aparecerão em todos os orçamentos por padrão"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FiSave className="w-5 h-5 mr-2" />
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
