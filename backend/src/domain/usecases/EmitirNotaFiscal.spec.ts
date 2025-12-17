import { EmitirNotaFiscal } from './EmitirNotaFiscal';
import { InMemoryNotaFiscalRepository } from '../../infrastructure/repositories/InMemoryNotaFiscalRepository';
import { IEmissaoService } from '../../application/services/IEmissaoService';
import { StatusNotaFiscal } from '../entities/NotaFiscal';
import { v4 as uuidv4 } from 'uuid';

class MockEmissaoService implements IEmissaoService {
  async emitir() {
    return {
      numeroNF: '123456',
      dataEmissao: '2024-01-01T00:00:00.000Z'
    };
  }
}

describe('EmitirNotaFiscal', () => {
  it('deve emitir uma nota fiscal com sucesso', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const emissaoService = new MockEmissaoService();
    const useCase = new EmitirNotaFiscal(repository, emissaoService);

    const id = uuidv4();
    await repository.create({
      id,
      cnpjTomador: '12345678901234',
      municipioPrestacao: 'São Paulo',
      estadoPrestacao: 'SP',
      valorServico: 1000,
      dataDesejadaEmissao: '2024-01-01T00:00:00.000Z',
      descricaoServico: 'Serviço 1',
      status: StatusNotaFiscal.PENDENTE_EMISSAO,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    });

    const result = await useCase.execute(id);

    expect(result.status).toBe(StatusNotaFiscal.EMITIDA);
    expect(result.numeroNF).toBe('123456');
    expect(result.dataEmissao).toBeDefined();
  });

  it('deve lançar erro quando solicitação não existe', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const emissaoService = new MockEmissaoService();
    const useCase = new EmitirNotaFiscal(repository, emissaoService);

    await expect(useCase.execute('id-inexistente')).rejects.toThrow('Solicitação não encontrada');
  });

  it('deve lançar erro quando solicitação não está pendente', async () => {
    const repository = new InMemoryNotaFiscalRepository();
    const emissaoService = new MockEmissaoService();
    const useCase = new EmitirNotaFiscal(repository, emissaoService);

    const id = uuidv4();
    await repository.create({
      id,
      cnpjTomador: '12345678901234',
      municipioPrestacao: 'São Paulo',
      estadoPrestacao: 'SP',
      valorServico: 1000,
      dataDesejadaEmissao: '2024-01-01T00:00:00.000Z',
      descricaoServico: 'Serviço 1',
      status: StatusNotaFiscal.EMITIDA,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    });

    await expect(useCase.execute(id)).rejects.toThrow('Solicitação não está pendente de emissão');
  });
});

