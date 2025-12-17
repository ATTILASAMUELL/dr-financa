import { NotaFiscal } from '../entities/NotaFiscal';
import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';

export class ListarSolicitacoes {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(): Promise<NotaFiscal[]> {
    return await this.repository.findAll();
  }
}

