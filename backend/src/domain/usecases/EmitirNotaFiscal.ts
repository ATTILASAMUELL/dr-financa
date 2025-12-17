import { NotaFiscal, StatusNotaFiscal } from '../entities/NotaFiscal';
import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';
import { IEmissaoService } from '../../application/services/IEmissaoService';
import { NotFoundError, BusinessError } from '../../application/errors/AppError';

export class EmitirNotaFiscal {
  constructor(
    private repository: INotaFiscalRepository,
    private emissaoService: IEmissaoService
  ) {}

  async execute(id: string): Promise<NotaFiscal> {
    const solicitacao = await this.repository.findById(id);
    
    if (!solicitacao) {
      throw new NotFoundError('Solicitação não encontrada. Verifique o ID informado.');
    }

    if (solicitacao.status === StatusNotaFiscal.EMITIDA) {
      throw new BusinessError('Esta nota fiscal já foi emitida anteriormente.');
    }

    if (solicitacao.status === StatusNotaFiscal.CANCELADA) {
      throw new BusinessError('Esta solicitação foi cancelada e não pode ser emitida.');
    }

    if (solicitacao.status !== StatusNotaFiscal.PENDENTE_EMISSAO) {
      throw new BusinessError('Solicitação não está disponível para emissão.');
    }

    const resultado = await this.emissaoService.emitir({
      cnpjTomador: solicitacao.cnpjTomador,
      municipioPrestacao: solicitacao.municipioPrestacao,
      estadoPrestacao: solicitacao.estadoPrestacao,
      valorServico: solicitacao.valorServico,
      dataDesejadaEmissao: solicitacao.dataDesejadaEmissao,
      descricaoServico: solicitacao.descricaoServico
    });

    const atualizada = await this.repository.update(id, {
      status: StatusNotaFiscal.EMITIDA,
      numeroNF: resultado.numeroNF,
      dataEmissao: resultado.dataEmissao,
      dataAtualizacao: new Date().toISOString()
    });

    if (!atualizada) {
      throw new BusinessError('Erro ao salvar a nota fiscal emitida. Tente novamente.');
    }

    return atualizada;
  }
}

