import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';
import { NotaFiscal } from '../entities/NotaFiscal';

export class ListarSolicitacoesUseCase {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(): Promise<NotaFiscal[]> {
    return await this.repository.findAll();
  }
}

