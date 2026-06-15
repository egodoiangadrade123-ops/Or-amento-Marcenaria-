# Gerador de Orçamentos e Contratos - Marcenaria

Um aplicativo web profissional para gerar propostas de orçamento e contratos de prestação de serviço em PDF, com design elegante em tons de cinza.

## Funcionalidades

✅ **Cadastro de Empresa** - Dados completos, logo, dados bancários
✅ **Cadastro de Clientes** - CPF/CNPJ, endereço, contatos
✅ **Cadastro de Serviços** - Descrição e valores
✅ **Geração de Orçamentos** - Interface intuitiva com cálculos automáticos
✅ **Desconto e Acréscimo** - Percentual ou valor fixo com cálculos dinâmicos
✅ **Formas de Pagamento** - À vista ou parcelado
✅ **Exportação em PDF** - Layout profissional em tons de cinza
✅ **Dashboard** - Estatísticas e orçamentos recentes
✅ **Gerenciamento** - Editar, deletar e visualizar orçamentos

## Tecnologias

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Roteamento**: React Router v6
- **Estado**: Zustand
- **PDF**: jsPDF + html2canvas
- **Build**: Vite
- **Ícones**: React Icons

## Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Passos

```bash
# 1. Clonar o repositório
git clone <seu-repositorio>
cd orcamento_marcenaria

# 2. Instalar dependências
pnpm install

# 3. Iniciar servidor de desenvolvimento
pnpm run dev

# 4. Acessar a aplicação
# Abra http://localhost:3000 no navegador
```

## Build para Produção

```bash
pnpm run build
pnpm run preview
```

## Estrutura do Projeto

```
src/
├── components/        # Componentes React reutilizáveis
│   └── Layout.tsx    # Layout principal com sidebar
├── pages/            # Páginas da aplicação
│   └── Home.tsx      # Dashboard
├── stores/           # Gerenciamento de estado (Zustand)
│   └── appStore.ts   # Store global
├── types/            # Tipos TypeScript
│   └── index.ts      # Definições de tipos
├── utils/            # Funções utilitárias
│   ├── calculos.ts   # Cálculos de orçamento
│   └── pdfGenerator.ts # Geração de PDF
├── styles/           # Estilos CSS
│   └── globals.css   # Estilos globais
├── App.tsx           # Componente raiz
└── main.tsx          # Ponto de entrada
```

## Guia de Uso

### 1. Configurar Empresa

Acesse **Configurações** para adicionar:
- Nome da empresa
- CNPJ
- Endereço completo
- Telefone e email
- Logo (upload de imagem)
- Dados bancários (banco, agência, conta, chave PIX)
- Observações padrão

### 2. Cadastrar Clientes

Vá para **Clientes** e clique em **Novo Cliente**:
- Nome
- CPF/CNPJ
- RG/IE
- Endereço completo
- Telefone e email
- Pessoa de contato

### 3. Cadastrar Serviços

Acesse **Configurações > Serviços**:
- Nome do serviço
- Descrição detalhada
- Valor unitário
- Categoria (opcional)

### 4. Criar Orçamento

Clique em **Novo Orçamento**:
1. Selecione o cliente
2. Adicione itens de serviço
3. Configure desconto/acréscimo
4. Escolha forma de pagamento
5. Adicione observações
6. Gere PDF para impressão

### 5. Exportar PDF

O PDF será gerado com:
- Logo e dados da empresa
- Informações do cliente
- Tabela de itens com valores
- Totalizadores (subtotal, desconto, acréscimo, total)
- Formas de pagamento
- Dados bancários
- Observações
- Layout profissional em tons de cinza

## Tipos de Dados

### Empresa
```typescript
{
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
}
```

### Cliente
```typescript
{
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
}
```

### Orçamento
```typescript
{
  id: string;
  numero: string;
  clienteId: string;
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
}
```

## Funcionalidades Futuras

- [ ] Autenticação de usuários
- [ ] Sincronização em nuvem
- [ ] Envio de orçamento por email
- [ ] Assinatura digital
- [ ] Integração com WhatsApp
- [ ] Relatórios e análises
- [ ] Histórico de alterações
- [ ] Múltiplos usuários

## Customização

### Cores

Edite `tailwind.config.js` para alterar as cores:

```javascript
colors: {
  'gray-custom': {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... outras cores
  },
}
```

### Estilos Globais

Modifique `src/styles/globals.css` para ajustar estilos gerais.

### Componentes

Crie novos componentes em `src/components/` e importe onde necessário.

## Troubleshooting

### Erro: "Cannot find module"
```bash
pnpm install
```

### Porta 3000 já em uso
```bash
pnpm run dev -- --port 3001
```

### Erro ao gerar PDF
Verifique se a imagem do logo está acessível e em formato suportado (PNG, JPG).

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Suporte

Para suporte, abra uma issue no repositório ou entre em contato.

## Autor

Desenvolvido com ❤️ para marcenarias

---

**Versão**: 1.0.0
**Última atualização**: Junho de 2026
