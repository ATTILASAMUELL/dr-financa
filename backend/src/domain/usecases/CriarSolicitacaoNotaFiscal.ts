import { NotaFiscal, StatusNotaFiscal } from '../entities/NotaFiscal';
import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';
import { v4 as uuidv4 } from 'uuid';

export interface CriarSolicitacaoInput {
  cnpjTomador: string;
  municipioPrestacao: string;
  estadoPrestacao: string;
  valorServico: number;
  dataDesejadaEmissao: string;
  descricaoServico: string;
}

export class CriarSolicitacaoNotaFiscal {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(input: CriarSolicitacaoInput): Promise<NotaFiscal> {
    const now = new Date().toISOString();
    
    const notaFiscal: NotaFiscal = {
      id: uuidv4(),
      cnpjTomador: input.cnpjTomador,
      municipioPrestacao: input.municipioPrestacao,
      estadoPrestacao: input.estadoPrestacao,
      valorServico: input.valorServico,
      dataDesejadaEmissao: input.dataDesejadaEmissao,
      descricaoServico: input.descricaoServico,
      status: StatusNotaFiscal.PENDENTE_EMISSAO,
      dataCriacao: now,
      dataAtualizacao: now
    };

    return await this.repository.create(notaFiscal);
  }
}

