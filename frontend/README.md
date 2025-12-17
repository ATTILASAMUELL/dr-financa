# Frontend - Dr. Finanças

Interface web para gestão de solicitações de Notas Fiscais com Clean Architecture.

## Tecnologias

- Vue.js 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Axios

## Estrutura Clean Architecture

```
src/
├── domain/
│   ├── entities/          # NotaFiscal
│   ├── repositories/      # INotaFiscalRepository
│   └── usecases/          # CriarSolicitacaoUseCase, ListarSolicitacoesUseCase, etc.
├── infrastructure/
│   └── http/             # NotaFiscalHttpRepository
└── presentation/
    ├── components/       # AppHeader
    ├── views/           # HomeView, CriarSolicitacaoView, etc.
    ├── store/           # notaFiscalStore (Pinia)
    └── router/          # index
```

## Instalação

```bash
npm install
```

## Executar

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Páginas

- **/** - Home com navegação
- **/criar** - Criar nova solicitação
- **/listar** - Listar todas as solicitações
- **/solicitacao/:id** - Detalhes e emissão da nota

## Configuração

Crie um arquivo `.env`:

```
VITE_API_URL=http://localhost:3002/api
```

## Status Visual

- **PENDENTE_EMISSAO** - Laranja
- **EMITIDA** - Verde
- **CANCELADA** - Vermelho

