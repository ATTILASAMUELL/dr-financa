import { Request, Response } from 'express';
import { CriarSolicitacaoNotaFiscal } from '../../domain/usecases/CriarSolicitacaoNotaFiscal';
import { ListarSolicitacoes } from '../../domain/usecases/ListarSolicitacoes';
import { BuscarSolicitacao } from '../../domain/usecases/BuscarSolicitacao';
import { EmitirNotaFiscal } from '../../domain/usecases/EmitirNotaFiscal';
import { AppError } from '../../application/errors/AppError';

export class NotaFiscalController {
  constructor(
    private criarSolicitacao: CriarSolicitacaoNotaFiscal,
    private listarSolicitacoes: ListarSolicitacoes,
    private buscarSolicitacao: BuscarSolicitacao,
    private emitirNotaFiscal: EmitirNotaFiscal
  ) {}

  private handleError(error: unknown, res: Response, defaultStatus: number = 500): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        error: error.message,
        code: error.code
      });
      return;
    }

    const message = error instanceof Error ? error.message : 'Erro interno do servidor';
    res.status(defaultStatus).json({
      error: message,
      code: 'INTERNAL_ERROR'
    });
  }

  criar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cnpjTomador, municipioPrestacao, estadoPrestacao, valorServico, dataDesejadaEmissao, descricaoServico } = req.body;

      if (!cnpjTomador || !municipioPrestacao || !estadoPrestacao || !valorServico || !dataDesejadaEmissao || !descricaoServico) {
        res.status(400).json({
          error: 'Todos os campos são obrigatórios: cnpjTomador, municipioPrestacao, estadoPrestacao, valorServico, dataDesejadaEmissao, descricaoServico',
          code: 'VALIDATION_ERROR'
        });
        return;
      }

      if (typeof valorServico !== 'number' || valorServico <= 0) {
        res.status(400).json({
          error: 'O valor do serviço deve ser um número maior que zero',
          code: 'VALIDATION_ERROR'
        });
        return;
      }

      const notaFiscal = await this.criarSolicitacao.execute(req.body);
      res.status(201).json(notaFiscal);
    } catch (error) {
      this.handleError(error, res, 400);
    }
  };

  listar = async (req: Request, res: Response): Promise<void> => {
    try {
      const notasFiscais = await this.listarSolicitacoes.execute();
      res.status(200).json(notasFiscais);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  buscar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: 'O ID da solicitação é obrigatório',
          code: 'VALIDATION_ERROR'
        });
        return;
      }

      const notaFiscal = await this.buscarSolicitacao.execute(id);
      
      if (!notaFiscal) {
        res.status(404).json({
          error: 'Solicitação não encontrada',
          code: 'NOT_FOUND'
        });
        return;
      }

      res.status(200).json(notaFiscal);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  emitir = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: 'O ID da solicitação é obrigatório',
          code: 'VALIDATION_ERROR'
        });
        return;
      }

      const notaFiscal = await this.emitirNotaFiscal.execute(id);
      res.status(200).json(notaFiscal);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}

