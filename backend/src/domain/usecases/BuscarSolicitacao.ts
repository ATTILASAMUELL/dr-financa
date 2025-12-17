import { NotaFiscal } from '../entities/NotaFiscal';
import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';

export class BuscarSolicitacao {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(id: string): Promise<NotaFiscal | null> {
    return await this.repository.findById(id);
  }
}

