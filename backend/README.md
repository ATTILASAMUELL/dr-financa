# Backend - Dr. Finanças

API de gestão de solicitações de Notas Fiscais com Clean Architecture.

## Tecnologias

- Node.js v20+
- TypeScript
- Express
- Jest
- Axios

## Estrutura Clean Architecture

```
src/
├── domain/
│   ├── entities/          # NotaFiscal
│   ├── repositories/      # INotaFiscalRepository
│   └── usecases/          # CriarSolicitacaoNotaFiscal, ListarSolicitacoes, etc.
├── application/
│   └── services/          # IEmissaoService
├── infrastructure/
│   ├── http/             # EmissaoHttpService
│   └── repositories/     # InMemoryNotaFiscalRepository
└── interfaces/
    ├── controllers/      # NotaFiscalController
    └── routes/          # notaFiscalRoutes
```

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```env
PORT=3002
NODE_ENV=development

EMISSAO_API_URL=https://api.drfinancas.com/testes/notas-fiscais
EMISSAO_AUTH_TOKEN=87451e7c-48bc-48d1-a038-c16783dd404c
```

### Variáveis Disponíveis

- `PORT` - Porta do servidor (padrão: 3002)
- `NODE_ENV` - Ambiente de execução (development/production)
- `EMISSAO_API_URL` - URL da API externa de emissão de notas fiscais
- `EMISSAO_AUTH_TOKEN` - Token de autenticação para a API externa

## Executar

```bash
npm run dev
```

## Testes

### Executar Testes

```bash
npm test
```

### Suíte de Testes

O projeto possui uma suíte completa de testes unitários cobrindo todos os casos de uso:

#### CriarSolicitacaoNotaFiscal.spec.ts
- ✅ Testa criação de solicitação com status PENDENTE_EMISSAO
- ✅ Valida geração de ID, datas de criação e atualização

#### ListarSolicitacoes.spec.ts
- ✅ Testa listagem de todas as solicitações
- ✅ Valida retorno correto dos dados

#### BuscarSolicitacao.spec.ts
- ✅ Testa busca de solicitação por ID
- ✅ Testa retorno null quando solicitação não existe

#### EmitirNotaFiscal.spec.ts
- ✅ Testa emissão de nota fiscal com sucesso
- ✅ Valida atualização de status para EMITIDA
- ✅ Valida salvamento de numeroNF e dataEmissao
- ✅ Testa erro quando solicitação não existe
- ✅ Testa erro quando solicitação não está pendente

### Tecnologias de Teste

- **Jest** - Framework de testes
- **ts-jest** - Suporte TypeScript para Jest
- **Mock Services** - Serviços mockados para testes isolados

## Build

```bash
npm run build
npm start
```

## Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3002/api-docs
```

## Endpoints

### POST /api/solicitacoes
Criar solicitação de Nota Fiscal

**Body:**
```json
{
  "cnpjTomador": "12345678901234",
  "municipioPrestacao": "São Paulo",
  "estadoPrestacao": "SP",
  "valorServico": 1000.50,
  "dataDesejadaEmissao": "2024-12-31T00:00:00.000Z",
  "descricaoServico": "Serviço de consultoria"
}
```

### GET /api/solicitacoes
Listar todas as solicitações

### GET /api/solicitacoes/:id
Buscar solicitação por ID

### POST /api/solicitacoes/:id/emitir
Emitir Nota Fiscal

## Status

- PENDENTE_EMISSAO
- EMITIDA
- CANCELADA

