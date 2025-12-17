import { Router } from 'express';
import { NotaFiscalController } from '../controllers/NotaFiscalController';

export function createNotaFiscalRoutes(controller: NotaFiscalController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/solicitacoes:
   *   post:
   *     summary: Criar uma nova solicitação de Nota Fiscal
   *     tags: [Solicitações]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CriarSolicitacaoRequest'
   *     responses:
   *       201:
   *         description: Solicitação criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotaFiscal'
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post('/solicitacoes', controller.criar);

  /**
   * @swagger
   * /api/solicitacoes:
   *   get:
   *     summary: Listar todas as solicitações de Notas Fiscais
   *     tags: [Solicitações]
   *     responses:
   *       200:
   *         description: Lista de solicitações
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/NotaFiscal'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/solicitacoes', controller.listar);

  /**
   * @swagger
   * /api/solicitacoes/{id}:
   *   get:
   *     summary: Buscar uma solicitação por ID
   *     tags: [Solicitações]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da solicitação
   *     responses:
   *       200:
   *         description: Solicitação encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotaFiscal'
   *       404:
   *         description: Solicitação não encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/solicitacoes/:id', controller.buscar);

  /**
   * @swagger
   * /api/solicitacoes/{id}/emitir:
   *   post:
   *     summary: Emitir uma Nota Fiscal
   *     tags: [Solicitações]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da solicitação
   *     responses:
   *       200:
   *         description: Nota Fiscal emitida com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotaFiscal'
   *       400:
   *         description: Erro na emissão (solicitação não encontrada, não está pendente ou erro na API externa)
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post('/solicitacoes/:id/emitir', controller.emitir);

  return router;
}

