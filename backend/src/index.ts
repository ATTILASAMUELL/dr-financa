import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './interfaces/swagger/swagger.config';
import { InMemoryNotaFiscalRepository } from './infrastructure/repositories/InMemoryNotaFiscalRepository';
import { EmissaoHttpService } from './infrastructure/http/EmissaoHttpService';
import { CriarSolicitacaoNotaFiscal } from './domain/usecases/CriarSolicitacaoNotaFiscal';
import { ListarSolicitacoes } from './domain/usecases/ListarSolicitacoes';
import { BuscarSolicitacao } from './domain/usecases/BuscarSolicitacao';
import { EmitirNotaFiscal } from './domain/usecases/EmitirNotaFiscal';
import { NotaFiscalController } from './interfaces/controllers/NotaFiscalController';
import { createNotaFiscalRoutes } from './interfaces/routes/notaFiscalRoutes';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const repository = new InMemoryNotaFiscalRepository();
const emissaoService = new EmissaoHttpService();

const criarSolicitacao = new CriarSolicitacaoNotaFiscal(repository);
const listarSolicitacoes = new ListarSolicitacoes(repository);
const buscarSolicitacao = new BuscarSolicitacao(repository);
const emitirNotaFiscal = new EmitirNotaFiscal(repository, emissaoService);

const controller = new NotaFiscalController(
  criarSolicitacao,
  listarSolicitacoes,
  buscarSolicitacao,
  emitirNotaFiscal
);

app.use('/api', createNotaFiscalRoutes(controller));

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
});

