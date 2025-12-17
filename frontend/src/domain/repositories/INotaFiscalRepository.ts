import { NotaFiscal } from '../entities/NotaFiscal';

export interface CreateNotaFiscalDTO {
  cnpjTomador: string;
  municipioPrestacao: string;
  estadoPrestacao: string;
  valorServico: number;
  dataDesejadaEmissao: string;
  descricaoServico: string;
}

export interface INotaFiscalRepository {
  create(data: CreateNotaFiscalDTO): Promise<NotaFiscal>;
  findAll(): Promise<NotaFiscal[]>;
  findById(id: string): Promise<NotaFiscal>;
  emitir(id: string): Promise<NotaFiscal>;
}

