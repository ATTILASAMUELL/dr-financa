import { INotaFiscalRepository } from '../repositories/INotaFiscalRepository';
import { NotaFiscal } from '../entities/NotaFiscal';

export class EmitirNotaFiscalUseCase {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(id: string): Promise<NotaFiscal> {
    return await this.repository.emitir(id);
  }
}

