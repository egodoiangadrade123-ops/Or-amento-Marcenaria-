import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Contrato, ItemOrcamento } from '../types';
import { useAppStore } from '../stores/appStore';
import { calcularTotal, calcularSubtotal } from '../utils/calculos';

interface ModalContratoProps {
  contrato: Contrato | null;
  onSave: (contrato: Contrato) => void;
  onClose: () => void;
}

export const ModalContrato: React.FC<ModalContratoProps> = ({ contrato, onSave, onClose }) => {
  const { clientes } = useAppStore();

  const [clienteId, setClienteId] = useState(contrato?.clienteId || '');
  const [dataContrato, setDataContrato] = useState(
    contrato?.dataContrato ? new Date(contrato.dataContrato).toISOString().split('T')[0] : ''
  );
  const [prazoDentrega, setPrazoDentrega] = useState(contrato?.prazoDentrega || 30);
  const [garantiaLegal, setGarantiaLegal] = useState(contrato?.garantiaLegal || 30);
  const [garantiaContratual, setGarantiaContratual] = useState(contrato?.garantiaContratual || 90);
  const [itens, setItens] = useState<ItemOrcamento[]>(contrato?.itens || []);
  const [desconto, setDesconto] = useState(contrato?.desconto || 0);
  const [tipoDesconto, setTipoDesconto] = useState<'percentual' | 'fixo'>(
    contrato?.tipoDesconto || 'percentual'
  );
  const [acrescimo, setAcrescimo] = useState(contrato?.acrescimo || 0);
  const [tipoAcrescimo, setTipoAcrescimo] = useState<'percentual' | 'fixo'>(
    contrato?.tipoAcrescimo || 'percentual'
  );
  const [observacoes, setObservacoes] = useState(contrato?.observacoes || '');
  const [novoItem, setNovoItem] = useState<Partial<ItemOrcamento>>({
    descricao: '',
    valor: 0,
    quantidade: 1,
  });

  const subtotal = calcularSubtotal(itens);
  const total = calcularTotal(subtotal, desconto, tipoDesconto, acrescimo, tipoAcrescimo);
  const garantiaTotal = garantiaLegal + garantiaContratual;

  const handleAdicionarItem = () => {
    if (!novoItem.descricao || !novoItem.valor) {
      alert('Preencha descrição e valor');
      return;
    }

    const item: ItemOrcamento = {
      id: `item_${Date.now()}`,
      descricao: novoItem.descricao,
      valor: novoItem.valor,
      quantidade: novoItem.quantidade || 1,
      total: (novoItem.valor || 0) * (novoItem.quantidade || 1),
    };

    setItens([...itens, item]);
    setNovoItem({ descricao: '', valor: 0, quantidade: 1 });
  };

  const handleRemoverItem = (id: string) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteId || itens.length === 0) {
      alert('Selecione um cliente e adicione itens');
      return;
    }

    const novoContrato: Contrato = {
      id: contrato?.id || `con_${Date.now()}`,
      numero: contrato?.numero || `CON-${Date.now()}`,
      clienteId,
      empresaId: 'default',
      dataContrato: new Date(dataContrato),
      prazoDentrega,
      garantiaLegal,
      garantiaContratual,
      garantiaTotal,
      responsabilidadesContratante: 'Responsabilidades do cliente',
      responsabilidadesContratada: 'Responsabilidades da empresa',
      itens,
      subtotal,
      desconto,
      tipoDesconto,
      acrescimo,
      tipoAcrescimo,
      total,
      observacoes,
      status: contrato?.status || 'rascunho',
      criadoEm: contrato?.criadoEm || new Date(),
      atualizadoEm: new Date(),
    };

    onSave(novoContrato);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {contrato ? 'Editar Contrato' : 'Novo Contrato'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cliente e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cliente *
              </label>
              <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                className="input-field"
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data do Contrato
              </label>
              <input
                type="date"
                value={dataContrato}
                onChange={(e) => setDataContrato(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Prazos e Garantias */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-800">Prazos e Garantias</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prazo de Entrega (dias)
                </label>
                <input
                  type="number"
                  value={prazoDentrega}
                  onChange={(e) => setPrazoDentrega(parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Garantia Legal (dias)
                </label>
                <input
                  type="number"
                  value={garantiaLegal}
                  onChange={(e) => setGarantiaLegal(parseInt(e.target.value))}
                  className="input-field"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Garantia Contratual (dias)
                </label>
                <input
                  type="number"
                  value={garantiaContratual}
                  onChange={(e) => setGarantiaContratual(parseInt(e.target.value))}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Garantia Total: <span className="font-semibold">{garantiaTotal} dias</span>
            </div>
          </div>

          {/* Itens */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Itens do Contrato</h3>

            {/* Adicionar Item */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Descrição
                  </label>
                  <input
                    type="text"
                    value={novoItem.descricao}
                    onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                    className="input-field"
                    placeholder="Descrição do serviço"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Valor Unitário
                  </label>
                  <input
                    type="number"
                    value={novoItem.valor}
                    onChange={(e) => setNovoItem({ ...novoItem, valor: parseFloat(e.target.value) })}
                    className="input-field"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({ ...novoItem, quantidade: parseFloat(e.target.value) })}
                    className="input-field"
                    placeholder="1"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAdicionarItem}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                Adicionar Item
              </button>
            </div>

            {/* Lista de Itens */}
            {itens.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="px-4 py-2 text-left">Descrição</th>
                      <th className="px-4 py-2 text-right">Valor Unit.</th>
                      <th className="px-4 py-2 text-right">Qtd.</th>
                      <th className="px-4 py-2 text-right">Total</th>
                      <th className="px-4 py-2 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="px-4 py-2">{item.descricao}</td>
                        <td className="px-4 py-2 text-right">
                          R$ {item.valor.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-2 text-right">{item.quantidade}</td>
                        <td className="px-4 py-2 text-right font-semibold">
                          R$ {item.total.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoverItem(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cálculos */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-semibold">
                R$ {subtotal.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Desconto
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={desconto}
                    onChange={(e) => setDesconto(parseFloat(e.target.value))}
                    className="input-field flex-1"
                    placeholder="0"
                    step="0.01"
                  />
                  <select
                    value={tipoDesconto}
                    onChange={(e) => setTipoDesconto(e.target.value as 'percentual' | 'fixo')}
                    className="input-field w-24"
                  >
                    <option value="percentual">%</option>
                    <option value="fixo">R$</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Acréscimo
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={acrescimo}
                    onChange={(e) => setAcrescimo(parseFloat(e.target.value))}
                    className="input-field flex-1"
                    placeholder="0"
                    step="0.01"
                  />
                  <select
                    value={tipoAcrescimo}
                    onChange={(e) => setTipoAcrescimo(e.target.value as 'percentual' | 'fixo')}
                    className="input-field w-24"
                  >
                    <option value="percentual">%</option>
                    <option value="fixo">R$</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
              <span>Total:</span>
              <span className="text-blue-600">
                R$ {total.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              className="input-field"
              placeholder="Observações adicionais"
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
              {contrato ? 'Atualizar' : 'Criar'} Contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
