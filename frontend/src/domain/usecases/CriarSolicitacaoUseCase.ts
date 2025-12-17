import { INotaFiscalRepository, CreateNotaFiscalDTO } from '../repositories/INotaFiscalRepository';
import { NotaFiscal } from '../entities/NotaFiscal';

export class CriarSolicitacaoUseCase {
  constructor(private repository: INotaFiscalRepository) {}

  async execute(data: CreateNotaFiscalDTO): Promise<NotaFiscal> {
    return await this.repository.create(data);
  }
}

