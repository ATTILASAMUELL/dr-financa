import { NotaFiscal } from '../../domain/entities/NotaFiscal';
import { INotaFiscalRepository } from '../../domain/repositories/INotaFiscalRepository';

export class InMemoryNotaFiscalRepository implements INotaFiscalRepository {
  private notasFiscais: Map<string, NotaFiscal> = new Map();

  async create(notaFiscal: NotaFiscal): Promise<NotaFiscal> {
    this.notasFiscais.set(notaFiscal.id, notaFiscal);
    return notaFiscal;
  }

  async findAll(): Promise<NotaFiscal[]> {
    return Array.from(this.notasFiscais.values());
  }

  async findById(id: string): Promise<NotaFiscal | null> {
    return this.notasFiscais.get(id) || null;
  }

  async update(id: string, data: Partial<NotaFiscal>): Promise<NotaFiscal | null> {
    const notaFiscal = this.notasFiscais.get(id);
    
    if (!notaFiscal) {
      return null;
    }

    const updated = { ...notaFiscal, ...data };
    this.notasFiscais.set(id, updated);
    return updated;
  }
}

