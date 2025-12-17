import { NotaFiscal } from '../entities/NotaFiscal';

export interface INotaFiscalRepository {
  create(notaFiscal: NotaFiscal): Promise<NotaFiscal>;
  findAll(): Promise<NotaFiscal[]>;
  findById(id: string): Promise<NotaFiscal | null>;
  update(id: string, notaFiscal: Partial<NotaFiscal>): Promise<NotaFiscal | null>;
}

