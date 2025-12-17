# Dr. Finanças - Sistema de Gestão de Notas Fiscais

Sistema completo para gestão de solicitações de Notas Fiscais com Clean Architecture.

## Estrutura do Projeto

```
dr-financas/
├── backend/          # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── interfaces/
│   └── Dockerfile
├── frontend/         # Vue.js 3 + TypeScript
│   ├── src/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── Dockerfile
└── docker-compose.yml
```

## Backend - Clean Architecture

### Camadas

- **Domain**: Entidades, casos de uso e interfaces de repositórios
- **Application**: Serviços da aplicação
- **Infrastructure**: Implementação de repositórios e serviços HTTP
- **Interfaces**: Controllers e rotas

### API Endpoints

- `POST /api/solicitacoes` - Criar solicitação
- `GET /api/solicitacoes` - Listar todas as solicitações
- `GET /api/solicitacoes/:id` - Buscar solicitação
- `POST /api/solicitacoes/:id/emitir` - Emitir nota fiscal

## Frontend - Clean Architecture

### Camadas

- **Domain**: Entidades, casos de uso e interfaces
- **Infrastructure**: Implementação HTTP dos repositórios
- **Presentation**: Views, componentes, store e router

## Como Executar

### Com Docker

```bash
docker-compose up --build
```

- Backend: http://localhost:3002
- Frontend: http://localhost:8080

**Importante:** Antes de executar, crie um arquivo `.env` na raiz do projeto:

```env
EMISSAO_API_URL=https://api.drfinancas.com/testes/notas-fiscais
EMISSAO_AUTH_TOKEN=seu_token_aqui
```

### Sem Docker

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Testes

### Backend

```bash
cd backend
npm test
```

## Tecnologias

### Backend
- Node.js v20+
- TypeScript
- Express
- Axios
- Jest

### Frontend
- Vue.js 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Axios

## Status de Nota Fiscal

- `PENDENTE_EMISSAO`: Aguardando emissão
- `EMITIDA`: Nota fiscal emitida com sucesso
- `CANCELADA`: Nota fiscal cancelada

